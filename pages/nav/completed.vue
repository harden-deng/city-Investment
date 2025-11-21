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
				<view class="nav-input-view">
					<!-- <uni-icons class="input-uni-icon" type="search" size="12" color="#999" /> -->
					<image class="input-seach" src="../../static/images/search.svg" mode=""  @click.stop="doSearch"></image>
					<input :adjust-position="false"   :hold-keyboard="true"    class="input-view" placeholder="搜索" type="text"  v-model="searchKeyword" confirm-type="search" @confirm="doSearch" @keyup.enter="doSearch"/>
				</view>
				<template v-slot:right>
					<view @click="openFilter" class="nav-bar-filter"> 筛选 </view>
				</template>
			</uni-nav-bar>
			<!-- 分段控制器 -->
			<view class="segmented-section">
				<view class="segmented-section-item" v-for="(item,index) in tabValues" :key="index"
					@click="onTabChange(index)">
					<text class="section-item-0" style="height: 0;"></text>
					<view class="section-item-1" :class="{'section-item-1-active':index === currentTab}">
						{{item}}
						<!-- <text :class="{'msg':msgFlag.includes(index)}"></text> -->
					</view>
					<text class="section-item-0" :class="{'section-item-0-active':index === currentTab}"></text>
				</view>
			</view>
		</view>
		<!-- 订单列表 -->
		<view class="order-list">
			<z-paging ref="paging" v-model="dataList" @onRefresh="onRefreshWatch" @query="queryList" :fixed="false">
				<view style="height: 30rpx;"></view>
				<view class="order-card" v-for="order in dataList " :key="order.id || order.requestFormNo" @click="toDetail(order)">
					<view class="approved-view" v-show="order?.wfStatus === 'Completed'">
					</view>
					<view class="order-header">
						<text class="order-id">{{ order.requestFormNo }}</text>
						<view class="order-time">
							<text class="time-text">{{ formatRelativeTime(order.submittedDate) }}</text>
						</view>
					</view>
					<view class="order-content">
						<view class="quote-section">
							<text class="quote-label">申请费用：</text>
							<text class="quote-price">¥{{ formatNumber(order.planToPayTotal) || '--' }}</text>
						</view>
						<view class="quote-section">
							<text class="quote-label">申请单位：</text>
							<text class="description-text">{{ order.procDefName }} | {{ order.submittedByName }}</text>
						</view>
						<view class="quote-section">
							<text class="quote-label">关键信息：</text>
							<text class="description-text">{{ order.taskName}}</text>
						</view>
						<view class="quote-section">
							<text class="quote-label">业务摘要：</text>
							<text class="description-text">{{ order.stepName }}</text>
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
		<FilterPopup ref="filterRef" @confirm="onConfirm" @reset="onReset" />
		<!-- 底部导航栏 -->
		<!-- <BottomNavBar ref="bottomNavRef" :modelValueFlag="2"/> -->
	</view>
</template>

<script setup>
	import {
		onLoad,
		onUnload,
	} from '@dcloudio/uni-app'
	import {
		ref,
	} from 'vue'
	import http from '@/utils/request.js'
	import {
		procDefCodeUrlObj,
	} from '@/utils/definitions'
	import { formatNumber,formatRelativeTime } from '@/utils/h5Bribge.js'
	import { useListHeight } from '@/utils/useListHeight.js'
	// import BottomNavBar from '@/components/navBar/bottomNavBar.vue'
	import FilterPopup from '@/components/filterPopup/filterPopup.vue'
	const statusBarHeight = ref(0)
	onLoad(() => {
		uni.$on('refresh-completed', () => {
			onRefresh()
		})
	})
	onUnload(() => {
       uni.$off("refresh-completed");
    });
	const { listHeight } = useListHeight({
	     headerSelector: '.header-stickt', // 可选，默认就是这个值
	});
	const paging = ref(null)
	// 搜索相关
	const searchKeyword = ref('')
	// 分段控制器
	const currentTab = ref(0)
	const tabs = [
		{ label: '所有', wf: '' },
		{ label: '流转中', wf: 'Running' },
		{ label: '已审核', wf: 'Completed' },
	];
	const wfstatusArr = ref(tabs.map(t => t.wf));
	const tabValues = ref(tabs.map(t => t.label));
	//弹窗筛选--------start
	const filterRef = ref(null)

	function openFilter() {
		filterRef.value?.open()
	}

	function onConfirm(payload) {
		console.log('筛选结果', payload)
	}

	function onReset() {
		console.log('重置筛选')
	}
    //弹窗筛选------end
	const doSearch = () => {
		// if (!searchKeyword.value?.trim()) {
		// 	uni.showToast({ title: '请输入搜索关键词', icon: 'none' })
		// 	return
		// }
		uni.hideKeyboard()
		// 真正搜索逻辑：刷新列表或跳转搜索页
		// 例1：刷新当前列表
		onRefresh();
	}
	// 分段控制器切换
	const onTabChange = (val) => {
		currentTab.value = val
		onRefresh()
		// 1. 找到索引
		// const idx = msgFlag.value.indexOf(val);
		// 2. 有就删
		// if (idx !== -1) msgFlag.value.splice(idx, 1);
		console.log('切换到:', tabValues.value[val])
	}

	const onRefresh =() => {
		// 告知z-paging下拉刷新结束，这样才可以开始下一次的下拉刷新
		paging.value.reload()
	}
	const onRefreshWatch =() => {
		// 告知z-paging下拉刷新结束，这样才可以开始下一次的下拉刷新
		console.log('下拉刷新触发')
	}
	// 订单数据--------start
	const dataList = ref([])
	//分页加载--------start
	// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
	const queryList = (pageNo, pageSize) => {
		http.get('/WF/GetInvolvedProcess', {
			Page: pageNo,
			Limit: pageSize,
			Wfstatus: wfstatusArr.value[currentTab.value],
			RequestFormNo: searchKeyword.value
		}).then(res => {
			paging.value.complete(res.data.data || [])
		}).catch(() => {
			paging.value.complete(false)
			uni.showToast({ title: '加载失败', icon: 'none' });
		})
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
	//分页加载--------end

	const toDetail = (order) => {
		uni.navigateTo({
			url: procDefCodeUrlObj[order.procDefCode],
			success(res) {
				res.eventChannel.emit('open-detail', {
				   type: 'completed',
				   order: order // 也可直接传整条数据
				})
			}
		})
	}
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
	//   ::v-deep .uni-tabbar-bottom {
	// 	display: none !important;
	// 	height: 0 !important;
	//   }
	  ::v-deep .bottom-nav-bar{
		  display: none !important;
		  height: 0 !important;
	  }
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



	::v-deep .uni-navbar__header {
		width: 100%;
		justify-content: center;
		background: linear-gradient(90deg, #FFFFFF 0%, #FFFFFF 100%) !important;
		opacity: 1;
		align-items: center;
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

	// 订单列表
	.order-list {
		// padding: 0 0rpx;
		box-sizing: border-box;
		height: v-bind(listHeight);
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
			background-image: url('../../static/images/approved.png');
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
			background-color: transparent;
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
			white-space: normal;
			word-break: break-all;
			overflow-wrap: break-word;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
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