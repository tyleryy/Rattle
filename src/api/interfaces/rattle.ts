import { Player, IPlayer } from "../classes/player";

/** interface for knowing all the game instances */
export interface Rattle {
    [lobbyCode: string]: Game;
}

/** interface for a singular game instance */
export interface Game {
    p1: Player | null; // player 1
    p2: Player | null; // player 2

    // game configuration options from frontened

    GameActive: boolean;
    currRounds: number; // the round the game is currently at
    time: number; // the time per round
    totalRounds: number; // the total rounds before ending the game
}

/**
 * Data the game will provide in each frame update
 */
export interface GameFrameData {
    pos: number,
    strokes: (number | null)[],
    points: number,
}

/**
 * Player information that will be sent, just a static json object no methods
 */
export interface PlayerState {
    main: IPlayer,
    opponent: IPlayer
}