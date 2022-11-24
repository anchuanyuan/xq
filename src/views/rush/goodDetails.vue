<template>
  <div class="container">
    <Header isback title="抢购详情"></Header>
    <div class="top_img">
      <van-swipe class="my-swipe" height="300" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in info.nftImg" :key="index">
          <img :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
      <!-- <img :src="info.nftImg" alt=""> -->
    </div>
    <div class="good_info">
      <div class="name">{{ info.nftName }}</div>
      <p class="text">{{ info.sceneName }}</p>
      <div class="detail">
        <p class="flex-between">
          <span>编号：{{ info.orderNo }}</span>
          <!-- <span>所属人：{{ info.username }}</span> -->
        </p>
        <p>价格： <span class="red">￥{{ parseInt(Number(info.price)) }}</span></p>
        <p>商品详情</p>
        <p class="info_details" v-html="info.nftDesc"></p>
      </div>
    </div>
    <div class="footer_btn">
      <!-- <van-button class="btnCard" v-if="info.isBuy == 1" type="default" :disabled="!type" @click="falseSubmit">{{ type ? '立即抢购' : '已售罄'}}</van-button> -->
      <van-button class="btnCard" v-if="info.isBuy == 1" type="default" :disabled="disabled" @click="submit">立即抢购
      </van-button>
      <van-button class="btnBuy" v-else type="default">即将抢购：
        <van-count-down @finish="finishDown" :time="info.time * 1000" />
      </van-button>
    </div>
    <van-dialog v-model="show" title=" " confirm-button-color="#000">
      <img class="false_img" src="../../assets/img/rush/shouqin.png" />
    </van-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      id: '',
      info: '',
      disabled: false,
      type: true,
      show: false
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    this.getInfo()
  },
  methods: {
    falseSubmit() {
      this.$store.state.isLoadding = true
      setTimeout(() => {
        this.type = false
        this.show = true
        this.$store.state.isLoadding = false
      }, 1000)

    },
    finishDown() {
      this.getInfo()
    },
    getInfo() {
      this.$post({
        module: 'Nft',
        interface: '1025',
        data: {
          id: this.id
        }
      }).then(res => {
        // console.log(res,'商品详情')
        this.info = res.data
      })
    },
    submit() {
      this.disabled = true
      this.$post({
        module: 'Nft',
        interface: '1030',
        data: {
          id: this.info.id
        }
      }).then(res => {
        this.$toast(res.message)
        this.$router.back()
        // console.log(res,'购买详情')
      })
    }
  }
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  background-color: #121212;

  .top_img {
    width: 100%;
    height: 300px;
    padding-top: 20px;
    text-align: center;
    background-color: #333333;

    img {
      width: 200px;
      height: 240px;
      object-fit: cover;
    }
  }

  .good_info {
    padding: 16px 12px 50px;

    .name {
      font-size: 20px;
      color: #FFFFFF;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .text {
      font-size: 20px;
      color: #454545;
      padding-top: 10px;
      font-weight: 600;
    }

    .detail {
      margin-top: 15px;

      >p {
        margin-bottom: 10px;
        font-size: 14px;
        color: #999999;

        .red {
          color: #0BBC74;
        }
      }

      .info_details {
        /deep/ img {
          width: 100% !important;
        }
      }
    }
  }

  .footer_btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 16px 10px;
    background-color: #121212;

    img {
      width: 22px;
      height: 22px;
    }

    .btnCard {
      width: 100%;
      height: 32px;
      background: #0BBC74;
      border-radius: 4px 4px 4px 4px;
      color: #FFFFFF;
      border: none;
    }

    .btnBuy {
      width: 100%;
      height: 32px;
      background: #D2D2D2;
      border-radius: 4px 4px 4px 4px;

      .van-button__text {
        display: flex;
        align-items: center;
      }
    }
  }

  /deep/.van-dialog__content {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .false_img {
    width: 150px;
    height: 150px;
  }
}
</style>
