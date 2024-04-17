<template>
	<view class="detail">
		<!-- 商品大图 -->
		<view class="nav-img">
			<u-swiper :loading="loading" :height="250" :list="storeInfo.imageList"  indicator
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
						@click="star=!star">{{star?'已':''}}集咖</button>
				</view>
			</view>
			<view class="profile">
				<text>店铺简介：</text>
				<text style="color: #000;">{{storeInfo.simpleTitle}}</text>
			</view>
			<view class="product">
				<text class="title">推荐商品：</text>
				<swiper-list :data="productList" textKey='simpleTitle' @click="productDetail"></swiper-list>
				<u-popup closeable :show="showProductDetail" @close="showProductDetail=false">
					<view class="detail-popup">
						<view class="title">商品详情
							<view class="close-btn" @click="showProductDetail=false">✕</view>
						</view>

						<view class="content">
							<view class="info">
								<image :src="selectedProduct.src" class="product-img">
								</image>
								<view class="right">
									<view class="title">{{selectedProduct.name}}</view>
									<view class="simpleTitle">{{selectedProduct.simpleTitle}}</view>
								</view>

							</view>
							<view class="desc">
								<view v-for="(i,idx) in (selectedProduct.desc||'').split('\n')" :key="idx">
									{{i}}
								</view>
							</view>
						</view>
					</view>
				</u-popup>
			</view>
			<!-- 商品描述 -->
			<view class="comment-area">
				<view class="comment-title">
					<text>相关评论</text>
					<text class="comment-more" @click="toComment">查看全部评论></text>
				</view>
				<view class="comment-view">
					<view class="comment">
						<view class="left">
							<image :src="comment.url" mode="aspectFill"></image>
						</view>
						<view class="right">
							<view class="top">
								<view class="name">{{ comment.name }}</view>
								<view class="like" :class="{ highlight: comment.isLike }">
									<view class="num">{{ comment.likeNum }}</view>
									<u-icon v-if="!comment.isLike" name="thumb-up" :size="30" color="#9a9a9a"
										@click="getLike()"></u-icon>
									<u-icon v-if="comment.isLike" name="thumb-up-fill" :size="30" @click="getLike()">
									</u-icon>
								</view>
							</view>
							<view class="content">{{ comment.contentText }}</view>
							<view class="bottom">
								{{ comment.date }}
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import SwiperList from '@/pages/component/swiperList.vue';
	import {getStoreById,getProduct,getComment} from '@/api/api.js'
	export default {
		data() {
			return {
				loading: true,
				showProductDetail: false,
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://th.bing.com/th/id/OIP.Bu_aiW-BSGDi0O9RpL67mgHaHa?w=169&h=180&c=7&r=0&o=5&pid=1.7',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				productList: [1, 2, 3, 4, 5].map(i => ({
					id: 1,
					name: '招牌美式',
					simpleTitle: '喝美式咖啡，剪美式寸头，品自由人生',
					desc: '💫 唤醒味蕾的醇香之旅\n每一滴纯正美式咖啡， 都蕴藏着丰富的咖啡香气与独特的口感。 从精心挑选的优质咖啡豆开始， 经过严格烘焙与精细研磨， 只为给您带来一杯浓郁而不失细腻的美式咖啡。\n🌱 精选咖啡豆， 品质至上\n我们坚持选用来自全球优质咖啡产区的顶级咖啡豆， 确保每一粒豆子都饱含着大自然的馈赠。 通过独特的烘焙工艺， 我们保留了咖啡豆的原始风味， 让每一杯美式咖啡都散发出迷人的香气。\n💧 精细研磨， 口感丝滑\n采用先进的研磨技术， 我们确保咖啡粉的细腻度恰到好处， 让每一滴咖啡都能充分释放出浓郁的味道。 在热水的冲泡下， 咖啡粉与水完美融合， 呈现出一杯口感丝滑、 回甘无穷的美式咖啡。\n☕ 随时随地， 尽享咖啡时光\n无论您是在办公室、 家中还是户外， 只要有一杯纯正美式咖啡在手， 就能轻松享受美好的咖啡时光。 它不仅能提神醒脑， 还能让您在忙碌的生活中找到片刻的宁静与放松。\n🎁 礼盒装更优惠， 分享美好时光我们还特别推出了美式咖啡礼盒装， 让您在享受美味的同时， 还能与亲朋好友分享这份来自咖啡的美好时光。 现在下单， 还有更多优惠等着您哦！',
					src: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.cGEcABHEjqpBysEsqTGQzAHaHa?w=204&h=204&c=7&r=0&o=5&pid=1.7'
				})),
				storeInfo: {},
				selectedProduct: {},
				value: 1,
				pid: "",
				rule: "",
				ruleList: [],
				star: false,
				comment: {
					id: 1,
					name: '叶轻眉',
					date: '12-25 18:58',
					contentText: '我不信伊朗会没有后续反应，美国肯定会为今天的事情付出代价的',
					url: 'https://cdn.uviewui.com/uview/template/SmilingDog.jpg',
					allReply: 12,
					likeNum: 33,
					isLike: false,
					replyList: [{
							name: 'uview',
							contentStr: 'uview是基于uniapp的一个UI框架，代码优美简洁，宇宙超级无敌彩虹旋转好用，用它！'
						},
						{
							name: '粘粘',
							contentStr: '今天吃什么，明天吃什么，晚上吃什么，我只是一只小猫咪为什么要烦恼这么多'
						}
					]
				},
			}
		},
		components: {
			SwiperList
		},
		methods: {
			productDetail(item) {
				this.showProductDetail = true;
				this.selectedProduct = item;
				console.log(111, item);
			},
			toComment(){
				uni.navigateTo({
					url:'/pages/comment/index',
				})
			},
			getStoreInfo(id){
				getStoreById(id).then(res=>{
					this.storeInfo=res.data;
					console.log('111store',res)
				})
			},
			getProducts(id){
				getProduct(id).then(res=>{
					this.productList=res.data
				})
			},
			getComments(id){
				getComment({
					storeId:id,
					pageNum:1,
					pageSize:1
				}).then(res=>{
					console.log('comment',res.data);
					// this.comment=comment
				})
			},
			add(i, item) {
				if (i === item.activeIndex) {
					return
				}
				item.activeIndex = i

			},
			addProduct() {
				let rule = this.ruleList.join("/")
				this.$request({
					url: "/addShopcart",
					data: {

						pid: this.pid,
						count: this.value,
						rule: rule
					},
					method: "POST",
					success: (res) => {
						console.log(res)
					}

				})
			},
		},
		onLoad(option) {
			const id = option.storeId;
			setTimeout(() => {
				this.loading = false;
			}, 2000)
			console.log(523,id);
			this.getStoreInfo(id);
			this.getProducts(id);
			this.getComments(id);
		}

	}
</script>

<style lang="scss" scoped>
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
			}
		}
	}

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
	.product{
		margin: 20rpx 0;
		padding-bottom: 30rpx;
		border-bottom: 2px solid #eee;
		>.title{
			padding: 20rpx 0;
			color:#999;
		}
	}
	.comment-area {
		.comment-title {
			padding: 20rpx 0;
			color: #999;
			.comment-more{
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
	}
</style>
