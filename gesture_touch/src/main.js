// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {
  tap,
  swipeleft,
  swiperight,
  press
} from '../config/vuetouch'
Vue.config.productionTip = false

/* eslint-disable no-new */
// 导入的记得使用
// 一般的js文件不符合eslint标准，直接放入config或者在eslintignore都可行
new Vue({
  el: '#app',
  router,
  tap,
  swipeleft,
  swiperight,
  press,
  components: {
    App
  },
  template: '<App/>'
})
