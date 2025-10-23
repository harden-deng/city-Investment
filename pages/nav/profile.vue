<template>
	<view class="profile">
		<view class="card">
			<view class="card__header">
				<text class="card__company">上海公路投资建设发展有限公司</text>
				<view class="card__body">
					<text class="card__name">张三</text>
					<text class="card__dept">第一事业部</text>
				</view>
			</view>
			<image class="card__avatar" src="../../static/images/user.jpg" mode="aspectFill" loading="lazy"></image>
		</view>
		<view class="list">
			<view class="list__item" hover-class="list__item--hover" @click="goMessage">
				<view class="item-icon item-icon-1">
					<image class="list__icon" src="../../static/images/ucicon_1.svg" mode="widthFix"></image>
				</view>
				<text class="list__text">消息中心</text>
				<image class="arrow-right-icon" src="../../static/images/arrow-right-s-line.svg" mode=""></image>
			</view>
			<view class="list__item merge-1" hover-class="list__item--hover" @click="goSign">
				<view class="item-icon item-icon-2">
					<image class="list__icon" src="../../static/images/ucicon_2.svg" mode="widthFix"></image>
				</view>
				<text class="list__text">签名维护</text>
				<image class="arrow-right-icon" src="../../static/images/arrow-right-s-line.svg" mode=""></image>
				<view class="merge-1-across">
				</view>
			</view>
			<view class="list__item merge-2" hover-class="list__item--hover" @click="goHelp">
				<view class="item-icon item-icon-3">
					<image class="list__icon" src="../../static/images/ucicon_3.svg" mode="widthFix"></image>
				</view>
				<text class="list__text">在线帮助</text>
				<image class="arrow-right-icon" src="../../static/images/arrow-right-s-line.svg" mode=""></image>
			</view>
			<view class="list__item list__item--danger" hover-class="list__item--hover" @click="goLogout">
				<view class="item-icon item-icon-4">
					<image class="list__icon" src="../../static/images/ucicon_4.svg" mode="widthFix"></image>
				</view>
				<text class="list__text">安全登出</text>
				<image class="arrow-right-icon" src="../../static/images/arrow-right-s-line.svg" mode=""></image>
			</view>
		</view>
		<confirmDialog ref="confirmRef" :content="'确定退出吗？'" @confirm="doLogout"></confirmDialog>
		<!-- 底部导航栏 -->
		<BottomNavBar ref="bottomNavRef" :modelValueFlag="3"/>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import confirmDialog from "@/components/confirmDialog/confirmDialog.vue"
	import BottomNavBar from '@/components/navBar/bottomNavBar.vue'
	const confirmRef = ref(null)
	const userName = ref('张三')
	const department = ref('第一事业部')
	const company = ref('上海公路投资建设发展有限公司')

	const goMessage = () => {
		// 这里可替换为实际业务页面
		// uni.showToast({
		// 	title: '消息中心开发中',
		// 	icon: 'none'
		// })
		uni.navigateTo({
			url: '/pages/info/msg'
		})
	}
	const goSign = () => {
		// uni.showToast({
		// 	title: '签名维护开发中',
		// 	icon: 'none'
		// })
		
		uni.navigateTo({
			url: '/pages/signature/index'
		})
		// uni.navigateTo({
		// 	url: '/uni_modules/rn-signature/pages/rn-canvas'
		// })
		
	}
	const goHelp = () => {
		// uni.showToast({
		// 	title: '在线帮助开发中',
		// 	icon: 'none'
		// })
		uni.navigateTo({
			url: '/pages/info/help'
		})
	}
	const goLogout = () => {
		confirmRef.value?.open();
	}

	const doLogout = () => {
		try {
			uni.clearStorageSync()
		} catch (e) {}
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f3f7ff;
	}

	.profile {
		height: 100%;
		background: #f3f7ff;
		padding: 16rpx 0px;
	}

	.card {
		box-sizing: border-box;
		width: 90%;
		margin: 32rpx auto;
		background: #fff;
		border-radius: 24rpx;
		padding: 32rpx;
		margin-bottom: 24rpx;
		display: flex;
		justify-content: space-between;

		&__header {
			flex-direction: column;
			display: flex;
			justify-content: space-between;
		}

		&__company {
			font-size: 28rpx;
			color: #000;
			height: 112rpx;
			// line-height: 1.4;
		}

		&__avatar {
			width: 160rpx;
			height: 160rpx;
			border-radius: 12rpx;
			background: #f0f2f5;
		}

		&__body {
			// margin-top: 8rpx;
			box-sizing: border-box;
		}

		&__name {
			display: block;
			font-size: 48rpx;
			font-weight: bold;
			color: #000;
			margin-bottom: 14rpx;
		}

		&__dept {
			display: block;
			font-size: 28rpx;
			color: #999;
		}
	}

	.list {
		box-sizing: border-box;
		width: 90%;
		margin: 32rpx auto;

		&__item {
			background: #fff;
			border-radius: 24rpx;
			padding: 26rpx 16rpx 26rpx 32rpx;
			display: flex;
			align-items: center;
			margin-bottom: 32rpx;

			.item-icon {
				width: 48rpx;
				height: 48rpx;
				border-radius: 6px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0 28rpx 0 0;
			}

			.item-icon-1 {
				background-color: #66cc33;
			}

			.item-icon-2 {
				background-color: #6699ff;
			}

			.item-icon-3 {
				background-color: #ff6666;
			}

			.item-icon-4 {
				background-color: #33cc99;
			}

			.arrow-right-icon {
				width: 48rpx;
				height: 48rpx;
			}


		}

		.merge-1 {
			margin-bottom: 0 !important;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
			position: relative;
			z-index: 9;

			.merge-1-across {
				position: absolute;
				z-index: 19;
				right: 0;
				bottom: 0;
				width: calc(100% - 100rpx);
				border-bottom: 1rpx solid #eee;
			}
		}

		.merge-2 {
			margin-bottom: 0 !important;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		}

		&__item--hover {
			background: #f7f8fa;
		}

		&__item--danger {
			margin-top: 32rpx;
		}

		&__icon {
			width: 32rpx;
			height: 28.7rpx;
		}

		&__text {
			flex: 1;
			font-size: 28rpx;
			color: #000;
		}
	}
</style>