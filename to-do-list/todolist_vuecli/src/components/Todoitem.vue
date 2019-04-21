<template>
<li @click="handleDelete">{{content}}</li>
</template>

<script>
export default {
  props: ['content', 'index'],
  methods: {
    handleDelete: function () {
      //  调用自定义的delete函数并传递参数index
      this.$emit('delete', this.index)
      // alert(this.index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
