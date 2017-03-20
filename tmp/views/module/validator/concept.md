#### html标签属性 ####

在html标签添加以 data-validator 开头的属性，在调用 nic.ui.validator 时会识别，配置校验规则一般也是在这个地方指定。

- data-validator：指定校验类型、指定类型的参数、指定改类型的浮动的提示位置，如：data-validator="length=2|{left:10,top:0}".

- data-validate-(校验类型)Text：指定类型的提示文字，如：data-validate-requiredText。

- data-validate-name：指定虚拟name用于同一类型等校验。

- data-validate-position：指定提示信息的浮动位置。

#### 占位符 ####

- 类型的提示文字占位符{{param}}是用于指定校验类型参数的设置，如：data-validator-lengthText="输入字符长度等于{{param}}个字符"。

- 校验值占位符{{value}}是指有值校验类型传参需要的值，目前用到的场景也只有ajax的情况，如：data-validator="ajax=http://127.0.0.1/api?param={{value}}"

#### 已有校验类型

##### 无值类型

- 必填 required

- 数字 number

- 整数 integer

- 正整数 digits

- 邮箱 email

- 网址 url

- 电话(含手机) phone

- 手机 mobile

- 自定义规则 process

- ajax校验 ajax

- 单选框/复选框 check

##### 有值类型

- 下拉框 select

- 浮点 floatNumber

- 固定长度 length

- 最小长度 minLength

- 最大长度 maxLength

- 最小值 minValue

- 最大值 maxValue

- ajax校验 ajax