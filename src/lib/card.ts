import type { Impact } from "./impact";
import type { City } from "./cities";
import type { Writable } from "svelte/store";
import type { Player } from "./player";

import { buenosAires, london, ryanOklahoma, tokyo, istanbul, paris, aktau, pyongyang} from './cities';
import { critTime } from "./globalVariables";


//
//
// Card

export class Card {
    name: string = "Fireball";
    srcFront: string = "fireball.svg";
    srcBack: string = "back.svg";
    callback: Function = () => {}

    constructor(name: string = "Fireball", srcFront: string = "fireball.svg", callback: Function = () => {}) {
        this.name = name;
        this.srcFront = srcFront;
        this.callback = callback;
    }

    async use(player?: Writable<Player>, enemy?: Writable<Player>): Promise<Impact> {
        let city : City;

        if (enemy) {
            enemy.subscribe((enemy) => city = enemy.characterClass.hometown)
        }

        let impact = await this.callback(buenosAires);

        if (player) {
            player.update((player) => {
                player.health += impact.healing;
                player.shield += impact.shield;

                return player;
            })
        }

        if (enemy) {
            enemy.update((enemy) => {
                if (impact.damage > 0) {
                    for (let i = 0; i<impact.damage; i++) {
                        if (enemy.shield > 0) {
                            enemy.shield -= 1;
                        } else if (enemy.health > 0) {
                            enemy.health -= 1;
                        }
                    }
                }
                return enemy;
            })
        }

        if (impact.crit) {
            setTimeout(() => {
                if (player) {
                    player.update((player) => {
                        player.health += impact.critHealing;
                        player.shield += impact.critShield;
        
                        return player;
                    })
                }
        
                if (enemy) {
                    enemy.update((enemy) => {
                        if (impact.critDamage > 0) {
                            for (let i = 0; i<impact.critDamage; i++) {
                                if (enemy.shield > 0) {
                                    enemy.shield -= 1;
                                } else if (enemy.health > 0) {
                                    enemy.health -= 1;
                                }
                            }
                        }
       
                        return enemy;
                    })
                }
            }, critTime)
        }

        return impact
    }
}

// Fireball

export const fireball = new Card("Fireball","fireball.svg", async (city: City) => {
    try {const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw new Error(`An error has occured: ${res.status}`)
    } else {
        //@ts-ignore
        let weather = await res.json();
        let result : string = weather.weather[0].main;
        const impact: Impact = {
            damage: 3,
            healing: 0,
            shield: 0,
            critDamage: 3,
            critHealing: 0,
            critShield: 0,
            phrase: `The weather in ${city.name} is ${result}!`,
            crit: result === "Clear" ? true : false,
        }
        return impact;
    }

    } catch(err) {
        throw new Error(`An error has occured: ${err}`)
    }
})

// Water bolt

export const waterBolt = new Card("Water bolt", "water-bolt.svg", async (city: City) => {
    try {const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw new Error(`An error has occured: ${res.status}`)
    } else {
        //@ts-ignore
        let weather = await res.json();
        let result : string = weather.weather[0].main;
        const impact: Impact = {
            damage: 3,
            healing: 0,
            shield: 0,
            critDamage: 3,
            critHealing: 0,
            critShield: 0,
            phrase: `The weather in ${city.name} is ${result}!`,
            crit: result === "Clear" ? true : false,
        }
        return impact;
    }

    } catch(err) {
        throw new Error(`An error has occured: ${err}`)
    }
})

// Lightning

export const cloudShield = new Card("Cloud shield","cloud-shield.svg")
export const cauterizeWounds = new Card("Cauterize wounds", "cauterize-wounds.svg")
export const healingRain = new Card("Healing rain", "healing-rain.svg")
export const lightning = new Card("Lightning", "lightning.svg");

export const availableCards: Card[] = [
    fireball, fireball, fireball, fireball, fireball, waterBolt
]