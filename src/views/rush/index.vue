<template>
  <div class="container" style="background-color: ">
    <Header title="挂卖"></Header>
    <van-overlay class="overlay" :show="show" />
    <div class="box" v-if="tips != '待开放'">
      <van-notice-bar
        left-icon="volume-o"
        color="#0bbc74"
        font-size="13px"
        text="请仔细阅读《商城挂卖付款协议》"
      />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="暂无更多场次"
        @load="onLoad"
        :immediate-check="false"
      >
       <!-- :style="`background-image: url(${item.background})`"  -->
        <div v-for="(item,index) in list" :style="`background-image: url(${item.background})`" :key="index" class="box_image" @click="toGoods(item.id, item.name)">
          <div class="time">
          {{ item.beginTime }} - <span>{{ item.endTime }}</span> 
          </div>
          <!-- <div class="desc" v-html="item.desc">
            {{ item.desc }}
          </div> -->
          <!-- <div class="name">
            {{ item.name }}
          </div> -->
          <img :src="item.backgroud" alt="">
        </div>
      </van-list>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      show: false,
      readType: '',
      tips: '开放了',
      bond: 1,
      list: [],
      loading: false,
      finished: false,
      lastId: 0,
      page: 1,
      userInfo: {}
    };
  },
  created() {
    // 首先判断是否开放
    if(this.tips == '待开放') {
      this.show = true
      this.$dialog({
        title: '',
        confirmButtonColor:'#000000',
        message: '待开放',
      })
        .then(() => {
          this.show = false
          this.$router.replace('/')
        })
    } else {
      this.getUserInfo()
      this.payDeposit()
    }
    
  },
  mounted() {
  },
  methods: {
    getUserInfo() {
      this.$post({
        module: 'Payment',
        interface: '7000',
        data: {
        }
      }).then(res => {
        this.userInfo = res.data
        console.log(res,'信息')
      })
    },
    toGoods(id,title) {
      this.$post({
        module: 'Nft',
        interface: '1001',
        data: {
          sceneId: id
        }
      }).then(() => {
        this.$router.replace({
          path: '/rush/good',
          query: {
            id,
            title
          }
        })
      })
    },
    payDeposit(){
      this.$post({
        module: 'User',
        interface: '1000',
        data: {
        }
      }).then((res) => {
        this.bond = res.data.isEnsure
        // this.bond = 0
        // console.log(res,'是否缴纳保证金')
        this.getreadType()
      })
    },

    getreadType() {
      // 未缴纳保证金
      if(this.bond == 0) {
        this.show = true
        // 缴纳保证金
        this.toPage('/rush/bond','请缴纳保证金')
      } else {
        // 未阅读品类协议
        if(!localStorage.getItem('MINGZI_XIEYI')) {
          this.show = true
          this.toPage('/rush/qualification', '本页面需要阅读协议')
        } else if(!localStorage.getItem('GUIFAN_XIEYI')) {
          this.show = true
          // 未阅读规范协议
          this.toPage('/rush/standard', '本页面需要阅读协议')
        } else if(!localStorage.getItem('USER_NAMESIGN')) {
          this.show = true
          // 签字
          this.toPage('/rush/sign','请前往签字确认')
        } else {
          // 查看是否添加过 收款 收货 信息
          this.$post({
            module: 'Payment',
            interface: '7000',
            data: {
            }
          }).then(res => {
            this.userInfo = res.data
            console.log(res,'信息')
            if(!this.userInfo.isAddress) {
              this.toPage('/self/myAddress', '请先添加收货地址')
            } else if (!this.userInfo.isWechat) {
              this.toPage('/self/wx','请先添加微信收款信息')
            } else if (!this.userInfo.isAli) {
              this.toPage('/self/zfb','请先添加支付宝收款信息')
            } else if (!this.userInfo.isBank) {
              this.toPage('/self/addBank','请先添加银行卡收款信息')
            } else {
              this.onLoad()
            }
          })
        }
      }
    },
    toPage(url, title) {
       // 未添加收款地址
        this.$dialog.confirm({
          title: '',
          confirmButtonColor:'#000000',
          cancelButtonColor:'#999999',
          message: title,
        })
        .then(() => {
          this.show = false
          this.$router.push(url)
        })
        .catch(() => {
          this.show = false
          this.$router.replace('/')
        });
    },
    onLoad() {
      this.$post({
        module: 'Nft',
        interface: '1000',
        data: {
          lastId: this.lastId,
          page: this.page
        }
      }).then(res => {
        this.loading = false
        this.lastId = res.data.lastId
        this.page ++
        this.list.push(...res.data.list)
        if(this.page > res.data.lastPage) {
          this.finished = true
        }
        console.log(res,'抢购场次')
      })
    },
  },
  components: {},
  pass: true,
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
  background-color: #333333;

  .overlay {
    background-color: rgba(0,0,0,0.7);
  }
  .box {
    width: 100%;
    padding: 10px 15px;
    // background-color: #333333;
    // height: 100vh;
    /deep/.van-notice-bar__content {
      color: #999999;
    }
    .van-notice-bar {
      border-radius: 5px;
      background-color: #1B1B1B;
      // border: 1px solid #000000;
    }
    .box_image {
      // width: 100%;
      height: 163px;
      margin-top: 10px;
      background-size: 100% 100%;
      padding: 14px;
      background-image: url(../../assets/img/rush/shangwu.png);
      background-size: 100% 100%;
      .time {
        color: #000000;
        font-size: 14px;
        display: inline-block;
        min-width: 100px;
        padding: 3px 0 0 20px;
        // border-bottom: 1px solid #000;
        span {
          color: #1e36cf;
        }
      }
      .name {
        padding-top: 10px;
        font-size: 20px;
        width: 70%;
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
      }
      // img {
      //   width: 100%;
      //   height: 100%;
      // }
    }
  }
  /deep/ .van-dialog {
    height: 115px !important;
  }
}
</style>