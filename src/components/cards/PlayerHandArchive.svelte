<script lang="ts">
    import { Hand, playerHandStore, emenyHandStore } from "../../stores";
    import { fade, fly } from 'svelte/transition';
    import Card from "./Card.svelte";

    let localHand: Hand; 
    playerHandStore.subscribe((hand) => {localHand = hand});


</script>

<main>
    <Card />
    <Card />
    <Card />
    <Card />

    {#each localHand.cards as card, i}
        {#if card.state !== "discarded"}
            <div style={`z-index: ${card.id+1}; 
            left: ${card.left}px; 
            ${localHand.orientation === "top" ? "top" : "bottom"}: ${card.top}px;`}
            out:fly={{ delay: 0, y: -200 }}
            >
                {#if card.state==="active"}
                    <button class="arrow top" in:fade={{ delay: 250 }} out:fade={{ delay: 250 }} on:click={() => {
                        localHand.useCard(card.id); 
                        localHand = localHand;
                        setTimeout(()=>{localHand.destroyCard(card.id);localHand = localHand;},2000)
                        }}>
                        <img src="/cards/use.svg" alt="use card">
                    </button>
                {/if}
                <button class={`card ${card.state === "inUse" ? "in-use" : ""}
                ${card.state === "active" ? "active" : ""}
                ${card.state === "hover" ? "hover" : ""}
                `}
                on:click={() => {localHand.selectCard(card.id); localHand = localHand}}
                on:mouseover={() => {localHand.hoverCard(card.id); localHand = localHand}} on:focus={() => {localHand.hoverCard(card.id); localHand = localHand}}
                on:mouseout={()=>{localHand.unhoverCard(card.id); localHand = localHand}} on:blur={()=>{localHand.unhoverCard(card.id); localHand = localHand}}
                out:fade={{ delay: 250 }}
                >
                    <div class="card-inner">
                        <img class="card-front" src={`/cards/${card.card.srcFront}`} alt="the card front">
                        <img class="card-back" src={`/cards/${card.card.srcBack}`} alt="the card back">
                    </div>
                    
                </button>
                {#if card.state==="active"}
                    <button class="arrow bottom" in:fade={{ delay: 250 }} out:fade={{ delay: 250 }} on:click={() => {
                        localHand.deselectCard(card.id); localHand = localHand}}>
                        <img src="/cards/deselect.svg" alt="deselect card">
                    </button>
                {/if}
            </div>
        {/if}
    {/each}
</main>




<style>
    div {
        width: fit-content;
    }

    img {
        width: 100%;
    }

    main {
        position: relative;
    }

    button {
        width: 100px;
        height: 150px;
        transition: all 10s;
    }

    .hover {
        width: 125px;
        height: 187.5px;
    }

    .active {
        width: 150px;
        height: 225px;
    }    

    .card {
        transition: filter 1s;
        perspective: 1000px;
    }

    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
    }

    .card:hover .card-inner {
        transform: rotateY(0deg);
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.50));
    }

    .card-back {
        transform: rotateY(180deg);
    }

    .card-front {
        transform: rotateY(0deg);
    }

    .card-front, .card-back {
        top:0px;
        left:0px;
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }


    .in-use {
        filter: drop-shadow(0px 4px 50px rgba(50, 0, 255, 0.75));
    }

    .in-use:hover {
        filter: drop-shadow(0px 4px 15px rgb(50, 0, 255));
    }

    div {
        position: absolute;
        width: fit-content;
        transition: all 1s;
    }

    .arrow {
        position: absolute;
        width: 25%;

        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;

        transition: filter 0.5s;
    }

    .arrow:hover {
        filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.50));
    }

    .top {
        bottom: 105%;
    }

    .bottom {
        top: 105%;
    }
</style>