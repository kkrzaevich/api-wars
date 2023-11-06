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

export const globalHoverTopGap = 50;

export const globalSelectLeft = 300;
export const globalSelectTopGap = 70;

export const defaultHandSize = 4;

//
//
// Card

class Card {
    name: string = "Fireball";
    srcFront: string = "fireball.svg";
    srcBack: string = "back.svg";

    constructor(name: string = "Fireball", srcFront: string = "fireball.svg") {
        this.name = name;
        this.srcFront = srcFront;
    }

    use() {}
}

const fireball = new Card("Fireball","fireball.svg")
const cloudShield = new Card("Cloud shield","cloud-shield.svg")
const cauterizeWounds = new Card("Cauterize wounds", "cauterize-wounds.svg")
const healingRain = new Card("Healing rain", "healing-rain.svg")
const lightning = new Card("Lightning", "lightning.svg");
const waterBolt = new Card("Water bolt", "water-bolt.svg");

const availableCards: Card[] = [
    fireball, cloudShield, cauterizeWounds, healingRain, lightning, waterBolt
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
    state: "default" | "hover" | "active" = "default";

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

    constructor(orientation: string = "top", gap: number = globalGap, cards: CardInHand[] = [fireballInHand]) {
        this.orientation = orientation;
        this.gap = gap;
        this.cards = cards;
    }
    
    hoverCard(cardId: number) {
        this.gap = globalHoverGap;
        this.cards.forEach((card, index) => {
            if (card.id === cardId) {
                card.width = globalHoverCardWidth;
                card.top = globalHoverTopGap;
            } else if (card.id > cardId) {
                card.moveLeft(-this.gap/2);               
            } else {
                card.moveLeft(this.gap/2);
            }
        })
    }

    unhoverCards() {
        this.gap = globalGap;
        this.cards.forEach((card, index) => {
            card.width = globalCardWidth;
            card.top = 0;
            card.left = this.gap*index;
        })
    }

    selectCard(cardId: number) {
        this.cards.forEach((card, index) => {
            if (card.id === cardId) {
                card.select(globalSelectLeft,globalSelectTopGap,globalSelectCardWidth)
            } else if (card.id > cardId) {
                card.moveLeft(this.gap*1.5);
            }
        })
    }

    deselectCard(cardId: number) {
        this.cards.forEach((card, index) => {
            card.width = globalCardWidth;
            card.top = 0;
            card.left = this.gap*index;
        })
    }

    fillHand(handSize: number, availableCards: Card[]) {
        this.cards = [];
        for (let i = 0; i < handSize; i++) {
            const newCard = availableCards[Math.floor(Math.random()*availableCards.length)];
            const newCardInHand = new CardInHand(newCard, i, this.gap*i, true)
            this.cards.push(newCardInHand);
        }
    }

    addCard(availableCards: Card[]) {
        const newCard = availableCards[Math.floor(Math.random()*availableCards.length)];
        const newCardInHand = new CardInHand(newCard, this.cards.length, this.gap*this.cards.length, true)
        this.cards.push(newCardInHand);
    }

    removeCard(id: number) {
        this.cards.splice(id, 1);
        this.cards.forEach((card, index) => {
            card.id = index;
        })
    }

    useCard(cardId: number) {
         
    }
}

const initHand = new Hand("top",30,[]);
initHand.fillHand(defaultHandSize,availableCards)

export const hand = writable(initHand)

//
//
// Character class

class CharacterClass {

}

//
//
// Player

class Player {

}
