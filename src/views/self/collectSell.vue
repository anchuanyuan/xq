<template>
  <div class="">
    <Header class="" title="确认出售" isback />
    <div class="outside">
      <div class="box">
        <div class="goods-box">
          <div class="goods-img">
            <img :src="info.cover" alt="" />
          </div>
          <div class="goods-info">
            <div class="title">
              {{ info.name }}
            </div>
            <div class="order-no">
              <van-field v-model="price" placeholder="请输入价格" style="background-color:#1b1b1b; color: white;" />
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
            <div>{{ bankList.allCardNo }}</div>
            <div>
              <img
                @click="copy('1')"
                src="@/assets/img/self/warehouse/copy.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="pay-cell flex-between">
          <div class="title">收款人</div>
          <div class="data">{{ bankList.owner }}</div>
        </div>
        <div class="pay-cell flex-between">
          <div class="title">银行名称</div>
          <div class="data">{{ bankList.bankName }}</div>
        </div>
        <!-- <div class="pay-cell flex-between">
          <div class="title">开户行</div>
          <div class="data">山东省 青岛市 中国银行市南分行</div>
        </div> -->
      </div>
      <div class="btn">
        <van-button block @click="submit" color="#13CEC0">确认出售</van-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      value: 1,
      price:'',
      fileList: [],
      info:{},
      bankList: {}
    };
  },
  created() {
    if(localStorage.getItem('COLLECTION_INFO')) {
      this.info = JSON.parse(localStorage.getItem('COLLECTION_INFO'))
      this.getBankInfo()
    } else {
      this.$toast('数据出错，请重新加载')
      this.$router.back()
    }
  },
  methods: {
    getBankInfo() {
      this.$post({
        module: 'Payment',
        interface: '1000',
        data: {
        }
      }).then(res => {
        // console.log(res,'银行卡列表')
        if(res.data.list.length > 0) {
          this.bankList = res.data.list[0]
        }
      })
    },
    submit() {
      if(!this.price) return this.$toast('请输入出售价格')
      this.$post({
        module: 'Good',
        interface: '1060',
        data: {
          id: this.info.id,
          price: this.price,
          time: new Date().getTime()
        }
      }).then(res => {
        this.$toast(res.message)
        this.$router.back()
        // console.log(res)
      })
    },
    onChange(value) {
      console.log(value);
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
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

.van-field__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: red;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
}

.outside {
  padding: 10px;
}
.box {
  margin-top: 16px;
  padding: 10px 10px 20px;
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
      font-weight: 600;
      color: #ffffff;
    }
    .order-no {
      margin-top: 20px;
      .van-field {
        padding: 0;
      }
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
    color: white;
    img {
      width: 24px;
      height: 24px;
      margin-right: 6px;
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
      color: white;
    }
    .data {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: white;
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
  }
}
.btn {
  // margin-top: 46px;
  position: fixed;
  bottom: 10px;
  left: 0;
  width: 100%;
  padding: 0 12px;
  height: 38px;
  .van-button {
    height: 100%;
  }
}
</style>