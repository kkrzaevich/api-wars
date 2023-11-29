import { weatherman, type CharacterClass } from "./characterClass";
import { playerHand, type Hand } from "./hand";

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
        hand: Hand = playerHand,
        characterClass: CharacterClass = weatherman
    ) {
        this.name = name;
        this.hand = hand;
        this.characterClass = characterClass;
    }
}

export const player1 = new Player;
