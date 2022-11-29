<template>
  <div class="warehouse">
    <Header :title="title" :url="toUrl" isback />
    <van-tabs
      v-model="active"
      background="transparent"
      title-active-color="#bda84f"
      title-inactive-color="#9B9B9B"
      color="#0BBC74"
      :swipe-threshold="6"
      @change="changeTab"
    >
      <van-tab
        v-for="item in tabList"
        :key="item.value"
        :title="item.label"
        :name="item.value"
      ></van-tab>
    </van-tabs>
    <van-list v-model="loading"  finished-text="------------我也是有底线的------------" :finished="finished" @load="onLoad">
      <div class="list-container">
        <div class="list-item" v-for="item in list" :key="item.id">
          <div class="item-header">
            <div class="item-no">订单:{{ item.serialNo }}</div>
            <div class="item-status">{{ item.statusName }}</div>
          </div>
          <div class="warehouse-name">所属仓库：{{ item.sceneName }}</div>
          <div class="item-goods-list">
            <div class="goods-item">
              <img
                :src="item.nftCover"
                class="goods-icon"
              />
              <div class="goods-info">
                <div class="goods-title">{{ item.nftName }}</div>
                <div class="goods-no">商品编号：{{ item.orderNo }}</div>
                <div class="goods-price">￥{{ parseInt(Number(item.price)) }}</div>
              </div>
            </div>
          </div>
          <div class="item-user">
            <div class="user-info">
               <span>交易方：</span> -->
              <img
                :src="item.sellerAvatar"
                class="user-avatar"
              />
              <span class="user-name">{{ item.sellerName }}</span>
            </div>
          </div>
          <div class="item-button-group">
            <button class="button1 shelves left-button" v-if="item.putBtn" @click="gotoPay(item.id)" type="button">
              委托上架
            </button>
            <button class="button1 goods" type="button" v-if="item.puckBtn"  @click="toPage(item.id)">电子取货卡</button>
            <button class="button1 goods"  v-if="item.puckBtn"  @click="takeGoods(item.id)" type="button">提取货物</button>
            <!-- 取货卡弹窗 -->
            <!-- 
              title 标题
              message 文本内容，支持通过\n换行
              confirmButtonText 确认 按钮文案
              confirmButtonColor 确认 按钮颜色
              confirm 确认按钮 函数
              cancel 取消按钮函数
            -->
            <van-dialog v-model="goodsShow" message="确认提取货物吗？" :showCancelButton="true" confirmButtonText="确认" cancelButtonText="取消" @confirm="takeSubmit()" @cancel="takeCancel()"></van-dialog>            
            <button class="button1 voucher" type="button" v-if="item.imgBtn" @click="showVoucher(item.id)">
              查看凭证
            </button>
            <!-- <van-uploader
              v-if="item.uploadBtn"
              :preview-image="false"
              @click-upload="handler(item, 'uploadVoucher')"
              :after-read="onAfterRead"
            >
              <button
                  class="button2 upload-voucher"
                  type="button"
                >
                  上传凭证
                </button>
            </van-uploader> -->
              <!-- <button
                  class="button2 upload-voucher"
                  type="button"
                  v-if="!item.uploadBtn"
                  @click="handler(item, 'uploadVoucher')"
                >
                  上传凭证
                </button> -->
            <button
              class="button2 pay"
              type="button"
              v-if="item.payBtn"
              @click="handler(item, 'pay')"
            >
              去支付
            </button>
            <button class="button2 pay-confirm" v-if="item.buySubBtn" @click="payConfirm(item.id)" type="button">支付确认</button>
          </div>
        </div>
        <img
          src="@/assets/img/self/warehouse/empty.png"
          v-if="!loading && finished && !list.length"
          class="empty-icon"
        />
      </div>
    </van-list>
    <van-popup
      v-model="show.uploadVoucher"
      class="upload-voucher-popup"
      position="bottom"
    >
      <div class="popup-title">上传凭证</div>
      <div class="uploader-group">
        <van-uploader
          :preview-image="false"
          capture="camera"
          :after-read="onAfterRead"
        >
          <img
            src="@/assets/img/self/warehouse/camera.png"
            class="upload-holder"
          />
          <div class="upload-text">拍照</div>
        </van-uploader>
        <van-uploader
          :preview-image="false"
          :after-read="onAfterRead"
        >
          <img
            src="@/assets/img/self/warehouse/album.png"
            class="upload-holder"
          />
          <div class="upload-text">相册</div>
        </van-uploader>
      </div>
    </van-popup>
    <!-- <van-popup v-model="show.payBox" position="center" class="pay-box-popup">
      <div class="pay-info-container">
        <div class="pay-info-cell">
          <div class="cell-label">收 款 人 ：{{ bankInfo.bankUsername }}</div>
          <div class="cell-value">
            <button class="copy-button" @click="copy(bankInfo.bankUsername)">复制</button>
          </div>
        </div>
        <div class="pay-info-cell">
          <div class="cell-label">银行卡号：{{ bankInfo.bankCard }}</div>
          <div class="cell-value">
            <button class="copy-button"  @click="copy(bankInfo.bankCard)">复制</button>
          </div>
        </div>
        <div class="pay-info-cell">
          <div class="cell-label">银行名称 ：{{ bankInfo.bankName }}</div>
          <div class="cell-value">
            <button class="copy-button"  @click="copy(bankInfo.bankName)">复制</button>
          </div>
        </div>
        <div class="pay-info-cell">
          <div class="cell-label">金 额 ：{{ bankInfo.price }}</div>
          <div class="cell-value">
            <button class="copy-button"  @click="copy(bankInfo.price)">复制</button>
          </div>
        </div>
        <button class="confirm-button" @click="show.payBox = false">
          确定
        </button>
      </div>
    </van-popup> -->
    <van-popup v-model="show.voucher">
      <div class="voucher-box">
        <img :src="show.voucherImg" alt="" />
      </div>
    </van-popup>
  </div>
</template>

<script type="text/ecmascript-6">
import {getbuylist} from "@/api/buy"
export default {
  data() {
    return {
      title: "买方仓库",
      active: '0',
      bankInfo:'',
      toUrl: '/self',
      tabList: [
        {
          label: "我的仓库",
          value: '0',
        },
        {
          label: "付款确认",
          value: '3',
        },
        {
          label: "收款确认",
          value: '5',
        },
        {
          label: "投诉订单",
          value: '10',
        },
        {
          label: "发货状态",
          value: '7',
        },
      ],
      loading: false,
      finished: false,
      upLoadImg:'',
      list: [],
      // 选中的item
      selectItem: "",
      lastId: 0,
      pageSize: 1,
      pageNum:10,
      show: {
        uploadVoucher: false, // 展示上传凭证弹窗
        payBox: false, // 展示支付弹窗
        voucher: false, //查看凭证
        voucherImg: "", //凭证图片
      },
      goodsShow:false,
      goodsId:'',//提取货物 货物id

    };
  },
  methods: {
    toPage(id) {
        this.$router.push({
        path:"/self/warehouse/card",
        query:{
          id:id
        }
      })
    },
    // onBackPress() {
    //   if(this.myUrl === 'success') {
    //     return this.$router.push({path: '/self/warehouse/bankpay'),
    //   }
    // },
    // handler() {
    //   this.$router.push({path:"/self/warehouse/bankpay"})
    // },
    handler(item) {
      localStorage.setItem("id", item.id)
      this.$router.push({
        path: '/self/warehouse/bankpay',
        query: {
          id: item.id
        }
      })
    },
    gotoPay(id){
       localStorage.setItem("id", id)
      this.timeNow = new Date().getHours();//取得当前时间的小时
       console.log(this.timeNow)
        console.log(id)
      if(this.timeNow < 8 || this.timeNow > 22){
        var odiv=document.getElementsByName('card');
        console.log('不在上架时间范围内')
        return this.$toast('不在上架时间范围内,请在每天8点至晚上9点付款')
      }else{
      this.$router.push({
          path: "/self/warehouse/sell?id=" + id,
          query: {
            id: id
          } 
        })
      }
    },

    changeTab() {
      this.lastId = 0
      this.page = 1
      this.list = []
      this.loading = false
      this.finished = false
      console.log('问题打点',this.active)
      // this.$post({
      //   module: 'Nft',
      //   interface: '1035',
      //   data: {
      //     lastId: this.lastId,
      //     page: this.page,
      //     status: this.active
      //   }
      // }).then(res => {
      //   this.loading = false;
      //   this.lastId = res.data.lastId
      //   this.page ++
      //   this.list.push(...res.data.list)
      //   if(this.page > res.data.lastPage) {
      //     this.finished = true;
      //   }
      //   console.log(res,'买方列表')
      // })
    },
    // 确认收款
    conBuy(id) {
      this.$post({
        module: 'Nft',
        interface: '1090',
        data: {
          id
        }
      }).then(res => {
        // console.log(res,'提取货物')
        this.$toast(res.message)
        this.changeTab()
      })
    },
    // 提取货物按钮
    takeGoods(id) {
      // 提取货物id 赋值 因为 弹窗确认需要调接口使用
      this.goodsId = id
      // 弹窗打开
      this.goodsShow = true
    },
    // 提取货物弹窗 确认
    takeSubmit(){
      this.$post({
        module: 'Nft',
        interface: '1075',
        data: {
          id: this.goodsId
        }
      }).then(res => {
        // 关闭弹窗
        this.goodsShow = false
        this.$toast(res.message)
        //  刷新商品列表
        this.changeTab()
      })
    },
    // 提取货物弹窗 取消
    takeCancel(){
      // 关闭弹窗
      this.goodsShow = false
    },
    // 支付确认
    payConfirm(id) {
      this.$post({
        module: 'Nft',
        interface: '1065',
        data: {
          id
        }
      }).then(res => {
        console.log(res,'支付确认')
        this.$toast(res.message)
        this.changeTab()
      })
    },
    /**
     * 列表加载
     */
    onLoad() {
      //请求我的仓库的参数
      getbuylist({
        data: {
          // lastId: this.lastId,
          pageSize: this.pageSize,
          pageNum:this.pageNum,
          status: this.active
        }
      }).then(res => {
        this.loading = false;
        this.lastId = res.data.lastId
        this.pageSize ++
        this.list.push(...res.data.rows)
        if(this.pageSize > res.data.lastPage) {
          this.finished = true;
        }
        console.log(res,'买方列表')
      })
    },
    /**
     * 按钮点击处理
     */
    // handler(item, type) {
    //   // console.log(item,'123312');
    //   this.selectItem = item;
    //   if (type === "uploadVoucher") {
    //     // this.show.uploadVoucher = true;
    //   } else if (type === "pay") {
    //     this.getBankInfo()
    //   }
    // },
    // copy(code) {
    //   this.$copyText(code)
    //     .then(() => {
    //       this.$toast("复制成功");
    //     })
    //     .catch(() => {
    //       this.$toast("复制失败");
    //     });
    // },
    getBankInfo() {
      this.$post({
        module: 'Nft',
        interface: '1070',
        data: {
          id: this.selectItem.id
        }
      }).then(res => {
        // console.log(res,'去支付的信息')
        this.bankInfo = res.data
        this.show.payBox = true;
      })
    },
    onAfterRead(vFile) {
      // console.log("上传凭证", vFile, this.selectItem.id);
      this.$upload(vFile.file).then(res => {
          this.upLoadImg = res.data.file
          if(!this.upLoadImg) return
          this.uploadPz()
      })
      this.show.uploadVoucher = false;
    },
    uploadPz() {
      this.$post({
        module: 'Nft',
        interface: '1050',
        data: {
          id: this.selectItem.id,
          img: this.upLoadImg
        }
      }).then(res => {
        this.$toast(res.message)
        this.changeTab()
        // console.log(res,'上传支付凭证')
      })
    },
    /**
     * 查看凭证
     */
    showVoucher(id) {
      this.$post({
        module: 'Nft',
        interface: '1055',
        data: {
          id
        }
      }).then(res => {
        // console.log(res,'查看凭证')
        this.show.voucherImg = res.data.img
        this.show.voucher = true;
      })
    },
  },
  components: {},
  created() {
    // this.type = this.$route.query.type || "1";
    // this.title = this.type === "1" ? "买方仓库" : "卖方仓库";
    // if (this.$route.query.active && this.tabList[this.$route.query.active]) {
    //   this.active = this.tabList[this.$route.query.active].value;
    // }
    if (this.$route.query.active) {
      this.active = this.$route.query.active
      console.log('问题',this.$route.query.active)
    }
    console.log('问题',this.$route.query.active)
  },
};
</script>

<style scoped lang="less">
.warehouse {
  // height: 100vh;

  /deep/ .upload-voucher-popup {
    border-radius: 12px 12px 0px 0px;

    .popup-title {
      font-size: 18px;
      font-family: PingFang SC-Bold, PingFang SC;
      font-weight: bold;
      color: #111111;
      text-align: center;
      padding: 24px 0;
    }

    .uploader-group {
      padding: 50px 0;

      .van-uploader {
        margin-left: 50px;
      }

      .van-uploader__input-wrapper {
        text-align: center;
      }

      .upload-holder {
        width: 50px;
        height: 50px;
        vertical-align: middle;
      }

      .upload-text {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #111111;
      }
    }
  }

  /deep/ .pay-box-popup {
    width: 282px;

    .pay-info-container {
      padding-top: 44px;

      .pay-info-cell {
        display: flex;
        align-items: center;
        margin: 10px 12px;

        .cell-label {
          flex: 1;
          font-size: 12px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #000000;
        }

        .cell-value {
          .copy-button {
            background-color: #333333;
            font-size: 11px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: white;
            padding: 2px 4px;
            border: 0;
          }
        }
      }

      .confirm-button {
        font-size: 16px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        padding: 9px 28px;
        border: 0;
        background: #1aa8fe;
        border-radius: 4px;
        margin: 31px auto 18px;
        display: block;
      }
    }
  }

  .list-container {
    .list-item {
      margin: 16px 8px;
      background: #1B1B1B;
      border-radius: 0px 0px 0px 0px;
      opacity: 1;
      padding: 10px 8px;

      .item-header {
        display: flex;
        justify-content: space-between;
        padding-bottom: 5px;
        border-bottom: 1px solid #333333;

        .item-no {
          font-size: 10px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }

        .item-status {
          font-size: 11px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #999999;
        }
      }

      .warehouse-name {
        font-size: 11px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #F6D692;
        margin-top: 4px;
      }

      .item-goods-list {
        .goods-item {
          margin-top: 4px;
          display: flex;
          align-items: flex-start;

          .goods-icon {
            width: 60px;
            height: 60px;
            margin-right: 4px;
            vertical-align: middle;
          }

          .goods-info {
            flex: 1;
            font-size: 11px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;

            & > div {
              margin-top: 2px;

              &:first-child {
                margin-top: 0;
              }
            }
            .goods-no {
              color: #999999;
            }
            .goods-price {
              font-size: 10px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #F6D692;
            }
          }
        }
      }

      .item-user {
        display: flex;
        justify-content: flex-end;
        margin-top: 3px;
        font-size: 11px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;

        .user-avatar {
          width: 16px;
          height: 16px;
          vertical-align: middle;
          border-radius: 50%;
          margin-right: 4px;
        }
      }

      .item-button-group {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        margin-left: -4px;
        padding-top: 8px;

        &:empty {
          display: none;
        }

        .button1 {
          min-width: 54px;
          border-radius: 2px 2px 2px 2px;
          opacity: 1;
          border: 1px solid #333333;
          font-size: 11px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #F6D692;
          padding: 2px 5px;
          border-radius: 2px;
          background-color: #333333;
          margin-left: 4px;
          margin-top: 4px;
          cursor: pointer;

          &.left-button {
            margin-right: auto;
          }

          &:disabled,
          &.disabled {
            background: #e3e3e3;
            color: #999999;
            border: 0;
            cursor: no-drop;
          }
        }

        .button2 {
          .button1();
          background-color: #333333;
          color: #ffffff;
        }
      }
    }

    .empty-icon {
      display: block;
      margin: 50px auto;
      width: 164px;
      height: 120px;
    }
  }
}
.voucher-box {
  width: 233px;
  height: 321px;
  background: #ffffff;
  border-radius: 0px 0px 0px 0px;
  opacity: 1;
  padding: 40px 29px;
  img {
    width: 176px;
    height: 241px;
  }
}
</style>