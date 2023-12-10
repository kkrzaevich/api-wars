import { writable } from 'svelte/store';
import { City, buenosAires, london, ryanOklahoma, tokyo, istanbul, paris, aktau, pyongyang} from './lib/cities';
import type { Impact } from './lib/impact';
import { Card, fireball, cloudShield, cauterizeWounds, healingRain, lightning, waterBolt, availableCards } from './lib/card';
import { globalCardWidth, globalHoverCardWidth, globalSelectCardWidth, globalGap,
    globalHoverGap, globalHoverTopGap, globalSelectLeft, globalSelectTopGap, 
    globalDiscardTop, defaultHandSize, globalShieldTick } from './lib/globalVariables';
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

player.subscribe(player => {
    conditions.playerCity = player.characterClass.hometown;
    if (player.health <= 0) {
        timeline.update(timeline => {timeline.phase = "enemy-won"; return timeline})
    }
})
enemy.subscribe(enemy => {
    conditions.enemyCity = enemy.characterClass.hometown;
    if (enemy.health <= 0) {
        timeline.update(timeline => {timeline.phase = "player-won"; return timeline})
    }
})

export const timeline = writable(timeline1);

timeline.subscribe(
    timelineInner => {
        if (timelineInner.phase === "player-crit") {
            setTimeout(() => {
                timeline.update(timeline => {
                    timeline.phase = "enemy-select-card"
                    return timeline
                });
            }, timeline1.turnDelay)
        }

        if (timelineInner.phase === "enemy-crit") {
            setTimeout(() => {
                console.log("Dealing cards")
                timeline.update(timeline => {
                    timeline.phase = "dealing-cards"
                    return timeline
                });
            }, timeline1.turnDelay)
        }

        if (timelineInner.phase === "dealing-cards") {
            setTimeout(() => {
                console.log("Returning back to player turn")
                timeline.update(timeline => {
                    timeline.phase = "player-select-card"
                    return timeline
                });
                player.update(player => {
                    player.hand.addCard(player.characterClass.cards);
                    if (player.shield > 0) {
                        player.shield -= globalShieldTick; 
                    }
                    return player
                })
                enemy.update(enemy => {
                    enemy.hand.addCard(enemy.characterClass.cards); 
                    if (enemy.shield > 0) {
                        enemy.shield -= globalShieldTick; 
                    }
                    return enemy
                })
            }, timeline1.dealDelay)
        }
           }
)

