<template>
<div class="box">
  <Header title="签字" />
  <div class="container">
    <div class="btn">
      <div class="goBack" @click="$router.replace('/rush')">返回</div>
      <div class="conCal">
        <div class="cal" @click="handleReset">重新签字</div>
        <div class="con" @click="handleGenerate">确认</div>
      </div>
    </div>
    <div class="sign">
        <vue-esign ref="esign" :width="800" :height="2000" :isCrop="isCrop" :lineWidth="lineWidth"  :lineColor="lineColor" :bgColor.sync="bgColor" />
    </div>
    <!-- <button @click="handleReset">清空画板</button> <button @click="handleGenerate">生成图片</button> -->
    
    <van-popup v-model="show">
      <img class="shouImg" :src="resultImg" alt="">
    </van-popup>

    <div v-if="showText" class="noSign">请先签字</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      show: false,
      showText: false,
      lineWidth: 15,
      lineColor: 'red',
      bgColor: '',
      resultImg: '',
      isCrop: false
    };
  },
  methods: {
    handleReset () {
      this.$refs.esign.reset()
    },
    // 生成base64格式
    handleGenerate () {
      this.$refs.esign.generate().then(res => {
        this.resultImg = res //把base64赋给img
        localStorage.setItem('USER_NAMESIGN',  this.resultImg)
        this.$store.state.isLoadding = true
        setTimeout(() => {
          this.$store.state.isLoadding = false
          this.$router.replace('/rush')
        }, 1500)
        // this.show = true
        // console.log(this.resultImg)
      }).catch(() => {
        // 画布没有签字时会执行这里
        this.showText = true
        setTimeout(() => {
          this.showText = false
        }, 2000)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less" >

.container {
  width: 100vw;
  // height: calc(100vh- 45px);
  height: 95vh;
  background-color: #121212;
  padding: 8px 8px 8px 0;
  display: flex;
  overflow: hidden;
  .btn {
    width: 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    color: #ffffff;
    .goBack {
      width: 60px;
      height: 40px;
      text-align: center;
      line-height: 40px;
      font-size: 15px;
      background: #333333;
      border-radius: 5px;
      transform: rotate(-270deg);
    }
    .conCal {
      display: flex;
      align-items: center;
      transform: rotate(-270deg);
      padding-right: 100px;
      >div {
        width: 60px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 15px;
        background: #2c2a28;
        border-radius: 5px;
      }
      .cal {
        width: 80px;
      }
      .con {
        margin-left: 20px;
      }
    }
  }
  .sign {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    border-radius: 8px;
  }
  .shouImg {
    width: 200px;
    height: 400px;
  }
  .noSign {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.37333rem;
    background-color: rgba(50,50,51,.88);
    border-radius: 6px;
    transform: translate(-50%, -50%, 0);
    transform: rotate(-270deg);
  }
}
</style>