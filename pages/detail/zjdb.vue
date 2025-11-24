<template>
	<view class="detail-page">
		<view class="header-stickt">
			<detailNavBar></detailNavBar>
			<view class="hero-card">
				<view class="hero-header">
					<view class="project-name">
						<view class="project-name-1">
							{{ itemDetail.taskName }}
						</view>
						<view class="project-name-1">
							上海城投公路投资（集团）有限公司
						</view>
					</view>
					<view class="amount-box">
						<view class="amount-label">调拨金额</view>
						<view class="amount-value"><text class="amount-value-symbol">¥</text><text
								class="amount-value-number">
								{{  formatNumber(itemDatas.transferAmount) }}</text></view>
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
			<view class="section">
				<view class="section-title">
					<text class="section-title-vertical"></text>
					<text class="section-title-text">基本信息</text>
				</view>
				<view class="account-info-section" v-if="getOptions(PAYMENT_ACCOUNT_INFORMATION)">
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
							<view class="account-info-row">
								<text class="account-info-label">{{ infoRows[2].label }}</text>
								<text class="account-info-value">{{ infoRows[2].value }} </text>
							</view>
						</view>
					</view>
					<view class="account-card margin_1">
						<view class="account-info-block">
							<view class="account-info-row">
								<text class="account-info-label">{{ infoRows[3].label }}</text>
								<text class="account-info-value">{{ infoRows[3].value }}</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">{{ infoRows[4].label }}</text>
								<text class="account-info-value">{{ infoRows[4].value }}</text>
							</view>
							<view class="account-info-row">
								<text class="account-info-label">{{ infoRows[5].label }}</text>
								<text class="account-info-value">{{ infoRows[5].value }} </text>
							</view>
						</view>
					</view>
					<view class="account-card margin_1">
						<view class="account-info-block">
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
		reactive,
		getCurrentInstance,
		computed
	} from 'vue'
	import {
		PAYMENT_ACCOUNT_INFORMATION,
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
	const itemDetail = ref({})
	const stageTags = ref([])
	const attachmentData = ref([])
	const wfstatusText = computed(() => {
		return itemDatas.value.wfstatus == 'Running' ? '流转中' : (itemDatas.value.wfstatus == 'Completed' ? '已审批' : '')
	})
	const { listHeight } = useListHeight({
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
	const pullDownObj = reactive({
		[PAYMENT_ACCOUNT_INFORMATION]: true,
		[APPROVAL_RECORD]: true,
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
			label: '付款单位',
			value: '',
			key: 'fromCompanyName'
		},{
			label: '付款开户行',
			value: '',
			key: 'fromBankName'
		},{
			label: '付款账号',
			value: '',
			key: 'fromAccountNumber' 
		},
		{
			label: '收款单位',
			value: '',
			key: 'toCompanyName'
		},
		{
			label: '收款开户行',
			value: '',
			key: 'toBankName'
		},
		{
			label: '收款账号',
			value: '',
			key: 'toAccountNumber'
		},
		{
			label: '调拨金额',
			value: '',
			key: 'transferAmount'
		},
		{
			label: '调拨事项',
			value: '',
			key: 'content'
		}
	])
	
	const itemDatas = ref({});
	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			let data = res.data?.data || {}
			itemDatas.value = data?.wfrequestfundtransfer || {}
			infoRows.value.forEach(item => {
				item.value = typeof itemDatas.value[item.key] === 'number' ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || ''
			})
			if(itemDatas.value.toCompanyName){
				 stageTags.value.push(itemDatas.value.toCompanyName)
			}
			
			let arr1 = (data?.attachments || []).map(item => {
				return {
					fileTagName: item.fileTagName,
					fileName: item.fileName,
                    fileUrl: item.fileUrl,
					id: item.attachmentId
				}
			})
			attachmentData.value = [{fileTagName: '其他', children: []}]
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
	
	.approval-record-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}

	.attachment-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}
</style>