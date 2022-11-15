import { Rattle } from "../interfaces/rattle";

export function generateLobbyCode(rattle_games : Rattle) : string {
    let result: string;
    do {
        result = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for ( var i = 0; i < 5; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    } while (!(result in rattle_games))
    return result;
}