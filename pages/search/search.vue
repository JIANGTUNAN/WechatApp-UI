<template>
	<view class="search">
		<!-- 搜索 结构 -->
		<view class="nav">
			<view class="nav-search-box">
				<view class="nav-left" @click="back">
					<view class="back">
						<u-icon name="arrow-left" color="#0c34ba" size="30"></u-icon>
					</view>
					<view class="back-text">
						返回
					</view>
				</view>
				<view class="nav-right" :style="isFlag?'':'border-radius:50rpx' ">
					<uni-icons type="search" color="#0c34ba" size="18"></uni-icons>
					<input type="search" confirm-type="search" 
					@confirm="doSearch" v-model="text" class="ipt" placeholder="请输入商品名" />
					<view class="cancel" v-show="isFlag" @click="cancel">
						取消
					</view>
				</view>

			</view>
		</view>
		<!-- 搜索 结构 -->
		<!-- 背景 -->
		<view class="bg">

		</view>
		<!-- 背景 -->
		<!-- 商品结构 -->
		<view class="product">
			<image src="../../static/images/网络.png" mode="widthFix" class="img-network" v-show="isShow"></image>
			<view class="product-box" v-for="(item,index) in searchList" :key="index">
				<view class="img-box">
					<image :src="item.smallImg" mode="widthFix" class="img"></image>
				</view>
				<view class="product-name common">
					{{item.name}}
				</view>
				<view class="product-enname common">
					{{item.enname}}
				</view>
				<view class="product-price">
					￥{{item.price}}
				</view>
			</view>

		</view>
		<!-- 商品结构 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchList: '',
				isFlag: true,
				text: "",
				isShow: false
			}
		},
		watch: {
			text() {
				//判断 输入框 是否 为空值
				this.change()
			}
		},
		methods: {
			getSearch(text) {
				this.text = text
				uni.showLoading({
					title: "正在加载...",
					mask: true
				})
				uni.request({
					url: "http://www.kangliuyong.com:10002/search",
					data: {
						appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
						name: this.text
					},
					success: (res) => {
						if (res.statusCode === 200) {
							//获取 数据
							this.searchList = res.data.result
							//判断 数据 是否存在
							if (this.searchList == '') {
								uni.showToast({
									title: "未查询到此数据",
									icon: "none",
									mask: true
								})
								//是否 显示 图片
								this.isShow = true
							} else {
								//是否 显示 图片
								this.isShow = false
							}
							uni.hideLoading()
						}
					}
				})
			},
			doSearch() {
				// 通过 回车 获取数据  进行 渲染
				this.getSearch(this.text)
			},
			cancel() {
				this.text = ''
			},
			change() {
				//判断  输入框 是否有值
				if (this.text === '') {
					this.isFlag = false
				} else {
					this.isFlag = true
				}
			},
			back() {
				// 返回上一级
				uni.navigateBack({
					delta: 1
				})
			}

		},
		onLoad(option) {
			this.getSearch(option.text)
			this.change()
		}
	}
</script>

<style lang="less" scoped>
	.search {
		height: 100vh;
		background-color: #f7f7f7;

		// 顶部 搜索 样式
		.nav {
			height: 100rpx;
			padding: 0 30rpx;
			background-color: #fff;
			display: flex;
			align-items: center;

			.nav-search-box {
				width: 100%;
				height: 70rpx;
				display: flex;

				.nav-left {
					margin-right: 30rpx;
					flex: 2;
					display: flex;
					justify-content: center;


					.back {
						line-height: 70rpx;
						margin-right: 10rpx;
					}

					.back-text {
						color: #0c34ba;
						font-size: 28rpx;
						line-height: 70rpx;
					}
				}

				.nav-right {
					border-radius: 50rpx 0 0 50rpx;
					padding-left: 20rpx;
					background-color: #f7f8fa;
					flex: 8;
					display: flex;
					justify-content:space-between;
					align-items: center;
					.ipt{
						flex: 1;
					}
					.cancel {
						width: 100rpx;
						padding-right: 20rpx;
						background-color: #fff;
						text-align: center;
						line-height: 70rpx;
					}

				}


			}
		}

		//背景颜色
		.bg {
			height: 300rpx;
			background-color: #0c34ba;
		}

		// 商品结构 样式
		.product {
			position: relative;
			top: -50rpx;
			border-radius: 30rpx 30rpx 0 0;
			padding: 20rpx;
			padding-left: 5rpx;
			margin: 0 30rpx;
			background-color: #fff;
			display: flex;
			flex-wrap: wrap;

			.img-network {
				width: 100%;
				display: block;
			}

			.product-box {
				width: 200rpx;
				margin-left: 20rpx;
				margin-bottom: 20rpx;

				.img-box {
					height: 200rpx;

					.img {
						width: 100%;
						display: block;
					}
				}

				.common {
					text-align: start;
					display: -webkit-box;
					white-space: pre-wrap;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
				}

				.product-name {

					font-size: 36rpx;
					color: #646566;
					margin: 10rpx 0;
				}

				.product-enname {
					font-size: 28rpx;
					color: #999;
					margin: 10rpx 0;

				}

				.product-price {
					color: #0c34ba;
					font-size: 32rpx;
					font-weight: bold;
				}
			}
		}
	}
</style>
