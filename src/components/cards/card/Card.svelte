<script lang="ts">
    export let callback = () => {};
    export let src = "/cards/fireball.svg"

</script>

<button on:click={callback} class={$$props.class}>
    <img src={src} alt="the card">
</button>

<style>
    img {
        width: 100%;
    }
</style>
