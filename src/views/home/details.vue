<template>
  <div class="container">
    <Header isback title="商品详情"></Header>
    <div class="top_img">
      <van-swipe class="my-swipe" height="300" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in info.img" :key="index">
          <img :src="item" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="good_info">
      <div class="name">{{ info.name }}</div>
      <p class="text">{{ info.seriesName }}</p>
      <div class="detail">
        <p>编号：{{ info.orderNo }}</p>
        <p>价格： <span>￥{{ parseInt(Number(info.price)) }}</span></p>
        <p>剩余数量： {{ info.surplus }}</p>
        <p>上架时间：{{ info.createdAt }} </p>
        <p>商品详情</p>
        <p class="good_details" v-html="info.desc"></p>
      </div>
    </div>
    <div class="footer_btn">
      <img src="../../picture/carnav.png" @click="$router.push('/cart')" alt="">
      <div>
        <van-button class="btnCard" type="default" @click="addCart">添加购物车</van-button>
        <van-button class="btnBuy" type="default" @click="submit">立即购买</van-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {goodDetail} from "@/api/home/goods";

export default {
  data() {
    return {
      goodId: '',
      info: {}
    };
  },
  created() {
    if(this.$route.query.goodId) {
      this.goodId = this.$route.query.goodId
      this.getData()
    }
  },
  methods: {
    getData() {
     /* this.$post({
        module: 'Good',
        interface: '1010',
        data: {
          id: this.id
        }
      })*/
      goodDetail(this.goodId).then(res => {
        // console.log(res,'商品详情')
        this.info = res.data
      })
    },
    addCart() {
      this.$post({
        module: 'Good',
        interface: '1030',
        data: {
          id:  this.info.id,
          num: 1
        }
      }).then(res => {
        this.$toast(res.message)
      })
      
    },
    submit() {
      localStorage.setItem('GOODS_INFO', JSON.stringify(this.info))
      this.$router.push('/home/order')
    }
  },
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
    /deep/.my-swipe .van-swipe-item {
      height: 100%;
      color: #fff;
      font-size: 20px;
      text-align: center;
    }
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
      overflow:hidden;
      text-overflow:ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:2;
    }
    .text {
      font-size: 20px;
      color: #FFFFFF;
      padding-top: 10px;
      font-weight: 600;
    }
    .detail {
      margin-top: 15px;
      >p {
        margin-bottom: 10px;
        font-size: 14px;
        color: #999999;
        span {
          color: #F6D692;
        }
      }
      /deep/.good_details {
        img {
          width: 100%;
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
    background-color: #1B1B1B;
    img {
      width: 22px;
      height: 22px;
    }
    .btnCard {
      min-width: 102px;
      height: 32px;
      border-radius: 4px 4px 4px 4px;
      // border: 1px solid #242424;
      background-color: #333333;
      color: #ffffff;
      border: none;
    }
    .btnBuy {
      
      width: 102px;
      height: 32px;
      background: linear-gradient(180deg, #CEB968 0%, #AD9737 100%);
      border-radius: 4px 4px 4px 4px;
      // border: 1px solid #EA3613;
      color: #FFFFFF;
      margin-left: 10px;
      border: none;
    }
  }
}
</style>
