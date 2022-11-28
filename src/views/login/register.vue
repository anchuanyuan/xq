<template>
  <div class="login">
    <Header isback title="注册" />
    <img class="logo" src="../../assets/img/login/logo.jpg" alt="">
    <div class="form_login">
      <van-field v-model="nickName" label="昵称" :border="false" placeholder="">
        <template #right-icon>
          <img class="right_icon" @click="nickName = ''" src="../../assets/img/login/shanchu.png" alt="">
        </template>
      </van-field>
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
      <van-field v-model="code" label="验证码" :border="false" placeholder=""></van-field>
      <van-field v-model="invitation" label="邀请码" :disabled="disabled" :border="false" placeholder="">
        <template #right-icon>
          必填
        </template>
      </van-field>
      <van-button type="default" :disabled="captBtnDisabled" @click="onCaptBtn">{{ captBtnText }}</van-button>
      <van-button class="SignIn" type="default" @click="submit" :disabled="reDisabled">注册</van-button>
      <div class="tips">
        <van-checkbox v-model="checked" checked-color="#222222" icon-size="14px" shape="square">请仔细阅读《用户需知》相关协议</van-checkbox>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Header from '../../components/Header.vue';
import { register,getCode} from "@/api/login";
export default {
  data() {
    return {
      mobile:'',
      nickName:'',
      password: '',
      show: false,
      checked: '',
      code:'',
      invitation: '',
      reDisabled: false,
      disabled: false,
      captBtnDisabled: false,
      captBtnText: "发送验证码"
    };
  },
  created() {
    if (this.$route.query.invitedFrom) {
        this.invitation = this.$route.query.invitedFrom
        this.disabled = true;
      }
  },
  methods: {
    // 注册
    submit() {
      if(!this.nickName) return this.$toast('请输入昵称')
      if(!this.mobile) return this.$toast('请输入手机号')
      if(!this.password) return this.$toast('请输入密码')
      if(!this.code) return this.$toast('请输入验证码')
      if(!this.invitation) return this.$toast('请输入邀请码')
      if(!this.checked) return this.$toast('请阅读并同意《用户需知》')
      this.reDisabled = true
      //进行注册的接口调用
        register({
          data: {
            code:this.code,
            userAccount:this.mobile,
            userCode:this.invitation,
            userName:this.nickName,
            userPassword:this.password,
            userPhone:this.mobile
          }
        }).then(() => {
        this.reDisabled = false
        this.$toast('注册成功')
        this.$router.push('/login')
      }).catch(() => {
        this.reDisabled = false
      })

    },
    //发送验证码
    onCaptBtn() {
      if(!this.mobile)
        return this.$toast('请输入手机号')
      //请求验证码的接口
       getCode({
         data: {
           phone : this.mobile,
         }
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
    }

  },
  components: { Header },
};
</script>

<style scoped lang="less">
.login {
  width: 100vw;
  // height: 100vh;
  background-color: #121212;
  text-align: center;
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
    padding-top: 15px;
    /deep/.van-field {
      width: 75%;
      margin-bottom: 15px;
      padding-left: 0;
      padding-right: 0;
    background-color: #121212;

      .van-cell__title {
        font-size: 16px;
        color: #FFFFFF;
        width: 50px;
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
      background: #121212;
      margin-top: 5px;
      border: 1px solid #CEB968;
      color: #CEB968;
    }
    .SignIn {
      //background: #0BBC74;
      background: linear-gradient(180deg, #CEB968 0%, #AD9737 100%);
      color: #fff;
      border: none;
      margin-top: 16px;
    }
    .tips {
      padding-top: 15px;
      display: flex;
      align-items: center;
      /deep/.van-checkbox__label {
        color: #959595;
      }
    }
  }
}
</style>