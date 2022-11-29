<template>
<!--  狂欢场页-->
  <div class="container">
    <Header :title="title" isback url="/rush"></Header>
    <!-- <van-tabs background="#F4F1E8" line-width="21px" line-height="2px" @change="change" color="#000000" v-model="active">
      <van-tab title="字画" name="1"></van-tab>
      <van-tab title="金包玉" name="2"></van-tab>
    </van-tabs> -->
    
    <!-- <div class="price_range" v-if="periceList.length > 0">
      <div v-for="(item, index) in periceList" :key="index" :class="{ 'select' : activeIndex == (index + 1)}" @click="selectPrice(item,index)">
        <span>{{ item.begin }}</span>
        <span class="line"> - </span>
        <span>{{ item.end }}</span>
      </div>
    </div> -->

    <!-- <van-tabs line-width="125px" line-height="2px" @click="pageChange" @disabled="disabledChange" color="#000000" v-model="pageActive">
      <van-tab title="1页"  name="1"></van-tab>
      <van-tab title="2页"  name="2"></van-tab>$router.push('/rush/goodDetails?robSellId=' + item.robGoodId +'&shopSiteId='+ item.robSellId +'&size='+ page+'&index='+1)
      <van-tab title="全部" name="del" disabled></van-tab>
    </van-tabs> -->
    <div class="tabList">
      <div v-for="(item, index) in pageList" :key="index" @click="pageChange(item.page,index)" :class="{'selectDiv' : pageActive == index }">{{ item.title }}</div>
      <!-- <div @click="pageShow = false" :class="{'selectDiv' : pageActive > 10 }">刷新</div> -->
    </div>
      <div class="good_list">
        <div class="good_list_item" @click="jump(item,index)" v-for="(item,index) in list" :key="index">
            <div class="img_box">
              <div class="isSell" v-if="item.isSell == 1"><img src="../../picture/soldOut.png" alt="" class="img"></div>
              <img :src="item.robGoodImg" alt="">
            </div>
            <div class="name">{{ item.robGoodName }}</div>
            <div class="buy_box">
              <p class="perice">￥{{parseInt(Number(item.price))}}</p>
              <van-button type="default">立即抢购</van-button>
            </div>
        </div>
      </div>
    
    <!-- 分页 -->
    <van-popup v-model="pageShow" class="page_popup"  :style="{ height: '38%', width: '85%' }">
      <p>选择页数</p>
      <div class="pageNews">
        <div class="page" :class="{'pageSelect' : pageActive  == index }" v-for="(item, index) in pageNum" :key="index" @click="selectPage(item,index)">{{ item }}</div>
        <button class="fresh" @click="submit">更多</button>
      </div>
    </van-popup>

  </div>
</template>

<script type="text/ecmascript-6">
import {pagelist, getSelllist} from "@/api/rush/page"
export default {
  data() {
    return {
      active:'1',
      id: '',
      title:'',
      list: [],
      pageLists:[],
      loading: false,
      finished: false,
      pageNum: 1, //数据总量
      page: 1,
      lastId: 0,
      begin: 0,
      end: 0,
      pageActive: '',
      //这是循环的页数
      pageList: [],
      //最大页数
      pagebig:'',
      pageShow: false,
      activeIndex: '',
      periceList: [],
      gooddata:{},
      //下标
      goodindex:'',
      //元素
      gooditem:'',
      //场次ID
      robGoodId:'',
      //商品ID
      robSellId:'',
      //页数
      size:''
    };
  },
  methods: {
    //跳转需要传的参数
    //场次ID   robGoodId
    jump(item,index){
      // console.log(item,'元素')
      this.gooditem = item
      console.log(this.gooditem,'元素数')
      //场次ID
      this.robGoodId = this.gooditem.robGoodId
      //商品ID
      this.robSellId = this.gooditem.robSellId
      this.size =this.page
      // console.log(this.size,'页数')
      // console.log(index,'下标')
      this.goodindex = index
      this.$router.push('/rush/goodDetails?robGoodId=' + this.robGoodId +'&robSellId='+ this.robSellId +'&size='+ this.size+'&index='+this.goodindex)
      // console.log(this.goodindex,'下标数')
    },
    //获取页面渲染
    getDatas(){
      pagelist({
        sceneId:this.id,
      }).then(res=>{
        console.log(res,'页数')
        this.pagebig = res.data.page
        console.log(this.pagebig,'最大页数')
        for (var i=1;i<=this.pagebig;i++){   // eslint-disable-line no-unused-vars
          if (i<=this.pagebig){   //eslint-disable-line no-unused-vars
            this.pageList.push(i)
            console.log(this.pageList,'循环的页数')
          }
        }
      })
    },
    submit() {
      
    },
    // change() {
    //   this.getPriceList()
    //   this.lastId = 0
    //   this.page = 1
    //   this.list = []
    //   this.activeIndex = ''
    //   this.pageActive = ''
    //   this.begin = 0
    //   this.end = 0
    //   this.getList()
    // },
    //点击立即抢购
    // goDetails(sell) {
    //   if(sell == 1) return this.$toast('已售罄')
    //   this.$router.push('/rush/goodDetails?robSellId=' + item.robGoodId +'&shopSiteId='+ this.id)
    // },

    // getPriceList() {
    //   this.$post({
    //     module: 'Nft',
    //     interface: '1020',
    //     data: {
    //       type: this.active
    //     }
    //   }).then(res => {
    //     console.log(res)
    //     this.periceList = res.data
    //     // console.log(res,'价格区间')
    //   })
    // },
    //获取商品基本信息
    pagelists(){

    },
    //狂欢场页面渲染接口
    getList() {
      // this.$post({
      //   module: 'Nft',
      //   interface: '1015',
      //   data: {
      //     sceneId:this.id,
      //     lastId: this.lastId,
      //     page: this.page,
      //     // type: this.active,
      //     begin: this.begin,
      //     end: this.end,
      //     time: new Date().getTime()
      //   }
      // })
      //获取拍卖上架列表
      getSelllist({
        sceneId:this.id,
        lastId: this.lastId,
        page: this.page,
        type: this.active,
        begin: this.begin,
        end: this.end,
        time: new Date().getTime()
      }).then(res => {
        console.log(res,'拍卖上架列表')
        this.lastId = res.data.lastId
        this.list = res.data
        // this.list.push(this.pageLists)
        // var lists = this.list  // eslint-disable-line no-unused-vars
        // var gooddata = this.pageLists  // eslint-disable-line no-unused-vars
        // this.gooddata = this.pageLists
        // console.log(this.gooddata,'基本信息')
        // lists.push()
        // console.log(lists)
        // console.log(this.list)
        this.pageNum = res.data.lastPage
        // console.log(this.pageNum)
        if(this.pageNum < 10) this.pageNum = 8
        // console.log(res,'抢购数据')
      })
    },
    selectPrice(item, index) {
      this.activeIndex = index + 1
      this.begin = item.begin
      this.end = item.end
      this.getList()
    },
    //点击切换页数
    pageChange(page,index) {
      pagelist({
        sceneId:this.id,
        lastId: this.lastId,
        page: this.page,
        type: this.active,
        begin: this.begin,
        end: this.end,
        time: new Date().getTime()
      }).then(res=>{
        console.log(res,'商品基本信息')//打印出来是个对象
        // this.pageLists = res.data.goodMap // eslint-disable-line no-unused-vars
        this.pageActive = index
        this.page = page
        // alert(this.page)
        this.getList()
        // console.log(this.pageLists)
      })
    },
    selectPage(item,index) {
      this.pageShow = false
      this.pageActive = index
      this.page = item
      // alert(this.page)
      this.getList()
    },
  },
  created() {
    if(this.$route.query.id) {
      this.id = this.$route.query.id
      this.title = this.$route.query.title
    }
    // this.getPriceList()
    this.getList()
    this.pagelists()
    this.getDatas()
    // this.getSelllists()
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  height: 100%;
  background-color: #121212;
  .price_range {
    padding: 15px 20px;
    overflow-x: auto;
    display: flex;
    >div {
      background: #FFFFFF;
      height: 28px;
      display: flex;
      align-items: center;
      line-height: 28px;
      border-radius: 5px;
      padding: 0 10px;
      margin-right: 10px;
      .line {
        padding: 0 5px;
      }
    }
    .select {
      background-color: #000000;
      color: #FFFFFF;
    }
  }
  .good_list {
    width: 100%;
    // background-color: #1B1B1B;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 15px;
    .good_list_item {
      width: 48%;
      height: 235px;
      background-color: #1B1B1B;
      margin-bottom: 10px;
      .img_box {
        width: 100%;
        height: 165px;
        background-color: #E5E5E5;
        padding: 10px;
        position: relative;
        .isSell {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(#000000, 0.4);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        img {
          width: 100%;
          height: 100%;
        }
        .img{
          width: 60%;
          height: 60%;
        }
      }
      .name {
        width: 100%;
        padding: 0 6px;
        height: 40px;
        overflow:hidden;
        word-break: break-all;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        padding-top: 5px;
        font-size: 13px;
        color: #FFFFFF;
      }
      .buy_box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2px 6px 0;
        .perice {
          font-size: 16px;
          color: #F6D692;
        }
        .van-button {
          width: 65px;
          height: 20px;
          padding: 0;
          background: #1B1B1B;
          border: 1px solid #F6D692;
          color: #F6D692;
          border-radius: 5px;
          font-size: 12px;
        }
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
  /deep/.van-tabs {
    height: 30px;
    .van-tabs__wrap {
      height: 100%;
    }
  }
  .tabList {
    width: 100%;
    height: 30px;
    background-color: #1B1B1B;
    color: #ffffff;
    display: flex;
    align-items: center;
    >div {
      flex: 1;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
    .selectDiv {
      border-bottom: 2px solid #F6D692;
      color: #F6D692;
    }
  }
  .page_popup {
    padding: 15px 15px 15px 14px;
    border-radius: 5px;
    background-color: #2F2F2F;
    >p {
      text-align: center;
      font-size: 15px;
      color: #000000;
      padding-bottom: 5px;
    }
    .pageNews {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .page {
        width: 48px;
        height: 48px;
        border: 1px solid #1B1B1B;
        background-color: #1B1B1B;
        color: #999999;
        text-align: center;
        line-height: 50px;
        border-radius: 5px;
        margin-right: 7.5px;
        margin-top: 10px;
      }
      .pageSelect {
        border: 1px solid #1B1B1B;
        background-color: #1B1B1B;
        color: #00FF95;
      }
      .fresh {
        width: 48px;
        height: 48px;
        border-radius: 5px;
        margin-top: 10px;
        border: 1px solid #1B1B1B;
        background-color: #1B1B1B;
        color: #999999;
      }
      .fresh:focus {
        color: #0BBC74;
      }
    }
  }
}
</style>
