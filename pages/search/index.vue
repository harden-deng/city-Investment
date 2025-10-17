<template>
	<view class="filter-search">
		<view class="header-stickt">
			<uni-nav-bar :border="false" class="nav-bar-top">
				<template v-slot:left>
					<view class="nav-bar-title" @click="doBack">
						<uni-icons  type="left" size="25" color="#231815" />
					</view>
				</template>
				<view class="nav-input-view">
					<image class="input-uni-icon"  src="../../static/images/search.svg" style="width: 32rpx;height: 32rpx;" mode=""></image>
					<uni-easyinput :height="'30px'" v-model="searchVal" placeholder="搜索"
						@confirm="inputChange"></uni-easyinput>
					<view class="verticle-view"></view>
					<text class="search-bar" @click="doSeach">搜索</text>
				</view>
			</uni-nav-bar>
		</view>
		<!-- 筛选内容 -->
		<scroll-view scroll-y="true" style="height: 100%;margin-top: 36rpx;">
			<!-- 筛选分类一 -->
			<view class="filter-category">
				<view class="category-title">筛选分类一</view>
				<view class="filter-grid">
					<view v-for="(item, index) in category1Options" :key="item.value" class="filter-item"
						:class="{ active: state.category1.has(item.value) }"
						@click="toggleFilter(state.category1, item.value)">
						{{ item.label }}
					</view>
				</view>
			</view>

			<!-- 筛选分类二 -->
			<view class="filter-category">
				<view class="category-title">筛选分类二</view>
				<view class="filter-grid">
					<view v-for="(item, index) in category2Options" :key="item.value" class="filter-item"
						:class="{ active: state.category2.has(item.value) }"
						@click="toggleFilter(state.category2, item.value)">
						{{ item.label }}
					</view>
				</view>
			</view>
			<view style="height: 900rpx;">

			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		watch,
		defineProps,
		defineEmits,
		defineExpose
	} from 'vue'
	const searchVal = ref('');
	// 筛选分类一的选项（9个选项，按照图片中的布局）
	const category1Options = computed(() => [{
			label: '筛选条件一',
			value: 'filter1_1'
		},
		{
			label: '筛选条件二',
			value: 'filter1_2'
		},
		{
			label: '筛选条件三',
			value: 'filter1_3'
		},
		{
			label: '筛选条件四',
			value: 'filter1_4'
		},
		{
			label: '筛选条件五',
			value: 'filter1_5'
		},
		{
			label: '筛选条件六',
			value: 'filter1_6'
		},
		{
			label: '筛选条件七',
			value: 'filter1_7'
		},
		{
			label: '筛选条件八',
			value: 'filter1_8'
		},
		{
			label: '筛选条件九',
			value: 'filter1_9'
		}
	])
	// 筛选分类二的选项（9个选项，按照图片中的布局）
	const category2Options = computed(() => [{
			label: '筛选条件一',
			value: 'filter2_1'
		},
		{
			label: '筛选条件二',
			value: 'filter2_2'
		},
		{
			label: '筛选条件三',
			value: 'filter2_3'
		},
		{
			label: '筛选条件四',
			value: 'filter2_4'
		},
		{
			label: '筛选条件五',
			value: 'filter2_5'
		},
		{
			label: '筛选条件六',
			value: 'filter2_6'
		},
		{
			label: '筛选条件七',
			value: 'filter2_7'
		},
		{
			label: '筛选条件八',
			value: 'filter2_8'
		},
		{
			label: '筛选条件九',
			value: 'filter2_9'
		}
	])
	// 筛选状态管理
	const state = reactive({
		category1: new Set(['filter1_1', 'filter1_4']), // 默认选中筛选条件一和筛选条件四
		category2: new Set(['filter2_1']) // 默认选中筛选条件一
	})

	// 切换筛选条件
	function toggleFilter(set, value) {
		if (set.has(value)) {
			set.delete(value)
		} else {
			set.add(value)
		}
	}

	function onReset() {
		state.category1.clear()
		state.category2.clear()
	}

	function onConfirm() {
		const payload = {
			category1: Array.from(state.category1),
			category2: Array.from(state.category2)
		}
	}

	function inputChange(e) {
		console.log('输入内容：', e);
		doBack()
	}
	const doSeach = () => {
		console.log('搜索：');
		doBack()
	}
	const doBack = () => {
		uni.navigateBack({})
	}
</script>

<style lang="scss" scoped>
	// 颜色变量，精准还原图片样式
	$primary: #3e65f6; // 蓝色主题色
	$text-dark: #000000; // 深灰色文字
	$text-muted: #666; // 浅灰色文字
	$bg-light: #f6f8fc; // 浅灰色背景
	$bg-white: #ffffff; // 白色背景
	$border-light: #e0e0e0; // 浅色边框

	::v-deep .uni-search__wrapper {
		display: flex !important;
		justify-content: flex-end !important;
	}

	::v-deep .uni-navbar__header-btns-left {
		width: 26px !important;
	}

	::v-deep .uni-navbar__header-btns-right {
		width: 0px !important;
	}

	::v-deep .uni-navbar__header {
		align-items: center !important;
	}

	::v-deep .is-input-border {
		border: none !important;
		height: 30rpx !important;
	}

	::v-deep .uniui-clear {
		color: #dddddd !important;
	}

	.filter-search {
		width: 750rpx;
		background: $bg-white;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;

		.header-stickt {
			position: sticky;
			z-index: 19;
			left: 0;
			top: 0;
			right: 0;

			.status_bar {
				height: var(--status-bar-height);
				width: 100%;
				background: #FFFFFF;
			}
		}

		.nav-bar-top {

			// width: 100%;
			// background: linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 100%);
			// opacity: 1;
			// border-bottom: 12rpx solid #EEEEEE;
			.nav-bar-title {}

			.nav-input-view {
				width: 626rpx;
				height: 70rpx;
				border: 2rpx solid #ededed;
				border-radius: 18rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.input-uni-icon {
					margin-left: 18rpx;
				}

				.verticle-view {
					width: 3rpx;
					height: 30rpx;
					background: #dddddd;
				}

				.search-bar {
					width: 110rpx;
					height: auto;
					margin-bottom: 4rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					color: #3e65f6;
					font-family: "Alibaba Pu Hui Ti_3_55_ Regular";
				}
			}
		}

	}

	// 筛选分类样式
	.filter-category {
		padding: 0rpx 32rpx 50rpx 32rpx;

		.category-title {
			font-size: 28rpx;
			font-family: "Alibaba Pu Hui Ti_3_55_ Regular";
			color: #999999;
			margin-bottom: 24rpx;
		}

		// 3x3 网格布局
		.filter-grid {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(3, 1fr);
			gap: 20rpx;

			.filter-item {
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				color: #000000;
				font-family: "Alibaba Pu Hui Ti_3_55_ Regular";
				background: $bg-light;
				border-radius: 12rpx;
				border: 1rpx solid transparent;
				transition: all 0.2s ease;

				// 选中状态 - 精准还原图片中的蓝色样式
				&.active {
					color: $primary;
					background: rgba(62, 101, 246, 0.1); // 浅蓝色背景
					border: 2rpx solid $primary; // 蓝色边框
					font-size: 24rpx;
					font-family: "Alibaba Pu Hui Ti_3_55_ Regular";
				}

				// 点击效果
				&:active {
					transform: scale(0.98);
				}
			}
		}
	}
	
	// PC端适配
	@media screen and (min-width: 768px) {
		.filter-search {
			max-width: 768rpx;
			margin: 0 auto;
		}
	}
	

</style>