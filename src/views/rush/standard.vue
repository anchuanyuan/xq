<template>
  <div class="container">
    <Header title="商品上架规范及用户间交易协议"></Header>
    <div class="box">
      <h1>{{ content.title }}</h1>
        <div class="box_content" v-html="content.content"></div>
      <!-- <p>时代维度商城抢购类商品上架规范及用户间交易协议</p>
      <br>
      <p>您当前浏览的为最新版本</p>
      <br>
      <p>第一章 总则</p>
      <br>
      <p>为促进开放、透明、绿色的购物环境，保障用户合法
        权益，维护商城正常经营秩序，根据《时代维度商城
        用户注册协议》、《时代维度商城用户 隐私政策》等
        协议及规范制定本规则。</p>
      <br>
      <p>为促进开放、透明、绿色的购物环境，保障用户合法
        权益，维护商城正常经营秩序，根据《时代维度商城
        用户注册协议》、《时代维度商城用户 隐私政策》等
        协议及规范制定本规则。</p>
      <br>
      <p>为促进开放、透明、绿色的购物环境，保障用户合法
        权益，维护商城正常经营秩序，根据《时代维度商城
        用户注册协议》、《时代维度商城用户 隐私政策》等
        协议及规范制定本规则。</p>
      <br>
      <p>第二章 定义</p>
      <br>
      <p>为促进开放、透明、绿色的购物环境，保障用户合法
        权益，维护商城正常经营秩序，根据《时代维度商城
        用户注册协议》、《时代维度商城用户 隐私政策》等
        协议及规范制定本规则。</p>
      <br>
      <p>为促进开放、透明、绿色的购物环境，保障用户合法
        权益，维护商城正常经营秩序，根据《时代维度商城
        用户注册协议》、《时代维度商城用户 隐私政策》等
        协议及规范制定本规则。</p>
      <br>
      <p>为促进开放、透明、绿色的购物环境，保障用户合法
        权益，维护商城正常经营秩序，根据《时代维度商城
        用户注册协议》、《时代维度商城用户 隐私政策》等
        协议及规范制定本规则。</p>
      <br> -->
    </div>
    <div class="footer_btn">
      <van-button class="btnBuy" @click="read" v-if="disabled" :disabled="disabled" type="default">请仔细阅读协议({{ num }}s)
      </van-button>
      <van-button class="btnBuy confirmBtn" @click="submit" v-else type="default">已阅读</van-button>
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
      localStorage.setItem('GUIFAN_XIEYI', 'true')
      this.$router.replace('/rush/sign')
    },
    getContent() {
      this.$post({
        module: 'Content',
        interface: '4003',
        data: {
          name: 'product_shelving_specification_and_application'
        }
      }).then(res => {
        // console.log(res,'文章详情')
        this.content = res.data
      })
    }
  },
  created() {
    this.getContent()
    this.counDown()
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
    color: white;

    // /deep/.box_content {
    //   img {
    //     width: 100%;
    //   }
    // }
    p:nth-child(1){
      text-align: center;
    }

    p:nth-child(3),
    p:nth-child(7),
    p:nth-child(9),
    p:nth-child(11),
    p:nth-child(15),
    p:nth-child(17),
    p:nth-child(19){
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
    background-color: #1B1B1B;

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
