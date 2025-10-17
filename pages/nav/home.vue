<template>
	<view class="workplace-container">
		<!-- 顶部标题栏 -->
		<view class="header-stickt">
			<view class="status_bar" :style="{ height: `${statusBarHeight * 2}rpx` }"></view>
			<view class="header-banner">
				<view class="banner-bg">
				</view>
			</view>
			<!-- 通知栏 -->
			<view class="notification-bar">
				<view class="notification-content">
					<image class="speaker-icon" src="../../static/images/icon_1.svg" mode="aspectFit"></image>
					<text class="notification-text">·本市排水管理体制改革取得阶段性进展</text>
				</view>
			</view>
		</view>
		<!-- 主内容区域 -->
		<view class="main-content">
			<!-- 快捷功能图标 -->
			<view class="quick-access">
				<view class="access-item" v-for="(item, index) in quickAccessList" :key="index"
					@click="handleQuickAccess(item)">
					<view class="access-icon" :style="{ backgroundColor: item.bjColor }">
						<image :src="item.imgUrl" mode="aspectFit" style="width: 48rpx; height: 48rpx"></image>
					</view>
					<text class="access-label">{{ item.label }}</text>
				</view>
			</view>
			<!-- 在线公示 -->
			<view class="announcement-section">
				<view class="section-title">
					<view class="section-title-text">在线公示</view>
					<text class="section-title-bj"></text>
				</view>
				<view class="announcement-banner">
					<image src="../../static/images/ib_1.jpg" mode="" style="width: 100%;height: 100%;"></image>
				</view>
			</view>
			<!-- 在线帮助 -->
			<view class="help-section">
				<image src="../../static/images/ib_2.jpg" mode="" style="width: 100%;height: 100%;border-radius: 24rpx;"></image>
			</view>
		</view>
	</view>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, reactive, onMounted } from 'vue'
import http from '@/utils/request.js'
import { setStorage, getStorage, removeStorage } from '@/utils/storage'
// import BottomNavBar from '@/components/navBar/bottomNavBar.vue'
// import { useH5Bridge } from '../../utils/h5Bribge.js'

const statusBarHeight = ref(0);
onLoad(() => {
	const statusBarHeightNew = getStorage('statusBarHeight');
	if (Number(statusBarHeightNew) != 0) {
		statusBarHeight.value = Number(statusBarHeightNew)
	}
})

// 快捷功能列表
const quickAccessList = ref([
	{
		label: '待办流程',
		imgUrl: '../../static/images/index_menu_1.svg',
		path: '/pages/nav/pending',
		bjColor: '#6599ff'
	},
	{
		label: '已办流程',
		imgUrl: '../../static/images/index_menu_2.svg',
		path: '/pages/nav/completed',
		bjColor: '#9933ff'
	},
	{
		label: '掌上看板',
		imgUrl: '../../static/images/index_menu_3.svg',
		path: '',
		bjColor: '#65cb33'
	},
	{
		label: '在线帮助',
		imgUrl: '../../static/images/index_menu_4.svg',
		path: '',
		bjColor: '#33cb99'
	}
]);

onMounted(() => {
	getData();
})

// 快捷访问点击处理
const handleQuickAccess = (item) => {
	console.log('点击快捷功能:', item.label)
	if (item.path) {
		uni.switchTab({
			url: item.path
		})
	} else {
		uni.showToast({
			title: `${item.label}功能开发中`,
			icon: 'none'
		})
	}
}


const getData = () => {
	http.get('arr', {}).then((res) => {
		console.log("请求成功!")
	})
};
</script>

<style lang="scss" scoped>
.workplace-container {
	min-height: 100vh;
	background: #f3f7ff;
	position: relative;

	.header-stickt {
		// position: sticky;
		// z-index: 19;
		// left: 0;
		// top: 0;
		// right: 0;

		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
			background: transparent;
		}

		.header-banner {
			height: 320rpx;
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			position: relative;
			overflow: hidden;

			.banner-bg {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: url('../../static/images/banner.jpg') center/cover;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.notification-bar {
			width: 90%;
			margin: -30rpx auto 0;
			position: relative;
			z-index: 10;

			.notification-content {
				background: #FFFFFF;
				border-radius: 125rpx;
				box-sizing: border-box;
				height: 60rpx;
				padding: 0 30rpx;
				display: flex;
				align-items: center;
				box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

				.speaker-icon {
					width: 30rpx;
					height: 30rpx;
					margin-right: 22rpx;
				}

				.notification-text {
					font-size: 24rpx;
					color: #333333;
					flex: 1;
				}
			}
		}
	}



	.main-content {
		padding: 30rpx 0 40rpx;

		.quick-access {
			box-sizing: border-box;
			height: 226rpx;
			width: 90%;
			margin-left: auto;
			margin-right: auto;
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 30rpx;
			background-color: #ffffff;
			border-radius: 25rpx;
			box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);

			.access-item {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 0 8rpx;

				.access-icon {
					width: 90rpx;
					height: 90rpx;
					border-radius: 24rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-bottom: 16rpx;
				}

				.access-label {
					font-size: 24rpx;
					color: #333333;
					text-align: center;
				}
			}
		}

		.announcement-section {
			box-sizing: border-box;
			width: 90%;
			height: 448rpx;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 30rpx;
			background-color: #ffffff;
			padding: 26rpx 30rpx;
			border-radius: 25rpx;
			box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
		    display: flex;
		    flex-direction: column;
		    align-items: center;

			.section-title {
				width: 622rpx;
				height: 44rpx;
				position: relative;
				margin-bottom: 16rpx;

				.section-title-text {
					font-size: 32rpx;	
					color: #000000;
					font-weight: bold;
					position: absolute;
					z-index: 10;
				}

				.section-title-bj {
					position: absolute;
					z-index: 8;
					height: 8px;
					width: 80px;
					bottom: 0px;
					background: linear-gradient(to right, rgb(180, 218, 255, 1), rgb(255, 255, 255, 1));
				}

			}

			.announcement-banner {
				width: 622rpx;
				height: 325rpx;
				border-radius: 20rpx;
				overflow: hidden;
			}
		}

		.help-section {
			box-sizing: border-box;
			width: 90%;
			margin-left: auto;
			margin-right: auto;
			height: 200rpx;
			border-radius: 24rpx;
			box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
			padding: 2rpx;
			background-color: #ffffff;
		}
	}
}

// PC端适配
@media screen and (min-width: 768px) {
	.workplace-container {
		max-width: 768rpx;
		margin: 0 auto;

		.main-content {
			.quick-access {
				.access-item {
					.access-icon {
						width: 120rpx;
						height: 120rpx;
					}
				}
			}
		}
	}
}

// 超大屏幕适配
@media screen and (min-width: 1200px) {
	.workplace-container {
		max-width: 1200rpx;

		.header-stickt {
			.header-banner {
				.banner-bg {}
			}
		}

		.main-content {
			.quick-access {
				.access-item {
					.access-icon {
						width: 140rpx;
						height: 140rpx;
					}
				}
			}
		}
	}
}
</style>