<template>
  <div class="container">
    <Header isback title="转赠记录"></Header>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="暂无更多数据"
        @load="onLoad"
    >
      <div class="list">
        <van-cell center :border="true" v-for=" (item,index) in list" :key="index" :label="item.createdAt" :title="item.remark">
          <template>
            <div :class="{ 'negative' : item < 0 }"> {{ item.num }} </div>
          </template>
        </van-cell>
      </div>
    </van-list>
  </div>
</template>

<script type="text/ecmascript-6">
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
      this.$post({
        module: 'Finance',
        interface: '1001',
        data: {
          lastId:this.lastId,
          page: this.page,
          condition:{
            creditType:"credit_2",
            direction:'',
            type:'0',
            financeType:'7'
          },

        }
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
  .list {
    padding: 12px 8px 0;
    border-radius: 4px 4px 4px 4px;
    .van-cell {
      background-color: #1b1b1b;
    }
    .van-cell__title {
      font-size: 16px;
      color: #ffffff;
    }
    .van-cell__value {
      font-size: 18px;
      color: #999999;
    }
    .negative {
      color: #bea84f;
    }
  }
}
</style>
<template>
  <div class="container">
    <Header isback title="兑换记录"></Header>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="暂无更多数据"
        @load="onLoad"
    >
      <div class="list">
        <van-cell center :border="true" v-for=" (item,index) in list" :key="index" :label="item.createdAt" :title="item.remark">
          <template>
            <div :class="{ 'negative' : item < 0 }"> {{ item.num }} </div>
          </template>
        </van-cell>
      </div>
    </van-list>
  </div>
</template>

<script type="text/ecmascript-6">
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
      this.$post({
        module: 'Finance',
        interface: '1001',
        data: {
          lastId:this.lastId,
          page: this.page,
          condition:{
            creditType:"credit_2",
            direction:'',
            type:'0',
            financeType:'7'
          },

        }
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
  .list {
    padding: 12px 8px 0;
    border-radius: 4px 4px 4px 4px;
    .van-cell {
      background-color: #1b1b1b;
    }
    .van-cell__title {
      font-size: 16px;
      color: #ffffff;
    }
    .van-cell__value {
      font-size: 18px;
      color: #999999;
    }
    .negative {
      color: #bea84f;
    }
  }
}
</style>
