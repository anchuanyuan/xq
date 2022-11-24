<template>
  <div id="app">
    <!-- <transition name="router-switch" mode="out-in"> -->
    <router-view />
    <!-- </transition> -->
    <van-overlay z-index="2999" :show="$store.state.isLoadding" @click.stop>
      <div class="loadding-out">
        <van-loading class="all-loadding" size="24" type="spinner" />
      </div>
    </van-overlay>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  created() {
    // 检测更新
    // window.changeversion = this.checkUpdate;
  },
  methods: {
    checkUpdate(...arg) {
      let version = arg[0].toString().split("").join(".");
      this.$post({
        module: "Utils",
        interface: "1002",
        data: {
          platform: 1,
          version,
        },
      })
        .then((res) => {
          window.test.version(JSON.stringify(res));
        })
        .catch((err) => {
          console.log("检测更新失败", err);
        });
    },
  },
};
</script>

<style lang="less">
@import url("./css/public.css");

/** 过度动画 */
.router-switch-enter-active,
.router-switch-leave-active {
  transition: opacity 0.3s;
}
.router-switch-enter,
.router-switch-leave-to {
  opacity: 0;
}

/** 卡片打开关闭动画 */
.anim-simple-up-enter-active,
.anim-simple-up-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.anim-simple-up-enter,
.anim-simple-up-leave-to {
  opacity: 0;
  transform: translateY(-50%) scaleY(0.5);
}

*::-webkit-scrollbar {
  display: none;
}

#app {
  min-height: 100vh;
  background-color: #121212;
  color: @base-color;
  font-size: @base-size;
}

body {
  margin: 0;
  overflow: auto;
}

input {
  background: unset;
  outline: none;
  border: none;
  width: 100%;
  color: inherit;

  &::placeholder {
    color: @holder-color;
  }
}

* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;

  &.router-link {
    color: @theme-color;
  }
}

.loadding-out {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.custom-class {
  background: rgba(248, 248, 248, 0.82) !important;
  border-radius: 14px 14px 14px 14px !important;
  opacity: 1;
  filter: blur(undefinedpx) !important;
  .van-dialog__footer {
    background: transparent !important;
    .van-button--default {
      border: 0.02667rem solid #3f3f3f;
      background: transparent !important;
    }
    .van-dialog__confirm {
      color: #007aff;
    }
  }
}
</style>
