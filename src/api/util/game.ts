import { IPlayer, Player } from './../classes/player';
import { GameInstance, GameState } from "../interfaces/rattle";

/**
 * 
 * @param instance game instance obj
 * @param client the main user
 * @param opponent the opponent
 */
export function buildGameStateFromInstance(instance: GameInstance, client: IPlayer, opponent: IPlayer): GameState {
    const state: GameState = {
        p1: client,
        p2: opponent,
        GameActive: instance.GameActive,
        currRounds: instance.currRounds,
        time: instance.time,
        totalRounds: instance.totalRounds
    }
    return state;
}