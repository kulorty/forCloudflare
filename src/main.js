import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import mitt from "mitt";
const emitter = mitt();

setInterval(() => {
	if (window.devicePixelRatio != 1.25) {
		document.documentElement.style.fontSize = 20 / window.devicePixelRatio + "px";
	}
}, 500);

createApp(App).provide("emitter", emitter).mount("#app");
