<template>
	<view class="order-page">
		<view class="header-stickt">
			<view class="status_bar" :style="{height: `${statusBarHeight*2}rpx`}"></view>
			<uni-nav-bar class="nav-bar-top">
				<template v-slot:left>
					<view class="nav-bar-title">
						已办流程
					</view>
				</template>
				<!-- <view class="" style="width: 30%;">待办流程</view>
				<view class="title" style="width: 55%;text-align: center;font-size: 36rpx;
			                font-family: PingFang SC-Heavy, PingFang SC;
			                font-weight: 800;
			                color: #333333;">待办流程</view>
				<view slot="right" class="" style="width: 15%;text-align: end;">
				</view> -->
				<view class="nav-input-view" @click="focusInput">
					<!-- <uni-icons class="input-uni-icon" type="search" size="12" color="#999" /> -->
					<image class="input-seach" src="../../static/images/search.svg" mode=""  @click.stop="doSearch"></image>
					<input  ref="searchInput"  class="input-view" placeholder="搜索" type="text"  v-model="searchKeyword"  @input="onSearchInput" confirm-type="search" @confirm="doSearch" @keyup.enter="doSearch"/>
				</view>
				<template v-slot:right>
					<view @click="openFilter" class="nav-bar-filter"> 筛选 </view>
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
				<!-- <uni-segmented-control :current="currentTab" :values="tabValues" :activeColor="'#3e65f6'"
					:inActiveColor="'#cccccc'" :styleType="'text'" @clickItem="onTabChange" class="custom-segmented" /> -->
				<view class="segmented-section-item" v-for="(item,index) in tabValues" :key="index"
					@click="onTabChange(index)">
					<text class="section-item-0" style="height: 0;"></text>
					<view class="section-item-1" :class="{'section-item-1-active':index === currentTab}">
						{{item}}
						<text :class="{'msg':msgFlag.includes(index)}"></text>
					</view>
					<text class="section-item-0" :class="{'section-item-0-active':index === currentTab}"></text>
				</view>
			</view>
		</view>
		<!-- 订单列表 -->
		<view class="order-list" :style="{height: orderListHeight}">
			<z-paging ref="paging" v-model="dataList" @onRefresh="onRefresh" @query="queryList" :fixed="false">
				<view style="height: 30rpx;"></view>
				<view class="order-card" v-for="order in dataList " :key="order.id" @click="toDetail(order)">
					<view class="approved-view" v-show="order?.isApproval">
						<image src="../../static/images/approved.png" mode="" style="width: 100%;height: 100%;"></image>
					</view>
					<view class="order-header">
						<text class="order-id">{{ order.id }}</text>
						<view class="order-time">
							<text class="time-text">{{ order.time }}</text>
						</view>
					</view>
					<view class="order-content">
						<view class="quote-section">
							<text class="quote-label">申请费用：</text>
							<text class="quote-price">¥{{ order.price }}</text>
						</view>
						<view class="quote-section">
							<text class="quote-label">申请单位：</text>
							<text class="description-text">{{ order.applicant }} | {{ order.customerName }}</text>
						</view>
						<view class="quote-section">
							<text class="quote-label">关键信息：</text>
							<text class="description-text">{{ order.keyInformation }}</text>
						</view>
						<view class="quote-section">
							<text class="quote-label">业务摘要：</text>
							<text class="description-text">{{ order.description }}</text>
						</view>
						<view class="label-view">
							<view class="label-item" v-for="(item,index) in (order?.labelArr || [])" :key="index">
								<text class="point-icon"></text><text class="label-text">{{item.label}}</text>
							</view>
						</view>

					</view>
				</view>
			</z-paging>
		</view>
		
		<FilterPopup ref="filterRef" v-model="show" :confirmCount="1400" @confirm="onConfirm" @reset="onReset" />
		
		<!-- 底部导航栏 -->
		<BottomNavBar ref="bottomNavRef" :modelValueFlag="2"/>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		ref,
		reactive,
		onMounted,
		nextTick,
		getCurrentInstance
	} from 'vue'
	import {
		setStorage,
		getStorage,
		removeStorage
	} from '@/utils/storage'
	import BottomNavBar from '@/components/navBar/bottomNavBar.vue'
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
	const searchInput = ref(null)

	// 点击边框区域让input获取焦点
	const focusInput = () => {
		nextTick(() => {
			console.log('searchInput', searchInput.value)
			if (searchInput.value) {
				searchInput.value.focus()
			}
		})
	}

	// 搜索输入处理
	const onSearchInput = (e) => {
		searchKeyword.value = e.detail.value
		console.log('搜索关键词:', searchKeyword.value)
		// 可以在这里添加实时搜索逻辑
	}

	const showFilter = ref(false)
	const msgFlag = ref([0, 1, 2])
	// 分段控制器
	const currentTab = ref(0)
	const tabValues = ref(['所有', '流转中', '已审核'])
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
			price: '10,400,500.00',
			customerName: '张三',
			applicant: '第一事业部',
			contactPhone: '13982003346',
			description: '本期支付中：支付农民工工资专户10000000元，基本户9943492元。',
			keyInformation: '外环西段交通功能提升工程，土建施工3标段（主线）',
			isApproval: true,
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
			id: 'QA2019091723123100',
			time: '15分钟前',
			price: '10,400,500.00',
			customerName: '张三',
			applicant: '第一事业部',
			contactPhone: '13982003346',
			description: '本期支付中：支付农民工工资专户10000000元，基本户9943492元。',
			keyInformation: '外环西段交通功能提升工程，土建施工3标段（主线）',
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
		}, {
			id: 'QA20190917212310',
			time: '15分钟前',
			price: '10,400,500.00',
			customerName: '张三',
			applicant: '第一事业部',
			contactPhone: '13982003346',
			description: '本期支付中：支付农民工工资专户10000000元，基本户9943492元。',
			keyInformation: '外环西段交通功能提升工程，土建施工3标段（主线）',
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
			price: '10,400,500.00',
			customerName: '张三',
			applicant: '第一事业部',
			contactPhone: '13982003346',
			description: '本期支付中：支付农民工工资专户10000000元，基本户9943492元。',
			keyInformation: '外环西段交通功能提升工程，土建施工3标段（主线）',
			isApproval: false,
			labelArr: [{
				label: '标签1',
				id: '2313131'
			}, {
				label: '标签2',
				id: '2313131'
			}],
		}
	])
	const doSearch = () => {
		if (!searchKeyword.value?.trim()) {
			uni.showToast({ title: '请输入搜索关键词', icon: 'none' })
			return
		}
		uni.hideKeyboard()
		// 真正搜索逻辑：刷新列表或跳转搜索页
		// 例1：刷新当前列表
		onRefresh();
	}
	// 分段控制器切换
	const onTabChange = (val) => {
		currentTab.value = val
		onRefresh()
		// if(msgFlag.value == val){
		// 	setTimeout(()=>{
		// 		msgFlag.value = -1
		// 	},100)
		// }
		// 1. 找到索引
		const idx = msgFlag.value.indexOf(val);
		// 2. 有就删
		if (idx !== -1) msgFlag.value.splice(idx, 1);
		console.log('切换到:', tabValues.value[val])
	}

	const onRefresh =() => {
		// 告知z-paging下拉刷新结束，这样才可以开始下一次的下拉刷新
		setTimeout(() => {
			// 1.5秒之后停止刷新动画
			paging.value.complete();
			paging.value.reload()
		}, 10)
	}
	//分页加载
	// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
	const queryList = (pageNo, pageSize) => {
		console.log("pageNo-->", pageNo, "pageSize---->", pageSize)
		paging.value.complete(dataList.value);
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
	const orderListHeight = ref('')

	const computeOrderListHeight = () => {
		try {
			const {
				windowHeight
			} = uni.getSystemInfoSync() // px
			const inst = getCurrentInstance()
			const q = uni.createSelectorQuery().in(inst?.proxy)
			q.select('.header-stickt').boundingClientRect(rect => {
				const headerH = rect?.height || 0
				const h = Math.max(0, windowHeight - headerH)
				orderListHeight.value = `${h}px`
			}).exec()
		} catch (e) {
			// 兜底，避免阻塞页面
			orderListHeight.value = 'calc(100vh - 100rpx)'
		}
	}
	onMounted(() => {
		console.log('订单页面加载完成')
		nextTick(() => computeOrderListHeight())
		// 横竖屏切换/窗口改变时重算（H5 有效）
		uni.onWindowResize?.(() => computeOrderListHeight())
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
		min-width: 180rpx !important;
	}

	::v-deep .uni-navbar__header-btns-right {
		width: 112rpx !important;
		margin-right: 0 !important;
	}

	::v-deep .uni-navbar__header-container {
		display: flex;
		justify-content: flex-end;
		padding: 0 !important;
	}

	::v-deep .uni-popup {
		z-index: 999 !important;
	}

	::v-deep .uni-navbar__header {
		height: 50px !important;
		padding: 0 !important;
	}

	// ::v-deep .z-paging-content-fixed {
	// 	top: 85px !important;
	// }
	
	@media (min-aspect-ratio: 13/20) {
	  ::v-deep .uni-tabbar-bottom {
		display: none !important;
		height: 0 !important;
	  }
	  ::v-deep .bottom-nav-bar{
		  display: none !important;
		  height: 0 !important;
	  }
	}
	
	.scroller {
		flex: 1;
		background: #f5f5f5
	}

	page {
		background: #f3f7ff;
	}

	.order-page {
		width: 100%;
		height: auto;
		background: #f3f7ff;
		// padding-bottom: 100rpx; // 为底部导航留空间

		.header-stickt {
			position: sticky;
			z-index: 99;
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
		// height: 100rpx;

		.nav-bar-title {
			width: 100%;
			font-size: 32rpx;
			color: #000;
			font-weight: bold;
			margin-left: 32rpx !important;
		}

		.nav-input-view {
			box-sizing: border-box;
			width: 324rpx;
			height: 66rpx;
			border-radius: 32rpx;
			font-size: 24rpx;
			color: #666;
			border: 2rpx solid #eee;
			display: flex;

			align-items: center;

			.input-seach {
				width: 24rpx;
				height: 24rpx;
				margin: 0 24rpx 0 32rpx;
			}

			.input-view {
				flex: 1;
				// margin-left: 80rpx;
				margin-right: 12rpx;
				font-size: 24rpx;
				color: #666;

			}
		}

		.nav-bar-filter {
			box-sizing: border-box;
			display: flex;
			padding: 0 32rpx;
			font-size: 24rpx;
			color: #666;
			align-items: center;
			justify-content: center;
			white-space: nowrap;
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
		// margin-right: 10rpx;
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
		overflow: hidden;
		border-radius: 8rpx;

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
		box-sizing: border-box;
		background-color: #ffffff;
		// padding: 4px 30rpx -2rpx;
		border-bottom: 1rpx solid #eee;
		display: flex;
		justify-content: space-around;
		height: 62rpx;

		.segmented-section-item {
			display: flex;
			flex-direction: column;
			flex: 1;
			justify-content: space-between;
			align-items: center;

			.section-item-0 {
				box-sizing: border-box;
				width: 60rpx;
				height: 6rpx;

				&.section-item-0-active {
					background: #3e65f6;
				}
			}

			.section-item-1 {
				position: relative;
				font-size: 24rpx;

				.msg {
					display: block;
					width: 6px;
					height: 6px;
					background: red;
					border-radius: 3px;
					position: absolute;
					right: -16px;
					top: -12rpx;
				}

				&.section-item-1-active {
					color: #3e65f6;
				}
			}

		}
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
		// padding: 0 0rpx;
	}

	.order-card {
		box-sizing: border-box;
		background-color: #ffffff;
		padding: 32rpx;
		// margin: 0 30rpx 30rpx;
		width: 90%;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 32rpx;
		border-radius: 24rpx;
		position: relative;
		z-index: 19;

		.approved-view {
			width: 160rpx;
			height: 128rpx;
			position: absolute;
			z-index: 29;
			top: 40rpx;
			right: 80rpx;
		}
	}

	.order-header {
		box-sizing: border-box;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.order-id {
			width: calc(100% - 130rpx);
			font-size: 32rpx;
			color: #000000;
			font-weight: bold;
			overflow-x: auto;
		}

		.order-time {
			display: flex;
			align-items: center;

			.time-text {
				font-size: 24rpx;
				color: #999;
				text-align: right;
			}
		}
	}

	.order-content {
		position: relative;
		z-index: 9;

		.quote-section {
			box-sizing: border-box;
			min-height: 40rpx;
			line-height: 40rpx;
			display: flex;
			padding: 8rpx 0;

			.quote-label {
				font-size: 24rpx;
				color: #000;
				white-space: nowrap;
				width: 120rpx;
				line-height: 40rpx;
			}

			.quote-price {
				font-size: 24rpx;
				color: #3e65f6;
				font-weight: bold;
				line-height: 40rpx;
				margin-left: 8rpx;
			}

			.description-text {
				font-size: 24rpx;
				color: #666;
				line-height: 40rpx;
				margin-left: 8rpx;

			}
		}



		.label-view {
			position: absolute;
			z-index: 19;
			top: 8rpx;
			right: 0;
			min-width: 200rpx;
			max-width: 270rpx;
			max-height: 100rpx;
			overflow: hidden;
			display: flex;
			/* 弹性布局 */
			flex-wrap: wrap;
			/* 自动换行 */
			justify-content: flex-end;
			/* 每行内容靠右 */
			gap: 8px;

			.label-item {
				max-width: 110rpx;
				min-width: 10rpx;
				white-space: nowrap;
				height: 36rpx;
				border: 2rpx #88afff solid;
				border-radius: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 16rpx;

				.point-icon {
					width: 12rpx;
					height: 12rpx;
					border-radius: 50%;
					background: #88afff;
					margin-right: 16rpx;

				}

				.label-text {
					font-size: 24rpx;
					color: #3e65f6;
				}
			}
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