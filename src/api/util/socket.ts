import { Socket } from 'socket.io';
import { rattle_games } from '../app';
import { Player } from '../classes/player';
import { Game } from '../interfaces/rattle';

/**
 * Get the game instance from a socket
 * @param socket client socket
 * @returns Game if found, or null if not found
 */
export function findGameFromSocket(socket: Socket): { game: Game, room: string } | null {
    const socketRooms = socket.rooms;
    for (const room of socketRooms) {
        if (room in rattle_games) {
            return { game: rattle_games[room], room: room };
        }
    }

    // no game found
    console.error(`No game found for socket id ${socket.id}`);
    return null;
}

/**
 * Get player object from a socket in a game instance
 * @param socket client socket
 * @param gameInstance Rattle game instance to look inside of
 */
export function getPlayerFromSocket(socket: Socket, gameInstance: Game): Player | null {
    const p1 = gameInstance.p1;
    const p2 = gameInstance.p2;
    const id = socket.id;
    if (p1) {
        if (p1.socketId === id) {
            return p1;
        }
    } else if (p2) {
        if (p2.socketId === id) {
            return p2;
        }
    }

    return null;
}