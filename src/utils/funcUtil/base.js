// import post from "../request";
import Vue from 'vue'
import simpleTips from '@/components/simpleTips'


/**
 * 将日期转换成字符串格式
 * yyyy: 四位年，例：2020
 * yy: 两位年， 例：20
 * MM: 两位月, 例：05
 * M: 一位月，例：5 | 10
 * dd: 两位月，例：06 | 10
 * HH: 两位24制小时，例：09 | 22
 * H: 一位24制小时，例：9 | 22
 * hh: 两位12制小时，例：09 | 10
 * h: 一位12制小时，例：9 | 10
 * mm: 两位分钟，例：05 | 10,
 * m: 一位分钟，例：5 | 10,
 * ss: 两位秒，例：05 | 10,
 * s: 一位秒，例：5 | 10
 * 
 * @param { string } format 格式化类型，参考上面，如果有不需要被转换的字母，请用[]将其包裹（如非必要，请勿使用）
 * @returns { string } 返回指定格式的日期
 */
Date.prototype.format = function (format) {

  if (typeof format === "string") {
    let holder = format.match(/\[.+?\]/g);
    if (holder) {
      format = format.replace(/\[.+?\]/g, '[$]');
    }
    let year = this.getFullYear(),
      month = this.getMonth() + 1,
      date = this.getDate(),
      hour = this.getHours(),
      minute = this.getMinutes(),
      second = this.getSeconds(),
      hour_12 = hour > 12 ? hour - 12 : hour;
    let o = [
      [/yyyy/g, year],
      [/yy/g, (year + "").substring(2, 4)],
      [/MM/g, month > 9 ? month : "0" + month],
      [/M/g, month],
      [/dd/g, date > 9 ? date : "0" + date],
      [/d/g, date],
      [/HH/g, hour > 9 ? hour : "0" + hour],
      [/H/g, hour],
      [/hh/g, hour_12 > 9 ? hour_12 : "0" + hour_12],
      [/h/g, hour_12],
      [/mm/g, minute > 9 ? minute : "0" + minute],
      [/ss/g,
        second > 9 ? second : "0" + second
      ],
      [/s/g, second]
    ]
    o.forEach(item => {
      format = format.replace(item[0], item[1]);
    });
    if (holder) {
      holder.forEach(item => {
        format = format.replace("[$]", item.substr(1, item.length - 2));
      })
    }
    return format;
  }
}

export default {
  /**
   * @param {*} file 要上传的文件
   */
  // upload(file) {
  //   let formData = new FormData();
  //   formData.append("data", file);
  //   console.log(formData, file)
  //   return post({
  //     url: "/upload",
  //     data: formData
  //   });
  // },
  /**
   * 
   * @param {File} img 图片的File对象
   * @param {Boolean} compression 是否进行图片压缩
   */
  uploadImage(imgFile, compression = true) {
    // console.log(imgFile.file instanceof File)

    // 如果需要压缩则使用canvas进行图片压缩
    if (compression && imgFile.file.size > 1048576) {
      // 异步操作
      return new Promise((resolve) => {
        let reader = new FileReader();
        reader.readAsDataURL(imgFile.file);
        let image = new Image;
        reader.onload = function () {
          let width = 512, // 图像大小
            quality = 0.8, // 图像质量
            canvas = document.createElement("canvas"),
            drawer = canvas.getContext("2d");
          image.src = this.result;
          image.onload = function () {
            canvas.width = width;
            canvas.height = width * (image.height / image.width);
            drawer.drawImage(image, 0, 0, canvas.width, canvas.height);
            // 压缩成功
            resolve(canvas.toDataURL("image/png", quality));
          }
        }
      }).then(imgUrl => {
        let file = this.base64toFile(imgUrl, imgFile.file.name);
        return this.upload(file);
      });
    } else {
      // 不压缩
      return this.upload(imgFile.file);
    }
  },
  base64toFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
      type: mime
    });
  },
  /**
   * 将日期转换成字符串格式
   * yyyy: 四位年，例：2020
   * yy: 两位年， 例：20
   * MM: 两位月, 例：05
   * M: 一位月，例：5 | 10
   * dd: 两位月，例：06 | 10
   * HH: 两位24制小时，例：09 | 22
   * H: 一位24制小时，例：9 | 22
   * hh: 两位12制小时，例：09 | 10
   * h: 一位12制小时，例：9 | 10
   * mm: 两位分钟，例：05 | 10,
   * m: 一位分钟，例：5 | 10,
   * ss: 两位秒，例：05 | 10,
   * s: 一位秒，例：5 | 10
   * 
   * @param { Date } dateObj 日期对象
   * @param { string } format 格式话类型，参考上面
   * @returns { string } 返回指定格式的日期
   */
  dateToString(dateObj, format) {
    return dateObj.format(format);
  },
  /**
   * 获取uuid
   */
  getGuid() {
    function S4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  },
  /**
  * 微信支付
  * @param {String} params 支付参数
  * @extends {Promise<Number>} 异步支付结果
  */
  wxAppPay(params) {
    return new Promise((resolve, reject) => {
      window.payresult = (code) => {
        if (code == 1) {
          resolve(code);
        } else {
          reject(code);
        }
      }
      if (window.test && window.test.wxpay) {
        let json = `{"app_response":${params}}`
        console.log("支付信息：", json);
        window.test.wxpay(json);
      } else {
        reject(-1);
      }
    });
  },
  /**
  * 显示提示
  * 
  * @param config 配置项
  */
  showTips(config = tipsConfig) {
    // 如果提示实例不存在
    if (!this.simpleTipsInstance) {
      // 将vue文件加载为一个vue子类
      let SimpleTipsClass = Vue.extend(simpleTips);
      // 设置提示实例
      this.simpleTipsInstance = new SimpleTipsClass();
      document.body.style.overflow = 'hidden';
      document.body.appendChild(this.simpleTipsInstance.$mount().$el);
    } else {
      this.simpleTipsInstance.$off('confirm');
      this.simpleTipsInstance.$off('cancel');
    }

    // 初始化配置
    config = initShowTipsConfig(config);

    // 循环赋值配置项
    Object.keys(config).forEach((key) => {
      this.simpleTipsInstance.$props[key] = config[key];
    });

    this.simpleTipsInstance.$data.showPopup = true;

    return new Promise((resolve, reject) => {
      this.simpleTipsInstance.$on('confirm', resolve);
      this.simpleTipsInstance.$on('cancel', reject);
    });
  },
  ifnull,
  sleep(time = 800) {
    return new Promise((resole) => setTimeout(resole, time));
  },
  /**
   * 获取url参数对象，当vue router未加载或不方便使用时调用
   */
  getQuery() {
    let query = {};
    if (window.location.href && window.location.href.includes("?")) {
      window.location.href
        .substring(window.location.href.lastIndexOf("?") + 1)
        .split("&")
        .forEach((item) => {
          let strs = item.split("=");
          query[strs[0]] = strs[1] || "";
        });
    }
    return query;
  },
  /**
   * 列表请求测试
   * @param {Object} params 请求参数 testHandler(item) 内用来伪造数据，将处理后的对象return即可
   */
  testList(params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let list = [];
        for (let i = 1; i <= 10; i++) {
          let item = { id: parseInt(params.data.lastId, 10) + i }
          if (typeof params.testHandler === 'function') {
            let temp = params.testHandler(item, i);
            item = temp ? temp : item;
          }
          list.push(item);
        }
        resolve({
          currentPage: parseInt(params.data.page, 10),
          currentValue: 0,
          lastId: list[9].id,
          lastPage: 10,
          list,
          perPage: 10,
          total: 100,
        });
      }, 1000);
    });
  },
  positiveNumber(val, min = NaN, max = NaN) {
    if (typeof val !== 'string') {
      return val;
    }
    // 先把非数字的都替换掉，除了数字和.
    val = val.replace(/[^\d\\.]/g, '');
    // 必须保证第一个为数字而不是.
    val = val.replace(/^\\./, '');
    // 保证一次只有出现一个.而没有多个.
    val = val.replace(/\\.{2,}/g, '.');
    // 保证.只出现一次，而不能出现两次以上
    val = val.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    min = parseFloat(min);
    max = parseFloat(max);
    if (!isNaN(min) && !isNaN(max) && min >= max) {
      return val;
    }
    if (!isNaN(min) && val < parseFloat(min)) {
      val = min;
    }
    if (!isNaN(max) && val > parseFloat(max)) {
      val = max;
    }
    return val;
  }
}


export function ifnull(args1, args2) {
  return args1 === undefined || args1 === null ? args2 : args1;
}

function initShowTipsConfig(config) {
  if (typeof config === 'string') {
    config = {
      message: config,
    };
  }
  config.cancelText = ifnull(config.cancelText, '取消');
  config.confirmText = ifnull(config.confirmText, '确定');
  config.title = ifnull(config.title, '提示');
  config.message = ifnull(config.message, '');
  config.closeOnClickOverlay = ifnull(config.closeOnClickOverlay, false);
  config.showCancel = ifnull(config.showCancel, false);
  config.showConfirm = ifnull(config.showConfirm, true);
  return config;
}

const tipsConfig = {
  cancelText: "取消",
  confirmText: "确定",
  title: "提示",
  message: "",
  closeOnClickOverlay: false,
  showCancel: false,
  showConfirm: true
}