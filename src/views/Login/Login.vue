<template>
  <div style="padding: 20px" class="back">
    <el-form :model="form" label-width="120">
      <h1 class="login-title">小陆后台管理系统</h1>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$http.post('api/permission/getMenu', this.form).then(res => {
        res = res.data
        if (res.code === 20000) {
          this.$store.commit('tab/clearMenu')
          this.$store.commit('tab/setMenu', res.data.menu)
          this.$store.commit('user/setToken', res.data.token)
          this.$store.commit('tab/addMenu', this.$router)
          this.$router.push({ name: 'home' })
        } else {
          this.$message.warning(res.data.message)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.back{
  position: absolute;
  width: 100%;
  height: 100%;
 background:url("~@/assets/img/back.jpg");
 background-size: 100% 100%;
}
.el-form {
   width: 500px;
  margin: 300px auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 28px;
  border-radius: 20px;
}
.login-title {
  color: #303133;
  text-align: center;
}
</style>
