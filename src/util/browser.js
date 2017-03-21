module.exports = function() {
    var na = window.navigator,
        browserTester = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos)[ \/os]*([\d_.]+)/ig,
        ua = na.userAgent.toLowerCase(),
        browser = {
            platform: na.platform
        };
    ua.replace(browserTester, function(a, b, c) {
        var bLower = b.toLowerCase();
        if (!browser[bLower]) {
            browser[bLower] = c;
        }
    });
    if (browser.msie) {
        browser.ie = browser.msie;
        var v = parseInt(browser.msie, 10);
        browser['ie' + v] = true;
    }
    return browser;
}()