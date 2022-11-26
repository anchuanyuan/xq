<template>
  <div class="">
    <Header class="" title="立即缴纳" isback />
    <div class="outside">
      <div class="box">
        <div class="label">支付方式</div>
        <div>
          <van-divider />
        </div>
        <div class="qrCode">
            <img :src="bankInfo.qrCode" />
            <!-- <img src="../../assets/img/home/erweima.jpg" /> -->
            <div>二维码支付</div>
        </div>
        <!-- <div class="pay-type flex-row">
          <div>
            <img src="@/assets/img/self/warehouse/bank.png" />
          </div>
          <div>银行卡</div>
        </div>
        <div class="pay-cell flex-between">
          <div class="title">银行卡账号</div>
          <div class="data flex-around">
            <div>{{ bankInfo.bankCode }}</div>
            <div>
              <img
                @click="copy(bankInfo.bankCode)"
                src="@/assets/img/self/warehouse/copy.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="pay-cell flex-between">
          <div class="title">收款人</div>
          <div class="data">{{ bankInfo.owner }}</div>
        </div>
        <div class="pay-cell flex-between">
          <div class="title">银行名称</div>
          <div class="data">{{ bankInfo.bankName }}</div>
        </div>
        <div class="pay-cell flex-between">
          <div class="title">开户行</div>
          <div class="data">{{ bankInfo.bankDeposit }}</div>
        </div> -->
    
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
          <img class="upload_img" src="../../assets/img/home/upload1.png" alt="">
          </van-uploader>
        </div>
      </div>
      <div class="btn">
        <van-button block @click="submit" class="both">立即缴纳</van-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      fileList: [],
      bankInfo: {},
      img:''
    };
  },
  created() {
    this.payDeposit()
  },
  methods: {
    afterRead(file) {
      this.$upload(file.file).then(res => {
          this.img = res.data.file
      })
    },
    submit(){
      if(!this.img) return this.$toast('请上传支付凭证')
      this.$post({
        module: 'Nft',
        interface: '1010',
        data: {
          img: this.img
        }
      }).then(res => {
        console.log(res,'缴纳保证金')
        // this.$toast(res.message)
        // this.$router.back()
      })
    },
    payDeposit(){
      this.$post({
        module: 'Nft',
        interface: '1005',
      }).then(res => {
        this.bankInfo = res.data
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
  },
  components: {},
};
</script>

<style scoped lang="less">
.both{
  background: linear-gradient(180deg, #CEB968 0%, #AD9737 100%);
  color: white;
}
.outside {
  padding: 10px;
}
.box {
  margin-top: 16px;
  padding: 10px;
  //background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  .label {
    font-size: 15px;
    font-weight: 400;
    color: #fff;
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
      background: linear-gradient(180deg, #CEB968 0%, #AD9737 100%);
      //background-color: #0091a8;
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
    color: #fff;
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
      color: #333333;
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
  .van-button {
    height: 38px;
    line-height: 38px;
    border-radius: 10px 10px 10px 10px;
  }
}
</style>