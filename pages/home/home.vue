<template>
	<view class="home">
		<!-- 顶栏 -->
		<view class="nav">
			<view class="nav-left">
				<view class="nav-time">
					{{times}}
				</view>
				<view class="nav-name">
					<text v-if="userName!=''">{{userName}}</text>
					<a v-else class='login-tip' @click="toLogin">请登录</a>
				</view>
			</view>
			<view class="nav-right">
				<input type="search" confirm-type="search" @confirm="doSearch" placeholder="请输入店铺名" class="ipt"
					v-model="text" />
			</view>
		</view>
		<!-- 轮播 -->
		<view class="banner">
			<swiper :indicator-dots="true" :autoplay="true" indicator-color="#fff" :interval="3000" :duration="1000"
				circular="true" class="banner-box">
				<swiper-item v-for="(item,index) in bannerList" :key="index">
					<view class="swiper-item">
						<image :src="item.bannerImg" mode="" class="img"></image>
					</view>
				</swiper-item>

			</swiper>
		</view>
		<!-- 商品类标题 -->
		<view class="isHot">
			<view class="isHot-title">
				热卖推荐
			</view>

		</view>
		<!-- 商品列表 -->
		<view class="product">
			<view class="product-box" v-for="(v,i) in productList" :key="i">
				<view class="img-box">
					<image :src="v.smallImg" mode="widthFix" class="img"></image>
				</view>
				<view class="product-title">
					{{v.name}}
				</view>
				<view class="product-name">
					{{v.enname}}
				</view>
				<view class="product-price">
					￥{{v.price}}
				</view>
				<view class="product-isHot">
					hot
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerList: "",
				times: "",
				productList: [],
				text: "",
				userName:'',
			}
		},
		methods: {
			getBanner() {
				//获取轮播图
				uni.request({
					url: "http://www.kangliuyong.com:10002/banner",
					data: {
						appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
					},
					success: (res) => {
						this.bannerList = res.data.result
					}
				})
			},
			getTiem() {
				let time = new Date().getHours()
				if (time > 6 && time < 12) {
					this.times = "早上好"
				} else if (time > 12 && time < 18) {
					this.times = "下午好"
				} else if (time > 18 && time < 24) {
					this.times = "晚上好"
				} else {
					this.times = "深夜了"
				}

			},
			getName(){},
			getParduct() {
				uni.request({
					url: "http://www.kangliuyong.com:10002/typeProducts",
					data: {
						appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
						key: 'isHot',
						value: 1 
					},
					success: (res) => {
						this.productList = res.data.result
					}
				})
			},
			doSearch() {
				//搜索跳转
				uni.navigateTo({
					url: `../search/search?text=${this.text}`
				})

			},
			toLogin(){
				uni.navigateTo({
					url:'/pages/login/login?hideTip=true'
				})
			}
		},
		onLoad() {
			this.getBanner();
			this.getTiem();
			this.getParduct()
		}
	}
</script>

<style lang="scss">
	.home {
		height: 188vh;
		background-color: #f7f7f7;
		
		.nav {
			padding: 0 30rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.nav-left {
				margin-right: 50rpx;
				display: flex;
				justify-content: space-between;
				flex: 4;

				.nav-time {
					height: 100rpx;
					font-size: 36rpx;
					font-weight: bold;
					line-height: 100rpx;

				}

				.nav-name {
					height: 100rpx;
					color: #0c34ba;
					font-size: 36rpx;
					font-weight: bold;
					line-height: 100rpx;
					.login-tip{
						font-size: 28rpx;
						cursor: pointer;
					}
				}
			}

			.nav-right {
				height: 70rpx;
				border-radius: 50rpx;
				padding: 0 30rpx;
				background-color: #f7f8fa;
				display: flex;
				align-items: center;
				flex: 6;

				.ipt {
					font-size: 30rpx;
					background-color: #f7f8fa;
				}
			}
		}

		// 轮播图结构
		.banner {
			border-radius: 30rpx;
			margin: 20rpx;
			overflow: hidden;

			.banner-box {
				height: 500rpx;

				.swiper-item {
					width: 100%;
					height: 100%;

					.img {
						width: 100%;
					}
				}
			}

		}

		//轮播按钮样式
		::v-deep.uni-swiper-dot {
			width: 50rpx;
			height: 8rpx;
			border-radius: 10rpx;
			margin-bottom: 30rpx;
		}

		//标题
		.isHot {
			height: 100rpx;
			margin: 0 30rpx;
			background-color: #fff;
			display: flex;
			align-items: center;

			.isHot-title {
				border: 2rpx solid;
				width: 200rpx;
				height: 70rpx;
				color: #fff;
				font-size: 36rpx;
				font-weight: bold;
				border-radius: 0 40rpx 0 0;
				background-color: #0c34ba;
				line-height: 70rpx;
				text-align: center;
			}
		}

		.product {
			margin: 30rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.product-box {
				position: relative;
				width: 330rpx;
				border-radius: 20rpx;
				padding: 20rpx;
				box-sizing: border-box;
				background-color: #fff;
				margin-bottom: 30rpx;

				.img-box {
					width: 100%;
					border-radius: 20rpx;

					.img {
						width: 100%;
					}
				}

				.product-title {
					color: #999;
					font-size: 36rpx;
					font-weight: bold;
					margin: 10rpx 0;
				}

				.product-name {
					width: 280rpx;
					height: 40rpx;
					color: #C0C0C0;
					font-size: 26rpx;
					margin: 10rpx 0;
					text-align: start;
					display: -webkit-box;
					white-space: pre-wrap;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}

				.product-price {
					color: #0c34ba;
					font-size: 28rpx;
					font-weight: bold;
					margin-top: 10rpx;
				}

				.product-isHot {
					position: absolute;
					top: 22rpx;
					left: 54rpx;
					width: 70rpx;
					height: 60rpx;
					color: #fff;
					font-size: 26rpx;
					font-weight: bold;
					border-radius: 0 0 10rpx 10rpx;
					background-color: #0c34ba;
					text-align: center;
					line-height: 60rpx;
				}
			}
		}

	}
</style>
