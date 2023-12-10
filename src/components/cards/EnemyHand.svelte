<script lang="ts">
    import { enemy, player } from "../../stores";
    import { Hand } from "../../lib/hand";
    import { fade, fly } from 'svelte/transition';
    import { timeline } from "../../stores";
    import type { Timeline } from "../../lib/timeline";

    let localEnemyHealth = 30; 
    let localHand: Hand = new Hand("top",30,[],false);
    let handSize = 0;
    enemy.subscribe((enemy) => {
        localEnemyHealth = enemy.health;
        if (handSize !== enemy.hand.cards.length) {
            handSize = enemy.hand.cards.length;
            setTimeout(() => {
                localHand.cards.forEach((card) => {
                    card.top = 0;
                    localHand = localHand;
                })
            });
        }
        
        localHand = enemy.hand
    });

    let localTime: Timeline;

    let playedCardId = 0;

    timeline.subscribe(async (timeline) => {      
        localTime = timeline
        
        if (timeline.phase === "enemy-select-card") {
            if (localEnemyHealth < 24) {
                playedCardId = localHand.getRandomUsableCardId()
            } else {
                playedCardId = localHand.getRandomUsableNonhealingCardId()
            }

            localHand.hoverCard(playedCardId) 
            localHand = localHand;
            setTimeout(() => {
                localHand.enemySelectCard(playedCardId);
                localHand = localHand;                
            }, 1000)
            setTimeout(async () => {
                console.log("The enemy is using card")
                localHand.useCard(playedCardId); 
                localHand = localHand;
                let impact = await localHand.cards[playedCardId].card.use(enemy, player);
                setTimeout(()=>{localHand.destroyCard(playedCardId);localHand = localHand;},2000)
            }, 4000)
        }

        if (timeline.phase === "enemy-use-card") {

        }
    });

</script>

<main>
    {#each localHand.cards as card}
        {#if card.state !== "discarded"}
            <div class="card-wrapper" style={`z-index: ${card.id+1}; 
            left: ${card.left}px;
            ${localHand.orientation === "top" ? "top" : "bottom"}: ${card.top}px;`}
            out:fly={{ delay: 0, y: 200 }}>
                <!-- {#if card.state==="active"}
                    <button class="arrow top" in:fade={{ delay: 250 }} out:fade={{ delay: 250 }} on:click={() => {
                        localHand.useCard(card.id); 
                        localHand = localHand;
                        setTimeout(()=>{localHand.destroyCard(card.id);localHand = localHand;},2000)
                        }}>
                        <img src="/cards/use.svg" alt="use card">
                    </button>
                {/if} -->
                <!-- <button class="{`
                ${card.state==="active" || "inUse"  ? "card" : ""} 
                ${card.state==="active" ? "active" : ""} 
                ${card.state==="inUse" ? "in-use" : ""}
                `}" 
                style={`width: ${card.width}px; height: ${card.width*1.5}px;`}
                on:mouseover={()=>{localHand.hoverCard(card.id); localHand = localHand}} on:focus={()=>{localHand.hoverCard(card.id); localHand = localHand}}
                on:mouseout={()=>{localHand.unhoverCard(card.id); localHand = localHand}} on:blur={()=>{localHand.unhoverCard(card.id); localHand = localHand}}
                on:click={() => {
                    localHand.selectCard(card.id, localTime);
                    localHand = localHand}}
                > -->
                <button class="{`
                    ${card.state==="active" || "inUse"  ? "card" : ""} 
                    ${card.state==="active" ? "active" : ""} 
                    ${card.state==="inUse" ? "in-use" : ""}
                    `}" 
                    style={`width: ${card.width}px; height: ${card.width*1.5}px;`}
                    >
                    <div class="card-inner">
                        <img src={`/cards/${card.card.srcFront}`} class="card-back" alt="card-back">
                        <img src={`/cards/${card.card.srcBack}`} class="card-front" alt="card-front">
                    </div>
                </button>
                <!-- {#if card.state==="active"}
                    <button class="arrow bottom" in:fade={{ delay: 250 }} out:fade={{ delay: 250 }} on:click={() => {
                        localHand.deselectCard(card.id); localHand = localHand}}>
                        <img src="/cards/deselect.svg" alt="deselect card">
                    </button>
                {/if} -->
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

    .active {
        background-color: transparent;
        perspective: 1000px;
        transition: all 1s;
    }

    .in-use {
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
        transform: rotateY(20deg) rotateZ(-5deg);  
    }

    .active .card-inner {
        transform: rotateX(0deg) rotateY(180deg) rotateZ(0deg); 
    }

    .active:hover .card-inner {
        transform: rotateX(-10deg) rotateY(160deg) rotateZ(5deg); 
    }

    .in-use .card-inner {
        transform: rotateX(-15deg) rotateY(170deg) rotateZ(15deg);  
    }

    .in-use:hover .card-inner {
        transform: rotateX(-15deg) rotateY(170deg) rotateZ(15deg);  
    }
    
    .in-use {
        filter: drop-shadow(0px 4px 50px rgba(255, 100, 100, 0.75)); 
    }

    .in-use:hover {
        filter: drop-shadow(0px 4px 15px rgba(255, 100, 100, 1)); 
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