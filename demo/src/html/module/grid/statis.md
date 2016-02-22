#### 说明

##### 列统计

- statis statis接口是一个json格式的数据，display是统计的名称；type是统计的类型，共有sum、avg、min、max四种类型，暂不支持其他复杂形式的统计。

- 该接口是columns数组里面的数据的一个属性，用来放置statis接口display的名字，不设置将默认第一列。

- 该接口是columns数组里面的数据的一个属性，用来指定statis要统计的类型。

##### 行统计

- statis 该接口是columns数组里面的数据的一个属性，若不设置或为false，行统计值为undefined。

- statisType 该接口是columns数组里面的数据的一个属性，用来指定statis要统计的类型。