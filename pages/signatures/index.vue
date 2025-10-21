<template>
	<view class="zx-sign">
		<view class="canvas-box">
			<!-- 画布 -->
			<view :style="getStyle">
				<canvas :id="canvasId" :canvas-id="canvasId" :style="getStyle" @touchstart="tstart"
					@touchmove="tmove"></canvas>
			</view>
			
			<!-- 签名预览区域 -->
			<!-- <view v-if="signImg" class="signature-preview">
				<view class="preview-title">签名预览：</view>
				<image :src="signImg" class="preview-image" mode="aspectFit"></image>
				<view class="preview-actions">
					<button @click="downloadSignature" class="download-btn">下载签名</button>
					<button @click="clearSignature" class="clear-btn">清除签名</button>
				</view>
			</view> -->
			
			<!-- 操作按钮 -->
			<slot name="actions">
				<view class="sign-actions-default">
					<view class="sign-desc" :style="{ bottom: canvasHeight * 0.4 + 'px' }">
						<text class="rotated-desc">请在下方手写签名</text>
					</view>
					<view class="sign-button" :class="{ disabled: !isDrawed }" @click="confirm">
						<text class="rotated-text" :style="{ backgroundColor: isDrawed ? '#19be6b' : '#71d5a1' }">确认签名</text>
					</view>
					<view class="re-button" @click="canvasInit">
						<text class="rotated-text" style="background-color: #ff9900">重新签名</text>
					</view>
				</view>
			</slot>
		</view>
	</view>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, ref, watch } from 'vue';

const { proxy } = getCurrentInstance();
const emits = defineEmits(['change', 'confirm']);
const props = defineProps({
	// 屏幕方向： 竖屏 portrait，横屏 landscape
	orientation: {
		type: String,
		default: 'portrait'
	},
	canvasId: {
		type: String,
		default: 'mySign'
	},
	// 画布宽度
	width: {
		type: String,
		default: ''
	},
	// 画布高度
	height: {
		type: String,
		default: ''
	},
	// 画布背景色
	backgroundColor: {
		type: String,
		default: '#ececec'
	},
	// 画笔颜色
	lineColor: {
		type: String,
		default: '#333333'
	},
	// 画笔大小
	lineSize: {
		type: String,
		default: '5rpx'
	},
	// 新增：初始签名图片（用于回显）
	initialSignature: {
		type: String,
		default: ''
	}
});

const ctx = ref(null); // 画布对象
const drawTimer = ref(null); // 定时器
const isDrawed = ref(false); // 是否已签名
const canvasWidth = ref(0); // px 宽度
const canvasHeight = ref(0); // px 高度
const lineSize = ref(5); // 画笔大小
const signImg = ref(''); // 签名图片

// 监听初始签名变化
watch(() => props.initialSignature, (newVal) => {
	if (newVal) {
		console.log('newVal', newVal);
		loadExistingSignature(newVal);
	}
}, { immediate: true });

onMounted(() => {
	// 计算画笔大小
	lineSize.value = uni.upx2px(parseInt(props.lineSize));
	// 获取画布高宽
	let systemInfo = uni.getWindowInfo();
	if (props.width) {
		canvasWidth.value = uni.upx2px(parseInt(props.width));
	} else {
		canvasWidth.value = systemInfo.windowWidth;
	}
	if (props.height) {
		canvasHeight.value = uni.upx2px(parseInt(props.height));
	} else {
		canvasHeight.value = systemInfo.windowHeight;
	}
	setTimeout(() => {
		ctx.value = uni.createCanvasContext(props.canvasId);
		canvasInit();
		
		// 如果有初始签名，加载它
		if (props.initialSignature) {
			console.log('newVal2222', props.initialSignature);
			loadExistingSignature(props.initialSignature);
		}
	}, 300);
});

const getStyle = computed(() => {
	return {
		width: canvasWidth.value + 'px',
		height: canvasHeight.value + 'px'
	};
});

// 初始化画布
function canvasInit() {
	setTimeout(() => {
		ctx.value.setFillStyle(props.backgroundColor);
		ctx.value.fillRect(0, 0, canvasWidth.value, canvasHeight.value);
		ctx.value.draw(true);
		ctx.value.setStrokeStyle(props.lineColor);
		ctx.value.setLineWidth(lineSize.value);
		isDrawed.value = false;
		signImg.value = '';
	}, 100);
}

// 加载已有签名（回显功能）
function loadExistingSignature(imageUrl) {
	if (!imageUrl) return;
	
	// 如果是base64图片
	if (imageUrl.startsWith('data:image/')) {
		loadBase64Image(imageUrl);
	} else {
		// 如果是文件路径
		loadImageFromPath(imageUrl);
	}
}

// 加载base64图片
function loadBase64Image(base64Data) {
	console.log('loadBase64Image', base64Data);
	const img = new Image();
	img.onload = () => {
		ctx.value.drawImage(img, 0, 0, canvasWidth.value, canvasHeight.value);
		ctx.value.draw(true);
		signImg.value = base64Data;
		isDrawed.value = true;
	};
	img.src = base64Data;
}

// 从文件路径加载图片
function loadImageFromPath(imagePath) {
	console.log('loadImageFromPath', imagePath);
	uni.getImageInfo({
		src: imagePath,
		success: (res) => {
			ctx.value.drawImage(res.path, 0, 0, canvasWidth.value, canvasHeight.value);
			ctx.value.draw(true);
			signImg.value = imagePath;
			isDrawed.value = true;
		},
		fail: (error) => {
			console.error('加载签名图片失败:', error);
			uni.showToast({
				title: '加载签名失败',
				icon: 'none'
			});
		}
	});
}

// 触摸开始
function tstart(e) {
	let x = e.touches[0].x;
	let y = e.touches[0].y;
	ctx.value.moveTo(x, y);
}

// 触摸移动
function tmove(e) {
	let x = e.touches[0].x;
	let y = e.touches[0].y;
	ctx.value.lineTo(x, y);
	ctx.value.stroke();
	ctx.value.draw(true, saveImg());
	ctx.value.moveTo(x, y);
}

// 保存签名图片
function saveImg() {
	isDrawed.value = true;
	if (drawTimer.value != null) {
		clearTimeout(drawTimer.value);
	}
	drawTimer.value = setTimeout(() => {
		uni.canvasToTempFilePath({
			x: 0,
			y: 0,
			width: canvasWidth.value,
			height: canvasHeight.value,
			destWidth: canvasWidth.value,
			destHeight: canvasHeight.value,
			canvasId: props.canvasId,
			success: (res) => {
				console.log('saveImg', res);
				signImg.value = res.tempFilePath;
				emits('change', res);
			}
		});
	}, 300);
}

// 确认签名
function confirm() {
	if (!isDrawed.value) {
		uni.showToast({
			title: '请先进行签名',
			icon: 'none'
		});
		return;
	}
	emits('confirm', signImg.value);

	uni.navigateBack();
	
}

// 下载签名
function downloadSignature() {
	if (!signImg.value) {
		uni.showToast({
			title: '没有可下载的签名',
			icon: 'none'
		});
		return;
	}
	
	// H5环境下直接下载
	// #ifdef H5
	const link = document.createElement('a');
	link.href = signImg.value;
	link.download = `signature_${Date.now()}.png`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	// #endif
	
	// 其他平台保存到相册
	// #ifndef H5
	uni.saveImageToPhotosAlbum({
		filePath: signImg.value,
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
}

// 清除签名
function clearSignature() {
	canvasInit();
	// uni.showModal({
	// 	title: '确认清除',
	// 	content: '确定要清除当前签名吗？',
	// 	success: (res) => {
	// 		if (res.confirm) {
	// 			canvasInit();
	// 			uni.showToast({
	// 				title: '已清除',
	// 				icon: 'success'
	// 			});
	// 		}
	// 	}
	// });
}

defineExpose({ confirm, canvasInit, loadExistingSignature });
</script>

<style scoped>
.zx-sign {
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
	flex: 1;
	width: 100vw !important;
	height: 100vh !important;
}

.canvas-box {
	box-sizing: border-box;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}

/* 签名预览区域 */
.signature-preview {
	position: absolute;
	top: 20rpx;
	left: 20rpx;
	right: 20rpx;
	background-color: rgba(255, 255, 255, 0.95);
	border-radius: 10rpx;
	padding: 20rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
	z-index: 1000;
}

.preview-title {
	font-size: 28rpx;
	color: #333;
	margin-bottom: 20rpx;
	font-weight: bold;
}

.preview-image {
	width: 100%;
	height: 200rpx;
	border: 1rpx solid #ddd;
	border-radius: 8rpx;
}

.preview-actions {
	display: flex;
	justify-content: space-around;
	margin-top: 20rpx;
}

.download-btn, .clear-btn {
	flex: 1;
	margin: 0 10rpx;
	height: 60rpx;
	line-height: 60rpx;
	border-radius: 30rpx;
	font-size: 24rpx;
}

.download-btn {
	background-color: #007aff;
	color: white;
}

.clear-btn {
	background-color: #ff3b30;
	color: white;
}

.sign-actions-default {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
}

.sign-actions-default>.sign-desc,
.sign-actions-default>.sign-button,
.sign-actions-default>.re-button {
	pointer-events: auto;
}

.sign-desc {
	position: absolute;
	left: 10rpx;
}

.sign-button {
	position: absolute;
	top: 300rpx;
	right: -80rpx;
	opacity: 1;
	transition: opacity 0.2s;
}

.sign-button.disabled {
	opacity: 0.5;
	pointer-events: none;
}

.re-button {
	position: absolute;
	bottom: 100rpx;
	right: -80rpx;
}

.rotated-desc {
	transform: rotate(-90deg);
	display: inline-block;
	white-space: nowrap;
	transform-origin: left top 0;
	color: #666666;
}

.rotated-text {
	transform: rotate(-90deg);
	display: inline-block;
	white-space: nowrap;
	transform-origin: left top 0;
	color: #ffffff;
	padding: 10rpx 20rpx;
	border-radius: 10rpx;
}
</style>