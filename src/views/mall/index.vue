<template>
  <div class="container">
    <Header title="兑换商品"></Header>
    <div class="kuan">
      <div class="advertise">
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in bannerList" :key="index">
            <!-- <div>{{item.src}}</div> -->
            <img class="img" :src="item.src" alt="">
            <!-- <img src="../../picture/组 3 拷贝.png" alt=""> -->
          </van-swipe-item>
        </van-swipe>
      </div>

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="good_list">
          <div class="good_list_item" @click="$router.push('/mall/details?id=' + item.id)" v-for="(item,index) in list"
            :key="index">
            <div class="good_list_item_tu"><img :src="item.goodsMasterImage" alt=""></div>
            <p class="name">{{ item.goodName }}</p>
            <div class="good_list_item_img">
              <p class="perice">{{ parseInt(Number(item.numerical)) }}趣币</p>
              <img src="../../picture/jian.png" alt="" class="img1">
            </div>

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
      list: [],
      loading: false,
      lastId: 0,
      page: 1,
      checked: false,
      bannerList: [],
      popupInfo: {},
      show: false,
      finished: false,
      classifyList: [],
      hotList: [
        {
          img: require('../../assets/img/home/czsh.png'),
          title: '创作手绘',
        },
        {
          img: require('../../assets/img/home/penqi.png'),
          title: '艺术微喷',
        },
        {
          img: require('../../assets/img/home/huihua.png'),
          title: '限量版画',
        },
        {
          img: require('../../assets/img/home/czsh.png'),
          title: '艺术海报',
        },
        {
          img: require('../../assets/img/home/diaoshu.png'),
          title: '雕塑摆件',
        },
        {
          img: require('../../assets/img/home/shouban.png'),
          title: '潮流手办',
        },
        {
          img: require('../../assets/img/home/sheying.png'),
          title: '摄影艺术',
        },
        {
          img: require('../../assets/img/home/fenlei.png'),
          title: '最新作品',
        }
      ]
    };
  },
  methods: {
    onLoad() {
      this.$post({
        module: 'IntegralGood',
        interface: '1001',
        data: {
          lastId: this.lastId,
          page: this.page
        }
      }).then(res => {
        this.loading = false
        // console.log(res,'数据列表')
        this.page++
        this.lastId = res.data.lastId
        this.list.push(...res.data.list)
        if (this.page > res.data.lastPage) {
          this.finished = true
        }
      })
      setTimeout(() => {
        // 加载状态结束
        this.loading = false;
        this.finished = true;
      }, 1000);
    },
    closePup() {
      // 设置当日不在弹窗
      if (this.checked) {
        this.$post({
          module: 'User',
          interface: '6001',
        }).then(() => {
        })
      }
    },
    getBanner() {
      this.$post({
        module: 'Content',
        interface: '1000',
      }).then(res => {
        console.log("轮播图")
        console.log(res,'广告图列表')
        this.bannerList = res.data.list
      })
    },
    getclassifyList() {
      this.$post({
        module: 'Good',
        interface: '1000',
      }).then(res => {
        // console.log(res,'热门分类')
        this.classifyList = res.data
      })
    },
    getUserInfo() {
      this.$post({
        module: 'User',
        interface: '1000',
        data: {
        }
      }).then(res => {
        // console.log(res,'用户基本信息')
        if (res.data.isPopUp) {
          this.show = true
        }
      })
    },
    getPopupInfo() {
      this.$post({
        module: 'User',
        interface: '6000',
        data: {
        }
      }).then(res => {
        // console.log(res,'弹窗信息')
        this.popupInfo = res.data
        this.getUserInfo()
      })
    }
  },
  pass: true,
  created() {
    this.getPopupInfo()
    this.getBanner()
    this.getclassifyList()
    // this.$emit("update:status", false);
  },
};
</script>

<style scoped lang="less">
.kuan {
  width: 92%;
  height: 100%;
  margin: 0 auto;
}

.container {
  width: 100vw;
  background-image: url(../../picture/backGround.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;

  // background-attachment: fixed;
  // height: 100vh;
  .input {
    width: 92%;
    height: 30px;
    margin: 0 auto;
    background-color: #1B1B1B;
    border-radius: 15px;
    color: white;
    display: flex;
    margin-top: 20px;

    // align-content: center;
    img {
      width: 18px;
      height: 18px;
      margin-left: 8px;
      // vertical-align: middle;
      margin-top: 6px;
    }

    input {
      width: 100%;
      margin-left: 8px;
    }
  }

  .advertise {
    width: 100%;
    height: 160px;
    margin-top: 45px;
    margin-bottom: 10px;

    // .my-swipe .van-swipe-item {
    //   color: #fff;
    //   font-size: 20px;
    //   line-height: 150px;
    //   text-align: center;
    //   background-color: #39a9ed;
    // }
  }

  .heder_top {
    width: 100%;
    height: 30px;
    position: relative;
    top: 0;
    left: 0;
    font-size: 18px;
    font-weight: 400;
    z-index: 9999 !important;
    color: #FFFFFF;
    margin-top: 15px;
    // text-align: center;
    position: relative;

    img {
      width: 26px;
      height: 26px;

    }

    p {
      // position: absolute;
      text-align: center;
      top: 0px;
      left: 10px;
    }
  }

  .my-swipe {
    margin-top: -30px;

    .van-swipe-item {
      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .class_ification {
    width: 100%;
    // padding: 15px 10px 0 16px;
    padding: 0 0px 0 10px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .class_item {
      width: 84px;
      height: 37px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding-left: 7px;
      margin-right: 6px;
      margin-top: 15px;

      img {
        width: 34px;
        height: 34px;
        position: absolute;
        left: -4px;
        bottom: 0px;
        // z-index: 9;
      }

      .title {
        width: 76px;
        height: 21px;
        font-size: 10px;
        line-height: 21px;
        padding: 0 4px 0 20px;
        text-align: center;
        border: 1px solid #000000;
        border-radius: 11px;
        color: #000000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .center_good {
    margin-top: 35px;
    width: 100%;
    height: 160px;
    background-image: url('../../assets/img/home/gezi.png');
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    padding: 0 20px;

    img {
      width: 150px;
      height: 70px;
      object-fit: cover;
      margin-right: 10px;
    }

    .good_name {
      width: 160px;
      height: 85px;
      background: rgba(#831616, 0.3);
      color: #FFFFFF;
      padding: 8px;
      position: relative;

      .name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        // color: white;
      }

      .red-line {
        position: absolute;
        bottom: -3px;
        left: 0;

        .line_one {
          width: 94px;
          height: 6px;
          background: #921F1E;
          margin-right: 10px;
        }

        .line_two {
          width: 6px;
          height: 6px;
          background: #921F1E;
        }
      }
    }
  }

  .good_list {
    width: 100%;
    // display: flex;
    // flex-wrap: wrap;
    // justify-content: space-between;

    .good_list_item {
      // padding: 10px;
      width: 100%;
      height: 385px;
      margin: 0 auto;
      // text-align: center;
      background-color: #1F1F1F;
      border: 3px solid #0BBC74;
      margin-top: 10px;
      border-radius: 5px;
      // border-right: 1px solid #BFBFBF;
      // border-bottom: 1px solid #BFBFBF;
      .good_list_item_tu {
        // width: 85%;
        height: 295.5px;
        margin: 0 auto;
        border-bottom: 3px solid #0BBC74;
        // display: block;
        // position: relative;
        display: flex;
        justify-content: center;
        align-content: center;
        img {
          max-width: 85%;
          max-height: 100%;
          display: block;
          margin: 0 auto;
          // 裁剪
          // object-fit: cover;

          // position: absolute;
          // top: center;
          // left: center;
          // right: center;
          // bottom: center;
        }
      }

      .name {
        font-size: 15px;
        height: 45px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        padding-top: 10px;
        margin-left: 22px;
        font-size: 13px;
        color: white;
      }


      .good_list_item_img {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .img1 {
          width: 16px;
          height: 16px;
          vertical-align: middle;
          margin-right: 20px;
        }

        .perice {
          // padding-top: 10px;
          font-size: 16px;
          color: #0BBC74;
          margin-left: 20px;
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
}

.van-popup {
  width: 80%;
  min-height: 200px;
  max-height: 600px;
  padding: 40px 15px 30px;

  .text {
    // text-align: center;
    font-size: 14px;
  }

  img {
    width: 100%;
    height: 200px;
  }

  /deep/.van-checkbox {
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);

    .van-checkbox__label {
      font-size: 12px;
    }
  }
}
</style>
