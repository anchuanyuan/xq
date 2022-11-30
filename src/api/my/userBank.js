import request from "@/utils/request.js";

/*收款信息*/
// 收款类型 0:支付宝 1:银行卡 2:微信，不传查全部
export function userBankList() {
    return request({
        url: `/shopUserBank/list`,
        method: 'get',
    })
}
/*新增*/
export function addBank(data) {
    return request({
        url: `/shopUserBank/insert`,
        method: 'post',
        data
    })
}