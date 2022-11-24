<template>
  <div class="container" style="background-color: #000000; height: 100vh;">
    <Header isback title="粉丝订单"></Header>
    <div class="top_tips">订单数: 0</div>
    <div class="empty_box" v-if="list.length < 1">
      <img class="empty_img" src="../../../assets/img/self/kong.png" alt="">
    </div>
    <div class="box" v-else>
      没有ui，列表没画。。。。。。。。。。。。。。。。
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    sumbit() {
      this.show = false
    }
  },
  created() {
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  .top_tips {
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #FFFFFF;
    background: linear-gradient(180deg, #0B955D 0%, #18A66C 100%);
  }
  .empty_box {
    padding-top: 100px;
    text-align: center;
    .empty_img {
      width: 160px;
      height: 120px;
    }
  }
  .box {
    padding: 10px;
  }
}
</style>
