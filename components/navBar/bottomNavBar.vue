<template>
	<view class="bottom-nav-bar">
		<view class="nav-item" v-for="(item, index) in navItems" :key="index"
			:class="{ active: currentIndex === index }" @click="handleNavClick(index, item)">
			<!-- 图标容器 -->
			<view class="icon-container">
				<image v-if="item.icon" :src="currentIndex === index ? item.activeIcon || item.icon : item.icon"
					class="nav-icon" mode="aspectFit" />
				<text v-else class="nav-icon-text" :class="currentIndex === index ? 'text-active' : ''">
					{{ item.iconText }}
				</text>
			</view>

			<!-- 文字标签 -->
			<text class="nav-label" :class="{ 'label-active': currentIndex === index }">
				{{ item.label }}
			</text>
		</view>
	</view>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue'

    // Props(运行时定义，保持与原默认值一致)
    const props = defineProps({
        modelValueFlag: { type: Number, default: 0 },
        activeColor: { type: String, default: '#3e65f6' },
        inactiveColor: { type: String, default: '#000' },
        // showFlag: { type: Boolean, default: true }
    })

    // 提供给<style>中 v-bind(activeColor/inactiveColor) 使用，且保持响应式
    const activeColor = computed(() => props.activeColor)
    const inactiveColor = computed(() => props.inactiveColor)

    const navItems = ref([
		{
			label: '首页',
			activeIcon: '../../static/images/menu_1_2.svg',
			icon: '../../static/images/menu_1_1.svg',
			iconText: '🏠',
			path: '/pages/nav/home',
			pagePath: 'pages/nav/home'
		},
		{
			label: '待办流程',
			activeIcon: '../../static/images/menu_2_2.svg',
			icon: '../../static/images/menu_2_1.svg',
			iconText: '📋',
			path: '/pages/nav/pending',
			pagePath: 'pages/nav/pending'
		},
		{
			label: '已办流程',
			activeIcon: '../../static/images/menu_3_2.svg',
			icon: '../../static/images/menu_3_1.svg',
			iconText: '✅',
			path: '/pages/nav/completed',
			pagePath: 'pages/nav/completed'
		},
		{
			label: '个人中心',
			activeIcon: '../../static/images/menu_4_2.svg',
			icon: '../../static/images/menu_4_1.svg',
			iconText: '👤',
			path: '/pages/nav/profile',
			pagePath: 'pages/nav/profile'
		}
	])
    // Emits定义
    const emit = defineEmits(['change'])

	// 响应式数据
    const currentIndex = ref(props.modelValueFlag)

	// 方法
    const handleNavClick = (index, item) => {
		// if (currentIndex.value === index) return

		// currentIndex.value = index
		// emit('update:modelValue', index)
		// emit('change', index, item)
		// 页面跳转
		navigateToPage(item)
	}

    const navigateToPage = (item) => {
		// 判断当前页面是否为目标页面，避免重复跳转
        const pages = getCurrentPages();
		const currentPage = pages[pages.length - 1]
		const currentRoute = currentPage.route

		if (currentRoute === item.pagePath) {
			return
		}

		// 根据页面路径决定跳转方式
		if (item.path.includes('pages/nav/')) {
			// 跳转到首页使用 switchTab 或 reLaunch
			uni.switchTab({
				url: item.path,
				fail: (err) => {
					console.error('页面跳转失败:', err)
					// 备用跳转方式
					uni.navigateTo({
						url: item.path,
						fail: (navErr) => {
							console.error('备用跳转也失败:', navErr)
						}
					})
				}
			})
		} else {
			// 其他页面使用 navigateTo
			uni.redirectTo({
				url: item.path,
				fail: (err) => {
					console.error('页面跳转失败:', err)
					// 如果是tabBar页面，尝试使用switchTab
					uni.switchTab({
						url: item.path,
						fail: (switchErr) => {
							console.error('switchTab也失败:', switchErr)
						}
					})
				}
			})
		}
	}

	// 获取当前激活的索引（外部可调用）
    const getCurrentIndex = () => {
		return currentIndex.value
	}

	// 设置当前激活的索引（外部可调用）
    const setCurrentIndex = (index) => {
		if (index >= 0 && index < navItems.value.length) {
			currentIndex.value = index
			// emit('update:modelValue', index)
		}
	}

	// 生命周期
	onMounted(() => {
		// 根据当前页面路径设置激活状态
		const pages = getCurrentPages()
		if (pages.length > 0) {
			const currentPage = pages[pages.length - 1]
			const currentRoute = currentPage.route

			const activeIndex = navItems.value.findIndex(item =>
				item.pagePath === currentRoute || item.path.includes(currentRoute)
			)
			if (activeIndex !== -1 && activeIndex !== currentIndex.value) {
				currentIndex.value = activeIndex
				// emit('update:modelValue', activeIndex)
			}
		}
	})

	// 暴露给父组件的方法
    defineExpose({
        getCurrentIndex,
        setCurrentIndex
    })
</script>

<style lang="scss" scoped>
	.bottom-nav-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 50px;
		background: #ffffff;
		border-top: 1rpx solid #e6e6e6;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 19;
		box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.1);
		// border: 1px solid;  

		.nav-item {
			max-height: 50px;
			overflow: hidden;
			flex: 1;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			// padding: 4px 2px;
			transition: all 0.3s ease;
			cursor: pointer;
			height: 100%;
			position: relative;

			&:active {
				background-color: rgba(0, 122, 255, 0.1);
				border-radius: 6px;
			}

			&.active {
				.icon-container {
					transform: translateY(-2rpx);
				}
			}

			.icon-container {
				width: 24px;
				height: 24px;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-bottom: 3px;
				transition: all 0.3s ease;

				.nav-icon {
					width: 24px;
					height: 24px;
					transition: all 0.3s ease;
				}

				.nav-icon-text {
					font-size: 22px;
					line-height: 1;
					transition: all 0.3s ease;
					filter: grayscale(100%);

					&.text-active {
						filter: grayscale(0%);
						transform: scale(1.1);
					}
				}
			}

			.nav-label {
				font-size: 11px;
				color: v-bind(inactiveColor);
				line-height: 1.2;
				text-align: center;
				transition: all 0.3s ease;
				font-weight: 400;

				&.label-active {
					color: v-bind(activeColor);
					font-weight: 500;
					transform: scale(1.05);
				}
			}
		}
	}

	// 深色模式适配
	@media (prefers-color-scheme: dark) {
		.bottom-nav-bar {
			background: #1c1c1e;
			border-top-color: #38383a;

			.nav-item {
				&:active {
					background-color: rgba(255, 255, 255, 0.1);
				}
			}

			.nav-label {
				color: #8e8e93;

				&.label-active {
					color: v-bind(activeColor);
				}
			}
		}
	}

	// 小屏幕适配
	@media (max-width: 375px) {
		.bottom-nav-bar {
			height: 100rpx;

			.nav-item {
				padding: 3px 1px;

				.icon-container {
					width: 20px;
					height: 20px;
					margin-bottom: 2px;

					.nav-icon {
						width: 20px;
						height: 20px;
					}

					.nav-icon-text {
						font-size: 18px;
					}
				}

				.nav-label {
					font-size: 10px;
				}
			}
		}
	}

	// 大屏幕适配
	@media (min-width: 768px) {
		.bottom-nav-bar {
			height: 140rpx;

			.nav-item {
				padding: 12rpx 8rpx;

				.icon-container {
					width: 56rpx;
					height: 56rpx;
					margin-bottom: 8rpx;

					.nav-icon {
						width: 56rpx;
						height: 56rpx;
					}

					.nav-icon-text {
						font-size: 48rpx;
					}
				}

				.nav-label {
					font-size: 24rpx;
				}
			}
		}
	}
</style>