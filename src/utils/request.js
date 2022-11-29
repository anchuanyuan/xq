import axios from 'axios'
import {Toast} from 'vant'
import store from '@/store'

function getToken() {
    return localStorage.getItem("USER_TOKEN")
}


const cache = {
    session : {
        set (key, value) {
            if (!sessionStorage) {
                return
            }
            if (key != null && value != null) {
                sessionStorage.setItem(key, value)
            }
        },
        get (key) {
            if (!sessionStorage) {
                return null
            }
            if (key == null) {
                return null
            }
            return sessionStorage.getItem(key)
        },
        setJSON (key, jsonValue) {
            if (jsonValue != null) {
                this.set(key, JSON.stringify(jsonValue))
            }
        },
        getJSON (key) {
            const value = this.get(key)
            if (value != null) {
                return JSON.parse(value)
            }
        },
        remove (key) {
            sessionStorage.removeItem(key);
        }
    },

    localCache : {
    set (key, value) {
        if (!localStorage) {
            return
        }
        if (key != null && value != null) {
            localStorage.setItem(key, value)
        }
    },
    get (key) {
        if (!localStorage) {
            return null
        }
        if (key == null) {
            return null
        }
        return localStorage.getItem(key)
    },
    setJSON (key, jsonValue) {
        if (jsonValue != null) {
            this.set(key, JSON.stringify(jsonValue))
        }
    },
    getJSON (key) {
        const value = this.get(key)
        if (value != null) {
            return JSON.parse(value)
        }
    },
    remove (key) {
        localStorage.removeItem(key);
    }
}
}

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: process.env.VUE_APP_BASE_API,
    // 超时
    timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    if (getToken() && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    if ((config.method === 'get' || config.method === 'post') && config.params) {
        let url = config.url + '?' + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
        const requestObj = {
            url: config.url,
            data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
            time: new Date().getTime()
        }
        const sessionObj = cache.session.getJSON('sessionObj')
        if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
            cache.session.setJSON('sessionObj', requestObj)
        } else {
            const s_url = sessionObj.url;                  // 请求地址
            const s_data = sessionObj.data;                // 请求数据
            const s_time = sessionObj.time;                // 请求时间
            const interval = 1000;                         // 间隔时间(ms)，小于此时间视为重复提交
            if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
                const message = '数据正在处理，请勿重复提交';
                console.warn(`[${s_url}]: ` + message)
                return Promise.reject(new Error(message))
            } else {
                cache.session.setJSON('sessionObj', requestObj)
            }
        }
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

const errorCode = {
    '401': '认证失败，无法访问系统资源',
    '403': '当前操作没有权限',
    '404': '访问资源不存在',
    'default': '系统未知错误，请反馈给管理员'
}

// 响应拦截器
service.interceptors.response.use(res => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200;
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode['default']
        // 二进制数据则直接返回
        if(res.request.responseType ===  'blob' || res.request.responseType ===  'arraybuffer'){
            return res.data
        }
        if (code === 401) {
            Toast.fail({ message: msg })
            // store.commit("removeUser","USER_TOKEN")
            localStorage.removeItem("USER_TOKEN"); //  退出登录
            // 跳转登录
            this.$router.replace('/login')
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            Toast.fail({ message: msg })
            return Promise.reject(new Error(msg))
        } else if (code === 601) {
            Toast.fail({ message: msg })
            return Promise.reject('error')
        } else if (code !== 200) {
            Toast.fail({ message: msg })
            return Promise.reject('error')
        } else {
            return res.data
        }
    },
    error => {
        console.log('err' + error)
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        Toast.fail({ message: message })
        return Promise.reject(error)
    }
)

function tansParams(params) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && value !== "" && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
                        let params = propName + '[' + key + ']';
                        var subPart = encodeURIComponent(params) + "=";
                        result += subPart + encodeURIComponent(value[key]) + "&";
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&";
            }
        }
    }
    return result
}



export default service
