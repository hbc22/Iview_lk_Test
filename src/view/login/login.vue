<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="word_title">
      <img style="width: 370px" :src="bgLogo" key="title" />
    </div>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      bgLogo: this.$config.bg_title
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
}
</script>

<style>
.word_title {
  position: absolute;
  left: 160px;
  top: 28%;
  -webkit-transform: translateY(-60%);
  transform: translateY(-60%);
  }
</style>
