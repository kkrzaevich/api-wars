import { writable } from 'svelte/store';
import { City, buenosAires, london, ryanOklahoma, tokyo, istanbul, paris, aktau, pyongyang} from './lib/cities';
import type { Impact } from './lib/impact';
import { Card, fireball, cloudShield, cauterizeWounds, healingRain, lightning, waterBolt, availableCards } from './lib/card';
import { globalCardWidth, globalHoverCardWidth, globalSelectCardWidth, globalGap,
    globalHoverGap, globalHoverTopGap, globalSelectLeft, globalSelectTopGap, 
    globalDiscardTop, defaultHandSize } from './lib/globalVariables';
import { CardInHand, fireballInHand} from './lib/cardInHand';
import { Hand, playerHand, enemyHand } from './lib/hand';
import { Player, player1, player2 } from './lib/player';
import { conditions } from './lib/conditions';
import { timeline1 } from './lib/timeline';

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

export const player = writable(player1)

export const enemy = writable(player2)

player.subscribe(player => {conditions.playerCity = player.characterClass.hometown})
enemy.subscribe(enemy => {conditions.enemyCity = enemy.characterClass.hometown})

export const timeline = writable(timeline1);

timeline.subscribe(
    timeline => {console.log(`Current stage is ${timeline.phase}`)}
)

