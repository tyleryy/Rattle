import { Player, IPlayer } from "../classes/player";


/** Coordinate for position */
export interface Coordinate {
    x: number | null,
    y: number | null
}

/** interface for knowing all the game instances */
export interface Rattle {
    [lobbyCode: string]: GameInstance;
}

/** interface for a singular game instance in the backend */
export interface Game {
    // game configuration options from frontened

    GameActive: boolean;
    currRounds: number; // the round the game is currently at
    time: number; // the time per round, in milliseconds
    totalRounds: number; // the total rounds before ending the game
    roomCode: string;
}

export interface GameInstance extends Game {
    p1: Player | null; // player 1
    p2: Player | null; // player 2
}

/** interface for a singular game instance that the frontend will understand */
export interface GameState extends Game {
    p1: IPlayer | null; // player 1
    p2: IPlayer | null; // player 2
}

/**
 * Data the game will provide in each frame update
 */
export interface GameFrameData {
    playerPos: Coordinate,
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