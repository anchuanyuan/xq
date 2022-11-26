const path = require('path')

module.exports = {
  publicPath: './',
  lintOnSave:false,//关闭eslintre语法检查
  devServer: {
    proxy: {
      "/api": {
        // 如果需要使用正式地址测试，请将此处地址改为正式地址
        target: 'https://www.apis.xianqujingpin.com',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  productionSourceMap: false, //生产环境下减少项目体积
  outputDir: process.env.VUE_APP_OUTPUT_DIR,//打包后的目录名称，见 .env.dev  .env.prod 文件
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "src/css/public.less")] // 引入全局样式变量
    }
  }
};
// wx.config({
//   debug: true,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//   appId: appId,         // 必填，公众号的唯一标识，填自己的！
//   timestamp: timestamp, // 必填，生成签名的时间戳，刚才接口拿到的数据
//   nonceStr: nonceStr,   // 必填，生成签名的随机串
//   signature: signature, // 必填，签名，见附录1
//   jsApiList: [
//     'wx-open-launch-weapp',
//   ],
//   openTagList: ["wx-open-launch-weapp"] // 跳转小程序时必填
// })
// let _this = this
// wx.ready(function (res) {
//   console.log(res)
// })
// wx.error(function (res) {
//   // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
//   console.log(res)
// });
