<template>
    <div class="home">
        <div class="subject">
            <video src="/img/home/yh_bgv_20240704.mp4" loop autoplay muted></video>

            <div class="character">
                <img src="/img/home/guide_role.png" alt="">
            </div>
            <div class="net">
                <img src="/img/home/indexNet.png" alt="" srcset="">
            </div>
            <div class="tapBooking">
            </div>
            <div class="homeMain">
                <img src="/img/home/indexYySubTit.png" alt="">
                <div class="homeBtn">
                    <div class="homeBtnL"></div>
                    <div class="homeBtnR"></div>
                    <div class="tv">
                        <div class="tvPlay"></div>
                    </div>
                </div>

            </div>
        </div>

        <Footer />
    </div>

</template>

<script setup>
import Footer from './Footer.vue';
import { ref, onMounted, inject } from 'vue';

const emitter = inject("emitter")
onMounted(() => {
    emitter.on("direction", val => {

    })
})
</script>
<style scoped>
@keyframes scale {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.home {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-width: 1200px;
    background: rgb(29, 29, 29);
    position: relative;
    width: 100vw;
    transition: opacity .4s ease-in-out;


    .subject {
        position: relative;
        height: calc(100vh - 9.6rem);
        z-index: 7;
        display: flex;
        justify-content: center;
        align-items: center;

        video {
            position: absolute;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -30%);
            width: 100%;
            min-width: 1000px;
            height: auto;
            z-index: 2;
        }

        .character {
            position: absolute;
            bottom: .8rem;
            right: .8rem;

            img {
                height: 3.6rem;
            }
        }

        .net {
            position: absolute;
            left: 1rem;
            bottom: .8rem;
            height: 3.8rem;
            z-index: 2;

            img {
                height: inherit;
            }
        }

        .tapBooking {
            position: absolute;
            right: 0rem;
            top: 36%;
            width: 6.72rem;
            height: 12rem;
            z-index: 8;
            background: url('/img/home/tapAside.png');
            background-size: cover;
            background-position: right;
        }

        .tapBooking:hover {
            background-position: left;
        }

        .homeMain {
            position: absolute;
            bottom: 8vh;
            /* padding-top: 45vh; */
            z-index: 4;

            img {
                margin: 0 auto;
                display: block;
                height: 1.2rem;
            }

            .homeBtn {
                display: flex;
                width: 33rem;
                position: relative;
                margin-top: .5rem;
                justify-content: space-between;

                .homeBtnL {
                    background: url('/img/home/image.png');
                    background-position: top;
                }

                .homeBtnL:hover {
                    background-position-y: -4.62rem;
                }

                .homeBtnR {
                    background: url('/img/home/indexYyBtn2.png');
                    background-position-y: -1rem;
                    position: relative;
                }

                .tv {
                    position: absolute;
                    top: -7rem;
                    right: 0;
                    z-index: 8;
                    height: 4.6rem;
                    width: 6.6rem;
                    background: url('/img/home/pvBtn.png');
                    background-position: top;
                    background-size: cover;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .tvPlay {
                        width: 2rem;
                        height: 2rem;
                        background: url('/img/home/pvPlayer.png');
                        background-position: top;
                        background-size: cover;
                        animation: scale 2s ease infinite;
                    }
                }

                .homeBtnR:hover {
                    background-position-y: -6.84rem;
                }

                .homeBtnL,
                .homeBtnR {
                    width: 16rem;
                    height: 4.6rem;
                    background-size: cover;
                }
            }

        }
    }
}
</style>
