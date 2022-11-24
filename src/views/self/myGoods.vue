<template>
  <div class="container" style="background-color: #000000;">
    <Header title="我的商品" isback ></Header>
    <div class="box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有数据了~"
        @load="onLoad"
      >
        <div class="box_item" v-for="(item,index) in list" :key="index">
            <p class="top_text flex-between">
              <span>订单信息</span>
              <span class="red_text">已购买</span>
            </p>
            <div class="box_content flex-row">
              <ul>
                <li>订单编号：{{ item.orderNo }}</li>
                <li>商品名称：{{ item.good.goodName }}</li>
                <li>商品编号：{{ item.good.goodCode }}</li>
                <li>商品金额：{{ parseInt(Number(item.value)) }}</li>
              </ul>
              <img :src="item.good.goodsMasterImage" alt="">
            </div>
          </div>
      </van-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      active: 1,
      list: [],
      loading: false,
      finished: false,
      lastId: 0,
      page: 1
    };
  },
  methods: {
    onLoad() {
      this.$post({
        module: 'IntegralGood',
        interface: '1000',
        data: {
          lastId: this.lastId,
          page: this.page
        }
      }).then(res => {
        this.loading = false
        console.log(res,'商品列表')
        this.page++
        this.lastId = res.data.lastId
        this.list.push(...res.data.list)
        if (this.page > res.data.lastPage) {
          this.finished = true
        }
      })
      // setTimeout(() => {
      //   // 加载状态结束
      //   this.loading = false;
      //   this.finished = true;
      // }, 1000);
    },
  },
  created() {
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  .box {
    width: 100%;
    padding: 14px;
    .box_item {
      width: 100%;
      min-height: 130px;
      padding: 8px 16px;
      background-color: #1b1b1b;
      border-radius: 4px 4px 4px 4px;
      margin-bottom: 8px;
      .top_text {
        font-size: 16px;
        color: #ffffff;
        .red_text {
          font-size: 12px;
          color: #0BBC74;
        }
      }
      .box_content {
        display: flex;
        justify-content: space-between;
        img {
          width: 60px;
          height: 60px;
        }
        ul {
          padding-top: 10px;
          li {
            font-size: 12px;
            color: #999999;
            padding-top: 4px;
          }
        }
      }
    }
  }
}
</style>
