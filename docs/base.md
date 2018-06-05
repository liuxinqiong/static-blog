# 理论部分
不看也没关系，可以先看实践部分，后面再回过头看理论部分

## 组件化开发
为什么选择 React 组件，React 通过模块化，可重用和抽象性，简化了大型站点的开发，React 拥有大型开源组件生态，教程和工具都可以无缝的在 Gatsby 中使用。

## 设计原则
Gatsby 设计原则
* 约定 > 代码
* 提取逻辑和配置到插件是被鼓励的
* 插件很容易被开源和重用

从目录结构看约定，在初始化的项目中目录结果十分简单，如下
* components：存放 react 组件，这里没啥约定哈
* layouts：存放布局组件
  * 布局组件是你想要在多个页面共享的部分，比如通常会有共享的header和footer。其他通用的也可以是侧边栏和菜单导航栏等。
  * 注意：不同于绝大多数children属性，在布局组件组件，children属性是一个函数，需要被执行
* pages：存放页面，文件名称类似于路由组件的 path，可以作为 `gatsby-link` 提供的 `Link` 组件或 `navigateTo` 函数使用

## 插件系统
插件是实现了 Gatsby API 的 Node 包。他们使得你可以轻松解决站点构建常见问题。比如设置 Sass，添加 markdown 支持，处理图像等。

Gatsby 有着丰富的插件系统，你可以在[插件库](https://www.gatsbyjs.org/packages/)中查找浏览官方或社区的插件和文档。

常见的使用十分简单
1. 安装
2. gatsby-config.js 中配置

## GraphQL
在 React 组件中有很多方式加载数据，GraphQL 就是其中很流行的一种。

GraphQL 是 Facebook 发明，来帮助工程师拉取需要的数据。它是一门查询语言，和 SQL 非常类似。

为什么选择 GraphQL
* 消除前端数据样板
* 推动前端查询的复杂性
* 对于现代应用复杂/嵌套的数据依赖而言是非常完美的数据查询语言
* 通过删除数据膨胀来改善性能，GraphQL 是为什么 Gatsby 为何如此之快的很大一部分原因，因为它允许延迟加载特定的数据在特定的页面。

在组件中使用 GraphQL，查询的数据结构会自动插入你组件的 props.data 属性中。

> 查询只会在 Page 和 Layout 组件中指定，对于其他组件，你需要使用 GraphQL fragments

GraphQL 和 Gatsby 如何一起工作的
* 大部分人们在服务器使用 GraphQL 去动态响应来自客户端的数据请求。你需要为你的 GraphQL 定义 scheme，GraphQL 解析来源数据库或其他 API 的数据。
* Gatsby 在编译期使用 GraphQL，这是独一无二的，这意味着你不需要运行额外的服务（比如数据库或 node 服务）
* Gatsby 的 GraphQL scheme 来自哪里？大多数 GraphQL 的用法都是手动创建 GraphQL scheme。在 Gatsby 中，我们使用插件去拉取不同来源的数据，我们通过使用数据去自动推断出 GraphQL schema。

GraphQL 给予了 Gatsby 特别的特性。使得你可以控制数据转换
* 格式化日期
* Markdown，需要安装 gatsby-transformer-remark
* 图像处理，需要安装 gatsby-transformer-sharp，你还可以使用 gatsby-image 组件

## 添加图片，字体和文件
使用 webpack 我们可以在 JS 模块中引入文件，不同于 CSS imports，引入文件给你一个 string 值，这个值是你可以在代码中引用的最终路径。比如图片的 src 属性和按标签的 href 属性。

为了减少服务器请求，对于图片小于 10kb 的文件，返回一个 data URL 而不是路径。

在 GraphQL 中查询文件，使用 gatsby-source-filesystem 插件

我们通常推荐你在 JS 文件中 import 资源，这种机制提供以下几个好处
* script 和 stylesheets 会被压缩和打包，以此来减少额外的网络请求
* 丢失文件会导致编译错误，而不是对于的用户展示 404 错误
* 文件名称是内容的 hash，你不用担心浏览器缓存他们的老版本

static 文件夹，如果你将文件放在 static 文件夹中，他将不会被 webpack 处理，他将不受改变的拷贝到 public 文件夹下

何时使用 static 文件夹，static 文件夹作为一个变通方案，在少数情况下很有用
* 你需要具有特定名称的文件
* 你有上千的图片，而且需要动态引用他们
* 你需要在打包代码外引用小段脚本
* 一些库可能和 webpack 不相容

## 创建和修改页面
在 约定 > 代码中有说道，pages 文件下所有页面组件都可以直接访问，可是对于一些动态的内容，我们不可能手动涵盖到所有情况，比如我们接下来会说的如下情况
* 分页，因为我们不知道将来会有多少页
* 标签检索，我们不知道将来会有多少标签
* 文章详情页，文章肯定是可以很多且持续增长的

我们有三种方式创建页面
* 在 gatsby-node.js 中实现 API createPages
* Gatsby 自动将 src/pages 下 React 组件转成页面
* 插件（本质也是实现 createPages）

像上面这种情况，我们就不可能通过手动的方式创建页面，只能通过 API 的方式来解决。

选择页面布局：默认所有页面会使用`/layouts/index.js`布局。你可能需要为特定页面选择特定布局，你可以在使用 createPage 创建页面时选择布局组件，当使用 onCreatePage API 时，通过添加为 page 对象添加 layout key 来实现，所有在 `/layouts/` 文件夹下的组件都是自动可用的。

## Markdown 页面
Gatsby 可以通过 markdown 文件创建页面。
1. 通过 filesystem 去读文件
2. 将 markdown 转成 html 且格式化成数据
3. 为 markdown 页面创建页面组件
4. 使用 createPage API 创建页面

在 gatsby 中使用 gatsby-source-filesystem 读取文件。使用 gatsby-transformer-remark 将 markdown 转 HTML。

在书写 markdown 时，需要在文件的开头，增加如下块，你可以有不同的k-v对，这些块将被 gatsby-transformer-remark 解析为 frontmatter（前面事项），GraphQL API 将会在 React 中提供这些数据。
```
---
path: "/blog/my-first-post"
date: "2017-11-07"
title: "My first blog post"
---
```

使用 Gatsby 的 Node API 创建静态页面：Gatsby 在编译期间运行 createPages API，并且注入参数 boundActionCreators 和 graphql，使用 graphql 查询 markdown 文件数据，再使用 createPage 为每个 markdown 文件使用指定的模版文件去创建页面。

## 数据层
Gatsb y数据层：是 Gatsby 十分强大的特性，让你可以轻松地编译 Markdown、WordPress、headless CMSs 和其他数据来源

> 注意：Gatsby 数据层是借助于 GraphQL 的能力。

什么是数据？

用计算机科学角度而言，答案是：比如 string，integer，object 等

在 Gatsby 中，一个更有用的答案是：任何在 React 组件外的资源，可以是 WordPress，Markdown，CSV 等，同样可以来源于数据库或 API。

为啥 graphql 语句写在 React 组件中，应用不会报错呢？

Gatsby 从 Relay 借用技术在编译期间将我们的源代码转换成 AST（abstract syntax tree），所有的 graphql 标签的模版会被 parser.js 和 query.compiler.js 发现，然后将将它们从源代码中移除。这意味着 graphql 标签并不是在我们期望的地方执行。这就是为什么没有错误。

介绍一下即将会用到的数据插件和转换插件。在这之前介绍一下 GraphiQL。

GraphiQL：帮你正确构建查询数据的工具，是GraphQL整合在开发环境的IDE。在你构建Gatsby站点时，这是一个十分有用的工具。

通过访问`http://localhost:8000/___graphql`即可进入。基本使用
* Ctrl + Space 自动提示
* Ctrl + Enter 运行

### 数据插件
在 Gatsby 中，数据可以来源于任何地方，APIs，databases，CMSs，本地文件等。

数据插件从他们的数据源获取数据，比如 filesystem 插件如何从文件系统中获取数据，WordPress 插件如何从 WordPress API 中获取数据。

比如我们安装并配置 gatsby-source-filesystem 插件。重启服务，可以在 GraphiQL 中看到新添加 allFile 和 file 两个字段，将下面的语复制到 GraphiQL 中看看效果吧。
```js
{
  allFile {
    edges {
      node {
        relativePath
        prettySize
        extension
        birthTime
      }
    }
  }
}
```

### 转换插件
filesystem 插件帮助我们查询关于文件的数据，但如果我们想查询文件内的数据呢？

要实现这个，Gatsby 提供转换插件读取原内容，并且可以转换成可用的数据。

比如 Markdown 文件，你需要将Markdown转换成HTML。

此时我们需要安装并配置 gatsby-transformer-remark 插件，重启服务发现GraphiQL中新添加了 allMarkdownRemark 和 markdownRemark 字段，看例子如何使用
```js
{
  allMarkdownRemark {
    edges {
      node {
        frontmatter {
          title
          date
        }
        // 摘录
        excerpt
        timeToRead
        html
      }
    }
  }
}
```