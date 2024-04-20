<template>
	<view>
		<view class="fix-box" @click="handlePostComment">
			<view class="post-comment"
				:style="'left:'+(moveX == 0 & x>0? x+'%':moveX+'px')+';top:'+(moveY == 0 & y>0? y+'%':moveY+'px')"
				@touchstart="drag_start" @touchmove.stop.prevent="drag_hmove" mode="aspectFit"
				@click="handlePostComment">
				发表<p></p>
				评论
			</view>
		</view>
		<view class="comment" v-for="(comment, index) in commentList" :key="index">
			<view class="left">
				<image :src="comment.userAvatarUrl" mode="aspectFill"></image>
			</view>
			<view class="right">
				<view class="top">
					<view class="name">{{ comment.userNickName }}</view>
				</view>
				<view class="images" v-for="(src,idx) in comment.imageList" :key="idx">
					<image :src="src" mode="widthFix"></image>
				</view>
				<view class="content">{{ comment.commentContent }}</view>
				<view class="reply-box">
					<view class="item" v-for="(item, index) in comment.replyList" :key="index">
						<view class="username">{{ item.userNickName }}</view>
						<view class="images small" v-for="(src,idx) in item.imageList" :key="idx">
							<image :src="baseUrl+src" mode="widthFix"></image>
						</view>
						<view class="text">{{ item.commentContent }}</view>
					</view>
					<view class="all-reply" @tap="toAllReply(comment.commentId)" v-if="comment.replyList.length>0">
						共{{ comment.replyNum }}条回复
						<u-icon class="more" name="arrow-right" :size="16"></u-icon>
					</view>
				</view>
				<view class="bottom">
					{{ $util.formatDate(comment.publishTime) }}
					<view class="reply" @click="handleReply(comment.commentId)">回复</view>
				</view>
			</view>
		</view>
		<PostComment ref='postComment' :storeId="storeId" :userId="userId"  @finish="()=>init(storeId)"/>
	</view>
</template>

<script>
	import {
		getComment
	} from '@/api/api.js'
	import {
		baseUrl
	} from "@/request/request.js";
	import PostComment from "@/pages/comment/postComment.vue"
	export default {
		data() {
			return {
				commentList: [],
				storeId: null,
				userId: null,
				replyId: null,
				start: [0, 0],
				moveY: 0,
				moveX: 0,
				windowWidth: '',
				windowHeight: '',
				baseUrl: baseUrl,
			};
		},
		components: {
			PostComment
		},
		onLoad(options) {
			const id = options.storeId;
			this.init(id)
		},
		onPullDownRefresh() {
			this.init(this.storeId);
		},
		onShow() {
			const {
				windowWidth,
				windowHeight
			} = uni.getSystemInfoSync();
			this.windowWidth = windowWidth
			this.windowHeight = windowHeight
			this.moveX = windowWidth - 100
			this.moveY = windowHeight - 100
		},
		methods: {
			init(id) {
				this.userId = this.$util.getUserId();
				if (id) {
					this.storeId = id;
					this.getComment(id);
				} else {
					uni.showToast({
						title: '请求出错',
						icon: "none",
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 800)
				}
				uni.stopPullDownRefresh();
			},
			// 跳转到全部回复
			toAllReply(id) {
				uni.navigateTo({
					url: `/pages/comment/reply?commentId=${id}&storeId=${this.storeId}` ,
				});
			},
			handlePostComment() {
				this.$refs.postComment.open();
			},
			handleReply(id) {
				this.$refs.postComment.open(id);
			},
			// 评论列表
			getComment(id) {
				getComment({
					storeId: id,
					pageNum: 1,
					pageSize: 100
				}).then(res => {
					const list = res?.data || res?.rows
					this.commentList = list.map(i => ({
						...i,
						replyList: i.replyList.splice(0, 2),
						imageList: i.imageList.map(item => baseUrl + item) || [],
						userAvatarUrl: baseUrl + i.userAvatarUrl
					}))
				})
			},
			drag_start(event) {
				this.start[0] = event.touches[0].clientX - event.target.offsetLeft;
				this.start[1] = event.touches[0].clientY - event.target.offsetTop;
			},
			//判断防止悬浮球被拖出页面
			drag_hmove(event) {
				event.preventDefault();
				event.stopPropagation();
				let tag = event.touches;
				if (tag[0].clientX < 0) {
					tag[0].clientX = 0
				}
				if (tag[0].clientY < 0) {
					tag[0].clientY = 0
				}
				if (tag[0].clientX > this.windowWidth) {
					tag[0].clientX = this.windowWidth
				}
				if (tag[0].clientY > this.windowHeight) {
					tag[0].clientY = this.windowHeight
				}
				this.moveX = tag[0].clientX - this.start[0];
				this.moveY = tag[0].clientY - this.start[1];
			},
		}
	};
</script>

<style lang="scss" scoped>
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

				.highlight {
					color: #5677fc;

					.num {
						color: #5677fc;
					}
				}
			}

			.images {
				$w: 180rpx;

				&.small {
					margin-right: 10rpx;
					margin-bottom: 5rpx;

					image {
						$sw: $w * 2 /3;
						width: $sw;
						height: $sw;
					}
				}

				display: inline-block;
				margin-right: 20rpx;
				margin-bottom: 10rpx;

				image {
					width: $w;
					height: $w;
				}


			}

			.content {
				margin-bottom: 10rpx;
			}

			.reply-box {
				background-color: rgb(242, 242, 242);
				border-radius: 12rpx;

				.item {
					padding: 20rpx;
					border-bottom: solid 2rpx $u-border-color;

					.username {
						font-size: 24rpx;
						color: #999999;
					}
				}

				.all-reply {
					padding: 20rpx;
					display: flex;
					color: #5677fc;
					align-items: center;

					.more {
						margin-left: 6rpx;
					}
				}
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

	.fix-box {
		width: 100%;
		height: 100%;
	}

	.post-comment {
		background: #FFFFFF;
		box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.35);
		border-radius: 50%;
		color: #26A2FF;
		position: fixed !important;
		width: 120rpx;
		height: 120rpx;
		text-align: center;
		z-index: 999 !important;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
