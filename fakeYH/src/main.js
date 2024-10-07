import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import mitt from "mitt";
const emitter = mitt();

function setRemUnit() {
	const baseWidth = 1512;
	const baseFontSize = 16;
	const scale = document.documentElement.clientWidth / baseWidth;
	document.documentElement.style.fontSize = scale * baseFontSize + "px";
}

window.addEventListener("resize", setRemUnit);

setRemUnit();

createApp(App).provide("emitter", emitter).mount("#app");
