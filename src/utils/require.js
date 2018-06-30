import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import {Loading} from 'element-ui';
import ajaxURL from '../config';
import config from './config';

// axios.defaults.baseURL = config.url.localTestUrl;
console.log('process.env.NODE_ENV_>', process.env.NODE_ENV);
axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? config.url.localTestUrl : config.url.productUrl;

let loadingInstance;

axios.interceptors.request.use(config => {
    loadingInstance = Loading.service({
        lock: true,
        text: 'Loading...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.5)',
        fullscreen: true,
    });
    return config;
}, err => {
    loadingInstance.close();
    return Promise.reject(err);
});

axios.interceptors.response.use(data => {
    loadingInstance.close();
    return data;
}, err => {
    loadingInstance.close();
    return Promise.reject(err);
});

async function ajaxRequest(url = '', data = {}, type = 'POST', isJson = false) {
    type = type.toUpperCase();
    url = ajaxURL[url];
    if (type === 'GET') {
        return axios.get(url, {params: data});
    } else if (type === 'POST') {
        if (isJson) {
            return axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
        return axios.post(url, qs.stringify(data));
    }
}
function requestHandle(params) {
    let {url, data, type, flag} = params;
    return new Promise((resolve, reject) => {
        ajaxRequest(url, data, type, flag).then(
            res => {
                let {data, success, total, message} = res.data;
    
                // console.log('requestHandle-[%s]->', url, res.data);
                if (success === 1) {
                    resolve(res.data);
                } else {
                    resolve(res)
                }
            },
            rej => {
                console.error('[%s] error', url, rej);
                reject(rej)
            }
        );
    })
    
}

export default requestHandle;
