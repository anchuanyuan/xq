import request from '@/utils/request.js'

// 登录方法
export function getBannerList() {
    return request({
        url: '/shopCarousel/list',
        method: 'get',
    })
}
