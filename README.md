jQuery移动端动态四级联动选择面板

描述：可以传入只有一级或者二级的数据，该插件可以自动展示到相应级别的数据项

1、传入固定格式的数据如下：
```
var list = [
        [
            { "code": "0", "name": "个人", "parentId": "0" }, 
            { "code": "1", "name": "企业", "parentId": "1" }
        ], 
        [
            { "code": "1000", "name": "餐饮/食品", "parentId": "0" }, 
            { "code": "1001", "name": "线下零售", "parentId": "0" }
        ], 
        [
            { "code": "2001", "name": "食品", "parentId": "1000" }, 
            { "code": "2002", "name": "餐饮", "parentId": "1000" }, 
            { "code": "2003", "name": "便利店", "parentId": "1001" }, 
            { "code": "2004", "name": "其他零售", "parentId": "1001" }
        ],
        [
            { "code": "3001", "name": "熟食加工", "parentId": "2001" }, 
            { "code": "3002", "name": "餐饮加工", "parentId": "2001" }
        ]
    ];
```