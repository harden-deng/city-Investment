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
import { goBack } from '@/utils/h5Bridge'

const props = defineProps({
	title: {
		type: String,
		default: '审批详情'
	},
	statusBarHeight: {
		type: Number,
		default: getApp().globalData.statusBarHeight - 6
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
	height: 90.58rpx !important;
}
::v-deep .uni-navbar--border{
	border-bottom-width: 0rpx !important;
}
.status_bar {
	background: #fff;
	width: 100%;
}

.nav-bar-top {
	.back-btn {
		width: 90.58rpx;
		height: 90.58rpx;
		background: url('../../static/images/back.svg') center center no-repeat;
		background-size: 21.7392rpx;
	}

	.nav-title {
		font-size: 28.9856rpx;
		font-weight: bold;
		color: #000;
	}
}
</style>