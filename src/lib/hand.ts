import type { Card } from './card';
import type { Writable } from 'svelte/store';
import { fireball, cloudShield, cauterizeWounds, healingRain, lightning, waterBolt, availableCards } from './card';
import { globalCardWidth, globalHoverCardWidth, globalSelectCardWidth, globalGap,
    globalHoverGap, globalHoverTopGap, globalSelectLeft, globalSelectTopGap, 
    globalDiscardTop, defaultHandSize } from './globalVariables';
import { CardInHand, fireballInHand} from './cardInHand';
import { timeline } from "../stores";
import type { Timeline } from './timeline';


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

    // Вот здесь блокируем выбор карты
    selectCard(cardId: number, timeline: Timeline) {
        const currentCard = this.cards.find((card) => card.id === cardId);
        if ((timeline.phase === "player-select-card") && (!this.hasSelectedCards) && ((currentCard?.state === "default") || (currentCard?.state === "hover"))) {
            currentCard.state = "active";
            this.hasSelectedCards = true;
            this.renderCards();

            this.animationPlays = true;
            setTimeout(() => {this.animationPlays = false}, this.animationTime);
        }
    }

    enemySelectCard(cardId: number) {
        const currentCard = this.cards.find((card) => card.id === cardId);
        if (currentCard) {
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
            newCardInHand.top = -300;
            this.cards.push(newCardInHand);
        }
    }

    addCard(availableCards: Card[]) {
        const newCard = availableCards[Math.floor(Math.random()*availableCards.length)];
        const newCardInHand = new CardInHand(newCard, this.cards.length, this.gap*this.getUsableCards().length, true)
        newCardInHand.top = -300;
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
    }

    destroyCard(cardId: number) {
        this.removeCard(cardId);
        this.hasSelectedCards = false;
    }

    getUsableCards() {
        const cards: CardInHand[] = [];
        this.cards.forEach(card => {
            if (card.state !== "discarded") {
                cards.push(card)
            }
        });
        return cards;
    }

    getRandomUsableCardId() {
        const ids: number[] = [];
        this.cards.forEach(card => {
            if (card.state !== "discarded") {
                ids.push(card.id)
            }
        });

        const getShuffledArr = (arr: number[]) => {
            const newArr = arr.slice()
            for (let i = newArr.length - 1; i > 0; i--) {
                const rand = Math.floor(Math.random() * (i + 1));
                [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
            }
            return newArr
        };

        return getShuffledArr(ids)[0];
    }
}

export const playerHand = new Hand("bottom",30,[],true);
playerHand.fillHand(defaultHandSize,availableCards)

export const enemyHand = new Hand("top",30,[],false);
enemyHand.fillHand(defaultHandSize,availableCards)