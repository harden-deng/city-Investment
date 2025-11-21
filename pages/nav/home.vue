<template>
	<view class="workplace-container">
		<scroll-view scroll-y="true" class="scroller" :style="{ height: scrollViewHeight }">
			<!-- 顶部标题栏 -->
			<view class="header-stickt">
				<view class="status_bar" :style="{ height: `${statusBarHeight * 2}rpx` }"></view>
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
							<image :src="item.imgUrl" mode="aspectFit" style="width: 59%; height: 59%"></image>
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
				<view class="help-section">
					<image src="../../static/images/ib_2.jpg" mode="" aria-label="在线帮助" loading="lazy"
						style="width: 100%;height: 100%;border-radius: 24rpx;"></image>
				</view>
			</view>
		</scroll-view>
		<!-- 底部导航栏 -->
		<!-- <BottomNavBar ref="bottomNavRef" :modelValueFlag="0" /> -->
	</view>
</template>
<script setup>
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		ref,
		onMounted,
		computed,
		nextTick
	} from 'vue'

	// import BottomNavBar from '@/components/navBar/bottomNavBar.vue'
	
	import http from '@/utils/request.js'
	const statusBarHeight = ref(0)
	const tabBarHeight = ref(0) // 如有实际高度可替换
	const windowHeight = ref(0)
	const announcements = ref('');
	onShow(() => {
		nextTick(()=>{
			getAnnouncements();
		})
	})
	
	const getAnnouncements = () => {
		http.get('/WF/GetAnnouncements').then(res => {
			if(res.code == 0){
				announcements.value = res.data;
			}
		})
	}
	// 快捷功能列表
	const quickAccessList = ref([{
			label: '待办流程',
			imgUrl: '../../static/images/index_menu_1.svg',
			path: '/pages/nav/pending',
			bjColor: '#6599ff',
			isTab: true
		},
		{
			label: '已办流程',
			imgUrl: '../../static/images/index_menu_2.svg',
			path: '/pages/nav/completed',
			bjColor: '#9933ff',
			isTab: true
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
			path: '/pages/info/help',
			bjColor: '#33cb99',
			isTab: false
		},
	])
	const handleQuickAccess = (item) => {
		if (!item.path) {
			uni.showToast({
				title: `${item.label}功能开发中`,
				icon: 'none'
			})
			return
		}
		item.isTab ? uni.switchTab({
			url: item.path
		}) : uni.navigateTo({
			url: item.path
		})
	}
	const handleNotification = () => {
		uni.navigateTo({
			url: '/pages/info/msg'
		})
	}
	const scrollViewHeight = computed(() => {
		return `${Math.max(0, windowHeight.value - tabBarHeight.value)}px`
	})
	onMounted(() => {
		try {
			const sys = uni.getSystemInfoSync()
			console.log("sys=>",sys)
			windowHeight.value = sys.windowHeight
		} catch (e) {
			windowHeight.value = 600
		}
		uni.onWindowResize?.(() => {
			const sys = uni.getSystemInfoSync?.()
			if (sys?.windowHeight) windowHeight.value = sys.windowHeight
		})
	})
	// const count = ref(0)
	// const plusOne = computed({
	// 	get: () => count.value + 1,
	// 	set: (val) => {
	// 		console.log("plusOne.value==0000=>",val)
	// 		count.value = val - 1
	// 		handleNotification()
	// 	}
	// })
	// plusOne.value = 5
	
	// console.log("plusOne.value===>", plusOne.value,count.value)
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
						width: 28rpx;
						height: 28rpx;
						// margin-right: 22rpx;
						background-image: url('../../static/images/icon_1.svg');
						background-size: contain;
						background-repeat: no-repeat;
						background-position: center;
						margin-right: 30rpx;
					}

					.notification-text {
						font-size: 24rpx;
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
			padding: 30rpx 0 34rpx;

			.quick-access {
				box-sizing: border-box;
				height: 220rpx;
				width: 90%;
				margin-left: auto;
				margin-right: auto;
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin-bottom: 32rpx;
				background-color: #ffffff;
				border-radius: 25rpx;
				box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
				padding: 0 4rpx;
				margin-top: 2rpx;

				.access-item {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 0 10rpx;

					.access-icon {
						width: 90rpx;
						height: 90rpx;
						border-radius: 24rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-bottom: 20rpx;
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
				// height: 448rpx;
				margin-left: auto;
				margin-right: auto;
				margin-bottom: 30rpx;
				background-color: #ffffff;
				padding: 26rpx 32rpx 32rpx 32rpx;
				border-radius: 25rpx;
				box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
				display: flex;
				flex-direction: column;
				align-items: center;

				.section-title {
					// width: 622rpx;
					width: 100%;
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
				border-radius: 24rpx;
				box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
				padding: 2rpx;
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
			font-size: 22rpx;
		}

		.access-label {
			font-size: 22rpx;
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