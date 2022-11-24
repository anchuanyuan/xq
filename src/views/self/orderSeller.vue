<template>
  <div class="">
    <Header class="" title="卖方详情" isback />
    <div class="outside">
      <div class="box" style="padding-bottom: 1px;">
        <div class="pay-cell flex-row">
          <div class="title">订单号：</div>
          <div class="title">29284829101223</div>
        </div>
        <div class="pay-cell flex-row">
          <div class="data">购买数量：</div>
          <div class="data">1</div>
        </div>
        <div class="pay-cell flex-row">
          <div class="data">创建订单时间：</div>
          <div class="data">2020-02-01  12:23</div>
        </div>
        <img class="type_img" :src="typeImg[type]" alt="">
      </div>
      <div class="box">
        <div class="label">卖方信息</div>
        <div class="goods-box">
          <div class="goods-img">
            <img src="@/assets/img/home/gouzi.png" alt="" />
          </div>
          <div class="goods-info">
            <div class="title">
              橘个例子i
            </div>
            <div class="order-no">
              联系方式：1922943102
            </div>
          </div>
        </div>
        <div class="label labelTop">买方信息</div>
        <div class="goods-box">
          <div class="goods-img">
            <img src="@/assets/img/home/gouzi.png" alt="" />
          </div>
          <div class="goods-info">
            <div class="title">
              橘个例子i
            </div>
            <div class="order-no">
              联系方式：1922943102
            </div>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="label">上传支付凭证</div>
        <div class="upload flex-center">
          <van-uploader
            :after-read="afterRead"
            v-model="fileList"
            multiple
            disabled
            :deletable="false"
            :max-count="1"
            preview-size="100px"
          >
          <img class="upload_img" src="../../assets/img/home/upload.png" alt="">
          </van-uploader>
        </div>
      </div>
      <div class="btn">
        <van-button block v-if="type == 0" color="#13CEC0">确认收款</van-button>
        <van-button block v-else color="#13CEC0">确认</van-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      type: 0,
      typeImg: [
        require('../../assets/img/self/daiqueren1.png'),
        require('../../assets/img/self/yiwancheng.png'),
      ],
      fileList: [
        { url: require('../../assets/img/home/banner.png') }
      ],
    };
  },
  methods: {
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
    submit() {
      
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
  background: #ffffff;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  position: relative;
  .label {
    font-size: 15px;
    font-weight: 400;
    color: #333333;
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
    border-radius: 4px 4px 4px 4px;
  }
}
</style>