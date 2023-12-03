import type { CharacterClass } from "./characterClass";
import type { Hand } from "./hand";
import { weatherman } from "./characterClass";
import { playerHand, enemyHand } from "./hand";
import { timeline } from "../stores";

//
//
// Player

export class Player {
    name: "Player 1" | "Player 2" = "Player 1";
    hand: Hand;
    characterClass: CharacterClass;
    health: number = 30;
    shield: number = 0;

    constructor(
        name: "Player 1" | "Player 2" = "Player 1",
        hand: Hand,
        characterClass: CharacterClass = weatherman
    ) {
        this.name = name;
        this.hand = hand;
        this.characterClass = characterClass;
    }
}

export const player1 = new Player("Player 1", playerHand);
export const player2 = new Player("Player 2", enemyHand);