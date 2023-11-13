<script>
  import Battlefield from "./components/battlefield/Battlefield.svelte";
  import PlayerHandCopy from "./components/cards/PlayerHandCopy.svelte";
  import EnemyHand from "./components/cards/EnemyHand.svelte";
  import Card from "./components/cards/Card.svelte";
</script>

<main>
  <div class="top">
    <EnemyHand/>
  </div>
  <div class="center">
    <Battlefield />
  </div>
  <div class="bottom">
    <PlayerHandCopy/>
  </div>
  
  
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 106px;
    height: 100vh;

    padding: 50px 79px 50px 79px;

    position: relative;
    transform: translate(0);
  }

  .center {
    z-index: -1;
  }

  .top {
    position: absolute;
    top: 50px;
  }

  .bottom {
    position: absolute;
    bottom: 50px;
  }
</style>