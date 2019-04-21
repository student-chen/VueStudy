<template>
<div>
  <div>
    <input v-model="inputvalue" />
    <button @click="handlesubmit">submit</button>
  </div>
  <ul>
    <todo-item v-for="(item,index) of list" :key="index" :content="item" :index="index" @delete="handleDelete"></todo-item>
  </ul>
</div>
</template>

<script>
import Todoitem from './components/Todoitem'
export default {
  components: {
    'todo-item': Todoitem
  },
  // 变成data为一个函数，函数中的返回值为数据
  data: function () {
    return {
      inputvalue: '',
      list: []
    }
  },
  methods: {
    handlesubmit: function () {
      this.list.push(this.inputvalue)
      this.inputvalue = ''
    },
    handleDelete: function (index) {
      this.list.splice(index, 1)
    }
  }
}
</script>

<style>
</style>
