<template>

  <div class="center">
    <div class="top">
      <div class="info flex-between">
        <div class="infoLeft flex-row">
          <img class="avatar" :src="userInfo.avatar" alt="" />
          <div class="nickname">{{ userInfo.userName}}</div>
        </div>
        <div>
          <img class="she_zhi" @click="$router.push('/self/set')" src="@/assets/img/self/she_zhi.png" alt="" />
        </div>
      </div>

      <div class="buyer">
        <div class="buyerTitle">买方</div>
        <div class="buyerMenu flex-between">
          <router-link
            to="/self/warehouse?type=1"
            class="buyerMenuItem flex-center"
          >
            <img src="@/assets/img/self/wo_de_cang_ku3.png" alt="" />
            <p>我的仓库</p>
          </router-link>
          <router-link
            to="/self/warehouse?type=1&active=3"
            class="buyerMenuItem flex-center"
          >
            <img src="@/assets/img/self/que_ren_fu_kuan3.png" alt="" />
            <p>确认付款</p>
          </router-link>
          <router-link
            to="/self/warehouse?type=1&active=5"
            class="buyerMenuItem flex-center"
          >
            <img src="@/assets/img/self/que_ren_shou_kuan3.png" alt="" />
            <p>确认收款</p>
          </router-link>
          <router-link
            to="/self/warehouse?type=1&active=7"
            class="buyerMenuItem flex-center"
          >
            <img src="@/assets/img/self/yi_wan_cheng3.png" alt="" />
            <p>已完成</p>
          </router-link>
        </div>
      </div>
    </div>

    <div class="seller">
      <div class="sellerTitle">卖方</div>
      <div class="sellerMenu flex-between">
<!--      买方type状态为1 ，卖方状态为-1-->
        <router-link
          to="/self/warehouse/order?type=-1"
          class="sellerMenuItem flex-center"
        >
          <img src="@/assets/img/self/wo_de_cang_ku2.png" alt="" />
          <p>我的仓库</p>
        </router-link>
        <router-link
          to="/self/warehouse/order?type=-1&active=3"
          class="sellerMenuItem flex-center"
        >
          <img src="@/assets/img/self/que_ren_fu_kuan2.png" alt="" />
          <p>确认付款</p>
        </router-link>
        <router-link
          to="/self/warehouse/order?type=-1&active=5"
          class="sellerMenuItem flex-center"
        >
          <img src="@/assets/img/self/que_ren_shou_kuan2.png" alt="" />
          <p>确认收款</p>
        </router-link>
        <router-link
          to="/self/warehouse/order?type=-1&active=7"
          class="sellerMenuItem flex-center"
        >
          <img src="@/assets/img/self/yi_wan_cheng2.png" alt="" />
          <p>已完成</p>
        </router-link>
      </div>
    </div>

    <!-- <div class="collectionBox">
      <div class="collectionTitle flex-between" @click="$router.push('/self/collection')">
        <p>我的藏品</p>
        <img class="more" src="@/assets/img/self/more1.png" alt="" />
      </div>
      <div class="collection">
        <div class="collectionItem" v-for="(item, index) in myList" :key="index">
          <img :src="item.cover" alt="" />
        </div>
      </div>
    </div> -->

    <div class="menu">
      <div
        class="menuItem flex-between"
        v-for="item in menu"
        :key="item.id"
        @click="onMenuItem(item)"
      >
        <div class="menuItemLeft flex-row">
          <img :src="item.image" alt="" />
          <p>{{ item.title }}</p>
        </div>
        <img class="more" src="@/assets/img/self/more1.png" alt="" />
      </div>
    </div>

    <div class="menu">
      <div
        class="menuItem flex-between"
        v-for="item in menu2"
        :key="item.id"
        @click="onMenuItem(item)"
      >
        <div class="menuItemLeft flex-row">
          <img :src="item.image" alt="" />
          <p>{{ item.title }}</p>
        </div>
        <img class="more" src="@/assets/img/self/more1.png" alt="" />
      </div>
    </div>

    <button class="exit" @click="loginOut">退出登录</button>
  </div>
</template>

<script type="text/ecmascript-6">
import {getuser,exitlogin} from "@/api/login";

export default {
  data() {
    return {
      userInfo:{},
      myList: [],
      menu: [
        {
          id: 0,
          title: "我的商品",
          image: require("@/assets/img/self/wo_de_shang_pin1.png"),
          url: "/self/myGoods",
        },
        // {
        //   id: 1,
        //   title: "我的藏品",
        //   image: require("@/assets/img/self/wo_de_cang_pin.png"),
        //   url: "self/collection",
        // },
        {
          id: 2,
          title: "我的地址",
          image: require("@/assets/img/self/wo_de_di_zhi1.png"),
          url: "/self/myAddress",
        },
        {
          id: 3,
          title: "我的优惠劵",
          image: require("@/assets/img/self/you_hui_quan1.png"),
          url: "/self/coupon",
        },
        {
          id: 4,
          title: "我的邀请二维码",
          image: require("@/assets/img/self/er_wei_ma1.png"),
          url: "/self/inviteCode",
        },
      ],
      menu2: [
        {
          id: 0,
          title: "趣币中心",
          image: require("@/assets/img/self/ji_fen_zhong_xin1.png"),
          url: "/self/integral",
        },
        {
          id: 1,
          title: "收款管理",
          image: require("@/assets/img/self/shou_kuan_guan_li1.png"),
          url: "/self/moneyindex",
        },
        {
          id: 2,
          title: "我的收益",
          image: require("@/assets/img/self/wo_de_shou_yi1.png"),
          url: "/self/income",
        },
        {
          id: 4,
          title: "联系客服",
          image: require("@/assets/img/self/kefu1.png"),
          url: "/self/service",
        },
      ],
    };
  },
  created() {
    this.getUserInfo()
    this.getMyGood()
  },
  methods: {
    //获取用户信息的接口
    getUserInfo() {
      getuser().then(res => {
        console.log(res,'个人信息')
        this.userInfo = res.rows
      })
    },
    onMenuItem(param) {
      if (param.url) {
        this.$router.push({
          path: param.url,
        });
      }
    },
    getMyGood() {
      this.$post({
        module: 'Good',
        interface: '1055',
        data: {
          lastId: 0,
          page: 1
        }
      }).then(res => {
        console.log(res);
        res.data.list.forEach( (item, index) => {
          if(index < 3) {
            this.myList.push(item)
          }
        });
      })
    },
    loginOut() {
      this.$dialog.confirm({
        title: '',
        message: '确认退出吗？',
        confirmButtonColor: '#000000',
        cancelButtonColor: '#999999'
      })
        .then(() => {
          //退出登录接口调用
          exitlogin(
    ).then(res => {
            // console.log(res,'退出登录')
            this.$toast(res.message)
            localStorage.removeItem('token')
            this.$router.replace('/login')
          })
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  components: {},
  pass: true,
};
</script>

<style scoped lang="less">
.center {
  width: 100%;
  background-image: url("~@/assets/img/self/selfTop1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.top {
  width: 100%;
  height: 249px;
  //background-color: #1aa8fe;
  //display: flex;
  //flex-direction: column;

  // background-image: url("~@/assets/img/self/selfTop1.png");
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  padding-top: 32px;
  position: relative;
  //.infoLeft flex-row{
  //  width: 100%;
  //  height: 100px;
  //  display: flex;
  //  flex-direction: column;
  //  align-content: center;
  //  justify-items: center;
  //  background-color: white;
  //}
  .info {
    display: flex;
    flex-direction: column;
    position: relative;
    //padding: 0 31px 0 15px;
    //position: relative;
    .infoLeft {
      display: flex;
      flex-direction: column;
      .avatar {
        width: 70px;
        height: 70px;
        background: #d8d8d8;
        //position: absolute;
        border: 2px solid rgba(255, 255, 255, 0.4784);
        border-radius: 50%;
      }
      .nickname {
        font-size: 18px;
        font-family: SimHei;
        margin-top: 6px;
        font-weight: 400;
        color: #ffffff;
        //padding-left: 0px;
      }
    }
    .she_zhi {
      position: absolute;
      right: 22px;
      top: -10px;
      width: 22px;
      height: 22px;
    }
  }
  .buyer {
    width: 345px;
    height: 115px;
    //background: #1B1B1B;
    background: linear-gradient(to bottom left, #DABE83, #AF9152);
    //background: linear-gradient(180deg, #DABE83 0%, #AF9152 100%);
    border-radius: 5px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
    .buyerTitle {
      font-size: 15px;
      font-family: SimHei;
      font-weight: 400;
      color: #FFFFFF;
      padding: 13px 0 0 15px;
    }
    .buyerMenu {
      margin-top: 21px;
      padding: 0 36px 0 24px;
      .buyerMenuItem {
        flex-direction: column;
        img {
          width: 28px;
          height: 28px;
        }
        p {
          font-size: 12px;
          font-family: SimHei;
          font-weight: 400;
          color: #fff;
          margin-top: 9px;
        }
      }
    }
  }
}
.seller {
  width: 345px;
  height: 115px;
  background: #1B1B1B;
  border-radius: 5px;
  margin: 10px auto 0;
  .sellerTitle {
    font-size: 15px;
    font-family: SimHei;
    font-weight: 400;
    color: #FFFFFF;
    padding: 13px 0 0 15px;
  }
  .sellerMenu {
    margin-top: 21px;
    padding: 0 36px 0 24px;
    .sellerMenuItem {
      flex-direction: column;
      img {
        width: 28px;
        height: 28px;
      }
      p {
        font-size: 12px;
        font-family: SimHei;
        font-weight: 400;
        color: #fff;
        margin-top: 9px;
      }
    }
  }
}
.menu {
  width: 345px;
  background: #1B1B1B ;
  border-radius: 5px;
  margin: 10px auto 0;
  // padding-bottom: 10px;
  // margin-top: 10px;
  // background-color: #ffffff;
  .menuItem {
    padding: 16px 13px 19px 15px;
    border-bottom: 1px solid #333333;
    .menuItemLeft {
      img {
        width: 16px;
        height: 16px;
      }
      p {
        font-size: 15px;
        font-family: SimHei;
        font-weight: 400;
        color: #fff;
        line-height: 17px;
        padding-left: 11px;
      }
    }
    .more {
      width: 15px;
      height: 15px;
    }
  }
  .menuItem:nth-last-of-type(1) {
    border-bottom: 0;
  }
}
.exit {
  font-size: 15px;
  font-family: SimHei;
  font-weight: 400;
  color: #F6D692;
  line-height: 17px;
  // width: 100%;
  height: 50px;
  // background: #ffffff;
  display: block;
  // margin: 10px auto 19px;
  border: none;
  width: 345px;
  background: #1B1B1B ;
  border-radius: 5px;
  margin: 10px auto 20px;
  // padding-bottom: 20px;
}
.collectionBox {
  width: 345px;
  background: #1B1B1B ;
  border-radius: 5px;
  margin: 10px auto 0;
  padding-bottom: 20px;
  .collectionTitle {
    padding: 13px 15px 0 14px;
    p {
      font-size: 15px;
      font-family: SimHei;
      font-weight: 400;
      color: #FFFFFF;
    }
    img {
      width: 15px;
      height: 15px;
    }
  }
  .collection {
    margin-top: 17px;
    padding: 0 15px 0 13px;
    display: flex;
    .collectionItem {
      width: 100px;
      margin-right: 10px;
      height: 100px;
      img {
        width: 100px;
        height: 100px;
        background: #e5e5e5;
        border-radius: 4px;
      }
    }
  }
}
</style>