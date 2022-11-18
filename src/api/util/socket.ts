import { Socket } from 'socket.io';
import { rattle_games } from '../app';
import { Player } from '../classes/player';
import { GameInstance } from '../interfaces/rattle';

/**
 * Get the game instance from a socket
 * @param socket client socket
 * @returns Game if found, or null if not found
 */
export function findGameFromSocket(socket: Socket): { game: GameInstance, room: string } | null {
    const socketRooms = socket.rooms;
    let res: { game: GameInstance, room: string } | null = null;
    for (const room of socketRooms.keys()) {
        if (rattle_games[room] !== null && rattle_games[room] !== undefined) {
            res = { game: rattle_games[room], room: room };
            break;
        }
    }
    // no game found
    if (res === null) {
        console.error(`No game found for socket id ${socket.id}`);
    }
    return res;
}

/**
 * Get player object from a socket in a game instance
 * @param socket client socket
 * @param gameInstance Rattle game instance to look inside of
 */
export function getPlayerFromSocket(socket: Socket, gameInstance: GameInstance): Player | null {
    const p1 = gameInstance.p1;
    const p2 = gameInstance.p2;
    const id = socket.id;
    if (p1) {
        if (p1.socketId === id) {
            return p1;
        }
    }

    if (p2) {
        if (p2.socketId === id) {
            return p2;
        }
    }

    return null;
}