<script lang="ts">
    import { Hand, playerHandStore, emenyHandStore } from "../../stores";
    import { fade, fly } from 'svelte/transition';
    export let orientation: "top" | "bottom" = "bottom";

    let localHand: Hand;
    emenyHandStore.subscribe((hand) => {localHand = hand});


</script>

<main>
    {#each localHand.cards as card, i}
        {#if card.state !== "discarded"}
            <div style={`z-index: ${card.id+1}; 
            left: ${card.left}px; 
            ${localHand.orientation === "top" ? "top" : "bottom"}: ${card.top}px; 
            
            width: ${card.width}px`}
            out:fly={{ delay: 0, y: 200 }}
            >
                <!-- {#if card.state==="active"}
                    <button class="arrow top" in:fade={{ delay: 250 }} out:fade={{ delay: 250 }} on:click={() => {
                        localHand.useCard(card.id); 
                        localHand = localHand;
                        setTimeout(()=>{localHand.destroyCard(card.id);localHand = localHand;},2000)
                        }}>
                        <img src="/cards/use.svg" alt="use card">
                    </button>
                {/if} -->
                <button class={`card ${card.state === "inUse" ? "in-use" : ""}`}
                on:click={() => {localHand.selectCard(card.id); localHand = localHand;
                        setTimeout(()=>{localHand.useCard(card.id);localHand = localHand;},2000)
                        setTimeout(()=>{localHand.destroyCard(card.id);localHand = localHand;},4000)
                }}
                on:mouseover={() => {localHand.hoverCard(card.id); localHand = localHand}} on:focus={() => {localHand.hoverCard(card.id); localHand = localHand}}
                on:mouseout={()=>{localHand.unhoverCard(card.id); localHand = localHand}} on:blur={()=>{localHand.unhoverCard(card.id); localHand = localHand}}
                out:fade={{ delay: 250 }}
                >
                    {#if card.state === "inUse"}
                        <img
                        src={`/cards/${card.card.srcFront}`} 
                        alt="the card">
                    {:else}
                        <img
                        src={`/cards/${card.card.srcBack}`} 
                        alt="the card">
                    {/if}
                </button>
                <!-- {#if card.state==="active"}
                    <button class="arrow bottom" in:fade={{ delay: 250 }} out:fade={{ delay: 250 }} on:click={() => {localHand.deselectCard(card.id); localHand = localHand}}>
                        <img src="/cards/deselect.svg" alt="deselect card">
                    </button>
                {/if} -->
            </div>
        {/if}
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
        width: 100%;
    }

    .card {
        transition: filter 1s;
    }

    /* .card:hover {
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.50));
    } */

    .in-use {
        filter: drop-shadow(0px 4px 50px rgba(255, 125, 0, 0.75));
    }

    /* .in-use:hover {
        filter: drop-shadow(0px 4px 15px rgb(255, 125, 0));
    } */

    div {
        position: absolute;
        width: 100px;
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
        top: 105%;
        transform: scaleY(-1);
    }

    .bottom {
        bottom: 105%;
        transform: scaleY(-1);
    }
</style>