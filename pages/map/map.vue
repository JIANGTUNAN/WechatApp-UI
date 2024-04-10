<template>
	<view class="meau" ref="document" :style="{height:`${height}`}">
		<view class="map">
				<image src="/static/images/map.jpg" mode="widthFix" alt="">
		</view>
		<view class="search">
			<view class="search-box">
				<uni-icons type="search" color="#0c34ba" size="16"></uni-icons>
				<input type="search" value="" class="ipt"  placeholder="请输入商品名" />
			</view>

		</view>
		<view class="classfig-hidden">

			<view class="classfig">

				<view class="classfig-box" v-for="(v,i) in typeList" @click="typeLight(i,v)">
					<view class="img-box">
						<image :src="i===count?typeList[0].iconArray[i].selectIcon:typeList[0].iconArray[i].icon"
							mode="widthFix" class="img"></image>
					</view>
					<view class="classfig-name" :class="{active:i===count}">
						{{v.typeDesc}}
					</view>
				</view>
			</view>
		</view>
		<view class="product" v-for="(item,index) in productList" :key="index" @click="getDetail(item)">
			<view class="product-left">
				<view class="img-box">
					<image :src="item.largeImg" mode="widthFix center" class="img"></image>
				</view>
				<view class="product-text">
					<view class="product-name">
						{{item.name}}
					</view>
					<view class="product-enname">
						{{item.enname}}
					</view>
				</view>

			</view>
			<view class="product-right">
				￥{{item.price}}
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {

			return {
				isHot: {
					typeDesc: "推荐",
					id: 0
				},
				typeList: [],
				iconList: [{
						title: "isHot",
						icon: "https://z3.ax1x.com/2021/09/10/hXiRbD.gif",
						selectIcon: "https://z3.ax1x.com/2021/09/10/hXFei9.gif"
					},
					{
						title: "latte",
						icon: "https://z3.ax1x.com/2021/09/10/hXFtJA.gif",
						selectIcon: "https://z3.ax1x.com/2021/09/10/hXFdQP.gif"
					},
					{
						title: "coffee",
						icon: "https://z3.ax1x.com/2021/09/10/hXFwsf.gif",
						selectIcon: "https://z3.ax1x.com/2021/09/10/hXFrdg.gif"
					},
					{
						title: "rena_ice",
						icon: "https://z3.ax1x.com/2021/09/10/hXFcJs.gif",
						selectIcon: "https://z3.ax1x.com/2021/09/10/hXF7FJ.gif"
					},
					{
						title: "fruit_tea",
						icon: "https://z3.ax1x.com/2021/09/10/hXFOQx.gif",
						selectIcon: "https://z3.ax1x.com/2021/09/10/hXFzwD.png"
					},
				],
				count: 0,
				productList: [],
				height: ""
			}
		},
		methods: {
			getType() {
				uni.request({
					url: "http://www.kangliuyong.com:10002/type",
					data: {
						appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
					},
					success: (res) => {

							this.typeList = res.data.result
							this.typeList.unshift(this.isHot)
							this.typeList[0].iconArray = this.iconList;
						}
				})
			},
			typeLight(index, item) {
				if (this.count === index) {
					return;
				}
				this.count = index
				this.productType(index, item)
				this.height=100+'vh'
				
			},
			productType(index, item) {
				uni.showLoading({
					title:"正在加载",
					mask:true
				})
				let key = ""
				let value = ""
				if (index === 0) {
					key = 'isHot',
						value = 1
				} else {
					key = 'type',
						value = item.type
				}
				uni.request({
					url: "http://www.kangliuyong.com:10002/typeProducts",
					data: {
						appkey: "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
						key: key,
						value: value
					},
					success: (res) => {

						if (res.statusCode === 200) {
							uni.hideLoading()
							this.productList = res.data.result
							console.log(this.productList)
						}
					}
				})
				
			},
				
			addHeight() {
				this.height = this.productList.length * 21;
					
				if(this.height<100){
					this.height=100+"vh"
				}else{
					this.height=this.height+"vh"
				}
				
			
			},
			getDetail(item){
				uni.navigateTo({
					url:`../detail/detail?pid=${item.pid}`
				})
			}

		},
		onLoad() {
			this.getType()
			this.productType(0)
		},
		onReachBottom() {
			this.addHeight()
		}

	}
</script>

<style lang="less" scoped>
	.meau {
		height: 100vh;
		background-color: #f7f7f7;
		
		.map{
			image{
				width: 100%;
			}
		}
		.search {
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

		.classfig-hidden {
			position: sticky;
			top: 0;
			width: 100%;
			height: 150rpx;
			margin: 30rpx 0;
			padding-top: 20rpx;
			background-color: #fff;
			overflow: hidden;
			z-index: 99;



			.classfig {
				height: 180rpx;
				display: flex;
				overflow-x: auto;

				.classfig-box {
					width: 190rpx;
					height: 130rpx;
					flex-shrink: 0;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;

					.img-box {
						width: 80rpx;
						height: 80rpx;

						.img {
							width: 100%;
						}
					}

					.classfig-name {
						width: 120rpx;
						font-size: 32rpx;
						text-align: center;
					}
				}
			}
		}

		.active {
			color: #0c34ba;
		}

		.product {
			border-radius: 20rpx;
			padding: 20rpx;
			margin: 0 30rpx;
			margin-bottom: 30rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.product-left {
				display: flex;
				align-items: center;

				.img-box {
					width: 150rpx;
					height: 150rpx;

					.img {
						width: 100%;
						height: 100%;
					}
				}

				.product-text {
					height: 100rpx;
					color: #787878;
					margin-left: 30rpx;

					.product-name {
						width: 300rpx;
						height: 45rpx;
						padding-bottom: 20rpx;
						text-align: start;
						display: -webkit-box;
						white-space: pre-wrap;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
					}

					.product-enname {
						width: 300rpx;
						height: 45rpx;
						font-size: 30rpx;
						text-align: start;
						display: -webkit-box;
						white-space: pre-wrap;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
					}
				}

			}

			.product-right {
				color: #0c34ba;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
	}
</style>
