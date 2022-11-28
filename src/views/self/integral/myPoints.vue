<template>
  <div class="container">
    <Header isback title="我的趣币"></Header>
    <!-- <div class="my_tabs flex-row">
  <div
    :class="{ 'select' : active == index }"
    v-for="(item, index) in tabList"
    :key="index"
    @click="tabChange(index)"
  >
    {{ item }}
  </div>
</div> -->
    <van-tabs
        type="card"
        background="#000000"
        color="#bda84f"
        title-active-color="#ffffff"
        title-inactive-color="#999"
        border
    >
      <van-tab title="已结算">
        <div class="my_points flex-between">
          <div>
            <span>0</span>
            <p>总积分</p>
          </div>
          <div class="line"></div>
          <div>
            <span>0</span>
            <p>订单数</p>
          </div>
        </div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="暂无更多数据"
            @load="onLoad"
        >
          <div class="list">
            <van-cell
                center
                :border="true"
                v-for="(item, index) in list"
                :key="index"
                :label="item.createdAt"
                :title="item.remark"
            >
              <template>
                <div :class="{ negative: item < 0 }">
                  {{ item.num }}
                </div>
              </template>
            </van-cell>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="未结算">
        <div class="my_points flex-between">
          <div>
            <span>0</span>
            <p>总积分</p>
          </div>
          <div class="line"></div>
          <div>
            <span>0</span>
            <p>订单数</p>
          </div>
        </div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="暂无更多数据"
            @load="onLoad"
        >
          <div class="list">
            <van-cell
                center
                :border="true"
                v-for="(item, index) in list"
                :key="index"
                :label="item.createdAt"
                :title="item.remark"
            >
              <template>
                <div :class="{ negative: item < 0 }">
                  {{ item.num }}
                </div>
              </template>
            </van-cell>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import {mycoin} from "@/api/qucoin"
export default {
  data() {
    return {
      list: [],
      active: 0,
      loading: false,
      finished: false,
      walletlist:[],
      lastId: 0,
      page: 1,
    };
  },
  methods: {
    tabChange(index) {
      this.active = index
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //我的趣币接口
      mycoin({

      }).then(res => {
        this.loading = false
        console.log(res,'数据列表')
        this.walletlist = res.data
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
  .my_tabs {
    width: 100%;
    padding: 16px 8px;
    color: #999999;
    > div {
      width: 180px;
      height: 31px;
      text-align: center;
      line-height: 31px;
      font-size: 16px;
      font-weight: 600;
    }
    .select {
      border-radius: 4px 4px 4px 4px;
      background: linear-gradient(180deg, #0b955d 0%, #18a66c 100%);
      color: #ffffff;
    }
  }
  .my_points {
    height: 56px;
    margin-top: 10px;
    background: linear-gradient(180deg, #b29c3f 0%, #bea84f 100%);
    color: #ffffff;
    > div {
      width: 48%;
      text-align: center;
      > p {
        padding-top: 2px;
      }
    }
    .line {
      width: 0px;
      height: 24px;
      opacity: 1;
      border: 1px solid #ffffff;
    }
  }
  .list {
    padding: 12px 8px 0;
    border-radius: 4px 4px 4px 4px;
    .van-cell {
      background-color: #1b1b1b;
    }
    .van-cell__value {
      font-size: 18px;
      color: #bea84f;
    }
    .van-cell__title {
      font-size: 16px;
      color: #ffffff;
    }
    .van-cell__label {
      color: #7b7b7b;
      font-size: 12px;
    }
    .negative {
      color: #999999;
    }
  }
}
</style>
