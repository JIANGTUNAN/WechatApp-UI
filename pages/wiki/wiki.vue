<template>
	<view class="bean" :style="{height:`${height}`}">
		<view v-if="beanList.length<=0" class="empty">
			<u-empty text="暂无信息" mode="message"></u-empty>
		</view>
		<u-list>
			<u-list-item v-for="(i,index) in beanList" :key="index">
				<u-cell
					    size="large"
					    :title="i.title"
					    value="详情"
					    isLink
						@click='beanDetail(index)'
					></u-cell>
			</u-list-item>
		</u-list>
	</view>
</template>

<script>
	import list from './bean_wiki.js';
	export default {
		data() {
			return {
				value: 0,
				isCheckAll: false,
				beanList: list,
				options: [{
					text: '删除',
					style: {
						backgroundColor: 'red'

					}
				}],
				productList: "",
				height: "",
				moneyAll: 0
			}
		},
		methods: {
			beanDetail(index) {
				uni.navigateTo({
					url:'/pages/wiki/bean_detail?index='+index,
				})
			},
		},
		onLoad() {
		},
		onReachBottom() {
		}
	}
</script>

<style lang="scss" scoped>
	.bean {
		.empty {
			position: absolute;
			width: 100%;
			height: 300rpx;
			top: 50%;
			left: 0;
			margin-top: -150rpx;
		}

	}
</style>
