<template>
  <div class="container">
    <Header isback title="我的粉丝"></Header>
    <div class="box" style="background-color: #000000; height: 100%">
      <div class="my_points flex-between">
        <div>
          <span>{{ Invite.recommendToDayNumber }}</span>
          <p>今日邀请</p>
        </div>
        <div class="line"></div>
        <div>
          <span>{{ Invite.recommendNumber }}</span>
          <p>历史邀请</p>
        </div>
      </div>
    </div>
    <van-tabs
        type="card"
        background="#000000"
        color="#bda84f"
        title-active-color="#ffffff"
        title-inactive-color="#999"
        border
    >
      <van-tab title="一级粉丝">
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
                :title="item.account"
                :label="item.createdAt"
            >
              <template #default>
                <p>带来收益</p>
                <span>10000趣币</span>
              </template>
              <template #icon>
                <img
                    class="user_img"
                    :src="item.avatar"
                    alt=""
                />
              </template>
            </van-cell>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="二级粉丝">
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
                :title="item.account"
                :label="item.createdAt"
            >
              <template #default>
                <p>带来收益</p>
                <span>10000趣币</span>
              </template>
              <template #icon>
                <img
                    class="user_img"
                    :src="item.avatar"
                    alt=""
                    round
                />
              </template>
            </van-cell>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import {myfan} from "@/api/qucoin";

export default {
  data() {
    return {
      list: [],
      tabList:[ '一级粉丝'],
      active: 0,
      loading: false,
      finished: false,
      fansList:[],
      lastId: 0,
      page: 1,
      Invite:[]
    };
  },
  methods: {
    tabChange(index) {
      this.active = index
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //获取粉丝列表
      myfan({
        data: {
          userId:'',
          lastId:this.lastId,
          page: this.page,
        }
      }).then(res => {
        this.loading = false
        console.log(res,'粉丝列表')
        this.fansList = res.data
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
    getInvite() {
      this.$post({
        module: 'User',
        interface: '4100',
        data: {
        }
      }).then(res => {
        console.log(res,'邀请团队信息')
        this.Invite = res.data.userInfo
        if (res.data.isPopUp) {
          this.show = true
        }
      })
    },
  },

  created() {
    this.getInvite()
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  .box {
    padding: 16px 8px;
    background-color: #ffffff;
  }
  .my_tabs {
    width: 100%;
    height: 30px;
    background: #1b1b1b;
    padding: 4px;
    margin-top: 10px;
    color: #ffffff;
    > div {
      width: 180px;
      height: 100%;
      font-size: 12px;
    }
    .select {
      border-radius: 4px 4px 4px 4px;
      background: linear-gradient(180deg, #b29c3f 0%, #bea84f 100%);
    }
  }
  .my_points {
    height: 113px;
    background: linear-gradient(180deg, #b29c3f 0%, #bea84f 100%);
    color: #ffffff;
    border-radius: 8px 8px 8px 8px;
    > div {
      width: 100%;
      text-align: center;
      > p {
        padding-top: 10px;
      }
      span {
        font-size: 30px;
      }
    }
    .line {
      width: 0px;
      height: 46px;
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
    /deep/ .van-cell::after {
      border: none;
    }
    .van-cell--center {
      border-bottom: 1px solid #f1f1f1;
    }
    .van-cell__title {
      color: #ffffff;
    }
    /deep/ .user_img {
      width: 40px;
      height: 40px;
      border-radius: 50% !important;
      margin-right: 10px;
    }
  }
}
</style>
<template>
  <div class="container">
    <Header isback title="我的粉丝"></Header>
    <div class="box" style="background-color: #000000; height: 100%">
      <div class="my_points flex-between">
        <div>
          <span>{{ Invite.recommendToDayNumber }}</span>
          <p>今日邀请</p>
        </div>
        <div class="line"></div>
        <div>
          <span>{{ Invite.recommendNumber }}</span>
          <p>历史邀请</p>
        </div>
      </div>
    </div>
    <van-tabs
        type="card"
        background="#000000"
        color="#bda84f"
        title-active-color="#ffffff"
        title-inactive-color="#999"
        border
    >
      <van-tab title="一级粉丝">
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
                :title="item.account"
                :label="item.createdAt"
            >
              <template #default>
                <p>带来收益</p>
                <span>10000趣币</span>
              </template>
              <template #icon>
                <img
                    class="user_img"
                    :src="item.avatar"
                    alt=""
                />
              </template>
            </van-cell>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="二级粉丝">
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
                :title="item.account"
                :label="item.createdAt"
            >
              <template #default>
                <p>带来收益</p>
                <span>10000趣币</span>
              </template>
              <template #icon>
                <img
                    class="user_img"
                    :src="item.avatar"
                    alt=""
                    round
                />
              </template>
            </van-cell>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script type="text/ecmascript-6">
import {myfan} from "@/api/qucoin"
export default {
  data() {
    return {
      list: [],
      tabList:[ '一级粉丝'],
      active: 0,
      loading: false,
      finished: false,
      fansList:[],
      lastId: 0,
      page: 1,
      Invite:[]
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
        module: 'User',
        interface: '4101',
        data: {
          userId:'',
          lastId:this.lastId,
          page: this.page,
        }
      }).then(res => {
        this.loading = false
        console.log(res,'粉丝列表')
        this.fansList = res.data
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
    getInvite() {
      this.$post({
        module: 'User',
        interface: '4100',
        data: {
        }
      }).then(res => {
        console.log(res,'邀请团队信息')
        this.Invite = res.data.userInfo
        if (res.data.isPopUp) {
          this.show = true
        }
      })
    },
  },

  created() {
    this.getInvite()
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  .box {
    padding: 16px 8px;
    background-color: #ffffff;
  }
  .my_tabs {
    width: 100%;
    height: 30px;
    background: #1b1b1b;
    padding: 4px;
    margin-top: 10px;
    color: #ffffff;
    > div {
      width: 180px;
      height: 100%;
      font-size: 12px;
    }
    .select {
      border-radius: 4px 4px 4px 4px;
      background: linear-gradient(180deg, #b29c3f 0%, #bea84f 100%);
    }
  }
  .my_points {
    height: 113px;
    background: linear-gradient(180deg, #b29c3f 0%, #bea84f 100%);
    color: #ffffff;
    border-radius: 8px 8px 8px 8px;
    > div {
      width: 100%;
      text-align: center;
      > p {
        padding-top: 10px;
      }
      span {
        font-size: 30px;
      }
    }
    .line {
      width: 0px;
      height: 46px;
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
    /deep/ .van-cell::after {
      border: none;
    }
    .van-cell--center {
      border-bottom: 1px solid #f1f1f1;
    }
    .van-cell__title {
      color: #ffffff;
    }
    /deep/ .user_img {
      width: 40px;
      height: 40px;
      border-radius: 50% !important;
      margin-right: 10px;
    }
  }
}
</style>
