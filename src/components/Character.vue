<template>
    <div class="character">
        <video v-for="(n, index) in videoList" :key="index" :src="`/img/character/yh_bgv_${n}.mp4`" autoplay loop muted
            :style="{ opacity: opacityIndex == index ? 1 : 0 }"></video>
        <div class="characterTitle" :style="{ opacity: isOpacity ? 1 : 0 }">
            <span></span>
        </div>
        <div class="characterInfo" :style="{ opacity: isOpacity ? 1 : 0 }">
            <img class="characterName" :src="`/img/character/${currentRole.name}`" alt="">
            <div class="characterdetail"
                :style="{ background: `url('/img/character/${currentRole.info1}') no-repeat` }">
                <div class="characterSelf" @mouseenter="switchDes1" @mouseleave="switchDes2">
                    <p v-for="(n, index) in currentRole.info2" :key="index">{{ n }}</p>
                </div>
            </div>
            <div class="line">
                <div class="roleDesSwitch" :style="{ backgroundPosition: bgPosition }"></div>
            </div>
            <div class="characterList">
                <img v-for="(item, index) in roleList" :src="`/img/character/role_bullet${index + 1}.png`" alt=""
                    :class="{ active: activeIndex == index }" @click="toggleRole(index)">
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue';
import gsap from 'gsap';

const emitter = inject("emitter")
const currentRoleId = ref(0), activeIndex = ref(0), bgPosition = ref("top"), opacityIndex = ref(0), isOpacity = ref(true)

const roles = ref({
    0: {
        name: "role1_name.png",
        info1: "role1_lines.png",
        info2: ["异象管理局收容二组预备骨干，同事街坊人名词典，海特洛市平价美食活地图。", "从总务处不苟言笑的财务姐姐到员工食堂的手抖大叔，从卜多力小屋的寡言大将到DSD潮玩店的热情导购，都能上前大聊特聊……当然，是工作外的时间！", "什么都可以漫天发散，没有她接不住的话题……大概。", "每期异象管理局收容安全考试的成绩除外。"]
    },
    1: {
        name: "role2_name.png",
        info1: "role2_lines.png",
        info2: ["古董店「伊波恩」的一号台柱，桥间地最有名望的家族老大，海特洛市前途无量的异能者之星！", "稳重威严，慷慨仁慈，睿智冷静。", "曾参与「团三郎的复仇」「棉绒绒魔王对决」「V级暴怒GR云危机」等多起大型异象收容、泯除行动，以一招「柯林斯终极幽魂暗影裂空霆焰魔拳」扫荡四方，从无败绩！", "（日结1000方斯一条，括号内的删除。）"]
    },
    2: {
        name: "role3_name.png",
        info1: "role3_lines.png",
        info2: ["「第一，不准给鬼郎丸乱喂东西！", "第二，不准低头看人！", "第三，不准打开冰箱冷藏室第三格！」", "早雾，古董店「伊波恩」冰箱便利贴规则制定者——", "虽然到现在，真正遵循的人……咳，屈指可数。", "要是惹恼了早雾，记得提防她那把名叫鬼郎丸的异象巨锤，", "别靠得太近……", "「什么东西被吞了，又或者被咬了屁股，伊波恩古董店概不赔付。」"]
    }
}), roleList = Array(3).fill(""), videoList = ref(["bohe", "nanali", "zaowu"])
const currentRole = computed(() => {
    return roles.value[currentRoleId.value]
})
const toggleRole = (val) => {
    activeIndex.value = val
    isOpacity.value = false
    currentRoleId.value = val
    opacityIndex.value = val
    setTimeout(() => {
        isOpacity.value = true
        animate()
    }, 200)

}
const switchDes1 = () => {
    bgPosition.value = "bottom"
}
const switchDes2 = () => {
    bgPosition.value = "top"
}
const animate = () => {
    gsap.fromTo(".characterTitle", { left: -11 + "rem" }, { keyframes: [{ left: 12 + "rem", duration: .2 }, { left: 11 + "rem", duration: .1 }, { left: 13 + "rem", duration: .1 }, { left: 11 + "rem", duration: .1 }], delay: 0 })
    gsap.fromTo(".characterName", { marginLeft: -43 + "rem" }, { keyframes: [{ marginLeft: 12 + "rem", duration: .2 }, { marginLeft: 11 + "rem", duration: .1 }, { marginLeft: 13 + "rem", duration: .1 }, { marginLeft: 11 + "rem", duration: .1 }], delay: .1 })
    gsap.fromTo(".characterdetail", { marginLeft: -43 + "rem" }, { keyframes: [{ marginLeft: 12 + "rem", duration: .2 }, { marginLeft: 11 + "rem", duration: .1 }, { marginLeft: 13 + "rem", duration: .1 }, { marginLeft: 11 + "rem", duration: .1 }], delay: .2 })
    gsap.fromTo(".characterSelf", { marginLeft: -43 + "rem" }, { keyframes: [{ marginLeft: 12 + "rem", duration: .2 }, { marginLeft: 11 + "rem", duration: .1 }, { marginLeft: 13 + "rem", duration: .1 }, { marginLeft: 11 + "rem", duration: .1 }], delay: .35 })
    gsap.fromTo(".line", { x: -43 + "rem" }, { keyframes: [{ x: 1 + "rem", duration: .2 }, { x: 0 + "rem", duration: .1 }, { x: 3 + "rem", duration: .1 }, { x: 0 + "rem", duration: .1 }], delay: .3 })
}

onMounted(() => {
    emitter.on("direction", val => {

    })
    emitter.on("toIndex", val => {

    })
})
</script>

<style scoped lang="scss">
.character {
    position: relative;
    width: 100vw;
    overflow: hidden;
    height: calc(100vh - 4.8rem);
    transition: opacity .4s ease-in-out;

    video {
        position: absolute;
        z-index: 0;
        width: 100%;
        min-width: 1200px;
        transition: opacity .4s ease-in-out;
        top: 60%;
        // left: 50%;
        transform: translate(0, -60%);
        min-height: 700px;
        opacity: 0;
    }

    .characterTitle {
        width: 22rem;
        height: 6rem;
        background: url('/img/character/role_character.png') no-repeat;
        background-position: left;
        background-size: contain;
        position: absolute;
        top: 50%;
        margin-top: -15rem;
        left: 11rem;
        text-align: right;
        transition: opacticy .4s ease-in-out;
        opacity: 0;

        span {
            background: url('/img/character/role_character_sign1.png') no-repeat;
            top: 8rem;
            left: 26rem;
            width: 3.4rem;
            height: 3.4rem;
            display: inline-block;
            background-size: 100%;
            background-position: center;
            margin-right: 6rem;
            margin-top: -.4rem;
        }
    }

    .characterInfo {
        position: absolute;
        top: 58%;
        margin-top: -10rem;
        width: 43rem;

        .characterName {
            margin-left: 11rem;
            height: 9rem;
            transition: opacticy .4s ease-in-out;
        }

        .characterdetail {
            margin: 1rem 0 0 11rem;
            width: inherit;
            height: 4rem;
            background-position: left;
            transition: opacticy .4s ease-in-out;
            background-size: auto 100% !important;
            z-index: 2;

            .characterSelf {
                margin-left: 11rem;
                font-size: .8rem;
                color: #afafaf;
                height: 3.8rem;
                overflow: hidden;
                position: absolute;
                bottom: 4rem;
                left: -1.2rem;
                z-index: 1;
                display: flex;
                flex-direction: column;
                padding: 0 1.2rem;
                width: 30.4rem;
            }

            .characterSelf:hover {
                height: 7.6rem;
                background: rgb(33, 33, 33);
                padding: .8rem 1.4rem;
                z-index: 1;
                border: .01rem solid rgb(75, 73, 73);
                font-size: 0.7rem;
                justify-content: center;
            }
        }

        .line {
            width: 100%;
            height: .01rem;
            background: #636363;
            margin: .6rem 0 .2rem 0;
            position: relative;
            z-index: 1;

            .roleDesSwitch {
                position: absolute;
                left: 9rem;
                top: -.8rem;
                width: 1.6rem;
                z-index: 2;
                height: 1.6rem;
                background: url('/img/character/roleDesSwitch.png') no-repeat;
                background-size: 100% auto;
            }
        }

        .characterList {
            margin: 4.2rem 0 0 11rem;
            height: 3.8rem;
            overflow: hidden;

            img {
                height: 7.6rem;
            }
        }
    }
}

.opacity {
    opacity: 1 !important;
}

.active {
    transform: translateY(-3.8rem);
}
</style>