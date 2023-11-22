import { writable } from 'svelte/store';

export const cards = writable(
    [
        "50-50.svg",
        "cauterize-wounds.svg",
        "cloud-shield.svg",
        "cost-benefit-analysis.svg",
        "financial-cushion.svg",
        "fireball.svg",
        "healing-rain.svg",
        "healing-stonks.svg",
        "lightning.svg",
        "market-crash.svg",
        "million-dollar-question.svg",
        "prize-sector.svg",
        "return-on-investment.svg",
        "roundhouse-kick.svg",
        "the-weakest-link.svg",
        "water-bolt.svg",
        "back.svg"
    ]
);

//
//
// Global variables
export const globalCardWidth = 100;
export const globalHoverCardWidth = 125;
export const globalSelectCardWidth = 150;

export const globalGap = 30;
export const globalHoverGap = 50;

export const globalHoverTopGap = 5;

export const globalSelectLeft = 300;
export const globalSelectTopGap = 20;

export const globalDiscardTop = 200;

export const defaultHandSize = 4;

//
//
// Cities

class City {
    name: string;
    latitude: number;
    longitude: number;

    constructor(name: string, latitude: number, longitude: number) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude
    }
}

const buenosAires = new City("Buenos Aires", -34.60, -58.38);
const london = new City("London", 51.50, 0.11);
const ryanOklahoma = new City("Ryan, Oklahoma", 34.02, -97.95);
const tokyo = new City("Tokyo", 35.65, 139.83)
const istanbul = new City("Istanbul", 41.01, 28.97)
const paris = new City("Paris", 48.86, 2.34)
const aktau = new City("Aktau", 43.69, 51.26)
const pyongyang = new City("Pyongyang", 39.01, 125.73)

//
//
// Impact

type Impact = {
    damage: number;
    healing: number;
    shield: number;
    critDamage: number;
    critHealing: number;
    critShield: number;
    phrase: string;
    crit: boolean;
}

//
//
// Card

class Card {
    name: string = "Fireball";
    srcFront: string = "fireball.svg";
    srcBack: string = "back.svg";
    callback: Function = () => {}

    constructor(name: string = "Fireball", srcFront: string = "fireball.svg", callback: Function = () => {}) {
        this.name = name;
        this.srcFront = srcFront;
        this.callback = callback;
    }

    async use(): Promise<string> {return await this.callback(buenosAires)}
}

const fireball = new Card("Fireball","fireball.svg", async (city: City) => {
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
            phrase: `It is ${result} in ${city.name}!`,
            crit: result === "Clear " ? true : false,
        }
        return impact;
    }

    } catch(err) {
        throw new Error(`An error has occured: ${err}`)
    }
    
})

const cloudShield = new Card("Cloud shield","cloud-shield.svg")
const cauterizeWounds = new Card("Cauterize wounds", "cauterize-wounds.svg")
const healingRain = new Card("Healing rain", "healing-rain.svg")
const lightning = new Card("Lightning", "lightning.svg");
const waterBolt = new Card("Water bolt", "water-bolt.svg");

// const availableCards: Card[] = [
//     fireball, cloudShield, cauterizeWounds, healingRain, lightning, waterBolt
// ]

const availableCards: Card[] = [
    fireball, fireball, fireball, fireball, fireball, waterBolt
]

//
//
// Card in hand

class CardInHand {
    card: Card = fireball;
    width: number = globalCardWidth;
    frontVisible: boolean = true;
    id: number = 0;
    left: number = 0;
    top: number = 0;
    state: "default" | "hover" | "active" | "inUse" |"discarded" = "default";

    constructor(card: Card = fireball, id: number = 0, left: number = 0, frontVisible: boolean = true, ) {
        this.card = card;
        this.id = id;
        this.left = left;
        this.frontVisible = frontVisible;
    }

    moveLeft(gap: number) {
        this.left -= gap;
    }
    select(left: number, top: number, width: number) {
        this.left = left;
        this.width = width;
        this.top = top;
    }
}

const fireballInHand = new CardInHand()

//
//
// Hand

export class Hand {
    orientation: string = "top";
    gap: number = globalGap;
    selectPosition: number = globalSelectLeft;
    cards: CardInHand[] = [];
    animationPlays: boolean = false;
    animationTime: number = 250;
    hasSelectedCards: boolean = false;
    frontVisible: boolean = true;

    constructor(orientation: string = "top", gap: number = globalGap, cards: CardInHand[] = [fireballInHand], frontVisible: boolean = true) {
        this.orientation = orientation;
        this.gap = gap;
        this.cards = cards;
        this.frontVisible = frontVisible;
    }

    renderCards() {
        if (this.cards.filter(e => e.state === 'hover').length > 0) {
            this.gap = globalHoverGap
        } else {
            this.gap = globalGap
        }

        let i = 0;
        this.cards.forEach((card, index) => {
            if (card.state === "default") {
                card.width = globalCardWidth;
                card.top = 0;
                card.left = this.gap*i;
                i = i + 1; 
            } else if (card.state === "hover") {
                card.width = globalHoverCardWidth;
                card.top = globalHoverTopGap;
                card.left = this.gap*((i === 0) ? i : i+1);
                i = (i === 0) ? i+2 : i+3;            
            } else if (card.state === "active") {
                card.select(globalSelectLeft,globalSelectTopGap,globalSelectCardWidth);
            } else if (card.state === "discarded") {

            }
        })
    }
    
    hoverCard(cardId: number) {
        const currentCard = this.cards.find((card) => card.id === cardId);
        if (!this.animationPlays && currentCard?.state === "default") {
            currentCard.state = "hover";
            this.renderCards();
        }
    }

    unhoverCard(cardId: number) {
        const currentCard = this.cards.find((card) => card.id === cardId);
        if (!this.animationPlays && currentCard?.state === "hover") {
            currentCard.state = "default";
            this.renderCards();
        }
    }

    selectCard(cardId: number) {
        const currentCard = this.cards.find((card) => card.id === cardId);
        if ((!this.hasSelectedCards) && ((currentCard?.state === "default") || (currentCard?.state === "hover"))) {
            currentCard.state = "active";
            this.hasSelectedCards = true;
            this.renderCards();

            this.animationPlays = true;
            setTimeout(() => {this.animationPlays = false}, this.animationTime);
        }
    }

    deselectCard(cardId: number) {
        const currentCard = this.cards.find((card) => card.id === cardId);
        if (currentCard?.state === "active") {
            currentCard.state = "default";
            this.hasSelectedCards = false;
            this.renderCards();

            this.animationPlays = true;
            setTimeout(() => {this.animationPlays = false}, this.animationTime);
        }
    }

    fillHand(handSize: number, availableCards: Card[]) {
        this.cards = [];
        for (let i = 0; i < handSize; i++) {
            const newCard = availableCards[Math.floor(Math.random()*availableCards.length)];
            const newCardInHand = new CardInHand(newCard, i, this.gap*i, this.frontVisible ? true : false)
            this.cards.push(newCardInHand);
        }
    }

    addCard(availableCards: Card[]) {
        const newCard = availableCards[Math.floor(Math.random()*availableCards.length)];
        const newCardInHand = new CardInHand(newCard, this.cards.length, this.gap*this.cards.length, true)
        this.cards.push(newCardInHand);
    }

    removeCard(cardId: number) {
        const currentCard = this.cards.find((card) => card.id === cardId);
        if (currentCard) {
            currentCard.state = 'discarded';
        }
        this.renderCards();

    }

    useCard(cardId: number) {
        const currentCard = this.cards.find((card) => card.id === cardId);
        if (currentCard) {
            currentCard.state = 'inUse';
        }
        this.renderCards();
        currentCard?.card.use()
    }

    destroyCard(cardId: number) {
        this.removeCard(cardId);
        this.hasSelectedCards = false;
    }
}

const playerHand = new Hand("bottom",30,[],true);
playerHand.fillHand(defaultHandSize,availableCards)

export const playerHandStore = writable(playerHand)

const enemyHand = new Hand("top",30,[],false);
enemyHand.fillHand(defaultHandSize,availableCards)

export const enemyHandStore = writable(enemyHand)

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

//
//
// Player

class Player {

}
