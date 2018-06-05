# 项目初始化与发布

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

现在你可以运行 npm run deploy 发布项目，正常的话，运行 https://username.github.io/project-name/ 此时可以访问你的站点了，但我在尝试中碰到问题
* npm run deploy 报错 A branch named 'gh-pages' already exists，需要运行 rm -rf node_modules/gh-pages/.cache 清除缓存
* 一开始访问出现404，后面突然好了，可能是 github 今天访问速度不佳的原因

> 运行 npm run deploy 之后，public 目录下所有的内容会被移到你仓库的 gh-pages 分支

如果希望直接通过 username.github.io 访问，而不需要添加 reponame，又称发布用户/组织站点，不同于项目，站点必须发布在 master 分支。此时我们不需要设置 prefix。
```shell
"deploy": "gatsby build && gh-pages -d public -b master",
```

如果你希望使用自己的域名，而不是 user.github.io，这也是可以的，具体看文档，这里没尝试过。大概步骤是：在根目录层 static 文件下 cname 文件写入你的域名，同时也不需要设置 pathPrefix，因为它会打破你站点的导航。pathPrefix 只有在站点不是在域名的根目录下才需要