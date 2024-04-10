<template>
	<view class="shopping" :style="{height:`${height}`}">
		<view class="nav">
			<view class="nav-left">
				<u-icon name="arrow-left" color="#0c34ba" size="40"></u-icon>
				<text>返回</text>
			</view>
			<view class="nav-center common">
				购物袋
			</view>
			<view class="nav-right common">
				编辑
			</view>
		</view>
		<view class="section-bg">
			<view class="img-box">
				<image src="../../static/images/shopbag_bg.png" mode="widthFix" class="img"></image>
			</view>
		</view>
		<view class="section-product" v-for="(item,index) in productList" :key="index">
			<uni-swipe-action>
				<uni-swipe-action-item :right-options="options" @click="a($event,index)">
					<view class="section-product-item">
						<view class="section-product-left">
							<view class="section-product-checkBox">
								<u-checkbox v-model="item.checked" @change="change($event,index,item)"></u-checkbox>
							</view>
							<view class="left-box">
								<view class="img-box-left">
									<image :src="item.small_img" mode="widthFix" class="img"></image>
								</view>
								<view class="right">
									<view class="right-name-box">
										<view class="name">
											{{item.name}}
										</view>
										<view class="type">
											{{item.rule}}
										</view>
									</view>
									<view class="enname">
										{{item.enname}}
									</view>
									<view class="price">
										￥{{item.price}}
									</view>
								</view>
							</view>

						</view>
						<view class="section-product-right">
							<u-number-box v-model="item.count" @change="valChange($event,index,item)"></u-number-box>
						</view>

					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>

		</view>
		<view class="foot">
			<view class="foot-left">
				<u-checkbox @change="checkAll" v-model="isCheckAll"></u-checkbox>
				<text class="left-text">{{isCheckAll?"不全选":"全选"}}</text>
			</view>
			<view class="foot-right">
				<text class="right-text">合计:</text>
				<view class="foot-price">
					<text class="one-price">$</text>
					<text class="two-price">{{moneyAll}}.00</text>

				</view>
				<button type="default" class="btn">提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 0,
				isCheckAll: false,
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
			getProduct() {
				this.$myRequest({
					url: "/findAllShopcart",
					success: (res) => {
						if (res.statusCode === 200) {
							let {
								result
							} = res.data
							result.forEach(v => {
								v.checked = false
							})
							this.productList = result
						}
					}
				})
			},
			addHeight() {
				this.height = this.productList.length * 23;

				if (this.height < 100) {
					this.height = 100 + "vh"
				} else {
					this.height = this.height + "vh"
				}


			},

			change(e, index, item) {
				if (e.value) {
					this.addMoney(item)
				} else {
					this.delMoney(item)
				}
				this.productList[index].checked = e.value
				for (let i = 0; i < this.productList.length; i++) {
					if (!this.productList[i].checked) {
						this.isCheckAll = false
						return
					}
				}
				this.isCheckAll = true


			},
			checkAll(e) {

				this.isCheckAll = e.value
				this.productList.forEach(v => {
					v.checked = e.value
				})
				if (e.value) {
					this.common()
				} else {
					this.moneyAll = 0
				}
			},
			addMoney(item) {
				let sum = item.count * parseInt(item.price)
				this.moneyAll += sum
			},
			delMoney(item) {
				let sum = item.count * parseInt(item.price)
				this.moneyAll -= sum
			},
			valChange(e, index, item) {
				this.common(index, item)

			},
			common(index, item) {
				let sum = 0
				for (let i = 0; i < this.productList.length; i++) {
					if (this.productList[i].checked) {
						sum += this.productList[i].count * parseInt(this.productList[i].price)
						this.$myRequest({
							url: "/modifyShopcartCount",
							method: "POST",
							data: {
								sid: item.sid,
								count: item.count
							},
							success: (res) => {
							}
						})
					}

				}
			this.moneyAll = sum
		
		}

	},
	onLoad() {
			this.getProduct()
		},
		onReachBottom() {
			this.addHeight()
		}
	}
</script>

<style lang="less" scoped>
	.shopping {
		background-color: #f7f7f7;

		.nav {
			position: sticky;
			top: 0;
			height: 100rpx;
			font-size: 34rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			z-index: 99;

			.common {
				height: 70rpx;
				text-align: center;
				line-height: 70rpx;
			}

			.nav-left {
				height: 70rpx;
				color: #0c34ba;
				margin-left: 30rpx;
				display: flex;
				justify-items: center;
				align-items: center;
				flex: 1.5;
			}

			.nav-center {
				font-size: 38rpx;
				flex: 6.5;
			}

			.nav-right {
				flex: 2;
			}
		}

		.section-bg {
			.img-box {
				.img {
					width: 100%;
					display: block;
				}
			}
		}

		.section-product {
			margin: 30rpx;

			.section-product-item {
				position: relative;
				border-radius: 20rpx;
				padding: 10rpx 20rpx;
				background-color: #fff;
				overflow: hidden;
				display: flex;
				align-items: center;

				.section-product-left {
					display: flex;
					align-items: center;

					.section-product-checkBox {
						line-height: 200rpx;
					}

					.left-box {
						display: flex;

						.img-box-left {
							width: 170rpx;
							height: 170rpx;

							.img {
								width: 100%;
							}
						}

						.right {
							margin-left: 30rpx;

							.right-name-box {
								border-bottom: 2rpx solid #ccc;
								padding-bottom: 10rpx;
								display: flex;
								align-items: flex-end;

								.name {
									font-size: 36rpx;
								}

								.type {
									font-size: 28rpx;
									margin-left: 30rpx;

								}
							}

							.enname {
								width: 350rpx;
								height: 40rpx;
								font-size: 28rpx;
								margin-top: 10rpx;
								margin-bottom: 30rpx;
								text-align: start;
								display: -webkit-box;
								white-space: pre-wrap;
								overflow: hidden;
								text-overflow: ellipsis;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 1;
							}

							.price {
								color: #0c34ba;
								font-weight: bold;
							}
						}
					}
				}

				.section-product-right {
					position: absolute;
					bottom: 20rpx;
					right: 20rpx;

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
		}

		.foot {
			position: fixed;
			bottom: 120rpx;
			width: 100%;
			padding: 0 30rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.foot-left {
				margin-left: 20rpx;
				display: flex;
				align-items: center;

				.left-text {}
			}

			.foot-right {
				display: flex;
				align-items: center;

				.right-text {}

				.foot-price {
					color: #0c34ba;
					margin: 0 30rpx;

					.one-price {
						font-size: 28rpx;
					}

					.two-price {

						font-size: 40rpx;

					}
				}

				.btn {
					width: 200rpx;
					height: 80rpx;
					color: #fff;
					font-size: 34rpx;
					border-radius: 80rpx;
					background-color: #0c34ba;
					line-height: 80rpx;
					text-align: center;
				}
			}
		}

	}
</style>
