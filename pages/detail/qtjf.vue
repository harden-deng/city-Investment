<template>
	<view class="detail-page">
		<view class="header-stickt">
			<detailNavBar></detailNavBar>
			<view class="hero-card">
				<view class="hero-header">
					<view class="project-name">
						<view class="project-name-1">
							{{ itemDetail.taskName || '其他费用申请单'}}
						</view>
						<view class="project-name-1">
							<!-- {{ itemDatas.paymentCompanyName }} -->
							上海城投公路投资（集团）有限公司
						</view>
					</view>
					<view class="amount-box">
						<view class="amount-label">申请金额</view>
						<view class="amount-value"><text class="amount-value-symbol">¥</text><text
								class="amount-value-number">
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
					<view class="info-item" :class="{ 'info-item-border': (row.key === 'paymentAmount' || row.key === 'receivingBankAccountNumber' || row.key === 'companyName') }"  v-for="(row, idx) in infoRows" :key="idx">
						<text class="info-label">{{ row.label }}</text>
						<text class="info-value">{{ row.value || '--'}}</text>
					</view>
					<view class="info-item">
						<text class="info-label">支付内容备注</text>
						<text class="info-value">{{ itemDatas.content || '--' }}</text>
					</view>
				</view>
			</view>

			<view class="section" v-if="vehiclePaymentContentList.length > 0">
				<view class="section-title-2" @click="setOptions(FUND_USAGE_STATUS)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">支付内容</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(FUND_USAGE_STATUS) }">
					</view>
				</view>
				<transition name="collapse">
					<view class="usage-details" v-if="getOptions(FUND_USAGE_STATUS)">
						<!-- <view class="contract-section"> -->
							<scroll-view scroll-x class="table-scroll-x" v-if="vehiclePaymentContentList.length > 0" @touchmove.stop="handleTableTouchMove">
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
										   <td class="type font_w sticky-xz-1 bordr-none">明细</td>
										   <td class="type font_w text_right sticky-xz-2 bordr-none bordr-right-none">合计</td>
										   <td class="type font_w text_right bordr-none" v-for="(value,index) in vehiclePaymentContentList" :key="index">
										   </td>
										</tr>
										<tr>
											<td class="text sticky-xz-1 bordr-none">报销类目</td>
											<td class="info sticky-xz-2 bordr-none"></td>
											<td class="info info-plus bordr-none" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatClaimCategory(value) }}
											</td>
										</tr>
										<tr>
											<td class="text sticky-xz-1">报销内容</td>
											<td class="info sticky-xz-2"></td>
											<td class="info info-plus" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ value.claimName || '' }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">不含税金额</td>
											<td class="info sticky-xz-2">{{ formatNumber(vehiclePaymentContentObj.claimItemAmountNet) }}</td>
											<td class="info info-plus" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.claimItemAmountNet) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">可抵扣税额</td>
											<td class="info sticky-xz-2">{{ formatNumber(vehiclePaymentContentObj.claimItemTaxAmount) }}</td>
											<td class="info info-plus" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.claimItemTaxAmount) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">含税金额</td>
											<td class="info sticky-xz-2">{{ formatNumber(vehiclePaymentContentObj.claimItemAmountVat) }}</td>
											<td class="info info-plus" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.claimItemAmountVat) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">备注</td>
											<td class="info sticky-xz-2"></td>
											<td class="info info-plus" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ value.remark || '' }}</td>
										</tr>
									</tbody>
								</table>
							</scroll-view>
							<view class="detail-row summary-row" v-if="vehiclePaymentContentList.length > 0">
								<text class="detail-label summary-label">本次小计</text>
								<text
									class="detail-value summary-value">{{ formatNumber(itemDatas.paymentAmount) }}</text>
							</view>
						<!-- </view> -->
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
									<text class="account-info-label">合同名称</text>
									<text class="account-info-value">{{ itemDatas.contractName || '' }}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">普票金额</text>
									<text class="account-info-value">{{ formatNumber(itemDatas.vatoamount) || '' }}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">进项税额</text>
									<text class="account-info-value">{{ formatNumber(itemDatas.invoiceAmountVat) || '' }}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">合同价/审定价</text>
									<text class="account-info-value">{{ formatNumber(itemDatas.contractAmountVat) || '' }}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">合同累计已付款</text>
									<text class="account-info-value"> {{ formatNumber(itemDatas.contractAccumulatedPaid) || '' }} </text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">专票金额(含税)</text>
									<text class="account-info-value"> {{ formatNumber(itemDatas.vatamount) || '' }} </text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">可抵扣票据</text>
									<text class="account-info-value">{{ formatNumber(itemDatas.invoiceAmountNet) || '' }}</text>
								</view>
							</view>
						</view>
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
		ref,
		reactive,
	} from 'vue'
	import {
		FUND_USAGE_STATUS,
		PAYMENT_ACCOUNT_INFORMATION,
		APPROVAL_RECORD,
		ATTACHMENT_LIST,
		currentUrlObj
	} from '@/utils/definitions'
	import http from '@/utils/request.js'
	import {
		formatNumber,totalNestedValue,handleTableTouchMove
	} from '@/utils/h5Bribge'
	import { useListHeight } from '@/utils/useListHeight.js'
	import { useApproval } from '@/utils/useApproval.js'
	import { useDetailCommon } from '@/utils/useDetailCommon.js'
	import InputDialog from '@/components/inputDialog/inputDialog.vue'
	import approvalTimeline from '@/components/approvalTimeline/approvalTimeline.vue'
	import detailNavBar from '@/components/navBar/detailNavBar.vue'

	const requestTypeSel = {
		'QT01': ['claimItemAmountNet','claimItemTaxAmount','claimItemAmountVat'],
	}	
	const currentType = ref('');
	const itemDetail = ref({});
	const itemDatas = ref({});
	const vehiclePaymentContentList = ref([]);
    const vehiclePaymentContentObj = reactive({});
	const stageTags = ref([])
	const attachmentData = ref([])
		const {   
		urlParams, wfstatusText, setOptions, getOptions
	} = useDetailCommon({
		itemDetail,
		currentType,
		itemDatas,
		onDetailOpen: () => {
			getFormDataApproval()
			getApprovalRecord()
		}
	})	
	const { listHeight, computeScrollHeight } = useListHeight();
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
		currentType
	})
	const infoRows = ref([{
			label: '用款部门',
			value: '',
			key: 'companyName'
		},{
			label: '付款单位',
			value: '',
			key: 'paymentCompanyName'
		},{
			label: '付款名称',
			value: '',
			key: 'receivingBankName' 
		},{
			label: '支付金额',
			value: '',
			key: 'paymentAmount'
		},
		{
			label: '收款单位',
			value: '',
			key: 'receivingCompanyName'
		},
		{
			label: '收款开户银行',
			value: '',
			key: 'receivingBankAccountName'
		},
		{
			label: '收款账号',
			value: '',
			key: 'receivingBankAccountNumber'
		},
	]);


	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			let data = res.data?.data || {}
			itemDatas.value = data?.wfrequestregularpayment || {}
			infoRows.value.forEach(item => {
				item.value = (typeof itemDatas.value[item.key] === 'number' || item.key === 'paymentAmount') ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || ''
			})
            let arr = requestTypeSel['QT01'] || []
			if(data?.wfrequestregularpaymentitems){
				 vehiclePaymentContentList.value = data?.wfrequestregularpaymentitems || []
				arr.forEach(item => {
                  vehiclePaymentContentObj[item] = totalNestedValue(vehiclePaymentContentList.value, item)
                })
			}
		
			if(itemDatas.value.companyName){
				 stageTags.value.push(itemDatas.value.companyName)
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
			computeScrollHeight()
		})
	}
	const formatClaimCategory = (value) => {
		const categories = [
			value.claimCategoryNameLv1,
			value.claimCategoryNameLv2,
			value.claimCategoryNameLv3,
			value.claimCategoryName
		].filter((item, index, arr) => item && arr.indexOf(item) === index);
		return categories.join('/') || '';
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
				padding: 20rpx 16rpx 0rpx;
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
		// border-bottom: 2rpx #ddd solid;
	}

	.table2 {
		box-sizing: border-box;
		width: 100%;
		// border: none !important;

		td {
			// border: none !important;
		}
	}

	.table1 .type {
		background: #f6f8fc !important;
		color: #000 !important;
	}
	

	.table1 td {
		box-sizing: border-box;
		// border-left: 2rpx #ddd solid;
		border-top: 2rpx #ddd solid;
		padding: 8px;
		font-size: 12px;
	}

	.table1 .info {
		text-align: right;
		color: #666;
		padding: 8px !important;
		max-width: 350px;
		white-space: normal !important; //合并空白，自动换行
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
		max-width: 76px !important;
		min-width: 76px !important;
		width: 76px;
		box-sizing: border-box;
		background: #fff;
	}

	.table1 td.sticky-xz-2 { 
		position: sticky;  
		left: 76px;  
		z-index: 4;
		background: #fff; 
		border-right: 2rpx #ddd solid;
	}

	.approval-record-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}

	.attachment-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}

	.bordr-none{
		border-top: none !important;
	}
	.bordr-right-none{
		border-right: none !important;
	}
	
</style>