import express from 'express';
import e, { Request, Response } from 'express';
import { generateLobbyCode } from './util/lobby';
import { createServer } from 'http';
import { Server, Socket } from "socket.io";
import { Player, IPlayer } from './classes/player';
import { GameInstance, Rattle, GameFrameData, PlayerState, Coordinate } from './interfaces/rattle';
import { findGameFromSocket, getPlayerFromSocket } from './util/socket';
import { buildGameStateFromInstance } from './util/game';

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
        io.in(room).emit("Go Home");
        io.in(room).socketsLeave(room);
        console.log('room ' + room + ' cleared');
        delete rattle_games[room]
    }
}

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
        let host = new Player(1, socket.id, socket);
        // SET DEFAULT GAME OPTIONS
        let game: GameInstance = {
            p1: host,
            p2: null,
            GameActive: false,
            currRounds: 0,
            time: 5000, // should be in ms
            totalRounds: 3,
            roomCode: lobby_code
        }
        rattle_games[lobby_code] = game;
        socket.to(lobby_code).emit('doneCreateLobby', lobby_code);
        debugLogger(socket);
        return lobby_code; // return code so that frontend can reference the correct game/room
    })

    socket.on('joinLobby', (code) => {
        console.log("received")
        socket.join(code);
        let game: GameInstance = (rattle_games[code] ?? null); // ! do updates to game var update rattle games?
        if (!game) {
            console.log("Lobby not found")
            return "Lobby not found";
        }
        console.log("Creating new player for room " + code + " with socket id " + socket.id);
        game.p2 = new Player(2, socket.id, socket);
        // send data to frontend
        io.to(code).emit("P2JoinedLobby", { p1char: game.p1?.char, p2char: game.p2.char, code: code });
        debugLogger(socket);
        return code; // return code so that frontend can reference the correct game/room
    })

    socket.on('selectCharacter', (code, player_num, char) => {
        let game: GameInstance = rattle_games[code];
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

    // socket.on('startGame', () => {
    //     // TODO will add more functionality
    //     console.log("STARTING GAME FOR " + socket.id);
    //     const gameRes = findGameFromSocket(socket);
    //     if (gameRes) {
    //         let game = gameRes.game;
    //         const room = gameRes.room;
    //         game.GameActive = true;
    //         if (game.p1) {
    //             game.p1.active = true;
    //         } else {
    //             return "Something went wrong"
    //         }
    //         socket.to(room).emit("goToGame");
    //     } else {
    //         console.error("No game found, in startGame")
    //     }

    // })

    socket.on("user has left", (id) => {
        console.log('a user has left')
    })

    socket.on('disconnecting', (reason) => {
        cleanUp(socket)
        console.log("disconnected " + socket.id);
    })

    socket.on('disconnect', () => { debugLogger(socket) });

    // socket event for updating game state frame by frame
    socket.on('update_game_frame', (frameData: GameFrameData) => {
        // update the player
        // find the game associated with this socket using socket.rooms and check all rooms of the socket
        const gameRes = findGameFromSocket(socket);
        if (gameRes !== null) {
            const gameInstance = gameRes.game;
            const room = gameRes.room;
            // figure out who this person that updated the game frame is
            const player = getPlayerFromSocket(socket, gameInstance);
            if (player) {
                // update the player object with the new stuff:
                // ---> score
                // ---> yPos
                player.score = frameData.points;
                if (frameData.playerPos.y !== null) {
                    player.yPos = frameData.playerPos.y;
                }

                // new data for the sender
                const senderJSON: IPlayer = {
                    player_num: player.player_num,
                    char: player.char,
                    score: player.score,
                    active: player.active,
                    yPos: player.yPos
                }

                // old data for the opponent
                const opponent = player.player_num === 1 ? gameInstance.p2 : gameInstance.p1;
                if (opponent) {
                    const iOpponent = opponent.convertToIPlayer();
                    // create a game state relative to opponent
                    const oppGameState = buildGameStateFromInstance(gameInstance, iOpponent, senderJSON);
                    // tell the opponent to update the game state
                    socket.to(room).emit('update_game_state', oppGameState);

                    // tell the sender to update the game state
                    // create a game state relative to sender
                    const senderGameState = buildGameStateFromInstance(gameInstance, senderJSON, iOpponent);
                    socket.emit('update_game_state', senderGameState);
                }
            } else {
                console.error("No player found in game for " + socket.id);
            }
        }
    })

    // socket event for going to options screen
    socket.on('go_to_options', () => {
        console.log("GOING TO OPTIONS")
        const gameRes = findGameFromSocket(socket);
        if (gameRes) {
            // get the room code to broadcast
            const code = gameRes.room;
            // make all clients in the room go to the options screen
            io.to(code).emit('go_to_options');
        }
    });

    // socket event for going to game screen
    socket.on('go_to_game', () => {
        console.log("GOING TO GAME")
        const gameRes = findGameFromSocket(socket);
        if (gameRes) {
            // get the room code to broadcast
            const code = gameRes.room;
            // make all clients in the room go to the options screen
            io.to(code).emit('go_to_game');
        }
    });

    // call this when a player joins the game screen
    socket.on("startGame", () => {
        console.log("STARTING GAME FOR " + socket.id);
        const gameRes = findGameFromSocket(socket);
        if (gameRes) {
            const gameInstance = gameRes.game;
            const player = getPlayerFromSocket(socket, gameInstance);
            if (player) {
                // this player has joined
                player.joinGame();
            }

            // check if everyone has joined
            let allJoined = true;
            const p1 = gameInstance.p1;
            const p2 = gameInstance.p2;
            if (!p1 || !p1.getInGame()) {
                allJoined = false;
            }
            if (!p2 || !p2.getInGame()) {
                allJoined = false;
            }

            if (allJoined) {
                // make host start
                console.log("ALL PLAYERS IN");
                const p1Socket = p1?.getSocket();
                const p2Socket = p2?.getSocket();

                if (!p1Socket || !p2Socket) {
                    if (!p1Socket) {
                        console.error("p1Socket undefined");
                    }
                    if (!p2Socket) {
                        console.error("p2Socket undefined");
                    }
                } else {
                    console.log("socket existence verification done")
                    p1Socket.emit("startTurn");
                    p2Socket.emit("waitTurn");
                }
            } else {
                console.log("NOT ALL PLAYERS IN")
            }
        }
    });

    socket.on("sendAnimatedHistory", (animatedStrokes: Coordinate[]) => {
        // send animated strokes to the opponent
        const gameRes = findGameFromSocket(socket);
        if (gameRes) {
            const gameInstance = gameRes.game;
            const player = getPlayerFromSocket(socket, gameInstance);
            if (player) {
                const opponent = player.player_num === 1 ? gameInstance.p2 : gameInstance.p1;
                if (opponent) {
                    const opponentSocket = opponent.socket;
                    opponentSocket.emit("updateAnimatedStrokes", animatedStrokes);
                } else {
                    console.error("could not find opponent, this is an error in sendAnimatedHistory");
                }
            } else {
                console.error("could not find player, this is an error in sendAnimatedHistory");
            }
        }
    });

    socket.on("endTurn", (strokeHistory) => {
        console.log(socket.id + " just ended turn");
        const gameRes = findGameFromSocket(socket);
        if (gameRes) {
            const room = gameRes.room;
            io.to(room).emit("startPlay", strokeHistory);
        } else {
            console.log("no game found for endTurn");
        }
    })

});

server.listen(2000, () => console.log("server up"));

module.exports = {
    app
}







