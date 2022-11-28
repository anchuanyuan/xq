<template>
  <div class="container" style="background-color: #000000; height: 100vh;">
    <Header isback title="趣币中心"></Header>
    <div class="box">
      <div class="in_info">
        <div class="info_top flex-between">
          <span>可用趣币</span>
          <div class="flex-center">趣币说明
            <img src="../../../assets/img/self/wenhao.png" alt="">
          </div>
        </div>
        <div class="info_num" >
          {{ walletlist.creditValue}}
        </div>
        <div class="info_footer flex-center flex-between">
          <div>
            <span>{{ walletlist.count}}</span>
            <p>累计总获得</p>
          </div>
          <div>
            <span>{{ walletlist.day}}</span>
            <p>今日获得</p>
          </div>
          <div>
            <span>{{ walletlist.weeks}}</span>
            <p>近7日获得</p>
          </div>
        </div>
      </div>
      <van-cell-group>
        <van-cell center :to="item.url" :title="item.title" v-for="(item, index) in list" :key="index" is-link style="color:#ffffff">
          <template #icon>
            <img :src="item.img" alt="">
          </template>
        </van-cell>
      </van-cell-group>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
import {qucondetail} from "@/api/qucoin"
export default {
  data() {
    return {
      exShow: false,
      number: 0,
      walletlist:[],
      lastId: 0,
      page: 1,
      list: [
        {
          title: '我的趣币',
          img: require('../../../assets/img/self/wodejifen1.png'),
          url: '/self/integral/myPoints'
        },
        {
          title: '转赠记录',
          img: require('../../../assets/img/self/duihuanjilu1.png'),
          url: '/self/integral/changeRecord'

        },
        {
          title: '我的粉丝',
          img: require('../../../assets/img/self/wodefensi1.png'),
          url: '/self/integral/myFans'
        },
        {
          title: '粉丝订单',
          img: require('../../../assets/img/self/fensidingdan1.png')
        }
      ]
    };
  },
  methods: {
    sumbit() {
      this.exShow = false
    },
    //获得趣币详细
    getwalletList() {
      qucondetail({
      }).then(res => {
        console.log(res,'趣币信息')
        this.walletlist = res.data
      })
    },
  },
  created() {
    this.getwalletList()
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  .jifen {
    width: 20px;
    height: 20px;
    margin: 5px;
  }
  .box {
    padding: 10px;
    .in_info {
      width: 100%;
      height: 171px;
      padding: 15px;
      color: #FFFFFF;
      font-size: 14px;
      background: linear-gradient(180deg, #BEA84F 0%, #BCA64C 100%);
      border-radius: 4px 4px 4px 4px;
      .info_top {
        img {
          width: 20px;
          height: 20px;
          margin-left: 5px;
        }
      }
      .info_num {
        height: 62%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 35px;
      }
      .info_footer {
        >div {
          text-align: center;
          p {
            padding-top: 5px;
            color: #000000;
          }
        }
      }
    }
    .van-cell-group {
      background-color: transparent;
      .van-cell {
        padding-left: 0;
        padding-right: 0;
        background-color: transparent;
        border-bottom: 1px solid #333333;
        img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      }
    }
  }
  /deep/ .van-cell::after {
    border: none;
  }
  /deep/ [class*=van-hairline]::after {
    border: none;
  }
  .ex_show {
      padding: 20px 24px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      background-color: #1B1B1B;
      .title {
        text-align: center;
        font-size: 16px;
        color: #ffffff;
      }
      .ex_num {
        img {
          width: 20px;
          height: 20px;
        }
        >p {
          color: #0BBC74;
        }
      }
      /deep/.van-field {
        padding: 0;
        background-color: #1B1B1B;
        .van-field__body {
          width: 100px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #757575;
          padding-left: 5px;
        }
        .van-field__control {
          color: #0BBC74;
        }
        .van-field__label {
          width: 70px;
          color: #ffffff;
        }
      }
      >p {
        font-size: 14px;
        color: #B1B1B1;
      }
      .exBtn {
        .van-button {
          width: 82px;
          height: 30px;
          border: 1px solid #0BBC74;
        }
        .exCancel {
          background-color: #1B1B1B;
          color: #0BBC74;
        }
        .exConfirm {
          background-color: #0BBC74;
          color: #FFFFFF;
        }
      }
    }
}
</style>
