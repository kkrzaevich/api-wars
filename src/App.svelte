<script>
  import HandTop from "./components/cards/HandTop.svelte";
  import HandBottom from "./components/cards/HandBottom.svelte";
  import Battlefield from "./components/battlefield/Battlefield.svelte";
  import Hand from "./components/cards/Hand.svelte";
</script>

<main>
  <!-- <div class="top">
    <HandTop />
  </div>
  <div class="center">
    <Battlefield />
  </div>
  <div class="bottom">
    <HandBottom />
  </div> -->
  <Hand />
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