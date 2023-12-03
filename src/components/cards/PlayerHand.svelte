<script lang="ts">
    import { player, enemy } from "../../stores";
    import { Hand } from "../../lib/hand";
    import { fade, fly } from 'svelte/transition';
    import { timeline } from "../../stores";

    let localHand: Hand; 
    player.subscribe((player) => {localHand = player.hand});

    $: status = "";

</script>

<main>
    <h1 style="position:absolute; left:-300px; bottom:200px;">Status: {status}</h1>
    {#each localHand.cards as card}
        {#if card.state !== "discarded"}
            <div class="card-wrapper" style={`z-index: ${card.id+1}; 
            left: ${card.left}px;
            ${localHand.orientation === "top" ? "top" : "bottom"}: ${card.top}px;`}
            out:fly={{ delay: 0, y: -200 }}>
                {#if card.state==="active"}
                    <button class="arrow top" in:fade={{ delay: 250 }} out:fade={{ delay: 250 }} on:click={async () => {
                        localHand.useCard(card.id); 
                        localHand = localHand;
                        let impact = await card.card.use(player, enemy);
                        status = impact.phrase;
                        setTimeout(()=>{localHand.destroyCard(card.id);localHand = localHand;},2000)
                        }}>
                        <img src="/cards/use.svg" alt="use card">
                    </button>
                {/if}
                <button class="card {`${card.state==="active" ? "active" : ""} 
                ${card.state==="inUse" ? "in-use" : ""}
                `}" 
                style={`width: ${card.width}px; height: ${card.width*1.5}px;`}
                on:mouseover={()=>{localHand.hoverCard(card.id); localHand = localHand}} on:focus={()=>{localHand.hoverCard(card.id); localHand = localHand}}
                on:mouseout={()=>{localHand.unhoverCard(card.id); localHand = localHand}} on:blur={()=>{localHand.unhoverCard(card.id); localHand = localHand}}
                on:click={() => {localHand.selectCard(card.id); localHand = localHand}}
                >
                    <div class="card-inner">
                        <img src={`/cards/${card.card.srcFront}`} class="card-front" alt="card-front">
                        <img src={`/cards/${card.card.srcBack}`} class="card-back" alt="card-back">
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
    main {
        position: relative;
    }

    .card-wrapper {
        position: absolute;
        width: fit-content;
        transition: all 1s;
    }

    .card {
        background-color: transparent;
        perspective: 1000px;
        transition: all 1s;
    }

    .card:hover {
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5));
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
        transform: rotateY(10deg) rotateZ(-5deg);  
    }

    .active:hover .card-inner {
        transform: rotateX(10deg) rotateY(-20deg) rotateZ(5deg);         
    }

    .in-use {
        transform: rotateX(15deg) rotateY(-10deg) rotateZ(15deg);  
        filter: drop-shadow(0px 4px 50px rgba(50, 0, 255, 0.75));       
    }

    .in-use:hover {
        filter: drop-shadow(0px 4px 15px rgb(50, 0, 255));
    }

    .discarded {
        transform: rotateY(-200deg);           
    }

    .card-front, .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
    }

    .card-back {
        transform: rotateY(180deg);
    }

    .arrow {
        position: absolute;
        width: 25%;

        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        text-align: center;

        transition: all 0.5s;
    }

    .arrow > img {
        width: 100%;
    }

    .arrow:hover {
        filter: drop-shadow(0px 4px 5px rgba(0, 0, 0, 0.50));

    }

    .top {
        top: 12%;
        left: 115%;
    }

    .bottom {
        bottom: 12%;
        left: 115%;
    }

    .top:hover {
        transform: rotateZ(5deg);   
    }

    .bottom:hover {
        transform: rotateZ(-12deg);         
    }
</style>