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

    function selectCard(this: HTMLButtonElement) {
        this.classList.add('active');
        this.classList.remove('card-top');
        console.log(this.classList);
    }

    function hoverCard(this: HTMLButtonElement) {
        gap = 50;
        top = 100;

    }

    $: gap = 30;
    $: top = 0;

</script>


<div class="hand">
    {#each hand as src, i}
        <button style={`z-index: ${i}; transform: translate(${gap*(i)}px); top: ${top}px`}
         on:click={selectCard}
         on:mouseover={hoverCard} on:focus={hoverCard}
         on:mouseout={()=>{gap = 30}} on:blur={()=>{gap = 30}}
         class="card-top">
            <img src={`/cards/${src}`} alt="the card">
        </button>
	{/each}
</div>

<style>
    /* Для всех карт делаем position absolute, двигаем с помощью transform-translate в зависимости от  */

    .active {
        display: none;
    }

    .hand {
        position: relative;
        background-color: red;
        padding:100px;
    }

    .card-top {
        position: absolute;
        width: 100px;
        transition: all 1s;
        left:0px;
        top:0px;
    }

    img {
        width: 100%;
    }

    /* .card-top {
        width: 100px;
        transition: all 0.5s, margin 1.5s;
        margin: -30px;
        overflow: hidden;
    }

    .card-top:hover {
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.50));
        margin: -30px 0px 0px 0px;
        width: 125px;        
    }

    .active {
        width: 125px;
        transition: all 0.5s, margin 1.5s;
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.50));
        margin: -30px 0px 0px 0px;
        overflow: hidden;

        transform: translate(200px);
    }
    
    .hand {
        display: inline-flex;
        align-items: flex-start;
        gap: 0px;
        transition: gap 1.5s;
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.10));
        margin: 30px;
    }

    .hand:hover {
        gap: 50px;
    } */
</style>