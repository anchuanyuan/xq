<template>
  <div class="setting">
    <Header class="" title="我的地址" isback />
    <div class="outside">
      <van-empty v-if="list.length == 0" description="暂无收货地址" />
      <div
        class="box flex-between"
        v-for="(item, index) in list"
        :key="index"
        @click="$router.push('/self/editAddress?id=' + item.id)"
      >
        <div class="address">
          <div>收件人：{{ item.name }} {{ item.mobile }}</div>
          <div>地址：{{ item.areaName }}</div>
          <div>详细地址：{{ item.address }}</div>
          <div class="default" v-if="item.isDefault">默认</div>
        </div>
        <div>
          <img src="../../picture/组 1325.png" alt="" />
        </div>
      </div>
    </div>
    <div class="footer_btn">
      <button @click="$router.push('/self/editAddress')">新增地址</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import {getAddress} from "@/api/my/addr";

export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
     /* this.$post({
        module: 'Address',
        interface: '2000',
      })*/
      getAddress().then(res => {
        // console.log(res,'收货地址列表')
        this.list = res.data.list
      })
    }
  },
  components: {},
};
</script>

<style scoped lang="less">
  .setting{
    width: 100%;
    height: 100vh;
    background-color: #121212;
  }
.outside {
  padding: 10px 10px 50px;
}
.box {
  margin-top: 8px;
  padding: 24px 16px;
  background: #1B1B1B;
  color: #999999;
  border-radius: 4px 4px 4px 4px;
  opacity: 1;
  img {
    width: 22px;
    height: 22px;
  }
  .address {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
    line-height: 22px;
    .default {
      color: #F6D692;
    }
  }
}
.footer_btn {
  width: 100%;
  background-color: #121212;
  padding: 5px 12px;
  position: fixed;
  bottom: 0;
  button {
    width: 100%;
    height: 30px;
    background: #333333;
    border-radius: 0px 0px 0px 0px;
    border: none; 
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
  }
}

</style>