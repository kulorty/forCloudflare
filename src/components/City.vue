<template>
    <div class="city">
        <div class="tapeAnimate">
            <div class="tapeAnimate1"></div>
            <div class="tapeAnimate2"></div>
            <div class="tapeAnimate3"></div>
        </div>
        <div class="tape" :style="{ transform: currentSlideId <= 1 ? `rotateY(0)` : `rotateY(180deg)` }">
            <div class="cogs" :style="{ backgroundPosition: positionValue }"></div>
            <div class="cogs" :style="{ backgroundPosition: positionValue }"></div>
            <div class="tapeA" :style="{ opacity: currentSlideId <= 1 ? 1 : 0 }"></div>
            <div class="tapeB" :style="{ opacity: currentSlideId <= 1 ? 0 : 1 }"></div>
        </div>
        <div class="tapeOrnament1"
            :style="{ background: currentSlideId <= 1 ? `url('/img/city/tapeA_ornament1.png') no-repeat` : `url('/img/city/tapeB_ornament1.png') no-repeat` }">
        </div>
        <div class="tapeOrnament2"
            :style="{ background: currentSlideId <= 1 ? `url('/img/city/tapeA_ornament2.png') no-repeat` : `url('/img/city/tapeB_ornament2.png') no-repeat` }">
        </div>
        <div class="cityNum"
            :style="{ background: `url('/img/city/${currentSlide.number}') no-repeat`, opacity: isOpacity ? 1 : 0 }">
        </div>
        <div class="slideContent">
            <div class="citySlide">
                <div class="prev" :style="{ backgroundPosition: currentSlideId <= 1 ? `left top` : `left bottom` }"
                    @click="prev">
                </div>
                <div class="slide">
                    <div class="slideBox" :style="{ transform: `translateX(${currentSlideId * -50}rem)` }">
                        <img src="/img/city/NTE_features1.jpg" alt="">
                        <img src="/img/city/NTE_features2.jpg" alt="">
                        <img src="/img/city/NTE_features3.jpg" alt="">
                        <img src="/img/city/NTE_features4.jpg" alt="">
                        <img src="/img/city/NTE_features5.jpg" alt="">
                    </div>
                </div>
                <div class="next" :style="{ backgroundPosition: currentSlideId <= 1 ? `left top` : `left bottom` }"
                    @click="next">
                </div>
            </div>
            <div class="slideText"
                :style="{ background: `url('/img/city/${currentSlide.title}') no-repeat`, opacity: isOpacity ? 1 : 0 }">
            </div>
            <div class="slideSignal">
                <div v-for="(n, index) in slideSignal" :key="index"
                    :style="{ background: index === currentSlideId ? `rgb(232, 232, 232)` : '' }"
                    @click="toggleSlide(index)">{{ n }}</div>
            </div>
        </div>
        <div class="guide"></div>
        <div class="nextPage"></div>
        <div class="bottom">
            <div class="bBox">
                <div class="b1"></div>
                <div class="b2"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import gsap from 'gsap';

const slideSignal = Array(5).fill(""), currentSlideId = ref(0), isOpacity = ref(true), emitter = inject("emitter"), positionValue = ref("top")
const cityContents = ref({
    0: {
        title: "citySlide1Tit.png",
        number: "citySlide1Num.png",
        feature: "NTE_features1.jpg"
    },
    1: {
        title: "citySlide2Tit.png",
        number: "citySlide2Num.png",
        feature: "NTE_features2.jpg"
    },
    2: {
        title: "citySlide3Tit.png",
        number: "citySlide3Num.png",
        feature: "NTE_features3.jpg"
    },
    3: {
        title: "citySlide4Tit.png",
        number: "citySlide4Num.png",
        feature: "NTE_features4.jpg"
    },
    4: {
        title: "citySlide5Tit.png",
        number: "citySlide5Num.png",
        feature: "NTE_features5.jpg"
    }
})

const currentSlide = computed(() => {
    return cityContents.value[currentSlideId.value]
})

const toggleSlide = (val) => {
    isOpacity.value = false
    setTimeout(() => {
        currentSlideId.value = val
        isOpacity.value = true
    }, 100)
}

const prev = () => {

    if (currentSlideId.value > 0) {
        currentSlideId.value--

    } else {
        currentSlideId.value = 4

    }
    rotate()
}

const next = () => {
    if (currentSlideId.value < 4) {
        currentSlideId.value++

    } else {
        currentSlideId.value = 0

    }
    rotate()
}

const rotate = () => {
    if (currentSlideId.value <= 1) {
        setTimeout(() => {
            positionValue.value = "top"
        }, 300)
    } else {
        setTimeout(() => {
            positionValue.value = "bottom"
        }, 300)
    }
}

onMounted(() => {
    emitter.on("toIndex", val => {
        if (val == 2) {
            gsap.fromTo(".b1", { x: 0 }, { keyframes: [{ x: -80, opacity: 1, duration: .6 }, { opacity: 0 }] })
            gsap.fromTo(".b2", { x: 0 }, { keyframes: [{ x: -140, opacity: 1, duration: .6 }, { opacity: 0 }] })
            gsap.fromTo(".tape", { left: -100 + "vw", }, { keyframes: [{ left: 10 + "vw", duration: .3, delay: .5 }, { left: 0 + "vw", duration: .1 }, { left: 10 + "vw", duration: .1 }, { left: 0 + "vw", duration: .1 }] })
            gsap.fromTo(".tapeAnimate1", { x: -100 + "vw", }, { keyframes: [{ x: 20, duration: .5, delay: .5 }, { x: -20 + "vw", duration: .2, delay: .2 }] })
            gsap.fromTo(".tapeAnimate2", { x: -100 + "vw", }, { keyframes: [{ x: 50, duration: .5, delay: .5 }, { x: -20 + "vw", duration: .2, delay: .2 }] })
            gsap.fromTo(".tapeAnimate3", { x: -100 + "vw", }, { keyframes: [{ x: 80, duration: .5, delay: .5 }, { x: -20 + "vw", duration: .2, delay: .2 }] })
            gsap.fromTo(".guide", { x: 100 + "vw", }, { x: 0, duration: .6, delay: 1.2 })
            gsap.fromTo(".tapeOrnament1", { x: 100 + "vw", }, { x: 0, duration: .6, delay: 1.3 })
            gsap.fromTo(".tapeOrnament2", { x: 100 + "vw", }, { x: 0, duration: .6, delay: 1.4 })
            gsap.fromTo(".nextPage", { x: 100 + "vw", }, { x: 0, duration: .6, delay: 1.7 })
            gsap.fromTo(".slideContent", { x: 100 + "vw", }, { x: 0, duration: .6, delay: 1.2 })
            gsap.fromTo(".cityNum", { x: 100 + "vw", }, { x: 0, duration: .6, delay: 1.1 })
        }
    })
})
</script>

<style scoped lang="scss">
@keyframes rotate {
    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }

}

.city {
    position: relative;
    width: 100vw;
    // min-height: 700px;
    min-width: 1200px;
    background: url("/img/city/page_city.jpg") no-repeat;
    background-size: 100% auto;
    background-position: center;
    height: calc(100vh - 4.8rem);
    transition: opacity .4s ease-in-out;

    .tapeAnimate {

        div {
            position: absolute;
            height: 22rem;
            width: 14rem;
            top: 6rem;
        }

        div:nth-child(1) {
            left: 60rem;
            background: url("/img/city/tapeAnimateT1.png") no-repeat;
            background-size: auto 100%;
        }

        div:nth-child(2) {
            left: 62rem;
            background: url("/img/city/tapeAnimateT2.png") no-repeat;
            background-size: auto 100%;
        }

        div:nth-child(3) {
            left: 64rem;
            background: url("/img/city/tapeAnimateT3.png") no-repeat;
            background-size: auto 100%;
        }
    }

    .tape {
        margin: 1.4rem 0 0 12rem;
        width: 50rem;
        height: 30.2rem;
        position: relative;
        z-index: 0;
        transition: transform .6s linear;

        .tapeA,
        .tapeB {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 3;
            width: inherit;
            height: inherit;
            background: url("/img/city/tape.png") no-repeat;
            background-size: cover;
            background-position: top;
            transition: opacity .3s linear;
        }

        .tapeB {
            transform: rotateY(180deg);
            background-position: bottom;
        }

        .cogs {
            position: absolute;
            background: url("/img/city/tapeAxle.png");
            animation: rotate 4s linear infinite;
            width: 8rem;
            z-index: 4;
            height: 8rem;
            background-position: top;
            background-size: cover;
        }

        .cogs:nth-child(1) {
            left: 8.3rem;
            top: 9.5rem
        }

        .cogs:nth-child(2) {
            right: 8.3rem;
            top: 9.5rem
        }
    }

    .tapeOrnament1 {
        position: absolute;
        top: 4rem;
        left: 58rem;
        transition: opacity .1s ease-in-out;
        background-position: left top !important;
        background-size: 100% auto !important;
        width: 19.5rem;
        height: 4.5rem;
    }

    .tapeOrnament2 {
        position: absolute;
        top: 5rem;
        left: 66rem;
        transition: opacity .1s ease-in-out;
        background-position: left top !important;
        background-size: cover !important;
        width: 20rem;
        height: 20rem;
    }

    .cityNum {
        background-size: 100% auto !important;
        background-position: center !important;
        width: 13.6rem;
        height: 5rem;
        margin: 1rem 0 0 14rem;
        transition: opacity .1s ease-in-out;
    }

    .slideContent {
        position: absolute;
        left: 25rem;
        top: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        .citySlide {
            display: flex;
            align-items: center;


            .prev {
                background: url('/img/city/citySlidePrev.png') no-repeat;
                background-position: left top;
            }

            .next {
                background: url('/img/city/citySlideNext.png') no-repeat;
                background-position: left top;
            }

            .prev,
            .next {
                background-size: 200% auto;
                width: 3.6rem;
                height: 12.9rem;
                z-index: 6;
                cursor: pointer !important;
            }

            .slide {
                background: rgb(88, 88, 88);
                border: .6rem solid rgb(88, 88, 88);
                margin: 0 1rem;
                width: 50rem;
                overflow: hidden;

                .slideBox {
                    transition: transform .2s ease;
                    display: flex;

                    img {
                        width: 50rem;
                        height: auto;
                    }
                }

            }
        }

        .slideText {
            margin-top: .4rem;
            width: 51rem;
            height: 4rem;
            // background: url("/img/city/citySlide1Tit.png") no-repeat;
            background-size: auto 100% !important;
            background-position: left top !important;
            transition: opacity .1s ease-in-out;
        }

        .slideSignal {
            display: flex;
            margin-top: .8rem;

            div {
                border: .1rem solid rgb(101, 101, 101);
                width: 4rem;
                height: .4rem;
                margin: 0 .4rem;
                cursor: pointer !important;
            }
        }
    }

    .guide {
        position: absolute;
        right: 1rem;
        bottom: 3rem;
        background: url('/img/city/guide_intel.png') no-repeat;
        background-size: auto 100%;
        width: 10rem;
        height: 4rem;
    }

    .nextPage {
        position: absolute;
        width: 1rem;
        height: 12rem;
        background: url('/img/city/guide_nextPage.png') no-repeat;
        background-size: 100% auto;
        right: 1rem;
        top: 40%;
    }

    .bottom {
        position: absolute;
        bottom: 0rem;
        width: 100vw;
        height: 6rem;

        .bBox {
            position: relative;
            height: inherit;

            .b1 {
                background: url('/img/city/wavyLline2.png');
                top: 1rem
            }

            .b2 {
                background: url('/img/city/wavyLline1.png');
                top: 0;
                height: 4rem !important;

            }

            .b1,
            .b2 {
                width: 200vw;
                height: 5rem;
                position: absolute;
                background-size: auto 100%;

            }
        }

    }
}
</style>