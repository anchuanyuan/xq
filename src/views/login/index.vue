<template>
  <div class="login">
    <h2 align="center">登录</h2>
    <img class="logo" src="../../assets/img/login/logo.jpg" alt="">
    <div class="form_login">
      <van-field v-model="mobile" label="手机号" :border="false" placeholder="+86">
        <template #right-icon>
          <img class="right_icon" @click="mobile = ''" src="../../assets/img/login/shanchu.png" alt="">
        </template>
      </van-field>
      <van-field v-model="password" :type="show ? 'text' : 'password'" label="密码" :border="false" placeholder="">
          <template #right-icon>
            <img class="right_icon" @click="show = !show" src="../../assets/img/login/chakan.png" alt="">
        </template>
      </van-field>
      <van-button type="default" :disabled="disabled" @click="sumbit">登录</van-button>
      <div class="tips">
        <div @click="$router.push('/login/register')">立即注册</div>
        <p>|</p>
        <span @click="$router.push('/login/forget')">忘记密码</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {login} from "@/api/login";
import {encrypt} from "@/utils/jsencrypt";

export default {
  data() {
    return {
      mobile:'15555555555',
      password: '123456',
      show: false,
      disabled: false,
      loginShow: false
    };
  },
  methods: {
    sumbit() {
      if(!this.mobile) return this.$toast('请输入手机号')
      if(!this.password) return this.$toast('请输入密码')
      if(this.loginShow) {
        return
      }
      this.loginShow = true
      this.disabled = true
      // this.$post({
      //   module: 'Account',
      //   interface: '1000',
      //   data: {
      //     account: this.mobile,
      //     password: this.password,
      //   }
      // })
      login({
        userPhone: this.mobile,
        password: encrypt(this.password)
        // password: 123456
      }).then(res => {
        this.loginShow = false
        localStorage.setItem('USER_MODILE', this.mobile)
        this.disabled = false
        this.$toast('登陆成功')
        this.$router.push('/')
        localStorage.setItem("USER_TOKEN", res.token);
      }).catch(() => {
        this.loginShow = false
        this.disabled = false
      })
    }
  },
  components: {},
  created() {
    if(localStorage.getItem('USER_MODILE')) {
      this.mobile = localStorage.getItem('USER_MODILE')
    }
  },
};
</script>

<style scoped lang="less">
.login {
  width: 100vw;
  height: 100vh;
  background-color: #121212;
  text-align: center;
  >h2 {
    font-weight: normal;
    color: #ffffff;
    font-size: 18px;
  }
  .logo {
    width: 150px;
    height: 150px;
    margin-top: 71px;
  }
  .form_login {
    width: 100%;
    // background-color: #121212;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 57px;
    /deep/.van-field {
    background-color: #121212;
      width: 75%;
      margin-bottom: 20px;
      padding-left: 0;
      padding-right: 0;
      .van-cell__title {
        font-size: 16px;
        color: #FFFFFF;
        width: 50px;
      }
      input{
        color: #ffffff;
      }
      .van-field__value {
        border-bottom: 1px solid #C4C4C4;
      }
      .right_icon {
        width: 20px;
        height: 20px;
      }
    }
    .van-button {
      width: 283px;
      height: 30px;
      //background: #0BBC74;
      background: linear-gradient(180deg, #CEB968 0%, #AD9737 100%);
      color: #fff;
      //去掉边框
      border: none;
    }
    .tips {
      padding-top:56px;
      color: #959595;
      display: flex;
      align-items: center;
      >div {
        color: #999999;
      }
      p {
        padding: 0 5px;
      }
    }
  }
}
</style>