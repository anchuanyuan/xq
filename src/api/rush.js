import request from "@/utils/request.js";

//场次列表
export function goodlist(data) {
    return request({
        url: '/shopSite/list',
        headers: {
            isToken: true
        },
        method: 'post',
        data: data
    })
}