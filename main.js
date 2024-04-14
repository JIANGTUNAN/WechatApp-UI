// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
//全局 导入 request方法
import request from "./request/request.js"

Vue.config.productionTip = false;
// 将requset 挂载到vue原型上
Vue.prototype.$myRequest=request

Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
