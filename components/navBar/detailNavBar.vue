<template>
	<view class="status_bar" :style="{ height: `${statusBarHeight * 2}rpx` }"></view>
	<uni-nav-bar class="nav-bar-top">
		<template v-slot:left>
			<view class="back-btn" @click="handleBack">
			</view>
		</template>
		<view class="nav-title">{{ title }}</view>
		<template v-slot:right>
			<slot name="right">
				<view style="width: 40rpx"></view>
			</slot>
		</template>
	</uni-nav-bar>
</template>

<script setup>
import { goBack } from '@/utils/h5Bribge'

const props = defineProps({
	title: {
		type: String,
		default: '审批详情'
	},
	statusBarHeight: {
		type: Number,
		default: 0
	}
})

const emit = defineEmits(['back'])

const handleBack = () => {
	emit('back')
	goBack()
}
</script>

<style lang="scss" scoped>
::v-deep .uni-navbar__header-container {
	justify-content: center !important;
	align-items: center !important;
}

::v-deep .uni-navbar__header {
	padding: 0 !important;
	background: #fff !important;
}

.status_bar {
	background: #fff;
	width: 100%;
}

.nav-bar-top {
	.back-btn {
		width: 100rpx;
		height: 100rpx;
		background: url('../../static/images/back.svg') center center no-repeat;
		background-size: 24rpx;
	}

	.nav-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #000;
	}
}
</style>