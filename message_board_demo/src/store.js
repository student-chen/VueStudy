import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 当mutations添加操作的时候，操作的数据需要在state定义
export default new Vuex.Store({
  state: {
    lists: []
  },
  mutations: {
    addItem (state, value) {
      state.lists.push(value)
    }
  },
  actions: {

  }
})
