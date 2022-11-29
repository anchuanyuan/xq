<template>
  <div class="content2">
    <p class="sendm">转赠趣币</p>
    <div class="sendnum">
      <span>转赠数量：</span>
      <input class="sendnuminput1" v-model="sendnums" />
    </div>
    <div class="sendphones">
      <span>转赠手机号：</span>
      <input class="sendphone" v-model="sendphones" />
    </div>
    <div class="sendp">
      <p>转赠条件需要满1000趣币</p>
      <p>提交申请后请耐心等待管理员审核</p>
    </div>
    <div class="sendbutton">
      <van-button
          type="plain"
          color="#bea84f"
          size="small"
          @click="$router.back()"
      >取消</van-button
      >
      <van-button type="primary" color="#bea84f" size="small"
      >申请</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sendnums: '0',
      sendphones: '0',
    }
  },
}
</script>

<style lang="less" scoped>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .content2 {
    width: 262px;
    height: 262px;
    position: absolute;
    top: 29%;
    left: 16%;
    background: #1b1b1b;
    .sendm {
      color: #fff;
      font-size: 20px;
      font-weight: 700px;
      text-align: center;
      padding: 28px;
    }
    .sendnum {
      margin-bottom: 18px;
      margin-left: 30px;
    }
    .sendphones {
      margin-left: 25px;
    }
    .sendnuminput1 {
      margin-left: 10px;
    }
    span {
      color: #fff;
    }
    input {
      display: inline-block;
      width: 98px;
      height: 20px;
      color: #bea84f;
      border: 1px solid #ccc;
    }
    .sendp {
      color: #999;
      margin: 24px 62px 13px 31px;
      .p:first {
        padding-bottom: 10px;
      }
    }
    .sendbutton {
      text-align: center;
      margin-top: -10px;
      .van-button {
        margin-right: 50px;
      }
    }
  }
}
</style>
