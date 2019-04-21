<template>
  <div>
    <div v-if="isReg">
      <p>用户名</p>
      <input type="text" v-model="name" />
      <p>密码</p>
      <input type="password" v-model="password" />
      <br />
      <button @click="login()">登陆</button>
      <!-- 点击显示注册所需input -->
      <button @click="change()">注册</button>
    </div>
    <div v-else>
      <p>用户名</p>
      <input type="text" v-model="name" />
      <p>密码</p>
      <input type="password" v-model="password" />
      <p>确认密码</p>
      <input type="password" v-model="repeat" />
      <br />
      <button @click="regist()">确定</button>
      <!-- 点击显示注册所需input -->
      <button @click="cancel()">取消</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data: function () {
    return {
      isReg: 'false',
      name: '',
      password: '',
      repeat: ''
    }
  },
  methods: {
    login () {
      if (localStorage.getItem('name') === this.name && localStorage.getItem('password') === this.password) {
        this.$router.push('/home/list')
      } else {
        alert('用户名或者密码错误')
      }
    },
    regist () {
      if (this.password === this.repeat) {
        localStorage.setItem('name', this.name)
        localStorage.setItem('password', this.password)
        this.name = ''
        this.password = ''
        this.repeat = ''
        this.isReg = true
        // this.$router.push('/')
      } else {
        alert('确保两次密码相同')
      }
    },
    change () {
      this.isReg = false
      this.name = ''
      this.password = ''
    },
    cancel () {
      // this.$router.push('/')
      this.isReg = true
      this.name = ''
      this.password = ''
    }

  }
}
</script>
<style scoped>
</style>
