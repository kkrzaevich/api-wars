<script>
  import Battlefield from "./components/battlefield/Battlefield.svelte";
  import PlayerHand from "./components/cards/PlayerHand.svelte";
  import EnemyHand from "./components/cards/EnemyHand.svelte";
</script>

<main>
  <div class="top">
    <EnemyHand/>
  </div>
  <div class="center">
    <Battlefield />
  </div>
  <div class="bottom">
    <PlayerHand/>
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
    top: 25px;
    padding-right: 500px;
  }

  .bottom {
    position: absolute;
    bottom: 25px;
  }

  :global(body) {
    height: 100%;
    overflow: hidden;
  }
</style>