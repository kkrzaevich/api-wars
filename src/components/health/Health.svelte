<script lang="ts">
    export let health = 30;
    export let shield = 0;
</script>

<main>
        <img src="/health/hp.svg" alt="health points">
        <p>{health}</p>
        <img src="/health/shield.svg" alt="shield points">
        <p>{shield}</p>
</main>

<style>
    main {
        display: grid;
        gap: 20px;
        grid-template-columns: fit-content(100ch) fit-content(1ch);
        grid-auto-flow: row;
        align-items: center;
        justify-items: center;
        width: fit-content;
    }

    div {
        /* display: flex;
        justify-content: space-between;
        align-items: center;
        align-self: stretch; */
    }

    p {
        color: #000;

        font-family: PT Mono;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
</style>

