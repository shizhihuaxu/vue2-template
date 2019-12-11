<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Button @click='login'>登录</Button>
  </div>
</template>

<script>

export default {
  name: 'home',
  methods: {
    login() {
      let params = {
          username: '',
          password: '',
      }
      this.$api.login(params).then((res) =>{
        switch (true) {
          case res.status === 200:
            this.total = res.data.count
            this.newsList = res.data.results
            break
          default:
            this.$Message.warning('登录失败')
            break
        }
      })
    },
  }
};
</script>
