<template>
  <div class="" style="background-color: #000000; height: 100vh;">
    <Header class="" title="我的藏品" rightText="挂卖记录" righturl="/self/listingRecord" isback />
    <div class="outside">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-grid :column-num="3">
          <van-grid-item
            v-for="(item, index) in list"
            :key="index"
            @click="toPage(item)"
          >
          <!-- collectSell -->
            <img
              :src="item.cover"
              class="img"
            />
            <!-- <div class="end" v-if="index == 2">-待收藏-</div> -->
          </van-grid-item>
        </van-grid>
      </van-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      lastId: 0,
      page: 1
    };
  },
  methods: {
    toPage(item) {
      localStorage.setItem('COLLECTION_INFO', JSON.stringify(item))
      this.$router.push(`/self/market?`)
    },
    onLoad() {
      this.$post({
        module: 'Good',
        interface: '1055',
        data: {
          lastId: this.lastId,
          page: this.page
        }
      }).then(res => {
        // console.log(res,'我的藏品')
        this.loading = false
        this.lastId = res.data.lastId
        this.page ++ 
        this.list.push(...res.data.list)
        if(this.page > res.data.lastPage) {
          this.finished = true
        }

      })
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
.van-hairline--top::after {
  border: none;
}
.outside {
  padding: 10px 15px;
  ::v-deep .van-grid-item__content {
    width: 110px;
    height: 125px;
    background: #E5E5E5;
    border-radius: 5px;
    margin-top: 10px;
    padding: 0;
  }
}
.img {
  width: 100%;
}
.end {
  width: 100%;
  height: 100%;
  background: rgba(#000000, 0.4);
  border-radius: 4px;
  font-size: 13px;
  font-family: SimHei;
  font-weight: 400;
  color: #ffffff;
  line-height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
}
</style>