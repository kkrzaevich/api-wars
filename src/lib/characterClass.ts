import { Card, fireball, cloudShield, cauterizeWounds, healingRain, lightning, waterBolt, availableCards } from './card';

//
//
// Character class

export class CharacterClass {
    name: string = "weatherman";
    cards: Card[] = [fireball, cloudShield, cauterizeWounds, healingRain, lightning, waterBolt];
    hometown: {} = {
        name: "Buenos Aires",
        latitude: -34.60,
        longitude: -58.38
    };

    constructor(name: string = "weatherman", 
    cards: Card[] = [fireball, cloudShield, cauterizeWounds, healingRain, lightning, waterBolt],
    hometown: string = "London") {
        this.name = name;
        this.cards = cards;
        this.hometown = hometown;
    }
}

export const weatherman = new CharacterClass;
