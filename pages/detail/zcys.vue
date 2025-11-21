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
							{{ infoRows?.length > 0 ? infoRows[1].value : '' }}
						</view>
					</view>
					<view class="amount-box">
						<view class="amount-label">申请支付总金额</view>
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
			<view class="section" v-if="paymentContentList.length > 0">
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
						<view class="contract-section">
							<!-- 明细 -->
							<scroll-view scroll-x class="table-scroll-x">
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
										   <td class="type font_w sticky-xz-1">费用类目</td>
										   <td class="type font_w text_right">
                                               金额 
										   </td>
										</tr>
										<tr v-for="(value,index) in paymentContentList" :key="index">
											<td class="text sticky-xz-1">{{ value.itemName || '' }}</td>
											<td class="info">
												{{ formatNumber(value.costVat) }}
											</td>
										</tr>
									</tbody>
								</table>
							</scroll-view>
							<view class="detail-row summary-row">
								<text class="detail-label summary-label">本次用款小计</text>
								<text
									class="detail-value summary-value">{{ formatNumber(paymentContentObj.costVat) }}</text>
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
		PAYMENT_ACCOUNT_INFORMATION,
		APPROVAL_RECORD,
		ATTACHMENT_LIST,
		currentUrlObj
	} from '@/utils/definitions'
	import http from '@/utils/request.js'
	import {
		formatNumber,formatDateTimeMinute,goBack
	} from '@/utils/h5Bribge'
	import InputDialog from '@/components/inputDialog/inputDialog.vue'
	import approvalTimeline from '@/components/approvalTimeline/approvalTimeline.vue'
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
	const requestTypeSel = reactive({
		'ZC01': ['costVat'],
	});
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
	const infoRowsObj = {
		'出租房产服务费':[{
			label: '合同名称',
			value: '',
			key: 'contractName'
		},{
			label: '业务类型',
			value: '',
			key: 'contractTypeName'
		},{
			label: '项目名称/资产名称',
			value: '',
			key: 'contractObjectName' 
		},{
			label: '我方单位',
			value: '',
			key: 'companyName'
		},
		{
			label: '对方单位',
			value: '',
			key: 'contractRelevantParty'
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
		],
		'通行费业务':[{
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
		],
	}
	const infoRows = ref([]);
	// const magicData = ref({
	// 		"id": "015d2b166e1c475bbbc8cfbf1e7ef78c",
	// 		"budgetRequestId": "fe6c78b4b8a64359b2fc82f62b08484e",
	// 		"budgetPeriod": "202511",
	// 		"itemLevel": null,
	// 		"itemStatus": null,
	// 		"isDeleted": null,
	// 		"deleteTime": null,
	// 		"deletedBy": null,
	// 		"deletedByName": null,
	// 		"seqNo": 5,
	// 		"companyId": "9406c8f5e0414ac0a0c16e42743a1008",
	// 		"companyName": "上海长江隧桥建设发展有限公司",
	// 		"businessUnit": "OperationDivision",
	// 		"businessUnitName": "运管中心",
	// 		"budgetItemName": "TEST111",
	// 		"contractNo": "NoContract",
	// 		"contractName": "无合同",
	// 		"contractItemId": null,
	// 		"contractItemName": null,
	// 		"contractTypeCode": "RealEstateRentingService",
	// 		"contractTypeName": "通行费业务",
	// 		"mappingGuid": "c2b9bc823b444d27af0a76e544af0009",
	// 		"contractObjectId": null,
	// 		"contractObjectName": "TEST11",
	// 		"contractRelevantParty": "TEST111",
	// 		"contractPrice": null,
	// 		"contractSettlePrice": null,
	// 		"totalPaid": null,
	// 		"totalPaidRatio": null,
	// 		"totalPaidIncludeCurrent": null,
	// 		"totalPaidIncludeCurrentRatio": 0,
	// 		"actualPaid": null,
	// 		"relatedPeriodFrom": "2025-11-14 00:00:00",
	// 		"relatedPeriodTo": "2025-11-21 00:00:00",
	// 		"currentYearExpectPayment": null,
	// 		"currentYearTotalPaid": null,
	// 		"currentYearTotalPaidRatio": 0,
	// 		"planToPay": 1000,
	// 		"remark": null,
	// 		"isCostConfirmed": true,
	// 		"costConfirmRequestFormNo": "",
	// 		"isInvoiceReceived": true,
	// 		"invoiceReceiveFormNo": null,
	// 		"isPassPreApproval": null,
	// 		"notPassType": null,
	// 		"notPassReason": null,
	// 		"isBalanceMeetingPassed": null,
	// 		"paymentCode": "ZC202511145789494982069",
	// 		"requestFormNo": "支出预算（运管）-20251114003",
	// 		"requestId": "c813661b45194e068461a69d2af01d33",
	// 		"wfinstanceId": "663a74d2121c4150a1abba8d0c47b32c",
	// 		"wfstatus": "Running",
	// 		"approvalResult": "Pending",
	// 		"customizeAttribute": "{\"ToDo\": \"true\", \"Amount\": \"1000.00\", \"isOutBudget\": \"false\", \"ProcessInitiator\": \"sybjbro\", \"isMultipleSections\": \"true\", \"IsFinanceEarlyInvolve\": \"false\", \"IsIncludedMonthBudget\": \"false\"}",
	// 		"messageId": "2e2cc168b94f446aac70332a57258ebd",
	// 		"submittedBy": "sybjbro",
	// 		"submittedByName": "经办人（运管中心）",
	// 		"submittedDate": "2025-11-14 10:22:00",
	// 		"createdBy": "sybjbro",
	// 		"createdByName": "经办人（运管中心）",
	// 		"createdDate": "2025-11-14 10:16:53",
	// 		"lastModifiedBy": "sybjbro",
	// 		"lastModifiedByName": "经办人（运管中心）",
	// 		"lastModifiedDate": "2025-11-14 10:22:00"
	// 	})
	const magicData1 = ref({
			"id": "9ee89869afaf4331bb0ce9a8045c5e3c",
			"budgetRequestId": "fe6c78b4b8a64359b2fc82f62b08484e",
			"budgetPeriod": "202511",
			"itemLevel": null,
			"itemStatus": null,
			"isDeleted": null,
			"deleteTime": null,
			"deletedBy": null,
			"deletedByName": null,
			"seqNo": 5,
			"companyId": "9406c8f5e0414ac0a0c16e42743a1001",
			"companyName": "上海城投环城高速建设发展有限公司",
			"businessUnit": "OperationDivision",
			"businessUnitName": "运管中心",
			"budgetItemName": "第一季度付款ABC",
			"contractNo": "S32-YYYH-7297",
			"contractName": "S32申嘉湖道路运行养护合同（2025年度）",
			"contractItemId": "e24c8f7115704fbfb09e673862b181ec",
			"contractItemName": "第一季度付款",
			"contractTypeCode": "Traffic",
			"contractTypeName": "通行费业务",
			"mappingGuid": "c2b9bc823b444d27af0a76e544af0018",
			"contractObjectId": "f7c7daec-bc70-4704-9f92-d02e888ac21d",
			"contractObjectName": "S32申嘉湖",
			"contractRelevantParty": "上海市市政工程建设发展有限公司",
			"contractPrice": 10000000,
			"contractSettlePrice": 10000000,
			"totalPaid": 0,
			"totalPaidRatio": 0,
			"totalPaidIncludeCurrent": 10000,
			"totalPaidIncludeCurrentRatio": 0.1,
			"actualPaid": null,
			"relatedPeriodFrom": "2025-11-14 00:00:00",
			"relatedPeriodTo": "2025-11-27 00:00:00",
			"currentYearExpectPayment": null,
			"currentYearTotalPaid": 0,
			"currentYearTotalPaidRatio": 0,
			"planToPay": 10000,
			"remark": null,
			"isCostConfirmed": true,
			"costConfirmRequestFormNo": "1",
			"isInvoiceReceived": true,
			"invoiceReceiveFormNo": null,
			"isPassPreApproval": null,
			"notPassType": null,
			"notPassReason": null,
			"isBalanceMeetingPassed": null,
			"paymentCode": "ZC202511145789427483541",
			"requestFormNo": "支出预算（运管）-20251114001",
			"requestId": "027120201cde47c4b7d5c4157e6685af",
			"wfinstanceId": "4ce3104646d9406eb5b889126dc8919f",
			"wfstatus": "Running",
			"approvalResult": "Pending",
			"customizeAttribute": "{\"ToDo\": \"true\", \"Amount\": \"10000.00\", \"isOutBudget\": \"false\", \"ProcessInitiator\": \"sybjbro\", \"isMultipleSections\": \"true\", \"IsFinanceEarlyInvolve\": \"false\", \"IsIncludedMonthBudget\": \"false\"}",
			"messageId": "e6251d461e7d439a8bedb665c5026f79",
			"submittedBy": "sybjbro",
			"submittedByName": "经办人（运管中心）",
			"submittedDate": "2025-11-14 09:46:51",
			"createdBy": "sybjbro",
			"createdByName": "经办人（运管中心）",
			"createdDate": "2025-11-14 09:42:51",
			"lastModifiedBy": "sybjbro",
			"lastModifiedByName": "经办人（运管中心）",
			"lastModifiedDate": "2025-11-14 09:46:51"
		})
	const arrs = ref([{
		"id": "286cfd12cd5f45b1ac858752c0d1c67c",
		"referenceBudgetItemId": "fb90ab5183f042f88a471d4720b041d2",
		"itemId": "RegularMaintainenceEvaluate",
		"itemName": "日常养护费-考核",
		"costVat": 10000,
		"costNet": null,
		"itemLevel": 0,
		"ctroadId": null,
		"roadName": null,
		"seqNo": 0,
		"createdBy": "sybjbro",
		"createdByName": "经办人（运管中心）",
		"createdDate": "2025-11-13 13:14:42",
		"lastModifiedBy": "sybjbro",
		"lastModifiedByName": "经办人（运管中心）",
		"lastModifiedDate": "2025-11-13 13:14:42"
	}]);
	const itemDatas = ref({});
	const paymentContentList = ref([]);
    const paymentContentObj = reactive({});
	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			// let data = res.data?.data || {}
			let data = magicData1.value || {}
			itemDatas.value = data || {}
			infoRows.value = infoRowsObj[itemDatas.value['contractTypeName']];
			infoRows.value.forEach(item => {
				item.value = (typeof itemDatas.value[item.key] === 'number') ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || ''
			    if(item.key == 'relatedPeriodFrom'){
					item.value = formatDateTimeMinute(itemDatas.value[item.key]) || ''
				}
				if(item.key == 'relatedPeriodTo'){
					item.value = formatDateTimeMinute(itemDatas.value[item.key]) || ''
				}
				if(item.key == 'isCostConfirmed'){
					item.value = itemDatas.value[item.key] == true ? '是' : (itemDatas.value[item.key] == false ? '否' : '')
				}
				if(item.key == 'isInvoiceReceived'){
					item.value = itemDatas.value[item.key] == true ? '是' : (itemDatas.value[item.key] == false ? '否' : '')
				}
			})
			if(itemDatas.value.isCostConfirmed){
				let obj = {
					label: '确认成本申请单',
					value: '',
					key: 'costConfirmRequestFormNo'
				};
				obj.value = itemDatas.value.costConfirmRequestFormNo || '';
				infoRows.value.splice(infoRows.value.length - 1, 0, obj);
			}
            let arr = requestTypeSel['ZC01'] || []
			if(arrs.value.length > 0) {
				 paymentContentList.value = arrs.value || []
				arr.forEach(item => {
                  paymentContentObj[item] = totalNestedValue(paymentContentList.value, item)
                })
			}

			if(itemDatas.value.contractTypeName){
				 stageTags.value.push(itemDatas.value.contractTypeName)
			}
			if(itemDatas.value.contractObjectName){
				 stageTags.value.push(itemDatas.value.contractObjectName)
			}

			let arr1 = (itemDatas.value?.attachmentList || []).map(item => {
				return {
					fileTagName: item.fileTagName,
					fileName: item.fileName,
                    fileUrl: item.fileUrl,
					id: item.attachmentId
				}
			})
			attachmentData.value = [
				{fileTagName: '工程付款申请单', children: []}, 
				{fileTagName: '工程费用支付申请表', children: []}, 
				{fileTagName: '合同款支付情况统计表', children: []},
				{fileTagName: '发票', children: []},
				{fileTagName: '财务监理付款意见书', children: []},
				{fileTagName: '其他合同约定需提供资料', children: []},
		    ]
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


    const totalNestedValue = (array,properties) => {
        return array.reduce((accumulator, currentValue) => {
            return accumulator + currentValue[properties];
        }, 0);
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
	const approvalRecordList = ref([])
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