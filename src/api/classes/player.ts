

export class Player {
    constructor(newNum: number, newChar: string, newID: string) {
        this.number = newNum;
        this.char = newChar;
        this.socketId = newID;
        this.score = 0; // start at 0 score
        this.active = false; // inactive at the beginning
    }

    number: number; // should be 1 or 2
    char: string; // the path or an identifer for the character in the frontend
    score: number; // the numerical score
    active: boolean; // whether the player is active or not
    socketId: string | null; // socket.io client ID associated with the character
}
