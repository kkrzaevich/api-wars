import { Card, fireball, cloudShield, cauterizeWounds, healingRain, lightning, waterBolt, availableCards } from './card';
import type { City } from './cities';
import { buenosAires, london, ryanOklahoma, tokyo, istanbul, paris, aktau, pyongyang} from './cities';

//
//
// Character class

export class CharacterClass {
    name: string = "weatherman";
    cards: Card[] = [fireball, cloudShield, cauterizeWounds, healingRain, lightning, waterBolt];
    hometown: City = buenosAires;

    constructor(name: string = "weatherman", 
    cards: Card[] = [fireball, cloudShield, cauterizeWounds, healingRain, lightning, waterBolt],
    hometown: City = buenosAires) {
        this.name = name;
        this.cards = cards;
        this.hometown = hometown;
    }
}

export const weatherman = new CharacterClass;
