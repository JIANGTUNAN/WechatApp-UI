<template>
	<view class="img">
		<view class="img-box" @click="add()">
			<image :src="src||''" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: "",
				src:""
			}
		},
		methods: {
			add() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						uni.request({
							url: res.tempFilePaths[0],
							responseType: "arraybuffer",
							success: (res) => {
								let base64 = uni.arrayBufferToBase64(res.data)
								this.img = base64
								this.getImg(base64)
							}
						})
					}
				})
			},
			getImg(base64) {
				this.$myRequest({
					url: "/updateUserBg",
					method: "POST",
					data: {
						imgType:"png",
						serverBase64Img: base64
					},
					success:(res)=>{
						let {userBg}=res.data
						this.src=userBg
						console.log(res)
						console.log(this.src)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.img-box {
		width: 200rpx;
		height: 200rpx;
		background-color: skyblue;
	}
</style>
