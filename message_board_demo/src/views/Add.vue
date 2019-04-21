<template>
  <div>
    <!-- <div> -->
    <!-- <p>标题</p> -->
    <input class="text" type="text" v-model="title" placeholder="标题" />
    <!-- </div> -->
    <!-- <div> -->
    <!-- <p>内容</p> -->
    <textarea class="text" type="text" v-model="content" placeholder="内容" />
    <!-- </div> -->
    <button @click="add()">添加</button>
  </div>
</template>
<script>
import store from '@/store'
export default {
  name: 'Add',
  store,
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    add () {
      store.commit('addItem', {
        title: this.title,
        content: this.content
      })
      this.title = ''
      this.content = ''
      // this.$router.back(-1)
      // this.$router.push('/home/list')
    }
  }
}
</script>
<style scoped>
textarea {
  height: 40%;
  position: fixed;
  width: 80%;
  margin: 10%;
  margin-top: 40%;
}
input {
  position: fixed;
  width: 80%;
  left: 10%;
  margin-top: 20%;
  height: 5%;
}
.text {
  border: 1px solid #dadada;
  color: #888;
  /* height: 30px; */
  outline: 0 none;
  padding: 3px 3px 3px 5px;
  width: 70%;
  font-size: 20px;
  line-height: 15px;
  box-shadow: inset 0px 1px 4px #ececec;
  -moz-box-shadow: inset 0px 1px 4px #ececec;
  -webkit-box-shadow: inset 0px 1px 4px #ececec;
  /*圆角边框*/
  border-radius: 5px;
  border: 2px solid #ccc;
  display: block;
}
button {
  position: fixed;
  bottom: 30%;
  width: 50%;
  left: 25%;
  background: #e27575;
  border: none;
  padding: 10px 25px 10px 25px;
  color: #fff;
  box-shadow: 1px 1px 5px #b6b6b6;
  border-radius: 3px;
  text-shadow: 1px 1px 1px #9e3f3f;
  cursor: pointer;
}
button:hover {
  background: #cf7a7a;
}
</style>
