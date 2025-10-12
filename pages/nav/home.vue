<template>
	<view class="workplace-container">
		<!-- 顶部标题栏 -->
		<view class="header-stickt">
			<view class="status_bar" :style="{height: `${statusBarHeight*2}rpx`}"></view>
			<view class="header-banner">
				<view class="banner-bg">
				</view>
			</view> <!-- 通知栏 -->
			<view class="notification-bar">
				<view class="notification-content">
					<view class="speaker-icon">🔊</view>
					<text class="notification-text">本市排水管理体制改革取得阶段性进展</text>
				</view>
			</view>
		</view>
		<!-- 主内容区域 -->
		<view class="main-content">
			<!-- 快捷功能图标 -->
			<view class="quick-access">
				<view class="access-item" v-for="(item, index) in quickAccessList" :key="index"
					@click="handleQuickAccess(item)">
					<view class="access-icon">
						<image :src="item.imgUrl" mode="aspectFit" style="width: 100%; height: 100%;"></image>
					</view>
					<text class="access-label">{{ item.label }}</text>
				</view>
			</view>
			<!-- 在线公示 -->
			<view class="announcement-section">
				<view class="section-title">在线公示</view>
				<view class="announcement-banner">
					<view class="banner-content">
						<view class="banner-left">
							<text class="banner-subtitle">人人可用的大数据分析工具</text>
							<view class="banner-main">
								<text class="banner-brand">IMFBI</text>
								<text class="banner-smart">智能</text>
							</view>
							<text class="banner-desc">Fan Software has ranked first in the domestic business
								intelligence market share for five consecutive years!</text>
						</view>
						<view class="banner-right">
							<view class="data-security-graphic">
								<view class="security-shield">🛡️</view>
								<text class="security-text">DATA SECURITY</text>
								<view class="data-lines">
									<view class="line"></view>
									<view class="line"></view>
									<view class="line"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 在线帮助 -->
			<view class="help-section">
				<view class="section-title">在线帮助</view>
				<view class="help-content">
					<view class="help-left">
						<text class="help-subtitle">ONLINE HELP</text>
					</view>
					<view class="help-right">
						<view class="help-graphic">
							<view class="data-cube" v-for="i in 6" :key="i"></view>
							<view class="connection-lines">
								<view class="line" v-for="i in 8" :key="i"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup lang="ts">
	import { onLoad } from '@dcloudio/uni-app'
	import { ref, reactive, onMounted } from 'vue'
	import { setStorage, getStorage, removeStorage } from '@/utils/storage'
	// import BottomNavBar from '@/components/navBar/bottomNavBar.vue'
	// import { useH5Bridge } from '../../utils/h5Bribge.js'
	// import type { NavItem } from '@/components/navBar/types'
	// // #ifdef H5
	// const nav1 = '/static/home/nav-1.png'
	// // #endif

	// // #ifndef H5
	// import nav1 from '@/static/home/nav-1.png'
	// // #endif

	const statusBarHeight = ref(0)
	onLoad(() => {
		const statusBarHeightNew = getStorage<any>('statusBarHeight');
		if (Number(statusBarHeightNew) != 0) {
			statusBarHeight.value = Number(statusBarHeightNew)
		}
	})
	// 声明 uni 全局对象
	declare const uni : any

	// 定义快捷访问模块接口
	interface QuickAccessItem {
		label : string
		imgUrl : any
	}

	// 响应式数据
	const currentTab = ref(0);

	// 快捷功能列表
	const quickAccessList = ref<QuickAccessItem[]>([
		{
			label: '待办流程',
			imgUrl: '../../static/images/home.png',
		},
		{
			label: '已办流程',
			imgUrl: '../../static/images/home.png',
		},
		{
			label: '掌上看板',
			imgUrl: '../../static/images/home.png',
		},
		{
			label: '在线帮助',
			imgUrl: '../../static/images/home.png',
		}
	])
	const msgs = ref<any>(null)
	onMounted(() => {
		// setTimeout(()=>{
		// 	// 接收 App 回传（App 会 evalJS 调这个函数）
		// 	window.__onAppMessage = function (data:any) {
		// 		console.log('收到App消息:', data)
		// 		// TODO: 你的处理逻辑
		// 	}

		// 	// 示例：页面加载后向App问候
		// 	window.addEventListener('load', () => {
		// 		postToApp({ type: 'PING', time: Date.now() })
		// 	})

		// 	// 额外：兼容纯浏览器用 postMessage 的回传调试
		// 	window.addEventListener('message', (e) => {
		// 		console.log('浏览器父页面回传:', e.data)
		// 	})
		// 	console.log("111111111111111111112")
		//     postToApp([{id:'获取token'}])
		// },1000)
		// window.__onAppMessage = (data : any) => {
		// 	// let cc =  JSON.parse(data)
		// 	const msg = JSON.parse(JSON.stringify(data));
		// 	if (msg.type === 'staBarH') {
		// 		statusBarHeight.value = msg.statusBarHeight;
		// 		setStorage('statusBarHeight',statusBarHeight.value, 60 * 1440)
		// 	}

		// 	console.log("app--->h511", msg,);
		// 	msgs.value = msg
		// }
		// setTimeout(() => {
		// 	window.__onAppMessage = (data : any) => {
		// 		// let cc =  JSON.parse(data)
		// 		const msg = JSON.parse(JSON.stringify(data));
		// 		console.log("app--->h52222", msg,);
		// 	}
		// }, 2000)
	})
	// 快捷访问点击处理
	const handleQuickAccess = (item : QuickAccessItem) => {
		console.log('点击快捷功能:', item.label)
		if (item.path) {
			uni.navigateTo({
				url: item.path
			})
		} else {
			uni.showToast({
				title: `${item.label}功能开发中`,
				icon: 'none'
			})
		}
	}



	//和app进行通信
	// // 给 App 发消息（在 uni-app WebView 环境里会注入 window.uni）
	// function postToApp(data : any) {
	// 	if (window.uni && window.uni.postMessage) {
	// 		window.uni.postMessage({ data })
	// 	} else if (window.parent && window.parent !== window) {
	// 		// 兼容非 App 环境（比如纯浏览器 iframe 里预览）
	// 		window.parent.postMessage({ from: 'h5', data }, '*')
	// 	} else {
	// 		console.log('不在App WebView环境，直接本地处理', data)
	// 	}
	// }
	// const status = ref('等待中')
	// const lastMsg = ref('-')

	// const { isInApp, postToApp } = useH5Bridge((data:any) => {
	// 	lastMsg.value = JSON.stringify(data)
	// 	if (data.type === 'PONG') status.value = 'App 已响应'
	// })

	// function ping() {
	// 	status.value = '已发送 PING'
	// 	postToApp({ type: 'PING', payload: { time: Date.now() }, version: '1.0.0' })
	// }

	// function sendUser() {
	// 	postToApp({
	// 		type: 'SET_USER',
	// 		payload: { id: 'u_1001', name: '张三' }
	// 	})
	// }
	//和app进行通信2
</script>

<style lang="scss" scoped>
	.workplace-container {
		min-height: 100vh;
		background-color: #FFFFFF;
		position: relative;

		.header-stickt {
			position: sticky;
			z-index: 19;
			left: 0;
			top: 0;
			right: 0;

			.status_bar {
				height: var(--status-bar-height);
				width: 100%;
				background: transparent;
			}

			.header-banner {
				height: 360rpx;
				background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
				position: relative;
				overflow: hidden;

				.banner-bg {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background: url('../../static/images/banner.png') center/cover;
					display: flex;
					align-items: center;
					justify-content: center;

				
				}
			}

			.notification-bar {
				margin: -40rpx 32rpx 0;
				position: relative;
				z-index: 10;

				.notification-content {
					background: #FFFFFF;
					border-radius: 16rpx;
					padding: 24rpx 32rpx;
					display: flex;
					align-items: center;
					box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);

					.speaker-icon {
						font-size: 32rpx;
						margin-right: 16rpx;
						color: #4A90E2;
					}

					.notification-text {
						font-size: 28rpx;
						color: #333333;
						flex: 1;
					}
				}
			}
		}



		.main-content {
			padding: 60rpx 32rpx 40rpx;

			.quick-access {
				display: flex;
				justify-content: space-between;
				margin-bottom: 60rpx;

				.access-item {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 0 8rpx;

					.access-icon {
						width: 100rpx;
						height: 100rpx;
						border-radius: 20rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						margin-bottom: 16rpx;
						border: 1rpx solid #E5E5E5;

						// .icon-text {
						// 	font-size: 48rpx;
						// 	color: #FFFFFF;
						// }
					}

					.access-label {
						font-size: 24rpx;
						color: #333333;
						text-align: center;
					}
				}
			}

			.announcement-section {
				margin-bottom: 60rpx;

				.section-title {
					font-size: 36rpx;
					font-weight: 700;
					color: #333333;
					margin-bottom: 32rpx;
				}

				.announcement-banner {
					background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
					border-radius: 20rpx;
					padding: 40rpx;
					position: relative;
					overflow: hidden;

					.banner-content {
						display: flex;
						align-items: center;
						position: relative;

						.banner-left {
							flex: 1;

							.banner-subtitle {
								font-size: 24rpx;
								color: #666666;
								margin-bottom: 16rpx;
								display: block;
							}

							.banner-main {
								margin-bottom: 16rpx;

								.banner-brand {
									font-size: 64rpx;
									font-weight: 800;
									color: #4A90E2;
									margin-right: 16rpx;
								}

								.banner-smart {
									font-size: 36rpx;
									font-weight: 600;
									color: #333333;
								}
							}

							.banner-desc {
								font-size: 20rpx;
								color: #666666;
								line-height: 1.4;
							}
						}

						.banner-right {
							width: 200rpx;
							height: 160rpx;
							position: relative;

							.data-security-graphic {
								width: 100%;
								height: 100%;
								position: relative;

								.security-shield {
									position: absolute;
									top: 20rpx;
									left: 50%;
									transform: translateX(-50%);
									font-size: 48rpx;
									z-index: 2;
								}

								.security-text {
									position: absolute;
									bottom: 20rpx;
									left: 50%;
									transform: translateX(-50%);
									font-size: 16rpx;
									font-weight: 600;
									color: #4A90E2;
									z-index: 2;
								}

								.data-lines {
									position: absolute;
									top: 0;
									left: 0;
									right: 0;
									bottom: 0;

									.line {
										position: absolute;
										background: linear-gradient(45deg, rgba(74, 144, 226, 0.3), transparent);
										border-radius: 2rpx;

										&:nth-child(1) {
											width: 80rpx;
											height: 2rpx;
											top: 30rpx;
											left: 20rpx;
											transform: rotate(15deg);
										}

										&:nth-child(2) {
											width: 60rpx;
											height: 2rpx;
											top: 60rpx;
											right: 30rpx;
											transform: rotate(-25deg);
										}

										&:nth-child(3) {
											width: 100rpx;
											height: 2rpx;
											bottom: 40rpx;
											left: 10rpx;
											transform: rotate(45deg);
										}
									}
								}
							}
						}
					}
				}
			}

			.help-section {
				.section-title {
					font-size: 36rpx;
					font-weight: 700;
					color: #333333;
					margin-bottom: 32rpx;
				}

				.help-content {
					display: flex;
					align-items: center;
					padding: 40rpx;
					background: #FFFFFF;
					border-radius: 20rpx;
					box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);

					.help-left {
						flex: 1;

						.help-subtitle {
							font-size: 20rpx;
							color: #999999;
							letter-spacing: 2rpx;
						}
					}

					.help-right {
						width: 200rpx;
						height: 120rpx;
						position: relative;

						.help-graphic {
							width: 100%;
							height: 100%;
							position: relative;

							.data-cube {
								position: absolute;
								width: 40rpx;
								height: 40rpx;
								background: linear-gradient(135deg, #4A90E2, #667eea);
								border-radius: 8rpx;
								opacity: 0.7;

								&:nth-child(1) {
									top: 20rpx;
									left: 20rpx;
								}

								&:nth-child(2) {
									top: 20rpx;
									left: 70rpx;
								}

								&:nth-child(3) {
									top: 20rpx;
									right: 20rpx;
								}

								&:nth-child(4) {
									top: 60rpx;
									left: 45rpx;
								}

								&:nth-child(5) {
									bottom: 20rpx;
									left: 30rpx;
								}

								&:nth-child(6) {
									bottom: 20rpx;
									right: 30rpx;
								}
							}

							.connection-lines {
								position: absolute;
								top: 0;
								left: 0;
								right: 0;
								bottom: 0;

								.line {
									position: absolute;
									background: linear-gradient(45deg, rgba(74, 144, 226, 0.4), transparent);
									border-radius: 1rpx;

									&:nth-child(1) {
										width: 50rpx;
										height: 2rpx;
										top: 40rpx;
										left: 60rpx;
										transform: rotate(25deg);
									}

									&:nth-child(2) {
										width: 60rpx;
										height: 2rpx;
										top: 40rpx;
										left: 90rpx;
										transform: rotate(-15deg);
									}

									&:nth-child(3) {
										width: 40rpx;
										height: 2rpx;
										top: 70rpx;
										left: 65rpx;
										transform: rotate(45deg);
									}

									&:nth-child(4) {
										width: 50rpx;
										height: 2rpx;
										top: 70rpx;
										right: 50rpx;
										transform: rotate(-35deg);
									}

									&:nth-child(5) {
										width: 45rpx;
										height: 2rpx;
										top: 90rpx;
										left: 75rpx;
										transform: rotate(15deg);
									}

									&:nth-child(6) {
										width: 55rpx;
										height: 2rpx;
										top: 90rpx;
										right: 40rpx;
										transform: rotate(-25deg);
									}

									&:nth-child(7) {
										width: 35rpx;
										height: 2rpx;
										bottom: 40rpx;
										left: 70rpx;
										transform: rotate(35deg);
									}

									&:nth-child(8) {
										width: 40rpx;
										height: 2rpx;
										bottom: 40rpx;
										right: 60rpx;
										transform: rotate(-45deg);
									}
								}
							}
						}
					}
				}
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
					.banner-bg {
						
					}
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