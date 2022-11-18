import { Socket } from 'socket.io';

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
    socket: Socket; // socket object in server
    inGame: boolean; // if in game
    doneVerify: boolean;

    constructor(num: number, socketID: string, socket: Socket) {
        this.player_num = num;
        this.char = null;
        this.socketId = socketID;
        this.score = 0; // start at 0 score
        this.active = false; // inactive at the beginning
        this.yPos = -100;
        this.socket = socket;
        this.inGame = false;
        this.doneVerify = false;
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

    setDoneVerify(v: boolean) {
        this.doneVerify = v;
    }

    getDoneVerify() {
        return this.doneVerify;
    }

    joinGame() {
        this.inGame = true;
    }

    getInGame() {
        return this.inGame;
    }

    getSocket() {
        return this.socket;
    }

    convertToIPlayer(): IPlayer {
        return {
            char: this.char,
            player_num: this.player_num,
            score: this.score,
            active: this.active,
            yPos: this.yPos
        }
    }
}
