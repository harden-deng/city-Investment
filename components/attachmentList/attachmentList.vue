<template>
	<view class="attachment-wrapper">
		<view class="attachment-list" v-for="item in lists" :key="item.fileTagName">
			<view class="attachment-header">
				<view class="attachment-header-bar" :class="{'attachment-header-bar-2': item.children.length > 0}"></view>
				<text class="attachment-header-text">{{ item.fileTagName }}</text>
			</view>
			<view class="attachment-item-list">
				<view class="attachment-item" v-for="items in item.children" :key="items.id" @click="handlePreview(items)">
					<view class="attachment-item-icon">
						<image :src="resolveIcon(items)" mode="aspectFit" class="attachment-icon-image" />
					</view>
					<view class="attachment-item-text">{{ items.fileName }}</view>
				</view>
			</view>
		</view>

		<uni-popup ref="previewPopupRef" type="bottom" :mask-click="true">
			<view class="preview-popup" @touchmove.stop.prevent>
				<view class="preview-header">
					<text class="preview-title">{{ currentAttachment?.fileTagName || '附件预览' }}</text>
					<uni-icons type="closeempty" size="30" color="#666" @click="closePopup"></uni-icons>
				</view>
				<view class="preview-body" v-if="currentAttachment">
					<image
						v-if="isImage"
						class="preview-image"
						:src="currentAttachment.fileUrl || currentAttachment.url"
						mode="aspectFit"
						show-menu-by-longpress
					></image>
					<view v-else class="preview-file">
						<image :src="resolveIcon(currentAttachment)" mode="aspectFit" class="preview-file-icon" />
						<text class="preview-file-name">{{ currentAttachment.fileName || currentAttachment.fileUrl || '无文件名称'}}</text>
						<view class="preview-actions">
							<view class="preview-action-btn" @click="openAttachment">
								<uni-icons type="download" size="28" color="#3C6CFE"></uni-icons>
								<text class="preview-action-text">打开附件</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import { defineProps, ref, computed, nextTick } from 'vue'

const props = defineProps({
	list: {
		type: Array,
		default: () => []
	}
})
const lists = computed(() => {
	// const map = {};
	// props.list.forEach(item => {
	// 	const key = item.fileTagName;
	// 	if (!map[key]) {
	// 	map[key] = {
	// 		fileTagName: key,
	// 		children: []
	// 	};
	// 	}
	// 	map[key].children.push(item);
	// });
    return props.list
})
const previewPopupRef = ref(null)
const currentAttachment = ref(null)

const isImage = computed(() => {
	const file = currentAttachment.value
	if (!file) return false
	return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(getFileExt(file))
})

const resolveIcon = (item) => {
	const ext = getFileExt(item)
	if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) {
		return '../../static/images/pic.png'
	}
	if (ext === 'pdf') {
		return '../../static/images/pdf.png'
	}
	if (['xls', 'xlsx', 'csv'].includes(ext)) {
		return '../../static/images/excel.png'
	}
	if (['doc', 'docx'].includes(ext)) {
		return '../../static/images/docx.png'
	}
	return '../../static/images/file.png'
}

const handlePreview = (item) => {
	currentAttachment.value = item
	nextTick(() => {
		previewPopupRef.value?.open()
	})
}

const closePopup = () => {
	previewPopupRef.value?.close()
}

const openAttachment = () => {
	const url = currentAttachment.value?.fileUrl
	if (!url) {
		uni.showToast({ title: '暂无附件地址', icon: 'none' })
		return
	}
	// #ifdef H5
		window.open(url, '_blank')
	// #endif
	// #ifndef H5
		uni.showLoading({ title: '加载中', mask: true })
		uni.downloadFile({
			url,
			success(res) {
				if (res.statusCode === 200) {
					uni.openDocument({
						filePath: res.tempFilePath,
						showMenu: true,
						complete() {
							uni.hideLoading()
						}
					})
				} else {
					uni.hideLoading()
					uni.showToast({ title: '文件下载失败', icon: 'none' })
				}
			},
			fail() {
				uni.hideLoading()
				uni.showToast({ title: '文件打开失败', icon: 'none' })
			}
		})
	// #endif
}

const getFileExt = (item) => {
	const url = item?.fileUrl || item?.fileName || ''
	const source = url
	const match = /\.([a-zA-Z0-9]+)(?:\?|#|$)/.exec(source)
	return match ? match[1].toLowerCase() : ''
}
</script>

<style lang="scss" scoped>
.attachment-wrapper {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 24rpx;
}

.attachment-list {
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	gap: 24rpx;

	.attachment-header {
		display: flex;
		align-items: center;
		gap: 12rpx;
   }

   .attachment-header-bar {	
	    width: 6rpx;
		height: 32rpx;
		border-radius: 3rpx;
		background: linear-gradient(180deg, #16b777 0%, #49e69f 100%);
	
   }
   .attachment-header-bar-2 {
		background: linear-gradient(180deg, #f2633f 0%, #ff874b 100%) !important;
   }

   .attachment-header-text {
		font-size: 28rpx;
		color: #666666;
		font-weight: 500;
   }
   .attachment-item-list {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 24rpx;
   }
}

.attachment-item {
	width: 150rpx;
	border-radius: 24rpx;
	background: linear-gradient(180deg, #ffffff 0%, #f5f7ff 100%);
	box-shadow: 0 8rpx 24rpx rgba(60, 108, 254, 0.08);
	display: flex;
	flex-direction: column;
	align-items: center;
	transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.attachment-item:active {
	transform: translateY(4rpx);
	box-shadow: 0 6rpx 16rpx rgba(60, 108, 254, 0.12);
}

.attachment-item-icon {
	width: 80rpx;
	height: 80rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 16rpx;
	margin-bottom: 16rpx;
	overflow: hidden;
	border-radius: 16rpx;
}

.attachment-icon-image {
	width: 100%;
	height: 100%;
}

.attachment-item-name {
	width: 100%;
	font-size: 24rpx;
	color: #333;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	word-break: break-word;
	height: 60rpx;
	border-bottom: 1px solid #f5f5f5;
	padding: 0 16rpx;
}
.attachment-item-text {
	width: 90%;
	display: block;
	font-size: 24rpx;
	color: #333;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	word-break: break-word;
	min-height: 40rpx;
	max-height: 80rpx;
	text-align: center;

	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box; //作为弹性伸缩盒子模型显示。
	-webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
	-webkit-line-clamp: 2; //显示的行 
}
    /* 移动端样式 */
    @media screen and (max-width: 913px) {
        .preview-popup {
            width: 750rpx !important;
        }
    }
.preview-popup {
	width: 768rpx;
	padding: 32rpx 32rpx 48rpx;
	background: #ffffff;
	border-top-left-radius: 32rpx;
	border-top-right-radius: 32rpx;
	min-height: 320rpx;
	box-sizing: border-box;
	margin: 0 auto;
}

.preview-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24rpx;
}

.preview-title {
	font-size: 30rpx;
	color: #111;
	font-weight: 600;
}

.preview-body {
	display: flex;
	justify-content: center;
	align-items: center;
}

.preview-image {
	width: 100%;
	max-height: 640rpx;
	border-radius: 20rpx;
	background: #f5f5f5;
}

.preview-file {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40rpx 0;
	gap: 24rpx;
	width: 90%;
}

.preview-file-icon {
	width: 120rpx;
	height: 120rpx;
}

.preview-file-name {
	font-size: 26rpx;
	color: #333;
	text-align: center;
	line-height: 1.5;
	width: 90%;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box; //作为弹性伸缩盒子模型显示。
	-webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
	-webkit-line-clamp: 3; //显示的行 
}

.preview-actions {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}

.preview-action-btn {
	display: flex;
	align-items: center;
	gap: 12rpx;
	padding: 10rpx 108rpx;
	border-radius: 999rpx;
	background: rgba(60, 108, 254, 0.12);
}

.preview-action-text {
	font-size: 26rpx;
	color: #3c6cfe;
}
</style>