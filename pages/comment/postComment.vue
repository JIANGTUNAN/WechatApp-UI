<template>
	<u-popup closeable :show="visable" @close="close">
		<view class="popup">
			<view class="title">
				{{replyId?'回复评论':'发布评论'}}
			</view>
			<view class="content">
				<view class="image-preview" v-for="(i,index) in files" :key="index">

					<image :src="i" mode="aspectFill"></image>
					<view class="del-image" @click="delImage(index)">
						<u-icon name='trash-fill' size='20'></u-icon>
					</view>
				</view>
				<view class="addImage" v-if="files&&files.length<maxImage" @click="addImage">
					<u-icon name="plus" size='75' color='#eee'></u-icon>
				</view>
				<view class="input">
					<textarea v-model="commentContent" placeholder="请输入内容" />
				</view>
			</view>
			<view class="submit">
				<u-button @click="submit">提交</u-button>
			</view>
		</view>
	</u-popup>

</template>

<script>
	import {
		baseUrl
	} from '@/request/request.js';
	import {
		postComment,
		postReply
	} from '@/api/api.js';
	export default {
		name: 'commentPoster',
		props: {
			storeId: {
				type: Number | String,
				default: () => null,
			},
			userId: {
				type: Number | String,
				default: () => null,
			},
		},
		data() {
			return {
				visable: false,
				files: [],
				commentContent: '',
				maxImage: 3,
				loading: false,
				replyId: null,
			}
		},
		methods: {
			open(id) {
				this.replyId = id || null;
				this.visable = true;
			},
			close(){
				this.visable = false;
				this.files=[];
				this.commentContent='';
			},

			addImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					success: (res) => {
						if (this.files.length > 2) return;
						this.files.push(res.tempFilePaths[0]);
					}
				})

			},
			submit() {
				if(!this.userId){
					this.userId=this.$util.getUserId();
				}
				this.loading = true;
				const _self = this;
				const promiseList = [];
				const imageIds = [];
				const postFinish=(res,isReply=false)=>{
					
						if (!res?.code == 200) {
							uni.showToast({
								title: isReply?"回复失败":"评论失败",
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: isReply?"回复成功":"评论发送成功",
								icon: 'success'
							})
						}
						_self.loading = false;
						_self.close();
						_self.$emit('finish')
				}
				_self.files.forEach((path, index) => {
					const myPromise = new Promise((dres, drej) => {
						uni.uploadFile({
							url: baseUrl + '/coffee/comment/image/upload',
							filePath: path,
							name: 'file',
							formData: {
								commentSort: index,
								storeId: _self.storeId,
								userId: _self.userId
							},
							success: (res) => {
								if (!res?.code == 200) {
									uni.showToast({
										title: `第${index+1}张图片上传失败`,
										icon: 'none'
									});
								} else {
									let data = res.data;
									if (typeof data == 'string') data = JSON.parse(data);
									imageIds.push(data.data);
								}
								dres();
							},
							fail: () => {
								drej()
							}
						})
					})
					promiseList.push(myPromise)
				})
				Promise.all(promiseList).finally(() => {
					if (_self.replyId) {
						postReply({
							commentContent: _self.commentContent,
							replyCommentId: _self.replyId,
							storeId: _self.storeId,
							userId: _self.userId,
							imageIds: imageIds||[]
						}).then(res => {
							postFinish(res,true);
						})
					} else {
						postComment({
							commentContent: _self.commentContent,
							storeId: _self.storeId,
							userId: _self.userId,
							imageIds: imageIds||[]
						}).then(res => {
							postFinish(res);
						})
					}

				})
				
			},

		}
	}
</script>

<style lang="scss" scoped>
	.popup {
		max-height: 1000rpx;
		overflow-y: scroll;
		position: relative;

		.title {
			padding: 20rpx;
			text-align: center;
			font-size: 38rpx;
			font-weight: 600;
			color: #888;
			border-bottom: 2rpx solid #eee;
		}

		.content {
			padding: 20rpx;

			.image-preview {
				float: left;
				margin-right: 20rpx;
				position: relative;


				image {
					width: 180rpx;
					height: 180rpx;
				}

				.del-image {
					position: absolute;
					right: 0;
					top: 0;
				}
			}

			.addImage {
				float: left;
				display: inline-block;
				width: 180rpx;
				height: 180rpx;
				border: 2rpx solid #eee;
				padding-left: 10rpx;
				padding-top: 10rpx;
				box-sizing: border-box;
			}

			.input {
				margin-top: 200rpx;
				padding: 10rpx;
				border-radius: 10rpx;
				border: 2rpx solid #eee;
			}
		}
	}
</style>
