import type { Impact } from "./impact";
import type { City } from "./cities";
import type { Writable } from "svelte/store";
import type { Player } from "./player";

import { buenosAires, london, ryanOklahoma, tokyo, istanbul, paris, aktau, pyongyang} from './cities';
import type { Conditions } from "./conditions";
import { conditions } from "./conditions";

import { timeline } from "../stores";


//
//
// Card

export class Card {
    name: string = "Fireball";
    srcFront: string = "fireball.svg";
    srcBack: string = "back.svg";
    callback: Function = (conditions: Conditions) => {}

    constructor(name: string = "Fireball", srcFront: string = "fireball.svg", callback: Function = () => {}) {
        this.name = name;
        this.srcFront = srcFront;
        this.callback = callback;
    }

    async use(player?: Writable<Player>, enemy?: Writable<Player>): Promise<Impact> {
        let impact = await this.callback(conditions);

        let critTime;
        timeline.update(timelineInner => {critTime = timelineInner.stages[timelineInner.currentStage].delay; 
            timelineInner.move(
                () => {
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

                    timeline.update(timelineInnerDeep => {
                        timelineInnerDeep.move(
                            () => {
                                if (impact.crit) {
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
                                }
                            }
                        );
                        return timelineInnerDeep})
                }
            );  
            return timelineInner})
     
        return impact
    }
}

// Fireball

export const fireball = new Card("Fireball","fireball.svg", async (conditions: Conditions) => {
    const city = conditions.enemyCity;

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
            crit: result === "Rain" || "Thunderstorm" ? true : false,
        }
        return impact;
    }

    } catch(err) {
        throw new Error(`An error has occured: ${err}`)
    }
})

// Water bolt

export const waterBolt = new Card("Water bolt", "water-bolt.svg", async (conditions: Conditions) => {
    const city = conditions.enemyCity;

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
            crit: result === "Rain" ? true : false,
        }
        return impact;
    }

    } catch(err) {
        throw new Error(`An error has occured: ${err}`)
    }
})

// Lightning

export const lightning = new Card("Lightning", "lightning.svg", async (conditions: Conditions) => {
    const city = conditions.enemyCity;

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
            crit: result === "Thunderstorm" ? true : false,
        }
        return impact;
    }

    } catch(err) {
        throw new Error(`An error has occured: ${err}`)
    }
})

// Cloud Shield

export const cloudShield = new Card("Cloud shield","cloud-shield.svg", async (conditions: Conditions) => {
    const city = conditions.arenaCity;

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
            damage: 0,
            healing: 0,
            shield: 5,
            critDamage: 0,
            critHealing: 0,
            critShield: 5,
            phrase: `The weather in ${city.name} is ${result}!`,
            crit: result === "Clouds" ? true : false,
        }
        return impact;
    }

    } catch(err) {
        throw new Error(`An error has occured: ${err}`)
    }
})

// Cauterize Wounds

export const cauterizeWounds = new Card("Cauterize wounds", "cauterize-wounds.svg", async (conditions: Conditions) => {
    const city = conditions.playerCity;

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
            damage: 0,
            healing: 3,
            shield: 0,
            critDamage: 0,
            critHealing: 3,
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

// Heaing Rain

export const healingRain = new Card("Healing rain", "healing-rain.svg", async (conditions: Conditions) => {
    const city = conditions.playerCity;

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
            damage: 0,
            healing: 3,
            shield: 0,
            critDamage: 0,
            critHealing: 3,
            critShield: 0,
            phrase: `The weather in ${city.name} is ${result}!`,
            crit: result === "Rain" || "Thunderstorm" ? true : false,
        }
        return impact;
    }

    } catch(err) {
        throw new Error(`An error has occured: ${err}`)
    }
})

export const availableCards: Card[] = [
    fireball, waterBolt, lightning, cloudShield, cauterizeWounds, healingRain
]