<template>
	<view class="detail">
		<!-- 商品大图 -->
		<view class="nav-img">
			<u-swiper :loading="loading" :height="250" :list="storeInfo.imageList" indicator
				:indicatorStyle="{bottom:'66rpx'}">
			</u-swiper>
		</view>
		<view class="section">
			<view class="section-title">
				<view class="section-title-left">
					<view class="name">
						{{storeInfo.name}}
					</view>
					<view class="online">
						营业时间：8:00-17:00
					</view>
				</view>
				<view class="section-title-right">
					<button type="primary" size="mini" plain :class="star?'star':''"
						@click="handleStar">{{star?'已':'' }}集咖</button>
				</view>
			</view>
			<view class="profile">
				<text>店铺简介：</text>
				<text style="color: #000;">{{storeInfo.simpleTitle}}</text>
			</view>
			<view class="product">
				<text class="title">推荐商品：</text>
				<text class="more" @click="toAllProduct">全部商品></text>
				<swiper-list :data="productList" textKey='simpleTitle' @click="productDetail"></swiper-list>
			</view>
			<!-- 商品描述 -->
			<view class="comment-area">
				<view class="comment-title">
					<text>相关评论</text>
					<text class="comment-more" @click="toComment">查看全部评论></text>
				</view>
				<view class="comment-view">
					<view class="comment" v-if="comment">
						<view class="left">
							<image :src="baseUrl+comment.userAvatarUrl" mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="top">
								<view class="name">{{ comment.userNickName }}</view>
							</view>
							<view class="images" v-for="(src,idx) in comment.imageList" :key="idx">
								<image :src="baseUrl+src" mode="widthFix"></image>
							</view>
							<view class="content">{{ comment.commentContent }}</view>
							<view class="bottom">
								{{ $util.formatDate(comment.publishTime) }}
							</view>
						</view>
					</view>

					<view class="empty" v-else>
						暂无评论
					</view>
					<view class="comment-post empty" @click="handlePostComment">
						发表评论
					</view>
				</view>
			</view>
		</view>
		<PostComment ref='postComment' :storeId="storeId" :userId="userId" @finish="()=>init(storeId)" />
		<ProductDetail :data='selectedItem' ref='detail'></ProductDetail>
	</view>

</template>

<script>
	import SwiperList from '@/pages/component/swiperList.vue';
	import PostComment from "@/pages/comment/postComment.vue"
	import ProductDetail from '@/pages/productList/productDetail.vue'
	import {
		getStoreById,
		getProduct,
		getComment,
		starStore,
		getStarStore
	} from '@/api/api.js'
	import {
		baseUrl
	} from '@/request/request';
	export default {
		data() {
			return {
				action: baseUrl + '/coffee/comment/postComment',
				userId: null,
				storeInfo: {},
				loading: true,
				open: false,
				list: null,
				productList: null,
				selectedItem: {},
				value: 1,
				pid: "",
				rule: "",
				ruleList: [],
				star: false,
				comment: null,
				storeId: null,
				baseUrl,
			}
		},
		components: {
			SwiperList,
			PostComment,
			ProductDetail
		},
		methods: {
			init(id) {
				this.storeId = id;
				const userId = this.$util.getUserId();
				this.userId = userId;
				this.getStoreInfo(id);
				this.getProducts(id);
				this.getComments(id);
				getStarStore(userId).then(res => {
					const starList = res?.data || [];
					for (let i = 0; i < starList.length; i++) {
						if (starList[i] == id) {
							this.star = true;
							break;
						}
					}
				})
				uni.stopPullDownRefresh();
			},

			handlePostComment() {
				this.$refs.postComment.open();
			},
			toAllProduct() {
				uni.navigateTo({
					url: '/pages/productList/productList?storeId=' + this.storeId || '',
				})
			},
			toComment() {
				uni.navigateTo({
					url: '/pages/comment/index?storeId=' + this.storeId || '',
				})
			},
			getStoreInfo(id) {
				getStoreById(id).then(res => {
					this.storeInfo = res.data;
					this.loading = false;
				})
			},
			handleStar() {
				if (this.star) return;

				const {
					userId,
					storeId,
					init
				} = this;
				uni.showModal({
					title: '提示',
					content: '确定集咖？该操作不可逆',
					cancelText: "取消",
					confirmText: "确认",
					showCancel: true,
					confirmColor: '#39B54A',
					cancelColor: '#f55850',
					success: (res) => {
						if (res.confirm) {
							starStore({
								userId,
								storeId
							}).then(() => {
								init(storeId)
							})
						} else {
						}
					}
				})
			},
			getProducts(id) {
				getProduct(id).then(res => {
					this.productList = res.data.splice(0, 5)
				})
			},
			getComments(id) {
				getComment({
					storeId: id,
					pageNum: 1,
					pageSize: 1
				}).then(res => {
					this.comment = res?.data?. [0] || res?.rows?. [0]
				})
			},
			delImage(index) {
				this.files.splice(index, 1)
			},

			productDetail(item) {
				this.selectedItem = item;
				this.$refs.detail.open();
			},
		},
		onLoad(option) {
			const id = option.storeId;
			this.init(id)
		},

		onPullDownRefresh() {
			this.init(this.storeId);
		},

	}
</script>

<style lang="scss" scoped>
	.detail {
		background-color: #f7f7f7;

		.nav-img {
			width: 100%;

			.img {
				width: 100%;
				display: block;
			}
		}

		.section {
			position: relative;
			top: -50rpx;
			border-radius: 20rpx 20rpx 0 0;
			padding: 0 40rpx;
			margin: 0 30rpx;
			background-color: #fff;

			.section-title {
				padding: 30rpx 0;
				padding-bottom: 20rpx;
				border-bottom: 1px dashed #ccc;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.section-title-left {
					.name {
						color: #0C34BA;
						font-size: 45rpx;
						font-weight: bold;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.online {
						color: #646566;
					}
				}

				.section-title-right {
					color: #0c34ba;
					font-size: 34rpx;
					font-weight: bold;

					.star {
						border-color: #e8e8e8;
						color: #e8e8e8;
					}
				}
			}

			.profile {
				margin-top: 15rpx;
				color: #999;
				font-size: 32rpx;
				padding-bottom: 40rpx;
				border-bottom: 2rpx solid #e8e8e8;
			}

			.section-num {
				border-bottom: 2rpx solid #e8e8e8;
				padding: 50rpx 0;
				display: flex;
				justify-content: space-between;

				.section-num-left {
					color: #646566;
					font-size: 34rpx;
				}

				.section-num-right {
					::v-deep .u-icon-plus {
						width: 50rpx;
						color: #fff !important;
						border-radius: 50%;
						background-color: #0c34ba !important;
					}

					::v-deep .u-icon-minus {
						width: 50rpx;
						color: #b8c3eb !important;
						border-radius: 50%;
						border: 2rpx solid #b8c3eb;
						background-color: #fff !important;
					}

					::v-deep .uni-input-input {
						background-color: #fff !important;
					}
				}
			}

			.comment {
				padding-bottom: 30rpx;

				.comment-title {
					color: #646566;
					font-size: 34rpx;
					padding: 50rpx 0;
				}

				.comment-text {
					color: #999;
					font-size: 32rpx;
					padding-bottom: 30rpx;
				}
			}
		}


		.active {
			width: 140rpx;
			height: 60rpx;
			color: #fff;
			border-radius: 80rpx;
			margin-right: 30rpx;
			background-color: #0c34ba;
			text-align: center;
			line-height: 60rpx;
		}
	}

	.product {
		margin: 20rpx 0;
		padding-bottom: 30rpx;
		border-bottom: 2px solid #eee;

		>.title {
			padding: 20rpx 0;
			color: #999;
		}

		>.more {
			font-size: 28rpx;
			color: #5677fc;
			float: right;
		}
	}

	.comment-area {
		.comment-title {
			padding: 20rpx 0;
			color: #999;

			.comment-more {
				font-size: 28rpx;
				color: #5677fc;
				float: right;
			}
		}

		.comment-view {
			.comment {
				display: flex;
				padding: 30rpx;

				.left {
					image {
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
						background-color: #f2f2f2;
					}
				}

				.right {
					flex: 1;
					padding-left: 20rpx;
					font-size: 30rpx;

					.top {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 10rpx;

						.name {
							color: #5677fc;
						}

						.like {
							display: flex;
							align-items: center;
							color: #9a9a9a;
							font-size: 26rpx;

							.num {
								margin-right: 4rpx;
								color: #9a9a9a;
							}
						}
					}

					.images {
						display: inline-block;
						margin-right: 20rpx;

						image {
							width: 120rpx;
							height: 120rpx;
						}

						margin-bottom: 10rpx;

					}

					.highlight {
						color: #5677fc;

						.num {
							color: #5677fc;
						}
					}
				}

				.content {
					margin-bottom: 10rpx;
				}

				.bottom {
					margin-top: 20rpx;
					display: flex;
					font-size: 24rpx;
					color: #9a9a9a;

					.reply {
						color: #5677fc;
						margin-left: 10rpx;
					}
				}
			}
		}

		.empty {
			text-align: center;
			font-weight: 600;
			color: #ccc;
			padding: 0 0 30rpx 0;

			&.comment-post {
				color: #5677fc;
			}
		}
	}
</style>
