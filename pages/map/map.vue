<template>
	<view class="meau" ref="document" :style="{height:`${height}`}">
		<view class="map">
			<image src="/static/images/map.jpg" mode="widthFix" alt="">
		</view>
		<view class="search">
			<view class="search-box">
				<u-icon color="#0c34ba" :size='18' name='search'></u-icon>
				<input type="search" v-model="searchQuery" clearable class="ipt" placeholder="请输入店铺名" />
			</view>
		</view>
		<view class="list">
			<view class="store" v-for="(item,index) in filteredList" :key="index" @click="getDetail(item)">
				<view class="img-box">
					<image :src="item.smallImg" mode="widthFix center" class="img"></image>
				</view>
				<view class="store-text">
					<view class="store-name">
						<text class="content">{{item.name}}</text>
						<u-icon v-if="item.star" color='#0c34ba' name="checkmark-circle"></u-icon>
					</view>
					<view class="store-introduce">
						{{item.desc}}
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getStore,
		getStarStore
	} from "@/api/api.js"
	export default {
		data() {
			return {
				isHot: {
					typeDesc: "推荐",
					id: 0
				},
				count: 0,
				searchQuery: '',
				storeList: [],
				height: ""
			}
		},
		methods: {
			typeLight(index, item) {
				if (this.count === index) {
					return;
				}
				this.count = index
				this.storeType(index, item)
				this.height = 100 + 'vh'

			},
			init() {
				getStore().then(res => {
					this.storeList = res.data;
				})
			},

			addHeight() {
				this.height = this.storeList.length * 21;
				if (this.height < 100) {
					this.height = 100 + "vh";
				} else {
					this.height = this.height + "vh";
				}
			},
			getDetail(item) {
				uni.navigateTo({
					url: `../detail/detail?storeId=${item.id}`
				})
			}

		},
		onLoad() {
			this.init();
		},
		onReachBottom() {
			this.addHeight();
		},
		computed: {
			filteredList() {
				return this.storeList.filter(item => {
					return item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
				});
			},
		},

	}
</script>

<style lang="scss" scoped>
	.meau {

		.map {
			image {
				width: 100%;
			}
		}

		.search {
			position: sticky;
			top: 0;
			z-index: 100;
			height: 100rpx;
			padding: 0 60rpx;
			background-color: #fff;
			display: flex;
			align-items: center;


			.search-box {
				width: 640rpx;
				height: 70rpx;
				border-radius: 60rpx;
				padding: 0 30rpx;
				background-color: #f7f7f7;
				display: flex;
				align-items: center;

				.ipt {
					width: 500rpx;
				}
			}

		}

		.active {
			color: #0c34ba;
		}

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
	}
</style>
