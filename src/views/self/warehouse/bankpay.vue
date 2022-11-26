<template>
    <div class="container" style="background-color: #000000;">
        <Header isback title="立即支付"></Header>
        <div class="box">
            <div class="box1" style="width: 33.33%;text-align: center;">
                <img src="@/assets/img/self/warehouse/zhifu.png" alt="">
                <!-- <span class="text1">----------</span> -->
                <p class="text">支付</p>
            </div>
            <div class="box1" style="width: 33.33%;text-align: center;">
                <img src="@/assets/img/self/warehouse/zhuanzhang.png" alt="">
                <!-- <span class="text1">----------</span> -->
                <p class="text">转账</p>
            </div>
            <div class="box1" style="width: 33.33%;text-align: center;">
                <img src="@/assets/img/self/warehouse/shangchuan.png" alt="">
                <p class="text">上传</p>
            </div>
        </div>
        <div class="box3">
            <div class="card" v-for="(item,index) in payTypeList" :key="index" @click="changePayType(index)">
                <img :src=item.img2 alt="" v-if="payActive == index">
                <img :src=item.img1 alt="" v-else>
                <p class="text" :class="{textActive: payActive == index}">{{ item.name }}</p>
            </div>
        </div>

        <!-- 银行卡支付显示 -->
        <div class="box4" v-if="payActive == 0">
            <p>支付金额</p>
            <span>￥{{ bankInfo.price }}</span>
        </div>
        <div class="box5" v-if="payActive == 0">
            <div class="flex-between">
              <p>银行名称</p>
              <span>{{ bankInfo.bankName }}</span>
            </div>
            <div class="flex-between">
              <p>银行卡号</p>
              <span>{{ bankInfo.bankCard }}</span>
            </div>
            <div class="flex-between">
              <p>开卡人</p>
              <span>{{ bankInfo.bankUsername }}</span>
            </div>
            <div class="flex-between">
              <p>付款金额</p>
              <span>￥{{ bankInfo.price }}</span>
            </div>
        </div>
        <!-- 支付宝支付显示 -->
        <div class="box4" v-if="payActive == 1">
            <!-- <div class="flex-between">
              <p>手机号</p>
              <span>{{bankInfo.ali.account}}</span>
            </div> -->
              <p>支付金额</p>
              <span>￥{{ bankInfo.price }}</span>
        </div>
        <div class="boxz5" v-if="payActive == 1">
            <div class="title">支付宝二维码</div>
            <div style="width:40%;margin:0 auto;"><img :src=bankInfo.ali.payCode alt="" style="width:100%; height:100%" v-image-preview></div>
        </div>
        <!-- 微信支付显示 -->
        <div class="box4" v-if="payActive == 2">
            <p>支付金额</p>
            <span>￥{{ bankInfo.price }}</span>
        </div>
        <div class="boxw5" v-if="payActive == 2">
            <div class="title">微信二维码</div>
            <div style="width:40%;margin:0 auto;"><img :src=bankInfo.wechat.payCode alt=""  style="width:100%; height:100%" v-image-preview>
            </div>
        </div>
        <div class="box6">
        <div class="title">上传支付凭证</div>
        <div class="upload">
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
        <!-- <div class="pic upload">
            <van-uploader
            :after-read="afterRead"
            v-model="fileList"
            multiple
            :max-count="1"
            preview-size="100px"
          >
          <img class="upload_img" src="@/assets/img/self/pic.png" alt="">
          </van-uploader>
        </div> -->
      </div>
      <div class="btn">
        <van-button type="button" block @click="payConfirm(id)" :disabled="disabled" class="both">确认支付</van-button>
      </div>

      <!-- <div @click="afterRead(file)">测试</div> -->
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      fileList: [],
      disabled: false,
      payTypeList:[
        {name:'银行卡支付',img1:require("@/assets/img/self/warehouse/bank1.png"),img2:require("@/assets/img/self/warehouse/bank3.png")},
        {name:'支付宝支付',img1:require("@/assets/img/self/warehouse/zfb.png"),img2:require("@/assets/img/self/warehouse/zfb2.png")},
        {name:'微信支付',img1:require("@/assets/img/self/warehouse/wx.png"),img2:require("@/assets/img/self/warehouse/wx2.png")},
      ],
      payActive:0,
      bankInfo:'',
      id:'',
      upLoadImg:'',
      file:""
    };
  },
  mounted:function (){
    // this.getBankInfo();
  },
  // created() {
  //   this.id = this.$route.query.id
  //   console.log("上页id"+this.id )
  // },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getBankInfo()
    }
  },
  methods: {
    changePayType(index){
      this.payActive = index
    },
    // topage1() {
    //   this.$router.push({path:"/self/zfb"})
    // },
    topage2() {
      this.$router.push({path:"/self/warehouse/zfbpay"})
    },
    topage3() {
      this.$router.push({path:"/self/warehouse/wxpay"})
    },

    getBankInfo() {
        this.$post({
        module: 'Nft',
        interface: '1070',
        data: {
          id: this.id,
        }
      }).then(res => {
        // console.log("测试执行",bankInfo)
        this.bankInfo = res.data
        console.log("测试执行",res.data)
        console.log("内容"+JSON.stringify(res.data))
      })
    },
    afterRead(file) {
      this.$upload(file.file).then(res => {
        this.upLoadImg = res.data.file
      })
    },
    // 支付确认
    payConfirm() {
      console.log("支付商品id"+this.id)
      console.log("支付商品图片"+this.upLoadImg)
      this.$post({
        module: 'Nft',
        interface: '1050',
        data: {
          type: 1,
          id: this.id,
          img: this.upLoadImg,
          

        }
      }).then(res => {
        this.$toast(res.message)
        this.$router.back()
        // this.$router.push({path:'/self/warehouse'})
        // this.changeTab()
        // console.log(res,'上传支付凭证')
        
      })
    },
  },
};
</script>

<style scoped lang="less">
.both{
  background: linear-gradient(180deg, #CEB968 0%, #AD9737 100%);
  color: white;
}
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
            text-align: center;
        }
        .textActive{
          color: #F6D692;
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
        margin-right: 52%;
    }
    span {
        color: #999999;
    }
  }
  .boxz4 {
    margin: 15px;
    padding: 20px 10px;
    width: 92%;
    height: 50px;
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
  .boxz5 {
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
  .boxw4 {
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
    height: 200px;
    background-color: #1b1b1b;
    margin: 15px;
    padding: 15px 10px;
    border-radius: 7px;
    div {
      margin: 20px 10px;
      p {
      color: #ffffff;
      }
      span {
        color: #999999;
      }
    }
    
  }
  .boxw5 {
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
    .upload {
        padding: 20px 0;
    }
  }
  .btn {
    width: 92%;
    border-radius: 7px;
    margin: 15px 15px 0 15px;
    padding-bottom: 15px;
  }
}
</style>
