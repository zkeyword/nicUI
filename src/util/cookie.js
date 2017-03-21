module.exports = {
    /**
     * 设置cookie
     * @param {String} cookie的名称
     * @param {String} cookie的值
     * @param {String} cookie的有效期
     * @param {String} cookie的域名
     * @param {String} cookie存放的路径
     * @return {Boolean}
     */
    set: function(name, value, hour, domain, path) {
        if (hour) {
            var today = new Date(),
                expire = new Date();
            expire.setTime(today.getTime() + 36E5 * hour);
        }
        document.cookie = name + "=" + encodeURI(value) + "; " + (hour ? "expires=" + expire.toGMTString() + "; " : "") + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "");
        return true;
    },

    /**
     * 获取cookie
     * @param {String} cookie的名称
     * @return {String} cookie的值
     */
    get: function(name) {
        var r = new RegExp("(?:^|;+|\\s+)" + name + "=([^;]*)"),
            m = document.cookie.match(r);

        return unescape(decodeURI(!m ? "" : m[1]));
    },

    /**
     * 删除cookie
     * @param {String} cookie的名称
     * @param {String} cookie的域名
     * @param {String} cookie存放的路径
     */
    del: function(name, domain, path) {
        document.cookie = name + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (path ? "path=" + path + "; " : "path=/; ") + (domain ? "domain=" + domain + ";" : "");
    }
}