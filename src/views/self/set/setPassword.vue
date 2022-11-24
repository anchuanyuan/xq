<template>
  <div class="container">
    <div class="container" style="background-color: #000000; height: 1px;"></div>
    <Header isback title="修改密码"></Header>
    <van-cell-group>
      <van-cell>
        <template #title>
          原始密码：<van-field type="password" v-model="oldPassword" :border="false" placeholder=""></van-field>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell :border="false">
        <template #title>
          新密码：<van-field type="password" v-model="password" :border="false" placeholder=""></van-field>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          确认密码：<van-field type="password" v-model="newPassword" :border="false" placeholder=""></van-field>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="btn">
      <van-button type="default" @click="sumbit">确认修改</van-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      oldPassword: '',
      password: '',
      newPassword: '',
    };
  },
  methods: {
    sumbit() {
      if (!this.oldPassword) return this.$toast('请输入原始密码')
      if (!this.password) return this.$toast('请输入密码')
      if (this.password != this.newPassword) return this.$toast('两次输入密码不一致')

      this.$post({
        module: 'User',
        interface: '2001',
        data: {
          oldPassword: this.oldPassword,
          password: this.password
        }
      }).then(res => {
        console.log(res)
        this.$toast(res.message)
        localStorage.removeItem('token')
        this.$router.push('/login')
      })
    }
  },
  created() {
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;

  /deep/ [class*=van-hairline]::after {
    border: none;
  }

  .van-cell-group {
    margin-top: 12px;
    background-color: #1b1b1b;

    .van-cell {
      border: none;
      padding: 15px 10px;
      background-color: #1b1b1b;

      .van-cell__title {
        display: flex;
        align-items: center;
        color: #ffffff;

        .text {
          color: #999999;
        }

        .user_img {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          margin-right: 16px;
        }

        /deep/.van-field {
          width: 75%;
          padding: 0;
          margin-top: 0;

          .van-cell__title {
            font-size: 16px;
            color: #000000;
            width: 50px;
          }

          .van-field__control {
            color: #999999;
          }

          .van-field__value {
            border-bottom: 1px solid #333333;
          }
        }
      }
    }
  }

  .btn {
    display: flex;
    justify-content: center;
    padding-top: 24px;

    .van-button {
      width: 115px;
      height: 30px;
      color: #ffffff;
      background: #1b1b1b;
      opacity: 1;
      border: 1px solid #1b1b1b;
    }
  }
}
</style>
