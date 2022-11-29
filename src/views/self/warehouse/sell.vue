<template>
<!--  委托上架-->
  <div class="" style="background-color: #000000; height: 100%;">
    <Header class="" title="手续费" isback />
    <div class="outside">
      <div class="box">
        <div class="label">订单详情</div>
        <div class="goods-box">
          <div class="goods-img">
            <img :src="info.nftCover" alt="" />
          </div>
          <div class="goods-info">
            <div class="title">
              {{ info.nftName }}
            </div>
            <div class="order-no">
              <div>订单号：{{ info.serialNo }}</div>
            </div>
            <div class="price">
              <div><small>￥</small> {{ info.price }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="label">委托价格</div>
        <div class="price">￥{{ value }}</div>
        <div class="sliding">
          <van-slider v-model="value" :max="info.max" :min="info.min" @change="onChange" />
        </div>
        <div class="flex-between">
          <div>￥{{ info.min }}</div>
          <div>￥{{ info.max }}</div>
        </div>
      </div>
      <div class="box">
        <!-- <div class="label">支付方式</div> -->
        <!-- <div>
          <van-divider />
        </div> -->
        <!-- <div class="qrCode">
            <img :src="info.qrCode" />
            <img src="../../../assets/img/home/erweima.jpg" />
            <div style="color:#ffffff">二维码支付</div>
        </div> -->
        <!-- <div class="pay-type flex-row">
          <div>
            <img src="@/assets/img/self/warehouse/bank.png" />
          </div>
          <div>银行卡</div>
        </div>
        <div class="pay-cell flex-between">
          <div class="title">银行卡账号</div>
          <div class="data flex-around">
            <div>{{ info.bankCard }}</div>
            <div>
              <img
                @click="copy(info.bankCard)"
                src="@/assets/img/self/warehouse/copy.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="pay-cell flex-between">
          <div class="title">收款人</div>
          <div class="data">{{ info.bankUsername }}</div>
        </div>
        <div class="pay-cell flex-between">
          <div class="title">银行名称</div>
          <div class="data">{{ info.bankName }}</div>
        </div>
        <div class="pay-cell flex-between">
          <div class="title">开户行</div>
          <div class="data">{{ info.bankAddress }}</div>
        </div> -->
        <div class="pay-cell flex-between">
          <div class="title">手续费</div>
          <div class="data">￥ {{ parseInt(Number(info.price) * (Number(info.feeRatio) / 100)) }}</div>
        </div>
      </div>
      <div class="box">
        <!-- 优惠券单元格 -->
        <van-coupon-cell
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showList = true"
        />
        <van-popup
          v-model="showList"
          position="bottom"
          style="height: 90%; padding-top: 4px;"
        >
          <van-coupon-list
            :exchange-button-disabled="true"
            :exchange-button-text="' '"
            :show-exchange-bar="false"
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange1"
          />
        </van-popup>
      </div>
      <!-- <div class="box">
        <div class="label">上传支付凭证</div>
        <div class="upload">
          <van-uploader
            :after-read="afterRead"
            v-model="fileList"
            multiple
            :max-count="1"
          >
            <img class="upload_img" src="../../../assets/img/home/upload.png" alt="">
          </van-uploader>
        </div>
      </div> -->

      <div class="box">
          <p class="label">选择支付方式：</p>
          <van-radio-group v-model="radio" direction="horizontal" style="color:white">
            <!-- <van-radio name="1">微信支付</van-radio> -->
            <van-radio name="2"  checked-color='#0e9c63' color="white">汇付支付宝支付</van-radio>
            <!-- <van-radio name="3"  style="color:white">支付宝支付</van-radio> -->
          </van-radio-group>
        </div>
      <div class="btn">
        <van-button block @click="pay" color="linear-gradient(180deg, #0B955D 0%, #18A66C 100%)">确认上架</van-button>
        <van-popup v-model="show" closeable position="bottom" :style="{ height: '40%' }">
          <div class="top-text">
            <p>确认支付</p>
            <p>￥ {{ chosenCoupon == -1 ?parseInt(Number(info.price) * (Number(info.feeRatio) / 100)) : parseInt(Number(info.price) * (Number(info.feeRatio) / 100)) - coupons[chosenCoupon].value/100 }}</p>
          </div>
          
          <div>
          <van-divider />
          </div>

        <van-button block @click="pay" color="linear-gradient(180deg, #0B955D 0%, #18A66C 100%)">确认支付</van-button>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import { CouponCell, CouponList } from 'vant';

Vue.use(CouponCell);
Vue.use(CouponList);
import { ref } from 'vue'
export default {
  data() {
    return {
      value: null,
      fileList: [],
      id:'',
      info:'',
      img: '',
      show: false,
      radio:'2',
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      showList:false,
      lastId:0,
      coupon_id:''
    };
  },
  created() {
    if(this.$route.query.id) {
      this.id = this.$route.query.id
      this.getInfo()
      this.getCouponsList()
    }
    
  },
  methods: {
    getCouponsList(){
      this.coupons = []
      this.$post({
        module: 'Coupons',
        interface: '1000',
        data: {
          lastId:this.lastId,
          page:1
        }
      }).then(res => {
        this.lastId = res.data.lastId
        console.log(res.data.list.length)
        let lenght = res.data.list.length
        console.log(res.data.list)
        for(let i=0;i<lenght;i++){

          //优惠券赋值
          // let obj = {
          //   id:res.data.list[i].id,
          //   name:res.data.list[i].name,

          //   valueDesc:res.data.list[i].faceValue,
          //   // startAt: false,
          //   // endAt:false,
          //   condition:res.data.list[i].coupons.typeText,
          // }
          // if(res.data.list[i].status == 0) {
          //   this.coupons.push(obj)
          //   console.log(this.coupons)
          //   }else {
          //     this.disabledCoupons.push(obj)
          //   }

          //判断打折还是固定金额优惠券
           if(res.data.list[i].thisType=="percent"){
            let obj = {
              id:res.data.list[i].id,
              name:res.data.list[i].name,
              valueDesc:parseInt(res.data.list[i].faceValue),
              startAt: res.data.list[i].startText,
              endAt:res.data.list[i].endText,
              condition:res.data.list[i].typeText,
              value:parseInt((Number(this.info.price) * Number(this.info.feeRatio))/2),
              unitDesc:'折',
              condition:'周末上架半价'
            }
          if(res.data.list[i].status == 0) {
            this.coupons.push(obj)
            }else {
              this.disabledCoupons.push(obj)
            }
          }else if(res.data.list[i].thisType=="fixed"){
            let obj = {
              id:res.data.list[i].id,
              name:res.data.list[i].name,
              valueDesc:res.data.list[i].faceValue,
              startAt: res.data.list[i].startText,
              endAt:res.data.list[i].endText,
              condition:res.data.list[i].coupons.typeText,
              value:res.data.list[i].faceValue*100,
              unitDesc:'元',
            }
          if(res.data.list[i].status == 0) {
            this.coupons.push(obj)
            }else {
              this.disabledCoupons.push(obj)
            }
          }      
          
        }
      })
    },
    onChange1(index) {
      this.showList = false;
      this.chosenCoupon = index;
      if(this.chosenCoupon !=-1){
      console.log(this.coupons[index].id)
      this.coupon_id=this.coupons[index].id
      console.log(this.coupon_id)
      }
      console.log(this.chosenCoupon)
    },
    getInfo() {
      this.$post({
        module: 'Nft',
        interface: '1045',
        data: {
          id: this.id
        }
      }).then(res => {
        this.info = res.data
        console.log("info"+this.info )
        console.log(this.info )
        this.value = Number(res.data.min)
        // console.log(res)
      })
    },
    onChange(value) {
      console.log(value);
    },
    afterRead(file) {
      this.$upload(file.file).then(res => {
          this.img = res.data.file
      })
    },
    submit() {
      // 弹窗打开
      this.show = true
      // if(!this.value) return this.$toast('请选择正确的委托价格')
      // if(!this.img) return this.$toast('')
      // this.$post({
      //   module: 'Nft',
      //   interface: '1040',
      //   data: {
      //     id: this.id,
      //     price: this.value,
      //     img: this.img
      //   }
      // }).then(res => {
      //   this.$toast(res.message)
      //   this.$router.back()
      //   // console.log(res,'委托上架')
      // })
    },
    pay() {
      console.log("1112222")
      // console.log(this.value)
      // console.log(this.info.max)
      // if(!this.value) return this.$toast('请选择正确的委托价格')


      console.log("222222222")
      console.log(this.radio)
      if(this.radio == '1'){
         // 微信支付
         this.$post({
            module: 'Socialite',
            interface: '8001',
            data: {}
          }).then(res => {
            window.location.href = res.data.openlink
          })
      }else if(this.radio == '2'){
        // window.location.href = 'alipays://platformapi/startapp?saId=10000007&qrcode=' + "https://qr.alipay.com/bax04643xthybjl32e6n5516"
        console.log('1111111111111111zfb')
        // 汇付支付宝支付
        // console.log('9999999999999999'+ coupon_id)
        console.log(this.coupon_id)
        this.$post({
            module: 'Finance',
            interface: '7003',
            data: {
              coupon_id: this.coupon_id, //优惠券ID
              id: this.id, //当前id
              type: "ali_app", //wechat_app,ali_app
              open_id: "",
              price: this.value//商品价格
            }
          }).then(res => {
            console.log(res.data.expend.pay_info)
            window.location.href = 'alipays://platformapi/startapp?saId=10000007&qrcode=' + res.data.expend.pay_info
          })
      }else if(this.radio == '3'){
        // window.location.href = 'alipays://platformapi/startapp?saId=10000007&qrcode=' + "https://qr.alipay.com/bax04643xthybjl32e6n5516"
        // 支付宝支付
        // console.log('9999999999999999'+ coupon_id)
        console.log(this.coupon_id)
        this.$post({
            module: 'Finance',
            interface: '7003',
            data: {
              coupon_id: this.coupon_id, //优惠券ID
              id: this.id, //当前id
              type: "ali", //wechat_app,ali_app
              open_id: "",
              price: this.value//商品价格
            }
          }).then(res => {
            console.log(res.data.expend.pay_info)
            window.location.href = 'alipays://platformapi/startapp?saId=10000007&qrcode=' + res.data.expend.pay_info
          })
      }
    },
    copy(code) {
      this.$copyText(code)
        .then(() => {
          this.$toast("复制成功");
        })
        .catch(() => {
          this.$toast("复制失败");
        });
    },
  },
  components: {},
};
</script>

<style scoped lang="less">


 .van-radio  .van-radio__label{
    color: white!important;
  }

.van-cell::after {
  border: none;
}
.van-coupon-cell__value--selected {
  color: #999999;
}
.van-cell {
  background-color:#1b1b1b;
  color: #ffffff;
  padding: 0;
}
.outside {
  padding: 10px;
}
.box {
  margin-top: 16px;
  padding: 10px;
  background: #1b1b1b;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  .label {
    font-size: 15px;
    font-weight: 400;
    color: #ffffff;
  }
}
.goods-box {
  margin-top: 10px;
  display: flex;
  .goods-img {
    width: 88px;
    height: 88px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .goods-info {
    margin-left: 10px;
    width: 197px;
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
    .order-no {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
    .price {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 400;
      color: #0BBC74;
    }
  }
}

.box {
  .price {
    .sliding();
    font-size: 12px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #0BBC74;
  }
  .sliding {
    margin-top: 12px;
    ::v-deep .van-slider__button {
      width: 14px;
      height: 14px;
    }
    ::v-deep .van-slider__bar {
      background-color: #15CDC3;
    }
  }
  .flex-between {
    .sliding();
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }
}
.box {
  .pay-type {
    height: 21px;
    font-size: 15px;
    font-weight: 400;
    color: #333333;
    img {
      width: 24px;
      height: 24px;
      margin-right: 6px;
    }
  }
  .qrCode {
    text-align: center;
    img {
      width: 200px;
      height: 200px;
      margin: 10px 0 20px;
    }
  }
  .pay-cell {
    // margin-top: 22px;
    img {
      width: 16px;
      height: 16px;
      margin-left: 10px;
    }
    .title {
      font-size: 15px;
      font-weight: 400;
      color: #ffffff;
    }
    .data {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
}
.box {
  .upload {
    margin-top: 10px;
    ::v-deep .van-icon-photograph:before {
      content: "\e6fa";
    }
    ::v-deep .van-uploader__upload {
      background-color: transparent;
      border: 1px #999 dashed;
      border-radius: 5px;
    }
    .upload_img {
      width: 100px;
      height: 100px;
    }
  }
}
.btn {
  margin-top: 130px;
  .top-text {
    padding-top: 10px;
    text-align: center;
    font-size: 18px;
  }
  .van-radio-group--horizontal {
    padding: 30px;
  }
  // .van-radio--horizontal {
  //   margin: auto;
  // }


  
}
</style>