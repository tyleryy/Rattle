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

let rattle_games: Rattle = {};

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

// ! remove later
function debugLogger(socket: Socket) {
    console.log(rattle_games);
    console.log(socket.rooms);
}


io.on('connection', (socket: Socket) => {
    console.log("A socket has joined! They are " + socket.id)

    socket.on('createLobby', () => {
        let lobby_code = generateLobbyCode(rattle_games);
        try {
            socket.join(lobby_code);
        } catch (err) {
            console.log(err);
        }
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
        debugLogger(socket)
        return lobby_code; // return code so that frontend can reference the correct game/room
    })

    socket.on('joinLobby', (code) => {
        socket.join(code);
        let game: Game = (rattle_games[code] ?? null); // ! do updates to game var update rattle games?
        if (!game) {
            console.log("Lobby not found")
            return "Lobby not found";
        }
        game.p2 = new Player(2, socket.id);
        // send data to frontend
        socket.to(code).emit("P2JoinedLobby", {p1char: game.p1?.char, p2char: game.p2.char});
        debugLogger(socket);
        return code; // return code so that frontend can reference the correct game/room
    })
    
    socket.on('selectCharacter', (code, player_num, char) => {
        let game: Game = rattle_games[code];
        // ! may change later
        // prevents character assignment if other player has selected it
        if (player_num === 1 && game.p1) {
            if (game.p2 && game.p2.char === char) {return "Player 2 has already selected that character";}
            game.p1.char = char;
        } else if (player_num === 2 && game.p2) {
            if (game.p1 && game.p1.char === char) {return "Player 1 has already selcted that character";}
            game.p2.char = char;
        } else {
            return "error";
        }

        socket.to(code).emit("doneSelecting", {p1char: game.p1?.char, p2char: game.p2?.char});
        return `Player ${player_num} selected ${char}`;
    })

    socket.on('gameEnd', (code: string) => {
        // TODO may add more cleanup
        delete rattle_games[code];
        socket.to(code).emit("endScreen");
    })

    socket.on('startGame', (code: string) => {
        // TODO will add more functionality
        let game: Game = rattle_games[code];
        game.GameActive = true;
        if (game.p1) {
            game.p1.active = true;
        } else {
            return "Something went wrong"
        }
        socket.to(code).emit("goToGame");
    })

    socket.on('disconnect', () => {
        let socket_room = io.of("/").adapter.sids.get(socket.id)
        if (socket_room) {
            let room = socket_room.values().next().value;
            io.to(room).emit("disconnect-screen")
        }
    })

});

server.listen(2000, () => console.log("server up"));

module.exports = {
    app
}







