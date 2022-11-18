
export interface Coordinate {
    x: number | null,
    y: number | null
}

// <--------- These interfaces should be nearly identical to the one in the backend

/** interface for a singular game instance */
export interface GameState {
    p1: IPlayer | null; // player 1
    p2: IPlayer | null; // player 2

    // game configuration options from frontened

    GameActive: boolean;
    currRounds: number; // the round the game is currently at
    time: number; // the time per round
    totalRounds: number; // the total rounds before ending the game
}

/** Interface for character information */
export interface IPlayer {
    player_num: number; // should be 1 or 2
    char: string | null; // the path or an identifer for the character in the frontend
    score: number; // the numerical score
    active: boolean; // whether the player is active or not
    socketId?: string | null; // socket.io client ID associated with the character
    yPos: number; // the y position of the player currently
}

// <----------------->