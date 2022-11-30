<template>
  <div class="container" style="background-color: #000000; height: 100vh;">
    <Header isback title="用户信息" rightText="修改密码" righturl="/self/set/setPassword"></Header>
    <van-cell-group style="border:none;">
      <van-cell center>
        <template #title>
          <img class="user_img" :src="userInfo.avatar" alt="">
          <span>{{ userInfo.nickname }}</span>
        </template>
        <template #right-icon>
          <van-uploader :after-read="afterRead">
            <img class="upload_img" src="../../../assets/img/self/shangchuan.png" alt="">
          </van-uploader>
          <!-- <van-button class="editImg" type="default">选择头像</van-button> -->
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          手机号：<span class="text">{{ userInfo.userPhone }}</span>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          昵称：
          <van-field v-model="nickName" :border="false" placeholder=""></van-field>
        </template>
        <template #right-icon>
          <van-button type="default" @click="setUserName">保存</van-button>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          注册时间：<span class="text">{{ userInfo.createdAt }}</span>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          登录时间：<span class="text">{{ userInfo.thisLoginedAt }}</span>
        </template>
      </van-cell>
      <!-- <van-cell>
        <template #title>
          我的上级：<span class="text">{{ userInfo.recommendName }}</span>
        </template>
      </van-cell> -->
    </van-cell-group>
  </div>
</template>

<script type="text/ecmascript-6">
import {getUser} from "@/api/login";

export default {
  data() {
    return {
      nickName: '',
      userInfo: {}
    };
  },
  methods: {
    setUserName() {
      if (!this.nickName) return this.$toast('请输入昵称')
      this.$dialog.confirm({
        title: '',
        message: '确认修改昵称吗？',
        confirmButtonColor: '#000000',
        cancelButtonColor: '#999999'
      })
        .then(() => {
          this.setUserInfo(this.userInfo.avatar, this.nickName)
          this.nickName = ''
        })
        .catch(() => {
          // on cancel
        });
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      this.$dialog.confirm({
        title: '',
        message: '确认修改头像吗？',
        confirmButtonColor: '#000000',
        cancelButtonColor: '#999999'
      })
        .then(() => {
          this.$upload(file.file).then(res => {
            // console.log(res);
            this.setUserInfo(res.data.file)
          })

        })
        .catch(() => {
          // on cancel
        });
    },
    setUserInfo(avatar, nickname) {
      this.$post({
        module: 'User',
        interface: '1001',
        data: {
          avatar: avatar,
          nickname: nickname
        }
      }).then(res => {
        this.$toast(res.message)
        this.getUserInfo()
      })
    },
    // 获取用户信息
    getUserInfo() {
      /*this.$post({
        module: 'User',
        interface: '1000'
      })*/
      getUser().then(res => {
        // console.log(res,'个人信息')
        this.userInfo = res.data
      })
    },
  },
  created() {
    this.getUserInfo()
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;

  /deep/.van-hairline--top-bottom::after {
    border-width: 0;
  }

  .van-cell-group {
    background-color: #000000;

    /deep/ .van-cell::after {
      border: none;
    }

    .van-cell {
      color: #ffffff;
      border: none;
      background-color: #1b1b1b;
      margin-top: 12px;

      .van-cell__title {
        display: flex;
        align-items: center;

        .text {
          color: #ffffff;
        }

        .user_img {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          margin-right: 16px;
        }

        /deep/ [class*=van-hairline]::after {
          border: none;
        }

        /deep/.van-field {
          width: 80%;
          padding: 0;
          margin-top: 0;

          .van-cell__title {
            font-size: 16px;
            color: #000000;
            width: 50px;
          }

          .van-field__control {
            color: #ffffff;
          }

          .van-field__value {
            border-bottom: 1px solid #C4C4C4;
          }
        }
      }

      /deep/ .van-button--default {
        border: none;
        color: #ffffff;
      }

      .upload_img {
        width: 77px;
        height: 30px;
      }

      .van-button {
        width: 77px;
        height: 30px;
        background: #333333;
        border-radius: 4px 4px 4px 4px;
      }
    }
  }
}
</style>
