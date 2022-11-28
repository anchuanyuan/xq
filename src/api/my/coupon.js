import request from "@/utils/request.js";

/* 优惠券详情*/
export function addressDetail(id) {
    return request({
        url: `/shopAddress/${id}`,
        method: 'get',
    })
}
/*我的优惠券列表*/
export function shopGrantList() {
    return request({
        url: `/shopGrant/getList`,
        method: 'get',
    })
}

/* 添加优惠券 */
export function addAddress(data) {
    return request({
        url: `/shopAddress/insert`,
        method: 'post',
        params: data
    })
}

/* 修改优惠券 */
export function updateAddress(data) {
    return request({
        url: `/shopAddress/update`,
        method: 'post',
        params: data
    })
}

/* 修改优惠券 */
export function delAddress(idList) {
    return request({
        url: `/shopAddress/${idList}`,
        method: 'delete',
    })
}