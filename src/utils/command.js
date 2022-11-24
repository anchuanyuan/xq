import Vue from 'vue'

////////////   自定义指令   //////////////
// 点击等待，传入一个方法；使用wait-click-time"设置等待时间默认500，单位毫秒。
Vue.directive("wait-click", {
  bind: function (el, params) {
    // 等待时间名称
    const waitClickTimeName = "wait-click-time";
    // 默认等待时间
    const defaultWaitTime = 500;
    let lastClickTime = -1;
    let temp = parseInt(el.getAttribute(waitClickTimeName));
    let waitTime = isNaN(temp) ? defaultWaitTime : temp;
    el.onclick = function (e) {
      let now = new Date().getTime();
      if (
        now - lastClickTime >= waitTime &&
        typeof params.value == "function" &&
        params.value(e) != false
      ) {
        lastClickTime = now;
      }
    };
  },
})

const INPUT_CHECK_BOX = {
  number: [
    /[^\d.]/g,
    {
      reg: /\.{2,}/g,
      value: "."
    },
    {
      reg: ".",
      value: "$#$",
    },
    /\./g,
    {
      reg: "$#$",
      value: ".",
    },
    {
      reg: "$##$",
      value: "-",
    },
  ],
  integer: [
    /[^\d-]/g,
    {
      reg: /^-/,
      value: "$##$",
    },
    /-/g,
    {
      reg: "$##$",
      value: '-'
    }
  ],
  positive: /\D+/g,
};

const getCheckMethod = (modifiers, vnode, el) => {
  let keys = Object.keys(modifiers);
  if (modifiers.number) {
    let digitI = keys.findIndex((k) => k.startsWith('digits'));
    if (digitI != -1) {
      let digits = parseInt(keys[digitI].replace("digits", ''));
      if (!isNaN(digits)) {
        return val => {
          let result = cycleReplace(val, INPUT_CHECK_BOX.number);
          let index = result.indexOf('.');
          return index == -1 ? result : result.substr(0, index + digits + 1);
        }
      }
    }
    return val => cycleReplace(val, INPUT_CHECK_BOX.number);
  } else if (modifiers.integer) {
    return val => cycleReplace(val, INPUT_CHECK_BOX.integer);
  } else if (modifiers.positive) {
    return val => cycleReplace(val, INPUT_CHECK_BOX.positive);
  } else if (modifiers.custom) {
    let customCheck = el.getAttribute("check-model-custom");
    if (customCheck) {
      let check = vnode.context[customCheck]
      if (typeof check == 'function') {

        return check;
      } else {
        return (val) => cycleReplace(val, check)
      }
    }
  }
  return val => val;
}

/**
 * 循环替换
 * 
 * @param {String} val 需要被替换的值
 * @param {Array} list 替换列表
 * @returns {String} 返回被替换后的值
 */
const cycleReplace = (val, list) => {
  if (list instanceof Array) {
    list.forEach(item => {
      if (typeof item == "string" || item instanceof RegExp) {
        val = val.replace(item, '');
      } else {
        val = val.replace(item.reg, item.value)
      }
    })
  } else if (list instanceof RegExp) {
    return val.replace(list, '')
  }
  return val;
}

/**
 * 检查绑定
 * 如果需要同时使用input事件，请使用【model-input】代替
 * 
 * @modifier number 只允许输入正数（可以是小数）
 * @modifier number.digits* 限制输入的小数位数
 * @modifier integer 整数，可以是复数
 * @modifier positive 正整数
 * @modifier custom 自定义，在check-model-custom属性中传入一个方法（将校验后的结果return回来）或一个正则表达式（将此正则表达式匹配的内容替换）或者一个正则表达式数组（将每一个匹配的内容替换为空，可以传对象，reg为正则表达式，value为被替换为的内容）
 */
Vue.directive("check-model", {
  bind: function (el, binding, vnode) {
    el.oninput = function (event) {
      el.value = getCheckMethod(binding.modifiers, vnode, el)(el.value);
      vnode.context[binding.expression.trim()] = el.value;
      let input = el.getAttribute("model-input");
      if (input && typeof vnode.context[input.trim()] == 'function') {
        vnode.context[input.trim()](event);
      }
    }
    el.value = binding.value;
  },
  update: function (el, binding) {
    el.value = binding.value;
  }
})

function setFlexNum(el, binding) {
  if (!isNaN(binding.value) && binding.value >= 0) {
    if (binding.modifiers.p) {
      el.style.flexBasis = binding.value + '%';
    } else {
      el.style.flex = binding.value;
    }
  } else if (binding.value != 0) {
    console.warn("v-flex-num需要一个大于零的数字")
  }
}

Vue.directive("flex-num", {
  bind: setFlexNum,
  update: setFlexNum
})

