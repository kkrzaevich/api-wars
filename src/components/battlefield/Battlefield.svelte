<script lang="ts">
    import Health from "../health/Health.svelte";
    import { player, enemy } from "../../stores";
    import { timeline } from "../../stores";
    import { Timeline } from "../../lib/timeline";

    let playerHealth: number = 30; 
    let playerShield: number = 0; 

    let enemyHealth: number = 30; 
    let enemyShield: number = 0; 

    player.subscribe((player) => {playerHealth = player.health; playerShield = player.shield;});
    enemy.subscribe((enemy) => {enemyHealth = enemy.health; enemyShield = enemy.shield;});

    let localTime: Timeline;
    // Вот здесь что-то не работает
    // Попробовать реализовать задание конкретных значений таймлайна?
    timeline.subscribe((timeline) => {localTime = timeline})

</script>

<p>{`The phase is ${localTime.phase}.`}</p>
<button on:click={
    () => {
        timeline.subscribe((timeline) => {console.log("The phase is ",timeline.phase)});
    }
}>PRESS ME</button>
<main>
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


</style>