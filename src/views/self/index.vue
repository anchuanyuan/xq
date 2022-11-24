<template>
  <div class="center">
    <div class="top">
      <div class="info flex-between">
        <div class="infoLeft flex-row">
          <img class="avatar" :src="userInfo.avatar" alt="" />
          <div class="nickname">{{ userInfo.nickname }}</div>
        </div>
        <img class="she_zhi" @click="$router.push('/self/set')" src="@/assets/img/self/she_zhi.png" alt="" />
      </div>

      <div class="buyer">
        <div class="buyerTitle">买方</div>
        <div class="buyerMenu flex-between">
          <router-link
            to="/self/warehouse?type=1"
            class="buyerMenuItem flex-center"
          >
            <img src="@/assets/img/self/wo_de_cang_ku1.png" alt="" />
            <p>我的仓库</p>
          </router-link>
          <router-link
            to="/self/warehouse?type=1&active=3"
            class="buyerMenuItem flex-center"
          >
            <img src="@/assets/img/self/que_ren_fu_kuan1.png" alt="" />
            <p>确认付款</p>
          </router-link>
          <router-link
            to="/self/warehouse?type=1&active=5"
            class="buyerMenuItem flex-center"
          >
            <img src="@/assets/img/self/que_ren_shou_kuan1.png" alt="" />
            <p>确认收款</p>
          </router-link>
          <router-link
            to="/self/warehouse?type=1&active=7"
            class="buyerMenuItem flex-center"
          >
            <img src="@/assets/img/self/yi_wan_cheng1.png" alt="" />
            <p>已完成</p>
          </router-link>
        </div>
      </div>
    </div>

    <div class="seller">
      <div class="sellerTitle">卖方</div>
      <div class="sellerMenu flex-between">
        <router-link
          to="/self/warehouse/order?type=-1"
          class="sellerMenuItem flex-center"
        >
          <img src="@/assets/img/self/wo_de_cang_ku1.png" alt="" />
          <p>我的仓库</p>
        </router-link>
        <router-link
          to="/self/warehouse/order?type=-1&active=3"
          class="sellerMenuItem flex-center"
        >
          <img src="@/assets/img/self/que_ren_fu_kuan1.png" alt="" />
          <p>确认付款</p>
        </router-link>
        <router-link
          to="/self/warehouse/order?type=-1&active=5"
          class="sellerMenuItem flex-center"
        >
          <img src="@/assets/img/self/que_ren_shou_kuan1.png" alt="" />
          <p>确认收款</p>
        </router-link>
        <router-link
          to="/self/warehouse/order?type=-1&active=7"
          class="sellerMenuItem flex-center"
        >
          <img src="@/assets/img/self/yi_wan_cheng1.png" alt="" />
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
export default {
  data() {
    return {
      userInfo:{},
      myList: [],
      menu: [
        {
          id: 0,
          title: "我的商品",
          image: require("@/assets/img/self/wo_de_shang_pin.png"),
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
          image: require("@/assets/img/self/wo_de_di_zhi.png"),
          url: "/self/myAddress",
        },
        {
          id: 3,
          title: "我的优惠劵",
          image: require("@/assets/img/self/you_hui_quan.png"),
          url: "/self/coupon",
        },
        {
          id: 4,
          title: "我的邀请",
          image: require("@/assets/img/self/er_wei_ma.png"),
          url: "/self/inviteCode",
        },
      ],
      menu2: [
        {
          id: 0,
          title: "趣币中心",
          image: require("@/assets/img/self/ji_fen_zhong_xin.png"),
          url: "/self/integral",
        },
        {
          id: 1,
          title: "收款管理",
          image: require("@/assets/img/self/shou_kuan_guan_li.png"),
          url: "/self/moneyindex",
        },
        {
          id: 2,
          title: "我的收益",
          image: require("@/assets/img/self/wo_de_shou_yi.png"),
          url: "/self/income",
        },
        {
          id: 4,
          title: "联系客服",
          image: require("@/assets/img/self/kefu.png"),
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
    getUserInfo() {
      this.$post({
        module: 'User',
        interface: '1000'
      }).then(res => {
        // console.log(res,'个人信息')
        this.userInfo = res.data
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
          this.$post({
            module: 'Account',
            interface: '2000',
          }).then(res => {
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
  // background-image: url("~@/assets/img/self/selfTop1.png");
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  padding-top: 47px;
  position: relative;
  .info {
    padding: 0 31px 0 15px;
    .infoLeft {
      .avatar {
        width: 70px;
        height: 70px;
        background: #d8d8d8;
        border: 2px solid rgba(255, 255, 255, 0.4784);
        border-radius: 50%;
      }
      .nickname {
        font-size: 18px;
        font-family: SimHei;
        font-weight: 400;
        color: #ffffff;
        padding-left: 11px;
      }
    }
    .she_zhi {
      width: 22px;
      height: 22px;
    }
  }
  .buyer {
    width: 345px;
    height: 115px;
    background: #1B1B1B;
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
          color: #999999;
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
        color: #999999;
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
        color: #999999;
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
  color: #00FF95;
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