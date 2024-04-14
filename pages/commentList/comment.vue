<template>
	<view class="comment" :style="{height:`${height}`}">
		<view v-if="commentList.length<=0" class="empty">
			<u-empty text="暂无评论信息" mode="message"></u-empty>
		</view>
		<u-list @scrolltolower="">
			<u-swipe-action>
				<u-swipe-action-item :right-options="options" @click="a($event,index)">
					<u-list-item v-for="(i,index) in commentList" :key="index">
						<view class="comment-item">
							<view class="store-info">
								<view class="store-name">
									<text>{{i.storeName}}</text>
								</view>
								<view class="store-photo">
									<image :src="i.storePhoto" mode="widthFix" class="img"></image>
								</view>
							</view>
							<view class="comment-info">
								<view class="time">
									评论时间：{{i.publishTime}}
								</view>
								<view class="content">
									{{i.content}}
								</view>
							</view>
							<view class="more">
								<u-icon name='arrow-right'></u-icon>
							</view>
						</view>
					</u-list-item>
				</u-swipe-action-item>
			</u-swipe-action>
		</u-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 0,
				isCheckAll: false,
				commentList: [],
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
			a(e, index) {
				console.log(index)
			},
			getComment() {
				const one = {
					id: 1,// id
					nickName: '喂',//昵称
					publishTime: '2024-01-01 18:58:12',//评论发布时间
					content: '我不叫喂，我叫楚雨荨！我不叫喂，我叫楚雨荨！我不叫喂，我叫楚雨荨！',//评论内容
					avatarUrl: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',//头像地址
					likeNum: 33,//点赞数
					isLike: false,//是否已点赞（当前用户）
					storeName: 'xx咖啡店xx咖啡店xx咖啡店xx咖啡店xx咖啡店',//店铺名称
					storePhoto: '/static/images/login-bgc.jpg',//店铺图片
					allReply: 12,//回复数量
					replyList: [{//回复内容
							name: 'uview',
							contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
						},
						{
							name: '粘粘',
							contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
						}
					]
				}
				this.commentList = [1, 2, 3, 4, 5].map(i => one);

				// this.$request({
				// 	url: "/app/comment",
				// 	success: (res) => {
				// 		if (res.statusCode === 200) {
				// 			let {
				// 				result
				// 			} = res.data
				// 			result.forEach(v => {
				// 				v.checked = false
				// 			})
				// 			this.productList = result
				// 		}
				// 	}
				// })
			},
			addHeight() {
				this.height = this.productList.length * 23;
				if (this.height < 100) {
					this.height = 100 + "vh"
				} else {
					this.height = this.height + "vh"
				}
			},

			common(index, item) {
				let sum = 0
				for (let i = 0; i < this.productList.length; i++) {
					if (this.productList[i].checked) {
						sum += this.productList[i].count * parseInt(this.productList[i].price)
						this.$request({
							url: "/modifyShopcartCount",
							method: "POST",
							data: {
								sid: item.sid,
								count: item.count
							},
							success: (res) => {}
						})
					}

				}
				this.moneyAll = sum;
			}

		},
		onLoad() {
			this.getComment()
		},
		onReachBottom() {
			this.addHeight()
		}
	}
</script>

<style lang="scss" scoped>
	.comment {
		background-color: #efefef;

		::v-deep .u-swipe-action-item__content {
			background-color: transparent;
		}

		.empty {
			position: absolute;
			width: 100%;
			height: 300rpx;
			top: 50%;
			left: 0;
			margin-top: -150rpx;
		}

		.comment-item {
			display: flex;
			padding: 10rpx 20rpx;
			margin: 10rpx 0;
			background-color: #fff;
			justify-content: center;

			.store-info {
				width: 200rpx;
				overflow: hidden;

				.store-name {
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.store-photo {
					image {
						width: 100%;
					}
				}
			}

			.comment-info {
				padding: 30rpx;
				flex: 1;

				.time {
					font-size: 28rpx;
				}

				.content {
					position: relative;
					padding: 6rpx;
					top: 16rpx;
					background-color: #fbfbfb;
					font-size: 28rpx;
					height: 72rpx;
					overflow: hidden;
					-webkit-line-clamp: 2;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;

				}
			}

			.more {
				align-items: center;
				justify-content: center;
				display: flex;
			}
		}
	}
</style>
