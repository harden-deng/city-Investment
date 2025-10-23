<template>
	<uni-popup ref="popupRef" type="bottom" :safe-area="true" :mask-click="true" @change="onPopupChange">
		<view class="filter-popup">
			<view class="filter-title">
				选择筛选条件
			</view>
			<!-- 筛选内容 -->
			<scroll-view scroll-y="true" style="height: calc(100% - 120rpx);">
				<!-- 筛选分类一 -->
				<view class="filter-category">
					<view class="category-title">筛选分类一</view>
					<view class="filter-grid">
						<view 
							v-for="(item, index) in category1Options" 
							:key="item.value" 
							class="filter-item"
							:class="{ active: state.category1.has(item.value) }" 
							@click="toggleFilter(state.category1, item.value)"
						>
							{{ item.label }}
						</view>
					</view>
				</view>

				<!-- 筛选分类二 -->
				<view class="filter-category">
					<view class="category-title">筛选分类二</view>
					<view class="filter-grid">
						<view 
							v-for="(item, index) in category2Options" 
							:key="item.value" 
							class="filter-item"
							:class="{ active: state.category2.has(item.value) }" 
							@click="toggleFilter(state.category2, item.value)"
						>
							{{ item.label }}
						</view>
					</view>
				</view>
				<view style="height: 120rpx;">
					
				</view>
			</scroll-view>
			<!-- 底部操作按钮 -->
			<view class="fp-footer">
				<view class="btn reset" @click="handleReset">重置</view>
				<view class="btn confirm" @click="handleConfirm">完成</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
	import { ref, reactive, computed, watch } from 'vue'
    import { throttle } from '@/utils/h5Bribge'
    const handleReset = throttle(() => {
        onReset()
    }, 500)
    const handleConfirm = throttle(() => {
        onConfirm()
    }, 1000)
	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: false
		},
		category1Options: {
			type: Array,
			default: () => []
		},
		category2Options: {
			type: Array,
			default: () => []
		}
	})

	const emit = defineEmits(['update:modelValue', 'confirm', 'reset'])

	const popupRef = ref(null)

	// 筛选分类一的选项（9个选项，按照图片中的布局）
	const category1Options = computed(() =>
		[
			{ label: '筛选条件一', value: 'filter1_1' },
			{ label: '筛选条件二', value: 'filter1_2' },
			{ label: '筛选条件三', value: 'filter1_3' },
			{ label: '筛选条件四', value: 'filter1_4' },
			{ label: '筛选条件五', value: 'filter1_5' },
			{ label: '筛选条件六', value: 'filter1_6' },
			{ label: '筛选条件七', value: 'filter1_7' },
			{ label: '筛选条件八', value: 'filter1_8' },
			{ label: '筛选条件九', value: 'filter1_9' }
		]
	)

	// 筛选分类二的选项（9个选项，按照图片中的布局）
	const category2Options = computed(() =>
		[
			{ label: '筛选条件一', value: 'filter2_1' },
			{ label: '筛选条件二', value: 'filter2_2' },
			{ label: '筛选条件三', value: 'filter2_3' },
			{ label: '筛选条件四', value: 'filter2_4' },
			{ label: '筛选条件五', value: 'filter2_5' },
			{ label: '筛选条件六', value: 'filter2_6' },
			{ label: '筛选条件七', value: 'filter2_7' },
			{ label: '筛选条件八', value: 'filter2_8' },
			{ label: '筛选条件九', value: 'filter2_9' }
		]
	)

	// 筛选状态管理
	const state = reactive({
		category1: new Set([]), // 默认选中筛选条件一和筛选条件四
		category2: new Set([]) // 默认选中筛选条件一
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
		emit('reset')
	}

	function onConfirm() {
		const payload = {
			category1: Array.from(state.category1),
			category2: Array.from(state.category2)
		}
		emit('confirm', payload)
		close()
	}

	function open() {
		popupRef.value?.open?.()
	}
	
	function close() {
		popupRef.value?.close?.()
	}
	
	defineExpose({ open, close, state })

	// v-model 同步
	watch(
		() => props.modelValue,
		v => {
			if (v) open()
			else close()
		}
	)
	
	function onPopupChange(e) {
		if (e?.show === false) emit('update:modelValue', false)
	}
</script>

<style lang="scss" scoped>
	// 颜色变量，精准还原图片样式
	$primary: #3e65f6;  // 蓝色主题色
	$text-dark: #000;  // 深灰色文字
	$text-muted: #666;  // 浅灰色文字
	$bg-light: #f6f8fc;  // 浅灰色背景
	$bg-white: #ffffff;  // 白色背景
	$border-light: #e0e0e0;  // 浅色边框

	::v-deep .uni-popup__wrapper {
		display: flex !important;
		justify-content: flex-end !important;
	}

	.filter-popup {
		position: relative;
		z-index: 19;
		width: 750rpx;
		background: $bg-white;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		height: calc(100vh - 400rpx);
		overflow: hidden;
		
		.filter-title {
			height: 100rpx;
			font-size: 32rpx;
			color: $text-dark;
			font-family: "Microsoft Ya Hei";
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	// 筛选分类样式
	.filter-category {
		padding: 0rpx 32rpx 50rpx 32rpx;
		
		.category-title {
			font-size: 28rpx;
			
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
				box-sizing: border-box;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				color: #000;
				
				background: $bg-light;
				border-radius: 12rpx;
				border: 1rpx solid transparent;
				transition: all 0.05s ease;
				
				// 选中状态 - 精准还原图片中的蓝色样式
				&.active {
					color: $primary;
					background: rgba(62, 101, 246, 0.1);   // 浅蓝色背景
					border: 2rpx solid $primary;  // 蓝色边框
					font-size: 24rpx;
					
				}
				
				// 点击效果
				&:active {
					transform: scale(0.99);
				}
			}
		}
	}



	// 底部操作按钮
	.fp-footer {
		box-sizing: border-box;
		width: 100%;
		height: 120rpx;
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 29;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $bg-white;
		
		// border-top: 1rpx solid $border-light;

		.btn {
			box-sizing: border-box;
			flex: 0.34;
			height: 70rpx;
			// border-radius: 48rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			transition: all 0.2s ease;
		}

		.reset {
			font-size: 28rpx;
			font-family: "Microsoft Ya Hei";
			border-top-left-radius: 10rpx;
			border-bottom-left-radius: 10rpx;
			color: $primary;
			border: 2rpx solid $primary;
		}

		.confirm {
			font-size: 28rpx;
			font-family: "Microsoft Ya Hei";
			border-top-right-radius: 10rpx;
			border-bottom-right-radius: 10rpx;
			background: $primary;
			color: $bg-white;
		}
	}
</style>