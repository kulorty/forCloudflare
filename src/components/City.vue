<template>
    <div class="city">
        <div class="tape" :style="{ backgroundPosition: currentSlideId <= 1 ? `top` : `bottom` }">
            <div class="cogs" :style="{ backgroundPosition: currentSlideId <= 1 ? `top` : `bottom` }"></div>
            <div class="cogs" :style="{ backgroundPosition: currentSlideId <= 1 ? `top` : `bottom` }"></div>
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

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const slideSignal = Array(5).fill(""), currentSlideId = ref(0), isOpacity = ref(true)
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
    console.log('tet')
    if (currentSlideId.value > 0) {
        currentSlideId.value--
    } else {
        currentSlideId.value = 4
    }
}

const next = () => {
    if (currentSlideId.value < 4) {
        currentSlideId.value++
    } else {
        currentSlideId.value = 0
    }
}
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
    background: url("/img/city/page_city.jpg") no-repeat;
    background-size: 132% auto;
    background-position: center;
    height: calc(100vh - 4.8rem);
    transition: opacity .4s ease-in-out;

    .tape {
        margin: 1.4rem 0 0 12rem;
        background: url("/img/city/tape.png") no-repeat;
        width: 50rem;
        height: 30.2rem;
        background-size: cover;
        position: relative;
        z-index: 0;

        .cogs {
            position: absolute;
            background: url("/img/city/tapeAxle.png");
            animation: rotate 4s linear infinite;
            width: 8rem;
            height: 8rem;
            background-position: top;
            background-size: cover;
        }

        .cogs:nth-child(1) {
            left: 8.6rem;
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
            height: 3.6rem;
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
}
</style>