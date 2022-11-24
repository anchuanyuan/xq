<template>
  <span class="code-check" @click="clickIt"> {{ showText }} </span>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    placeholder: {
      type: String,
      default: "获取验证码",
    },
    unit: {
      type: String,
      default: "s",
    },
    interval: {
      type: [String, Number],
      default: 60,
    },
  },
  data() {
    return {
      time: 0,
      timer: -1,
    };
  },
  methods: {
    clickIt() {
      if (this.time <= 0) {
        let result = true;
        this.$emit("click", {
          stop: () => {
            result = false;
          },
          zero: () => {
            this.time = 0;
          },
        });
        if (result != false) {
          this.time = parseInt(this.interval);
          if (isNaN(this.time)) {
            this.time = 60;
          }
          this.timer = setInterval(() => {
            this.time--;
            if (this.time <= 0) {
              this.clear();
            }
          }, 1000);
        }
      }
    },
    clear() {
      if (this.timer !== -1) {
        clearInterval(this.timer);
        this.timer = -1;
      }
    },
  },
  computed: {
    showText() {
      return this.time > 0 ? this.time + this.unit : this.placeholder;
    },
  },
  destroyed() {
    this.clear();
  },
};
</script>

<style scoped lang="less">
</style>