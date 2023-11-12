# Playlink

Playlink is a comprehensive application comprised of three core components: a server, a frontend, and a browser extension built with Plasmo JS. The primary objective of Playlink is to establish seamless communication between two distinct user roles: the "Displayer" and the "Caster."

## User Roles

### Displayer

The "Displayer" is a user who logs in to generate a QR Code. This QR Code serves as a key for the "Caster" to scan and receive live content directly from the "Displayer."

### Caster

The "Caster" scans the QR Code provided by the "Displayer" to establish a connection. To enhance this interaction, the "Caster" has the option to download a dedicated browser extension, enabling seamless navigation on streaming websites. Upon detecting an m3u8 stream, a popup window appears, allowing the "Caster" to broadcast the content directly to the "Displayer" via Playlink.

## Installation and Configuration

To set up Playlink, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/stupside/playlink.git
   ```

2. **Setup Redis and the Database**

   ```bash
   docker compose -f src/apps/backend/.docker/docker-compose.yml up -d
   ```

3. **Run the backend, the frontend and build the extension**

   ```bash
   pnpm i && pnpm dev
   ```
