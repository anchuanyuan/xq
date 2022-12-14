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
        data: data
    })
}

/* 删除地址 */
export function updateAddress(data) {
    return request({
        url: `/shopAddress/update`,
        method: 'post',
        data
    })
}

/* 修改地址 */
export function delAddress(idList) {
    return request({
        url: `/shopAddress/${idList}`,
        method: 'delete',
    })
}