import request from '@/utils/request.js'

export function getswiperlist (params) {
  return request({
    url: '/shopCarousel/list',
    method: 'get',
    params
  })
}