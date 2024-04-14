<template>
	<view>

		<view class="secret">
			<view class="feedback-text">
				<text>昵称</text>
			</view>
			<view class="time-change">
				<view class="netname" @click="showDiv()">
					<text>{{feedbackContent}}</text>
				</view>
				<view class="feedback-image-gender">
					<image mode="aspectFit" src="/static/images/网络.png"></image>
				</view>
			</view>
		</view>


		<view :hidden="userFeedbackHidden" class="popup_content">
			<view class="popup_title">昵称修改</view>
			<view class="popup_textarea_item">
				<textarea class="popup_textarea" placeholder='输入~' v-model="feedbackContent">
							</textarea>
				<view @click="submitFeedback()">
					<button class="popup_button" @click="hideDiv()">提交</button>
				</view>
			</view>
		</view>

		<view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv()"></view>

	</view>
</template>
<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				userFeedbackHidden: true, // 默认隐藏
				feedbackContent: '樱桃多多', // 用户反馈内容
			}
		},
		onShow() {
			uni.getStorageSync('netname')
		},
		methods: {
			showDiv() { // 显示输入弹出框
				this.userFeedbackHidden = false;
			},
			hideDiv() { // 隐藏输入弹出框
				this.userFeedbackHidden = true;
			},
			submitFeedback() { // 提交反馈
				var _this = this;
				// 提交反馈内容
				console.log(_this.feedbackContent);
			},
		}
	}
</script>
<style lang="scss" scoped>
</style>
