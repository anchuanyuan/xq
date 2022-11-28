import request from '@/utils/request.js'

//获取轮播图列表
export function getswiperlist () {
  return request({
    url: '/shopCarousel/list',
    method: 'get',
  })
}