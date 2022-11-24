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
            <div class="card" @click="topage2">
                <img src="@/assets/img/self/warehouse/zfb.png" alt="">
                <p class="text">支付宝支付</p>
            </div>
            <div class="card" @click="topage3">
                <img src="@/assets/img/self/warehouse/wx1.png" alt="">
                <p class="text" style="padding:0 8px; color: #0BBC74;">微信支付</p>
            </div>
        </div>
        <div class="box4">
            <p>支付金额</p>
            <span>￥{{ bankInfo.price }}</span>
        </div>
        <div class="box5">
            <div class="title">微信二维码</div>
            <div style="width:150px; height:150px; margin: 45px 90px;">
              {{ bankInfo.payCode }}
            </div>
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
        <van-button block @click="payConfirm(id)" :disabled="disabled" color="#0ABB75 ">确认支付</van-button>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      fileList: [],
      disabled: false,
      bankInfo:'',
      id:'',
      upLoadImg:'',
      file:""
    };
  },
  mounted:function (){
    this.getBankInfo();
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      console.log("id"+this.id)
      this.getBankInfo()
    }
  },
  methods: {
    topage1() {
      this.$router.push({path:"/self/warehouse/bankpay"})
    },
    topage2() {
      this.$router.push({path:"/self/warehouse/zfbpay"})
    },
    topage3() {
      this.$router.push({path:"/self/warehouse/wxpay"})
    },
    getBankInfo() {
      console.log("商品id"+this.id)
        this.$post({
        module: 'Nft',
        interface: '1071',
        data: {
          type: 1,
          id: this.id
        }
      }).then(res => {
        console.log("测试执行")
        this.bankInfo = res.data
        console.log("内容"+res.data)
      })
    },
    afterRead(file) {
      console.log("图片")
      this.$upload(file.file).then(res => {
        this.upLoadImg = res.data.file
        console.log("图片"+this.upLoadImg)
      })
    },
    // 支付确认
    payConfirm(id) {
      console.log("支付商品id"+this.id)
      console.log("支付商品图片"+this.upLoadImg)
      this.$post({
        module: 'Nft',
        interface: '1050',
        data: {
          type: 1,
          id: this.id,
          img: this.upLoadImg
        }
      }).then(res => {
        this.$toast(res.message)
        this.$router.push({path:'/self/warehouse/index'})
        this.changeTab()
        // console.log(res,'上传支付凭证')
        
      })
    },
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
    height: 50px;
    border-radius: 7px;
    background-color: #1b1b1b;
    display: flex;
    align-items: center;
    p {
        color: #ffffff;
        margin-right: 70%;
    }
    span {
        color: #999999;
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
