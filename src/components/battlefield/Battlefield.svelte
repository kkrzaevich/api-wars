<script lang="ts">
    import Health from "../health/Health.svelte";
</script>

<main>
    <div class="health-left">
        <Health />
    </div>
    <div class="stage">
        <img src="/players/player1.svg" alt="player 1">
        <img src="/players/player2.svg" alt="player 2">
    </div>
    <div class="health-right">
        <Health />        
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