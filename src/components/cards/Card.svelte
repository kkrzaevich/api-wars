<script>
  let width = 100;
  let height = 150;
</script>

<main>
  <div>
    <button class="flip-box" style={`width: ${width}px; height: ${height}px;`}
    on:mouseover={()=>{width= 125; height = 187.5}} on:focus={()=>{width= 125; height = 187.5}}
    on:mouseout={()=>{width= 100; height = 150}} on:blur={()=>{width= 100; height = 150}}
    >
        <div class="flip-box-inner">
          <img src="/cards/lightning.svg" class="flip-box-front" alt="card-front">
          <img src="/cards/back.svg" class="flip-box-back" alt="card-back">
        </div>
      </button>
  </div>

</main>

<style>
.flip-box {
  background-color: transparent;
  perspective: 1000px;
  transition: all 1s;
}

.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-box:hover .flip-box-inner {
  transform: rotateY(-200deg);
}

.flip-box-front, .flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}



.flip-box-back {

  transform: rotateY(180deg);
}
</style>