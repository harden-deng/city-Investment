<template>
	<view class="detail-page">
		<view class="header-stickt">
			<detailNavBar></detailNavBar>
			<!-- 顶部蓝卡片 -->
			<view class="hero-card">
				<view class="hero-header">
					<view class="project-name">
						<view class="project-name-1">
							{{ itemDetail.taskName }}
						</view>
						<view class="project-name-1">
							{{ itemDatas.contractName }}
						</view>
					</view>
					<view class="amount-box">
						<view class="amount-label">申请金额</view>
						<view class="amount-value"><text class="amount-value-symbol">¥</text><text
								class="amount-value-number">
								{{ formatNumber(itemDatas.planToPay) }}</text></view>
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
						<text class="info-value">{{ row.value || '--'}}</text>
					</view>
				</view>
			</view>
			<!-- 用款情况 -->
			<view class="section">
				<view class="section-title-2" @click="setOptions(FUND_USAGE_STATUS)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">费用组成</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(FUND_USAGE_STATUS) }">
					</view>
				</view>
				<transition name="collapse">
					<view class="usage-details" v-if="getOptions(FUND_USAGE_STATUS)">
						<!-- 整体合同 -->
						<!-- <view class="contract-section"> -->
							<!-- 明细 -->
							<scroll-view scroll-x class="table-scroll-x" @touchmove.stop="handleTableTouchMove">
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
										   <td class="type font_w sticky-xz-1 bordr-none">费用类目</td>
										   <td class="type font_w text_right bordr-none bordr-right-none" :class="{'sticky-xz-2': key == null}" v-for="[key,value] of paymentContentListPlus" :key="key">
											  {{ key == null ? '合计' : key || '' }}
										   </td>
										</tr>
										<tr v-for="(itemer, indexer) in paymentContentList" :key="indexer">
											<td class="text sticky-xz-1" :class="{'bordr-none': indexer == 0}">{{ itemer.title || '' }}</td>
											<td class="info" :class="{'sticky-xz-2': indexs == 0,'bordr-none': indexer == 0}" v-for="(item,indexs) in itemer.children" :key="indexs">
												{{ formatNumber(item.value) }}
											</td>
										</tr>
									</tbody>
								</table>
							</scroll-view>
							<view class="detail-row summary-row">
								<text class="detail-label summary-label">本次小计</text>
								<text
									class="detail-value summary-value">{{ formatNumber(itemDatas.planToPay) }}</text>
							</view>
						<!-- </view> -->
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
		ref,
	} from 'vue'
	import {
		FUND_USAGE_STATUS,
		APPROVAL_RECORD,
		ATTACHMENT_LIST,
		currentUrlObj,
		infoRowsArray
	} from '@/utils/definitions'
	import http from '@/utils/request.js'
	import {
		formatNumber,formatDateTimeMinute,flatToTree,handleTableTouchMove,processAttachmentData
	} from '@/utils/h5Bribge'
	import { useListHeight } from '@/utils/useListHeight.js'
	import { useApproval } from '@/utils/useApproval.js'
	import { useDetailCommon } from '@/utils/useDetailCommon.js'
	import InputDialog from '@/components/inputDialog/inputDialog.vue'
	import approvalTimeline from '@/components/approvalTimeline/approvalTimeline.vue'
	import detailNavBar from '@/components/navBar/detailNavBar.vue'

	const currentType = ref('')
	const itemDetail = ref({})
	const itemDatas = ref({});
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
	const infoRows = ref( [{
		label: '合同名称',
		value: '',
		key: 'contractName'
	},{
		label: '合同编号',
		value: '',
		key: 'contractNo'
	},{
		label: '业务类型',
		value: '',
		key: 'contractTypeName'
	},{
		label: '项目名称/资产名称',
		value: '',
		key: 'contractObjectName' 
	},
	{
		label: '对方单位',
		value: '',
		key: 'contractRelevantParty'
	},
	{
		label: '合同价（含税）',
		value: '',
		key: 'contractPrice'
	},
	{
		label: '合同支付子项',
		value: '',
		key: 'contractItemName'
	},
	{
		label: '预算事项',
		value: '',
		key: 'budgetItemName'
	},
	{
		label: '本月预计支出',
		value: '',
		key: 'planToPay'
	},
	{
		label: '款项对应开始日期',
		value: '',
		key: 'relatedPeriodFrom'
	},
	{
		label: '款项对应结束日期',
		value: '',
		key: 'relatedPeriodTo'
	},
	{
		label: '是否已确认成本',
		value: '',
		key: 'isCostConfirmed'
	},
	{
		label: '发票是否已收讫',
		value: '',
		key: 'isInvoiceReceived'
	},
	]);
	const paymentContentList = ref({});
	const paymentContentListPlus = ref({});
    // 优化后：使用映射表
	const fieldFormatters = {
		'relatedPeriodFrom': (val) => formatDateTimeMinute(val) || '',
		'relatedPeriodTo': (val) => formatDateTimeMinute(val) || '',
		'isCostConfirmed': (val) => val === true ? '是' : (val === false ? '否' : ''),
		'isInvoiceReceived': (val) => val === true ? '是' : (val === false ? '否' : '')
	};
	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			let data = res.data || {}
			itemDatas.value = data.entity || {}
			infoRows.value = itemDatas.value.contractNo == 'NoContract' ? infoRowsArray[1] : infoRowsArray[0]
			infoRows.value.forEach(item => {
				const rawValue = itemDatas.value[item.key];
				if (fieldFormatters[item.key]) {
					item.value = fieldFormatters[item.key](rawValue);
				} else {
					item.value = (typeof rawValue === 'number') ? formatNumber(rawValue) : rawValue || '';
				}
			});
			if(itemDatas.value.isCostConfirmed){
				let obj = {
					label: '确认成本申请单',
					value: '',
					key: 'costConfirmRequestFormNo'
				};
				obj.value = itemDatas.value.costConfirmRequestFormNo || '';
				infoRows.value.splice(infoRows.value.length - 1, 0, obj);
			}
			if(data?.items?.length > 0) {	
				let treeList = flatToTree(data?.items || [], 'itemName')
				let treeListPlus = flatToTree(data?.items || [], 'roadName')
				//  let arr1 = [];
				//  for(let [key,value] of treeList){
				// 	let arr2 = [];
				// 	for(let [key2,value2] of treeListPlus){
				// 		arr2.push({title: key2, value: null})
				// 	}
				// 	arr1.push({title:key, children: arr2})
				//  };
				//  arr1.forEach(item1 => {
				// 	item1.children.forEach(item2 => {
				// 		item2.value = data?.items.filter(item => item.itemName === item1.title && item.roadName === item2.title)[0]?.costVat || null
				// 	})
				//  })
				
				// 优化：使用 Map 建立 (itemName, roadName) -> costVat 的映射
				const costVatMap = new Map();
				data.items.forEach(item => {
					const mapKey = `${item.itemName}|${item.roadName}`;
					costVatMap.set(mapKey, item.costVat);
				});
				let paymentContentArray = [];
				for(let [key, value] of treeList){
					let arr2 = [];
					for(let [key2, value2] of treeListPlus){
						// 优化：直接从 Map 中查找，O(1) 时间复杂度
						const mapKey = `${key}|${key2}`;
						arr2.push({
							title: key2, 
							value: costVatMap.get(mapKey) || null
						});
					}
					paymentContentArray.push({title: key, children: arr2});
				}
				 paymentContentList.value = paymentContentArray;
				 paymentContentListPlus.value = treeListPlus;
			}
			stageTags.value = [];
			if(itemDatas.value.contractTypeName){
				 stageTags.value.push(itemDatas.value.contractTypeName)
			}
			attachmentData.value = processAttachmentData(data?.attachmentList || [], ['工程付款申请单','工程费用支付申请表','合同款支付情况统计表','发票','财务监理付款意见书','其他合同约定需提供资料'])
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
		color: #000;
	}

	.table1 td {
		box-sizing: border-box;
		// border-left: 2rpx #ddd solid;
		border-top: 2rpx #ddd solid;
		padding: 8px;
		font-size: 12px;
	}

	.bordr-none{
		border-top: none !important;
	}
	.bordr-bottom-none{
		border-bottom: none !important;
	}
	.bordr-right-none{
		border-right: none !important;
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

	.table1 td.sticky-xz-1 { position: sticky; left: 0; top: 0; z-index: 3;max-width: 110px !important;min-width: 110px !important;width: 110px !important;background: #fff;}
	.table1 td.sticky-xz-2 { position: sticky; left: 110px;  z-index: 4;background: #fff;border-right: 2rpx #ddd solid; }
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