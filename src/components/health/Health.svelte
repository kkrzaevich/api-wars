<script lang="ts">
    import { timeline } from "../../stores";
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

    img {
        min-width: 35px;
    }

    p {
        color: #000;

        font-family: PT Mono;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

    }

    p,img {
        transition: filter 0.5s;
    }

    p:hover,img:hover {
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.75));
    }
</style>

