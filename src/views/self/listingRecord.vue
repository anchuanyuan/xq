<template>
  <div class="container" style="background-color: #000000; height: 100vh;">
    <Header title="挂卖记录" isback ></Header>
    <van-tabs background="#000000" line-width="21px" @change="change" line-height="2px" color="#0BBC74" v-model="active">
      <van-tab title="正在进行" name="1"></van-tab>
      <van-tab title="完成挂卖" name="2"></van-tab>
    </van-tabs>
    <div class="box">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="box_item" v-for="(item, index) in list" :key="index" @click="$router.push('/self/orderBuyer?id=' + item.id)">
            <p class="top_text flex-between">
              <span></span>
              <span class="red_text">{{ item.statusName }}</span>
            </p>
            <!-- <p class="top_text" v-else>已完成  已撤销</p> -->
            <div class="box_content flex-row">
              <img :src="item.goodCover" alt="">
              <ul>
                <li><span style="font-size: 15px;">{{ item.goodName }}</span><span class="perice">￥{{ item.price }}</span></li>
                <!-- <li><span>重量</span><span>10g</span></li> -->
                <!-- <li><span>数量</span><span>x1</span></li> -->
                <li><span>手续费</span><span>￥{{ item.fee }}</span></li>
              </ul>
            </div>
            <div class="box_footer">
              <p>共1件商品，合计￥ <span>{{ item.price }}</span></p>
              <van-button v-if="item.isCancel" @click.stop="Cancel(item.id)">撤销挂卖</van-button>
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
        module: 'Good',
        interface: '1090',
        data: {
          lastId: this.lastId,
          page: this.page,
          status: this.active
        }
      }).then(res => {
        console.log(res,'挂卖记录')
        this.loading = false
        this.lastId = res.data.lastId
        this.page ++
        this.list.push(...res.data.list)
        if(this.page > res.data.lastPage){
          this.finished = true
        }
      })
    },
    Cancel(id) {
      this.$dialog.confirm({
        title: '',
        confirmButtonColor:'#000000',
        cancelButtonColor:'#999999',
        message: '确认取消挂卖吗？',
      })
      .then(() => {
        this.$post({
          module: 'Good',
          interface: '1080',
          data: {
            id
          }
        }).then(res => {
          this.$toast(res.message)
          this.change()
          // console.log(res)
        })
      })
      .catch(() => {
      });
    },
    change() {
      this.loading = false
      this.finished = false
      this.lastId = 0
      this.page = 1
      this.list = []
    }

  },
  created() {
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  /deep/.van-tabs {
    height: 40px;
    .van-tabs__wrap {
      height: 100%;
    }
    .van-tab--active {
      color: #0BBC74;
    }
  }
  .box {
    width: 100%;
    padding: 14px;
    .box_item {
      width: 100%;
      min-height: 200px;
      padding: 14px;
      background-color: #1b1b1b;
      border-radius: 4px 4px 4px 4px;
      margin-bottom: 10px;
      .top_text {
        font-size: 16px;
        color: #ffffff;
        .red_text {
          font-size: 12px;
          color: #0BBC74;
        }
      }
      .box_content {
        padding: 22px 0 13px;
        border-bottom: 1px solid #333333;
        img {
          width: 88px;
          height: 88px;
        }
        ul {
          width: 100%;
          padding-left: 10px;
          li {
            display: flex;
            color: #ffffff;
            padding-top: 5px;
            justify-content: space-between;
            .perice {
              color: #0BBC74;
            }
          }
        }
      }
      .box_footer {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        p {
          padding: 10px 0;
          color: #ffffff;
          span {
            font-size: 18px;
          }
        }
        .van-button {
          border: none;
          background-color: #333333;
          width: 88px;
          height: 24px;
          font-size: 12px;
          border-radius: 13px;
          color: #999999;
        }
      }
    }
  }
}
</style>
