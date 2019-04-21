<template>
  <a class="daily-item">
    <div class="daily-img" v-if="data.images">
      <img :src="imgpath + data.images[0]" />
    </div>
    <div class="daily-title" :class="{ noImg: !data.images }">
      {{ data.title }}
    </div>
  </a>
</template>

<script>
import $ from './../../libs/util.js'
export default {
  // name: 'Item',
  props: {
    data: {
      type: Object
    }
  },
  data () {
    return {
      imgpath: $.imgpath
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
