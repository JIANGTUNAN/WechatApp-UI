<script>
	import {
		baseUrl
	} from '@/request/request.js';
	import {
		getUserById
	} from "@/api/api.js";
	export default {
		// 全局变量
		globalData: {},
		methods: {
			getAvatarUrl() {
				const userInfo = uni.getStorageSync('userInfo');
				let avatarUrl, {
					sysHeadPic: s,
					wxHeadPic: w
				} = userInfo;
				if (s.indexOf('default_avatar.png') > 0) {
					avatarUrl = w
				} else {
					avatarUrl = baseUrl + s;
				}
				return avatarUrl;
			},
			updateUserInfo() {
				getUserById(uni.getStorageSync('userInfo').userId).then(res => {
					const userInfo = res.data;
					uni.removeStorageSync('userInfo');
					// uni.setStorage({ //存入Storage
					// 	key: 'userInfo',
					// 	data: userInfo
					// });
					uni.setStorageSync('userInfo',userInfo);
					// console.log(userInfo);
				})
			}
		},
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'uview-ui/index.scss';
</style>
