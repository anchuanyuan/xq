import request from "@/utils/request.js";

// 获取拍卖商品页数跟商品基本信息  上午场  有商品基本信息但是除了没有价格其余都有但是只有一个数据  后端要求两个接口合并使用
//真是不知道怎么合并
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

//还有七个接口（明天这些东西都要做完 最好明天 明天加班也要弄出来）

// 明天开始就是找点击购买的接口（然后再改商品列表的样式）
// 抢购商品的接口不知道是那个接口
// 抢购详情有两个接口（点击购买应该就是这个接口）
// 取消上架也是两个接口（目前还不知道取消上架应该在那调）
//上架商品也是不知道应该在哪里调  （可能没有写这个页面）（上架商品页面不知道应该在哪里写效果图：挂卖上架----明天问项目经理）
//上传凭证是在我的仓库里的  样式没有改（上传凭证是在我的仓库里面页面应该也没写）
//确认收款也是不知道在哪 （这个应该是  我的仓库里的支付确认）
//我的挂卖不知道应该在哪  应该是还没有写页面（明天问问我的挂卖页在哪）
