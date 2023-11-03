<script lang="ts">
    import Card from "./card/Card.svelte";
    import {cards} from "../../stores"

    export let handSize = 4;

    let localCards: string[] = [];
    cards.subscribe((cards) => {localCards = [...cards]});

    const shuffleArray = (inputArray: string[]) : string[] => {
        let array = [...inputArray];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    let shuffledCards = shuffleArray(localCards);
    
    const getShuffledHand = (inputArray: string[], handSize: number) : string[] => {
        let hand : string[] = [];
        for (let i = 0; i < handSize; i++) {
            hand.push(shuffleArray(localCards)[0])
        }
        return hand;
    }
    
    const hand = getShuffledHand(localCards, handSize);


</script>

<div class="hand">
    {#each hand as src, i}
        <div style={`z-index: ${i}`}>
            <Card src={`/cards/${src}`}  class="card-bottom"/>
        </div>
	{/each}
</div>

<style>
    :global(.card-bottom) {
        width: 100px;
        transition: all 0.5s, margin 1.5s;
        margin: -30px;
        overflow: hidden;
    }

    :global(.card-bottom):hover {
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.50));
        margin: 0px 0px -30px 0px;
        width: 125px;  
    }

    .hand {
        display: inline-flex;
        align-items: flex-end;
        gap: 0px;
        transition: gap 1.5s;
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.10));
        margin: 30px;
    }

    .hand:hover {
        gap: 50px;
    }
</style>