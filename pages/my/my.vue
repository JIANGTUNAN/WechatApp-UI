<template>
	<view class="my">
		<!-- 背景图 -->
		<view class="nav-bg">
			<view class="img-box">
			</view>
		</view>
		<view class="popup">
			<view class="popup-title">
				<view class="popup-left">
					<view class="img-box">
						<u-avatar :src="userInfo.avatarUrl" :size='75'></u-avatar>
					</view>
				</view>
				<view class="popup-right">
					<view class="popup-right-title">
						{{userInfo.sysNickName||userInfo.wxNickName}}
					</view>
					<view class="popup-right-desc">
						{{userInfo.introduction||'个人简介' }}
					</view>
				</view>
			</view>
			<view class="popup-item" v-for="(item,index) in list" :key="index" @click="goToPages(item)">
				<view class="popup-item-left">
					{{item.title}}
				</view>
				<view class="popup-item-right" v-if="!item.button">
					<u-icon name="arrow-right" color="#999" size="18"></u-icon>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		getUser,
		logout
	} from '@/api/api.js';
	export default {
		data() {
			return {
				myList: "",
				userInfo: {},
				list: [{
						title: "个人资料修改",
						url: "./data/data",
						id: 1
					},
					{
						title: "我的集咖",
						url: "./collection/collection",
						id: 2
					},
					{
						title: "退出登录",
						id: 3,
						method: 'logout',
						button: true
					},
				]
			}
		},
		onShow() {
			this.getFindeMy();
		},
		onPullDownRefresh() {
			this.getFindeMy();
		},
		methods: {
			async getFindeMy() {
				await getApp().updateUserInfo();
				let userInfo = uni.getStorageSync('userInfo');
				userInfo.avatarUrl = getApp().getAvatarUrl();
				this.userInfo = userInfo
				uni.stopPullDownRefresh();
			},
			goToPages(item) {
				if (item.method && [item.method] in this) {
					const fn = this[item.method]
					if (typeof fn == 'function') {
						return fn();
					}
				}
				if (item.url) {
					uni.navigateTo({
						url: item.url
					})
				}
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},

			logout() {
				const _self = this;
				logout().then(() => {
					uni.removeStorage({
						key: 'userInfo'
					})
					uni.removeStorage({
						key: 'token',
						success() {
							_self.toLogin();
						}
					})
				})

			}
		},
	}
</script>

<style lang="scss">
	uni-page-body {
		height: 100%;
	}

	.my {
		background-color: #f7f7f7;
		height: 100%;

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
				padding: 0 20rpx;
				display: flex;

				.popup-left {
					flex: 30%;

					.img-box {
						width: 150rpx;
						height: 150rpx;
						overflow: hidden;

						.img {
							width: 100%;
						}
					}
				}

				.popup-right {
					flex: 70%;

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
