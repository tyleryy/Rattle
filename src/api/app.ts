import express from 'express';
import { Request, Response } from 'express';
import { generateLobbyCode } from './util/lobby';
import { createServer } from 'http';
import { Server, Socket } from "socket.io";
import { Player, IPlayer } from './classes/player';
import { Game, Rattle, GameFrameData, PlayerState } from './interfaces/rattle';
import { findGameFromSocket, getPlayerFromSocket } from './util/socket';

const app = express();
const server = createServer(app)
const io = new Server(server, { cors: { origin: '*' } });

export let rattle_games: Rattle = {};

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
})

// ! remove later
function debugLogger(socket: Socket) {
    console.log('\n--------------------------');
    console.log(rattle_games);
    console.log(socket.rooms);
    console.log(io.sockets.sockets.size);
    console.log('--------------------------\n');
}

function cleanUp(socket: Socket) {
    for (let room of socket.rooms) {
        io.in(room).socketsLeave(room);
        console.log('room ' + room + ' cleared');
        delete rattle_games[room]
    }
}

io.of("/").adapter.on("delete-room", (room) => {
    console.log(`room ${room} was destroyed`);
    // io.in(room).emit("Go Home");
    io.to(room).emit("Go Home");
});

io.on('connection', (socket: Socket) => {
    console.log("A socket has joined! They are " + socket.id)
    console.log(socket.rooms)
    console.log(io.sockets.sockets.size)

    socket.on('enterHome', () => {
        cleanUp(socket);
        debugLogger(socket);
    })

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
        socket.to(lobby_code).emit('doneCreateLobby', lobby_code);
        debugLogger(socket);
        return lobby_code; // return code so that frontend can reference the correct game/room
    })

    socket.on('joinLobby', (code) => {
        console.log("received")
        socket.join(code);
        let game: Game = (rattle_games[code] ?? null); // ! do updates to game var update rattle games?
        if (!game) {
            console.log("Lobby not found")
            return "Lobby not found";
        }
        game.p2 = new Player(2, socket.id);
        // send data to frontend
        io.to(code).emit("P2JoinedLobby", {p1char: game.p1?.char, p2char: game.p2.char, code:code});
        debugLogger(socket);
        return code; // return code so that frontend can reference the correct game/room
    })

    socket.on('selectCharacter', (code, player_num, char) => {
        let game: Game = rattle_games[code];
        // ! may change later
        // prevents character assignment if other player has selected it
        if (player_num === 1 && game.p1) {
            if (game.p2 && game.p2.char === char) { return "Player 2 has already selected that character"; }
            game.p1.char = char;
        } else if (player_num === 2 && game.p2) {
            if (game.p1 && game.p1.char === char) { return "Player 1 has already selcted that character"; }
            game.p2.char = char;
        } else {
            return "error";
        }

        socket.to(code).emit("doneSelecting", { p1char: game.p1?.char, p2char: game.p2?.char });
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

    socket.on("user has left", (id) => {
        console.log('a user has left')
    })

    socket.on('disconnecting', (reason) => {
        cleanUp(socket)
        console.log("disconnected");
    })

    socket.on('disconnect', () => { debugLogger(socket) });

    // socket event for updating game state frame by frame
    socket.on('update_game_frame', (frameData: GameFrameData) => {
        // update the player

        // find the game associated with this socket using socket.rooms and check all rooms of the socket
        const gameRes = findGameFromSocket(socket);
        if (gameRes) {
            const gameInstance = gameRes.game;
            const room = gameRes.room;
            // figure out who this person that updated the game frame is
            const player = getPlayerFromSocket(socket, gameInstance);
            if (player) {
                // update the player object with the new stuff:
                // ---> score
                // ---> yPos
                player.score = frameData.points;
                player.yPos = frameData.pos;

                // send all player data to opponent client
                const playerJSON: IPlayer = {
                    player_num: player.player_num,
                    char: player.char,
                    score: player.score,
                    active: player.active,
                    yPos: player.yPos
                }
                socket.to(room).emit('update_opponent_frame', playerJSON);
            } else {
                console.error("No player found in game for " + socket.id);
            }
        }


    })

});

server.listen(2000, () => console.log("server up"));

module.exports = {
    app
}







