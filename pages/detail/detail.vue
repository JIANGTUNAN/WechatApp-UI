<template>
	<view class="detail">
		<!-- 商品大图 -->
		<view class="nav-img">
			<image :src="detailArray.large_img" mode="widthFix" class="img"></image>
		</view>
		<!-- 商品内容 -->
		<view class="section">
			<!-- 商品名 -->
			<view class="section-title">
				<view class="section-title-left">
					<view class="name">
						{{detailArray.name}}
					</view>

				</view>
				<view class="section-title-right">
					￥{{detailArray.price}}
				</view>
			</view>
			<view class="enname">
				{{detailArray.enname}}
			</view>
			<!-- 选项 -->
			<view class="section-type">
				<view class="section-type-box" v-for="(item,index) in detailArray.arr" :key="index">
					<view class="section-type-title">
						{{item.title}}
					</view>
					<view class="section-classfig">
						<view class="section-item" v-for="(v,i) in item.arr" :key="i" @click="add(i,item)"
							:class="{active:i===0}">
							<view :class="{active:i===item.activeIndex}">
								{{v.title}}
							</view>
						</view>

					</view>
				</view>
			</view>
			<!-- 数量选择 -->
			<view class="section-num">
				<view class="section-num-left">
					选择数量
				</view>
				<view class="section-num-right">
					<u-number-box v-model="value"></u-number-box>
				</view>
			</view>
			<!-- 商品描述 -->
			<view class="foot">
				<view class="foot-title">
					商品 描述
				</view>
				<view class="foot-text" v-for="(items,indexs) in detailArray.desc" :key="indexs">
					{{indexs+1}}.{{items}}
				</view>

			</view>
			
		</view>
		<!-- 底栏 -->
		<view class="footer">
			<view class="footer-left">
				<view class="footer-icon-1">
					<u-badge type="error" count="6" :absolute="false" class="count_1"></u-badge>
					<view class="icon-box_1">
						<u-icon name="bag-fill" size="40"></u-icon>
					</view>
					<view class="footer-text">
						购物袋
					</view>
				</view>
				<view class="footer-icon-2">
					<view class="icon-box_2">
						<u-icon name="heart-fill" size="40"></u-icon>
					</view>
					<view class="footer-text">
						收藏
					</view>
				</view>

			</view>
			<view class="footer-right">
				<button type="default" class="btn_1" @click="addProduct">加入购物袋</button>
				<button type="default" class="btn_2">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailArray: "",
				value: 1,
				pid:"",
				rule:"",
				ruleList:[]
				
			}
		},
		methods: {

			getDetailType(pids) {
				uni.request({
					url: "http://www.kangliuyong.com:10002/productDetail",
					data: {
						appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
						pid: pids
					},

					success: (res) => {
						// console.log(res)
						let typeList = ['cream', 'milk', 'sugar', 'tem']
						let arr = []
						res.data.result[0].desc = res.data.result[0].desc.split(/\n/)
						let data = res.data.result[0]
						typeList.forEach(v => {
							if (!data[v]) {
								return
							}
							let captian = {
								title: data[`${v}_desc`],
								activeIndex: 0,
								arr: []
							}
							let teamArray = data[v].split('/')
							teamArray.forEach(item => {
								let team = {
									title: item
								}
								captian.arr.push(team)
							})
							arr.push(captian)
						})
						data.arr = arr
						this.detailArray = data
						this.ruleIdea()

					}
				})
			},
			add(i, item) {
				if (i === item.activeIndex) {
					return
				}
				item.activeIndex = i
				this.ruleIdea()
				
			},
			addProduct() {
			let rule=this.ruleList.join("/")
				this.$myRequest({
					url: "/addShopcart",
					data:{
						
						pid: this.pid,
						count: this.value,
						rule: rule
					},
					method:"POST",
					success:(res)=>{
						console.log(res)
					}

				})
			},
			ruleIdea(){
				this.ruleList=[]
				this.detailArray.arr.forEach(v=>{
					this.ruleList.push(v.arr[v.activeIndex].title)
				})
				console.log(this.ruleList)
			}
		},
		onLoad(option) {
			this.pid=option.pid
			this.getDetailType(option.pid)
			
		}
		
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
				padding-bottom: 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.section-title-left {
					.name {
						color: #646566;
						font-size: 45rpx;
						font-weight: bold;
					}

				}

				.section-title-right {
					color: #0c34ba;
					font-size: 34rpx;
					font-weight: bold;
				}
			}

			.enname {
				color: #999;
				font-size: 32rpx;
				padding-bottom: 40rpx;
			}

			.section-type {
				border-bottom: 2rpx solid #e8e8e8;
				padding-bottom: 30rpx;

				.section-type-box {
					padding-bottom: 30rpx;
					display: flex;
					align-items: center;

					.section-type-title {
						color: #646566;
						font-size: 34rpx;
						flex: 2;
					}

					.section-classfig {
						display: flex;
						flex: 8;

						.section-item {
							width: 140rpx;
							height: 60rpx;
							color: #646566;
							border-radius: 80rpx;
							margin-right: 30rpx;
							background-color: #e8e8e8;
							text-align: center;
							line-height: 60rpx;
						}
					}
				}
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

			.foot {
				padding-bottom: 30rpx;

				.foot-title {
					color: #646566;
					font-size: 34rpx;
					padding: 50rpx 0;
				}

				.foot-text {
					color: #999;
					font-size: 32rpx;
					padding-bottom: 30rpx;
				}
			}
		}

		.footer {
			height: 130rpx;
			padding: 0 10rpx;
			background-color: #fff;
			display: flex;
			align-items: center;

			.footer-left {
				flex: 3;
				display: flex;

				.footer-icon-1 {
					position: relative;
					width: 90rpx;
					height: 60rpx;

					.count_1 {
						position: absolute !important;
						top: -20rpx !important;
						left: 50rpx;
						width: 35rpx;
						height: 35rpx;

					}

					.icon-box_1 {
						display: flex;
						justify-content: center;

					}

					.footer-text {
						margin-top: 10rpx;
					}
				}

				.footer-icon-2 {
					margin-left: 20rpx;

					.icon-box_2 {
						display: flex;
						justify-content: center;
					}

					.footer-text {
						margin-top: 10rpx;
					}
				}

			}

			.footer-right {
				height: 100rpx;
				flex: 7;
				display: flex;
				justify-content: flex-start;

				.btn_1 {
					width: 270rpx;
					color: #fff;
					font-size: 32rpx;
					font-weight: bold;
					border-radius: 80rpx 0 0 80rpx;
					background-color: #6a91ec;
					line-height: 100rpx;
				}

				.btn_1::after {
					content: '';
					border: none;
				}

				.btn_2 {
					width: 270rpx;
					color: #fff;
					font-size: 32rpx;
					font-weight: bold;
					border-radius: 0 80rpx 80rpx 0;
					background-color: #0c34ba;
					line-height: 100rpx;
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
</style>
