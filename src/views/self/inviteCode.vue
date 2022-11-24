<template>
  <div style="background-color:#1B1B1B; height:100vh">
    <Header title="我的邀请二维码" :isback="true"></Header>
    <div style="background-color:#000000; height:15px"></div>
    <div class="qrcodeBox">
      <simple-qr-code
        :value="info.inviteUrl"
      ></simple-qr-code>
    </div>
    <div class="nickname flex-center">{{ info.nickname }}</div>
    <div class="tips flex-center">请直接截屏保存二维码</div>
  </div>
</template>

<script type="text/ecmascript-6">
import SimpleQrCode from "../../components/SimpleQrCode.vue";
export default {
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.update_url();
  },
  mounted() {
  },
  methods: {
    update_url() {
      this.$post({
        module: 'User',
        interface: '4000',
      }).then(res => {
        // console.log(res,'邀请好友信息')
        this.info = res.data
      })
    },
  },
  components: {
    "simple-qr-code": SimpleQrCode,
  },
};
</script>

<style scoped lang="less">
.qrcodeBox {
  width: 343px;
  height: 344px;
  background-color: #1B1B1B;
  margin: 69px auto 0;
}
.nickname {
  font-size: 18px;
  font-family: PingFang SC-Bold, PingFang SC;
  font-weight: bold;
  margin-top: 24px;
  color: #FFFFFF;
}
.tips {
  font-size: 13px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  margin-top: 33px;
}
</style>