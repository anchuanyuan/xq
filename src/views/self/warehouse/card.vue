<template>
    <div class="container" style="background-color: #121212;">
        <Header isback title="电子取货卡"></Header>
        <div class="box">
          <img :src=data.versaUrl alt="" style="height: 100%;">
        </div>
        <div class="box1">
          <img :src=data.frontUrl alt="" style="height: 100%;">
        </div>
      <div class="btn">
        <van-button type="button" block @click="takeGoods(id)" :disabled="disabled" class="both">线下提货</van-button>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      disabled: false,
      data:'',
      id: ''
    };
  },
  mounted:function (){
    this.id = this.$route.query.id
    this.getBankInfo();
  },
  created() {
    // if (this.$route.query.id) {
    //   this.id = this.$route.query.id
    //   console.log("id"+this.id)
    //   this.takeGoods(id)
    //   this.getBankInfo(this.id)
    // }
  },
  methods: {
    getBankInfo() {
      console.log("id111"+this.id),
        this.$post({
        module: 'Nft',
        interface: '1096',
        data: {
          id: this.id,
        }
      }).then(res => {
        console.log("测试执行")
        this.data = res.data
        console.log("内容"+JSON.stringify(res.data))
      })
    },
    // 提取获取
    takeGoods() {
      console.log("线下取货id"+this.id),
      this.$post({
        module: 'Nft',
        interface: '1097',
        data: {
          id: this.id
        }
      }).then(res => {
        console.log(res,'线下取货成功')
        this.$toast('线下取货成功')
        this.$router.push({path:'/self/warehouse'})
      })
    },
  },
};
</script>

<style scoped lang="less">
.both{
  background: linear-gradient(180deg, #CEB968 0%, #AD9737 100%);
  color: white;
}
.container {
  width: 100vw;
  .box {
    height: 200px;
    // background: url(../../../assets/img/self/warehouse/zheng.jpg) no-repeat;
    background-size:100%;
    margin: 25px;
  }
  .box1 {
    margin: 0 25px;
    height: 200px;
    // background: url(../../../assets/img/self/warehouse/反面背景.jpg) no-repeat;
    background-size:100%;
  }
  .btn {
    width: 92%;
    border-radius: 7px;
    margin: 15px 15px 0 15px;
  }
}
</style>
