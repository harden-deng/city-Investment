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
							{{ itemDatas.contractName }}
						</view>
					</view>
					<view class="amount-box">
						<view class="amount-label">申请金额</view>
						<view class="amount-value"><text class="amount-value-symbol">¥</text><text
								class="amount-value-number">
								{{ formatNumber(itemDatas.confirmedCostAmountVat) }}</text></view>
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
				<view class="info-list">
					<view class="info-item" v-for="(row, idx) in infoRows" :key="idx">
						<text class="info-label">{{ row.label }}</text>
						<text class="info-value">{{ row.value || '--' }}</text>
					</view>
				</view>
			</view>
			<!-- 发票信息 -->
			<view class="section" v-if="itemDatas.invoiceReceived == 1">
				<view class="section-title-2" @click="setOptions(FUND_USAGE_STATUS)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">发票信息</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(FUND_USAGE_STATUS) }">

					</view>
				</view>
				<transition name="collapse">
                    <view class="info-list" v-if="getOptions(FUND_USAGE_STATUS)">
                        <view class="info-item"  v-for="(row, idx) in infoRows2" :key="idx">
                            <text class="info-label">{{ row.label }}</text>
                            <text class="info-value">{{ row.value || '--' }}</text>
                        </view>
				    </view>
				</transition>
			</view>
            <!-- 确认成本信息 -->
			<view class="section">
				<view class="section-title-2" @click="setOptions(PAYMENT_ACCOUNT_INFORMATION)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">确认成本信息</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(PAYMENT_ACCOUNT_INFORMATION) }">

					</view>
				</view>
				<transition name="collapse">
                    <!-- <view class="info-list" v-if="getOptions(PAYMENT_ACCOUNT_INFORMATION)">
                        <view class="info-item" v-for="(row, idx) in infoRows3" :key="idx">
                            <text class="info-label">{{ row.label }}</text>
                            <text class="info-value">{{ row.value || '--' }}</text>
                        </view>
				    </view> -->
					<view class="usage-details" v-if="getOptions(PAYMENT_ACCOUNT_INFORMATION)">
							<scroll-view scroll-x class="table-scroll-x" @touchmove.stop="handleTableTouchMove">
								<table cellspacing="0" cellpadding="0" class="table1">
									<tbody>
										<tr>
											<td class="type sticky-xz-1">{{ infoRows3[0].label }}</td>
											<td class="info info-plus">
												{{ infoRows3[0].value }}
											</td>
										</tr>
										<tr>
											<td class="type sticky-xz-1">{{ infoRows3[1].label }}</td>
											<td class="info info-plus">
												{{ infoRows3[1].value }}</td>
										</tr>
                                        <tr>
											<td class="type sticky-xz-1">{{ infoRows3[2].label }}</td>
											<td class="info info-plus">
												{{ infoRows3[2].value }}</td>
										</tr>
                                        <tr>
											<td class="type sticky-xz-1">{{ infoRows3[3].label }}</td>
											<td class="info info-plus">
												{{ infoRows3[3].value }}</td>
										</tr>
                                        <tr>
											<td class="type sticky-xz-1">{{ infoRows3[4].label }}</td>
											<td class="info info-plus">
												{{ infoRows3[4].value }}</td>
										</tr>
                                        <tr>
											<td class="type sticky-xz-1">{{ infoRows3[5].label }}</td>
											<td class="info info-plus">
												{{ infoRows3[5].value }}</td>
										</tr>
                                        <tr>
											<td class="type sticky-xz-1">{{ infoRows3[6].label }}</td>
											<td class="info info-plus">
												{{ infoRows3[6].value }}</td>
										</tr>
                                        <tr>
											<td class="type sticky-xz-1">{{ infoRows3[7].label }}</td>
											<td class="info info-plus">
												{{ infoRows3[7].value }}</td>
										</tr>
                                        <tr>
											<td class="type sticky-xz-1">{{ infoRows3[8].label }}</td>
											<td class="info info-plus">
												{{ infoRows3[8].value }}</td>
										</tr>
									</tbody>
								</table>
							</scroll-view>
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
		getCurrentInstance,
		computed,
		onUnmounted
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
		formatNumber,formatDateTimeMinute,handleTableTouchMove
	} from '@/utils/h5Bribge'
	import { useListHeight } from '@/utils/useListHeight.js'
	import { useApproval } from '@/utils/useApproval.js'
	import detailNavBar from '@/components/navBar/detailNavBar.vue'
	import InputDialog from '@/components/inputDialog/inputDialog.vue'
	import approvalTimeline from '@/components/approvalTimeline/approvalTimeline.vue'
	import attachmentList from '@/components/attachmentList/attachmentList.vue'
	let eventChannel
	let handleOpenDetail = null

	onLoad(() => {
		eventChannel = getCurrentInstance()?.proxy?.getOpenerEventChannel?.()
		handleOpenDetail = (data) => {
			currentType.value = data.type
			itemDetail.value = data.order
			getFormDataApproval()
			getApprovalRecord()
		}
		eventChannel.on('open-detail', handleOpenDetail)
	})

	onUnmounted(() => {
		if (eventChannel && handleOpenDetail) {
			eventChannel.off('open-detail', handleOpenDetail)
		}
		handleOpenDetail = null
	})
	const currentType = ref('')
	const itemDetail = ref({})
	const stageTags = ref([])
	const wfstatusText = computed(() => {
		return itemDatas.value.wfstatus == 'Running' ? '流转中' : (itemDatas.value.wfstatus == 'Completed' ? '已审批' : '')
	})
	const attachmentData = ref([])

	const { listHeight } = useListHeight({
	     headerSelector: '.header-stickt', // 可选，默认就是这个值
		 iosFit: true,
	});

	const {
		inputDialogRef,
		inputDialogRequired,
		inputDialogTitle,
		inputDialogPlaceholder,
		handleInputConfirm,
		handleInputCancel,
		onReject,
		onApprove,
		approvalRecordList,
		getApprovalRecord
		} = useApproval({
			itemDetail,
			currentType,
			successMessage: '已审批',
			autoGoBack: true,
			autoRefresh: true
		})

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
			label: '合同名称',
			value: '',
			key: 'relatedContractName'
		},{
			label: '合同编号',
			value: '',
			key: 'contractNo'
		},
		{
			label: '合同子项',
			value: '',
			key: 'relatedContractItemName' 
		},
		{
			label: '项目名称',
			value: '',
			key: 'projectName'
		},{
			label: '所属部门',
			value: '',
			key: 'businessUnitName' 
		},{
			label: '对方单位',
			value: '',
			key: 'partyName'
		},{
			label: '合同金额',
			value: '',
			key: 'contractAmountVat'
		},{
			label: '对应收入合同编号',
			value: '',
			key: 'receivingContractNo'
		},{
			label: '是否已收到发票',
			value: '',
			key: 'invoiceReceived'
		}
	])

    
	const infoRows2 = ref([{
			label: '发票号',
			value: '',
			key: 'invoiceId'
		},{
			label: '专票含税金额',
			value: '',
			key: 'invoiceAmountVat'
		},
		
		{
			label: '专票不含税金额',
			value: '',
			key: 'invoiceAmountNet'
		},
		{
			label: '专票税额',
			value: '',
			key: 'invoiceAmountTax' 
		},{
			label: '普票金额',
			value: '',
			key: 'invoiceAmountVato'
		}
	])
    const infoRows3 = ref([{
			label: '确认日期',
			value: '',
			key: 'confirmedDate'
		},
		{
			label: '本期确认成本量',
			value: '',
			key: 'confirmedCostVat'
		},
		{
			label: '本期成本量占合同比% ',
			value: '',
			key: 'contractRatio'
		},
		{
			label: '确认金额(含税)',
			value: '',
			key: 'confirmedCostAmountVat'
		},
		{
			label: '增值税税额',
			value: '',
			key: 'confirmedCostTaxAmount' 
		},
		{
			label: '确认金额(不含税)',
			value: '',
			key: 'confirmedCostAmountNet'
		},	{
			label: '累计确认金额(含税)',
			value: '',
			key: 'accuredConfirmedCostAmountVat'
		},	{
			label: '内容',
			value: '',
			key: 'content'
		},	{
			label: '确认依据',
			value: '',
			key: 'remark'
		}
	])
	const itemDatas = ref({});
	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			let data = res.data?.data || {}
			itemDatas.value = data || {}
			infoRows.value.forEach(item => {
				item.value = typeof itemDatas.value[item.key] === 'number' ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key]
                if(item.key == 'invoiceReceived' && [0,1].includes(itemDatas.value[item.key])){
					item.value = itemDatas.value[item.key] == 0 ? '否' : '是'
				}
			});

			infoRows2.value.forEach(item => {
				item.value = (typeof itemDatas.value[item.key] === 'number') ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key];
			});

			infoRows3.value.forEach(item => {
				item.value = (typeof itemDatas.value[item.key] === 'number' && item.key != 'contractRatio') ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key];
                if(item.key == 'contractRatio'){
					item.value = itemDatas.value[item.key] + '%' || ''
				}
				if(item.key == 'confirmedDate'){
					item.value = formatDateTimeMinute(itemDatas.value[item.key]) || ''
				}
                
			});
			if(itemDatas.value.businessUnitName){
				 stageTags.value.push(itemDatas.value.businessUnitName)
			}
			let arr1 = (itemDatas.value?.attachmentList || []).map(item => {
				return {
					fileTagName: item.fileTagName,
					fileName: item.fileName,
                    fileUrl: item.fileUrl,
					id: item.attachmentId
				}
			})
			attachmentData.value = [{fileTagName: '合同', children: []}, {fileTagName: '发票/收据', children: []}, {fileTagName: '合同要求其他资料', children: []}, {fileTagName: '其他', children: []}]
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
</script>

<style lang="scss" scoped>


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
			height: v-bind(listHeight);
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
			.info-item-column{
                flex-direction: column;

			}
			.info-value-left{
				text-align: left;
				margin-top: 10rpx;
				white-space: normal;
				word-break: break-all;
				word-wrap: break-word;
			}
		}

		.info-item {
			display: flex;
			align-items: flex-start;
			padding: 8rpx 0;
			flex-wrap: wrap;
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
			min-width: 120rpx;
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
			white-space: normal;
			word-break: break-all;
			word-wrap: break-word;
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
		// border-bottom: 2rpx #ddd solid;
		border-top: 2rpx #ddd solid;
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
		// border-left: 2rpx #ddd solid;
		// border-top: 2rpx #ddd solid;
		border-bottom: 2rpx #ddd solid;
		border-right: 2rpx #ddd solid;
		padding: 8px;
		font-size: 12px;
	}

	.table1 .info {
		text-align: right;
		color: #666;
		padding: 8px !important;
		max-width: 350px;
		white-space: normal !important; //合并空白，自动换行
		word-break: break-all; //断字：打破一切；
		word-wrap: break-word;
	
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

	.table1 td.sticky-xz-1 { position: sticky; left: 0; top: 0; z-index: 3;	max-width: 176px !important;
		min-width: 176px !important;width: 176px !important; border-left: 2rpx #ddd solid;box-sizing: border-box;background: #fff;}
	.table1 td.sticky-xz-2 { position: sticky; left: 176px;  z-index: 4;;background: #fff; }
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