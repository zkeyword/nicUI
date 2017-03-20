export function render(tpl, data) {
    var code = 'var p=[];with(this){p.push(\'' +
        tpl
            .replace(/[\r\t\n]/g, ' ')
            .split('<%').join('\t')
            .replace(/((^|%>)[^\t]*)'/g, '$1\r')
            .replace(/\t=(.*?)%>/g, '\',$1,\'')
            .split('\t').join('\');')
            .split('%>').join('p.push(\'')
            .split('\r').join('\\\'')
        + '\');}return p.join(\'\');';
    return new Function(code).apply(data);
}