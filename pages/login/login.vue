<template>
	<view class="login">
		<view class="nav">
			<view class="nav-left">
				<view class="nav-icon">
					<image src="../../static/images/coffee.jpg" mode="widthFix" class="img"></image>
				</view>
				<view class="nav-txet">
					畅享咖
				</view>
			</view>
		</view>
		<view class="section">
			<view class="section-name">
				欢迎回来
			</view>
			<view class="bgi">
				<img src="../../static/images/login-bgc.jpg" alt="">
			</view>
			<view class="section-enname">
				请登录你的账号
				<view style="font-size: 25rpx;margin-top: 10rpx;">
					Please log in to your account
				</view>
			</view>
		</view>
		<button @click="show = true" class="btn_1 common">登录</button>

		<u-popup :show="show" mode="bottom" @close="show=false" :closeable="true" :safeAreaInsetBottom="false">
			<view class="popup-box">
				<button type="default" @click="submit" class="btn_1 common"
					style="background-color: #2BA245;">微信登录</button>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import {
		login,
		getUser
	} from "@/api/api.js";
	export default {
		data() {
			return {
				show: false,
				form: {
					number: '',
					password: "",
					nickName: ""
				},
				loading: true,
			}
		},
		methods: {
			intoApp() {
				uni.switchTab({
					url: '/pages/map/map'
				});
			},
			submit() {
				let _this = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						const code = loginRes.code
						// 获取用户信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function(infoRes) {
								const {
									avatarUrl,
									nickName
								} = infoRes.userInfo;
								// console.log('Info', infoRes, loginRes);
								login({
									code,
									avatarUrl,
									nickName
								}).then(res => {
									if (res.code == '200') {
										uni.showToast({
											title: JSON.stringify(infoRes),
											icon: 'success',
											duration: 2000,
											success: function() {
												const userInfo=res.data.sysUser;
												uni.setStorage({ //存入Storage
													key: 'userInfo',
													data: userInfo
												});
												uni.setStorage({ //存入Storage
													key: 'token',
													data: res.data
														.token
												})
												_this.intoApp()

											}
										})
									} else {
										uni.showToast({
											title: '登录失败',
											mask: true,
											duration: 1000,
											icon:'none'
										})
									}

								})
							}
						});
					}
				});
			},
		},
		async onLoad(options) {
			const hideTip = options.hideTip || false;
			const token = uni.getStorageSync('token');
			let isLogin = false;
			if (token && token != '' && !hideTip) {
				await getUser().then((res) => {
					if (res.code == 200) {
						isLogin = true;
						this.intoApp()
					}
				})
			}
			if (isLogin) return;
			if (!hideTip) uni.showToast({
				title: "请先登录",
				icon: "none",
				mask: true,
				duration: 1000
			})
			this.loading = false;
		},
	}
</script>

<style lang="scss" scoped>
	.login {
		.nav {
			height: 120rpx;
			border-bottom: 2rpx solid #ccc;
			padding: 0 30rpx;
			padding-bottom: 20rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.nav-left {
				flex: 7.5;
				display: flex;
				align-items: center;

				.nav-icon {
					width: 75rpx;
					height: 75rpx;

					.img {
						width: 100%;
					}
				}

				.nav-txet {
					color: #999;
					font-size: 38rpx;
					font-weight: bold;
					margin-left: 30rpx;
				}
			}

			.nav-right {
				button {
					border: none;
					outline: none;
					background-color: transparent;
					color: #0c34ba;
					font-size: 34rpx;
					font-weight: bold;
					flex: 2.5;

					&::after {
						border: none;
					}
				}
			}
		}

		.section {
			margin: 0 30rpx;
			margin-top: 50rpx;

			.section-name {
				font-size: 80rpx;
				font-weight: bold;
				margin-bottom: 60rpx;
			}

			.section-enname {
				margin: 30rpx 0;
				margin-top: 50rpx;
				font-size: 40rpx;
			}
		}

		.nav-login {
			.goTo {
				margin: 50rpx 30rpx;
				margin-bottom: 10rpx;
				float: right;
			}
		}

		.common {
			height: 100rpx;
			font-size: 34rpx;
			border-radius: 80rpx;
			margin: 80rpx 30rpx;
			line-height: 100rpx;
			text-align: center;
		}

		.btn_1 {
			color: #fff;
			background-color: #0c34ba;
			margin-top: 80rpx;
		}

		.btn_2 {
			border: 2rpx solid #ccc;
		}

		.popup-box {
			.popup-title {
				color: #999;
				font-size: 80rpx;
				font-weight: bold;
				padding: 50rpx;
				padding-top: 100rpx;


			}
		}

		::v-deep .u-border-bottom {
			border-bottom: 2rpx solid #ccc;
			margin: 0 50rpx;
		}

		::v-deep .u-form-item--left__content__label {
			width: 100rpx;
		}

		::v-deep .u-form-item--right__content__slot {
			margin-left: 30rpx;
		}

		::v-deep .u-form-item__message {
			display: none;
		}

		.bgi {
			img {
				object-fit: cover;
				display: block;
				width: 90%;
				margin: 0 auto;
			}
		}
	}
</style>
