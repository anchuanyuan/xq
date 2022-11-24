<template>
  <div class="">
    <Header class="" title="买方详情" isback />
    <div class="outside">
      <div class="box" style="padding-bottom: 1px;">
        <div class="pay-cell flex-row">
          <div class="title">订单号：</div>
          <div class="title">{{ info.serialNo }}</div>
        </div>
        <div class="pay-cell flex-row">
          <div class="data">购买数量：</div>
          <div class="data">1</div>
        </div>
        <div class="pay-cell flex-row">
          <div class="data">创建订单时间：</div>
          <div class="data">{{ info.createdAt }}</div>
        </div>
        <img class="type_img" :src="info.status == 2 ? typeImg[0] : info.status == 3 ? typeImg[1] : info.status == 4 ?  typeImg[2] : ''" alt="">
      </div>
      <div class="box">
        <div class="label">卖方信息</div>
        <div class="goods-box">
          <div class="goods-img">
            <img :src="info.seller ? info.seller.avatar : ''" alt="" />
          </div>
          <div class="goods-info">
            <div class="title">
              {{ info.seller ? info.seller.nickname : '' }}
            </div>
            <div class="order-no">
              联系方式：{{ info.seller ? info.seller.mobile : '' }}
            </div>
          </div>
        </div>
        <div class="label labelTop" v-if="info.buyer">买方信息</div>
        <div class="goods-box" v-if="info.buyer">
          <div class="goods-img">
            <img :src="info.buyer ? info.buyer.avatar : ''" alt="" />
          </div>
          <div class="goods-info">
            <div class="title">
              {{ info.buyer ? info.buyer.nickname : ''}}
            </div>
            <div class="order-no">
              联系方式：{{ info.buyer ? info.buyer.mobile : '' }}
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="label">支付方式</div>
        <div>
          <van-divider />
        </div>
        <div class="pay-type flex-row">
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
        </div>
      </div>
      <div class="box" v-if="info.submitBtnStatus || info.payBtnStatus">
        <div class="label">上传支付凭证</div>
        <div class="upload flex-center">
          <van-uploader
            :after-read="afterRead"
            v-model="fileList"
            multiple
            :deletable="deletable"
            :max-count="1"
            preview-size="100px"
          >
          <img class="upload_img" src="../../assets/img/home/upload.png" alt="">
          </van-uploader>
        </div>
      </div>
      <div class="btn">
        <van-button block  v-if="info.submitBtnStatus" color="#13CEC0" @click="conSubmit">确认收款</van-button>
        <van-button block  v-if="info.payBtnStatus" @click="submit" color="#13CEC0">确认支付</van-button>
        <!-- <van-button block  v-else color="#13CEC0">完成</van-button> -->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      type: 0, // 模拟   0 未支付    1待确认   2 已完成
      deletable: true, //上传凭证是否可以删除
      id: '',
      info: {},
      uploadImg: '',
      typeImg: [
        require('../../assets/img/self/weizhifu.png'),
        require('../../assets/img/self/daiqueren.png'),
        require('../../assets/img/self/yiwancheng.png'),
      ],
      fileList: [
        // { url: require('../../assets/img/home/banner.png') }
      ],
    };
  },
  created() {
    this.id = this.$route.query.id
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$post({
        module: 'Good',
        interface: '1095',
        data: {
          id: this.id
        }
      }).then(res => {
        this.info = res.data
        if(res.data.payImg) {
          this.deletable = false
          this.fileList.push({
            url : res.data.payImg 
          })
        }
        console.log(res,'藏品交易详情')
      })
    },
    afterRead(file) {
      this.$upload(file.file).then(res => {
        this.uploadImg = res.data.file
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
    conSubmit() {
      this.$dialog.confirm({
        title: '',
        message: '确认收款吗',
        confirmButtonColor: '#000000',
        cancelButtonColor: '#999999'
      })
        .then(() => {
          this.$post({
            module: 'Good',
            interface: '1105',
            data: {
              id: this.info.id
            }
          }).then(res => {
            // console.log(res)
            this.$toast(res.message)
            this.$router.back()
          })
        })
        .catch(() => {
          // on cancel
        });
    },
    submit() {
      if(!this.uploadImg) return this.$toast('请上传支付凭证')
      this.$post({
        module: 'Good',
        interface: '1100',
        data: {
          id: this.info.id,
          img: this.uploadImg
        }
      }).then(res => {
        this.$toast(res.message)
        this.$router.back()
        // console.log(res)
      })
    }
  },
  components: {},
};
</script>

<style scoped lang="less">
.outside {
  padding: 10px;
}
.box {
  margin-top: 16px;
  padding: 10px;
  background: #1b1b1b;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  position: relative;
  .label {
    font-size: 15px;
    font-weight: 400;
    color: #ffffff;
  }
  .labelTop {
    margin-top: 20px;
  }
  .type_img {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 90px;
    height: 90px;
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
      color: #FFFFFF;
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
    color: #FFFFFF;
    img {
      width: 24px;
      height: 24px;
      margin-right: 6px;
    }
  }
  .pay-cell {
    // margin-top: 22px;
    margin-bottom: 14px;
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
  margin-top: 46px;
  .van-button {
    height: 38px;
    line-height: 38px;
    border-radius: 4px 4px 4px 4px;
  }
}
</style>