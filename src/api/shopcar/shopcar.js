import request from "@/utils/request.js";


/*购物车列表*/
export function shopCartList() {
    return request({
        url: `/shopCart/getList`,
        method: 'get',
    })
}

/* 添加购物车 */
export function shopCartAdd(data) {
    return request({
        url: `/shopCart/insert`,
        method: 'post',
        data: data
    })
}

export function delShopCart(idList) {
    return request({
        url: `/shopCart/${idList}`,
        method: 'delete',
    })
}

