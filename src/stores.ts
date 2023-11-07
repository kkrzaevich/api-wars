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
    animationPlays: boolean = false;
    animationTime: number = 250;
    hasSelectedCards: boolean = false;

    constructor(orientation: string = "top", gap: number = globalGap, cards: CardInHand[] = [fireballInHand]) {
        this.orientation = orientation;
        this.gap = gap;
        this.cards = cards;
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
            }
        })
    }
    
    hoverCard(cardId: number) {
        const currentCard = this.cards.find((card) => card.id === cardId);
        if (!this.animationPlays && currentCard?.state === "default") {
            currentCard.state = "hover";
            this.renderCards();
        }
        console.log(`HOVER a card with a name ${currentCard?.card.name}, id ${currentCard?.id}`)
    }

    unhoverCard(cardId: number) {
        const currentCard = this.cards.find((card) => card.id === cardId);
        if (!this.animationPlays && currentCard?.state === "hover") {
            currentCard.state = "default";
            this.renderCards();
        }
        console.log(`UNHOVER a card with a name ${currentCard?.card.name}, id ${currentCard?.id}`)
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
        console.log(`SELECT a card with a name ${currentCard?.card.name}, id ${currentCard?.id}`)
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
        console.log(`DESELECT a card with a name ${currentCard?.card.name}, id ${currentCard?.id}`)
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
        // this.cards.forEach((card, index) => {
        //     card.id = index;
        // })
        this.renderCards();
    }

    useCard(cardId: number) {
        this.removeCard(cardId);
        this.hasSelectedCards = false;
    }
}

const initHand = new Hand("bottom",30,[]);
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
