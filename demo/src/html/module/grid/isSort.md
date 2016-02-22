#### 说明

- isSort ajax排序

排序的API是isSort，默认为false，值为true时，点击表头会传给服务器表头字段sort和排序类型sortType，效果示意图如下：

![ajax发送到服务器的数据](images/ajax_form_data.jpg)

- isSortCurrent 排序当前页

排序当前页中数据，默认false，该功能是字符串比较，使用时isSort必须是true，isPageCache必须是true。