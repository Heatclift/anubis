# Project Anubis Configuration Documentation

**Project Anubis** is a specialized Discord bot built exclusively for managing and enhancing **Palworld Dedicated Servers**. Its primary goal is to simplify server administration and enrich the player experience by providing seamless automation and integration tools. 

By leveraging the **Palworld Dedicated Server API**, **Project Anubis** offers real-time server management capabilities such as monitoring server status, automating player notifications, and enabling streamlined communication between server administrators and players. It also utilizes **Discord webhooks** to deliver dynamic updates directly to your Discord server, ensuring your community stays informed and engaged.

Designed with Palworld enthusiasts in mind, **Project Anubis** is the perfect companion for creating a well-organized, active, and enjoyable gaming community. Whether you’re running casual games or competitive events, this bot is your key to hassle-free server operation.

[![Docker Image](https://img.shields.io/docker/pulls/heatclift/anubis)](https://hub.docker.com/r/heatclift/anubis)

## Configuration Parameters

### 1. **CLIENT_ID**
- **Description:** The Discord application ID of your bot.
- **Type:** String
- **Example:**
  ```
  CLIENT_ID=123456789012345678
  ```

### 2. **GUILD_ID**
- **Description:** The ID of the Discord server where the bot will operate.
- **Type:** String
- **Example:**
  ```
  GUILD_ID=876543210987654321
  ```

### 3. **PALWORLD_HOST**
- **Description:** The hostname root URL of your Palworld dedicated server.
- **Type:** String
- **Example:**
  ```
  PALWORLD_HOST=http://example.palworldserver.com
  ```

### 4. **PALWORLD_HOST_AUTH**
- **Description:** The basic authentication token required to access the Palworld server.
- **Type:** String
- **Example:**
  ```
  PALWORLD_HOST_AUTH=Basic ZXhhbXBsZXVzZXI6ZXhhbXBsZXBhc3M=
  ```

### 5. **STARTUP_WEBHOOK**
- **Description:** A Discord webhook URL triggered when the bot starts the Palworld server.
- **Type:** String (URL)
- **Example:**
  ```
  STARTUP_WEBHOOK=https://discord.com/api/webhooks/1234567890/placeholderwebhook
  ```

### 6. **TOKEN**
- **Description:** The secret token for your Discord application, used for bot authentication.
- **Type:** String
- **Example:**
  ```
  TOKEN=NjA0ZG9Ob2RSZWFsVG9rZW4K
  ```

## How to Use
1. Create a `.env` file in the root directory of your bot project.
2. Add the configuration parameters to the `.env` file in the following format:
   ```
   CLIENT_ID=your_discord_application_id
   GUILD_ID=your_discord_server_id
   PALWORLD_HOST=your_palworld_server_host
   PALWORLD_HOST_AUTH=your_palworld_server_auth_token
   STARTUP_WEBHOOK=your_discord_webhook_url
   TOKEN=your_discord_app_secret
   ```
3. Save the file and ensure it is loaded by your bot during initialization.

## Deploying with Docker
To deploy Project Anubis using the official Docker image, follow these steps:

1. **Install Docker:** Ensure Docker is installed on your system. You can download it from [Docker's official website](https://www.docker.com/).

2. **Pull the Docker Image:** Use the following command to pull the official Project Anubis image:
   ```
   docker pull heatclift/anubis:latest
   ```
   - You can find the official Docker image on [Docker Hub](https://hub.docker.com/r/heatclift/anubis).

3. **Run the Container:** Use the following command to run the bot with the necessary environment variables:
   ```
   docker run --name project-anubis \
     --env-file .env \
     -d heatclift/anubis:latest
   ```
   - Replace `.env` with the path to your environment file containing the configuration parameters.

4. **Verify Deployment:** Check if the container is running successfully:
   ```
   docker ps
   ```
   If the container is listed, Project Anubis is up and running.

## Available Discord Commands

### 1. **ping**
- **Description:** Ping the bot to check if it is alive.
- **Usage:** `/ping`

### 2. **server-start**
- **Description:** Start the server.
- **Usage:** `/server-start`

### 3. **whos-playing**
- **Description:** Check who is currently playing.
- **Usage:** `/whos-playing`

### 4. **server-status**
- **Description:** Check the status of the server.
- **Usage:** `/server-status`

### 5. **save-world**
- **Description:** Save the current world state.
- **Usage:** `/save-world`

## Notes
- Ensure the **TOKEN** and **PALWORLD_HOST_AUTH** values are kept private and secure.
- Use a reliable hosting environment for running the bot to ensure uptime and accessibility.

