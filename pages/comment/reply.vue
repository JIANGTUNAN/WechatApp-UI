<template>
	<view class="wrap">
		<view class="comment">
			<view class="top">
				<view class="left">
					<view class="heart-photo">
						<image :src="baseUrl+comment.userAvatarUrl" mode=""></image>
					</view>
					<view class="user-info">
						<view class="name">{{ comment.userNickName }}</view>
						<view class="date">{{$util.formatDate(comment.publishTime)}}
						</view>
						<view class="reply-btn" @click="handleReply(item.commentId)">
							回复
						</view>
					</view>
				</view>
			</view>
			<view class="images" v-for="(src,idx) in comment.imageList" :key="idx">
				<image :src="baseUrl+src" mode="widthFix"></image>
			</view>
			<view class="content">{{ comment.commentContent }}</view>
		</view>
		<view class="all-reply">
			<view class="all-reply-top">全部回复（{{ comment.replyNum }}）</view>
			<view class="item" v-for="(item, index) in comment.secondLevelComments" :key="index">
				<view class="comment">
					<view class="top">
						<view class="left">
							<view class="heart-photo">
								<image :src="baseUrl+item.cuserAvatarUrl" mode=""></image>
							</view>
							<view class="user-info">
								<view class="name">{{ item.cuserNickName }}
									<view class="replay-person" v-if="item.ruserId">
										回复
										<view class="ruser-info">
											<image :src="baseUrl+item.ruserAvatarUrl" mode=""></image>
											{{ item.ruserNickName }}
										</view>
									</view>
								</view>
								<view class="date">{{ $util.formatDate(item.publishTime) }}

								</view>
								<view class="reply-btn" @click="handleReply(item.commentId)">
									回复
								</view>
							</view>
						</view>
					</view>
					<view class="images" v-for="(src,idx) in item.imageList" :key="idx">
						<image :src="baseUrl+src" mode="widthFix"></image>
					</view>
					<view class="content">{{ item.commentContent }}</view>
				</view>
			</view>
		</view>
		<PostComment ref='postComment' :storeId="storeId"  @finish="()=>init(commentId)" />

	</view>
</template>

<script>
	import PostComment from "@/pages/comment/postComment.vue"
	import {
		getCommentDetail
	} from "@/api/api.js";
	import {
		baseUrl
	} from "@/request/request.js";

	export default {
		data() {
			return {
				commentList: [],
				comment: '',
				commentId: null,
				baseUrl,
				storeId:null,
			};
		},
		components: {
			PostComment
		},
		onLoad(options) {
			const id = options.commentId;
			this.storeId = options.storeId;
			this.init(id)
		},
		onPullDownRefresh() {
			this.init(this.commentId);
		},
		methods: {
			init(id) {
				if (id) {
					this.commentId = id;
					this.getReply(id);
				} else {
					uni.showToast({
						title: '请求出错',
						icon: "none",
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 800)
				}
				uni.stopPullDownRefresh()
			},
			// 回复列表
			getReply(id) {
				getCommentDetail(id).then(res => {
					this.comment = res.data;
				})
			},
			handleReply(id){
				this.$refs.postComment.open(id);
			}
		}
	};
</script>

<style lang="scss" scoped>
	page {
		background-color: #f2f2f2;
	}

	.comment {
		padding: 30rpx;
		font-size: 32rpx;
		background-color: #ffffff;
		position: relative;

		.images {
			$w: 180rpx;

			display: inline-block;
			margin-right: 20rpx;
			margin-bottom: 10rpx;

			image {
				width: $w;
				height: $w;
			}


		}

		.top {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10rpx;
		}

		.left {
			display: flex;

			.heart-photo {
				image {
					width: 64rpx;
					height: 64rpx;
					border-radius: 50%;
					background-color: #f2f2f2;
				}
			}

			.user-info {
				width: 100%;
				margin-left: 10rpx;

				.name {
					color: #5677fc;
					font-size: 28rpx;
					margin-bottom: 4rpx;

					.replay-person {
						display: inline-block;
						color: #999;
						font-size: 24rpx;
						margin-left: 20rpx;

						.ruser-info {
							margin-left: 20rpx;
							color: #5677fc;

							image {
								width: 30rpx;
								height: 30rpx;
								border-radius: 50%;
							}

							display: inline-block;
						}
					}
				}

				.date {
					width: 100%;
					font-size: 20rpx;
					color: $u-light-color;

				}

				.reply-btn {
					position: absolute;
					right: 60rpx;
					top: 40rpx;
					color: #5677fc;
				}
			}

		}

		.right {
			display: flex;
			font-size: 20rpx;
			align-items: center;
			color: #9a9a9a;

			.like {
				margin-left: 6rpx;
			}

			.num {
				font-size: 26rpx;
				color: #9a9a9a;
			}
		}

		.highlight {
			color: #5677fc;

			.num {
				color: #5677fc;
			}
		}
	}

	.all-reply {
		margin-top: 10rpx;
		padding-top: 20rpx;
		background-color: #ffffff;

		.all-reply-top {
			margin-left: 20rpx;
			padding-left: 20rpx;
			border-left: solid 4rpx #5677fc;
			font-size: 30rpx;
			font-weight: bold;
		}

		.item {
			border-bottom: solid 2rpx $u-border-color;
		}

		.reply {
			padding: 20rpx;
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			margin: 10rpx 0;

			.username {
				font-size: 24rpx;
				color: #7a7a7a;
			}
		}
	}
</style>
