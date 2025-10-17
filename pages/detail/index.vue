<template>
	<view class="detail-page">
		<view class="header-stickt">
			<view class="status_bar" :style="{ height: `${statusBarHeight * 2}rpx` }"></view>
			<uni-nav-bar class="nav-bar-top">
				<template v-slot:left>
					<view class="back-btn" @click="goBack">
						<!-- <uni-icons type="back" color="#000" size="22" /> -->
						<!-- <image src="../../static/images/back.svg" mode=""></image> -->
					</view>
				</template>
				<view class="nav-title">审批详情</view>
				<template v-slot:right>
					<view style="width: 40rpx"></view>
				</template>
			</uni-nav-bar>
			<!-- 顶部蓝卡片 -->
			<view class="hero-card">
				<view class="hero-header">
					<view class="project-name">
						<view class="project-name-1">
							{{ detail.projectName }}
						</view>
						<view class="project-name-1">
							勘察设计1标
						</view>
					</view>
					<view class="amount-box">
						<view class="amount-label">申请支付总金额</view>
						<view class="amount-value"><text class="amount-value-symbol">¥</text><text
								class="amount-value-number">
								{{ detail.amount }}</text></view>
					</view>
				</view>
				<view class="hero-tags">
					<view class="tag" v-for="(t, i) in detail.stageTags" :key="i">{{ t }}</view>
				</view>
				<view class="hero-actions">
					<view class="btn outline" @click="onReject">打回</view>
					<view class="btn primary" @click="onApprove">通过</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroller" :style="{ height: scrollerHeight }">
			<!-- 顶部蓝卡片 -->
			<!-- <view class="hero-card">
                <view class="hero-header">
                    <view class="project-name">
                        {{ detail.projectName }} <br />
                        勘察设计1标 <br />
                    </view>
                    <view class="amount-box">
                        <view class="amount-label">申请支付总金额</view>
                        <view class="amount-value"><text class="amount-value-symbol">¥</text><text
                                class="amount-value-number">
                                {{ detail.amount }}</text></view>
                    </view>
                </view>
                <view class="hero-tags">
                    <view class="tag" v-for="(t, i) in detail.stageTags" :key="i">{{ t }}</view>
                </view>
                <view class="hero-actions">
                    <view class="btn outline" @click="onReject">打回</view>
                    <view class="btn primary" @click="onApprove">通过</view>
                </view>
            </view> -->
			<!-- 基本信息 -->
			<view class="section">
				<view class="section-title">
					<text class="section-title-vertical"></text>
					<text class="section-title-text">基本信息</text>
				</view>
				<view class="info-list">
					<view class="info-item" v-for="(row, idx) in infoRows" :key="idx">
						<text class="info-label">{{ row.label }}</text>
						<text class="info-value">{{ row.value || '--' }}</text>
					</view>
				</view>
			</view>

			<!-- 用款情况 -->
			<view class="section">
				<view class="section-title-2">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">用款情况</text>
					</view>
					<!-- <image class="section-title-2-right" src="../../static/images/c2.png" mode="scaleToFill"
						style=" width: 28rpx;height: 16rpx;" /> -->
					<view class="section-title-2-right" @click="setOptions(FUND_USAGE_STATUS)" :class="{ 'active': getOptions(FUND_USAGE_STATUS) }">

					</view>
				</view>
				<view class="usage-details" v-if="getOptions(FUND_USAGE_STATUS)">
					<!-- 整体合同 -->
					<view class="contract-section">
						<view class="contract-header">
							整体合同
						</view>
						<view class="contract-details">
							<view class="detail-row">
								<text class="detail-label">合同价/审定价</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
							<view class="detail-row">
								<text class="detail-label">累计付款 含本次</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
							<view class="detail-row">
								<text class="detail-label">累计付款 不含本次</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
						</view>
						<view class="contract-header">
							其中XXXXXXX
						</view>
						<view class="contract-details">
							<view class="detail-row">
								<text class="detail-label">合同价/审定价</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
							<view class="detail-row">
								<text class="detail-label">累计付款 含本次</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
							<view class="detail-row">
								<text class="detail-label">累计付款 不含本次</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
						</view>
					</view>
					<!-- 其他信息 -->
					<view class="other-info">
						<view class="detail-row">
							<text class="detail-label">验工计价年月</text>
							<text class="detail-value">2025年8月</text>
						</view>
						<view class="detail-row">
							<text class="detail-label">验工计价期数</text>
							<text class="detail-value">第13期</text>
						</view>
						<view class="detail-row">
							<text class="detail-label">对应工作量</text>
							<text class="detail-value">32,000,000.00</text>
						</view>
					</view>
					<!-- 整体合同 -->
					<view class="contract-section">
						<!-- 用款性质 -->
						<view class="contract-header">
							用款性质
						</view>
						<view class="contract-details">
							<view class="detail-row">
								<text class="detail-label">工程费用</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
							<view class="detail-row">
								<text class="detail-label">农民工工资</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
						</view>
						<!-- 款项类型 -->
						<view class="contract-header">
							款项类型
						</view>
						<view class="contract-details">
							<view class="detail-row">
								<text class="detail-label">工程费用</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
							<view class="detail-row">
								<text class="detail-label">农民工工资</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
							<view class="detail-row">
								<text class="detail-label">材料款</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
							<view class="detail-row">
								<text class="detail-label">前期费用</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
							<view class="detail-row">
								<text class="detail-label">其他</text>
								<text class="detail-value">10,000,000.00</text>
							</view>
							<view class="detail-row summary-row">
								<text class="detail-label summary-label">本次用款小计</text>
								<text class="detail-value summary-value">10,000,000.00</text>
							</view>
						</view>
					</view>
					<!-- 支付渠道 -->
					<view class="payment-channel-section">
						<view class="payment-table">
							<view class="payment-header">
								<text class="payment-header-cell payment-header-cell-left">支付渠道</text>
								<text class="payment-header-cell amount-header">总金额</text>
							</view>

							<!-- 城投拨付资金 -->
							<view class="payment-category">
								<view class="payment-category-header">
									<text class="payment-category-name">城投拨付资金</text>
								</view>

								<view class="payment-items">
									<view class="payment-item-row">
										<text class="payment-item-name">市财力</text>
										<text class="payment-item-amount">10,000,000.00</text>
									</view>
									<view class="payment-item-row">
										<text class="payment-item-name">土地出让金</text>
										<text class="payment-item-amount">10,000,000.00</text>
									</view>
									<view class="payment-item-row">
										<text class="payment-item-name">专项债</text>
										<text class="payment-item-amount">10,000,000.00</text>
									</view>
									<view class="payment-item-row">
										<text class="payment-item-name">城投其他资金</text>
										<text class="payment-item-amount">10,000,000.00</text>
									</view>
									<view class="payment-item-row">
										<text class="payment-item-name">资本金</text>
										<text class="payment-item-amount">10,000,000.00</text>
									</view>
								</view>
							</view>

							<!-- 非城投拨付资金 -->
							<view class="payment-category">
								<view class="payment-category-header">
									<text class="payment-category-name">非城投拨付资金</text>
								</view>
								<view class="payment-items">
									<view class="payment-item-row">
										<text class="payment-item-name">市级财力</text>
										<text class="payment-item-amount">10,000,000.00</text>
									</view>
									<view class="payment-item-row">
										<text class="payment-item-name">区县财力</text>
										<text class="payment-item-amount">10,000,000.00</text>
									</view>
									<view class="payment-item-row">
										<text class="payment-item-name">自筹资金</text>
										<text class="payment-item-amount">10,000,000.00</text>
									</view>
									<view class="payment-item-row">
										<text class="payment-item-name">其他</text>
										<text class="payment-item-amount">10,000,000.00</text>
									</view>
								</view>
							</view>

							<!-- 直拨(无资金流入) -->
							<view class="payment-category">
								<view class="payment-category-header">
									<text class="payment-category-name">直拨(无资金流入)</text>
								</view>
								<view class="payment-items">
									<view class="payment-item-row">
										<text class="payment-item-name">交通专项</text>
										<text class="payment-item-amount">10,000,000.00</text>
									</view>
									<view class="payment-item-row">
										<text class="payment-item-name">超长期国债</text>
										<text class="payment-item-amount">10,000,000.00</text>
									</view>
									<view class="payment-item-row">
										<text class="payment-item-name">其他</text>
										<text class="payment-item-amount">10,000,000.00</text>
									</view>
								</view>
							</view>

							<!-- 开具银票(无资金流出) -->
							<!-- <view class="payment-category">
                                <view class="payment-item-row">
                                    <text class="payment-item-name">开具银票(无资金流出)</text>
                                    <text class="payment-item-amount">10,000,000.00</text>
                                </view>
                            </view> -->
							<view class="payment-footer">
								<text class="payment-footer-cell payment-footer-cell-left">开具银票(无资金流出)</text>
								<text class="payment-footer-cell amount-footer">10,000,000.00</text>
							</view>
						</view>
					</view>

				</view>
			</view>

			<!-- 付款账户信息 -->
			<view class="section">
				<view class="section-title-2">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">付款账户信息</text>
					</view>
					<view class="section-title-2-right" @click="setOptions(PAYMENT_ACCOUNT_INFORMATION)" :class="{ 'active': getOptions(PAYMENT_ACCOUNT_INFORMATION) }">

                     </view>
				</view>
				<!-- 付款账户信息卡片 -->
				<view class="account-info-section" v-if="getOptions(PAYMENT_ACCOUNT_INFORMATION)">
					<view style="height: 10rpx;"></view>
					<!-- 第一个公司账户信息 -->
					<view class="account-card">
						<view class="account-company-title">上海黄浦江越江设施投资建设发展有限公司</view>
						<view class="account-info-block">
							<view class="account-info-row">
								<text class="account-info-label">付款银行(资金)</text>
								<text class="account-info-value">上海市建设银行第三支行</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">付款账号(资金)</text>
								<text class="account-info-value">3214048327643244432</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">付款银行(银票)</text>
								<text class="account-info-value">--</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">付款账号(银票)</text>
								<text class="account-info-value">--</text>
							</view>
						</view>
					</view>

					<!-- 第二个公司账户信息 -->
					<view class="account-card">
						<view class="account-company-title">浙江越江设施投资建设发展有限公司</view>
						<view class="account-info-block">
							<view class="account-info-row">
								<text class="account-info-label">付款银行(资金)</text>
								<text class="account-info-value">上海市建设银行第三支行</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">付款账号(资金)</text>
								<text class="account-info-value">3214048327643244432</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">付款银行(银票)</text>
								<text class="account-info-value">--</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">付款账号(银票)</text>
								<text class="account-info-value">--</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 付款账户信息 -->
			<view class="section">
				<view class="section-title-2">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">收款账户信息</text>
					</view>
					<view class="section-title-2-right" @click="setOptions(COLLECTION_ACCOUNT_INFORMATION)" :class="{ 'active': getOptions(COLLECTION_ACCOUNT_INFORMATION) }">
                    </view>
				</view>
				<!-- 付款账户信息卡片 -->
				<view class="account-info-section" v-if="getOptions(COLLECTION_ACCOUNT_INFORMATION)">
					<view style="height: 10rpx;"></view>
					<!-- 第一个公司账户信息 -->
					<view class="account-card">
						<view class="account-company-title">农民工工资</view>
						<view class="account-info-block">
							<view class="account-info-row">
								<text class="account-info-label">收款单位</text>
								<text class="account-info-value">上海城建市政工程(集团)有限公司 (农)</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">开户行</text>
								<text class="account-info-value">上海市建设银行第三支行</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">账号</text>
								<text class="account-info-value">3214048327643244432</text>
							</view>
						</view>
					</view>

					<!-- 第二个公司账户信息 -->
					<view class="account-card">
						<view class="account-company-title">材料款、其他工程款</view>
						<view class="account-info-block">
							<view class="account-info-row">
								<text class="account-info-label">收款单位</text>
								<text class="account-info-value">上海城建市政工程(集团)有限公司 (农)</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">开户行</text>
								<text class="account-info-value">上海市建设银行第三支行</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">帐号</text>
								<text class="account-info-value">3214048327643244432</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<InputDialog ref="inputDialogRef" v-model="inputDialogVisible" :title="inputDialogTitle" :placeholder="inputDialogPlaceholder" @confirm="handleInputConfirm" @cancel="handleInputCancel"></InputDialog>
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
			getStorage
		} from '@/utils/storage'
	import {
		FUND_USAGE_STATUS,
		PAYMENT_ACCOUNT_INFORMATION,
		COLLECTION_ACCOUNT_INFORMATION
	} from '@/utils/definitions'
	import InputDialog from '@/components/inputDialog/inputDialog.vue'
	const statusBarHeight = ref(0)
	onLoad(() => {
		const h = getStorage('statusBarHeight')
		if (Number(h)) statusBarHeight.value = Number(h)
	})
	const inputDialogVisible = ref(false)
	const inputDialogTitle = ref('')
	const inputDialogPlaceholder = ref('')
	const inputDialogValue = ref('')
	const scrollerHeight = ref('0px')
	const detail = ref({
		projectName: '军工路快速路新建工程(政府性)',
		amount: '3,200,000.00',
		stageTags: ['勘察设计招标', '第一审批', '过程款'],
	})

	const pullDownObj = reactive({
		[FUND_USAGE_STATUS]: true,
		[PAYMENT_ACCOUNT_INFORMATION]: true,
		[COLLECTION_ACCOUNT_INFORMATION]: true,
	})
	const setOptions = (name) => {
        pullDownObj[name] = pullDownObj[name] ? false : true
    }

    const getOptions = (name) => {
        return pullDownObj[name]
    }
	

	const infoRows = ref([{
			label: '项目名称',
			value: '军工路快速路新建工程'
		},
		{
			label: '项目阶段/预算事项',
			value: '军工路快速路2标'
		},
		{
			label: '付款单位',
			value: '上海黄浦江越江设施投资建设发展有限公司'
		},
		{
			label: '合同名称',
			value: '军工路-JAF-SG-2017-002'
		},
		{
			label: '收款单位',
			value: '上海城建市政工程(集团)有限公司'
		},
		{
			label: '具体事项',
			value: ''
		},
		{
			label: '业务类别',
			value: ''
		},
		{
			label: '付款内容',
			value: ''
		},
		{
			label: '预算事项',
			value: ''
		},
		{
			label: '支付节点',
			value: ''
		},
		{
			label: '业务备注',
			value: ''
		},
		{
			label: '备注',
			value: ''
		},
		{
			label: '保函有效期',
			value: '2025-10-12'
		},
		{
			label: '业务摘要',
			value: '本期支付中：支付农民工工资专户5000000元，基本户9943492元'
		},
	])

	function goBack() {
		uni.navigateBack()
	}


	// 计算 scroll-view 高度 = 设备窗口高 - 头部实际高
	function computeScrollHeight() {
		try {
			const {
				windowHeight
			} = uni.getSystemInfoSync() // px
			const inst = getCurrentInstance()
			const q = uni.createSelectorQuery().in(inst?.proxy)
			// q.select('.nav-bar-top').boundingClientRect(data => {
			//     const navBarTopH = data?.height || 0
			//     const h = Math.max(0, windowHeight - navBarTopH)
			//     scrollerHeight.value = `${h}px`
			// }).exec()
			// q.select('.hero-card').boundingClientRect(data => {
			//     const headerH = data?.height || 0
			//     heroCardHeight.value = headerH
			// }).exec()
			q.select('.header-stickt').boundingClientRect(data => {
				const headerH = data?.height || 0
				const h = Math.max(0, windowHeight - headerH)
				scrollerHeight.value = `${h}px`
			}).exec()
		} catch (e) {
			// 兜底：若获取失败，至少不挡住页面
			scrollerHeight.value = 'calc(100vh - 88rpx)'
		}
	}
	const onReject = () => {
		// uni.showToast({
		// 	title: '已打回',
		// 	icon: 'none'
		// })
		openInputDialog('打回原因', '请输入打回原因', '')
	}

	const onApprove = () => {
		// uni.showToast({
		// 	title: '已通过',
		// 	icon: 'success'
		// })
		openInputDialog('通过原因', '请输入通过原因', '')
	}
	const openInputDialog = (title, placeholder, value) => {
		inputDialogTitle.value = title
		inputDialogPlaceholder.value = placeholder
		inputDialogVisible.value = true
	}
	const handleInputConfirm = (value) => {
		inputDialogValue.value = value
		inputDialogVisible.value = false
	}
	const handleInputCancel = () => {
		inputDialogVisible.value = false
		inputDialogValue.value = ''
	}

	onMounted(() => {
		nextTick(() => {
			computeScrollHeight()
		})
		// 可选：横竖屏/窗口尺寸改变时重算
		uni.onWindowResize?.(() => {
			computeScrollHeight()
		})
	})
</script>

<style lang="scss" scoped>
	::v-deep .uni-navbar__header-container {
		justify-content: center !important;
		align-items: center !important;
	}
    ::v-deep .uni-navbar__header{
		  padding: 0 !important;
	}
	.detail-page {
		width: 100%;
		min-height: 100vh;
		background: #f8f8f8;

		.header-stickt {
			position: sticky;
			top: 0;
			z-index: 19;

			.status_bar {
				background: #fff;
				width: 100%;
			}
		}

		.nav-bar-top {
			::v-deep .uni-navbar__header {
				background: #fff !important;
			}

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

		.scroller {
			box-sizing: border-box;
			// position: absolute;
			// z-index: 19;
			// top: 88rpx;
			// border-radius: 16rpx;
		}

		.hero-card {
			box-sizing: border-box;
			flex-direction: column;
			display: flex;
			justify-content: space-between;
			padding: 16rpx 32rpx 0;
			background: #2d4ec8;
			min-height: 200rpx;
			color: #fff;
			position: relative;
			z-index: 9;

			.hero-header {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
			}

			.project-name {
				width: 55%;
				font-size: 24rpx;
				color: #fff;

				.project-name-1 {
					height: 72rpx;
					line-height: 72rpx;
				}
			}

			.amount-box {
				text-align: right;
				// border: 1px solid red;

				.amount-label {
					height: 72rpx;
					line-height: 72rpx;
					font-size: 24rpx;
					color: #99ccff;
					text-align: right;
				}

				.amount-value {
					height: 72rpx;
					line-height: 72rpx;

					.amount-value-symbol {
						font-size: 28rpx;
						color: #ffffff;
						margin-right: 10rpx;
					}

					.amount-value-number {
						font-size: 36rpx;
						color: #ffd615;
						font-weight: bold;
					}
				}
			}



			.hero-tags {
				width: calc(100% - 320rpx);
				height: 72rpx;
				overflow: hidden;
				display: flex;
				align-items: center;
				gap: 8rpx;
				flex-wrap: nowrap;

				.tag {
					box-sizing: border-box;
					height: 44rpx;
					display: block;
					border: 1rpx solid #66ccff;
					padding: 6rpx 12rpx;
					border-radius: 8rpx;
					font-size: 18rpx;
					color: #66ccff;
					white-space: nowrap;
				}
			}



			.hero-actions {
				position: absolute;
				bottom: 0;
				right: 0;
				width: 343rpx;
				height: 72rpx;
				background: url('../../static/images/bg_1@2x.jpg') no-repeat center center;
				background-size: 100% 100%;
				// border: 1rpx solid #030303;
				margin-top: 18rpx;
				display: flex;
				justify-content: flex-end;
			}

			.btn {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				font-weight: 600;
				color: #fff;
			}

			.btn.primary {
				box-sizing: border-box;
				width: 160rpx;
				background: #3e65f6;
			}

			.btn.outline {
				box-sizing: border-box;
				border-top-left-radius: 15rpx;
				width: 120rpx;
				background: #6699ff;
			}
		}

		.section {
			background: #fff;
			border-radius: 16rpx;
			margin-bottom: 40rpx;
		}

		.section-title {
			height: 80rpx;
			padding: 16rpx 32rpx;
			display: flex;
			align-items: center;
			gap: 20rpx;

			.section-title-vertical {
				box-sizing: border-box;
				width: 8rpx;
				height: 32rpx;
				background: #3d65f5;
			}

			.section-title-text {
				font-size: 28rpx;
				color: #000000;
				font-weight: bold;

			}
		}

		.section-title-2 {
			height: 80rpx;
			padding: 16rpx 32rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.section-title-2-left {
				display: flex;
				align-items: center;
				gap: 20rpx;

				.section-title-vertical {
					box-sizing: border-box;
					width: 8rpx;
					height: 32rpx;
					background: #3d65f5;
				}

				.section-title-text {
					font-size: 28rpx;
					color: #000000;
					font-weight: bold;

				}
			}

			.section-title-2-right {
				width: 112rpx;
				height: 112rpx;
				background: url('../../static/images/c2.png') center center no-repeat;
				background-size: 24rpx;
				margin-right: -31rpx;
				&.active {
					background: url('../../static/images/c1.png') center center no-repeat !important;
				    background-size: 24rpx !important;
				    margin-right: -31rpx !important;
				}
			}

		}

		.info-list {
			padding: 0 32rpx 10rpx;
		}

		.info-item {
			display: flex;
			align-items: flex-start;
			padding: 8rpx 0;
		}

		.info-item:last-child {
			border-bottom: none;
		}

		.info-label {
			min-width: 180rpx;
			max-width: 200rpx;
			line-height: 40rpx;
			font-size: 24rpx;
			color: #000;
			white-space: nowrap;
		}

		.info-value {
			flex: 1;
			font-size: 24rpx;
			color: #666;
			line-height: 40rpx;
			text-align: right;
		}

		// 用款情况样式
		.usage-details {
			padding: 0 32rpx 40rpx;

			.contract-section {
				box-sizing: border-box;
				border: 1rpx solid #ddd;
				padding: 16rpx;
				overflow: hidden;

				.contract-header {
					background: #f6f8fc;
					height: 48rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 24rpx;
					color: #000;
					font-weight: bold;
					padding: 4rpx 16rpx;
				}

				.contract-details {
					background: #ffffff;
					// border: 1rpx solid #ac4343;
					// border-top: none;
					// border-radius: 0 0 8rpx 8rpx;
				}
			}

			.other-info {
				box-sizing: border-box;
				border-radius: 25rpx;
				// margin-bottom: 10rpx;
				padding: 16rpx 20rpx;
				overflow: hidden;
			}

			.detail-row {
				box-sizing: border-box;
				width: 100%;
				height: 48rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 16rpx;

				.detail-label {
					font-size: 24rpx;
					min-width: 200rpx;
					font-size: 24rpx;
					color: #000000;
				}

				.detail-value {
					flex: 1;
					font-size: 24rpx;
					color: #666;
					text-align: right;
				}
			}

			.summary-row {
				border-top: 2rpx solid #ddd;
				margin-top: 20rpx;
				padding: 20rpx 16rpx 8rpx;
				height: auto !important;

				.summary-label {
					display: flex;
					align-items: center;
					height: 48rpx;
					font-size: 28rpx;
					color: #000000;
					font-weight: bold;
				}

				.summary-value {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					height: 48rpx;
					font-size: 28rpx;
					color: #000000;
					font-weight: bold;
				}
			}



		}

		// 支付渠道表格独立样式 - 不与其他样式共用
		.payment-channel-section {
			//  padding: 20rpx 30rpx 10rpx;
			margin-top: 30rpx;

			.payment-table {
				background: #ffffff;
				overflow: hidden;
				border: 1rpx solid #ddd;
				border-bottom: none;

				.payment-header {
					box-sizing: border-box;
					height: 60rpx;
					background: #f6f8fc;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #ddd;

					.payment-header-cell {
						box-sizing: border-box;
						height: 100%;
						display: flex;
						align-items: center;
						padding: 0 24rpx;
						font-size: 24rpx;
						color: #000;
						font-weight: bold;
						text-align: left;

						&.payment-header-cell-left {
							box-sizing: border-box;
							width: 468rpx;
						}

						&.amount-header {
							flex: 1;
							justify-content: flex-end;
							border-left: 1rpx solid #ddd;
						}
					}
				}

				.payment-category {
					display: flex;
					box-sizing: border-box;

					.payment-category-header {
						box-sizing: border-box;
						width: 274rpx;
						background: #f6f8fc;
						padding: 16rpx 10rpx 16rpx 24rpx;
						border-bottom: 1rpx solid #ddd;
						display: flex;
						align-items: center;

						.payment-category-name {
							font-size: 24rpx;
							color: #000;
						}

					}

					.payment-items {
						box-sizing: border-box;
						flex: 1;

						.payment-item-row {
							box-sizing: border-box;
							// width: 100%;
							display: flex;
							border-bottom: 1rpx solid #ddd;
							align-items: center;
							// background: #ffffff;

							//  &:last-child {
							//      border-bottom: none;
							//  }

							.payment-item-name {
								box-sizing: border-box;
								width: 194rpx;
								font-size: 24rpx;
								color: #000;

								text-align: left;
								background: #f6f8fc;
								
								border-left: 1rpx solid #ddd;
								padding: 16rpx;
							}

							.payment-item-amount {
								flex: 1;
								font-size: 24rpx;
								color: #666;
								text-align: right;
								padding: 16rpx;
								border-left: 1rpx solid #ddd;
							}
						}
					}
				}

				.payment-footer {
					height: 60rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #ddd;

					.payment-footer-cell {
						box-sizing: border-box;
						height: 100%;
						display: flex;
						align-items: center;
						font-size: 24rpx;

						text-align: left;

						&.payment-footer-cell-left {
							box-sizing: border-box;
							padding: 0 24rpx;
							color: #000;
							background: #f6f8fc;
							width: 468rpx
						}

						&.amount-footer {
							color: #666;
							flex: 1;
							justify-content: flex-end;
							border-left: 1rpx solid #ddd;
							padding: 16rpx;
						}
					}
				}
			}
		}

		// 付款账户信息独立样式 - 不与其他样式共用
		.account-info-section {
			// padding: 20rpx 30rpx 30rpx;
			padding: 0 32rpx 20rpx;

			.account-card {
				margin-bottom: 40rpx;

				.account-company-title {
					font-size: 24rpx;
					color: #000;
					margin-bottom: 20rpx;
					text-align: left;
				}

				.account-info-block {
					background: #f6f8fc;
					border: 1rpx solid #ddd;
					overflow: hidden;
					padding: 0;

					.account-info-row {
						box-sizing: border-box;
						height: 94rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 0 16rpx;
						border-bottom: 1rpx solid #dddddd;
						background: #f6f8fc;

						&:last-child {
							border-bottom: none;
						}

						.account-info-label {
							font-size: 24rpx;
							color: #000;
							text-align: left;
							flex: 0.32;
						}

						.account-info-value {
							font-size: 24rpx;
							color: #666;
							text-align: right;
							flex: 0.68;
						}
					}
				}
			}
		}

	}

	@media screen and (min-width: 768px) {
		.detail-page {
			max-width: 768rpx;
			margin: 0 auto;
		}
	}
</style>