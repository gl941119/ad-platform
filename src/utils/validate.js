export default {
    /**
     * 验证模式方法
     * @param {String} tip -> 必填的提示文字
     * @param {String} msg -> 不符合匹配的提示文字
     * @param {Function} cb -> 匹配模式
     */
    validateTest(tip, msg, cb) {
        return function(rule, value, callback) {
            if (!value) {
                callback(new Error(tip));
            } else if (!cb(value)) {
                callback(new Error(msg));
            } else {
                callback();
            }
        }
    }
}