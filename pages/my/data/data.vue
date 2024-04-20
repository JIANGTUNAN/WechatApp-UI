<template>
	<view class="changeInfo">
		<view class="box">
			<view class="img-box">
				<image class="img" :src="avatarUrl" @click="chooseImg"></image>
				<view class="text">点击更换头像</view>
			</view>
		</view>
		<view class="info-box">
			<view class="text-box">
				<view class="left">昵称</view>
				<view class="iconfont iconchangyongicon- icon-box"></view>
				<u-input v-model="sysNickName" ref='name' :type="text" :border='false' />
			</view>
			<view class="text-box">
				<view class="left">简介</view>
				<view class="iconfont iconchangyongicon- icon-box"></view>
				<u-input v-model="introduction" ref='introduction' :type="text" :border='false' />
			</view>
			<view class="text-box">
				<view class="left">电话号码</view>
				<view class="iconfont iconchangyongicon- icon-box"></view>
				<u-input v-model="phone" ref='phone' :type="text" :border='false' />
			</view>
			<picker :range="schoolList" @change="bindSchoolChange">
				<view class="text-box">
					<view class="left">学校</view>
					<view class="iconfont iconchangyongicon- icon-box"></view>
					<view class="right">{{school}}</view>
				</view>
			</picker>
			<picker :range="sexList" @change="bindSexChange">
				<view class="text-box">
					<view class="left">性别</view>
					<view class="iconfont iconchangyongicon- icon-box"> </view>
					<view class="right">{{sex}}</view>
				</view>
			</picker>
			<picker mode="date" :value="birthday" @change="bindDateChange">
				<view class="text-box">
					<view class="left">生日</view>
					<view class="iconfont iconchangyongicon- icon-box"></view>
					<view class="right">{{birthday}}</view>
				</view>
			</picker>
			<picker mode="region" @change="bindCityChange">
				<view class="text-box">
					<view class="left">地区</view>
					<view class="iconfont iconchangyongicon- icon-box"></view>
					<view class="right">{{city}}</view>
				</view>
			</picker>
			<button type="primary" plain @click="submit">确认修改</button>
		</view>
	</view>
</template>

<script>
	import {
		editUSer,
		editAvatar,
		getUser
	} from "@/api/api.js"
	import {
		baseUrl
	} from '@/request/request.js'
	export default {
		data() {
			return {
				sysNickName: "张三",
				userId: null,
				introduction: "我爱睡觉",
				school: "",
				sex: "",
				avatarUrl: '',
				birthday: '',
				city: '',
				phone: '',
				schoolList: ["北京大学",
					"清华大学",
					"复旦大学",
					"浙江大学",
					"上海交通大学",
					"南京大学",
					"中国科学技术大学",
					"华中科技大学",
					"武汉大学",
					"西安交通大学"
				],
				sexList: ['男', '女'],
			}
		},
		methods: {
			init(){
				
					const userInfo = uni.getStorageSync('userInfo');
					this.userId = userInfo.userId;
					userInfo.avatarUrl = getApp().getAvatarUrl();
					userInfo.sysNickName = userInfo.sysNickName || userInfo.wxNickName;
					Object.assign(this.$data, userInfo, {
						userInfo
					});
					this.$forceUpdate();
					uni.stopPullDownRefresh();
			},
			chooseImg() {
				const {userId} =this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					sizeType: ['original', 'compressed'],
					success: (res) => {
						this.avatarUrl = res.tempFilePaths[0];
						uni.uploadFile({
							url: baseUrl + '/sys/user/editAvatar',
							filePath: res.tempFilePaths[0],
							name: 'avatar',
							formData: {
								userId
							},
							success: (res) => {
								if (!res?.code == 200) {
									uni.showToast({
										title: '头像修改失败',
										icon: 'none'
									})
									this.avatarUrl = userInfo.avatarUrl
								} else {
									uni.showToast({
										title: '头像修改成功',
										icon: 'success'
									})
								}
							}
						});

					}
				})
			},
			bindSchoolChange(e) {
				this.school = this.schoolList[e.target.value]
			},
			bindSexChange(e) {
				this.sex = this.sexList[e.target.value]
			},
			bindDateChange(e) {
				this.birthday = e.target.value
			},
			bindCityChange(e) {
				this.city = e.target.value.join('-')
			},
			submit() {
				const {
					userId,
					phone,
					sex,
					sysNickName,
					introduction,
					birthday,
					school,
					avatarUrl,
					city
				} = this;

				editUSer({
					userId,
					phone,
					sex,
					sysNickName,
					introduction,
					birthday,
					school,
					city
				}).then(res => {
					if (!res?.code == 200) {
						uni.showToast({
							title: '修改资料失败',
							icon: 'none'
						})
					} else {

						uni.showToast({
							title: '修改资料成功',
							icon: 'success',
							duration: 1000
						})
						getUser().then(res => {
							const userInfo = res.data;
							uni.setStorageSync({ //存入Storage
								key: 'userInfo',
								data: userInfo
							});
							uni.navigateBack();
						})
					}

				})

			},

		},
		onPullDownRefresh() {
			this.init();
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style scoped>
	::v-deep .u-input__content__field-wrapper__field {
		text-align: right !important;
		position: relative;
		top: 10rpx;
		color: #999999;
	}

	.changeInfo {
		width: 100%;
		height: 100%;
	}

	.nav-box {
		height: 50px;
		position: relative;
		margin: 0 auto;
		padding-top: 30px;
	}

	.title {
		text-align: center;
		color: #FFFFFF;
		font-size: 18px;
	}

	.icon-nav {
		position: absolute;
		top: 30px;
		left: 10px;
		color: #FFFFFF;
	}

	.box {
		width: 100%;
		height: 150px;
		margin: 0 auto;
		/* border-top:1px solid #333333; */
		border-bottom: 1px solid #999;
	}

	.img-box {
		text-align: center;
	}

	.img {
		margin-top: 20px;
		width: 70px;
		height: 70px;
		border-radius: 50%;
		border: 1px solid #efefef;
	}

	.text {
		margin-top: 13px;
		color: #999999;
		font-size: 13px;
	}

	.info-box {
		padding: 0 10px;
	}

	.text-box {
		width: 100%;
		height: 52px;
		line-height: 52px;

	}

	.left {
		float: left;
		font-size: 15px;
		color: #888;
	}

	.right {
		float: right;
		text-align: right;
		font-size: 15px;
		margin-right: 7px;
		color: #999999;
	}

	.icon-box {
		float: right;
		font-size: 15px;
		color: #999999;
		width: 10px;
	}
</style>
