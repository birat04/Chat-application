# Chat-application



A simple real-time chat application using React (frontend) and WebSockets (backend).

## Features

- Real-time messaging between multiple browser clients
- Simple UI with message history
- Room-based joining (example: room "red")

## Prerequisites

- [Node.js](https://nodejs.org/) (for backend)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (for frontend dependencies)

## Getting Started

### 1. Clone the repository

```sh
git clone <https://github.com/birat04/Chat-application>
cd chat application
```

### 2. Backend Setup

Create a simple WebSocket server (example using Node.js and `ws`):

```js
// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
```

Install dependencies and run:

```sh
npm install ws
node server.js
```

### 3. Frontend Setup

```sh
cd frontend
npm install
npm start
```

The React app will start on [http://localhost:5173](http://localhost:5173).

## Usage

- Open [http://localhost:5173](http://localhost:5173) in multiple browser tabs/windows.
- Type a message and click "Send message".
- Messages will appear in all connected clients in real time.

## Project Structure

```
chat application/
├── frontend/
│   ├── src/
│   │   └── App.tsx
│   └── ...
├── backend/
│   ├── src/
│   │   └── index.ts
│   └── ...
└── README.md
```

## Notes

- The frontend expects the WebSocket server to run on `ws://localhost:8080`.
- You can customize the room logic and message format as needed.

## License

MIT
