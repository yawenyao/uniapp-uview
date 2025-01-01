import App from './App'
import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from 'uview-ui';
import Vuex from 'vuex';
import store from './store'; // 确保 store 文件存在且正确导出 Vuex 的 store 实例

// 确保在开发环境下首先导入 Mock.js
if (process.env.NODE_ENV === 'development') {
	import('./utils/mock.js');
}
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()