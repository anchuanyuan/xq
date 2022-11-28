import request from "@/utils/request.js";

/*我的优惠券列表*/
export function shopGrantList() {
    return request({
        url: `/shopGrant/getList`,
        method: 'get',
    })
}