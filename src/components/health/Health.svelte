<script lang="ts">
  import App from "../../App.svelte";
    import { timeline } from "../../stores";
    import { fly, fade } from "svelte/transition";
    import { maxHp, maxShield } from "../../lib/globalVariables";
    export let health = 30;
    export let shield = 0;

    let displayedHealth = 30;
    let displayedShield = 0;

    let oldHealth = 0;
    let oldShield = 0;

    let healthDifference = 0;
    let shieldDifference = 0;

    let showHeal = false;
    let showDamage = false;

    let showShieldHeal = false;
    let showShieldDamage = false;

    let initialized = false;

    $: {
        if (initialized) {
            healthDifference = health - oldHealth;
            if (healthDifference > 0) {
                showHeal = true;
                setTimeout(() => {
                    showHeal = false;
                    for (let i=0;i<healthDifference;i++) {
                        setTimeout(
                            () => {
                                displayedHealth = displayedHealth + 1;
                            }, 125*i
                        )
                    }
                }, 1500)
            } else if (healthDifference < 0) {
                showDamage = true;
                setTimeout(() => {
                    showDamage = false;
                    for (let i=0;i<Math.abs(healthDifference);i++) {
                        setTimeout(
                            () => {
                                displayedHealth = displayedHealth - 1;
                            }, 125*i
                        )
                    }
                }, 1500)
            }

            shieldDifference = shield - oldShield;
            if (shieldDifference > 0) {
                showShieldHeal = true;
                setTimeout(() => {
                    showShieldHeal = false;
                    for (let i=0;i<shieldDifference;i++) {
                        setTimeout(
                            () => {
                                displayedShield = displayedShield + 1;
                            }, 125*i
                        )
                    }
                }, 1500)
            } else if (shieldDifference < 0) {
                showShieldDamage = true;
                setTimeout(() => {
                    showShieldDamage = false;
                    for (let i=0;i<Math.abs(shieldDifference);i++) {
                        setTimeout(
                            () => {
                                displayedShield = displayedShield - 1;
                            }, 125*i
                        )
                    }
                }, 1500)
            }

        } else {
            initialized = true;
        }
        oldHealth = health;
        oldShield = shield;
    }
</script>

<main>
        <img src="/health/hp.svg" alt="health points">
        {#if showHeal}
            <p class="gains heal"  in:fade={{ delay: 250 }} out:fly={{ y: -20 }}>{"+" + healthDifference}</p>
        {/if}
        {#if showDamage}
            <p class="gains damage"  in:fade={{ delay: 250 }} out:fly={{ y: 20 }}>{healthDifference}</p>
        {/if}
        {#if showShieldHeal}
            <p class="shield-gains shield-heal"  in:fade={{ delay: 250 }} out:fly={{ y: -20 }}>{"+" + shieldDifference}</p>
        {/if}
        {#if showShieldDamage}
            <p class="shield-gains shield-damage"  in:fade={{ delay: 250 }} out:fly={{ y: 20 }}>{shieldDifference}</p>
        {/if}
        <div class="points">
            <p class="points-current">{displayedHealth}</p>
            <p class="points-max">/{maxHp}</p>            
        </div>

        <img src="/health/shield.svg" alt="shield points">

        <div class="points">
            <p class="points-current">{displayedShield}</p>
            <p class="points-max">/{maxShield}</p>  
        </div>

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

        position: relative;

    }

    .points {
        display: flex;
    }

    .points-max {
        font-family: PT Mono;
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        padding-top: 3px;
    }

    img {
        min-width: 35px;
    }

    .points-current {
        color: #000;

        font-family: PT Mono;
        font-size: 2rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        justify-self: flex-start;

    }

    .points-current,img {
        transition: filter 0.5s;
    }

    .points-current:hover,img:hover {
        filter: drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.75));
    }

    .gains {
        position: absolute;

        font-family: PT Mono;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        top: -15px;
        right: -25px;
    }

    .shield-gains {
        position: absolute;

        font-family: PT Mono;
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        top: 48px;
        right: -25px;
    }

    .heal {
        color: rgba(0, 255, 51, 0.75);
    }

    .damage {
        color: rgba(233, 46, 46, 0.75);
    }

    .shield-heal {
        color: rgba(0, 195, 255, 0.75);
    }

    .shield-damage {
        color: rgba(49, 46, 233, 0.75);        
    }
</style>

