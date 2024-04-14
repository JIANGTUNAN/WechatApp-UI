<template>
	<view>
		<u-row>
			<view class="navbar">
				<u-navbar :title="title" @rightClick="rightClick" :autoBack="true" bgColor='#fcfcfc'></u-navbar>
			</view>
		</u-row>
		<u-row>
			<view class="content">
				<view v-if="content.length<=0" style="margin-top: 100rpx;">
					<u-empty></u-empty>
				</view>
				<view v-else>
					<text v-for="(i,index) in content" class="text">{{i}}</text>
				</view>
			</view>
		</u-row>
	</view>
</template>

<script>
	import list from './bean_wiki.js';
	export default {
		data() {
			return {
				content: [],
				title: '',
			}
		},
		onLoad(options) {
			const {
				index
			} = options;
			if (index || list?. [index]) {
				const {
					title,
					content
				} = list[index];
				this.content = content.split('\n').filter(i => i != '');
				this.title = title;
			};
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.navbar {
		height: var(--status-bar-height);
	}

	.content {

		margin-top: 88rpx;
		// padding: 80rpx 30rpx;
		.text {
			display: block;
			text-indent: 2em;
			line-height: 1.5rem;
			letter-spacing: 3rpx;
			padding: 0 16rpx;
		}
	}
</style>
