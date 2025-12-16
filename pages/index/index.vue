<template>
	<view class="login-container">
		<!-- <view class="status_bar" :style="{height: `${statusBarHeight*2}rpx`}"></view> -->
		<!-- 头部渐变背景区域 -->
		<view class="header-section">
		<!-- 	<view class="brand-welcome">
				<text class="welcome-text">您好, 欢迎使用</text>
				<text class="app-name">公路业财通!</text>
			</view> -->
			<image class="login-image" src="../../static/images/login.png" mode=""></image>
		</view>

		<!-- 登录表单区域 -->
		<view class="form-container">
			<!-- 账号输入框 -->
			<view class="input-group">
				<uni-easyinput type="text"  v-model="phoneNumber" placeholder="请输入您的平台账号" confirm-type="done"></uni-easyinput>
			</view>
			<!-- 密码输入框 -->
			<view class="input-group">
				<uni-easyinput type="password"  v-model="password"  placeholder="请输入您的密码" confirm-type="done"></uni-easyinput>
			</view>
			<!-- 登录按钮 -->
			<button class="login-btn" @click="handleLogin">
				登录
			</button>
		</view>
	</view>
</template>

<script setup>
	import { ref,onMounted } from 'vue'
	import http from '@/utils/request.js'
	// import { useH5Bridge } from '@/utils/h5Bridge.js'
	// const { isInApp, postToApp } = useH5Bridge((data)=>{
	//     getApp().globalData.statusBarHeight = data.statusBarHeight
	// 	console.log(" getApp().globalData.statusBarHeight-->", getApp().globalData.statusBarHeight)
	// })
	 // 解析 URL 参数
	 const getUrlParams = () => {
      const params = {}
      const queryString = window.location.search.substring(1)
      const pairs = queryString.split('&')
      
      pairs.forEach(pair => {
        const [key, value] = pair.split('=')
        if (key) {
          params[decodeURIComponent(key)] = decodeURIComponent(value || '')
        }
      })
      
      return params
    }
	onMounted(()=>{
		const params = getUrlParams()
		if(params?.statusBarHeight && Number(params?.statusBarHeight) > 0){
			getApp().globalData.statusBarHeight = Number(params.statusBarHeight)
		}
	})

	// 响应式数据
	// const phoneNumber = ref('sybjbr1');  //经办人事业部   资金
	// const phoneNumber = ref('sybzgo');  //您好，业务主管（运管中心）（暂支核销）
	const phoneNumber = ref('sybzg1');  //业务主管（一事业部） （其他） （科研）
	// const phoneNumber = ref('cwzg');  //业务主管（一事业部）  cwzg财务主管
	// const phoneNumber = ref('jbrsz');  //经办人（市政）（收入确认）（费用暂支）
	// 申请人:sybjbro  审核人：sybzgo sybldo cwkj
	// const phoneNumber = ref('sybjbro');  //您好，经办人（运管中心） 可实现收入确认11/21）  支出
	// 其他费用报销流程
	// 申请人：sybjbr1
	// 审批人：sybzg1  
	const password = ref(123);
	// 方法定义
	const handleLogin = () => {
		if (!phoneNumber.value || !password.value) {
			uni.showToast({
				title: '请输入账号和密码',
				icon: 'none'
			})
			return
		}
		if(uni.getStorageSync('token')){
			uni.clearStorageSync()
		}
		// 登录逻辑
		http.post('/Auth/accountlogin', {
			userAccount: phoneNumber.value,
			userPassword: password.value
		}).then(res => {
			console.log('登录成功', res)
			if (res.code == 0) {
				http.setToken(res.data.accessToken)
				uni.switchTab({
					url: '/pages/nav/layoutHome'
				})
			} else {
				uni.showToast({
					title: res.msg,
					icon: 'none'
				})
			}
		})
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
	// ::v-deep .uni-input-input {
	// 	height: 88rpx !important;
	// 	line-height: 88rpx !important;
	// }
	
	// PC端适配
	@media screen and (min-width: 768px) {
		.login-container {
			max-width: 768rpx;
			margin: 0 auto;
		}
	}
</style>