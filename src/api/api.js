import axios from 'axios';

// 创建一个 Axios 实例
const http = axios.create({
    baseURL: '', // 设置默认请求的基本URL
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
http.interceptors.request.use(
    config => {
        // 登录不需要 token
        if (config.url === '/api/auth/login' || config.url === '/api/auth/register') {
            return config;
        }
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error);
    }
);

// 封装 GET 请求
export const get = (url, params) => {
    return http.get(url, {params});
};

// 封装 POST 请求
export const post = (url, data) => {
    return http.post(url, data);
};

// 封装 PUT 请求
export const put = (url, data) => {
    return http.put(url, data);
};

// 封装 DELETE 请求
export const del = (url) => {
    return http.delete(url);
};

export default http;
