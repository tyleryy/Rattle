
export interface IPlayer {
    player_num: number; // should be 1 or 2
    char: string | null; // the path or an identifer for the character in the frontend
    score: number; // the numerical score
    active: boolean; // whether the player is active or not
    socketId?: string | null; // socket.io client ID associated with the character
    yPos: number; // the y position of the player currently
}

export class Player implements IPlayer {

    player_num: number; // should be 1 or 2
    char: string | null; // the path or an identifer for the character in the frontend
    score: number; // the numerical score
    active: boolean; // whether the player is active or not
    socketId: string | null; // socket.io client ID associated with the character
    yPos: number; // the y position of the player currently

    constructor(num: number, socketID: string) {
        this.player_num = num;
        this.char = null;
        this.socketId = socketID;
        this.score = 0; // start at 0 score
        this.active = false; // inactive at the beginning
        this.yPos = -100;
    }

    setPlayerNum(num: number) {
        this.player_num = num;
    }

    setChar(char: string | null) {
        this.char = char;
    }

    setScore(score: number) {
        this.score = score;
    }

    setActive(active: boolean) {
        this.active = active;
    }

    setSocketId(id: string) {
        this.socketId = id;
    }

    setPos(yPos: number) {
        this.yPos = yPos;
    }
}
