#先创建项目
create-react-app 
#cnpm install --save-dev redux react-redux redux-thunk prop-types react-router-dom
#启动 npm start
#其次增加antd框架
yarn add antd 
#TDD指的是Test Drive Development，很明显的意思是测试驱动开发
#react 自带react-test-renderer 和 react-dom/test-utils 两兄弟。 
#Enzyme底层其实也是基于 react-test-renderer 和 react-dom/test-utils 的。但它在二者的基础上进行了封装提供了更加简单易用的查询、断言方法。
#Jest有一个集成的覆盖率报告器，可以很好地与ES6配合使用，无需配置。
#运行npm test -- --coverage（--在中间注意额外）以包括如下的覆盖率报告

#hooks 报错，Object is not a function 解决办法 cnpm i react@next react-dom@next

#增加了mockjs 1.根目录增加mock.js 2.index.js引入mockjs 3.根目录增加mock文件夹，放相对应的mockjs
