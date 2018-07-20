import axios from 'axios';
import qs from 'qs';
import store from '../store';
import Cache from './cache';
import { Message, Loading } from 'element-ui';
import ajaxURL from '../config';
import config from './config';
import Utils from './util.js';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? config.url.localTestUrl : config.url.productUrl;

let loadingInstance;
let utils = new Utils();

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
    let token = store.state.token || Cache.getSession('bier_token');

    if (type === 'GET') {
        return token?axios.get(url, {
            params: data,
            headers: {token},
        }):
        axios.get(url, {params: data});
    } else if (type === 'POST') {
        if (isJson) {
            return token ? axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                        token,
                    },
                }) :
                axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        }
        return token ? axios.post(url, qs.stringify(data), {
            headers: {token},
        }) : axios.post(url, qs.stringify(data));
    }else if (type === 'PUT') {
        return token?axios.put(url, data, {
            headers: { token},
        }):
        axios.put(url, data, {
            headers: {token},
        });
    } else if (type === 'DELETE') {
        return token?axios.delete(url, {
            params: data,
            headers: {token},
        }):
        axios.delete(url, {headers:{token},params: data});
    }
}

/**
 * require
 * @param {Object} params -> (url: String, [data: Object, type: 'POST'(default)/'GET', flag: Boolean])
 * @param params.url -> config define String, required
 * @param params.data -> require data object
 * @param params.type -> require method, default 'POST'
 * @param params.flag -> json require, default false
 */
function requestHandle(params) {
    let { url, data, type, flag } = params;
    return new Promise((resolve, reject) => {
        ajaxRequest(url, data, type, flag).then(
            res => {
                let { data, success, total, message } = res.data;

                // console.log('requestHandle-[%s]->', url, res.data);
                if (success === 1) {
                    resolve(res.data);
                } else {
                    if (data && data.islogin) {
                        store.commit('setUserId', undefined);
                        store.commit('setUserName', undefined);
                        store.commit('setUserNickName', undefined);
                        store.commit('setToken', undefined);
                        Cache.removeSession('bier_username');
                        Cache.removeSession('bier_token');
                        Cache.removeSession('bier_userid');
                        Cache.getSession('bier_usernickname') && Cache.removeSession('bier_usernickname');
                        // location.href = "/index";
                    }
                    reject(data);
                    Message.error({
                        message: utils.judgeLanguage(utils.getCurrLanguage(store, Cache), message),
                    });
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