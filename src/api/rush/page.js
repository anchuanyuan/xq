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

//获取拍卖上架列表(抢购上午场下午场商品列表)  这里是抢购商品列表但接口中只有价格
export function getSelllist(query) {
    return request({
        url:'/shopRobGood/getSellList?shopSiteId=1&size=1',
        method:'post',
        data: query
    })
}

//挂卖详情
export function getBylist(query) {
    return request({
        url:'/shopRobSell/getById?id=1',
        method:'post',
        data: query
    })
}
//抢购商品详情  （图片是轮播图  没有商品详情介绍 商品编号 还有抢购时间）
export function getByid(query) {
    return request({
        url:'/shopRobBuy/getById?id=1',
        method:'post',
        data: query
    })
}

//抢购商品（我打印出来是商品不存在  不知道调哪里需要这个接口  明天问问）
export function robBuy(query) {
    return request({
        url:'/shopRobGood/robBuy?index=1&robSellId=1&shopSiteId=1&size=1',
        method:'post',
        data: query
    })
}

//抢购详情  (这个不知道是哪处的ID)
export function getById(query) {
    return request({
        url:'/shopRobBuy/getById?id=1',
        method:'post',
        data: query
    })
}

//抢购商品详情（这是点击商品详情页立即购买的接口）这一个要调两个接口
export function inFolist(query) {
    return request({
        url:'/shopRobGood/info?index=1&robSellId=1&shopSiteId=1&size=1',
        method:'post',
        // headers: {
        //     isToken: true
        // },
        data: query
    })
}
