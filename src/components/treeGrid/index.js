var Base = require('base')
var tool = require('../../util/tool')
var html = require('./index.handlebars')
var tool = require('../../util/tool')

var Code = function (obj) {
    this.obj = obj
}

Code.prototype.init = function () {
    var str = '',
        deep = 3, // 从1计
        level = 0,
        isFirst = false,
        columns = this.obj.columns,
        columnsDiff = columns.length - deep,
        // XXXX
        render = function (item, num, isReset) {
            if (isReset) {
                level = 1
            }
            if (columns[num] && tool.isFunction(columns[num].render)) {
                // console.log(item.name, num, isReset)
                return columns[num].render(item)
            }
            return item.name
        },
        fn = function (data) {
            var tree = function (data) {
                var i = 0,
                    l = data.length;
                level++
                if (level === deep) {
                    level = 1
                }
                for (; i < l; i++) {
                    (function (i) {
                        var item = data[i],
                            isLast = !!data[i + 1]
                        if (item.children) {
                            str += '<td rowspan=' + item.children.length + '>' + render(item, 1) + '</td>' //XXXX
                            if (!item.num) {
                                str += '<td></td>'
                                for (var m = 0; m < columnsDiff; m++) {
                                    str += '<td></td>'
                                }
                                str += '</tr><tr>'
                                level = 1
                            }
                            tree(item.children);
                        } else if (i + 1 == l) {
                            str += '<td>' + render(item, 2) + '</td>'  //XXXX
                            for (var m = 0; m < columnsDiff; m++) {
                                str += '<td>' + render(item, m + deep) + '</td>'
                            }
                            str += '</tr><tr>'
                        } else {
                            // console.log(item, level)
                            if (i === 0) {
                                str += '<td>' + render(item, 2) + '</td>' //XXXX
                                if (isLast) {
                                    for (var m = 0; m < columnsDiff; m++) {
                                        str += '<td>' + render(item, m + deep) + '</td>'
                                    }
                                }
                                str += '</tr><tr>'
                            } else {
                                str += '<td>' + render(item, 2) + '</td>' //XXXX

                                //new 
                                for (var m = 0; m < columnsDiff; m++) {
                                    str += '<td>' + render(item, m + deep) + '</td>'
                                }
                                str += '</tr><tr>'
                            }
                        }
                        // console.log( data[i+1], isLast, level, i )
                    })(i)
                }
            }

            var i = 0,
                d = data.list,
                l = d.length;

            for (; i < l; i++) {
                str += '<tr>';
                (function (i) {
                    var dd = d[i];
                    if (dd.children && dd.num) {
                        str += '<td rowspan=' + dd.num + '>' + render(dd, 0) + '</td>';
                        tree(dd.children);
                    } else {
                        str += '<td>' + dd.name + '</td>';
                        if (deep - dd.num > 1) {
                            for (var b = 0; b < columns.length - 1; b++) {
                                str += '<td></td>';
                            }
                        }
                    }
                })(i)
                str += '</tr>';
            }
        }

    fn(this.obj.data);

    str = str.replace(/<tr><\/tr>/g, '');

    $(this.obj.target).html(html({}));

    var thead = $(this.obj.target).find('thead'),
        tbody = $(this.obj.target).find('tbody')

    tbody.html(str)
    thead.html(function () {
        var s = '';
        for (var i = 0, l = columns.length; i < l; i++) {
            s += '<th>' + columns[i].display + '</th>';
        }
        return s;
    });
}

Code.prototype.ajaxGetData = function (callback) {
    var self = this,
        ajax = this.obj.ajax;

    $.ajax({
        type: ajax.type === undefined ? 'GET' : ajax.type,
        url: ajax.url,
        cache: false,
        dataType: "json",
        data: ajax.data,
        beforeSend: function () {
            if (tool.isFunction(ajax.beforeSend)) {
                ajax.beforeSend();
            }
        },
        success: function (data) {
            if (tool.isFunction(ajax.success)) {
                ajax.success(data);
            }
            if (tool.isFunction(callback)) {
                self.obj.data = data;
                callback();
            }
        },
        error: function (data) {
            if (tool.isFunction(ajax.error)) {
                ajax.error(data);
            }
        }
    });
}

Code.prototype.refreshData = function () {

}

var code,
    TreeGrid = function (obj) {
        code = new Code(obj);
        code.ajaxGetData(function () {
            code.init();
        });
    }

TreeGrid.prototype = new Base();

TreeGrid.prototype.refresh = function () {
    code.ajaxGetData(function () {
        code.init()
    })
}

module.exports = function (obj) {
    return new TreeGrid(obj);
}