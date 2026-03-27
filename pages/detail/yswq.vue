<template>
	<view class="detail-page">
		<view class="header-stickt">
			<detailNavBar></detailNavBar>
			<!-- 顶部蓝卡片 -->
			<detailCard
                :title="itemDetail.taskName || '预算外事项提请付款申请表'"
                :sub-title="itemDatas.contractName"
                amount-label="申请金额"
                :amount-text="formatNumber(itemDatas.confirmedCostAmountVat)"
                :tags="stageTags"
                :show-action-buttons="currentType === 'pending'"
                :show-status-text="currentType === 'completed' && (itemDatas.wfstatus == 'Running' || itemDatas.wfstatus == 'Completed')"
                :status-text="wfstatusText"
                @reject="onReject"
                @approve="onApprove"
            ></detailCard>
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
            <!-- 确认成本信息 -->
			<!-- <view class="section">
				<view class="section-title-2" @click="setOptions(PAYMENT_ACCOUNT_INFORMATION)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">确认成本信息</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(PAYMENT_ACCOUNT_INFORMATION) }">

					</view>
				</view>
				<transition name="collapse">
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
			</view> -->

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
			<view style="height: 1.8116rpx;"></view>
		</scroll-view>
		<InputDialog ref="inputDialogRef" :required="inputDialogRequired" :title="inputDialogTitle"
			:placeholder="inputDialogPlaceholder" @confirm="handleInputConfirm" @cancel="handleInputCancel">
		</InputDialog>
	</view>
</template>

<script setup>
	import {
		ref,
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
		formatNumber,formatDateTimeMinute,handleTableTouchMove,processAttachmentData
	} from '@/utils/h5Bridge'
	import { useListHeight } from '@/utils/useListHeight.js'
	import { useApproval } from '@/utils/useApproval.js'
	import { useDetailCommon } from '@/utils/useDetailCommon.js'
	import detailNavBar from '@/components/navBar/detailNavBar.vue'
    import detailCard from '@/components/detailCard/detailCard.vue'
	import InputDialog from '@/components/inputDialog/inputDialog.vue'
	import approvalTimeline from '@/components/approvalTimeline/approvalTimeline.vue'
	import attachmentList from '@/components/attachmentList/attachmentList.vue'

	const currentType = ref('')
	const itemDetail = ref({})
	const itemDatas = ref({})
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
			label: '经办人',
			value: '',
			key: 'ApplicantName'
		},{
			label: '填报单位',
			value: '',
			key: 'BusinessUnit'
		},
		{
			label: '付款公司',
			value: '',
			key: 'FromCompanyID' 
		},
		{
			label: '项目名称',
			value: '',
			key: 'CTProjectID'
		},{
			label: '合同编号',
			value: '',
			key: 'ContractNo' 
		},{
			label: '合同价格',
			value: '',
			key: 'ContractPrice'
		},{
			label: '申请付款额',
			value: '',
			key: 'RequestPaymentAmount'
		},{
			label: '未列入预算原因',
			value: '',
			key: 'OutBudgetReason'
		},{
			label: '急需支付理由',
			value: '',
			key: 'UrgentReason'
		},{
			label: '收款单位名称',
			value: '',
			key: 'ToCompanyName'
		},{
			label: '收款单位开户行',
			value: '',
			key: 'ToBankName'
		},{
			label: '收款单位账户名',
			value: '',
			key: 'ToBankAccountName'
		},{
			label: '收款银行账号',
			value: '',
			key: 'ToAccountNumber'
		},{
			label: '备注',
			value: '',
			key: 'Remark'
		}
	])

    
	// const infoRows2 = ref([{
	// 		label: '发票号',
	// 		value: '',
	// 		key: 'invoiceId'
	// 	},{
	// 		label: '专票含税金额',
	// 		value: '',
	// 		key: 'invoiceAmountVat'
	// 	},
		
	// 	{
	// 		label: '专票不含税金额',
	// 		value: '',
	// 		key: 'invoiceAmountNet'
	// 	},
	// 	{
	// 		label: '专票税额',
	// 		value: '',
	// 		key: 'invoiceAmountTax' 
	// 	},{
	// 		label: '普票金额',
	// 		value: '',
	// 		key: 'invoiceAmountVato'
	// 	}
	// ])

	
	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			let data = res.data?.data || {}
			itemDatas.value = data || {}
			infoRows.value.forEach(item => {
				item.value = typeof itemDatas.value[item.key] === 'number' ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key]
                // if(item.key == 'invoiceReceived' && [0,1].includes(itemDatas.value[item.key])){
				// 	item.value = itemDatas.value[item.key] == 0 ? '否' : '是'
				// }
			});

			// infoRows2.value.forEach(item => {
			// 	item.value = (typeof itemDatas.value[item.key] === 'number') ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key];
			// });

	
			if(itemDatas.value.businessUnitName){
				 stageTags.value.push(itemDatas.value.businessUnitName)
			}
			attachmentData.value = processAttachmentData(itemDatas.value?.attachmentList || [], ['合同','发票/收据','合同要求其他资料','其他'])
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
			padding: 14.4928rpx 28.9856rpx 0;
			background: #2d4ec8;
			min-height: 200rpx;
			color: #fff;
			position: relative;
			z-index: 9;

			.hero-header {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				margin-bottom: 14.4928rpx;
			}

			.project-name {
				width: 60%;
				font-size: 21.7392rpx;
				color: #fff;

				.project-name-1 {
					display: flex;
					align-items: center;
					word-wrap: break-word;
					word-break: break-all;
					white-space: normal;
					line-height: 1.4;
					/* 如果需要最小高度，使用 min-height */
				}
			}

			.amount-box {
				text-align: right;
				// border: 1px solid red;

				.amount-label {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					word-wrap: break-word;
					word-break: break-all;
					white-space: normal;
					height: 65.2176rpx;
					font-size: 21.7392rpx;
					color: #99ccff;
					text-align: right;
				}

				.amount-value {
					height: 65.2175rpx;
					display: flex;
					align-items: center;

					.amount-value-symbol {
						font-size: 21.7392rpx;
						color: #ffffff;
						margin-right: 10rpx;
					}

					.amount-value-number {
						font-size: 32.609rpx;
						color: #ffd615;
						font-weight: bold;
					}
				}
			}



			.hero-tags {
				width: calc(100% - 326.07rpx);
				height: 65.2176rpx;
				overflow: hidden;
				display: flex;
				align-items: center;
				gap: 14.4928rpx;
				flex-wrap: nowrap;

				.tag {
					box-sizing: border-box;
					height: 36.232rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border: 1.8116rpx solid #66ccff;
					padding: 1.8116rpx 12rpx;
					border-radius: 8rpx;
					font-size: 18rpx;
					color: #66ccff;
					white-space: nowrap;
				}
				&.hero-tags-width {
					width: calc(100% - 180rpx);
				}
			}

		.wfstatus-actions {
                position: absolute;
                bottom: 12rpx;
                right: 36rpx;
				width: 120rpx;
				height: 42rpx;
				border: 1.8116rpx solid #66ccff;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: center;
			
				border-radius: 25rpx;
				font-size: 21.7392rpx;
				color: #66ccff;
				white-space: nowrap;
               
            }

			.hero-actions {
				position: absolute;
				bottom: 0;
				right: 0;
				width: 326.07rpx;
				height: 65.2175rpx;
				background: url('../../static/images/bg_1@2x.jpg') left center no-repeat;
				background-size: cover;
				margin-top: 18rpx;
				display: flex;
				justify-content: flex-end;
			}
	

			.btn {
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 21.7392rpx;
				color: #fff;
			}

			.btn.primary {
				box-sizing: border-box;
				width: 126.84rpx;
				background: #3e65f6;
			}

			.btn.outline {
				box-sizing: border-box;
				border-top-left-radius: 15rpx;
				width: 126.84rpx;
				background: #6699ff;
			}
		}

		.section {
			background: #fff;
			border-radius: 14.4928rpx;
			margin-bottom: 36.232rpx;
		}

		.section-title {
			height: 72.464rpx;
			padding: 14.4928rpx 28.9856rpx;
			display: flex;
			align-items: center;
			gap: 18.116rpx;

			.section-title-vertical {
				box-sizing: border-box;
				width: 8rpx;
				height: 28.9856rpx;
				background: #3d65f5;
			}

			.section-title-text {
				font-size: 25.3624rpx;
				color: #000000;
				font-weight: bold;

			}
		}

		.section-title-2 {
			height: 72.464rpx;
			padding: 14.4928rpx 28.9856rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.section-title-2-left {
				display: flex;
				align-items: center;
				gap: 18.116rpx;

				.section-title-vertical {
					box-sizing: border-box;
					width: 8rpx;
					height: 28.9856rpx;
					background: #3d65f5;
				}

				.section-title-text {
					font-size: 25.3624rpx;
					color: #000000;
					font-weight: bold;

				}
			}

			.section-title-2-right {
				width: 112rpx;
				height: 112rpx;
				background: url('../../static/images/c2.png') center center no-repeat;
				background-size: 21.7392rpx;
				margin-right: -31rpx;
				transition: transform 0.3s ease;

				&.active {
					background: url('../../static/images/c2.png') center center no-repeat !important;
					background-size: 21.7392rpx !important;
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
			padding: 0 28.9856rpx 18.116rpx;
		}

		.info-item {
			display: flex;
			align-items: flex-start;
			padding: 8rpx 0;
			flex-wrap: wrap;
		}

		.info-item:last-child {
			border-bottom: none;
		}

		.info-label {
			min-width: 120rpx;
			width: fit-content;
			padding-right: 10rpx;
			line-height: 36.232rpx;
			font-size: 21.7392rpx;
			color: #000;
			white-space: nowrap;
		}

		.info-value {
			flex: 1;
			font-size: 21.7392rpx;
			color: #666;
			line-height: 36.232rpx;
			text-align: right;	
			white-space: normal;
			word-break: break-all;
			word-wrap: break-word;
		}

		// 用款情况样式
		.usage-details {
			padding: 0 28.9856rpx 36.232rpx;
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
		// border-bottom: 1.8116rpx #ddd solid;
		border-top: 1.8116rpx #ddd solid;
	}

	.table1 .type {
		background: #f6f8fc !important;
		color: #000;
	}

	.table1 td {
		box-sizing: border-box;
		// border-left: 1.8116rpx #ddd solid;
		// border-top: 1.8116rpx #ddd solid;
		border-bottom: 1.8116rpx #ddd solid;
		border-right: 1.8116rpx #ddd solid;
		padding: 14.4928rpx;
		font-size: 21.7392rpx;
	}

	.table1 .info {
		text-align: right;
		color: #666;
		padding: 8px !important;
		max-width: 700rpx;
		white-space: normal !important; //合并空白，自动换行
		word-break: break-all; //断字：打破一切；
		word-wrap: break-word;
	
	}

	/* 防止单元格换行挤压变形，可按需保留或去掉 */
	.table1 .info,
	.table1 .type {
		white-space: nowrap;
	}

	/* 需要给表格的前几列设置 sticky 和 left 偏移，按你的列宽自行调整 */
	.table1 td.sticky-xz-1 { position: sticky; left: 0; top: 0; z-index: 3;	max-width: 352rpx !important;
		min-width: 352rpx !important;width: 352rpx !important; border-left: 1.8116rpx #ddd solid;box-sizing: border-box;background: #fff;}

	/* 审批记录独立样式区域 */
	.approval-record-section {
		padding: 18.116rpx 28.9856rpx 36.232rpx;
		position: relative;
	}
	.attachment-section {
		padding: 18.116rpx 28.9856rpx 36.232rpx;
		position: relative;
	}
</style>