import request from "@/utils/request.js";
export function goodsList(query) {
    return request({
        url: '/shopGood/limit',
        method: 'get',
        params: query
    })
}