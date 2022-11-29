<template>
    <div class="container" style="background-color: #000000; height: 100vh;">
      <Header isback title="绑定微信账号"></Header>
      <div class="box">
        <div class="title">账户名称</div>
        <div class="name">
            <input type="text" v-model="accountName" :readonly="state" placeholder="账户名和实名信息一致(真实姓名)">
        </div>
      </div>
      <div class="box1">
        <div class="title">收款二维码</div>
        <div class="pic">
            <van-uploader
            :before-read="beforeRead"
            v-model="fileList"
            multiple
            :max-count="1"
            preview-size="100px"
          >
          <img class="upload_img" :src=imgUrl alt="" v-if="state" style="width:50%;">
          <img class="upload_img" src="@/assets/img/self/pic.png" alt="" v-else>
          </van-uploader>
        </div>
      </div>
      <div class="btn">
        <!-- 已绑定显示修改 -->
      <van-button block @click="state = false" :disabled="disabled" class="both1" v-if="state">修改</van-button>
      <!-- 未绑定显示提交 -->
      <van-button block @click="submit" :disabled="disabled" class="both2" v-else>提交</van-button>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {addBank, userBankList} from "@/api/my/userBank";
import {upload} from "@/api/common";

export default {
  data() {
    return {
        fileList: [],
        disabled: false,
        accountName:'',
        account:'',
        img:'',
        state: true,
        imgUrl:''
    };
  },
  // 生命周期 再进入页面时加载
  mounted(){
    this.getDetails()
  },
  methods: {
    beforeRead (file) {
      upload(file).then(res => {
        console.log(res)
        this.fileList = [{
          url: res.data
        }]
        this.img = res.data
      })
    },
    /*afterRead(file) {
      this.$upload(file.file).then(res => {
          this.img = res.data.file
      })
    },*/
    submit() {
      if(!this.accountName) return this.$toast('请输入账户名称')
      if(!this.img) return this.$toast('请上传收款二维码')
      /*this.$post({
        module: 'Finance',
        interface: '7001',
        data: {
          type: '1',
          account_name:  this.accountName,
          pay_code: this.img
        }
      })*/
      addBank({
        bankType: 2, // 收款类型 0:支付宝 1:银行卡 2:微信
        bankImg: this.img, // 二维码
        bankName: this.accountName //  用户名
      }).then(res => {
        console.log(res)
        this.$toast(res.message)
        this.$router.back(0)
        // this.$router.push({path:'/self/moneyindex'})
      })
    },
    // 查询当前绑定信息
    getDetails(){
      /*this.$post({
        module: 'Finance',
        interface: '7002',
        data: {
          type: '1',
        }
      })*/
      userBankList().then(res => {
        // 通过账户名称是为为空  判断当前是否已完成绑定
        if(res.data.length > 0){
          let [wsInfo] = res.data.filter( item=> item.bankType == 2 )
          console.log(wsInfo)
          if(wsInfo) {
            //  state 用来判断 输入框是否为只读状态
            this.state = true
            this.accountName = wsInfo.bankName
            this.account = wsInfo.bankNumber
            this.imgUrl = wsInfo.bankImg
          } else  {
            this.$toast('当前还未绑定，请先绑定')
            this.state = false
          }
        } else {
          this.$toast('当前还未绑定，请先绑定')
          this.state = false
        }
      })
    },
  },
};
</script>

<style scoped lang="less">
.both1{
  background: linear-gradient(180deg, #CEB968 0%, #AD9737 100%);
  color: white;
}
.both2{
  background: linear-gradient(180deg, #CEB968 0%, #AD9737 100%);
  color: white;
}
.container {
  width: 100vw;
  .box {
    width: 92%;
    height: 110px;
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
    .name {
        padding: 20px 0;
        color: #999999;
    }
  }
  .box1 {
    width: 92%;
    height: 250px;
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
    margin: 15px;
  }
}
</style>