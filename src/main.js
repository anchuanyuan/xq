////////////   项目依赖引入   //////////////
// vue框架
import Vue from 'vue';
// vue主页面
import App from './App.vue';
// vue路由
import router from './router';
// 公共Header栏
import Header from './components/Header';
// vue组件库vant的样式文件
import 'vant/lib/index.css';
// vue组件库vant的基本依赖文件
import vant from "vant";
// 请求工具文件
// import post from "@/utils/requestCopy"
import { post,upload } from '@/utils/request/index';
// vuex，
import store from './store/index';
// 多语言切换
import i18n from './plugin/lang/i18n';
// 正在校验文件
import common from './utils/common'
// 基础工具文件
import funcUtil from './utils/funcUtil/base'
// 移动端适配组件（px转rem必须组件之一）
import 'amfe-flexible'
// 剪切板组件，可以使用$copyText(text)方法复制文字
import VueClipboard from 'vue-clipboard2'
// vue公共指令文件
import "@/utils/command";

import * as math from 'mathjs';

import vueEsign from 'vue-esign';

import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
Vue.use(VueDirectiveImagePreviewer) 
// import vconsole from 'vconsole'

// new vconsole()
////////////   项目常用工具设置   //////////////
// 请求
Vue.prototype.$post = post;
Vue.prototype.$upload = upload;

Vue.prototype.$math = math; //挂在到原型
// 校验
Vue.prototype.$ver = common
// 常用方法
Vue.prototype.$func = funcUtil;
// 是否开启vue警告提示，建议开发模式下开启，生产模式下关闭
Vue.config.productionTip = process.env.VUE_APP_RUN_DEV ? true : false;
// 头部
Vue.component('Header', Header);
// 引入的组件，vant VueClipboard
Vue.use(vant).use(VueClipboard).use(vueEsign);

// 定时方法，使用异步封装，方便使用（好像没啥用）
Vue.prototype.$sleep = time => {
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve()
    }, time)
  })
};
Vue.config.ignoredElements = ['wx-open-launch-weapp']

////////////   创建vue对象   //////////////

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')