const express = require('express');
const { createServer } = require('node:http');
const path = require('node:path');

const app = express();
const server = createServer(app);

// Path
const multiplayerPath = path.join(__dirname, '..', '..', 'client', 'multiplayer');
app.use(express.static(multiplayerPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(multiplayerPath, 'index.html'));
});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});