<template>
  <div class="app-header-placeholder">
    <div class="app-header-vue" :class="{ 'static-bar': staticBar }">
      <div class="header_left" @click="onClickLeft">
        <!-- <img src="@/assets/img/back.png" class="header_back" @click="onClickLeft" /> -->
        <slot name="left">
          <!-- <van-icon
            v-if="!isback"
            class="header_i_back"
            @click="onClickLeft"
            name="arrow-left"
          /> -->
          <img src="../assets/img/back_btn@2x2.png"  v-if="isback" alt="" class="back-icon" />
        </slot>
      </div>
      <div class="header_title" @click="dbclick">
        {{ title }}
      </div>
      <div class="header_right" @click="onClickRight">
        <slot name="right">
          {{ rightText }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * /////////// prop ///////////
 * {title:String} 标题，默认值""，可选值任意字符串
 * {isback:Boolean} 是否展示返回键，默认值展示，传入true隐藏返回键
 * {url:String} 点击返回键跳转的路由，默认值返回上一页，可传入任意页面路由
 * {righturl:String} 点击右侧区域跳转的路由，默认不跳转，可传入任意页面路由
 * {rightText:String} 右侧区域文字，默认不显示，可选值任意字符串
 * {background:String} 头部栏背景色，默认透明，可选值任意可被css3解析的颜色值
 *
 * /////////// event ///////////
 * clickRight:Function 点击右侧区域事件，事件参数为一个回调方法，调用此回调方法阻止路由跳转
 * clickLeft:Function 点击左侧区域事件，事件参数为一个回调方法，调用此回调方法阻止路由跳转
 * dbclick:Function 双击标题事件
 *
 * /////////// slot /////////////
 * right->右侧区域插槽
 * left->左侧区域插槽
 */
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    isback: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: "",
    },
    righturl: {
      type: String,
    },
    rightText: {
      type: String,
      default: "",
    },
    staticBar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      lastClick: -1,
    };
  },
  methods: {
    dbclick() {
      let now = new Date().getTime();
      if (now - this.lastClick <= 500) {
        this.$emit("dbclick", "安迪烦的");
      }
      this.lastClick = now;
    },
    onClickLeft() {
      this.onClickBtn("clickLeft", this.url);
    },
    onClickRight() {
      this.onClickBtn("clickRight", this.righturl);
    },
    onClickBtn(event, url) {
      let res = true;
      this.$emit(event, () => {
        res = false;
      });
      if (!res || url == undefined) {
        return;
      }
      if (url === "") {
        this.$router.go(-1);
      } else {
        this.$router.push(url);
      }
    },
  },
};
</script>

<style scoped="scoped" lang="less">
.app-header-placeholder,
.app-header-vue {
  // height: @app-header-height;
  height: 50px;
}

.app-header-vue {
  padding: 20px;
  position: fixed;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  background-color: #1B1B1B;
  &.static-bar {
    position: unset;
  }
}

.header_left,
.header_right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  // color: @theme-color;
  color: #999999;
  font-size: 13px;
}

.header_left {
  left: 10px;
}

.header_title {
  font-size: 18px;
  // color: @title-color;
  color: #FFFFFF;
}

.back-icon {
  width: 20px;
  height: 20px;
  vertical-align: middle;
}

.header_i_back {
  font-size: 22px;
  vertical-align: middle;
}

.header_right {
  right: 10px;
}
</style>
