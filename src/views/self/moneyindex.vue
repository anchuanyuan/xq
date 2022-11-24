<template>
  <div class="container" style="background-color: #000000;">
    <Header isback title="收款信息"></Header>
    <div class="box">
      <div class="zfb flex-row flex-between">
        <img src="@/assets/img/self/zfb.png" alt="">
        <div class="bank">
          <p class="" style="font-size:14px; color:#ffffff; padding-bottom:5px">绑定支付宝账号</p>
          <p style="font-size:12px; color:#999999">{{ bankList.cardNo }}</p>
        </div>
        <div class="box-right">
          <span style="color:#999999; padding-right:5px" @click="topage1">去绑定</span>
          <img class="more" src="@/assets/img/self/more1.png" alt="" />
        </div>
      </div>
      <!-- <div class="zfb flex-row flex-between">
        <img src="@/assets/img/self/zfb.png" alt="">
        <div class="bank">
          <p class="" style="font-size:14px; color:#ffffff; padding-bottom:5px">绑定支付宝账号</p>
          <p style="font-size:12px; color:#999999">立即到账，方便快捷</p>
        </div>
        <div class="box-right">
          <span style="color:#999999; padding-right:5px" @click="topage1">去绑定</span>
          <img class="more" src="@/assets/img/self/more1.png" alt="" />
        </div>
      </div> -->
    </div>
    <div class="box">
      <div class="zfb flex-row flex-between">
        <img src="@/assets/img/self/wx.png" alt="">
        <div class="bank">
          <p class="" style="font-size:14px; color:#ffffff; padding-bottom:5px">绑定微信账号</p>
          <p style="font-size:12px; color:#999999">{{ bankList.cardNo }}</p>
        </div>
        <div class="box-right">
          <span style="color:#999999; padding-right:5px" @click="topage2">去绑定</span>
          <img class="more" src="@/assets/img/self/more1.png" alt="" />
        </div>
        <!-- <div class="bank">
          <p class="" style="font-size:14px; color:#ffffff; padding-bottom:5px">绑定微信账号</p>
          <p style="font-size:12px; color:#999999">立即到账，方便快捷</p>
        </div>
        <div class="box-right">
          <span style="color:#999999; padding-right:5px" @click="topage2">去绑定</span>
          <img class="more" src="@/assets/img/self/more1.png" alt="" />
        </div> -->
      </div>
    </div>
    <div class="box">
      <div class="zfb flex-row flex-between">
        <img src="@/assets/img/self/bank.png" alt="">
        <div class="bank">
          <p class="" style="font-size:14px; color:#ffffff; padding-bottom:5px">绑定银行卡账号</p>
          <p style="font-size:12px; color:#999999">{{ bankList.cardNo }}</p>
        </div>
        <div class="box-right">
          <span style="color:#999999; padding-right:5px" @click="topage3">去绑定</span>
          <img class="more" src="@/assets/img/self/more1.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      bankList: ''
    };
  },
  methods: {
    topage1() {
      this.$router.push({path:"/self/zfb"})
    },
    topage2() {
      this.$router.push({path:"/self/wx"})
    },
    topage3() {
      this.$router.push({path:"/self/addBank"})
    }
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  .box {
    margin: 15px;
    padding: 20px 10px;
    width: 92%;
    height: 80px;
    border-radius: 7px;
    background-color: #1b1b1b;
    .bank {
      padding-left: 10px;
      padding-right: 115px;
    }
    .box-right{
      display: flex;
      align-items: center;
    }
  }
}
</style>
