# Project Anubis Configuration Documentation

**Project Anubis** is a Discord bot tailored for managing Palworld dedicated servers. To set it up correctly, you need to configure the following parameters in the bot's environment.

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

## Notes
- Ensure the **TOKEN** and **PALWORLD_HOST_AUTH** values are kept private and secure.
- Use a reliable hosting environment for running the bot to ensure uptime and accessibility.

