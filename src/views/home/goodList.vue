<template>
  <div class="container">
    <Header isback title="商品列表" />
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="good_list">
          <div class="good_list_item" @click="$router.push('/home/details?id=' + item.id)" v-for="(item,index) in list" :key="index">
              <img :src="item.cover" alt="">
              <p class="name">{{ item.name }}</p>
              <p class="perice">￥ {{ parseInt(Number(item.price)) }} </p>
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
      id:'',
      loading: false,
      lastId: 0,
      page: 1,
      finished: false,
    };
  },
  methods: {
    onLoad() {
      this.$post({
        module: 'Good',
        interface: '1005',
        data: {
          lastId: this.lastId,
          page: this.page,
          seriesId: this.id
        }
      }).then(res => {
        this.loading = false
        // console.log(res,'数据列表')
        this.page ++
        this.lastId = res.data.lastId
        this.list.push(...res.data.list)
        if(this.page > res.data.lastPage) {
          this.finished = true
        }
      })
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        this.finished = true;
      }, 1000);
    },
  },
  created() {
    if(this.$route.query.id) {
      this.id = this.$route.query.id
    }
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
}
</style>
