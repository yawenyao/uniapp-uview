// main.js
import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import uView from 'uview-ui';
Vue.use(uView);
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
 ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import uView from 'uview-ui';
import 'uview-ui/lib/index.css'; // 导入 uview 的 css 文件，确保在 Vue 3 中样式生效
import { createApp } from 'vue';
import { UButton, UInput } from 'uview-ui'; // 按需引入组件

const app = createSSRApp(App)
app.use(uView); // 在 Vue 3 中使用 uview
app.component('u-button', UButton); // 按需注册组件
app.component('u-input', UInput);
app.mount('#app')
// #endif