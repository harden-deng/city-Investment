<template>
	<view class="login-container">
		<view class="status_bar" :style="{height: `${statusBarHeight*2}rpx`}"></view>
		<!-- 头部渐变背景区域 -->
		<view class="header-section">
		<!-- 	<view class="brand-welcome">
				<text class="welcome-text">您好, 欢迎使用</text>
				<text class="app-name">公路业财通!</text>
			</view> -->
			<image class="login-image" src="/static/images/login.png" mode=""></image>
		</view>

		<!-- 登录表单区域 -->
		<view class="form-container">
			<!-- 账号输入框 -->
			<view class="input-group">
				<uni-easyinput :border="false" :height="'150px'" :styles="styles"  v-model="phoneNumber" focus placeholder="请输入您的平台账号" ></uni-easyinput>
			</view>
			<!-- 密码输入框 -->
			<view class="input-group">
				<uni-easyinput type="password"  v-model="password"  placeholder="请输入您的密码" ></uni-easyinput>
			</view>
			<!-- 登录按钮 -->
			<button class="login-btn" @click="handleLogin">
				登录
			</button>
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref, onMounted, computed } from 'vue'
	import { setStorage, getStorage, removeStorage } from '@/utils/storage'
	const styles = {
	    placeholderColor: '#999999',
	}
	const statusBarHeight = ref(0)
	// 响应式数据
	const phoneNumber = ref('')
	const password = ref('')
	onLoad(() => {
		const statusBarHeightNew = getStorage('statusBarHeight');
		if (Number(statusBarHeightNew) != 0) {
			statusBarHeight.value = Number(statusBarHeightNew)
		}

	})


	// 方法定义
	const handleLogin = () => {
		if (!phoneNumber.value || !password.value) {
			uni.showToast({
				title: '请输入账号和密码',
				icon: 'none'
			})
			return
		}

		// 登录逻辑
		console.log('登录', { account: phoneNumber.value, password: password.value })
		uni.showToast({
			title: '登录成功',
			icon: 'success'
		})

		// 验证成功后跳转
		setTimeout(() => {
			uni.switchTab({
				url: "/pages/nav/home"
			})
		}, 500) // 等待toast显示完成后跳转
	}
</script>

<style lang="scss" scoped>
::v-deep .uni-easyinput__content {
	height: 90rpx !important;
	background-color: #f3f7ff !important;
	border: none !important;
	border-radius: 25rpx !important;
}

::v-deep .uniui-clear {
	color: #C3CEDF !important;
}

	.login-container {
		min-height: 100vh;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	// 头部渐变背景区域
	.header-section {
		height: 360rpx;
		background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 25%, #90caf9 50%, #64b5f6 75%, #42a5f5 100%);
		position: relative;
		overflow: hidden;
		
		.login-image {
			width: 100%;
			height: 100%;
		}
	}

	// 登录表单区域
	.form-container {
		flex: 1;
		padding: 60rpx 60rpx 0;
		background-color: #ffffff;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

		.input-group {
			margin-bottom: 40rpx;

			// .account-input,
			// .password-input {
			// 	width: 100%;
			// 	height: 88rpx;
			// 	background-color: #f5f5f5;
			// 	border: 2rpx solid #e0e0e0;
			// 	border-radius: 8rpx;
			// 	font-size: 32rpx;
			// 	color: #333333;
			// 	padding: 0 24rpx;
			// 	box-sizing: border-box;
			// 	transition: border-color 0.3s ease;

			// 	&::placeholder {
			// 		color: #999999;
			// 		font-size: 32rpx;
			// 	}

			// 	&:focus {
			// 		border-color: #4285f4;
			// 		outline: none;
			// 		background-color: #ffffff;
			// 	}
			// }
		}

		.login-btn {
			width: 100%;
			height: 88rpx;
			background-color: #3e65f6;
			color: #ffffff;
			border: none;
			border-radius: 25rpx;
			font-size: 32rpx;
			font-weight: 500;
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: background-color 0.3s ease;

			&:active {
				background-color: #3367d6;
			}
		}
	}

	// 动画效果
	@keyframes float {
		0%, 100% {
			transform: translateY(0px) rotate(0deg);
		}
		50% {
			transform: translateY(-20px) rotate(180deg);
		}
	}

	@keyframes shimmer {
		0% {
			opacity: 0.3;
		}
		50% {
			opacity: 0.6;
		}
		100% {
			opacity: 0.3;
		}
	}

	// 全局样式重置
	::v-deep .uni-input-input {
		height: 88rpx !important;
		line-height: 88rpx !important;
	}
	
	// PC端适配
	@media screen and (min-width: 768px) {
		.login-container {
			max-width: 768rpx;
			margin: 0 auto;
		}
	}
</style>