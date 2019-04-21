<template>
  <div
    class="hello"
    v-tap="tap"
    v-swipeleft="swipeleft"
    v-swiperight="swiperight"
    v-press="press"
  >
    <h1>{{ msg }}</h1>
    <h2>
      触控区域
    </h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '这也是触控区域'
    }
  },
  methods: {
    tap (s, e) {
      console.log('触摸点击')
    },
    swipeleft (s, e) {
      console.log('向左滑动:x偏移量[' + s.deltaX + '],y偏移量[' + s.deltaY + ']')
    },
    swiperight (s, e) {
      console.log('向右滑动:x偏移量[' + s.deltaX + '],y偏移量[' + s.deltaY + ']')
    },
    press (s, e) {
      console.log('长按')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
