<template>
  <div class="container">
    <Header isback title="抢购详情"></Header>
    <div class="top_img">
      <van-swipe class="my-swipe" height="300" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in info.robGoodImg" :key="index">
          <img :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
      <!-- <img :src="info.nftImg" alt=""> -->
    </div>
    <div class="good_info">
      <div class="name">{{ info.robGoodName }}</div>
      <p class="text">{{ info.siteName }}</p>
      <div class="detail">
        <p class="flex-between">
          <span>编号：{{ info.robGoodCode }}</span>
          <!-- <span>所属人：{{ info.username }}</span> -->
        </p>
        <p>价格： <span class="red">￥{{ parseInt(Number(info.price)) }}</span></p>
        <p>商品详情</p>
        <p class="info_details" v-html="info.nftDesc"></p>
      </div>
    </div>
    <div class="footer_btn">
      <!-- <van-button class="btnCard" v-if="info.isBuy == 1" type="default" :disabled="!type" @click="falseSubmit">{{ type ? '立即抢购' : '已售罄'}}</van-button> -->
      <van-button class="btnCard" type="default" :disabled="disabled" @click="submit">立即抢购
      </van-button>
<!--      <van-button class="btnBuy" v-else type="default">即将抢购：-->
<!--        <van-count-down @finish="finishDown" :time="info.time * 1000" />-->
<!--      </van-button>-->
<!--      v-if="this.isBuy == 1"-->
    </div>
    <van-dialog v-model="show" title=" " confirm-button-color="#000">
      <img class="false_img" src="../../assets/img/rush/shouqin.png" />
    </van-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import {getByid, getById, inFolist,getBylist} from "@/api/rush/page"
export default {
  data() {
    return {
      //场次ID
      robGoodId: '',
      //下标
      index:'',
      //商品id
      robSellId:'',
      //页数
      size:'',
      info: '',
      isBuy:'',
      disabled: false,
      type: true,
      show: false
    };
  },
  //创建后生命周期  接收商品列表的跳转传参
  created() {
    // if (this.$route.query.id) {
    //商品id
      this.robGoodId = this.$route.query.robGoodId
      console.log(this.robGoodId,'场次id')
    //场次ID
      this.robSellId = this.$route.query.robSellId
      console.log(this.robSellId,'商品ID')
    //页数
    this.size = this.$route.query.size
    console.log(this.size,'页数')
    //下标
    this.index = this.$route.query.index
    console.log(this.index,'下标')
    // }
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


    //抢购商品详情渲染数据接口
    getInfo() {
      // this.$post({
      //   module: 'Nft',
      //   interface: '1025',
      //   data: {
      //     id: this.id
      //   }
      // })
      inFolist({
        robGoodId: this.robGoodId,  //场次ID
        index: this.index,  //下标
        robSellId: this.robSellId,  //商品ID
        size:this.size  //页数
      }).then(res => {
        console.log(res,'抢购商品')
        this.info = res.data
        // console.log(this.info)
      })
    },


    //点击立即购买
    submit() {
    //   // this.disabled = true
    //   // this.$post({
    //   //   module: 'Nft',
    //   //   interface: '1030',
    //   //   data: {
    //   //     id: this.info.id
    //   //   }
    //   // })
    //   inFolist({
    //     id: this.info.robGoodId
    //   }).then(res => {
    //     //弹出框
    //     this.$toast(res.message)
    //     // this.$router.back()
    //     console.log(res,'抢购商品详情')
    //   })
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
          color: #F6D692;
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
      //background: #0BBC74;
      background: linear-gradient(180deg, #CEB968 0%, #AD9737 100%);
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
