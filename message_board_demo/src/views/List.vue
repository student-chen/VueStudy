<template>
  <div>
    <ul>
      <!-- item和index不能写反。第一个是内容，第二个是索引。写反了会将lists的内容作为索引 -->
      <li class="card" v-for="(item, index) in pagelists" :key="index">
        <div class="title"><b>标题：</b> {{ item.title }}</div>
        <div class="content"><b>内容：</b> {{ item.content }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
import store from '@/store'
export default {
  name: 'List',
  store,
  computed: {
    pagelists () {
      // 数据有取过来。只是展示的问题了
      console.log(store.state.lists)
      return store.state.lists
    }
  }
}
</script>
<style scoped>
ul {
  margin-top: 10%;
}
li {
  /* padding: 20px; */
  list-style: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 80%;
  margin-left: 10%;
  margin-bottom: 50px;
  text-align: center;
  font-family: arial;
}
.title {
  padding: 0 16px;
  /* border-bottom: 5px solid rgba(12, 185, 41, 0.082); */
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2);
}
.content {
  padding: 0 16px;
}
</style>
