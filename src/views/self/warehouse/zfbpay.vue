<template>
    <div class="container" style="background-color: #000000;">
        <Header isback title="立即支付"></Header>
        <div class="box">
            <div class="box1">
                <img src="@/assets/img/self/warehouse/zhifu.png" alt="">
                <span class="text1">----------</span>
                <p class="text">支付</p>
            </div>
            <div class="box1">
                <img src="@/assets/img/self/warehouse/zhuanzhang.png" alt="">
                <span class="text1">----------</span>
                <p class="text">转账</p>
            </div>
            <div class="box1">
                <img src="@/assets/img/self/warehouse/shangchuan.png" alt="">
                <p class="text">上传</p>
            </div>
        </div>
        <div class="box3">
            <div class="card"  @click="topage1">
                <img src="@/assets/img/self/warehouse/bank1.png" alt="">
                <p class="text">银行卡支付</p>
            </div>
            <div class="card">
                <img src="@/assets/img/self/warehouse/zfb1.png" alt="">
                <p class="text">支付宝支付</p>
            </div>
            <div class="card" @click="topage3">
                <img src="@/assets/img/self/warehouse/wx.png" alt="">
                <p class="text" style="padding:0 8px;">微信支付</p>
            </div>
        </div>
        <div class="box4">
            <div class="flex-between">
              <p>手机号</p>
              <span>17777777777</span>
            </div>
            <div class="flex-between">
              <p>支付金额</p>
              <span>￥200</span>
            </div>
        </div>
        <div class="box5">
            <div class="title">支付宝二维码</div>
            <div style="width:150px; height:150px; background: green; margin: 45px 90px;"></div>
        </div>
        <div class="box6">
        <div class="title">上传支付凭证</div>
        <div class="pic">
            <van-uploader
            :after-read="afterRead"
            v-model="fileList"
            multiple
            :max-count="1"
            preview-size="100px"
          >
          <img class="upload_img" src="@/assets/img/self/pic.png" alt="">
          </van-uploader>
        </div>
      </div>
      <div class="btn">
        <van-button block @click="submit" :disabled="disabled" color="#0ABB75 ">确认支付</van-button>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      fileList: [],
      disabled: false,
    };
  },
  methods: {
    topage1() {
      this.$router.push({path:"/self/warehouse/bankpay"})
    },
    // topage2() {
    //   this.$router.push({path:"/self/warehouse/zfbpay"})
    // },
    topage3() {
      this.$router.push({path:"/self/warehouse/wxpay"})
    },
    afterRead(file) {
      this.$upload(file.file).then(res => {
          this.img = res.data.file
      })
    },
    submit() {}
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
    display: flex;
    align-items: center;
    .box1 {
        padding: 0 15px;
    }
    .text1 {
        color: #999999;
        // margin-top: -5px;
        margin-left:21px;
    }
    .text {
        color: #999999;
    }
  }
  .box3 {
    display: flex;
    align-items: center;
    .card {
        margin: 0 15px;
        padding: 10px;
        width: 30%;
        height: 80px;
        border-radius: 7px;
        background-color: #1b1b1b;
        img {
            padding:5px 20px;
        }
        .text {
            color: #999999;
        }
    }
  }
  .box4 {
    margin: 15px;
    padding: 20px 10px;
    width: 92%;
    height: 100px;
    border-radius: 7px;
    background-color: #1b1b1b;
    // display: flex;
    // align-items: center;
    div {
      margin-top: 10px;
      p {
        color: #ffffff;
        margin-right: 50%;
      }
      span {
          color: #999999;
      }
    }
    
  }
  .box5 {
    width: 92%;
    height: 280px;
    background-color: #1b1b1b;
    margin: 15px;
    padding: 15px 10px;
    border-radius: 7px;
    .title {
        font-size: 14px;
        color: #ffffff;
        padding-bottom: 15px;
        border-bottom: 1px solid #333333;
    }
  }
  .box6 {
    width: 92%;
    height: 180px;
    background-color: #1b1b1b;
    margin: 15px;
    padding: 15px 10px;
    border-radius: 7px;
    .title {
        font-size: 14px;
        color: #ffffff;
        padding-bottom: 15px;
        border-bottom: 1px solid #333333;
    }
    .pic {
        padding: 20px 0;
    }
  }
  .btn {
    width: 92%;
    border-radius: 7px;
    margin: 15px 15px 0 15px;
  }
}
</style>
