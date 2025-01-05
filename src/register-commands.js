require('dotenv').config();

const {REST, Routes} = require('discord.js');

const commands  = [
    {name: 'ping', description: 'Ping the bot to check if it is alive.'},
    {name: 'server-start', description: 'Start the server.'},
    {name: 'whos-playing', description: 'Check who is currently playing.'},
    {name: 'server-status', description: 'Check the status of the server.'},
    {name: 'save-world', description: 'Save current world state.'},
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async ()=>{

    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID),
            {
                body: commands
            }
        );
    } catch (error) {
        console.log(error);
    }

})();