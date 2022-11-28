import request from "@/utils/request.js";

// 获取拍卖商品页数跟商品基本信息  上午场
export function pagelist(query) {
    return request({
        url: '/shopRobGood/getPage?shopSiteId=1',
        // headers: {
        //     isToken: true
        // },
        method: 'POST',
        data: query
    })
}

//获取拍卖上架列表
export function getSelllist() {
    return request({
        url:'/shopRobGood/getSellList',
        method:'post',
        // data: query
    })
}

//抢购商品详情
export function getByid(query) {
    return request({
        url:'/shopRobBuy/getById?id=1',
        method:'post',
        data: query
    })
}