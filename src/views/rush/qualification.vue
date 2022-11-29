<template>
  <div class="container">
    <Header title="上架品类资质名录" style="background-color: #121212;"></Header>
    <div class="box">
      <h1>{{ content.title }}</h1>
        <div class="box_content" v-html="content.content"></div>
      <!-- <p>时代维度商城上架品类资质名录</p>
      <br>
      <p>您当前浏览的为最新版本</p>
      <br>
      <p>时代维度商城[经营者贵州时代维度信息科技有限公司] 作为SaaS服务提供商,对在本商城上架的商品类目要 求如下:</p>
      <br>
      <p>贵州时代维度信息科技有限公司依据国家相关法律法
        规制定本规则，并在法律允许范围内享有解释权，如
        您对法规修订本规则，但将按照相关法律法规规定对
        修订的公司。贵州时代维度信息科技有限公司可依据
        国家法律法规修订本规则，但将按照相关法律法规规
        定对修订的规则内容进行公示。</p>
      <br>
      <p>时代维度商城[经营者贵州时代维度信息科技有限公司]
        作为SaaS服务提供商,对在本商城上架的商品类目要
        求如下:</p>
      <br>
      <p>贵州时代维度信息科技有限公司依据国家相关法律法
        规制定本规则，并在法律允许范围内享有解释权，如
        您对法规修订本规则，但将按照相关法律法规规定对
        修订的公司。贵州时代维度信息科技有限公司可依据
        国家法律法规修订本规则，但将按照相关法律法规规
        定对修订的规则内容进行公示。</p>
      <br>
      <p>贵州时代维度信息科技有限公司依据国家相关法律法
        规制定本规则，并在法律允许范围内享有解释权，如
        您对法规修订本规则，但将按照相关法律法规规定对
        修订的公司。贵州时代维度信息科技有限公司可依据
        国家法律法规修订本规则，但将按照相关法律法规规
        定对修订的规则内容进行公示。</p>
      <br> -->
    </div>
    <div class="footer_btn">
      <van-button class="btnBuy" @click="read" v-if="disabled" :disabled="disabled" type="default">请仔细阅读协议({{ num }}s)
      </van-button>
      <van-button class="btnBuy confirmBtn" v-else type="default" @click="submit">已阅读</van-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      num: 5,
      disabled: true,
      timer: '',
      content: ''
    };
  },
  methods: {
    read() {
      this.$toast('已阅读')
    },
    counDown() {
      this.timer = setInterval(() => {
        this.num--
        if (this.num == 0) {
          this.disabled = false
          clearInterval(this.timer)
        }
      }, 1000)
    },
    submit() {
      localStorage.setItem('MINGZI_XIEYI', 'true')
      this.$router.replace('/rush/standard')
    },
    getContent() {
      this.$post({
        module: 'Content',
        interface: '4003',
        data: {
          name: 'category_qualification_list'
        }
      }).then(res => {
        // console.log(res,'文章详情')
        this.content = res.data
      })
    }
  },
  created() {
    this.counDown()
    this.getContent()
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  background-color: #121212;

  .box {
    width: 100%;
    height: 100%;
    padding: 16px 8px 60px;
    color: #FFFFFF;

    // /deep/.box_content {
    //   img {
    //     width: 100%;
    //   }
    // }

    p:nth-child(7),
    p:nth-child(11),
    p:nth-child(13) {
      color: #999999;
      font-size: 14px;
    }



  }

  .footer_btn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 16px 10px;
    background-color: #1b1b1b;

    .btnBuy {
      width: 200px;
      height: 28px;
      // background: #E5E5E5;
      border-radius: 5px;
    }

    .confirmBtn {
      //background-color: #0BBC74;
      background: linear-gradient(180deg, #CEB968 0%, #AD9737 100%);
      color: #FFFFFF;
    }
  }
}
</style>
