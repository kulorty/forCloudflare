<template>
  <Loading v-if="!isLoaded" :style="{ opacity: isOpacity ? 0 : 1 }" style="transition: opacity .8s ease-in-out;">
  </Loading>
  <Header />
  <div class="container" @wheel="nextPage" @click="playMusic">
    <Home :style="{ opacity: opacityIndex === 0 ? 1 : 0 }" v-show="showIndex === 0" />
    <Character :style="{ opacity: opacityIndex === 1 ? 1 : 0 }" v-show="showIndex === 1" />
    <City :style="{ opacity: opacityIndex === 2 ? 1 : 0 }" v-show="showIndex === 2" />

  </div>
  <div class="sub" :style="{ display: opacityIndex === 0 ? `none` : `block` }">
    <div class="subBtn"></div>
  </div>
</template>

<script setup>
import Loading from "./components/loading.vue";
import Header from "./components/Header.vue"
import Home from "./components/Home.vue"
import Character from "./components/Character.vue";
import City from "./components/City.vue";
import gsap from "gsap";
import { inject, ref, onMounted } from "vue";

const emitter = inject("emitter"), subShow = ref(false)
const direction = ref(""), isLoaded = ref(false), isOpacity = ref(false), transValue = ref(0), showIndex = ref(0)
const opacityIndex = ref(0)

const nextPage = (e) => {
  if (isLoaded) {
    if (e.deltaY > 0) {
      direction.value = "down"
      emitter.emit("direction", "down")
    } else if (e.deltaY < 0) {
      direction.value = "up"
      emitter.emit("direction", "up")
    }
  }
}
const playMusic = () => {
  emitter.emit("play", true)
}

onMounted(() => {
  window.onload = function () {
    document.addEventListener("touchstart", function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    });
    document.addEventListener("gesturestart", function (event) {
      event.preventDefault();
    });
    setTimeout(() => {
      isOpacity.value = true
    }, 3200)
    setTimeout(() => {
      isLoaded.value = true
    }, 4000)
  };
  emitter.on("toIndex", val => {
    showIndex.value = val
    setTimeout(() => {
      opacityIndex.value = val
    }, 10)

    if (val > 0) {
      setTimeout(() => {
        subShow.value = true
      }, 200);
    }
    if (transValue.value == 0) {
      subShow.value = false
    }
    gsap.fromTo(".sub", { marginLeft: -6 + "rem" }, { keyframes: [{ marginLeft: -16 + "rem", duration: .5 }, { marginLeft: -6 + "rem", duration: .5, delay: 1 }] })
  })
  emitter.on("subshow", val => {
    if (val) {
      subShow.value = val
    }

  })
})

</script>

<style scoped lang="scss">
.container {
  height: inherit;
  position: relative;
  display: flex;
  // width: 500vw;
}

.sub {
  background: url('/img/character/aside_yy.png') no-repeat;
  background-position: right -4rem;
  background-size: 160% auto;
  height: calc(100vh - 4.8rem);
  min-height: 600px;
  width: 16.6rem;
  position: absolute;
  top: 4.8rem;
  left: 0;
  margin-left: -6rem;
  text-align: right;
  z-index: 10;

  .subBtn {
    background: url('/img/character/aside_yyBtn.png') no-repeat;
    background-position: left;
    background-size: auto 100%;
    height: 14rem;
    width: 6rem;
    display: inline-block;
    margin: 2.6rem 3rem 0 0;
  }
}
</style>
