<template>
  <div class="container">
    <Header isback title="商品详情"></Header>
    <div class="top_img">
      <van-swipe class="my-swipe" height="300" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in info.goodsImage" :key="index">
            <img :src="info.goodsMasterImage" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="good_info">
      <div class="topbox">
        <p><span>{{ parseInt(Number(info.goodPrice))  }} 趣币</span></p>
        <div class="name">{{ info.goodName }}</div>
      </div>
      <!-- <p class="text">{{ info.seriesName }}</p> -->
      <div class="detail">
        <div class="box1">
          <p>编号：{{ info.goodCode }}</p>
          <p>剩余数量： {{ info.goodStock }}</p>
        </div>
        <p style="margin-top:10px">上架时间：{{ dayjs(info.createDate).format('YYYY-MM-DD HH:mm:ss') }} </p>
      </div>
      <div class="detail">
        <div class="">
          <p style="color: #ffffff">商品详情</p>
          <div class="box1">
            {{info.goodDescribe }}
          </div>
        </div>
      </div>
      <div class="text-box">
        <p>--- 详情图 ---</p>
        <div>
          <img :src="info.goodImg" style="width:100%" alt="">
        </div>
      </div>
    </div>
    <div class="footer_btn">
      <!-- <img src="../../picture/组 1315.png" @click="$router.push('/cart')" alt=""> -->
      <div>
        <!-- <van-button class="btnCard" type="default" @click="addCart">添加购物车</van-button> -->
        <van-button class="btnBuy" type="default" @click="submit">立即兑换</van-button>
        <!-- 立即兑换 -->
            <!-- 
              title 标题
              message 文本内容，支持通过\n换行
              confirmButtonText 确认 按钮文案
              confirmButtonColor 确认 按钮颜色
              confirm 确认按钮 函数
              cancel 取消按钮函数
            -->
            <van-dialog v-model="goodsShow" message="确认兑换商品吗？" :showCancelButton="true" confirmButtonText="确认" cancelButtonText="取消" @confirm="takeSubmit()" @cancel="takeCancel()"></van-dialog>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {exchangeGoods, goodDetail} from "@/api/home/goods";
import dayjs from "dayjs";
export default {
  data() {
    return {
      info: {},
      goodsShow:false,
      goodId:'',
      goodImgs: [],
      dayjs
    }
  },
  created() {
    if(this.$route.query.goodId) {
      this.goodId = this.$route.query.goodId
      this.getData()
      // this.takeSubmit()
    }
  },
  methods: {
    getData() {
      /*this.$post({
        module: 'IntegralGood',
        interface: '1300',
        data: {
          id: this.id
        }
      })*/
    goodDetail(this.goodId).then(res => {
        // console.log(res,'商品详情')
        this.info = res.data
        this.goodImgs = res.data.goodImgs ?  res.data.goodImgs.split(",") : []
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
    // 提取货物弹窗 确认
    takeSubmit(){
      /*this.$post({
        module: 'IntegralGood',
        interface: '1200',
        data: {
          goodId: this.id
        }
      })*/
      exchangeGoods({
        goodId: Number(this.goodId),
        num: 1
      }).then(res => {
        if(res.data.code !== 200 ) {
          this.$toast(res.data.msg)
        }
        if(res.code == 200) {
          // 关闭弹窗
          this.$toast(res.data.msg + ' ,兑换完成')
        }
        this.getData()
        this.goodsShow = false
      })
    },
    // 提取货物弹窗 取消
    takeCancel(){
      // 关闭弹窗
      this.goodsShow = false
    },
    submit() {
      localStorage.setItem('GOODS_INFO', JSON.stringify(this.info))
      // this.$router.push('/mall/order')
      this.goodsShow = true
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
    height: 288px;
    // padding-top: 20px;
    text-align: center;
    background-color: #333333;
    /deep/.my-swipe .van-swipe-item {
      height: 100%;
      color: #fff;
      font-size: 20px;
      text-align: center;
    }
    img {
      width: 100%;
      height: 100%;
      // object-fit: cover;
    }
  }
  .good_info {
    margin-top: 20px;
    .topbox {
      padding: 20px 20px;
      p {
        color: #F6D692;
        font-size: 22px;
      }
      .name {
        font-size: 18px;
        color: #FFFFFF;
        padding-top: 10px;
      }
    }
    // padding: 20px 20px;
    // .name {
    //   font-size: 20px;
    //   color: #FFFFFF;
    //   font-weight: 600;
    //   overflow:hidden;
    //   text-overflow:ellipsis;
    //   display:-webkit-box;
    //   -webkit-box-orient:vertical;
    //   -webkit-line-clamp:2;
    // }
    .text {
      font-size: 20px;
      color: #FFFFFF;
      padding-top: 10px;
      font-weight: 600;
    }
    .detail {
      margin: 15px;
      padding: 20px 20px;
      width: 92%;
      height: 110px;
      border-radius: 7px;
      background-color: #1b1b1b;
      color: #999999;
      font-size: 15px;
      .box1 {
        margin: 10px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
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
    .text-box {
      p {
        text-align: center;
        color: #999999;
        margin: 20px 0;
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
    justify-content: center;
    padding: 5px 16px 10px;
    background-color: #1B1B1B;
    // img {
    //   width: 22px;
    //   height: 22px;
    // }
    // .btnCard {
    //   min-width: 102px;
    //   height: 32px;
    //   border-radius: 4px 4px 4px 4px;
    //   // border: 1px solid #242424;
    //   background-color: #333333;
    //   color: #ffffff;
    //   border: none;
    // }
    .btnBuy {
      width: 300px;
      height: 32px;
      //background-color: #0BBC74;
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
