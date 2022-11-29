import request from "@/utils/request.js";
// 我的收益


/*今日收益*/
export function getDayInCome() {
    return request({
        url: `/shopUserFinancial/getDay`,
        method: 'get',
    })
}
/*查询累计收益*/
export function getInComeAll() {
    return request({
        url: `/shopUserFinancial/getNum`,
        method: 'get',
    })
}

/*分页查询所有数据*/
export function inComeList() {
    return request({
        url: `/shopUserFinancial/limit`,
        method: 'get',
    })
}


