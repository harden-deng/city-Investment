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
							{{ itemDetail.taskName }}
						</view>
						<view class="project-name-1">
							{{ itemDatas.companyName }}
						</view>
					</view>
					<view class="amount-box">
						<view class="amount-label">申请支付总金额</view>
						<view class="amount-value"><text class="amount-value-symbol">¥</text><text
								class="amount-value-number">
								{{ formatNumber(itemDatas.paymentAmount) }}</text></view>
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
				<view class="info-list">
					<view class="info-item" v-for="(row, idx) in infoRows" :key="idx">
						<text class="info-label">{{ row.label }}</text>
						<text class="info-value">{{ row.value || '--'}}</text>
					</view>
					<view class="info-item" v-if="itemDatas.requestType === 'Travel' || itemDatas.requestType === 'GnE'">
						<text class="info-label info-label-width">预算栏目</text>
						<text class="info-value">{{ itemDatas.budgetCategoryName || '--' }}</text>
					</view>
					
					<view class="info-item" v-if="itemDatas.requestType === 'GnE'">
						<text class="info-label">招待方式</text>
						<text class="info-value">{{ vehiclePaymentContentList[0]?.gnEtype?.replace('|',',') || '--' }}</text>
					</view>
					<view class="info-item" v-if="itemDatas.requestType === 'GnE'">
						<text class="info-label">内容</text>
						<text class="info-value">{{ vehiclePaymentContentList[0]?.content || '--' }}</text>
					</view>
					<view class="info-item" v-if="itemDatas.requestType === 'Vehicle'">
						<text class="info-label">内容</text>
						<text class="info-value">{{ itemDatas.content || '--' }}</text>
					</view>
					<view class="usage-details" v-if="itemDatas.requestType === 'GnE'" style="padding: 0;">
					     <view class="detail-row summary-row" style="padding: 20rpx 0 20rpx;">
								<text class="detail-label summary-label">本次用款小计</text>
								<text class="detail-value summary-value">{{ formatNumber(itemDatas.paymentAmount) }}</text>
						 </view>
					</view>
				</view>
			</view>

			<view class="section" v-if="vehiclePaymentContentList.length > 0 &&itemDatas.requestType != 'GnE'">
				<view class="section-title-2" @click="setOptions(FUND_USAGE_STATUS)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">用款情况</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(FUND_USAGE_STATUS) }">
					</view>
				</view>
				<transition name="collapse">
					<view class="usage-details" v-if="getOptions(FUND_USAGE_STATUS)">
						<view class="contract-section">
							<scroll-view scroll-x class="table-scroll-x" v-if="vehiclePaymentContentList.length > 1&&itemDatas.requestType === 'Vehicle'">
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
										   <td class="type font_w sticky-xz-1 bordr-none">{{ infoRows[0].value.slice(0,-3)}}明细</td>
                                           <td class="type font_w text_right sticky-xz-2 bordr-none" >合计</td> 
										   <!-- <td class="type font_w text_right bordr-none" >合1计</td> 
										   <td class="type font_w text_right bordr-none" >合2计</td> 
										   <td class="type font_w text_right bordr-none" >合3计</td>  -->
										   <td class="type font_w text_right bordr-none" v-for="(value,index) in itemDatas.vehiclePlateNo.split(';')" :key="index">
												{{ value || '' }}</td>
										</tr>
										<tr>
											<td class="text sticky-xz-1 bordr-none">ETC充值</td>
											<td class="info sticky-xz-2 bordr-none" >{{ formatNumber(vehiclePaymentContentObj.etc) }}</td> 
											<td class="info bordr-none" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.etc) }}</td>
										</tr>
										<tr>
											<td class="text sticky-xz-1">停车费</td>
											<td class="info sticky-xz-2" >{{ formatNumber(vehiclePaymentContentObj.parking) }}</td> 
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.parking) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">过路费</td>
											<td class="info sticky-xz-2" >{{ formatNumber(vehiclePaymentContentObj.toll) }}</td> 
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.toll) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">加油费</td>
											<td class="info sticky-xz-2" >{{ formatNumber(vehiclePaymentContentObj.fuel) }}</td> 
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.fuel) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">修理费</td>
											<td class="info sticky-xz-2" >{{ formatNumber(vehiclePaymentContentObj.repair) }}</td> 
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.repair) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">保险费</td>
											<td class="info sticky-xz-2" >{{ formatNumber(vehiclePaymentContentObj.insurance) }}</td> 
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.insurance) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">租车费</td>
											<td class="info sticky-xz-2" >{{ formatNumber(vehiclePaymentContentObj.renting) }}</td> 
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.renting) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">洗车费</td>
											<td class="info sticky-xz-2" >{{ formatNumber(vehiclePaymentContentObj.wash) }}</td> 
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.wash) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">其他</td>
											<td class="info sticky-xz-2" >{{ formatNumber(vehiclePaymentContentObj.others) }}</td> 
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.others) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">合计</td>
											<td class="info sticky-xz-2" >{{ formatNumber(vehiclePaymentContentObj.total) }}</td> 
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.total) }}</td>
										</tr>
									</tbody>
								</table>
							</scroll-view>
							<scroll-view scroll-x class="table-scroll-x" v-if="vehiclePaymentContentList.length > 0&&itemDatas.requestType === 'Travel'">
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
										   <td class="type font_w sticky-xz-1 bordr-none">{{ infoRows[0].value.slice(0,-3)}}明细</td>
										   <td class="type font_w text_right bordr-none" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												</td>
										</tr>
										<tr>
											<td class="text sticky-xz-1 bordr-none">出差人数</td>
											<td class="info bordr-none" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.travelPeopleCount) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1 bordr-none">出差天数</td>
											<td class="info bordr-none" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.travelDays) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1 bordr-none">交通方式</td>
											<td class="info bordr-none" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ value.transportationMethod?.replace('|',',') || '--' }}</td>
										</tr>
                              
                                         <tr>
											<td class="text sticky-xz-1 bordr-none">内容</td>
											<td class="info bordr-none" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ value.content }}</td>
										</tr>
									</tbody>
								</table>
								<view style="width: 100%;border-bottom: 2rpx dashed #ddd;margin: 10rpx 0;"></view>
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
											<td class="text sticky-xz-1 bordr-none">交通费</td>
											<td class="info bordr-none" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.travelExpense) }}</td>
										</tr>
										<tr>
											<td class="text sticky-xz-1 bordr-none">住宿费</td>
											<td class="info bordr-none" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.accommodationFee) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1 bordr-none">误餐费</td>
											<td class="info bordr-none" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.missedMealFee) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1 bordr-none">会务费</td>
											<td class="info bordr-none" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.meetingExpense) }}</td>
										</tr>
                               
									</tbody>
								</table>
							</scroll-view>
							<view class="detail-row summary-row" v-if="vehiclePaymentContentList.length > 0 &&itemDatas.requestType != 'GnE'">
								<text class="detail-label summary-label">本次用款小计</text>
								<text
									class="detail-value summary-value">{{ formatNumber(itemDatas.paymentAmount) }}</text>
							</view>
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
		FUND_USAGE_STATUS,
		PAYMENT_ACCOUNT_INFORMATION,
		APPROVAL_RECORD,
		ATTACHMENT_LIST
	} from '@/utils/definitions'
	import http from '@/utils/request.js'
	import {
		formatNumber
	} from '@/utils/h5Bribge'
	import InputDialog from '@/components/inputDialog/inputDialog.vue'
	import approvalTimeline from '@/components/approvalTimeline/approvalTimeline.vue'
	import attachmentList from '@/components/attachmentList/attachmentList.vue'
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
	const requestTypeObj = reactive({
		'Vehicle': '公务用车报销单',
		'GnE': '业务招待报销单',
		'Travel': '差旅报销单',
	})
	const requestTypeSel = reactive({
		'Vehicle': ['etc', 'parking', 'toll', 'fuel', 'repair', 'insurance', 'renting', 'wash', 'others'],
		'GnE': ['gnEtype','content'],
		'Travel': ['travelExpense', 'accommodationFee', 'missedMealFee', 'meetingExpense', 'travelPeopleCount', 'travelDays','transportationMethod','content'],
	})
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
	
	const infoRows = ref([{
			label: '报销类型',
			value: '',
			key: 'requestType'
		},{
			label: '付款单位',
			value: '',
			key: 'paymentCompanyName'
		},{
			label: '报销金额',
			value: '',
			key: 'claimAmount' 
		},{
			label: '支付金额',
			value: '',
			key: 'paymentAmount'
		},
		{
			label: '用款部门',
			value: '',
			key: 'companyName'
		},
		{
			label: '收款名称',
			value: '',
			key: 'receivingBankName'
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
	])
	
	function goBack() {
		uni.navigateBack()
	}
	// let cccc = reactive({
	// 	createdBy:"super",
	// 	createdByName:"super",
	// 	createdDate:"2025-08-12 13:56:38",
	// 	etc:100,
	// 	fuel:100,
	// 	id:51,
	// 	insurance:0,
	// 	lastModifiedBy:"super",
	// 	lastModifiedByName:"super",
	// 	lastModifiedDate:"2025-08-12 13:56:38",
	// 	others:0,
	// 	parking:0,
	// 	renting:0,
	// 	repair:0,
	// 	requestId:"49fe229246214a05b3ae508dcc4568c4",
	// 	seqNo:1,
	// 	toll:0,
	// 	vehiclePlateNo:"沪AK741211",
	// 	wash:0
	// })
	// let cccc3 = reactive({
	// 	createdBy:"super",
	// 	createdByName:"super",
	// 	createdDate:"2025-08-12 13:56:38",
	// 	etc:100,
	// 	fuel:100,
	// 	id:53,
	// 	insurance:0,
	// 	lastModifiedBy:"super",
	// 	lastModifiedByName:"super",
	// 	lastModifiedDate:"2025-08-12 13:56:38",
	// 	others:0,
	// 	parking:0,
	// 	renting:0,
	// 	repair:0,
	// 	requestId:"49fe229246214a05b3ae508dcc4568c4",
	// 	seqNo:1,
	// 	toll:0,
	// 	vehiclePlateNo:"沪AK741211",
	// 	wash:0
	// })
	// let cccc4 = reactive({
	// 	createdBy:"super",
	// 	createdByName:"super",
	// 	createdDate:"2025-08-12 13:56:38",
	// 	etc:100,
	// 	fuel:100,
	// 	id:54,
	// 	insurance:0,
	// 	lastModifiedBy:"super",
	// 	lastModifiedByName:"super",
	// 	lastModifiedDate:"2025-08-12 13:56:38",
	// 	others:0,
	// 	parking:0,
	// 	renting:0,
	// 	repair:0,
	// 	requestId:"49fe229246214a05b3ae508dcc4568c4",
	// 	seqNo:1,
	// 	toll:0,
	// 	vehiclePlateNo:"沪AK741211",
	// 	wash:0
	// })
	// let cccc5 = reactive({
	// 	createdBy:"super",
	// 	createdByName:"super",
	// 	createdDate:"2025-08-12 13:56:38",
	// 	etc:100,
	// 	fuel:100,
	// 	id:55,
	// 	insurance:0,
	// 	lastModifiedBy:"super",
	// 	lastModifiedByName:"super",
	// 	lastModifiedDate:"2025-08-12 13:56:38",
	// 	others:0,
	// 	parking:0,
	// 	renting:0,
	// 	repair:0,
	// 	requestId:"49fe229246214a05b3ae508dcc4568c4",
	// 	seqNo:1,
	// 	toll:0,
	// 	vehiclePlateNo:"沪AK741211",
	// 	wash:0
	// })
	const itemDatas = ref({});
	const vehiclePaymentContentList = ref([]);
    const vehiclePaymentContentObj = reactive({});
	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			let data = res.data?.data || {}
			itemDatas.value = data.wfrequestexpenseclaim || {}
			
			infoRows.value.forEach(item => {
				item.value = (typeof itemDatas.value[item.key] === 'number' || item.key === 'claimAmount' || item.key === 'paymentAmount') ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || ''
			})
            if(infoRows.value[0].value) {
                infoRows.value[0].value = requestTypeObj[infoRows.value[0].value] || ''
            }
            let arr = requestTypeSel[itemDatas.value.requestType] || []
			if(data.wfrequestexpenseclaimvehicleitems){
				 vehiclePaymentContentList.value = data.wfrequestexpenseclaimvehicleitems || []
				//  if(itemDatas.value.requestType === 'Vehicle'){
				// 	vehiclePaymentContentList.value.unshift({...cccc}) 
				//     vehiclePaymentContentList.value.unshift({...cccc3})
				//     vehiclePaymentContentList.value.unshift({...cccc4})
				//     vehiclePaymentContentList.value.unshift({...cccc5})
				//  }
			
				 vehiclePaymentContentList.value.forEach(item => {
					item.total = sumNestedProperties(item, arr);
				 }) 
				arr.forEach(item => {
                  vehiclePaymentContentObj[item] = totalNestedValue(vehiclePaymentContentList.value, item)
                })
			}
			if(itemDatas.value.requestType === 'Travel'){
				arr.forEach(item => {
                  vehiclePaymentContentObj[item] = itemDatas.value[item] || 0
                })
			}
			if(itemDatas.value.requestType === 'GnE'){
				arr.forEach(item => {
                  vehiclePaymentContentObj[item] = itemDatas.value[item] || 0
                })
			}
          
			vehiclePaymentContentObj['total'] = itemDatas.value.paymentAmount || 0;
			if(itemDatas.value.requestType != 'Vehicle'){
				vehiclePaymentContentList.value.unshift({...vehiclePaymentContentObj})
			}
			
			if(infoRows.value[0].value){
				 stageTags.value.push(infoRows.value[0].value)
			}
			if(itemDatas.value.receivingBankName){
				 stageTags.value.push(itemDatas.value.receivingBankName)
			}

			let arr1 = data?.attachementList?.map(item => {
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

		})
	}
	
    const sumNestedProperties = (obj, properties) => {
        return properties.reduce((sum, prop) => sum + (obj[prop] || 0), 0);
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
					border: 1rpx solid #66ccff;
					padding: 1rpx 12rpx;
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
	
	.table1 .info,
	.table1 .type {
		white-space: nowrap;
	}
	
	.table1 td.sticky-xz-1 { position: sticky; left: 0; top: 0; z-index: 3;width: 88px !important; ;background: #fff;}
	.table1 td.sticky-xz-2 { position: sticky; left: 88px;  z-index: 4;;background: #fff;	border-right: 2rpx #ddd solid; }
	.table1 td.sticky-xz-3 { position: sticky; left: 220px;  z-index: 2;background: #fff; }
	
	.approval-record-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}
	.attachment-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}
</style>