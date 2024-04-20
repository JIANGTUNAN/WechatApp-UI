

# 畅享咖-微信小程序

一个咖啡店的分享发布平台，拟在通过该平台能够展示面咖啡店的分布图及店铺咖啡产品的信息，并能够根据分布图及产品分享信息提供合理的推荐建议

<br />

本篇readme.md面向开发者
 
## 目录

- [上手指南](#上手指南)
  - [开发前的配置要求](#开发前的配置要求)
  - [安装步骤](#安装步骤)
- [文件目录说明](#文件目录说明)
- [开发的架构](#开发的架构)
- [部署](#部署)
- [作者](#作者)
- [鸣谢](#鸣谢)

### 上手指南

该项目针对微信小程序开发，无法正常运行在H5页面



###### 开发前的配置要求

1. HbuilderX 3.x版本
2. 微信开发者工具
3. HbuilderX 插件:scss/sass编译、uniapp(Vue2)编译

###### **运行步骤**

1. 安装配置好所需软件及插件
2. 在manifest.json的微信小程序配置->微信小程序AppID中填入你的AppID
```manifest.json
...
"mp-weixin" : {
    "appid" : "你的AppID",
}
...
```
3. 在HbuilderX的菜单中，运行->运行到小程序模拟器->微信开发者工具


### 文件目录说明


```
项目目录 
├── .hbuilderx               // 编辑器项目配置
├── /api/				
│  └── api.js		 		 // api接口信息文件
├── /pages/					 // 页面文件夹
│  ├── /comment/			 
│  │  ├── index.vue			 // 评论详情页面
│  │  ├── postComment.vue	 // 发送评论组件
│  │  └── replay.vue		 // 评论回复详情页面
│  ├── /component/			 
│  │  └── swiperList.vue	 // 轮播组件
│  ├── /detail/			 	
│  │  └── detail.vue	 	 // 店铺详情
│  ├── /login/			 
│  │  └── login.vue	 		 // 登录页
│  ├── /map/			 
│  │  └── map.vue	 		 // 地图页
│  ├── /my/			 
│  │  ├── /collection/			 
│  │  │  └── collection.vue	 // 集咖页
│  │  ├── /data/			 
│  │  │  └── data.vue	 	 // 个人资料修改
│  │  └──my.vue				 // 个人信息
│  ├── /productList/		 
│  │  ├── productDetail.vue	 // 产品详情弹窗组件
│  │  └── productList.vue	 // 所有产品页面
│  └── /wiki/			 
│  │  ├── bean_detail.vue	 // 咖啡豆详情页面
│  │  └── wiki.vue		 	 // 科普页面
├── /request/			 
│  └── request.js	 		 // 请求函数封装
├── /static/				 // 资源目录
│  │...	  
├── /util/				 	 // 公用函数方法、数据
│  │...	  
├── /uview-ui/				 // 组件库(uview-UI V2.x)
│  │...	  
├── App.vue					 
├── index.html					
├── main.js					 // 入口文件					
├── manifest.json			 // 应用配置文件					
├── pages.json			 	 // 页面配置文件					
├── readme.md
└── uni.scss

```




### 部署

1. 在HbuilderX的菜单中，发行->小程序-微信
2. 在微信开发者工具里点击上传

### 作者

路人甲

微信:xxxx  &ensp; qq:xxxxxx    

 *讲多无谓，食多会滞，v我50看实力*


### 鸣谢

多得你唔少