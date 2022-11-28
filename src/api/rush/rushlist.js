import request from "@/utils/request.js";

//场次列表
export function rushlist(query) {
    return request({
        url: '/shopSite/list',
        // headers: {
        //     isToken: true
        // },
        method: 'POST',
        data: query
    })
}