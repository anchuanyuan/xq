<template>
  <div class="container">
    <Header isback title="确定订单"></Header>
    <div class="box">
      <div class="order_info">
        <!-- 地址 -->
        <div class="address">
          <div class="address1">
            <div class="user_Info">{{ address.name }} {{ address.mobile }}</div>
            <div class="user_adress">
              {{ address.areaName }}
            </div>
            <p>{{ address.address }}</p>
          </div>

          <!-- <img src="../../picture/组 1325.png" alt="" class="img"> -->
        </div>
        <div class="order_num">
          订单编号：{{ info.serialNo }}
        </div>

        <van-card :title="info.goodName" :thumb="info.goodCover">
          <template #desc>
            <div class="card_num">
              <p>库存： {{ info.surplus }}</p>
            </div>
          </template>
          <template #tags>
            <div class="card_num">
              <p class="perice">￥{{ info.price }}</p>
              <p>x{{ info.num }}</p>
            </div>
          </template>
        </van-card>
      </div>
    </div>
    <div class="footer_btn">
      <p>合计: <span>￥{{ info.amount }}</span></p>
      <div v-if="orderId">
        <span class="cancel" @click="cancelOrder">取消订单</span>
        <van-button class="btnBuy" type="default" :disabled="payDisabled" @click="onPay">支付</van-button>
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
      orderId: '',
      value: 1,
      payDisabled: false,
      type: false
    };
  },
  created() {
    if (this.$route.query.orderId) {
      this.orderId = this.$route.query.orderId
    }
    this.getOrderDetails()
    this.getAddress()
  },
  methods: {
    getOrderDetails() {
      this.$post({
        module: 'Good',
        interface: '1020',
        data: {
          id: this.orderId
        }
      }).then(res => {
        // console.log(res)
        this.info = res.data
      })
    },
    getAddress() {
      this.$post({
        module: 'Address',
        interface: '3000',
        data: {
        }
      }).then(res => {
        this.address = res.data.address
      })
    },
    onPay() {
      this.$router.push('/home/pay?id=' + this.info.id)
    },
    cancelOrder() {
      this.$dialog.confirm({
        title: '',
        message: '确认取消订单吗？',
        confirmButtonColor: '#000000',
        cancelButtonColor: '#999999'
      })
        .then(() => {
          // on confirm
          this.$post({
            module: 'Good',
            interface: '1021',
            data: {
              id: this.info.id
            }
          }).then(res => {
            // console.log(res)
            this.$toast(res.message)
            this.$router.back()
          })
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
  // height: 100vh;
  background-color: #121212;

  .box {
    width: 100%;
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
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        color: #FFFFFF;

        .address1 {
          line-height: 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .user_Info {
          font-size: 16px;
          // color: #FFFFFF;
          font-weight: bold;
        }

        .user_adress {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #FFFFFF;
        }

        .img {
          width: 20px;
          height: 20px;

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
          color: #1E1E1E;

          img {
            width: 20px;
            height: 20px;
          }
        }
      }

      .order_num {
        height: 44px;
        line-height: 44px;
        color: #999999;
        border-bottom: 1px solid #333333;
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
      // padding-top: 15px;
      // line-height: 25px;

      .perice {
        padding-top: 5px;
        color: #F6D692;
      }
    }

    .card_num:nth-child(2) {
      padding-top: 15px;

    }

    .addNum {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: #161616;
      font-size: 14px;

      .van-stepper {
        margin-left: 15px;
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
        color: #F6D692;
      }
    }

    .cancel {
      margin-right: 10px;
      color: #999999;
    }

    .btnBuy {
      width: 102px;
      height: 32px;
      //background-color: #0BBC74;
      background: linear-gradient(180deg, #F2D38E 0%, #B19A3C 100%);
      border-radius: 4px 4px 4px 4px;
      //border: 1px solid #0BBC74;
      color: #FFFFFF;
      margin-left: 10px;
    }
  }
}
</style>
