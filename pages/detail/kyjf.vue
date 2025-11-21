<template>
	<view class="detail-page">
		<view class="header-stickt">
			<detailNavBar></detailNavBar>
			<!-- 顶部蓝卡片 -->
			<view class="hero-card">
				<view class="hero-header">
					<view class="project-name">
						<view class="project-name-1">
							{{ itemDetail.taskName  }}
						</view>
						<view class="project-name-1">
							{{ itemDatas.projecCompany }}
						</view>
					</view>
					<view class="amount-box">
						<view class="amount-label">申请支付总金额</view>
						<view class="amount-value"><text class="amount-value-symbol">¥</text><text
								class="amount-value-number">
								{{ formatNumber(itemDatas.planToPay) }}</text></view>
					</view>
				</view>
				<view class="hero-tags" :class="{'hero-tags-width': currentType != 'pending' }">
					<view class="tag" v-for="(t, i) in stageTags" :key="i">{{ t }}</view>
				</view>
				<view class="hero-actions" v-show="currentType === 'pending'">
					<view class="btn outline" @click="onReject">打回</view>
					<view class="btn primary" @click="onApprove">通过</view>
				</view>
				<view class="wfstatus-actions" v-show="currentType === 'completed' && (itemDatas.wfstatus == 'Running' || itemDatas.wfstatus == 'Completed')">
					{{ wfstatusText }}
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroller">
			<!-- 顶部蓝卡片 -->
			<!-- 基本信息 -->
			<view class="section">
				<view class="section-title">
					<text class="section-title-vertical"></text>
					<text class="section-title-text">基本信息</text>
				</view>
				<!-- <view class="info-list">
					<view class="info-item" v-for="(row, idx) in infoRows" :key="idx">
						<text class="info-label">{{ row.label }}</text>
						<text class="info-value">{{ row.value || '--' }}</text>
					</view>
				</view> -->
				<view class="account-info-section">
					<view style="height: 10rpx;"></view>
					<view class="account-card">
						<view class="account-info-block">
							<view class="account-info-row">
								<text class="account-info-label">{{ infoRows[0].label }}</text>
								<text class="account-info-value">{{ infoRows[0].value }}</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">{{ infoRows[1].label }}</text>
								<text class="account-info-value">{{ infoRows[1].value }}</text>
							</view>
						</view>
					</view>
					<view class="account-card margin_1">
						<view class="account-info-block">
							<view class="account-info-row">
								<text class="account-info-label">{{ infoRows[2].label }}</text>
								<text class="account-info-value">{{ infoRows[2].value }}</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">{{ infoRows[3].label }}</text>
								<text class="account-info-value">{{ infoRows[3].value }}</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">{{ infoRows[4].label }}</text>
								<text class="account-info-value">{{ infoRows[4].value }} </text>
							</view>
						</view>
					</view>
					<view class="account-card margin_1">
						<view class="account-info-block">
							<view class="account-info-row">
								<text class="account-info-label">{{ infoRows[5].label }}</text>
								<text class="account-info-value">{{ infoRows[5].value }}</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">{{ infoRows[6].label }}</text>
								<text class="account-info-value">{{ infoRows[6].value }}</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">{{ infoRows[7].label }}</text>
								<text class="account-info-value">{{ infoRows[7].value }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 课题信息 -->
			<view class="section">
				<view class="section-title-2" @click="setOptions(FUND_USAGE_STATUS)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">课题信息</text>
					</view>
					<!-- <image class="section-title-2-right" src="../../static/images/c2.png" mode="scaleToFill"
						style=" width: 28rpx;height: 16rpx;" /> -->
					<view class="section-title-2-right" :class="{ 'active': getOptions(FUND_USAGE_STATUS) }">

					</view>
				</view>
				<transition name="collapse">
					<!-- <view class="usage-details" v-if="getOptions(FUND_USAGE_STATUS)">
						 <view class="contract-section">
						</view> 
					</view> -->
                    <view class="info-list" v-if="getOptions(FUND_USAGE_STATUS)">
                        <view class="info-item" :class="{ 'info-item-border': (row.key === 'remainAccountFundExcludeCurrent' || row.key === 'availableBudgetAmount') }" v-for="(row, idx) in infoRows2" :key="idx">
                            <text class="info-label" :class="{ 'info-label-width': row.key === 'projectTopicName' }">{{ row.label }}</text>
                            <text class="info-value">{{ row.value || '--' }}</text>
                        </view>
				    </view>
				</transition>
			</view>

			
			<view class="section">
				<view class="section-title-2" @click="setOptions(PAYMENT_ACCOUNT_INFORMATION)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">补充信息</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(PAYMENT_ACCOUNT_INFORMATION) }">
					</view>
				</view>
				<transition name="collapse">
					<view class="account-info-section" v-if="getOptions(PAYMENT_ACCOUNT_INFORMATION)">
						<view class="account-card">
							<view class="account-info-block">
								<view class="account-info-row">
									<text class="account-info-label">发票系统编号</text>
									<text class="account-info-value">{{ itemDatas.invoiceCloudId || '' }}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">普票金额</text>
									<text class="account-info-value">{{ formatNumber(itemDatas.vatoamount) || '' }}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">可抵扣票据</text>
									<text class="account-info-value"> {{ formatNumber(itemDatas.vatamountNet) || '' }} </text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">进项税额</text>
									<text class="account-info-value">{{ formatNumber(itemDatas.vattaxAmount) || '' }}</text>
								</view>
							</view>
						</view>
					</view>
				</transition>
			</view>
            
			<!-- 附件 -->
			<view class="section">
				<view class="section-title-2" @click="setOptions(ATTACHMENT_LIST)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">附件</text>
					</view>
					<view class="section-title-2-right"
						:class="{ 'active': getOptions(ATTACHMENT_LIST) }">
					</view>
				</view>
				<!-- 附件卡片 -->
				<transition name="collapse">
					<view class="attachment-section" v-if="getOptions(ATTACHMENT_LIST)">
						<attachmentList :list="attachmentData"></attachmentList>
					</view>
				</transition>
			</view>

			<!-- 审批记录 -->
			<view class="section">
				<view class="section-title-2" @click="setOptions(APPROVAL_RECORD)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">审批记录</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(APPROVAL_RECORD) }">
					</view>
				</view>
				<!-- 审批记录卡片 -->
				<transition name="collapse">
					<view class="approval-record-section" v-if="getOptions(APPROVAL_RECORD)">
						<approvalTimeline :list="approvalRecordList"></approvalTimeline>
					</view>
				</transition>
			</view>
		</scroll-view>
		<InputDialog ref="inputDialogRef" :required="inputDialogRequired" :title="inputDialogTitle"
			:placeholder="inputDialogPlaceholder" @confirm="handleInputConfirm" @cancel="handleInputCancel">
		</InputDialog>
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
		getCurrentInstance,
		computed
	} from 'vue'
	import {
		FUND_USAGE_STATUS,
		APPROVAL_RECORD,
		PAYMENT_ACCOUNT_INFORMATION,
		ATTACHMENT_LIST,
		currentUrlObj
	} from '@/utils/definitions'
	import http from '@/utils/request.js'
	import {
		formatNumber,goBack
	} from '@/utils/h5Bribge'
	import InputDialog from '@/components/inputDialog/inputDialog.vue'
	import approvalTimeline from '@/components/approvalTimeline/approvalTimeline.vue'
	import attachmentList from '@/components/attachmentList/attachmentList.vue'
	import detailNavBar from '@/components/navBar/detailNavBar.vue'
	let eventChannel
	onLoad(() => {
		eventChannel = getCurrentInstance()?.proxy?.getOpenerEventChannel?.()
		eventChannel.on('open-detail', (data) => {
			console.log('open-detail', data);
			currentType.value = data.type
			itemDetail.value = data.order
			getFormDataApproval()
			getApprovalRecord()
		})
	})
	const currentType = ref('')
	const inputDialogRef = ref(null)
	const inputDialogRequired = ref(false)
	const inputDialogTitle = ref('')
	const inputDialogPlaceholder = ref('')
	const inputDialogValue = ref('')
	const scrollerHeight = ref('0px')
	const itemDetail = ref({})
	const stageTags = ref([])
	const wfstatusText = computed(() => {
		return itemDatas.value.wfstatus == 'Running' ? '流转中' : (itemDatas.value.wfstatus == 'Completed' ? '已审批' : '')
	})
	const attachmentData = ref([])
	const pullDownObj = reactive({
		[FUND_USAGE_STATUS]: true,
		[APPROVAL_RECORD]: true,
		[PAYMENT_ACCOUNT_INFORMATION]: true,
		[ATTACHMENT_LIST]: true,
	})
	const setOptions = (name) => {
		pullDownObj[name] = pullDownObj[name] ? false : true
	}

	const getOptions = (name) => {
		return pullDownObj[name]
	}
	const urlParams = computed(() => {
		let params = {
			pending: {
				procCode: itemDetail.value.procDefCode,
				workitemid: itemDetail.value.workItemId
			},
			completed: {
				procCode: itemDetail.value.procDefCode,
				wfInstanceId: itemDetail.value.wfinstanceId
			}
		}
		return params[currentType.value]
	})

	const infoRows = ref([{
			label: '用款部门',
			value: '',
			key: 'businessUnitName'
		},
		{
			label: '申请人',
			value: '',
			key: 'submittedByName'   //deng 潜在bug
		},
		{
			label: '付款单位',
			value: '',
			key: 'projecCompany'
		},{
			label: '付款帐号',
			value: '',
			key: 'paymentAccount' 
		},{
			label: '付款银行',
			value: '',
			key: 'paymentBank'
		},
		{
			label: '收款单位',
			value: '',
			key: 'receiverCompany'
		},
		
		{
			label: '收款帐号',
			value: '',
			key: 'receiverAccountNumber'
		},
		
		{
			label: '收款银行',
			value: '',
			key: 'receiverBankName'
		}
	])

    
	const infoRows2 = ref([{
			label: '课题名称',
			value: '',
			key: 'projectTopicName'
		},
		{
			label: '立项单位',
			value: '',
			key: 'projectApprovalUnit'
		},
		{
			label: '立项预算科目名称',
			value: '',
			key: 'budgetAccountName'
		},
		{
			label: '资金来源',
			value: '',
			key: 'fundSource'
		},
		{
			label: '总经费余额（不含本次）',
			value: '',
			key: 'remainFundExcludeCurrent' 
		},
		{
			label: '科目余额（不含本次）',
			value: '',
			key: 'remainAccountFundExcludeCurrent'
		},	{
			label: '预算金额',
			value: '',
			key: 'planToPayTotal'
		},
		{
			label: '已使用/占用金额',
			value: '',
			key: 'occBudgetAmount'
		},
		{
			label: '可用预算金额',
			value: '',
			key: 'availableBudgetAmount'
		},
		{
			label: '计划支付金额',
			value: '',
			key: 'planToPay'
		},
		{
			label: '支付内容',
			value: '',
			key: 'paymentContent'
		}
	])
    const infoRows2Flag = ref(['remainFundExcludeCurrent','remainAccountFundExcludeCurrent','planToPay','planToPayTotal','occBudgetAmount','availableBudgetAmount']);
	const itemDatas = ref({});
	// const vehiclePaymentContentList = ref([]);
	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			let data = res.data?.data || {}
			itemDatas.value = data || {}
			infoRows.value.forEach(item => {
				item.value = typeof itemDatas.value[item.key] === 'number' ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || ''
			})
			infoRows2.value.forEach(item => {
				item.value = (typeof itemDatas.value[item.key] === 'number' || infoRows2Flag.value.includes(item.key)) ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || ''
			})
            // vehiclePaymentContentList.value = res.data?.data?.wfrequestexpenseclaimvehicleitems || []
			if(itemDatas.value.projectApprovalUnit){
				 stageTags.value.push(itemDatas.value.projectApprovalUnit)
			}
			if(itemDatas.value.budgetAccountName){
				 stageTags.value.push(itemDatas.value.budgetAccountName)
			}

			let arr1 = (itemDatas.value?.attachmentList || []).map(item => {
				return {
					fileTagName: item.fileTagName,
					fileName: item.fileName,
                    fileUrl: item.fileUrl,
					id: item.attachmentId
				}
			})
			attachmentData.value = [{fileTagName: '合同', children: []}, {fileTagName: '课题预算表', children: []}, {fileTagName: '发票', children: []}]
			const attachmentMap = new Map()
			attachmentData.value.forEach(item => {
				attachmentMap.set(item.fileTagName, item)
			})
			arr1.forEach(childItem => {
				const parent = attachmentMap.get(childItem.fileTagName)
				if (parent) {
					parent.children.push(childItem)
				}
			})

		})
	}

	const onReject = () => {
		inputDialogRequired.value = true
		openInputDialog('打回原因', '请输入打回原因')
	}

	const onApprove = () => {
		inputDialogRequired.value = false
		openInputDialog('通过原因', '请输入通过原因')
	}
	const openInputDialog = (title, placeholder) => {
		inputDialogTitle.value = title
		inputDialogPlaceholder.value = placeholder
		inputDialogRef.value.open()
	}
	const handleInputConfirm = (value, dialogType) => {
		inputDialogValue.value = value
		inputDialogRef.value.close()
		doSubmitApproval(dialogType)
	}
	const handleInputCancel = () => {
		inputDialogRef.value.close()
		inputDialogValue.value = ''
	}
	const doSubmitApproval = (dialogType) => {
		let params = {
            wfInstanceId: itemDetail.value.wfinstanceId,
			workItemId: itemDetail.value.workItemId,
			approvalComment: inputDialogValue.value,
			annotationComment: '',
			pictureBaseData: '',
			isApproval: dialogType,
			procDefCode: itemDetail.value.procDefCode, //ZC01和GC01两个类型的可以了
		}
		http.post('/WF/SubmitApproval', params).then(res => {
			if (res.code === 0) {
				uni.showToast({
					title: '已审批',
					icon: 'success'
				})
				setTimeout(() => {
					if (currentType.value === 'pending') {
						uni.$emit('refresh-pending')
						uni.$emit('refresh-completed')
					};
					goBack();
				}, 1000)
			} else {
				uni.showToast({
					title: res.message,
					icon: 'none'
				})
			}
		})
	}
	//获取审批记录接口 start
	const approvalRecordList = ref([]);
	const getApprovalRecord = () => {
		http.get('/WF/GetApprovalHistory', {
			wfinstanceId: itemDetail.value.wfinstanceId,
		}).then(res => {
			console.log(res)
			// 假设接口返回的数据在res.data中，需要根据实际接口调整
			approvalRecordList.value = res.data || []
		})
	}
	//获取审批记录接口 end
	// 计算 scroll-view 高度 = 设备窗口高 - 头部实际高
	function computeScrollHeight() {
		try {
			const {
				windowHeight
			} = uni.getSystemInfoSync() // px
			const inst = getCurrentInstance()
			const q = uni.createSelectorQuery().in(inst?.proxy)

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
	onMounted(() => {
		nextTick(() => {
			computeScrollHeight()
		})
		// 获取系统信息
		const systemInfo = uni.getSystemInfoSync()
		const isIOS = systemInfo.platform === 'ios'
		const isH5 = systemInfo.platform === 'h5' || process.env.UNI_PLATFORM === 'h5'

		// 只在 iOS H5 环境下添加滚动修复
		if (isIOS && isH5) {
			console.log('检测到 iOS H5 环境，添加滚动修复')

			// 添加失焦滚动修复
			document.addEventListener('focusout', () => {
				setTimeout(() => {
					window.scrollTo({
						top: 0,
						left: 0,
						behavior: 'instant'
					})
				}, 20)
			})

			// // 可选：添加其他 iOS H5 特有的修复
			// document.addEventListener('touchstart', () => {
			// // iOS H5 触摸开始时的处理
			// })
		} else {
			window.visualViewport?.addEventListener('resize', onResize)
			window.addEventListener('resize', onResize) // 部分浏览器兼容
		}


	})

	function onResize() {
		setTimeout(() => {
			computeScrollHeight()
		}, 100)
	}
</script>

<style lang="scss" scoped>
	::v-deep .uni-navbar__header-container {
		justify-content: center !important;
		align-items: center !important;
	}

	::v-deep .uni-navbar__header {
		padding: 0 !important;
	}

	::v-deep .uni-tabbar-bottom {
		display: none !important;
		height: 0 !important;
	}

	.detail-page {
		width: 100%;
		height: 100vh;
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
			height: v-bind(scrollerHeight);
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
				margin-bottom: 16rpx;
			}

			.project-name {
				width: 60%;
				font-size: 24rpx;
				color: #fff;

				.project-name-1 {
					display: flex;
					align-items: center;
					word-wrap: break-word;
					word-break: break-all;
					white-space: normal;
					line-height: 1.4;
					min-height: 72rpx;
					/* 如果需要最小高度，使用 min-height */
				}
			}

			.amount-box {
				text-align: right;
				// border: 1px solid red;

				.amount-label {
					height: 70rpx;
					line-height: 70rpx;
					font-size: 24rpx;
					color: #99ccff;
					text-align: right;
				}

				.amount-value {
					height: 70rpx;
					line-height: 70rpx;

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
					display: flex;
					align-items: center;
					justify-content: center;
					border: 2rpx solid #66ccff;
					padding: 2rpx 12rpx;
					border-radius: 8rpx;
					font-size: 18rpx;
					color: #66ccff;
					white-space: nowrap;
				}
				&.hero-tags-width {
					width: calc(100% - 180rpx);
				}
			}



			.hero-actions {
				position: absolute;
				bottom: 0;
				right: 0;
				width: 350rpx;
				height: 72rpx;
				background: url('../../static/images/bg_1@2x.jpg') no-repeat center center;
				background-size: 100% 100%;
				margin-top: 18rpx;
				display: flex;
				justify-content: flex-end;
			}
			.wfstatus-actions {
                position: absolute;
                bottom: 12rpx;
                right: 36rpx;
				width: 120rpx;
				height: 42rpx;
				border: 2rpx solid #66ccff;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
			
				border-radius: 25rpx;
				font-size: 24rpx;
				color: #66ccff;
				white-space: nowrap;
               
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
				transition: transform 0.3s ease;

				&.active {
					background: url('../../static/images/c2.png') center center no-repeat !important;
					background-size: 24rpx !important;
					margin-right: -31rpx !important;
					transform: rotate(180deg);
				}
			}

		}

		// 折叠动画样式
		.collapse-enter-active,
		.collapse-leave-active {
			transition: all 0.3s ease;
			overflow: hidden;
		}

		.collapse-enter-from,
		.collapse-leave-to {
			opacity: 0;
			transform: translateY(-10rpx);
			max-height: 0;
		}

		.collapse-enter-to,
		.collapse-leave-from {
			opacity: 1;
			transform: translateY(0);
			max-height: 2000rpx;
		}

		.info-list {
			padding: 0 32rpx 20rpx;
		}

		.info-item {
			display: flex;
			align-items: flex-start;
			padding: 8rpx 0;
			&.info-item-border {
				border-bottom: 2rpx dashed #ddd;
				padding-bottom: 22rpx !important;
				margin-bottom: 12rpx;
			}
		}

		.info-item:last-child {
			border-bottom: none;
		}

		.info-label {
			min-width: 180rpx;
			max-width: 280rpx;
			padding-right: 10rpx;
			line-height: 40rpx;
			font-size: 24rpx;
			color: #000;
			white-space: nowrap;
			&.info-label-width {
				min-width: 100rpx;
				max-width: 240rpx;
			}
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
				border: 2rpx solid #ddd;
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
				}
			}

			.other-info {
				box-sizing: border-box;
				border-radius: 25rpx;
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


		


		// 付款账户信息独立样式 - 不与其他样式共用
		.account-info-section {
			padding: 0 32rpx 40rpx;

			.account-card {

				.account-company-title {
					font-size: 24rpx;
					color: #000;
					margin-bottom: 20rpx;
					text-align: left;
				}

				.account-info-block {
					background: #f6f8fc;
					border: 2rpx solid #ddd;
					overflow: hidden;
					padding: 0;

					.account-info-row {
						box-sizing: border-box;
						min-height: 94rpx;
						height: auto;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 16rpx;
						border-bottom: 2rpx solid #dddddd;
						background: #f6f8fc;

						&:last-child {
							border-bottom: none;
						}

						.account-info-label {
							font-size: 24rpx;
							color: #000;
							text-align: left;
							flex: 0.28;
						}

						.account-info-value {
							font-size: 24rpx;
							color: #666;
							text-align: right;
							flex: 0.72;
							//文字自动换行
							white-space: normal;
							word-break: break-all;
							word-wrap: break-word;
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









	.margin_1 {
		margin-top: 20px;
	}

	.table1 {
		box-sizing: border-box;
		width: 100%;
		border-bottom: 2rpx #ddd solid;
	}

	.table2 {
		box-sizing: border-box;
		width: 100%;
		border: none !important;

		td {
			border: none !important;
		}
	}

	.table1 .type {
		background: #f6f8fc !important;
		color: #000;
	}

	.table1 td {
		box-sizing: border-box;
		border-left: 2rpx #ddd solid;
		border-top: 2rpx #ddd solid;
		padding: 8px;
		font-size: 12px;
	}

	.table1 .info {
		text-align: right;
		color: #666;
	}

	.table1 .text {
		color: #666;
		white-space: nowrap;
	}

	.font_w {
		font-weight: bold;
	}

	.text_right {
		text-align: right;
	}


	/* 防止单元格换行挤压变形，可按需保留或去掉 */
	.table1 .info,
	.table1 .type {
		white-space: nowrap;
	}

	/* 需要给表格的前几列设置 sticky 和 left 偏移，按你的列宽自行调整 */
	.table1 td.sticky-1 { position: sticky; left: 0; top: 0; z-index: 3;width: 109.02px !important;box-sizing: border-box;  }
	.table1 td.sticky-2 { position: sticky; left: 109.02px;  z-index: 4;box-sizing: border-box; }
	.table1 td.sticky-3 { position: sticky; left: 220px;  z-index: 2;box-sizing: border-box; }

	.table1 td.sticky-xz-1 { position: sticky; left: 0; top: 0; z-index: 3;width: 55.5px !important; ;background: #fff;}
	.table1 td.sticky-xz-2 { position: sticky; left: 55.5px;  z-index: 4;;background: #fff; }
	.table1 td.sticky-xz-3 { position: sticky; left: 220px;  z-index: 2;background: #fff; }

	.table1 td.sticky-lx-1 { position: sticky; left: 0; top: 0; z-index: 3;width: 76px !important;background: #fff; }
	.table1 td.sticky-lx-2 { position: sticky; left: 76px;  z-index: 4;background: #fff; }
	.table1 td.sticky-lx-3 { position: sticky; left: 220px;  z-index: 2;background: #fff; }

	/* 审批记录独立样式区域 */
	.approval-record-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}
	.attachment-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}
</style>