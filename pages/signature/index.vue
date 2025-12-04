<template>
	<view class="signature-container">
		<!-- 签名组件 -->
		<rn-signature :options="signatureOptions" :data="signatureData" @update:data="handleSignatureUpdate" />
		<!-- 其他内容保持不变 -->
		<!-- 操作按钮区域 -->
		<view class="action-buttons">
			<view 
				@click="saveSignature" 
				class="save-btn" 
				:class="{ 'disabled': !signatureData.url }"
			>
				保存签名
			</view>
			<view @click="goBack" class="back-btn">
				返回
			</view>
		</view>
	</view>
</template>

<script>
	import http from '@/utils/request.js'
	import { detectImageType } from '@/utils/h5Bribge.js'
	let navigateBackTimeoutId = null
	export default {
		data() {
			return {
				// 签名组件配置
				signatureOptions: {
					// 清除按钮配置
					// clear: {
					// 	show: true,
					// },
					// 占位符配置
					placeholder: {
						// 	content: '请在此手写签名',
						// 	fontSize: 32,
						// 	fillStyle: '#999999'
						content: '请在此手写签名',
						fontSize: 32,
						textBaseline: 'middle',
						textAlign: 'center', // 确保文本对齐方式
						fillStyle: '#999999'
					},
					clear: {
						show: true,
						slot: false,
						customClass: 'btn_clear_wrap'
					},
					// 签名容器样式
					style: {
						width: '100%',
						height: '450rpx',
						// borderRadius: '10rpx',
						// border: '2rpx dashed #cccccc'
					},
					// style: { //设置签名容器宽高
					// 	width: '600rpx',
					// 	height: '300rpx',
					// 	marginLeft: 'auto',
					// 	marginRight: 'auto'
					// },
					// 画笔配置
					ctx: {
						lineWidth: 3,
						lineCap: 'round',
						lineJoin: 'round'
					},
					// 按钮配置
					btn: {
						cancelBtn: {
							content: '取消',
							order: 1,
							style: {
								backgroundColor: '#999',
								color: '#fff'
							}
						},
						resetBtn: {
							content: '重签',
							order: 2,
							style: {
								backgroundColor: '#ff9900',
								color: '#fff'
							}
						},
						saveBtn: {
							content: '确认',
							order: 3,
							style: {
								backgroundColor: '#19be6b',
								color: '#fff'
							}
						},
						uploadBtn: {
							content: '上传',
							order: 4,
							style: {
								backgroundColor: '#007aff',
								color: '#fff'
							}
						}
					}
				},
				// 签名数据
				signatureData: {
					url: '', // 签名生成的图片地址 格式是base64
					tempTime: Date.now() // 时间戳，用于事件通信
				},
				// 保存状态
				isSaving: false
			}
		},
		onLoad() {
			let signatureUrl = uni.getStorageSync('userSignature')
			if (signatureUrl?.dataUrl) {
				this.signatureData.url = signatureUrl.dataUrl
			}
			this.getUserSignature()
		},
		onUnmounted() {
			if (navigateBackTimeoutId) {
				clearTimeout(navigateBackTimeoutId);
				navigateBackTimeoutId = null;
			}
		},
		methods: {
			getUserSignature(){
				const userInfos = uni.getStorageSync('userInfo')
				http.get('/Users/GetUserSignature',{ userAccount: userInfos?.userAccount}).then(res => {
					if (res.code == 0) {
						if(this.signatureData.url === res.data?.dataUrl){
							return
						} else {
							this.signatureData.url = res.data?.dataUrl || ''
							let obj = {
								dataUrl: this.signatureData.url || ''
							}
							uni.setStorageSync('userSignature', obj)
							return
						}
					}
				})
			},
			saveUserSignature(){	
				const userInfos = uni.getStorageSync('userInfo')
				const imageType = detectImageType(this.signatureData.url)
				let params = { Account: userInfos?.userAccount,FileType: '.' + imageType, FileBaseStr: this.signatureData.url }
				http.post('/Users/UpdateUserSignature',params).then(res => {
					if (res.code == 0) {
						try {
							uni.showToast({
								title: '签名保存成功',
								icon: 'success'
							});
							uni.$emit('refresh-signature')
						} catch (error) {
							uni.showToast({
								title: error.message || '保存失败',
								icon: 'none'
							});
							console.error('保存签名失败:', error);
						} finally {
							// 重置保存状态
							this.isSaving = false;
						}
					} else {
						uni.showToast({
							title: res.message || '保存失败',
							icon: 'none'
						});
						console.error('保存签名失败:', res.message);
					}
				})
			},
			// 处理签名数据更新
			handleSignatureUpdate(newData) {
				console.log('签名数据更新:', newData);
				this.signatureData = {
					...this.signatureData,
					...newData
				};
			},

			// 保存签名
			saveSignature() {
				// 检查是否禁用状态
				if (!this.signatureData.url) {
					uni.showToast({
						title: '请先进行签名',
						icon: 'none'
					});
					return;
				}
				
				// 防止重复点击
				if (this.isSaving) {
					return;
				}
				
				this.isSaving = true;
				this.saveUserSignature()
				// this.goBack();

				// 这里可以调用API保存签名到服务器
				// this.uploadSignatureToServer();
			},

			// 上传签名到服务器
			async uploadSignatureToServer() {
				console.log('uploadSignatureToServer', this.signatureData);
				try {
					uni.showLoading({
						title: '保存中...'
					});

					// 将base64转换为临时文件
					console.log('tempFilePath11111');
					const tempFilePath = await this.base64ToTempFile(this.signatureData.url);
                    console.log('tempFilePath22222', tempFilePath);
					// 上传到服务器
					const uploadResult = await this.uploadFile(tempFilePath);
					console.log('uploadResult', uploadResult);
					uni.hideLoading();

					if (uploadResult.success) {
						uni.showToast({
							title: '签名保存成功',
							icon: 'success'
						});

						// 返回上一页并传递签名结果
						navigateBackTimeoutId = setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1500);
					} else {
						throw new Error(uploadResult.message || '上传失败');
					}

				} catch (error) {
					uni.hideLoading();
					uni.showToast({
						title: error.message || '保存失败',
						icon: 'none'
					});
					console.error('保存签名失败:', error);
				} finally {
					// 重置保存状态
					this.isSaving = false;
				}
			},

			// 上传文件到服务器
			uploadFile(filePath) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'YOUR_SERVER_API_URL', // 替换为您的服务器API地址
						filePath: filePath,
						name: 'signature',
						formData: {
							userId: 'current_user_id', // 替换为实际用户ID
							type: 'signature'
						},
						success: (res) => {
							try {
								const data = JSON.parse(res.data);
								resolve({
									success: true,
									data: data
								});
							} catch (e) {
								reject(new Error('服务器响应格式错误'));
							}
						},
						fail: (error) => {
							reject(new Error('网络请求失败'));
						}
					});
				});
			},

			// base64转临时文件
			base64ToTempFile(base64Data) {
				return new Promise((resolve, reject) => {
					// 去除base64前缀
					const base64 = base64Data.replace(/^data:image\/\w+;base64,/, '');

					// 转换为ArrayBuffer
					const buffer = uni.base64ToArrayBuffer(base64);

					// 写入临时文件
					const fs = uni.getFileSystemManager();
					const fileName = `signature_${Date.now()}.png`;
					const filePath = `${uni.env.USER_DATA_PATH}/${fileName}`;

					fs.writeFile({
						filePath: filePath,
						data: buffer,
						encoding: 'binary',
						success: () => resolve(filePath),
						fail: (error) => reject(error)
					});
				});
			},

			// 下载签名
			downloadSignature() {
				if (!this.signatureData.url) {
					uni.showToast({
						title: '没有可下载的签名',
						icon: 'none'
					});
					return;
				}

				// H5环境下直接下载
				// #ifdef H5
				const link = document.createElement('a');
				link.href = this.signatureData.url;
				link.download = `signature_${Date.now()}.png`;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				// #endif

				// 其他平台保存到相册
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.signatureData.url,
					success: () => {
						uni.showToast({
							title: '已保存到相册',
							icon: 'success'
						});
					},
					fail: () => {
						uni.showToast({
							title: '保存失败',
							icon: 'none'
						});
					}
				});
				// #endif
			},

			// 清除签名
			clearSignature() {
				uni.showModal({
					title: '确认清除',
					content: '确定要清除当前签名吗？',
					success: (res) => {
						if (res.confirm) {
							this.signatureData.url = '';
							uni.showToast({
								title: '已清除',
								icon: 'success'
							});
						}
					}
				});
			},
			// 返回上一页
			goBack() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	// PC端适配
	@media screen and (min-width: 768px) {
		.signature-container {
			max-width: 768rpx;
			margin: 0 auto;
		}
	}
	page {
		background: #f3f7ff;
	}
	.signature-container {
		box-sizing: border-box;
		height: 100vh;
		padding: 20rpx;
		// min-height: 100vh;
		// max-height: 100vh;
	}

	.signature-preview {
		margin-top: 30rpx;
		padding: 20rpx;
		background-color: #fff;
		border-radius: 10rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);

		.preview-title {
			font-size: 28rpx;
			color: #333;
			margin-bottom: 20rpx;
			font-weight: bold;
		}

		.signature-image {
			width: 100%;
			height: 200rpx;
			border: 1rpx solid #ddd;
			border-radius: 8rpx;
		}

		.preview-actions {
			display: flex;
			justify-content: space-around;
			margin-top: 20rpx;

			.download-btn,
			.clear-btn {
				flex: 1;
				margin: 0 10rpx;
				height: 70rpx;
				line-height: 70rpx;
				border-radius: 35rpx;
				font-size: 26rpx;
			}

			.download-btn {
				background-color: #007aff;
				color: white;
			}

			.clear-btn {
				background-color: #ff3b30;
				color: white;
			}
		}
	}
	// PC端适配
	@media screen and (min-width: 768px) {
		.action-buttons {
			max-width: 768rpx;
			margin: 0 auto;
		}
	}
	.action-buttons {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20rpx;
		background-color: #fff;
		border-top: 1rpx solid #eee;
		display: flex;
		justify-content: space-around;
		// box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);

		.save-btn,
		.back-btn {
			flex: 1;
			margin: 0 10rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 40rpx;
			font-size: 30rpx;
			font-weight: bold;
			text-align: center;
			cursor: pointer;
			transition: all 0.3s ease;
			user-select: none;
		}

		.save-btn {
			background: linear-gradient(135deg, #6699ff, #1f67ca);
			color: white;
			// box-shadow: 0 4rpx 12rpx rgba(0, 122, 255, 0.3);

			&:active {
				transform: translateY(2rpx);
				// box-shadow: 0 2rpx 8rpx rgba(0, 122, 255, 0.3);
			}

			&.disabled {
				background: linear-gradient(135deg, #ccc, #999);
				color: #666;
				cursor: not-allowed;
				opacity: 0.6;
				&:active {
					transform: none;
				}
			}
		}

		.back-btn {
			background: linear-gradient(135deg, #f8f9fa, #e9ecef);
			color: #495057;
			// border: 2rpx solid #dee2e6;
			// box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);

			&:active {
				transform: translateY(2rpx);
				box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.1);
				background: linear-gradient(135deg, #e9ecef, #dee2e6);
			}
		}
	}

	/* 深度样式修改 */
	// ::v-deep .rn_signature {
	// 	.sign_container {
	// 		// border: 2rpx dashed #cccccc;
	// 		border-radius: 24rpx;
	// 		background-color: #fff;
	// 	}

	// 	.btn_clear_wrap {
	// 		position: absolute;
	// 		top: 10rpx;
	// 		right: 10rpx;
	// 		z-index: 999;
	// 	}
	// }
</style>