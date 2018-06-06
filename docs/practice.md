# 实践开始

## 基础技能
官方文档中提到的技能有三个
* HTML/CSS/JS
* React
* GraphQL

> 如果会更好，如果不会也没关系，因为很多人正是通过学习 Gatsby 来学习 React 和 GraphQL

## 定制header
自己写一个简单的header啦，过

## 使用主题
在这里我们使用bootstrap主题。
```shell
npm install gatsby-plugin-typography typography-theme-bootstrap --save
```

使用十分简单，新建`utils/typography.js`，代码十分简单，我们可以手写自己的主题，去翻看`typography-theme-bootstrap`源码其实十分简单的。

这里需要在`gatsby-config.js`中配置一下插件。同时需要删除layout/index.js中对index.css的引入，或者主题样式会被覆盖，从而不生效。

## 关于404
直接在pages下添加404.js即可。在找不到对应路由时，会自动显示此404.

> note：在开发模式下，404无法被使用，因为gatsby定制了一个自己的404，来帮助你在开发中给你引导。

## about & contact
因为不是动态路由页面，直接在pages文件下创建即可。可以使用 graphQL 查询相关信息，比如 config 下的元数据，保证数据来源单一，方便维护

## 标签页
读取文章的标签，并按标签进行分组。安装两个插件
```shell
npm install gatsby-source-filesystem gatsby-transformer-remark --save
```

在 gatsby-config.js 下配置插件。

## createPage
这部分内容，算是gatsby比较符合和核心的内容了，在这里我们3部分是动态内容
* 分页
* 标签检索
* 文章详情

创建template文件夹，用来存放创建页面的模版，同时在gatsby-node.js中调用api手动创建。

多提一句分页，因为我们手动创建根页面，因此需要将pages/index.js删除，否则他会作为根页面使用。分页在这里使用antd ui提供的组件。