/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios';
//默认超时时间
axios.defaults.timeout = 60000;
//返回其他状态码
axios.defaults.validateStatus = function (status) {
    return status >= 200 && status <= 500;
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
//http request拦截
axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
});
//http response 拦截
axios.interceptors.response.use(res => {
    //获取状态码
    const status = res.status;
    if (status !== 200) {
        return Promise.resolve(new Error(res.text))
    }
    return res;
}, error => {
    return Promise.reject(new Error(error));
});
export default axios;
