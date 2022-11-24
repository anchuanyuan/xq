<template>
  <div class="" style="background-color: #000000; height: 100vh;">
    <Header class="" title="联系客服" isback />
    <div class="outside">
      <div class="box" v-for="(item, index) in list" :key="index">
        <div>{{ item.name }}</div>
        <div>手机号码：{{ item.mobile }}</div>
        <div>微信号码：{{ item.wx }}</div>
        <div class="qrcode">
          <img :src="item.qrCode" />
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      list:[]
    };
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$post({
        module: 'Utils',
        interface: '6000',
      }).then(res => {
        console.log(res,'客服列表')
        this.list = res.data.services
      })
    }
  },
  components: {},
};
</script>

<style scoped lang="less">
.outside {
  padding: 8px;
}
.box {
  margin-top: 16px;
  padding: 16px;
  background: #1B1B1B;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  font-size: 16px;
  font-weight: 400;
  color: #FFFFFF;
  line-height: 30px;
  .qrcode {
    text-align: center;
    img {
      width: 96px;
      height: 96px;
    }
  }
}
</style>