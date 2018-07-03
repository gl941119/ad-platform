export default class Util {
    /**
     * date format
     * @param {Date} date => new Date()
     * @param {String} type => 'date'(default)/'time'/'pureTime'
     */
    dateFormat(date, type = 'date') {
        if (date instanceof Date) {
            let mat = {};

            mat.Y = date.getFullYear();
            mat.M = this._check(date.getMonth() + 1); // Month+1
            mat.D = this._check(date.getDate());
            mat.H = this._check(date.getHours());
            mat.m = this._check(date.getMinutes());
            mat.s = this._check(date.getSeconds());

            let result;

            switch (type) {
                case 'time':
                    result = `${mat.Y}-${mat.M}-${mat.D} ${mat.H}:${mat.m}:${mat.s}`;
                    break;
                case 'pureTime':
                    result = `${mat.H}:${mat.m}:${mat.s}`;
                    break;
                default:
                    result = `${mat.Y}-${mat.M}-${mat.D}`;
                    break;
            }
            return result;
        } else if (typeof date === 'number') {
            try {
                let dateForm = new Date(date);
                let Y = dateForm.getFullYear();
                let M = this._check(dateForm.getMonth() + 1); // Month+1
                let D = this._check(dateForm.getDate());
                let H = this._check(dateForm.getHours());
                let m = this._check(dateForm.getMinutes());
                let s = this._check(dateForm.getSeconds());
                let result;

                switch (type) {
                    case 'time':
                        result = `${Y}-${M}-${D} ${H}:${m}:${s}`;
                        break;
                    case 'pureTime':
                        result = `${H}:${m}:${s}`;
                        break;
                    default:
                        result = `${Y}-${M}-${D}`;
                        break;
                }
                return result;
            } catch (error) {
                console.error('date params error!', date, error);
            }
        } else {
            return date;
        }
    }
    // 检查是不是两位数字，不足补全
    _check(str) {
        str = str.toString();
        if (str.length < 2) {
            str = '0' + str;
        }
        return str;
    }

    // power add and delete
    arrayAddOrDel(sel, ids, list) {
        try {
            let temp = list.filter(item => !ids.includes(item));

            temp.push(...sel);
            return temp;
        } catch (error) {
            console.error('arrayAddOrDel ->', error);
            return [];
        }
    }

    // 深度复制对象
    deepClone(target) {
        let ctx = this;
        let result = {};

        if (typeof target === 'object') {
            if (target instanceof Array) {
                result = [];
            } else if (target instanceof Date) {
                result = new Date(target);
            }

            for (let key in target) {
                result[key] = typeof target[key] === 'object' ? ctx.deepClone(target[key]) : target[key];
            }
        } else {
            result = target;
        }
        return result;
    }

    // 毫秒数 转 天 小时 分钟 秒
    formatDuring(mss) {
        try {
            var days = parseInt(mss / (1000 * 60 * 60 * 24));
            var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = parseInt(((mss % (1000 * 60)) / 1000));
            return [this._check(days), this._check(hours), this._check(minutes), this._check(seconds)];
        } catch (error) {
            console.error('formatDuring error_>', error);
            return [];
        }
    }
}
