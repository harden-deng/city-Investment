<template>
	<view class="order-page">
		<view class="header-stickt">
			<view class="status_bar" :style="{height: `${statusBarHeight*2}rpx`}"></view>
			<uni-nav-bar class="nav-bar-top">
				<template v-slot:left>
					<view class="nav-bar-title">
						待办流程
					</view>
				</template>
				<!-- <view class="" style="width: 30%;">待办流程</view>
				<view class="title" style="width: 55%;text-align: center;font-size: 36rpx;
			                font-family: PingFang SC-Heavy, PingFang SC;
			                font-weight: 800;
			                color: #333333;">待办流程</view>
				<view slot="right" class="" style="width: 15%;text-align: end;">
				</view> -->
				<view class="nav-input-view" @click="doSearch">
					<!-- <uni-icons class="input-uni-icon" type="search" size="12" color="#999" /> -->
					<image src="../../static/images/search.svg" style="width: 24rpx;height: 24rpx;" mode=""></image>
					<text class="search-bar">搜索</text>
				</view>
				<template v-slot:right>
					<view @click="openFilter"> 筛选 </view>
				</template>
			</uni-nav-bar>
			<!-- 搜索栏和筛选 -->
			<!-- <view class="search-section">
				<view class="search-bar">
					<view class="search-input">
						<uni-easyinput prefixIcon="search" v-model="searchKeyword" placeholder="搜索" @input="doSearch"
							:styles="styles"></uni-easyinput>
					</view>
					<view class="filter-dropdown" @click="openFilter">
						<text class="filter-text">筛选</text>
						<text class="dropdown-arrow">▼</text>
					</view>
				</view>
			</view> -->

			<!-- 分段控制器 -->
			<view class="segmented-section">
				<uni-segmented-control :current="currentTab" :values="tabValues" :activeColor="'#3e65f6'"
					:inActiveColor="'#cccccc'" :styleType="'text'" @clickItem="onTabChange" class="custom-segmented" />
			</view>
		</view>
		<!-- 订单列表 -->
		<view class="order-list">
			<!-- <z-paging ref="paging" v-model="dataList" @query="queryList"> -->
			<view class="order-card" v-for="order in dataList " :key="order.id" @click="toDetail(order)">
				<view class="order-header">
					<text class="order-id">{{ order.id }}</text>
					<view class="order-time">
						<text class="time-text">{{ order.time }}</text>
					</view>
				</view>

				<view class="order-content">
					<view class="quote-section">
						<text class="quote-label">最新报价:</text>
						<text class="quote-price">¥{{ order.price }}</text>
					</view>
					<view class="quote-section">
						<text class="quote-label">客户名称: </text>
						<text class="description-text">{{ order.customerName }}</text>
					</view>
					<view class="quote-section">
						<text class="quote-label">客户联系人:</text>
						<text class="description-text">{{ order.contactName }} {{ order.contactPhone }}</text>
					</view>
					<view class="quote-section">
						<text class="quote-label">报价描述:</text>
						<text class="description-text">{{ order.description }}</text>
					</view>
					<view class="label-view">
						<view class="label-item" v-for="(item,index) in (order?.labelArr || [])" :key="index">
							<text class="point-icon"></text><text class="label-text">{{item.label}}</text>
						</view>
					</view>
					<view class="approved-view" v-show="order?.isApproval">
						<image src="../../static/images/approved.png" mode="" style="width: 100%;height: 100%;"></image>
					</view>
				</view>
			</view>
			<!-- </z-paging> -->
		</view>
		<FilterPopup ref="filterRef" v-model="show" :confirmCount="1400" @confirm="onConfirm" @reset="onReset"
			@editLocation="onEditLocation" />
		<!-- 底部导航栏 -->
		<!-- <BottomNavBar ref="bottomNavRef" /> -->
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		reactive,
		onMounted
	} from 'vue'
	import {
		setStorage,
		getStorage,
		removeStorage
	} from '@/utils/storage'
	// import BottomNavBar from '@/components/navBar/bottomNavBar.vue'
	import FilterPopup from '@/components/filterPopup/filterPopup.vue'
	// import { useNavigationBar, toBack } from '@/utils/common.js'
	// const { statusBarHeight, navHeight, navigationBarHeight, initNavigationBar } = useNavigationBar()
	const statusBarHeight = ref(0)
	onLoad(() => {
		const statusBarHeightNew = getStorage('statusBarHeight');
		if (Number(statusBarHeightNew) != 0) {
			statusBarHeight.value = Number(statusBarHeightNew)
		}
	})
	// onLoad(() => {
	// initNavigationBar();
	// })
	const paging = ref(null)
	const styles = {
		background: '#bbb'
	}
	// 搜索相关
	const searchKeyword = ref('')
	const showFilter = ref(false)

	// 分段控制器
	const currentTab = ref(0)
	const tabValues = ref(['所有', '工程类款项', '其他类'])
	//筛选
	const show = ref(false)
	const filterRef = ref(null)

	function openFilter() {
		show.value = true
		// 或 filterRef.value?.open()
	}

	function onConfirm(payload) {
		console.log('筛选结果', payload)
	}

	function onReset() {
		console.log('重置筛选')
	}

	function onEditLocation() {
		console.log('点击修改位置')
	}
	// 订单数据
	const dataList = ref([{
			id: 'QA2019091723123100',
			time: '15分钟前',
			price: '14,500.00',
			interestLevel: 3,
			interestText: '兴趣浓厚',
			customerName: '上海圆通',
			contactName: '李莫凡',
			contactPhone: '13982003346',
			description: '刹车片更换、机油更换、发动机维修发动机维修',
			isApproval: false,
			labelArr: [{
				label: '标签1',
				id: '2313131'
			}, {
				label: '标签2',
				id: '2313131'
			}, {
				label: '标签2',
				id: '2313131'
			}, {
				label: '标签2',
				id: '2313131'
			}, {
				label: '标签2',
				id: '2313131'
			}]
		},
		{
			id: 'QA2019091720312',
			time: '15分钟前',
			price: '14,500.00',
			interestLevel: 3,
			interestText: '兴趣浓厚',
			customerName: '上海圆通',
			contactName: '李莫凡',
			contactPhone: '13982003346',
			description: '刹车片更换、机油更换、发动机维修发动机维修',
			isApproval: false,
			labelArr: [{
				label: '标签1',
				id: '2313131'
			}, {
				label: '标签2',
				id: '2313131'
			}]
		}, {
			id: 'QA20190917212310',
			time: '15分钟前',
			price: '14,500.00',
			interestLevel: 3,
			interestText: '兴趣浓厚',
			customerName: '上海圆通',
			contactName: '李莫凡',
			contactPhone: '13982003346',
			description: '刹车片更换、机油更换、发动机维修发动机维修',
			isApproval: false,
			labelArr: [{
				label: '标签1',
				id: '2313131'
			}, {
				label: '标签2',
				id: '2313131'
			}],
		}, {
			id: 'QA20190917200112312',
			time: '15分钟前',
			price: '14,500.00',
			interestLevel: 3,
			interestText: '兴趣浓厚',
			customerName: '上海圆通',
			contactName: '李莫凡',
			contactPhone: '13982003346',
			description: '刹车片更换、机油更换、发动机维修发动机维修',
			isApproval: true,
			labelArr: [{
				label: '标签1',
				id: '2313131'
			}, {
				label: '标签2',
				id: '2313131'
			}],
		}
	])
	const doSearch = (e) => {
		console.log("搜索----》", e)
		uni.navigateTo({
			url: '/pages/search/index'
		})
	}
	// 分段控制器切换
	const onTabChange = (e) => {
		currentTab.value = e.currentIndex
		console.log('切换到:', tabValues.value[e.currentIndex])
	}

	//分页加载
	// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
	const queryList = (pageNo, pageSize) => {
		console.log("pageNo-->", pageNo, "pageSize---->", pageSize)
		// let cc = pageNo + pageSize
		// 此处请求仅为演示，请替换为自己项目中的请求
		//       request.queryList({ pageNo,pageSize }).then(res => {
		// 	// 将请求结果通过complete传给z-paging处理，同时也代表请求结束，这一行必须调用
		//           paging.value.complete(res.data.list);
		//       }).catch(res => {
		// 	// 如果请求失败写paging.value.complete(false);
		// 	// 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
		// 	// 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
		// 	paging.value.complete(false);
		// })
	}

    const toDetail = (order) => {
		uni.navigateTo({
			url: `/pages/detail/index?id=${order.id}&type=pending`
		})
	}
	onMounted(() => {
		console.log('订单页面加载完成')
	})
</script>

<style lang="scss" scoped>
	::v-deep .uni-easyinput__content {
		background-color: #F2F2F2 !important;
		border: none !important;
		border-radius: 30rpx !important;
	}

	::v-deep .uniui-clear {
		color: #C3CEDF !important;
	}

	::v-deep .uni-navbar__header-btns-left {
		width: 160rpx !important;

	}

	::v-deep .uni-navbar__header-btns-right {
		width: 80rpx !important;
		font-size: 24rpx;
		color: #666666;
		font-family: "Microsoft Ya Hei";
	}

	::v-deep .uni-navbar__header-container {
		display: flex;
		justify-content: flex-end;
		padding: 0 10rpx 0 0 !important;
	}

	::v-deep .uni-popup {
		z-index: 999 !important;
	}

	@media (max-width: 768px) {
		::v-deep .segmented-control__item--text {
			padding-bottom: 12rpx !important;
		}
	}

	.scroller {
		flex: 1;
		background: #f5f5f5
	}

	page {
		// background-color: #f5f5f5;
	}

	.order-page {
		width: 100%;
		min-height: calc(100vh - 100rpx);
		height: 100%;
		background-color: #f8f8f8;
		padding-bottom: 100rpx; // 为底部导航留空间

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
	}

	.nav-bar-top {

		// width: 100%;
		// background: linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 100%);
		// opacity: 1;
		// border-bottom: 12rpx solid #EEEEEE;
		.nav-bar-title {
			// width: 70rpx !important;
			font-size: 32rpx;
			color: #000000;
			font-weight: bold;
			font-family: "Microsoft Ya Hei";
		}

		.nav-input-view {
			max-width: 350rpx;
			height: auto;
			font-size: 24rpx;
			color: #666666;
			font-family: "Microsoft Ya Hei";
			// border: 1rpx solid red;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.search-bar {
				margin-left: 6rpx;
			}
		}
	}

	.info_view {
		display: flex;
		align-items: center;
	}

	::v-deep .uni-navbar--border {
		border-bottom: none;
	}

	::v-deep .uni-navbar__header-btns-left {
		// width: 0 !important;
	}

	::v-deep .uni-navbar__header {
		width: 100%;
		justify-content: center;
		background: linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 100%) !important;
		opacity: 1;
		align-items: center;
	}

	::v-deep .uni-navbar__header-btns {
		margin-right: 10rpx;
	}

	// 搜索区域
	.search-section {
		background-color: #ffffff;
		padding: 10rpx 30rpx;
	}

	.search-bar {
		display: flex;
		align-items: center;
	}

	.search-input {
		flex: 1;
		display: flex;
		align-items: center;
		// background-color: #f8f8f8;
		overflow: hidden;
		border-radius: 8rpx;
		// padding: 16rpx 20rpx;

		.search-icon {
			font-size: 28rpx;
			margin-right: 12rpx;
			color: #999;
		}

		.input-field {
			flex: 1;
			font-size: 28rpx;
			color: #333;
			background: transparent;
			border: none;
			outline: none;

			&::placeholder {
				color: #999;
			}
		}
	}

	.filter-dropdown {
		display: flex;
		align-items: center;
		padding: 16rpx 20rpx;
		border-radius: 8rpx;

		.filter-text {
			font-size: 28rpx;
			color: #333;
			margin-right: 8rpx;
		}

		.dropdown-arrow {
			font-size: 20rpx;
			color: #999;
		}
	}

	// 分段控制器区域
	.segmented-section {
		background-color: #ffffff;
		padding: 4px 30rpx -2rpx;
		border-bottom: 1rpx solid #dddddd;
	}

	.custom-segmented {
		:deep(.segmented-control) {
			height: 60rpx;
		}

		:deep(.segmented-control__item) {
			padding: 0 20rpx;
		}

		:deep(.segmented-control__text) {
			font-size: 28rpx;
			font-weight: 500;
		}

		:deep(.segmented-control__item--text) {
			border-bottom-width: 4rpx;
			padding-bottom: 8rpx;
		}
	}

	// 订单列表
	.order-list {
		padding: 30rpx 0rpx;
	}

	.order-card {
		background-color: #ffffff;
		// border-radius: 25rpx;
		padding: 30rpx;
		// margin-bottom: 20rpx;
		margin: 0 30rpx 30rpx;
		border-radius: 25rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	}

	.order-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;

		.order-id {
			width: calc(100% - 130rpx);
			font-size: 32rpx;
			color: #000000;
			font-weight: bold;
			font-family: "Microsoft Ya Hei";
			overflow-x: auto;
		}

		.order-time {
			display: flex;
			align-items: center;

			.time-text {
				font-size: 24rpx;
				color: #999999;
				font-family: "Microsoft Ya Hei";
				text-align: right;
			}
		}
	}

	.order-content {
		position: relative;
		z-index: 9;

		.quote-section {
			display: flex;
			// align-items: center;
			margin-bottom: 8rpx;

			.quote-label {
				font-size: 24rpx;
				color: #000000;
				font-family: "Microsoft Ya Hei";
				white-space: nowrap;
				margin-right: 12rpx;
			}

			.quote-price {
				font-size: 24rpx;
				font-family: "Microsoft Ya Hei";
				color: #007aff;
			}

			.description-text {
				font-size: 24rpx;
				color: #666666;
				font-family: "Microsoft Ya Hei";
				line-height: 1.4;

			}
		}



		.label-view {
			position: absolute;
			z-index: 19;
			top: 0;
			right: 0;
			min-width: 200rpx;
			max-width: 250rpx;
			max-height: 80rpx;
			overflow: hidden;
			display: flex;
			/* 弹性布局 */
			flex-wrap: wrap;
			/* 自动换行 */
			justify-content: flex-end;
			/* 每行内容靠右 */
			gap: 6px;

			.label-item {
				max-width: 90rpx;
				min-width: 10rpx;
				white-space: nowrap;
				height: 30rpx;
				border: 1rpx solid #99ccff;
				border-radius: 25rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 20rpx;

				.point-icon {
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					background: #88aff8;
					margin-right: 10rpx;

				}

				.label-text {
					font-size: 16rpx;
					color: #3e65f6;
					font-family: "Microsoft Ya Hei";
				}
			}
		}

		.approved-view {
			width: 134rpx;
			height: 116rpx;
			position: absolute;
			z-index: 29;
			top: -50rpx;
			right: 6rpx;
			
		}

	}

	// PC端适配
	@media screen and (min-width: 768px) {
		.order-page {
			max-width: 768rpx;
			margin: 0 auto;
		}
	}
</style>