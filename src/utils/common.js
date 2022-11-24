const emailReg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
const phoneReg = /^[1][0-9]{10}$/;
const pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
const pay = /^\d{6}$/;
const captcha = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6}$/;
const account = /^[a-zA-Z][a-zA-Z0-9_-]{2,16}$/i;

export default {
  isPass(value) {
    return pass.test(value);
  },
  isPay(value) {
    return pay.test(value)
  },
  isEmail(value) {
    return emailReg.test(value)
  },
  isPhone(value) {
    return phoneReg.test(value)
  },
  isCaptcha(value) {
    return captcha.test(value);
  },
  isAccount(value){
    return account.test(value)
  }
}