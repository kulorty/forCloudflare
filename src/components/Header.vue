<template>
    <header>
        <div class="main">
            <div class="logo">
                <img src="/img/header/NTE_logo.png" alt="异环LOGO">
            </div>
            <nav>
                <div class="navBox">
                    <div v-for="(item, index) in items" key="index" :class="{ active: activeIndex == index }"
                        @click="setActive(index)" class="navItem">
                        {{ item }}
                    </div>
                </div>
                <div class="navShadow" :style="{ left: leftValue + 'rem' }">
                    <div class="shadowBox">
                        <div class="navSlider1">
                            <div v-for="(item, index) in shadows" key="index" class="shadow"
                                :class="{ 'animate1': animate1 }" :style="{ animationDelay: index * 0.2 + 's' }">{{ item
                                }}
                            </div>
                        </div>
                        <div class="navSlider2">
                            <div v-for="(item, index) in shadows1" key="index" class="shadow1"
                                :class="{ 'animate2': animate2 }" :style="{ animationDelay: index * 0.2 + 's' }">{{ item
                                }}
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
            <div class="deco"></div>
            <div class="bgMusic" :class="{ playing: isPlaying }" @click="togglePlaying"></div>
        </div>

    </header>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, inject } from 'vue';

const isPlaying = ref(false), items = Array(5).fill(''), shadows = Array(4).fill(''), shadows1 = Array(4).fill(''), activeIndex = ref(0)
const leftValue = ref(0), animate1 = ref(true), animate2 = ref(true), emitter = inject("emitter"), isChange = ref(false), isplay = ref(false)
const bgMusic = new Audio("/fakeYH/yh_gw_bgm.mp3")

const setActive = (val) => {
    activeIndex.value = val
    emitter.emit("toIndex", val)
    nextTick(() => {
        animate1.value = false
        animate2.value = false
        setTimeout(() => {
            animate1.value = true;
            animate2.value = true;
        }, 50)
    })
    if (val == 0) {
        emitter.emit("subshow", false)
    }
}

const togglePlaying = () => {
    isPlaying.value = !isPlaying.value
    if (isPlaying.value) {
        bgMusic.play()
    } else {
        bgMusic.pause()
    }
}

watch(activeIndex, (newval, oldval) => {
    if (newval > oldval) {
        leftValue.value += (newval - oldval) * 8.6
    } else if (newval < oldval) {
        leftValue.value -= (oldval - newval) * 8.6
    }
})

onMounted(() => {
    emitter.on("direction", val => {
        console.log(val)
        if (!isChange.value) {
            if (val == "down" && leftValue.value < 63.6) {
                isChange.value = true
                setActive(activeIndex.value + 1)
                setTimeout(() => {
                    isChange.value = false
                }, 2000)
            } else if (val == "up") {
                if (activeIndex.value >= 1) {
                    isChange.value = true
                    setActive(activeIndex.value - 1)
                    setTimeout(() => {
                        isChange.value = false
                    }, 2000)
                }
            }
        }
    })
    emitter.on("play", val => {
        if (val && !isplay.value) {
            bgMusic.play()
            isPlaying.value = true
            isplay.value = true
        }
    })
})

onUnmounted(() => {
    emitter.off("direction")
})
</script>

<style scoped lang="scss">
@keyframes cityShadow {
    0% {
        top: -2rem;
    }

    50% {
        top: 5rem
    }

    100% {
        top: 4.85rem;
    }
}

header {
    height: 4.8rem;
    position: relative;
    z-index: 10;
    min-width: 1200px;
    width: 100vw;

    .main {
        display: flex;
        background-color: rgb(29, 29, 29);
        height: 4.8rem;
        // width: 100%;
        padding: 0 2rem;
        z-index: 10;
        position: relative;
        align-items: center;
        justify-content: space-between;

        .logo {
            width: 4.2rem;
            display: flex;
            margin-left: 4rem;
            justify-content: center;
            align-items: center;

            img {
                width: 4.2rem;
            }
        }

        .logo:hover {
            cursor: pointer;
        }

        nav {
            display: flex;
            z-index: 10;
            align-items: center;
            position: relative;
            height: inherit;


            .navBox {
                background: rgb(29, 29, 29);
                z-index: 10;
                height: inherit;
                padding: 0 3rem;

                .navItem {
                    width: 8.8rem;
                    height: 1.4rem;
                    margin: 1.7rem 0;
                    display: inline-block;
                    background-position: 0;
                }

                .navItem:nth-child(1) {
                    background: url('/img/header/headerNav1.png') no-repeat;
                    background-size: cover;
                }

                .navItem:nth-child(2) {
                    background: url('/img/header/headerNav2.png') no-repeat;
                    background-size: cover;
                }

                .navItem:nth-child(3) {
                    background: url('/img/header/headerNav3.png') no-repeat;
                    background-size: cover;

                }

                .navItem:nth-child(4) {
                    background: url('/img/header/headerNav4.png') no-repeat;
                    background-size: cover;
                }

                .navItem:nth-child(5) {
                    background: url('/img/header/headerNav5.png') no-repeat;
                    background-size: cover;
                }

                .navItem:hover {
                    background-position: center -1.46rem !important;
                    cursor: pointer;
                }

                .active,
                .active:hover {
                    background-position: center -2.92rem !important;
                }
            }

            .navShadow {
                width: 13rem;
                height: 5rem;
                position: absolute;
                // top: 4.7rem;
                z-index: 9;

                .shadowBox {
                    position: relative;
                    height: inherit;
                    width: inherit;
                    top: -1rem;

                    .navSlider1,
                    .navSlider2 {
                        height: 4rem;
                        width: inherit;
                        position: absolute;
                        // top: 0;

                        .shadow,
                        .shadow1 {
                            top: 0;
                            left: 0;
                            width: inherit;
                            position: absolute;
                            height: 5rem;
                        }

                        .animate1 {
                            animation: cityShadow 1s ease forwards;
                        }

                        .animate2 {
                            animation: cityShadow .7s ease forwards;
                        }

                        .shadow:nth-child(1) {
                            background: url('/img/header/city_shadow1-2.png') no-repeat;
                            background-size: 100% auto;
                        }

                        .shadow:nth-child(2) {
                            background: url('/img/header/city_shadow2-2.png') no-repeat;
                            background-size: 100% auto;
                        }

                        .shadow:nth-child(3) {
                            background: url('/img/header/city_shadow3-2.png') no-repeat;
                            background-size: 100% auto;
                        }

                        .shadow:nth-child(4) {
                            background: url('/img/header/city_shadow4-2.png') no-repeat;
                            background-size: 100% auto;
                        }

                        .shadow1:nth-child(1) {
                            background: url('/img/header/city_shadow1.png') no-repeat;
                            background-size: 100% auto;
                        }

                        .shadow1:nth-child(2) {
                            background: url('/img/header/city_shadow2.png') no-repeat;
                            background-size: 100% auto;
                        }

                        .shadow1:nth-child(3) {
                            background: url('/img/header/city_shadow3.png') no-repeat;
                            background-size: 100% auto;
                        }

                        .shadow1:nth-child(4) {
                            background: url('/img/header/city_shadow4.png') no-repeat;
                            background-size: 100% auto;
                        }
                    }

                    .navSlider1 {
                        left: .1rem;
                        top: .1rem
                    }
                }

            }


        }

        .deco {
            position: absolute;
            right: 3rem;
            width: 16rem;
            z-index: 7;
            height: inherit;
            background: url('/img/header/header.png');
            background-size: 140%;
            background-position: right top;
        }

        .bgMusic {
            width: 3rem;
            margin-left: 5.6rem;
            height: 3rem;
            z-index: 8;
            background: url('/img/header/bgMusicSwitch.png');
            background-size: cover;
            background-position-x: 3rem;
        }

        .bgMusic:hover {
            cursor: pointer;
        }

        .playing {
            background-position-x: -6rem;
        }
    }


}
</style>