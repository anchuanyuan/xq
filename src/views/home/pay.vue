<template>
  <div class="bei">
    <Header class="" title="立即支付" isback />
    <div class="outside">
      <div class="box">
        <div class="label">订单详情</div>
        <div class="pay-cell flex-row">
          <div class="title">订单号：</div>
          <div class="title">{{ info.serialNo }}</div>
        </div>
        <div class="pay-cell flex-row">
          <div class="data">购买数量：</div>
          <div class="data">{{ info.num }}</div>
        </div>
        <div class="pay-cell flex-row">
          <div class="data">创建订单时间：</div>
          <div class="data">{{ info.createdAt }}</div>
        </div>
      </div>
      <div class="box">
        <div class="label">支付方式</div>
        <div>
          <van-divider />
        </div>
        <van-radio-group v-model="radio">
          <van-radio icon-size="18"  checked-color="#F6D692" name="1">二维码支付</van-radio>
          <van-radio icon-size="18"  checked-color="#F6D692" name="2">银行卡支付</van-radio>
        </van-radio-group>
        <div class="qrCode" v-if="radio == 1">
            <img :src="info.qrCode" />
            <!-- <img src="../../assets/img/home/erweima.jpg" /> -->
            <div>二维码支付</div>
        </div>
        <div v-if="radio == 2">
          <!-- <div class="pay-type flex-row">
            <div>
              <img src="@/assets/img/self/warehouse/bank.png" />
            </div>
            <div>银行卡</div>
          </div> -->
          <div class="pay-cell flex-between">
            <div class="title">银行卡账号</div>
            <div class="data flex-around">
              <div>{{ info.bankCard }}</div>
              <div>
                <img
                  @click="copy(info.bankCard)"
                  src="@/assets/img/self/warehouse/copy1.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="pay-cell flex-between">
            <div class="title">收款人</div>
            <div class="data">{{ info.bankUser }}</div>
          </div>
          <div class="pay-cell flex-between">
            <div class="title">银行名称</div>
            <div class="data">{{ info.bankName }}</div>
          </div>
          <div class="pay-cell flex-between">
            <div class="title">开户行</div>
            <div class="data">{{ info.bankAddress }}</div>
          </div>
        </div>
    
      </div>
      <div class="box">
        <div class="label">上传支付凭证</div>
        <div class="upload">
          <van-uploader
            :after-read="afterRead"
            v-model="fileList"
            multiple
            :max-count="1"
            preview-size="100px"
          >
          <img class="upload_img" src="../../assets/img/home/upload.png" alt="">
          </van-uploader>
        </div>
      </div>
      <div class="btn">
        <van-button block @click="submit" :disabled="disabled" class="btnBuy">提交订单</van-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      radio: '1',
      fileList: [],
      disabled: false,
      info:{},
      id:'',
      img:'',
    };
  },
  created() {
    if(this.$route.query.id) {
      this.id = this.$route.query.id
    }
    this.getOrderDetails()
  },
  methods: {
    getOrderDetails() {
      this.$post({
        module: 'Good',
        interface: '1020',
        data: {
          id: this.id
        }
      }).then(res => {
        // console.log(res)
        this.info = res.data
      })
    },
    afterRead(file) {
      this.$upload(file.file).then(res => {
          this.img = res.data.file
      })
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
    submit() {
      if(!this.img) return this.$toast('请上传支付凭证')
      this.disabled = true
      this.$post({
        module: 'Good',
        interface: '1025',
        data: {
          id: this.info.id,
          img: this.img
        }
      }).then(res => {
        // console.log(res)
        this.$toast(res.message)
        this.$router.replace('/')
      })
    }
  },
  components: {},
};
</script>

<style scoped lang="less">
.btnBuy{
  background: linear-gradient(180deg, #D0BB6B 0%, #AB9535 100%);
  color: white;
}
  .bei{
    width: 100%;
    // height: 100vh;
    background-color: #121212;
  }
.outside {
  padding: 10px;
}
.box {
  margin-top: 16px;
  padding: 10px;
  background: #1B1B1B;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  .label {
    font-size: 15px;
    font-weight: 400;
    color: #FFFFFF;
  }
}
.goods-box {
  margin-top: 10px;
  display: flex;
  .goods-img {
    width: 54px;
    height: 54px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .goods-info {
    margin-left: 10px;
    width: 197px;
    .title {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 15px;
      font-weight: 400;
      color: #333333;
    }
    .order-no {
      margin-top: 15px;
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
    .price {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 400;
      color: #ff0e0e;
    }
  }
}

.box {
  .price {
    .sliding();
    font-size: 12px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ff0e0e;
  }
  .sliding {
    margin-top: 12px;
    ::v-deep .van-slider__button {
      width: 14px;
      height: 14px;
    }
    ::v-deep .van-slider__bar {
      background-color: #0091a8;
      //background: linear-gradient(180deg, #F2D38E 0%, #B19A3C 100%);
    }
  }
  .flex-between {
    .sliding();
    font-size: 12px;
    font-weight: 400;
    color: #333333;
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
    margin-top: 22px;
    img {
      width: 16px;
      height: 16px;
      margin-left: 10px;
    }
    .title {
      font-size: 15px;
      font-weight: 400;
      color: #999999;
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
  margin-top: 46px;
  // background-image: linear-gradient(#01A491,#0ABB75);
  

  .van-button {
    height: 38px;
    line-height: 38px;
    border-radius: 10px 10px 10px 10px;
    
  }
  // background-image: linear-gradient(#01A491,#0ABB75);

}
.van-radio-group {
  // padding-left: 10px;
  .van-radio {
    padding-bottom: 10px;
  }
}
/deep/.van-radio__label{
  color: #ffffff;
}
</style>