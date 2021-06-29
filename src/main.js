import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import store from './store/index.js'
import * as echarts from 'echarts';
import {getItem} from './api/index'
import 'lib-flexible/flexible'
// import jquery from "../node_modules/jquery/dist/jquery.min.js";
// import signalr from '../node_modules/signalr/jquery.signalR'
import 'jquery'
// import 'signalr'

import { installElement } from "./plugins/element";
import './assets/css/base.css'
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/packages/theme-chalk/src/base.scss'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'
locale.use(lang)

const app = createApp(App)
installElement(app)
// 请求拦截器
axios.interceptors.request.use(
    config => {
//       // 每次发送请求之前判断vuex中是否存在token
//       // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
//       // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
      const token = getItem("token");
      token && (config.headers.common["accessToken"] = token);
      return config;
    },
    error => {
      return Promise.error(error);
    }
  );
app.config.globalProperties.$http = axios
app.config.globalProperties.$echarts = echarts
app.use(router)
app.use(Vuex)
app.use(store)
app.mount('#app')