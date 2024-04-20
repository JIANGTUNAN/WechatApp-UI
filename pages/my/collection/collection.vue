<template>
	<view class="collection">
		<view class="list">
			<view class="store" v-for="(store,index) in list" :key="index" @click="getDetail(store)">
				<view class="img-box">
					<image :src="store.smallImg" mode="widthFix center" class="img"></image>
				</view>
				<view class="store-text">
					<view class="store-name">
						<text class="content">{{store.name}}</text>
					</view>
					<view class="store-introduce">
						{{store.desc}}
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getStarStore,
		getStore
	} from "@/api/api.js"
	export default {
		data() {
			return {
				list: [],
			}
		},
		methods: {
			init() {
				const userId = this.$util.getUserId();
				getStarStore(userId).then(res => {
					const starList = res?.data || [];
					getStore().then(res => {
						const storeList = res.data;
						this.list = storeList.filter(i => (starList.includes(i.id) || starList.includes(i
							.id + '')))
					})
				})
				uni.stopPullDownRefresh();

			},
			getDetail(item) {
				uni.navigateTo({
					url: `../detail/detail?storeId=${item.id}`
				})
			}
		},
		onPullDownRefresh() {
			this.init();
		},
		onLoad() {
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		background-color: #f7f7f7;
		padding: 30rpx;

		.store {
			border-radius: 20rpx;
			padding: 20rpx;
			margin-bottom: 30rpx;
			background-color: #fff;
			display: flex;

			.img-box {
				flex: 0 0 180rpx;
				width: 180rpx;
				height: 180rpx;

				.img {
					width: 100%;
					height: 100%;
				}
			}

			.store-text {
				flex: 1;
				min-width: 0;
				color: #787878;
				margin-left: 30rpx;

				.store-name {
					display: flex;
					color: #000;
					font-weight: 600;
					height: 45rpx;
					padding-bottom: 0rpx;
					text-align: start;
					max-width: 90%;

					.content {
						display: block;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-right: 20rpx;
						// flex: 1;
					}
				}

				.store-introduce {
					width: 300rpx;
					height: 120rpx;
					font-size: 30rpx;
					text-align: start;
					display: -webkit-box;
					white-space: pre-wrap;
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
				}
			}
		}
	}
</style>
