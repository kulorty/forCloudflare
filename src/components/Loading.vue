<template>
    <div class="loading">
        <div class="loadItem">
            <div class="loadTv">
                <div v-for="(item, index) in items" :key="index"
                    :style="{ height: heights[index], zIndex: index == 2 ? zIndexValue : 5 }">
                    {{ item }}
                </div>
            </div>
            <div class="loadText">
                <div class="textDark">
                    <div v-for="(n, index) in textDarks" :key="index"
                        :style="{ backgroundImage: `url('/fakeYH/img/loading/${n}'`, animationDelay: (index * .2) + 's' }"
                        class="animation">
                    </div>
                </div>
                <div class="textLight">
                    <div v-for="(n, index) in textLights" :key="index"
                        :style="{ backgroundImage: `url('/fakeYH/img/loading/${n}'`, animationDelay: (index * .2) + 's' }"
                        :class="{ animation: delaied }">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 初始化3个div
const items = Array(3).fill(""), textDarks = ['lodingText1_l.png',
    'lodingText1_o.png',
    'lodingText1_a.png',
    'lodingText1_d.png',
    'lodingText1_i.png',
    'lodingText1_n.png',
    'lodingText1_g.png',
    'lodingText1_points.png',
    'lodingText1_points.png',
    'lodingText1_points.png'
],
    textLights = ['lodingText2_l.png',
        'lodingText2_o.png',
        'lodingText2_a.png',
        'lodingText2_d.png',
        'lodingText2_i.png',
        'lodingText2_n.png',
        'lodingText2_g.png',
        'lodingText2_points.png',
        'lodingText2_points.png',
        'lodingText2_points.png'
    ]
const heights = ref(["inherit", "inherit", "inherit"]), zIndexValue = ref(6), delaied = ref(false)
let intervalId

const loadAnimate = () => {
    setTimeout(() => {
        heights.value[2] = 0;
        heights.value[0] = "inherit"
        heights.value[1] = "inherit"
    }, 0);

    setTimeout(() => {
        heights.value[1] = 0;
        zIndexValue.value = 4;
        heights.value[2] = "inherit"
    }, 2000);

    setTimeout(() => {
        heights.value[0] = 0;

    }, 4000);
    setTimeout(() => {
        zIndexValue.value = 6
        heights.value[1] = "inherit"
    }, 5000)
}
onMounted(() => {
    loadAnimate()
    setTimeout(() => {
        delaied.value = true
    }, 800)
    intervalId = setInterval(() => {
        loadAnimate()
    }, 6000)
});
</script>

<style scoped lang="scss">
@keyframes textAnimate {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(4rem);
    }

    100% {
        transform: translateY(0);
    }
}


.loading {
    display: fixed;
    z-index: 999;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgb(29, 29, 29);
    position: absolute;

    .loadItem {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        flex-direction: column;

        .loadTv {
            width: 8rem;
            height: 4.79rem;
            position: relative;

            div:nth-child(1) {
                background: url('/img/loading/lodingItem1.png');
            }

            div:nth-child(2) {
                background: url('/img/loading/lodingItem2.png');
            }

            div:nth-child(3) {
                background: url('/img/loading/lodingItem3.png');

            }

            div {
                position: absolute;
                top: 0;
                width: inherit;
                height: inherit;
                background-position: center;
                background-size: 100% !important;
                transition: height 1s ease-in-out;
            }
        }

        .loadText {
            margin-top: 2rem;
            position: relative;
            width: 25.8rem;
            height: 8rem;

            .textLight,
            .textDark {
                position: absolute;
                top: 0;
                // height: 8rem;
                display: flex;
                align-items: end;

                div {
                    margin: 0 .5rem;
                    width: 2rem;
                    height: 2.5rem;
                    background-position: center;
                    background-size: auto 100%;
                    background-repeat: no-repeat;
                    transition: opacity 1s ease
                }

                div:nth-child(10),
                div:nth-child(8),
                div:nth-child(9) {
                    width: .6rem;
                    margin: 0 .5rem;
                    height: .6rem;
                }
            }

            .textLight div {
                opacity: 0;
            }
        }
    }
}

.animation {
    animation: textAnimate 1.6s ease-in-out infinite;
    opacity: 1 !important;
}
</style>