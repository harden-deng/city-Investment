<template>
	<view class="detail-page">
		<view class="header-stickt">
			<detailNavBar></detailNavBar>
			<view class="hero-card">
				<view class="hero-header">
					<view class="project-name">
						<view class="project-name-1">
							{{ itemDetail.taskName || '项目用款申请单'}}
						</view>
						<view class="project-name-1">
							上海市市政工程建设发展有限公司
						</view>
					</view>
					<view class="amount-box">
						<view class="amount-label">申请支付总金额</view>
						<view class="amount-value"><text class="amount-value-symbol">¥</text><text
								class="amount-value-number">
								<!--金额已确认 -->
								{{ formatNumber(itemDatas.paymentAmount) }}</text></view>
					</view>
				</view>
				<view class="hero-tags">
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
			<view class="section">
				<view class="section-title">
					<text class="section-title-vertical"></text>
					<text class="section-title-text">基本信息</text>
				</view>
				<view class="info-list">
					<view class="info-item"  :class="{'info-item-border': (row.key === 'contractNo' || row.key === 'contractPaymentRatio')}"  v-for="(row, idx) in infoRows" :key="idx">
						<text class="info-label">{{ row.label }}</text>
						<text class="info-value">{{row.key === 'contractPaymentRatio' ? row.value + '%' : row.value || '--'}}</text>
					</view>
					<view class="info-item" :class="{'info-item-column': itemDatas.specialRemark?.length > 34}" v-if="['OverBudget','OutOfBudget'].includes(itemDatas.specialCase)">
						<text class="info-label">补充说明</text>
						<text class="info-value" :class="{'info-value-left': itemDatas.specialRemark?.length > 34}">{{ itemDatas.specialRemark || '--' }}</text>
					</view>
				</view>
			</view>
		
			<view class="section">
				<view class="section-title-2" @click="setOptions(PAYMENT_ACCOUNT_INFORMATION)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">付款内容</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(PAYMENT_ACCOUNT_INFORMATION) }">
					</view>
				</view>
				<transition name="collapse">
					<view class="account-info-section" v-if="getOptions(PAYMENT_ACCOUNT_INFORMATION)">
						<view class="account-card">
							<view class="account-info-block">
								<view class="account-info-row">
									<text class="account-info-label">付款内容</text>
									<text class="account-info-value">{{ itemDatas.paymentContent || '' }}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">本次付款金额</text>
									<text class="account-info-value">{{ formatNumber(itemDatas.paymentAmount) || '' }}</text>
								</view>
								
							</view>
							<view class="account-info-block" style="margin-top: 20rpx;">
								<view class="account-info-row">
									<text class="account-info-label">收款单位名称</text>
									<text class="account-info-value"> {{ itemDatas.receivingCompany || '' }} </text>
								</view>
                                <view class="account-info-row">
									<text class="account-info-label">开户银行</text>
									<text class="account-info-value">{{ itemDatas.receivingBank || '' }}</text>
								</view>
                                <view class="account-info-row">
									<text class="account-info-label">账号</text>
									<text class="account-info-value">{{ itemDatas.receivingAccountNo || '' }}</text>
								</view>
								
							</view>
							<view class="account-info-block" style="margin-top: 20rpx;">
								<view class="account-info-row">
									<text class="account-info-label">普票金额</text>
									<text class="account-info-value">{{ formatNumber(itemDatas.vatoamount) || '' }}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">专票金额(含税)</text>
									<text class="account-info-value"> {{ formatNumber(itemDatas.vatamount) || '' }} </text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">不含税金额</text>
									<text class="account-info-value">{{ formatNumber(itemDatas.vatamountNet) || '' }}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">进项税额</text>
									<text class="account-info-value">{{ formatNumber(itemDatas.vattaxAmount) || '' }}</text>
								</view>
                              
                                <view class="account-info-row">
									<text class="account-info-label">税率%</text>
									<text class="account-info-value">{{ itemDatas.taxRate ? itemDatas.taxRate + '%' : '--' }}</text>
								</view>
							</view>
						</view>
					</view>
				</transition>
			</view>

			<view class="section" v-if="itemDatas.relatedRecivingContractId">
				<view class="section-title-2" @click="setOptions(COLLECTION_ACCOUNT_INFORMATION)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">关联合同情况</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(COLLECTION_ACCOUNT_INFORMATION) }">
					</view>
				</view>
				<transition name="collapse">
					<view class="usage-details" v-if="getOptions(COLLECTION_ACCOUNT_INFORMATION)">
							<scroll-view scroll-x class="table-scroll-x">
								<table cellspacing="0" cellpadding="0" class="table1">
									<tbody>
										<tr>
											<td class="type text sticky-xz-1">收款合同</td>
											<td class="info info-plus">
												{{ itemDatas.relatedRecivingContractName }}
											</td>
										</tr>
										<tr>
											<td class="type text sticky-xz-1">合同编号</td>
											<td class="info info-plus">
												{{ itemDatas.relatedRecivingContractNo }}</td>
										</tr>
                                        <tr>
											<td class="type text sticky-xz-1">业主单位</td>
											<td class="info info-plus">
												{{ itemDatas.relatedRecivingContractCustomer }}</td>
										</tr>
                                        <tr>
											<td class="type text sticky-xz-1">合同价</td>
											<td class="info info-plus">
												{{ formatNumber(itemDatas.relatedRecivingContractAmountVat) }}</td>
										</tr>
                                        <tr>
											<td class="type text sticky-xz-1">决算价</td>
											<td class="info info-plus">
												{{ formatNumber(itemDatas.relatedRecivingContractSettleAmountVat) }}</td>
										</tr>
                                        <tr>
											<td class="type text sticky-xz-1">已完成工作量</td>
											<td class="info info-plus">
												{{ formatNumber(itemDatas.relatedRecivingContractAccWorkload) }}</td>
										</tr>
                                        <tr>
											<td class="type text sticky-xz-1">累计已收款</td>
											<td class="info info-plus">
												{{ formatNumber(itemDatas.relatedRecivingContractAccReceived) }}</td>
										</tr>
                                        <tr>
											<td class="type text sticky-xz-1">付款比例</td>
											<td class="info info-plus">
												{{ itemDatas.relatedRecivingContractAccReceivedRatio + '%' }}</td>
										</tr>
									</tbody>
								</table>
							</scroll-view>
					</view>
				</transition>
			</view>

            <view class="section" v-if="itemDatas.relatedBudgetItemId">
				<view class="section-title-2" @click="setOptions(FUND_USAGE_STATUS)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">预算关联信息</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(FUND_USAGE_STATUS) }">
					</view>
				</view>
				<transition name="collapse">
					<view class="usage-details" v-if="getOptions(FUND_USAGE_STATUS)">
							<scroll-view scroll-x class="table-scroll-x">
								<table cellspacing="0" cellpadding="0" class="table1">
									<tbody>
										<tr>
											<td class="type text sticky-xz-1">预算事项</td>
											<td class="info info-plus">
												{{ itemDatas.relatedBudgetItemContent }}
											</td>
										</tr>
										<tr>
											<td class="type text sticky-xz-1">预算栏目</td>
											<td class="info info-plus">
												{{ itemDatas.budgetCategoryName }}</td>
										</tr>
                                        <tr>
											<td class="type text sticky-xz-1">月度预算金额</td>
											<td class="info info-plus">
												{{ formatNumber(itemDatas.currentMonthBudgetAmount) }}</td>
										</tr>
                                        <tr>
											<td class="type text sticky-xz-1">当月累计支出数(含本次申请)</td>
											<td class="info info-plus">
												{{ formatNumber(itemDatas.currentMonthAccPaymentIncludeCurrent) }}</td>
										</tr>
                                        <tr>
											<td class="type text sticky-xz-1">年度预算金额</td>
											<td class="info info-plus">
												{{ formatNumber(itemDatas.yearlyBudgetAmount) }}</td>
										</tr>
                                        <tr>
											<td class="type text sticky-xz-1">年度累计支出(截至上月)</td>
											<td class="info info-plus">
												{{ formatNumber(itemDatas.yearlyAccPayment) }}</td>
										</tr>
									</tbody>
								</table>
							</scroll-view>
					</view>
				</transition>
			</view>

			
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
				<transition name="collapse">
					<view class="attachment-section" v-if="getOptions(ATTACHMENT_LIST)">
						<attachmentList :list="attachmentData"></attachmentList>
					</view>
				</transition>
			</view>

			<view class="section">
				<view class="section-title-2" @click="setOptions(APPROVAL_RECORD)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">审批记录</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(APPROVAL_RECORD) }">
					</view>
				</view>
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
		getCurrentInstance,
		onUnmounted
	} from 'vue'
	import {
		FUND_USAGE_STATUS,
		PAYMENT_ACCOUNT_INFORMATION,
		COLLECTION_ACCOUNT_INFORMATION,
		APPROVAL_RECORD,
		ATTACHMENT_LIST,
		currentUrlObj
	} from '@/utils/definitions'
	import http from '@/utils/request.js'
	import {
		formatNumber
	} from '@/utils/h5Bribge'
	import { useListHeight } from '@/utils/useListHeight.js'
	import { useApproval } from '@/utils/useApproval.js'
	import { useDetailCommon } from '@/utils/useDetailCommon.js'
	import InputDialog from '@/components/inputDialog/inputDialog.vue'
	import approvalTimeline from '@/components/approvalTimeline/approvalTimeline.vue'
	import attachmentList from '@/components/attachmentList/attachmentList.vue'
	import detailNavBar from '@/components/navBar/detailNavBar.vue'
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
	const itemDatas = ref({})
	const stageTags = ref([])
	const attachmentData = ref([])
	const {   
		urlParams, wfstatusText,setOptions,getOptions
    } = useDetailCommon({
		itemDetail,
		currentType,
		itemDatas,
	})
    const { listHeight, computeScrollHeight } = useListHeight({
	     headerSelector: '.header-stickt', // 可选，默认就是这个值
		 iosFit: true,
	})
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
	
	const infoRows = ref([{
			label: '用款部门',
			value: '',
			key: 'businessUnitName' 
		},{
			label: '申请人',
			value: '',
			key: 'applicantName'
		},{
			label: '付款合同',
			value: '',
			key: 'contractName'
		},{
			label: '合同编号',
			value: '',
			key: 'contractNo'
		},
        
        {
			label: '合同价',
			value: '',
			key: 'contractAmountVat'
		},{
			label: '决算价',
			value: '',
			key: 'contractSettleAmountVat'
		},{
			label: '已完成工作量',
			value: '',
			key: 'contractCompletedWorkload'
		},{
			label: '累计付款(含本次付款)',
			value: '',
			key: 'contractAccPaymentIncludeCurrent'
		},{
			label: '付款比例',
			value: '',
			key: 'contractPaymentRatio'
		}
	]);
	
	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			let data = res.data?.data || {}
			itemDatas.value = data?.wfrequestmarketingpayment || {}
			infoRows.value.forEach(item => {
				item.value = (typeof itemDatas.value[item.key] === 'number' && item.key !== 'contractPaymentRatio') ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || ''
			})

			if(itemDatas.value.businessUnitName){
				 stageTags.value.push(itemDatas.value.businessUnitName);
			}
			if(itemDatas.value.specialCase && itemDatas.value.specialCase === 'OutOfBudget'){
				 stageTags.value.push('预算外');
			}
			if(itemDatas.value.specialCase && itemDatas.value.specialCase === 'OverBudget'){
				 stageTags.value.push('超预算');
			}

			let arr1 = (data?.attachementList || []).map(item => {
				return {
					fileTagName: item.fileTagName,
					fileName: item.fileName,
                    fileUrl: item.fileUrl,
					id: item.attachmentId
				}
			})

			attachmentData.value = [{fileTagName: '合同', children: []}, {fileTagName: '发票/收据', children: []}, {fileTagName: '其他', children: []}]
			const attachmentMap = new Map();
			attachmentData.value.forEach(item => {
				attachmentMap.set(item.fileTagName, item)
			})
			arr1.forEach(childItem => {
				const parent = attachmentMap.get(childItem.fileTagName)
				if (parent) {
					parent.children.push(childItem)
				}
			})
			computeScrollHeight()
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
				}
			}

			.amount-box {
				text-align: right;

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
				overflow-x: hidden;
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
				margin-right: -32rpx;
				transition: transform 0.3s ease;

				&.active {
					background: url('../../static/images/c2.png') center center no-repeat !important;
					background-size: 24rpx !important;
					margin-right: -32rpx !important;
					transform: rotate(180deg);
				}
			}
		}

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
			.info-item-column {
                flex-direction: column;

			}
			.info-value-left {
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
		}

		.info-value {
			flex: 1;
			font-size: 24rpx;
			color: #666;
			line-height: 40rpx;
			text-align: right;
		}

		.usage-details {
			padding: 0 32rpx 40rpx;

			.contract-section {
				box-sizing: border-box;
				border: 2rpx solid #ddd;
				padding: 16rpx;
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

		.account-info-section {
			padding: 0 32rpx 40rpx;

			.account-card {
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

	.table1 {
		box-sizing: border-box;
		width: 100%;
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
		border-bottom: 2rpx #ddd solid;
		border-right: 2rpx #ddd solid;
		padding: 8px;
		font-size: 12px;
	}

	.table1 .info {
		text-align: right;
		color: #666;
		padding: 8px !important;
		max-width: 450px;
		white-space: normal !important;
		word-break: break-all;
		word-wrap: break-word;
	}

	.table1 .info-plus {
		min-width: 150px;
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

	.table1 .info,
	.table1 .type {
		white-space: nowrap;
	}

	.table1 td.sticky-xz-1 { 
		position: sticky; 
		left: 0; 
		top: 0; 
		z-index: 3;
		max-width: 176px !important;
		min-width: 176px !important;
		width: 176px !important;
        border-left: 2rpx #ddd solid;
		box-sizing: border-box;
		background: #fff;
	}

	.table1 td.sticky-xz-2 { 
		position: sticky;  
		left: 76px;  
		z-index: 4;
		background: #fff; 
	}

	.approval-record-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}

	.attachment-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}
</style>