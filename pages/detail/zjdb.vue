<template>
	<view class="detail-page">
		<view class="header-stickt">
			<view class="status_bar" :style="{ height: `${statusBarHeight * 2}rpx` }"></view>
			<uni-nav-bar class="nav-bar-top">
				<template v-slot:left>
					<view class="back-btn" @click="goBack">
					</view>
				</template>
				<view class="nav-title">审批详情</view>
				<template v-slot:right>
					<view style="width: 40rpx"></view>
				</template>
			</uni-nav-bar>
			<view class="hero-card">
				<view class="hero-header">
					<view class="project-name">
						<view class="project-name-1">
							<!-- {{ itemDatas.businessUnitName }} -->
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
								{{  infoRows[6].value }}</text></view>
					</view>
				</view>
				<view class="hero-tags">
					<view class="tag" v-for="(t, i) in stageTags" :key="i">{{ t }}</view>
				</view>
				<view class="hero-actions" v-show="currentType === 'pending'">
					<view class="btn outline" @click="onReject">打回</view>
					<view class="btn primary" @click="onApprove">通过</view>
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
		onMounted,
		nextTick,
		getCurrentInstance,
		computed
	} from 'vue'
	import {
		getStorage
	} from '@/utils/storage'
	import {
		PAYMENT_ACCOUNT_INFORMATION,
		APPROVAL_RECORD
	} from '@/utils/definitions'
	import http from '@/utils/request.js'
	import {
		formatNumber
	} from '@/utils/h5Bribge'
	import InputDialog from '@/components/inputDialog/inputDialog.vue'
	import approvalTimeline from '@/components/approvalTimeline/approvalTimeline.vue'
	
	const statusBarHeight = ref(0)
	let eventChannel
	onLoad(() => {
		const h = getStorage('statusBarHeight')
		if (Number(h)) statusBarHeight.value = Number(h)
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
	const currentUrlObj = reactive({
		pending: '/WF/GetFormDataApproval',
		completed: '/WF/GetFormDataView'
	})
	const inputDialogRef = ref(null)
	const inputDialogRequired = ref(false)
	const inputDialogTitle = ref('')
	const inputDialogPlaceholder = ref('')
	const inputDialogValue = ref('')
	const scrollerHeight = ref('0px')
	const itemDetail = ref({})
	const stageTags = ref([])
	
	const pullDownObj = reactive({
		[PAYMENT_ACCOUNT_INFORMATION]: true,
		[APPROVAL_RECORD]: true,
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
	
	function goBack() {
		uni.navigateBack()
	}
	
	const itemDatas = ref({});
	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			itemDatas.value = res.data?.data?.wfrequestfundtransfer || {}
			infoRows.value.forEach(item => {
				item.value = typeof itemDatas.value[item.key] === 'number' ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || ''
			})
			if(itemDatas.value.toCompanyName){
				 stageTags.value.push(itemDatas.value.toCompanyName)
			}
			
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
			procDefCode: itemDetail.value.procDefCode,
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
	
	const approvalRecordList = ref([])
	const getApprovalRecord = () => {
		http.get('/WF/GetApprovalHistory?', {
			wfinstanceId: itemDetail.value.wfinstanceId,
		}).then(res => {
			console.log(res)
			approvalRecordList.value = res.data || []
		})
	}
	
	function computeScrollHeight() {
		try {
			const {
				windowHeight
			} = uni.getSystemInfoSync()
			const inst = getCurrentInstance()
			const q = uni.createSelectorQuery().in(inst?.proxy)
			
			q.select('.header-stickt').boundingClientRect(data => {
				const headerH = data?.height || 0
				const h = Math.max(0, windowHeight - headerH)
				scrollerHeight.value = `${h}px`
			}).exec()
		} catch (e) {
			scrollerHeight.value = 'calc(100vh - 88rpx)'
		}
	}
	
	onMounted(() => {
		nextTick(() => {
			computeScrollHeight()
		})
		
		const systemInfo = uni.getSystemInfoSync()
		const isIOS = systemInfo.platform === 'ios'
		const isH5 = systemInfo.platform === 'h5' || process.env.UNI_PLATFORM === 'h5'
		
		if (isIOS && isH5) {
			console.log('检测到 iOS H5 环境，添加滚动修复')
			
			document.addEventListener('focusout', () => {
				setTimeout(() => {
					window.scrollTo({
						top: 0,
						left: 0,
						behavior: 'instant'
					})
				}, 20)
			})
		} else {
			window.visualViewport?.addEventListener('resize', onResize)
			window.addEventListener('resize', onResize)
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
					border: 1rpx solid #66ccff;
					padding: 1rpx 12rpx;
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
						min-height: 94rpx;
						height: auto;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 16rpx;
						border-bottom: 1rpx solid #dddddd;
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
</style>