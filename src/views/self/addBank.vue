<template>
  <div class="container" style="background-color: #000000; height: 100vh;">
    <Header isback title="收款管理"></Header>
    <div class="top_tips">银行卡</div>
    <div class="box">
      <div class="bank_info">
        <p><span>姓名：</span> {{ bankInfo.userName }}</p>
        <p><span>卡号：</span> {{ bankInfo.bankNumber }}</p>
        <p><span>开户行：</span> {{ bankInfo.bankName }}</p>
      </div>
      <div class="bank_tips">
        <p>银行卡的信息对您来说十分重要</p>
        <p>请确保银行卡信息真实有效，确保您能正常收款</p>
        <p>银行卡信息一旦填写不可更改</p>
        <p>有问题请联系管理员</p>
      </div>
      <van-button class="btnCard" v-if="btnShow" type="default" @click="show = true">设置</van-button>
    </div>
    <van-popup v-model="show" class="bank_show"   :style="{ height: '241px', width: '310px' }">
      <van-field v-model="name" :border="false" label="姓名:" placeholder="" style="color:#ffffff" />
      <van-field v-model="bankNo" :border="false" label="卡号:" placeholder="" style="color:#ffffff"  />
      <van-field v-model="bankCardNo" :border="false" label="开户行:" placeholder="" style="color:#ffffff"  />
      <van-button type="info" @click="sumbit">确定</van-button>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import {addBank, userBankList} from "@/api/my/userBank";

export default {
  data() {
    return {
      btnShow: false,
      show: false,
      name:'',
      bankNo: '',
      bankCardNo:'',
      bankInfo: {}
    };
  },
  methods: {
    sumbit() {
      if(!this.name) return this.$toast('请输入姓名')
      if(!this.bankNo) return this.$toast('请输入银行卡号')
      if(!this.bankCardNo) return this.$toast('请输入开户行名称')
      /*this.$post({
        module: 'Payment',
        interface: '1001',
        data: {
          owner: this.name,
          cardNo: this.bankNo,
          bankSubbranch: this.bankCardNo
        }
      })*/
      addBank({
        bankType: 1, // 收款类型 0:支付宝 1:银行卡 2:微信，
        bankNumber:this.bankNo, // 卡号
        userName: this.name, // 用户真名
        bankName: this.bankCardNo // 开户行
        // bankImg:
      }).then(res => {
        console.log(res)
        this.show = false
        this.$toast(res.message)
        this.getData()
      })
    },
    getData() {
      userBankList().then(res => {
        const [...bankInfo] = res.data.filter( item=> item.bankType == 1 )
        console.log(bankInfo,'银行卡列表')
        if(bankInfo.length < 1) {
          this.btnShow = true
        } else {
          this.btnShow = false
          this.bankInfo = bankInfo[0]
        }
      })
    }
  },
  created() {
    this.getData()
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  .top_tips {
    width: 100%;
    height: 44px;
    background: #1b1b1b;
    text-align: center;
    line-height: 44px;
    color: #FFFFFF;
    // color: #26A3FF;
    // border-bottom: 4px solid #2EA0F4;
  }
  .box {
    padding: 10px;
    .bank_info {
      width: 100%;
      height: 150px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: #FFFFFF;
      font-size: 14px;
      //background: linear-gradient(180deg, #0B955D 0%, #18A66C 100%);
      background: linear-gradient(to right,#AF993A,#CEB965,#AF993A);
      border-radius: 10px;
      // background-image: url('../../assets/img/self/bankBg.png');
      // background-size: 100% 100%;
      >p {
        span {
          display: inline-block;
          width: 60px;
        }
      }
    }
    .bank_tips {
      padding-left: 5px;
      font-size: 14px;
      color: #999999;
      >p {
        margin-top: 10px;
      }
    }
    .btnCard {
      margin-top: 20px;
      width: 100%;
      height: 32px;
      background: #000000;
      border-radius: 4px 4px 4px 4px;
      color: #FFFFFF;
    }
  }
  .bank_show {
    background-color: #1b1b1b;
    padding: 20px 24px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    /deep/.van-field {
      background-color: #1b1b1b;
      padding: 0;
      .van-field__body {
        background-color: #1b1b1b;
        // width: 165px;
        height: 30px;
        border: 1px solid #FFFFFF;
        padding-left: 2px;
      }
      .van-field__label {
        background-color: #1b1b1b;
        width: 55px;
        color: #FFFFFF;
      }
    }
    .van-button {
      width: 87px;
      height: 40px;
      background: linear-gradient(180deg, #0B955D 0%, #18A66C 100%);
      border: none;
    }
  }
}
</style>
