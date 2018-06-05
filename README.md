# 从0到1，使用 Gatsbyjs 构建静态站点

## 初始化项目
Gatsby 官方提供 gatsby-cli 脚手架帮助我们快速的创建项目，不啰嗦，直接贴出如何创建项目，和项目提供的几个常用脚本命令。
```shell
# 全局安装
npm install --global gatsby-cli
# 创建项目（默认项目）
gatsby new gatsby-site
# 创建项目 （选择官网和社区提供的starters加快你的开发）
gatsby new [SITE_DIRECTORY] [URL_OF_STARTER_GITHUB_REPO]
# 开发模式-热更新
gatsby develop
# 编译
gatsby build
# 编译后本地测试
gatsby serve
```

## 发布站点
我的天，就到发布站点了，难道就要结束了？当然不是，先贴出发布步骤，主要原因有
1. 脚手架创建的项目本身就是可以直接发布并访问的
2. 学习本来是一件很痛苦的时，我们先看到效果，给自己一点正反馈嘛

发布站点在官网介绍有好几种选择，这里使用 GitHub Pages。

安装 gh-pages，并添加 npm script。
```shell
npm install gh-pages --save-dev
"scripts": {
  # --prefix-paths 配合 gatsby-config.js pathPrefix 使用
  "deploy": "gatsby build --prefix-paths && gh-pages -d public",
}
```

在 gatsby-config.js 配置文件中添加 pathPrefix，值为你 github 上项目的名称。如果不设置，你网站根目录可以访问，但是链接跳转时会 404，因为没有将项目名称加入路径。

然后在 Github 上创建项目，并通过 git 托管你当前的项目。