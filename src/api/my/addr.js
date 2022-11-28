// 地址
import request from "@/utils/request.js";

/* 地址详情*/
export function addressDetail(id) {
    return request({
        url: `/shopAddress/${id}`,
        method: 'get',
    })
}
/*我的地址列表*/
export function getAddress() {
    return request({
        url: `/shopAddress/getList`,
        method: 'get',
    })
}

/* 添加地址 */
export function addAddress(data) {
    return request({
        url: `/shopAddress/insert`,
        method: 'post',
        params: data
    })
}

/* 修改地址 */
export function changeAddress(data) {
    return request({
        url: `/shopAddress/update`,
        method: 'post',
        params: data
    })
}
