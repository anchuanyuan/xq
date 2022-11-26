<template>
  <div class="forget">
    <Header isback title="找回密码" />
    <div class="form_login">
      <van-field v-model="mobile" label="手机号" :border="false" placeholder="+86">
        <template #right-icon>
          <img class="right_icon" @click="mobile = ''" src="../../assets/img/login/shanchu.png" alt="">
        </template>
      </van-field>
      <van-field v-model="code" label="验证码" :border="false" placeholder=""></van-field>
      <van-field v-model="password" :type="show ? 'text' : 'password'" label="密码" :border="false" placeholder="">
          <template #right-icon>
            <img class="right_icon" @click="show = !show" src="../../assets/img/login/chakan.png" alt="">
        </template>
      </van-field>
      <van-field v-model="safePassword" :type="safeShow ? 'text' : 'password'" label="确认密码" :border="false" placeholder="">
        <template #right-icon>
          <img class="right_icon" @click="safeShow = !safeShow" src="../../assets/img/login/chakan.png" alt="">
      </template>
      </van-field>
      <van-button type="default" :disabled="captBtnDisabled" @click="onCaptBtn">{{ captBtnText }}</van-button>
      <van-button class="SignIn" type="default" @click="submit" :disabled="disabled">确认</van-button>
      <div class="tips" @click="$router.push('/login/register')">
          立即注册
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from '../../components/Header.vue';
export default {
  data() {
    return {
      mobile:'',
      password: '',
      safePassword:'',
      code:'',
      show: false,
      captBtnText: "发送验证码",
      captBtnDisabled: false,
      safeShow: false,
      disabled: false
    };
  },
  methods: {
    // 获取验证码
    onCaptBtn() {
      if(!this.mobile) return this.$toast('请输入手机号')
      this.$post({
        module: "Account",
        interface: "1003",
        data: {
          account: this.mobile,
        },
      }).then(() => {
        this.$toast('发送成功')
        let time = 60;
        let timer = setInterval(() => {
          time--;
          if (time <= 0) {
            clearInterval(timer);
            timer = null;
            this.captBtnText = "发送验证码";
            this.captBtnDisabled = false;
          } else {
            this.captBtnText = `${time}s`;
            this.captBtnDisabled = true;
          }
        }, 1000);
      });
    },
    // 注册
    submit() {
      if(!this.mobile) return this.$toast('请输入手机号')
      if(!this.code) return this.$toast('请输入验证码')
      if(!this.password) return this.$toast('请输入密码')
      if(this.password != this.safePassword) return this.$toast('两次输入密码不一致')
      this.disabled = true
      this.$post({
        module: 'Account',
        interface: '1004',
        data: {
          account: this.mobile,
          captcha: this.code,
          password: this.password
        }
      }).then(() => {
        // console.log(res)
        this.disabled = false
        this.$toast('修改成功,去登录')
        this.$router.replace('/login')
      }).catch(() => {
        this.disabled = false
      })
    }
  },
  components: { Header },
  created() {},
};
</script>

<style scoped lang="less">
.forget {
  width: 100vw;
  // height: 100vh;
  text-align: center;
  background-color: #121212;
  /deep/.app-header-vue {
    background-color: #fff;
  }
  >h2 {
    font-weight: normal;
  }
  .logo {
    width: 138px;
    height: 120px;
    margin-top: 80px;
  }
  .form_login {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 157px 30px 0;
    /deep/.van-field {
      width: 100%;
      margin-bottom: 15px;
      padding-left: 0;
      padding-right: 0;
      background-color: transparent;
      .van-cell__title {
        font-size: 16px;
        color: #FFFFFF;
        width: 65px;
        text-align: right;
      }
      input{
        color: #FFFFFF;
      }
      .van-field__control {
        padding-left: 5px;
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
      background: transparent;
      margin-top: 5px;
      border: 1px solid #CEB968;
      background-color: #121212;
      color: #CEB968;
    }
    .SignIn {
      background: linear-gradient(180deg, #CEB968 0%, #AD9737 100%);
      color: #fff;
      border: none;
      margin-top: 16px;
    }
    .tips {
      padding-top: 15px;
      display: flex;
      align-items: center;
      color: #FFFFFF;
    }
  }
}
</style>