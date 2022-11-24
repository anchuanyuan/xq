<template>
  <div class="container">
    <Header title="狂欢上午场" isback url="/rush"></Header>

    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="good_list">
          <div class="good_list_item" @click="$router.push('/home/details')" v-for="(item,index) in 6" :key="index">
              <img src="../../../assets/img/home/gouzi.png" alt="">
              <p class="name">村上隆 x Complex con</p>
              <p class="perice">￥ 100</p>
          </div>
        </div>
      </van-list>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
      onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        this.finished = true;
      }, 1000);
    },
  },
  created() {
    // this.$emit("update:status", false);
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  .good_list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .good_list_item {
      padding: 10px;
      width: 50%;
      height: 235px;
      text-align: center;
      border-right: 1px solid #BFBFBF;
      border-bottom: 1px solid #BFBFBF;
      img {
        // width: 100%;
        // height: 70%;
        width: 135px;
        height: 135px;
        // object-fit: cover;
      }
      .name {
        height: 45px;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        padding-top: 10px;
        font-size: 13px;
        color: #333333;
      }
      .perice {
        padding-top: 10px;
        font-size: 16px;
        color: #333333;
      }
    }
  }
  .all_title {
    margin-top: 40px;
    .all_title_top {
      >img {
        width: 24px;
        height: 24px;
      }
      >div {
        width: 80px;
        height: 27px;
        background: #F4F1E8;
        border: 1px solid #000000;
        text-align: center;
        line-height: 27px;
        margin: 0 10px;
      }
    }
    >p {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      line-height: 24px;
      padding-top: 5px;
    }
  }
}
</style>
