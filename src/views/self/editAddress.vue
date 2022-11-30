<template>
  <div class="bei">
    <Header class="" title="地址信息" isback />
    <div class="outside">
      <van-cell-group>
        <van-field v-model="form.address" label="姓名" placeholder="收件人姓名" />
        <van-field v-model="form.addressPhone" label="手机" placeholder="收件人手机号" :maxlength="11"/>
        <van-cell title="地址" :label="form.addressCityCode == '' ? '省市县区、乡镇等' : form.addressCity" @click="show = !show" is-link />
        <van-field v-model="form.addressDetails" label="详细" placeholder="具体到门牌号" rows="3" type="textarea" />
        <van-field v-model="value" label="默认地址" input-align="right">

          <template #input>
            <van-switch active-color="#F6D692 " inactive-color="#1B1B1B" active-value="0" inactive-value="1" v-model="form.defaultStatus" size="20" />
          </template>

        </van-field>
      </van-cell-group>
      <div class="btn">
        <button @click="submit">保存</button>
      </div>
      <van-popup v-model="show" position="bottom">
        <van-area :area-list="areaList" :columns-placeholder="['请选择', '请选择', '请选择']" :value="form.addressCityCode"
          @cancel="show = false" @confirm="areaconfirm" title="省市县区、乡镇等" />
      </van-popup>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { areaList } from "@vant/area-data";
import {addAddress, addressDetail, updateAddress} from "@/api/my/addr";
export default {
  data() {
    return {
      show: false,
      id: '',
      areaList,
      form: {
        address: "", //姓名
        addressPhone: "", // 手机号
        addressCity: '',//
        addressCityCode: "", //  省市区编码
        addressDetails: "",//详细地址
        defaultStatus: false, // 默认地址
      },
      value: "",
    };
  },
  created() {
    if (this.$route.query.addressId) {
      this.addressId = this.$route.query.addressId
      this.getAddress()
    }
  },
  methods: {
    getAddress() {
      /*this.$post({
        module: 'Address',
        interface: '2002',
        data: {
          id: this.id
        }
      })*/
      addressDetail(this.id || 1).then(res => {
        console.log(res, '收货地址详情')
        this.form = res.data
      })
    },
    areaconfirm(e) {
   /*   this.form.province = e[0].code;
      this.form.city = e[1].code;
      this.form.county = e[2].code;*/
      console.log(e)
      this.form.addressCity = e[0].name + " " + e[1].name + " " + e[2].name;
      this.form.addressCityCode = e[2].code
      this.show = false;
    },
    submit() {
      if (!this.form.address) return this.$toast('请输入收件人姓名')
      if (!this.form.addressPhone) return this.$toast('请输入收件人手机号')
      if (!this.form.addressCityCode) return this.$toast('请选择收货地址')
      if (!this.form.addressDetails) return this.$toast('请输入具体收货地址')

      // 是否为默认地址。0：默认地址；1：不默认

      /*this.$post({
        module: 'Address',
        interface: this.id ? '2003' : '2001',
        data: this.form
      })*/
      if(this.form.addressId) {
        updateAddress(this.form).then(res => {
          // console.log(res,'添加收货地址')
          this.$toast(res.message)
          this.$router.back()
        })
      } else {
        addAddress(this.form).then(res =>{
          this.$toast(res.message)
          this.$router.back()
        })
      }

    }
  },
  components: {},
};
</script>

<style scoped lang="less">
.bei {
  width: 100%;
  // height: 100vh;
  background-color: #121212;
}

.outside {
  /deep/.van-cell {
    background-color: #1B1B1B;
  }

  /deep/.van-switch {
    border: 0.02667rem solid #666666;
  }

  /deep/.van-cell__title {
    color: #ffffff;
  }

  /deep/.van-field__control {
    color: #999999;
  }

  /deep/.van-field__body .van-field__control {
    color: #999999;
  }

  /deep/input {
    color: #ffffff;
  }

  /deep/.van-field__body textarea {
    color: #ffffff;
  }

  /deep/.van-cell__label {
    color: #999999;
  }

  /deep/.van-icon {
    color: #ffffff;

  }
}

/deep/.van-cell::after {
  border-bottom: 1px solid #333333;
}

/deep/.van-hairline--top-bottom::after {

  border-width: 0;
}

/deep/.van-switch {
  background-color: unset;
}

.btn {
  text-align: center;

  button {
    width: 91px;
    height: 40px;

    background: #333333;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    margin-top: 20px;
  }
}
</style>