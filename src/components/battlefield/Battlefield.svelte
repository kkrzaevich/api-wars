<script lang="ts">
    import Health from "../health/Health.svelte";
    import { player, enemy } from "../../stores";
    import { timeline } from "../../stores";
    import { Timeline } from "../../lib/timeline";
    import { showTurnTime } from "../../lib/globalVariables";
    import { fade } from "svelte/transition";

    let playerHealth: number = 30; 
    let playerShield: number = 0; 

    let enemyHealth: number = 30; 
    let enemyShield: number = 0; 

    player.subscribe((player) => {playerHealth = player.health; playerShield = player.shield;});
    enemy.subscribe((enemy) => {enemyHealth = enemy.health; enemyShield = enemy.shield;});

    let localTime: Timeline;
    let turn: {
        turn: "player" | "enemy",
        visible: boolean,
    } = {
        turn: "player",
        visible: false,
    };

    timeline.subscribe((timeline) => {
        if (timeline.phase === "player-select-card") {
            turn.turn = "player";
            turn.visible = true;
            setTimeout(() => {  turn.visible = false }, showTurnTime)
        }
        if (timeline.phase === "enemy-select-card") {
            turn.turn = "enemy";
            turn.visible = true;
            setTimeout(() => {  turn.visible = false }, showTurnTime)
        }
        localTime = timeline})

</script>



<p>{`The phase is ${localTime.phase}.`}</p>
<button on:click={
    () => {
        timeline.subscribe((timeline) => {console.log("The phase is ",timeline.phase)});
    }
}>PRESS ME</button>
<main>
    {#if turn.visible}
        <h1 class="turn" in:fade={{ delay: 250, duration: 1000 }} out:fade={{ delay: 150, duration: 1000 }}>{turn.turn}'s turn</h1>
    {/if}
    <div class="health-left">
        <Health health={playerHealth} shield={playerShield}/>
    </div>
    <div class="stage">
        <img src="/players/player1.svg" alt="player 1">
        <img src="/players/player2.svg" alt="player 2">
    </div>
    <div class="health-right">
        <Health health={enemyHealth} shield={enemyShield}/>        
    </div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 122px;
        perspective: 1500px;
        position: relative;
    }

    .stage {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 577px;

        border-bottom: 2px solid rgba(0, 0, 0, 0.50);

        transform: scale(0.5);
    }

    .health-left {
        transform: rotateY(0deg);
        transition: transform 1s;
    }

    .health-right {
        transform: rotateY(0deg);
        transition: transform 1s;
    }

    .health-left:hover {
        transform: rotateY(30deg);
    }

    .health-right:hover {
        transform: rotateY(-30deg);
    }

    .turn {
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translate(-50%, -50%);

        font-family: PT Mono;
        font-size: 48px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        filter: drop-shadow(0px 4px 15px rgba(0, 0, 0, 0.25));
    }
</style>