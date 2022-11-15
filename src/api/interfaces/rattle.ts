/** interface for knowing all the game instances */
export interface Rattle {
    [lobbyCode: string]: Game;
}

// interface for a singular game instance
export interface Game {
    p1: Player; // player 1
    p2: Player; // player 2

    // game configuration options from frontened

    currRounds: number; // the round the game is currently at
    time: number; // the time per round
    totalRounds: number; // the total rounds before ending the game
}

export interface Player {
    number: number; // should be 1 or 2
    char: string; // the path or an identifer for the character in the frontend
    score: number; // the numerical score
    active: boolean; // whether the player is active or not
}