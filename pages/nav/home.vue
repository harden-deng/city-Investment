<template>
	<view class="workplace-container">
		<scroll-view scroll-y="true" class="scroller" :style="{ height: scrollViewHeight }">
			<!-- 顶部标题栏 -->
			<view class="header-stickt">
				<!-- <view class="status_bar" :style="{ height: `${statusBarHeight * 2}rpx` }"></view> -->
				<view class="header-banner">
					<view class="banner-bg">
					</view>
				</view>
				<!-- 通知栏 -->
				<view class="notification-bar">
					<view class="notification-content" @click="handleNotification" role="button" tabindex="0">
						<!-- <image class="speaker-icon" src="../../static/images/icon_1.svg" mode="aspectFit" aria-label="公告"></image> -->
						<view class="speaker-icon"></view>
						<text class="notification-text">·{{ announcements || '暂无公告' }}</text>
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
							<image :src="item.imgUrl" class="access-icon-img" mode="aspectFit"></image>
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
						<image class="announcement-img" src="../../static/images/ib_1.jpg" 
							loading="lazy" aria-label="在线公示"></image>
					</view>
				</view>
				<!-- 在线帮助 -->
				<view class="help-section" @click="handleHelp">
					<image src="../../static/images/ib_2.jpg" mode="" aria-label="在线帮助" loading="lazy"
						style="width: 100%;height: 100%;border-radius: 21.7392rpx;"></image>
				</view>
			</view>
		</scroll-view>
		<!-- 底部导航栏 -->
		<!-- <BottomNavBar ref="bottomNavRef" :modelValueFlag="0" /> -->
	</view>
</template>
<script setup>
	import {
		ref,
		onMounted,
		onUnmounted,
		watch
	} from 'vue'

	// import BottomNavBar from '@/components/navBar/bottomNavBar.vue'
	
	import http from '@/utils/request.js'
	// Emits定义
	const emit = defineEmits(['change'])
	const props = defineProps({
		currentIndex: {
			type: Number,
			default: -1
		}
	})
	let resizeHandler = null

	const announcements = ref('');
	watch(() => props.currentIndex, (newVal) => {
		if(newVal === 0){
			getAnnouncements();
		}
	})
	const getAnnouncements = () => {
		http.get('/WF/GetAnnouncements').then(res => {
			if(res.code === 0){
				announcements.value = res.data;
			}
		})
	}
	// 快捷功能列表
	const quickAccessList = [{
			label: '待办流程',
			imgUrl: '../../static/images/index_menu_1.svg',
			path: '/pages/nav/pending',
			bjColor: '#6599ff',
			isTab: true,
			indexFlag: 1
		},
		{
			label: '已办流程',
			imgUrl: '../../static/images/index_menu_2.svg',
			path: '/pages/nav/completed',
			bjColor: '#9933ff',
			isTab: true,
			indexFlag: 2
		},
		{
			label: '掌上看板',
			imgUrl: '../../static/images/index_menu_3.svg',
			path: '',
			bjColor: '#65cb33',
			isTab: false
		},
		{
			label: '在线帮助',
			imgUrl: '../../static/images/index_menu_4.svg',
			path: '',
			bjColor: '#33cb99',
			isTab: false
		},
	]
	const handleQuickAccess = (item) => {
		if (!item.path) {
			uni.showToast({
				title: `${item.label}功能正在开发中，敬请期待`,
				icon: 'none'
			})
			return
		}
		item.isTab ? emit('change', item.indexFlag, {}) : uni.navigateTo({
			url: item.path
		})
	}
	const handleNotification = () => {
		uni.showToast({
			title: `消息中心功能正在开发中，敬请期待`,
			icon: 'none'
		})
	}
	const bottomNavBarHeight = ref(50)
	const scrollViewHeight = ref('')
	const computeScrollHeight = () => {
			const { windowHeight,windowWidth } = uni.getSystemInfoSync()
			if(windowWidth >= 414 && windowWidth <= 767){
				bottomNavBarHeight.value = 55
			}else if(windowWidth >= 768){
				bottomNavBarHeight.value = 60
			}else{
				bottomNavBarHeight.value = 50
			}
			scrollViewHeight.value = `${Math.max(0, windowHeight - bottomNavBarHeight.value)}px`;
	}
	onMounted(() => {
		getAnnouncements();
		computeScrollHeight();
		resizeHandler = () => computeScrollHeight();
		uni.onWindowResize?.(resizeHandler);
	})
	onUnmounted(()=>{
		if (resizeHandler && typeof uni.offWindowResize === 'function') {
			uni.offWindowResize(resizeHandler)
			resizeHandler = null
        }
	})
	const handleHelp = () => {
		uni.showToast({
			title: `在线帮助功能正在开发中，敬请期待`,
			icon: 'none'
		})
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f3f7ff;
	}
	
	.workplace-container {
		height: auto;
		background: #f3f7ff;

		.scroller {
			box-sizing: border-box;
			background: #f3f7ff;
			overflow-y: auto;
		}

		.header-stickt {
			.status_bar {
				height: var(--status-bar-height);
				width: 100%;
				background: transparent;
			}

			.header-banner {
				width: 100%;
				height: 289.856rpx;
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
					width: 100%;
				}
			}

			.notification-bar {
				width: 90%;
				margin: -27.174rpx auto 0;
				position: relative;
				z-index: 10;

				.notification-content {
					background: #FFFFFF;
					border-radius: 125rpx;
					box-sizing: border-box;
					height: 54.348rpx;
					padding: 0 27.174rpx;
					display: flex;
					align-items: center;
					box-shadow: 0 8rpx 28.9856rpx rgba(0, 0, 0, 0.1);

					.speaker-icon {
						width: 25.3624rpx;
						height: 25.3624rpx;
						// margin-right: 22rpx;
						background-image: url('../../static/images/icon_1.svg');
						background-size: contain;
						background-repeat: no-repeat;
						background-position: center;
						margin-right: 27.174rpx;
					}

					.notification-text {
						font-size: 21.7392rpx;
						color: #333;
						flex: 1;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}
			}
		}



		.main-content {
			padding: 28.9856rpx 0 28.9856rpx;

			.quick-access {
				box-sizing: border-box;
				height: 199.276rpx;
				width: 90%;
				margin-left: auto;
				margin-right: auto;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 28.9856rpx;
				background-color: #ffffff;
				border-radius: 25rpx;
				box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
				padding: 0 4rpx;
				margin-top: 1.8116rpx;

				.access-item {
					width: 135.000432rpx;
					height: 128.6236rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 0 14.4928rpx;

					.access-icon {
						width: 81.522rpx;
						height: 81.522rpx;
						border-radius: 21.7392rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-bottom: 18.116rpx;
					}

					.access-label {
						font-size: 21.7392rpx;
						color: #333333;
						text-align: center;
					}
				}
			}

			.announcement-section {
				box-sizing: border-box;
				width: 90%;
				// height: 448rpx;
				margin-left: auto;
				margin-right: auto;
				margin-bottom: 28.9856rpx;
				background-color: #ffffff;
				padding: 23.5508rpx 28.9856rpx 28.9856rpx 28.9856rpx;
				border-radius: 21.7392rpx;
				box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
				display: flex;
				flex-direction: column;
				align-items: center;

				.section-title {
					// width: 622rpx;
					width: 100%;
					height: 41.6668rpx;
					position: relative;
					margin-bottom: 14.4928rpx;

					.section-title-text {
						font-size: 28.9856rpx;
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
					// width: 622rpx;
					width: 100%;
					height: 320rpx;
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
				border-radius: 21.7392rpx;
				box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
				padding: 1.8116rpx;
				background-color: #ffffff;
			}
		}
	}

	.announcement-img {
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}

	// 窄屏下适当减小字体与间距：
	@media screen and (max-width: 360px) {
		.notification-text {
			font-size: 21.7392rpx;
		}

		.access-label {
			font-size: 21.7392rpx;
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
	// @media screen and (min-width: 1200px) {
	// 	.workplace-container {
	// 		max-width: 1200rpx;

	// 		.header-stickt {
	// 			.header-banner {
	// 				.banner-bg {}
	// 			}
	// 		}

	// 		.main-content {
	// 			.quick-access {
	// 				.access-item {
	// 					.access-icon {
	// 						width: 140rpx;
	// 						height: 140rpx;
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	.access-icon-img {
  width: 100%;
  height: 100%;
  max-width: 60%;
  max-height: 60%;
}
</style>