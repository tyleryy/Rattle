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

let rattle_games: Rattle;

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

io.on('connection', (socket) => {
    console.log('a user connected');
});
  
io.on('/createlobby', (socket: Socket) => {
    let lobby_code = generateLobbyCode(rattle_games);
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
    return lobby_code; // return code so that frontend can reference the correct game/room
})

io.on('/joinlobby', (socket: Socket, code: string) => {
    socket.join(code);

    let game: Game = (rattle_games[code] ?? null); // ! do updates to game var update rattle games?
    if (!game) {
        return "Lobby not found";
    }
    game.p2 = new Player(2, socket.id);
    return code; // return code so that frontend can reference the correct game/room
})




server.listen(2000, () => console.log("server up"));

module.exports = {
    app
}







