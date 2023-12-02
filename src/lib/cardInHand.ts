import type { Card } from './card';
import { fireball, cloudShield, cauterizeWounds, healingRain, lightning, waterBolt, availableCards } from './card';
import { globalCardWidth, globalHoverCardWidth, globalSelectCardWidth, globalGap,
    globalHoverGap, globalHoverTopGap, globalSelectLeft, globalSelectTopGap, 
    globalDiscardTop, defaultHandSize } from './globalVariables';

//
//
// Card in hand

export class CardInHand {
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

export const fireballInHand = new CardInHand()