<template>
  <div style="background-color: #000000; height: 100vh;">
    <Header isback title="我的优惠劵" />
    <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="暂无优惠劵"
        v-if="couponList.length == 0"
      />
      <div v-if="couponList.length > 0">
        <div class="coupon-box" v-for="(item,index) in couponList" :key="index">
          <div class="box1">
            <!-- 亮 -->
            <img src="@/assets/img/self/mingguding2.png" alt="" class="left-top" v-if="item.status == 0 && item.coupons && item.coupons.type == 'fixed'">
            <img src="@/assets/img/self/mingzhekou1.png" alt="" class="left-top" v-if="item.status == 0 && item.coupons && item.coupons.type == 'percent'">
            <!-- 暗 -->
            <img src="@/assets/img/self/anguding1.png" alt="" class="left-top" v-if="item.status == 1 && item.coupons && item.coupons.type == 'fixed'">
            <img src="@/assets/img/self/anzhekou1.png" alt="" class="left-top" v-if="item.status == 1 && item.coupons && item.coupons.type == 'percent'">
            <div class="text">
              <div class="name">{{ item.name }}</div>
            </div>
            <div class="number">
                {{ item.faceValue }}  
            </div>
            <div class="text">
              <!-- <div class="name">{{ item.name }}</div> -->
              <div class="time">领取日期：{{ item.dateText }}</div>
              <!-- <div class="time">有效期止：{{ item.updatedAt }}</div> -->
            </div>
          </div>
          <div class="box2">
            <div class="line"></div>
            <div class="state" v-if="item.status == 0">立即使用</div>
            <div class="state"  v-else style="color: #999999">已使用</div>
          </div>
        </div>
      </div> 
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      couponList:[{}],
      page: 1,
      lastId: 0,
      type:''
    };
  },
  mounted(){
    this.getCouponList()
  },
  methods: {
    change() {
      this.lastId = 0
      this.page = 1
      this.getCouponList()
    },
    getCouponList(){
      this.$post({
      module: 'Coupons',
      interface: '1000',
      data: {
        lastId: this.lastId,
        page: this.page,
      }
    }).then(res => {
      this.lastId = res.data.lastId
      this.couponList = res.data.list
      console.log(JSON.stringify(res.data));
    })
    }
  },
  created() {
    this.$store.state.isLoadding = true
    setTimeout(() => {
      this.$store.state.isLoadding = false
    }, 1000)
  },
  components: {},
};
</script>

<style scoped lang="less">
.custom-image {
  margin-top: 80px;
}
.custom-image .van-empty__image {
  width: 90px;
  height: 90px;
}
.coupon-box{
  position: relative;
  width: 92%;
  height: 112px;
  background: rgba(130, 130, 130, 0.36);
  border-radius: 4px;
  margin: 16px auto 0;
  position: relative;
  // flex-direction: column;
  padding: 0 70px;
  // display: flex;
  // align-items: center;
  // justify-content: space-evenly;
  .box1 {
    flex-direction: column;
      .left-top{
      position: absolute;
      top: 0;
      left: 0;
    }
    .number{
      width: 72px;
      height: 60px;
      line-height:60px;
      text-align: center;
      font-size: 40px;
      color: #F6D692;
    }
    .number-nor{
      color: #999999;
    }
    .text{
      .name{
        color: #ffffff;
        height: 28px;
        line-height: 28px;
        padding-top: 5px;
      }
      .time{
        height: 17px;
        line-height: 17px;
        color: #999999;
        font-size: 12px;
      }
    }
  }
  .box2 {
    position: absolute;
    top: 15px;
    left: 265px;
    display: flex;
    .line{
      height: 82px;
      border-left: 1px dashed #999999;
    }
    .state{
      margin: 5px 20px;
      width: 35px;
      height: 71px;
      background: #1B1B1B;
      color: #F6D692;
      font-size: 15px;
      writing-mode: vertical-lr;
      text-align:  center;
      display:flex;
      -webkit-display:flex;
      flex-direction:column; 
      justify-content:center;
    }
  }
  
}

</style>