<template>
	<view class="my">
		<!-- 背景图 -->
		<view class="nav-bg">
			<view class="img-box">
				<image src="https://img0.baidu.com/it/u=1194719978,69361099&fm=11&fmt=auto&gp=0.jpg" mode="widthFix "
					class="img"></image>
			</view>
		</view>
		<view class="popup">
			<view class="popup-title">
				<view class="popup-left">
					<view class="img-box">
						<image :src="myList.userImg" mode="widthFix" class="img"></image>
					</view>
				</view>
				<view class="popup-right">
					<view class="popup-right-title">
						Allen
					</view>
					<view class="popup-right-desc">
						个人简介
					</view>
				</view>
			</view>
			<view class="popup-item" v-for="(item,index) in list" 
			:key="item.id" @click="goToPages(item,index)">
				<view class="popup-item-left">
					{{item.title}}
				</view>
				<view class="popup-item-right">
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				myList: "",
				list: [{
						title: "个人资料",
						url: "./proile/data/data",
						id: 1
					},
					{
						title: "我的订单",
						url: "./proile/order/order",
						id: 2
					},
					{
						title: "我的收藏",
						url: "./proile/collection/collection",
						id: 3
					},
					{
						title: "地址管理",
						url: "./proile/address/address",
						id: 4
					},
				]
			}
		},

		methods: {
			async getFindeMy() {
				let res = await this.$myRequest({
					url: "/findMy"
				})
				if(res[1].data.code==200){
					this.myList = res[1].data.result[0]
				}
				if(res[1].data.code==700){
						uni.navigateTo({
							url:"../login/login"
						})
				}


			},
			goToPages(item,index){
				uni.navigateTo({
					url:item.url
				})
			},
			onLoad() {
				this.getFindeMy()
			}
		},
	}
</script>

<style lang="scss">
	.my {
		background-color: #f7f7f7;

		.nav-bg {
			.img-box {
				height: 400rpx;

				.img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.popup {
			position: relative;
			top: -100rpx;
			border-radius: 30rpx 30rpx 0 0;
			padding: 30rpx;
			padding-bottom: 50rpx;
			margin: 0 30rpx;
			overflow: hidden;
			background-image: linear-gradient(rgba(255, 255, 255, 0.3), #fff, #fff);

			.popup-title {
				margin-bottom: 75rpx;
				display: flex;

				.popup-left {
					flex: 3;

					.img-box {
						width: 150rpx;
						height: 150rpx;
						border-radius: 50%;
						overflow: hidden;

						.img {
							width: 100%;
						}
					}
				}

				.popup-right {
					flex: 7;

					.popup-right-title {
						color: #0c34ba;
						font-size: 40rpx;
						font-weight: bold;
					}

					.popup-right-desc {
						color: #999;
						font-size: 32rpx;
						margin: 30rpx 0;
					}
				}
			}

			.popup-item {
				font-size: 36rpx;
				border-bottom: 2rpx solid #ccc;

				padding: 40rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>
