require('dotenv').config();
const axios = require('axios');

const {Client, IntentsBitField, SlashCommandBuilder} = require('discord.js');
const client = new Client({intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]});
const palworldHost = process.env.PALWORLD_HOST;

client.onready = () => {
  console.log('Anubis is ready!');
}

async function triggerWebhook() {
    const webhookUrl = process.env.STARTUP_WEBHOOK;

    try {
        await axios.get(webhookUrl);
        console.log('Webhook triggered successfully');
    } catch (error) {
        console.error('Error triggering webhook:', error.message);
    }

}

async function fetchPlayers() {
    try {
        const response = await axios.get(`${palworldHost}/v1/api/players`, {
            headers: {
                'Authorization':`Basic ${process.env.PALWORLD_HOST_AUTH}`,// Replace YOUR_ACCESS_TOKEN with the actual token
                'Host': 'pal.server'
            }
        });
        return response.data.players;
    } catch (error) {
        console.error('Error fetching players:', error.message);
        throw new Error('Unable to fetch players. Please try again later.');
    }
}

async function fetchServerMetrics() {
    try {
        const response = await axios.get(`${palworldHost}/v1/api/metrics`, {
            headers: {
                'Authorization':`Basic ${process.env.PALWORLD_HOST_AUTH}`,// Replace YOUR_ACCESS_TOKEN with the actual token
                'Host': 'pal.server'
            }
        });
        if(response.status === 502){
            return "offline";
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching server metrics:', error.message);
        return "offline";
    }

}


async function periodicallyCheckServerStatus( interval = 10000, timeout = 600000) {
    const startTime = Date.now();

    async function checkFunction() {
        const elapsed = Date.now() - startTime;

        try {
            // Call the target function and await its result
            const result = await fetchServerMetrics();

            if (result != "offline") {
                console.log("Valid response received. Stopping checks.");
                return result; // Stop the loop
            }
        } catch (error) {
            console.log(`Error in target function: ${error}`);
        }

        if (elapsed < timeout) {
            await new Promise((resolve) => setTimeout(resolve, interval));
            return checkFunction(); 
        } else {
            console.log("Timeout reached. Stopping checks.");
            return "offline"; // Stop the loop
        }
    }

 return await checkFunction();
}



async function saveWolrd() {
    let response;
    
    try {
        console.log('Saving world...');
        response = await axios.post(`${palworldHost}/v1/api/save`, null,{
            headers: {
                'Authorization':`Basic ${process.env.PALWORLD_HOST_AUTH}`,// Replace YOUR_ACCESS_TOKEN with the actual token
                'Host': 'pal.server'
            },
            timeout: 600000,
        });
        console.log('World saved successfully');
        return response.status;
    } catch (error) {
        console.error('Error saving server state:', error.message);
        return error.message;
    }

}

function secondsToHours(seconds) {
    const hours = Math.floor(seconds / 3600); // 1 hour = 3600 seconds
    return hours;
  }

client.on('interactionCreate', async interaction => {
    if(interaction.isChatInputCommand){
        switch (interaction.commandName) {
            case "server-start":
                await interaction.reply("Server is starting...");
                await triggerWebhook();
                const serverStatus = await periodicallyCheckServerStatus();
                if(serverStatus === "offline"){
                    interaction.followUp("Server startup timed out. Please try again later or check the server status manually.");
                }else{
                    interaction.followUp(`Server is online with ${serverStatus.currentplayernum} players online. The server has been up for ${secondsToHours(serverStatus.uptime)} hours.`);
                }
                break;

            case "whos-playing":
                await interaction.reply("Fetching player list...");
                 const players = await fetchPlayers();
                let announcement;
                 if (players.length === 0) {
                    announcement = 'No players are currently playing.';
                } else if (players.length === 1) {
                    announcement = `${players[0].name} is playing!`;
                } else {
                    let allButLast = '';
                    for (let i = 0; i < players.length - 1; i++) {
                        allButLast += players[i].name + ', ';
                    }
                    const lastPlayer = players[players.length - 1].name;
                    announcement = `${allButLast} and ${lastPlayer} are playing!`;
                }
                interaction.followUp(announcement);
                break;

            case "server-status":
                await  interaction.reply("Fetching server status...");
                const metrics = await fetchServerMetrics();
                if(metrics === "offline"){
                    interaction.followUp("Server is offline.");
                }else{
                    interaction.followUp(`Server is online with ${metrics.currentplayernum} players online. The server has been up for ${secondsToHours(metrics.uptime)} hours.`);
                }
                break;

            case "save-world":
                await interaction.reply("Saving world...");
                const response = await saveWolrd();
                
                try {
                    if(response === 200){
                        interaction.followUp("World saved successfully.");
                    }else{
                        interaction.followUp(`Save world failed. Error: ${response}`);
                    }
                } catch (e) {
                    console.error('Error saving world:', e.message);
                    await interaction.followUp({ content: 'Save world timed out. Please try again later.', components: [] });
                }
                break;

            case "ping":
                interaction.reply("I'm here!");
                break;
        
            default:
            break;
        }
    }
});


client.login(process.env.TOKEN);




	