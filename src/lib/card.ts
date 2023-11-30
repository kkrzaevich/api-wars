import type { Impact } from "./impact";
import { City, buenosAires, london, ryanOklahoma, tokyo, istanbul, paris, aktau, pyongyang} from './cities';

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

    // Работаем здесь

    async use(): Promise<Impact> {return await this.callback(buenosAires)}
}

export const fireball = new Card("Fireball","fireball.svg", async (city: City) => {
    try {const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.latitude}&lon=${city.longitude}&appid=${import.meta.env.VITE_WEATHER_KEY}&units=metric`, {
        method: 'GET',
    })

    if (!res.ok) {
        throw new Error(`An error has occured: ${res.status}`)
    } else {
        //@ts-ignore
        let weather = await res.json();
        let result = weather.weather[0].main;
        const impact: Impact = {
            damage: 3,
            healing: 0,
            shield: 0,
            critDamage: 3,
            critHealing: 0,
            critShield: 0,
            phrase: `The weather in ${city.name} is ${result}!`,
            crit: result === "Clear " ? true : false,
        }
        return impact;
    }

    } catch(err) {
        throw new Error(`An error has occured: ${err}`)
    }
    
})

export const cloudShield = new Card("Cloud shield","cloud-shield.svg")
export const cauterizeWounds = new Card("Cauterize wounds", "cauterize-wounds.svg")
export const healingRain = new Card("Healing rain", "healing-rain.svg")
export const lightning = new Card("Lightning", "lightning.svg");
export const waterBolt = new Card("Water bolt", "water-bolt.svg");

export const availableCards: Card[] = [
    fireball, fireball, fireball, fireball, fireball, waterBolt
]