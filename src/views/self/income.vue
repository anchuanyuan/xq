<template>
  <div class="container" style="background-color: #000000; height: 100vh;">
    <Header class="" title="我的收益" isback />
    <div class="outside" style="background: #1b1b1b">
      <div class="income-box">
        <div>
          <div class="income-num"><small>￥</small>{{allIncome}}</div>
          <!-- <div class="income-label">今日邀请</div> -->
          <div class="income-label">累计收益</div>
        </div>
        <div>|</div>
        <div>
          <div class="income-num"><small>￥</small>{{dayIncome}}</div>
          <!-- <div class="income-label">历史邀请</div> -->
          <div class="income-label">今日收益</div>
        </div>
      </div>
      <div class="label">收益明细</div>
    </div>
    
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="暂无更多数据"
      @load="onLoad"
    >
      <div class="list">
        <van-cell center :border="true" v-for="(item,index) in list" :key="index" :label="dayjs(item.createDate).format('YYYY-MM-DD HH:mm:ss') " title="趣币获得"  >
          <template>
            <div :class="{ 'negative' : item < 0 }"> {{ item.afterNum }}</div>
          </template>
        </van-cell>
      </div>
    </van-list>
  </div>
</template>

<script type="text/ecmascript-6">
import {getDayInCome, getInComeAll, inComeList} from "@/api/my/income";
import dayjs from "dayjs"

export default {
  data() {
    return {
      dayjs,
      list: [],
      dayIncome: '',
      allIncome: '',
      active: 0,
      loading: false,
      finished: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      /*this.$post({
        module: 'Finance',
        interface: '9090',
        data: {
          lastId:this.lastId,
          page: this.page,
          condition:{
            creditType:"credit_2",
            direction:'',
            type:'0'
          },
        }
      })*/
      inComeList(this.queryParams).then(res => {
        this.loading = false
        console.log(res,'直推收益列表')
        this.queryParams.pageNum ++
        this.list.push(...res.rows)
        if (this.queryParams.pageSize * this.queryParams.pageNum >= res.total) {
          this.finished = true
        }
      })
      // setTimeout(() => {
      //   // 加载状态结束
      //   this.loading = false;
      //   this.finished = true;
      // }, 1000);

    },
    getInCome () {
      getDayInCome().then( res =>{
        this.dayIncome  = res.data
      })
      getInComeAll().then(res=>{
        this.allIncome = res.data
      })
    }
  },
  created() {
    this.getInCome()
  },
  components: {},
};
</script>

<style scoped lang="less">

.list {
    padding: 12px 8px 0;
    border-radius: 4px 4px 4px 4px;
    .van-cell  {
      background-color: #1B1B1B!important;
    }
    .van-cell__value {
      font-size: 18px;
      color: #F6D692;
    }
    .van-cell__title {
      font-size: 16px;
      color: #ffffff;
    }
    .van-cell__label {
      color: #7B7B7B;
      font-size: 12px;
    }
    .negative {
      color: #999999;
    }
  }
.outside {
  padding: 10px 15px;
  .income-box {
    padding: 30px;
    background: linear-gradient(to right,#AF993A,#CEB965,#AF993A);
    //background: linear-gradient(180deg, #0B955D 0%, #18A66C 100%);
    border-radius: 10px;
    // background: url("../../assets/img/self/income.png") no-repeat;
    // background-size: 100% 100%;
    .flex-around();
    text-align: center;
    color: #ffffff;

    .income-num {
      font-size: 28px;
      font-family: SimHei;
      font-weight: 400;
      small {
        font-size: 12px;
      }
    }
    .income-label {
      margin-top: 10px;
      font-size: 12px;
    }
  }
  .label {
    margin-top: 15px;
    font-size: 15px;
    font-weight: 400;
    color: #ffffff;
    line-height: 17px;
  }
}
.details {
  padding: 17px 15px 10px;
  background: #ffffff;
  margin: 10px;
  border-radius: 6px;
  background-color: #1b1b1b;
  // border-bottom: 1px solid #eee;
  .flex-between {
    justify-content: space-between;
    align-items: flex-end;
    .flex-row {
      .avatar {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        font-size: 15px;
        font-weight: 400;
        color: #ffffff;
        line-height: 17px;
      }
    }
    .earnings {
      font-size: 12px;
      font-family: SimHei;
      font-weight: 400;
      color: #999999;
      line-height: 17px;
    }
    .price {
      font-size: 22px;

      font-family: SimHei;
      font-weight: 400;
      color: #0BBC74;
      line-height: 17px;
      small {
        font-size: 15px;
      }
    }
    .order {
      margin-top: 10px;
      font-size: 13px;
      font-family: SimHei;
      font-weight: 400;
      color: #999999;
      line-height: 17px;
    }
  }
  
}
</style>