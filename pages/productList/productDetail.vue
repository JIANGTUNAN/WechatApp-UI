<template>
	<view>
		<u-popup closeable :show="visible" @close="visible=false">
			<view class="detail-popup">
				<view class="title">商品详情
					<view class="close-btn" @click="visible=false">✕</view>
				</view>

				<view class="content">
					<view class="info">
						<image :src="data.src" class="product-img">
						</image>
						<view class="right">
							<view class="title">{{data.name}}</view>
							<view class="simpleTitle">{{data.simpleTitle}}</view>
						</view>

					</view>
					<view class="desc">
						<view class="p" v-for="(i,idx) in (data.desc||'').split('\n')" :key="idx">
							{{i}}
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				good: {},
				visible: false,
			}
		},
		props: {
			data: {
				type: Object,
				default: () => ({})
			}
		},
		methods: {
			open() {
				this.visible = true;
			},
			close() {
				this.visible = false;
			}
		},
	}
</script>

<style scoped lang="scss">
	.detail-popup {
		max-height: 1000rpx;
		overflow-y: scroll;
		position: relative;

		>.title {
			$titleHeight: 80rpx;
			height: $titleHeight;
			line-height: $titleHeight;
			text-align: center;
			font-size: 36rpx;
			position: sticky;
			top: 0;
			z-index: 3;
			background-color: #efefef;

			.close-btn {
				width: $titleHeight;
				position: absolute;
				right: 0;
				top: 0;
			}
		}


		.content {
			padding: 20rpx;

			.info {
				display: flex;

				.product-img {
					height: 200rpx;
					flex: 0 0 200rpx;
				}

				.right {
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;

					.title {
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
						color: #0C34BA;
						font-weight: 600;
						font-size: 46rpx;
					}

					.simpleTitle {
						margin-top: 20rpx;
						flex: 1;
						color: #999;
						font-size: 34rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
			}

			.desc {
				margin-top: 30rpx;
				letter-spacing: 2rpx;
				line-height: 42rpx;
				>.p{
					text-indent: 2em;
				}
			}
		}
	}
</style>
