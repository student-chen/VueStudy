<template>
  <div>
    <router-view />
    <ul class="footer">
      <!-- name是route中的children里的name -->
      <li class="icons"><router-link to="/home/list">新闻列表</router-link></li>
      <!-- 有点问题，无法通过name调用 -->
      <!-- <li><router-link to="{name:'User'}">个人中心</router-link></li> -->
      <li class="icons"><router-link to="/home/add">个人中心</router-link></li>
      <!-- <li><router-link to="/add">添加</router-link></li> -->
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home'
}
</script>
<style lang="scss" scoped>
li {
  list-style-type: none;
}
.footer {
  position: fixed;
  width: 100%;
  height: 60px;
  line-height: 60px;
  left: 0;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.icons {
  font-weight: bold;
  font-size: 16px;
  flex: 1;
  text-align: center;
  border: none;
  border-radius: 3px;
  // text-shadow: 1px 1px 1px #9e3f3f;
  cursor: pointer;
  a {
    text-decoration: none;
    display: block;
    &.active {
      background: rgba(16, 243, 103, 0.801);
    }
  }
}
</style>
