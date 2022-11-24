<template>
  <div class="container">
    <Header isback title="确定订单"></Header>

    <div class="box">
      <div class="order_info">
        <!-- 暂无地址 -->
        <div class="address_none" @click="$router.push('/self/myAddress')" v-if="!address.name">
          <div class="user_adress">
            请选择收货地址
            <img src="../../assets/img/home/youjiantou.png" alt="">
          </div>
        </div>
        <!-- 地址 -->
        <div class="address" v-else @click="$router.push('/self/myAddress')">
          <div class="user_Info">{{ address.name }} {{ address.mobile }}</div>
          <div class="user_adress">
            {{ address.areaName }}
            <img src="../../picture/组 1325.png" alt="">
          </div>
          <p>{{ address.address }}</p>
        </div>
        <!-- <div class="order_num" v-if="orderId">
          订单编号：H22071225621546
        </div> -->

        <van-card :title="info.name" :thumb="info.cover">
          <template #desc>
            <div class="card_num">
              <p>库存： {{ info.surplus }}</p>
              <p class="perice" v-if="!orderId">￥{{ info.price }}</p>
            </div>
          </template>
          <template #tags>
            <div class="card_num" v-if="!orderId">
              <p>编号：{{ info.orderNo }}</p>
            </div>
            <div class="card_num" v-else>
              <p class="perice">￥{{ $math.multiply($math.bignumber(info.price), $math.bignumber(value)) }}</p>
              <p>x{{ value }}</p>
            </div>
          </template>
          <template #footer>
            <div class="addNum" v-if="!orderId">
              购买数量:
              <van-stepper button-size="20" v-model="value" />
            </div>
          </template>
        </van-card>
      </div>
    </div>
    <div class="footer_btn">
      <p>合计: <span>￥{{ $math.multiply($math.bignumber(info.price), $math.bignumber(value)) }}</span></p>
      <div v-if="orderId">
        <span class="cancel" @click="cancelOrder">取消订单</span>
        <van-button class="btnBuy" type="default" :disabled="payDisabled" @click="onPay">支付</van-button>
      </div>
      <div v-else>
        <van-button class="btnBuy" type="default" :disabled="conDisabled" @click="submit">确认订单</van-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      info: '',
      address: '',
      value: 1,
      orderId: '',  // 为了更好地维护  此判断作废，订单跳转了新页面
      conDisabled: false,
      payDisabled: false,
      type: false
    };
  },
  created() {
    this.info = JSON.parse(localStorage.getItem('GOODS_INFO'))
    if (!this.info) {
      this.$toast('创建失败,请重试')
      setTimeout(() => {
        this.$router.back()
      }, 600)
    }
    // console.log(this.info);
    if (this.$route.query.type) {
      // 购物车过来的
      this.value = this.info.num
    }
    this.getAddress()
  },
  methods: {
    getAddress() {
      this.$post({
        module: 'Address',
        interface: '3000',
        data: {
        }
      }).then(res => {
        // console.log(res,'默认收货地址')
        this.address = res.data.address
      })
    },
    addCart() {
      this.$toast('虚拟添加成功')
    },
    submit() {
      if (!this.address.name) return this.$toast('请先选择收货地址')
      this.conDisabled = true
      this.$post({
        module: 'Good',
        interface: '1015',
        data: {
          id: this.$route.query.type ? this.info.goodId : this.info.id,
          num: this.value,
          addressId: this.address.id
        }
      }).then(res => {
        this.conDisabled = false
        // console.log(res,'添加订单详情')
        this.$router.replace('/home/orderPay?orderId=' + res.data.orderId + '&num=' + this.value)
      }).catch(() => {
        this.conDisabled = false
      })
      // this.type = true
    },
    onPay() {
      this.$router.push('/home/orderPay')
    },
    cancelOrder() {
      this.$dialog.confirm({
        title: '',
        message: '确认取消订单吗？',
        confirmButtonColor: '#000000',
        cancelButtonColor: '#999999'
      })
        .then(() => {
          this.orderId = ''
        })
        .catch(() => {
          // on cancel
        });
    }
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  background-color: #121212;

  .box {
    width: 100%;
    height: 100%;
    padding: 16px 8px;

    .order_info {
      width: 100%;
      min-height: 258px;
      background: #1B1B1B;
      border-radius: 4px 4px 4px 4px;
      padding: 12px 8px;

      .address {
        width: 100%;
        min-height: 110px;
        border-bottom: 1px solid #333333;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        color: #ffffff;

        .user_Info {
          font-size: 16px;
          // color: #FFFFFF;
          font-weight: bold;
        }

        .user_adress {
          display: flex;
          align-items: center;
          justify-content: space-between;

          // color: #FFFffF;
          img {
            width: 20px;
            height: 20px;
          }
        }
      }

      .address_none {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #DEDEDE;

        .user_adress {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          // color: #FFFFFF;
          img {
            width: 20px;
            height: 20px;
          }
        }
      }

      .order_num {
        height: 44px;
        line-height: 44px;
        color: #1E1E1E;
        border-bottom: 1px solid #DEDEDE;
      }
    }
  }

  .van-card {
    padding-left: 0;
    background-color: #1B1B1B;
    color: #FFFFFF;

    .card_num {
      display: flex;
      align-items: center;
      justify-content: space-between;

      // padding-top: 5px;
      .perice {
        color: #0BBC74;
      }
    }

    .card_num:nth-child(2) {
      margin-top: 20px;
    }

    .card_num:nth-child(2),
    .card_num:nth-child(3) {
      line-height: 25px;
    }

    .addNum {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: #999999;
      font-size: 14px;

      .van-stepper {
        margin-left: 15px;
      }

      /deep/.van-stepper input {
        background-color: #1B1B1B;
        color: #ffffff;
      }

      /deep/.van-stepper__minus {
        background-color: #333333;
        color: #ffffff;
      }

      /deep/.van-stepper__plus {
        background-color: #333333;
        color: #ffffff;
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
    color: #999999;

    p {
      span {
        color: #0BBC74;
      }
    }

    .cancel {
      margin-right: 10px;
    }

    .btnBuy {
      width: 102px;
      height: 32px;
      background-color: #0BBC74;
      border-radius: 4px 4px 4px 4px;
      border: 1px solid #0BBC74;
      color: #FFFFFF;
      margin-left: 10px;
    }
  }
}
</style>
