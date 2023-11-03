<script lang="ts">
    import Health from "../health/Health.svelte";
</script>

<main>
    <Health />
    <div class="stage">
        <img src="/players/player1.svg" alt="player 1">
        <img src="/players/player2.svg" alt="player 2">
    </div>
    <Health />
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 122px;

    }

    .stage {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        gap: 577px;

        border-bottom: 2px solid rgba(0, 0, 0, 0.50);

        transform: scale(0.5);
    }
</style>