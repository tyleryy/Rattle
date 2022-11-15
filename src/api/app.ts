import express from 'express';
import { Request, Response } from 'express';
import { generateLobbyCode } from './routes/lobby';
import { createServer } from 'http';
import { Server, Socket } from "socket.io";
import { Player } from './classes/player';
import { Game, Rattle } from './interfaces/rattle';

const app = express();
const server = createServer(app)
const io = new Server(server, {cors: {origin: '*'}});

let id_set = new Set<string>();
let rattle_games: Rattle;

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

io.on('connection', (socket) => {
    console.log('a user connected');
});
  
io.on('createlobby', (socket: Socket) => {
    let result = generateLobbyCode(id_set);
    let lobby_code: string = result.result;
    id_set = result.id_set;
    socket.join(lobby_code);
    let host = new Player(1, socket.id);
    let game: Game = {
        p1: host,
        p2: null,
        GameActive: false,
        currRounds: 0,
        time: 0,
        totalRounds: 0
    }
    rattle_games[lobby_code] = game;
    // possibly return success or fail
    return;
})

server.listen(2000, () => console.log("server up"));

module.exports = {
    app
}







