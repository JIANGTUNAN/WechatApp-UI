<template>
	<view class="collection">
		<view class="list">
			<view class="store" v-for="(item,index) in list" :key="index" @click="getDetail(item)">
				<view class="img-box">
					<image :src="item.largeImg" mode="widthFix center" class="img"></image>
				</view>
				<view class="store-text">
					<view class="store-name">
						<text class="content">{{item.name}}</text>
						<u-icon v-if="item.star" color='#0c34ba' name="checkmark-circle"></u-icon>
					</view>
					<view class="store-introduce">
						{{item.enname}} 
					</view>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list: [{
						"id": 7,
						"pid": "latte004",
						"type": "coffee",
						"name": "焦糖拿铁 融入醇香焦糖风味，香甜温暖，令人沉醉",
						"price": "28.00",
						"desc": "拿铁中融入醇香焦糖风味，香甜温暖，令人沉醉。\n主要原材料：浓缩咖啡，牛奶，焦糖风味糖浆。\n图片仅供参考，请以实物为准。建议送达后尽快饮用。",
						"smallImg": "http://www.kangliuyong.com:10002/images/product_small/IMG_0384_02p.jpg",
						"largeImg": "http://www.kangliuyong.com:10002/images/product_large/IMG_0384_02.jpg",
						"typeDesc": "拿铁",
						"isHot": 1,
						"enname": "CaramelLatteCaramelLatteCaramel LatteCaramel LatteCaramel LatteCaramel LatteCaramel LatteCaramel LatteCaramel Latte",
						"createdAt": "2021-01-24T10:53:54.000Z",
						"updatedAt": "2021-01-24T10:53:54.000Z"
					},
					{
						"id": 8,
						"pid": "latte005",
						"type": "coffee",
						"name": "榛果拿铁",
						"price": "28.00",
						"desc": "榛果爱好者的选择！香甜榛果风味与咖啡牛奶融合，诠释另一种新鲜风味。\n主要原材料：浓缩咖啡，牛奶，榛子风味糖浆。\n图片仅供参考，请以实物为准。建议送达后尽快饮用。",
						"smallImg": "http://www.kangliuyong.com:10002/images/product_small/IMG_0385_02p.jpg",
						"largeImg": "http://www.kangliuyong.com:10002/images/product_large/IMG_0385_02.jpg",
						"typeDesc": "拿铁",
						"isHot": 1,
						"enname": "Hazelnut Latte",
						"createdAt": "2021-01-24T10:53:54.000Z",
						"updatedAt": "2021-01-24T10:53:54.000Z"
					},
					{
						"id": 13,
						"pid": "coffee006",
						"type": "coffee",
						"name": "奥瑞白",
						"price": "28.00",
						"desc": "咖啡与牛奶黄金配比，奶香四溢，口感香醇。\n主要原材料：浓缩咖啡，牛奶。\n图片仅供参考，请以实物为准。建议送达后尽快饮用。",
						"smallImg": "http://www.kangliuyong.com:10002/images/product_small/IMG_0390_02p.jpg",
						"largeImg": "http://www.kangliuyong.com:10002/images/product_large/IMG_0390_02.jpg",
						"typeDesc": "咖啡",
						"isHot": 1,
						"enname": "Flat White",
						"createdAt": "2021-01-24T10:53:54.000Z",
						"updatedAt": "2021-01-24T10:53:54.000Z"
					},
					{
						"id": 15,
						"pid": "latte006",
						"type": "latte",
						"name": "黑糖啵啵拿铁",
						"price": "28.00",
						"desc": "独特的黑糖风味拿铁，佐以Q嫩儒糯的黑糖口味珍珠，创造出层次丰富的美妙口感。（建议搅拌后饮用）\n主要原材料：浓缩咖啡，黑糖味珍珠，纯牛奶，黑糖味调味糖浆，原味调味糖浆，可选择添加搅打奶油（含香草风味糖浆）\n图片仅供参考，请以实物为准，建议取餐后尽快饮用。",
						"smallImg": "http://www.kangliuyong.com:10002/images/product_small/IMG_0392_02p.jpg",
						"largeImg": "http://www.kangliuyong.com:10002/images/product_large/IMG_0392_02.jpg",
						"typeDesc": "拿铁",
						"isHot": 1,
						"enname": "Brown Sugar Bubble Latte",
						"createdAt": "2021-01-24T10:53:54.000Z",
						"updatedAt": "2021-01-24T10:53:54.000Z"
					},
					{
						"id": 18,
						"pid": "fruit_tea001",
						"type": "fruit_tea",
						"name": "满杯百香果",
						"price": "17.00",
						"desc": "清新又浓郁的百香果香气，混合清新茉莉茶香，加上椰果与寒天的爽滑Q弹，满杯椰香果香茶香。\n主要原材料：椰果、百香果汁、原味寒天晶球、茉莉绿茶、原味调味糖浆。\n图片仅供参考，请以实物为准，建议取餐后尽快饮用。",
						"smallImg": "http://www.kangliuyong.com:10002/images/product_small/d001_small.png",
						"largeImg": "http://www.kangliuyong.com:10002/images/product_large/d001.png",
						"typeDesc": "水果茶",
						"isHot": 1,
						"enname": "Passion Fruit & Coconut Jelly Jasmine Tea",
						"createdAt": "2021-01-24T10:53:54.000Z",
						"updatedAt": "2021-01-24T10:53:54.000Z"
					},
					{
						"id": 20,
						"pid": "fruit_tea005",
						"type": "fruit_tea",
						"name": "椰子冰",
						"price": "20.00",
						"desc": "【不含咖啡】优选纯牛奶为底，融进满满椰香，又加入柔和香草风味，椰子控必喝。\n主要原料：纯牛奶、椰子风味粉、香草风味糖浆、原味冰沙粉、冰块、稀奶油（含香草风味糖浆）。\n图片及包装仅供参考，请以实物为准。温馨提示：瑞纳冰系列产品形态为冰沙，无法进行少冰去冰操作，请您谅解。建议送达后尽快饮用。到店饮用口感更佳。 ",
						"smallImg": "http://www.kangliuyong.com:10002/images/product_small/h001_small.png",
						"largeImg": "http://www.kangliuyong.com:10002/images/product_large/h001.png",
						"typeDesc": "水果茶",
						"isHot": 1,
						"enname": "Coconut ice",
						"createdAt": "2021-01-24T10:53:54.000Z",
						"updatedAt": "2021-01-24T10:53:54.000Z"
					}
				]
			
			}
		},
		methods:{
			getDetail(item) {
				console.log(111111,item);
				uni.navigateTo({
					url: `/pages/detail/detail?pid=${item.pid}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	
</style>
