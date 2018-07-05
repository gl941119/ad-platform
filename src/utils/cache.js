/**
 * bier_token     ->     token
 * bier_userid    ->     user id
 * bier_username  ->     account
 * bier_usernickname    ->      nickname
 */
export default {
    getSession(name) {
        if (!name) return;
        return window.sessionStorage.getItem(name);
    },
    setSession(name, content) {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.sessionStorage.setItem(name, content);
    },
    removeSession(name) {
        if (!name) return;
        window.sessionStorage.removeItem(name);
    },
    getLocal(name) {
        if (!name) return;
        return window.localStorage.getItem(name);
    },
    setLocal(name, content) {
        if (!name) return;
        if (typeof content !== 'string') {
            content = JSON.stringify(content);
        }
        window.localStorage.setItem(name, content);
    },
    removeLocal(name) {
        if (!name) return;
        window.localStorage.removeItem(name);
    },
};