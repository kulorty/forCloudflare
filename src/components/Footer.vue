<template>
    <footer>
        <div class="footerContent">
            <div class="footerL">
                <div v-for="(item, index) in footerLefts" key="index">{{ item }}</div>
            </div>
            <div class="footerR">
                <img src="/img/footer/neverness.png" alt="">
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from "vue"
const footerLefts = Array(7).fill("")
</script>

<style lang="scss" scoped>
footer {
    z-index: 7;
    width: 100%;
    height: 4.8rem;
    background: rgb(29, 29, 29);
    display: flex;
    align-items: center;
    justify-content: center;

    .footerContent {
        background: url('/img/footer/indexFoot.png');
        background-size: 60rem;
        background-position: center 4.6rem;
        height: 4rem;
        width: inherit;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .footerL {
            height: inherit;
            width: 22rem;
            display: flex;
            justify-content: space-between;
            padding-left: 1rem;
            align-items: center;
            background: rgb(29, 29, 29);

            div {
                width: 2.7rem;
                height: 2.7rem;
                background: url('/img/footer/otherPlatform.png');
                background-size: 23rem;
            }

            div:hover {
                background-position-y: 2.65rem;
            }

            div:nth-child(1) {
                background-position-x: 0;
            }

            div:nth-child(2) {
                background-position-x: -3.3rem;
            }

            div:nth-child(3) {
                background-position-x: -6.8rem;
            }

            div:nth-child(4) {
                background-position-x: -10.1rem;
            }

            div:nth-child(5) {
                background-position-x: -13.5rem;
            }

            div:nth-child(6) {
                background-position-x: -16.9rem;
            }

            div:nth-child(7) {
                background-position-x: -20.3rem;
            }
        }

        .footerR {
            background: rgb(29, 29, 29);
            padding-right: 2rem;
            height: 4rem;
            display: flex;
            align-items: center;

            img {
                height: 3.16rem;
            }
        }
    }
}
</style>