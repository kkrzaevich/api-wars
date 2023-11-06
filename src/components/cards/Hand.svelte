<script lang="ts">
    import { Hand, 
        hand, 
        globalHoverCardWidth, 
        globalSelectCardWidth, 
        globalGap, 
        globalHoverGap, 
        globalHoverTopGap,
        globalSelectLeft, 
        globalSelectTopGap, 
        defaultHandSize} from "../../stores";

    let localHand: Hand;
    hand.subscribe((hand) => {localHand = hand});

</script>

<button on:click={()=>{console.log(localHand)}}>click me</button>
<main>
    {#each localHand.cards as card, i}
        <button style={`z-index: ${card.id+1}; left: ${card.left}px; top: ${card.top}px; width: ${card.width}px`}
        on:click={() => {localHand.selectCard(card.id); localHand = localHand}}
        on:mouseover={() => {localHand.hoverCard(card.id); localHand = localHand}} on:focus={() => {localHand.hoverCard(card.id); localHand = localHand}}
        on:mouseout={()=>{localHand.unhoverCards(); localHand = localHand}} on:blur={()=>{localHand.unhoverCards(); localHand = localHand}}
        class="card-top">
            <img src={`/cards/${card.card.srcFront}`} alt="the card">
        </button>
    {/each}
</main>




<style>
    img {
        width: 100%;
    }

    main {
        position: relative;
    }

    button {
        position: absolute;
        width: 100px;
        transition: all 1s;
    }
</style>