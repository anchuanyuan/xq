<template>
  <div>
    <Header title="藏品交易" isback rightText="出售" righturl="/self/collectSell"></Header>
    <div class="top">
      <div class="info flex-center">
        <img class="market_img" :src="info.cover" alt="" />
      </div>
    </div>
    <div class="title">在售列表</div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="mar_list">
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
        <div class="box" v-for="(item,index) in list" :key="index">
          <div class="box_top flex-between">
            <p class="flex-center">
              <img :src="item.goodCover" alt="">
              {{ item.goodName }}
            </p>
            <span>{{ item.timeDesc }}</span>
          </div>
          <div class="box_footer flex-between">
            <span class="text">出售价格</span>
            <span>{{ item.price }}</span>
            <van-button @click="submit(item.id)">购买</van-button>
          </div>
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
      lastId: 0,
      page: 1,
      info: {}
    }
  },
  created() {
    if(localStorage.getItem('COLLECTION_INFO')) {
      this.info = JSON.parse(localStorage.getItem('COLLECTION_INFO'))
    } else {
      this.$toast('数据出错，请重新加载')
      this.$router.back()
    }
  },
  methods: {
    submit(id) {
      this.$post({
        module: 'Good',
        interface: '1075',
        data: {
          id
        }
      }).then(res => {
        this.$toast(res.message)
        this.getInfo()
      })
    },
    getInfo() {
      this.list = []
      this.page = 1
      this.lastId = 0
      this.loading = false
      this.finished = false
    },
    onLoad() {
      this.$post({
        module: 'Good',
        interface: '1070',
        data: {
          lastId: this.lastId,
          page: this.page
        }
      }).then(res => {
        // console.log(res);
        this.loading = false
        this.page ++
        this.lastId = res.data.lastId
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
/deep/.app-header-placeholder {
  background-color: transparent;
  .app-header-vue {
    position: relative !important;
    background-color: transparent;
  }
}
.top {
  width: 100%;
  height: 230px;
  background-image: url("../../assets/img/home/markBg1.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: -40px;
  background-color: #FFFFFF;
  .info {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    .market_img {
      width: 120px;
      height: 140px;
    }
  }
}
.title {
  height: 42px;
  padding: 0 14px;
  line-height: 42px;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
  background-color: #1b1b1b;
}
.mar_list {
  padding: 10px 14px;
  .box {
    width: 100%;
    height: 96px;
    background: #1b1b1b;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 2px 4px 1px rgba(0,0,0,0.1);
    margin-bottom: 10px;
    .box_top {
      p{
        color: #FFFFFF;
        img {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          margin-right: 5px;
        }
      
      }
      span {
        color: #999999;
        font-size: 12px;
      }
    }
    .box_footer {
      .text {
        color: #999999;
      }
      .van-button {
        width: 60px;
        height: 25px;
        background: #0BBC74 ;
        font-size: 12px;
        line-height: 25px;
        border-radius: 13px 13px 13px 13px;
        color: #FFFFFF;
      }
    }
  }
}
</style>