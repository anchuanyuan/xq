import request from '@/utils/request.js'

export function upload (file) {
    const formDate = new FormData()
    formDate.append("file", file)
    return request({
        url: 'common/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data', //
        },
        data: formDate
    })
}