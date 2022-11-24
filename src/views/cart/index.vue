<template>
  <div class="" style="background-color: #000000; height: 100vh;">
    <van-nav-bar
      style="position: fixed;width: 100%;"
      title="购物车"
      :right-text="deleted ? '取消' : '编辑'"
      @click-right="deleted = !deleted"
    />
    <!-- 空数据 -->
    <van-empty
      v-show="false"
      :image="require('../../assets/img/cart/noData.png')"
      description="没有数据"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
        <van-radio-group v-model="radio">
          <div class="goodsBoxList">
            <div class="goodsOutBox" v-for="(item, index) in list" :key="index">
              <div class="goodsBox">
                <div class="redio">
                  <div>
                    <van-radio @click="changeRadio(item)" checked-color="#0BBC74"  icon-size="15px" :name="item.id"></van-radio>
                  </div>
                </div>
                <div class="goodsImg">
                  <img :src="item.goodCover" alt="" />
                </div>
                <div class="goodsInfo">
                  <div class="title">
                    {{ item.goodName }}
                  </div>
                  <div class="flex-between inventory">
                    <!-- <div>库存：{{ item.surplus }}</div> -->
                    <!-- <div>X{{ item.num }}</div> -->
                  </div>
                  <div class="flex-between price">
                    <div><small>￥</small> {{ item.price }}</div>
                    <!-- <div><van-stepper disable-input async-change @plus="changeNum(item.num)" @minus="changeNum(item.num)" v-model="item.num" /></div> -->
                  </div>
                </div>
              </div>
              <transition name="van-fade">
                <div class="del" v-show="deleted" @click="delCartGoods(item.id)">
                  <van-icon name="delete" size="18" color="#FFFFFF" />
                </div>
              </transition>
            </div>
          </div>
        </van-radio-group>
      </van-list>
    <!-- 底部提交栏 -->
    <div class="SubmitBar">
      <div class="total">
        合计: <span class="price"> <small>￥</small> {{ $math.multiply($math.bignumber(allPrice), $math.bignumber(num)) }}</span>
      </div>
      <div class="btn">
        <button @click="submit">提交订单</button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      radio: '',
      value: 1,
      allPrice: 0,
      deleted: false,
      list: [],
      loading: false,
      finished: false,
      lastId: 0,
      page: 1,
      num: 1,
      info:{}
    };
  },
  methods: {
    submit() {
      if(!this.radio) return this.$toast('请至少选择一件商品')
      this.$post({
        module: 'Good',
        interface: '1050',
        data: {
          id: this.radio,
          num: this.num
        }
      }).then(() => {
        // console.log(res)
        this.info.cover = this.info.goodCover
        this.info.name = this.info.goodName
        localStorage.setItem('GOODS_INFO', JSON.stringify(this.info))
        this.$router.push('/home/order?type=cart')
      })
    },
    changeRadio(item) {
      this.allPrice = item.price
      this.num = item.num
      this.info = item
    },
    changeNum() {
      this.radio = ''
      this.allPrice = 0
      // this.num = num
    },
    onLoad() {
      this.$post({
        module: 'Good',
        interface: '1035',
        data: {
          lastId: this.lastId,
          page: this.page
        }
      }).then(res => {
        // console.log(res)
        this.loading = false
        this.lastId = res.data.lastId
        this.page ++
        this.list.push(...res.data.list)
        if(this.page > res.data.lastPage) {
          this.finished = true
        }
      })
    },
    getStart() {
      this.finished = false
      this.loading = false
      this.lastId = 0
      this.page = 1
      this.list = []
    },
    delCartGoods(id) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否将该商品从购物车中移除",
          className: "custom-class",
        })
        .then(() => {
          // on confirm
          this.$post({
            module: 'Good',
            interface: '1040',
            data: {
              ids: [id]
            }
          }).then(res => {
            this.$toast(res.message)
            this.getStart()
            // console.log(res)
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

.van-nav-bar__content{
  position: fixed!important;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    height: 1.22667rem;
    width: 100%;
    z-index: 9999;
    background-color: #1B1B1B;
}

  .van-nav-bar {
    background: #1b1b1b;
  }
  ::v-deep .van-nav-bar__title {
    color: #ffffff;
  }
  [class*=van-hairline]::after {
    border: none;
  }
::v-deep .van-nav-bar__right {
  .van-nav-bar__text {
    font-size: 14px;
    font-weight: 400;
    color: #999999;
  }
}
::v-deep .van-empty__image {
  margin-top: 100px;
  width: 164px !important;
  height: 100px !important;
}
.SubmitBar {
  position: fixed;
  bottom: 50px;
  padding: 0 10px;
  width: 100%;
  height: 50px;
  background: #1b1b1b;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // margin-bottom: 5px;

  .total {
    font-size: 14px;
    font-weight: bold;
    color: #ffffff;
    .price {
      color: #0BBC74;
      font-size: 18px;
    }
  }

  .btn {
    button {
      width: 95px;
      height: 30px;
      border: none;
      background: linear-gradient(180deg, #0B955D 0%, #18A66C 100%);
      // background: #fc3d42;
      border-radius: 15px;
      font-size: 15px;
      font-weight: 400;
      color: #ffffff;
      line-height: 30px;
    }
  }
}
.goodsBoxList {
  padding: 20px 16px;

  .goodsOutBox {
    margin-top: 10px;
    padding: 14px 9px;
    background: #1b1b1b;
    // border: 1px solid #000000;
    border-radius: 5px;
    .goodsBox {
      display: flex;
      align-items: center;
      .radio {
        width: 15px;
      }

      .goodsImg {
        margin-left: 8px;
        width: 106px;
        height: 106px;
        background: #e5e5e5;
        border-radius: 4px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .goodsInfo {
        margin-left: 16px;
        width: 181px;
        .title {
          font-size: 13px;
          font-family: SimHei;
          font-weight: 400;
          color: #ffffff;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .inventory {
          margin-top: 10px;
          height: 12px;
          font-size: 12px;
          font-family: SimHei;
          font-weight: 400;
          color: #999999;
          line-height: 78px;
        }
        .price {
          margin-top: 16px;
          height: 13px;
          font-size: 18px;
          font-family: SimHei;
          font-weight: 400;
          color: #0BBC74;
          small {
            font-size: 12px;
          }
          .van-stepper {
            width: 76px;
            height: 21px;
            background: #f4f1e8;
            border: 1px solid #cdcdcd;
            border-radius: 2px;
          }
          ::v-deep .van-stepper__plus {
            height: 20px;
            width: 23px;
            background: transparent;
          }
          ::v-deep .van-stepper__plus::after {
            color: #666666;
          }
          ::v-deep .van-stepper__plus::before {
            color: #666666;
          }
          ::v-deep .van-stepper__minus::before {
            color: #666666;
          }
          ::v-deep .van-stepper__minus {
            height: 20px;
            width: 23px;
            background: transparent;
          }
          ::v-deep .van-stepper__input {
            height: 20px;
            width: 23px;
            border-radius: 2px;
            background: transparent;
          }
        }
      }
    }
    .del {
      margin-top: 5px;
      width: 22px;
      height: 22px;
      background: #ff1d1d;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>