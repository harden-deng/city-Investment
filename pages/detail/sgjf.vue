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
					<view class="info-item" :class="{'info-item-border': (row.key === 'paymentAmount')}" v-for="(row, idx) in infoRows" :key="idx">
						<text class="info-label">{{ row.label }}</text>
						<text class="info-value">{{ row.value || '--'}}</text>
					</view>
					<view class="info-item" v-if="itemDatas.requestType === 'Travel' || itemDatas.requestType === 'GnE'">
						<text class="info-label info-label-width">预算栏目</text>
						<text class="info-value">{{ itemDatas.budgetCategoryName || '--' }}</text>
					</view>
					
					<view class="info-item" v-if="itemDatas.requestType === 'GnE'">
						<text class="info-label">招待方式</text>
						<text class="info-value">{{ vehiclePaymentContentList[0]?.gnEtype?.replace('|','、') || '--' }}</text>
					</view>
					<view class="info-item" v-if="itemDatas.requestType === 'GnE'">
						<text class="info-label">内容</text>
						<text class="info-value">{{ vehiclePaymentContentList[0]?.content || '--' }}</text>
					</view>
					<view class="info-item" v-if="itemDatas.requestType === 'Vehicle'">
						<text class="info-label">内容</text>
						<text class="info-value">{{ itemDatas.content || '--' }}</text>
					</view>
					<view class="usage-details" v-if="itemDatas.requestType === 'GnE'" style="padding: 0;margin-top: 20rpx;">
					     <view class="detail-row summary-row" style="padding: 20rpx 0 20rpx;">
								<text class="detail-label summary-label">发票金额</text>
								<text class="detail-value summary-value">{{ formatNumber(itemDatas.invoiceTotalAmountVat) }}</text>
						 </view>
					</view>
					<view class="usage-details" v-if="itemDatas.requestType === 'GnE'" style="padding: 0;">
					     <view class="detail-row summary-row" style="padding: 20rpx 0 20rpx;">
								<text class="detail-label summary-label">可报销金额</text>
								<text class="detail-value summary-value">{{ formatNumber(itemDatas.claimAmount) }}</text>
						 </view>
					</view>
					<view class="usage-details" v-if="itemDatas.requestType === 'GnE'" style="padding: 0;">
					     <view class="detail-row summary-row" style="padding: 20rpx 0 0rpx;">
								<text class="detail-label summary-label">实际报销金额</text>
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
						<!-- <view class="contract-section" :class="{'contract-section-vehicle': itemDatas.requestType === 'Vehicle'}"> -->
						<view class="contract-section contract-section-vehicle">
							<scroll-view scroll-x class="table-scroll-x" v-if="vehiclePaymentContentList.length > 0&&itemDatas.requestType === 'Vehicle'"  @touchmove.stop="handleTableTouchMove">
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
										   <td class="type font_w sticky-xz-1 bordr-none">{{ infoRows[0].value.slice(0,-3)}}明细</td>
                                           <td class="type font_w text_right sticky-xz-2 bordr-none bordr-right-none">合计</td> 
										   <td class="type font_w text_right bordr-none" v-for="(value,index) in vehiclePlateNoList" :key="index">
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
												{{ value.transportationMethod?.replace('|','、') || '--' }}</td>
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
								<text class="detail-label summary-label">发票金额</text>
								<text
									class="detail-value summary-value">{{ formatNumber(itemDatas.invoiceTotalAmountVat) }}</text>
							</view>
							<view class="detail-row summary-row" v-if="vehiclePaymentContentList.length > 0 &&itemDatas.requestType != 'GnE'">
								<text class="detail-label summary-label">可报销金额</text>
								<text
									class="detail-value summary-value">{{ formatNumber(itemDatas.claimAmount) }}</text>
							</view>
							<view class="detail-row summary-row" v-if="vehiclePaymentContentList.length > 0 &&itemDatas.requestType != 'GnE'">
								<text class="detail-label summary-label">实际报销金额</text>
								<text
									class="detail-value summary-value">{{ formatNumber(itemDatas.paymentAmount) }}</text>
							</view>
						</view>
					</view>
				</transition>
			</view>

			<view class="section" v-if="(personnelListManager.length > 0 || personnelListStaff.length > 0)&&(itemDatas.requestType === 'GnE' || itemDatas.requestType === 'Travel')">
				<view class="section-title-2" @click="setOptions(COLLECTION_ACCOUNT_INFORMATION)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">人员清单</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(COLLECTION_ACCOUNT_INFORMATION) }">
					</view>
				</view>
				<transition name="collapse">
					<view class="usage-details" v-if="getOptions(COLLECTION_ACCOUNT_INFORMATION)">
							<scroll-view scroll-x class="table-scroll-x">
							    <view class="company-title-ry">领导</view>
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
										   <td class="type font_w sticky-ry-1 bordr-none text-center">账号</td>
										   <td class="type font_w sticky-ry-2 bordr-none text-center">姓名</td>
										   <td class="type font_w sticky-ry-3 bordr-none text-center">职位</td>
										</tr>
										<tr v-for="(value,index) in personnelListManager" :key="index">
											<td class="text bordr-none  sticky-ry-1 bordr-bottom-border text-center">
												{{ value.userId || '--'  }}
											</td>
											<td class="text bordr-none sticky-ry-2 bordr-bottom-border text-center">
												{{ value.userFullName || '--'  }}
											</td>
											<td class="text bordr-none sticky-ry-3 bordr-bottom-border text-center">
												{{ value.userTitle || '--' }}
											</td>
										</tr>
									</tbody>
								</table>
								<view style="width: 100%;margin: 10rpx 0;"></view>
								<view class="company-title-ry">本公司人员</view>
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
										   <td class="type font_w sticky-ry-1 bordr-none text-center">账号</td>
										   <td class="type font_w sticky-ry-2 bordr-none text-center">姓名</td>
										   <td class="type font_w sticky-ry-3 bordr-none text-center">职位</td>
										</tr>
										<tr v-for="(value,index) in personnelListStaff" :key="index">
											<td class="text bordr-none sticky-ry-1 text-center bordr-bottom-border">
												{{ value.userId || '--'  }}
											</td>
											<td class="text bordr-none sticky-ry-2 text-center bordr-bottom-border">
												{{ value.userFullName || '--'  }}
											</td>
											<td class="text bordr-none sticky-ry-3 text-center bordr-bottom-border">
												{{ value.userTitle || '--' }}
											</td>
										</tr>
                               
									</tbody>
								</table>
							</scroll-view>
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
									<text class="account-info-label">专票金额(含税)</text>
									<text class="account-info-value">{{ formatNumber(itemDatas.vatamount) || '' }}</text>
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
		getCurrentInstance,
		computed,
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
		formatNumber,handleTableTouchMove,sumNestedProperties,totalNestedValue
	} from '@/utils/h5Bribge'
	import { useListHeight } from '@/utils/useListHeight.js'
	import { useApproval } from '@/utils/useApproval.js'
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
	const requestTypeObj = {
		'Vehicle': '公务用车报销单',
		'GnE': '业务招待报销单',
		'Travel': '差旅报销单',
	}
	const requestTypeSel = {
		'Vehicle': ['etc', 'parking', 'toll', 'fuel', 'repair', 'insurance', 'renting', 'wash', 'others','total'],
		'GnE': ['gnEtype','content'],
		'Travel': ['travelExpense', 'accommodationFee', 'missedMealFee', 'meetingExpense', 'travelPeopleCount', 'travelDays','transportationMethod','content'],
	}
	const itemDetail = ref({})
	const stageTags = ref([])
	const wfstatusText = computed(() => {
		return itemDatas.value.wfstatus == 'Running' ? '流转中' : (itemDatas.value.wfstatus == 'Completed' ? '已审批' : '')
	})
	const vehiclePlateNoList = computed(() => {
	   return itemDatas.value.vehiclePlateNo?.split(';') || []
    })
	const attachmentData = ref([])
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
		[FUND_USAGE_STATUS]: true,
		[PAYMENT_ACCOUNT_INFORMATION]: true,
		[COLLECTION_ACCOUNT_INFORMATION]: true,
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
		},
		{
			label: '用款部门',
			value: '',
			key: 'companyName'
		},
		{
			label: '收款名称',
			value: '',
			key: 'receivingBankAccountName'
		},
		{
			label: '收款开户银行',
			value: '',
			key: 'receivingBankName'
		},
		{
			label: '收款账号',
			value: '',
			key: 'receivingBankAccountNumber'
		},
	])
	const itemDatas = ref({});
	const vehiclePaymentContentList = ref([]);
    const vehiclePaymentContentObj = reactive({});
	const personnelListManager = ref([]);
	const personnelListStaff = ref([]);
	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			let data = res.data?.data || {}
			itemDatas.value = data.wfrequestexpenseclaim || {}
			personnelListManager.value = data.wfrequestexpenseclaimparticipants?.filter(item => item.userType === 'Manager') || []
			personnelListStaff.value = data.wfrequestexpenseclaimparticipants?.filter(item => item.userType === 'Staff') || []
	
            // 批量更新 infoRows，避免多次响应式触发
			const newInfoRows = infoRows.value.map(item => ({
				...item,
				value: (typeof itemDatas.value[item.key] === 'number') 
					? formatNumber(itemDatas.value[item.key]) 
					: itemDatas.value[item.key] || ''
			}))
			if(newInfoRows[0].value) {
				newInfoRows[0].value = requestTypeObj[newInfoRows[0].value] || ''
			}
			infoRows.value = newInfoRows

            let arr = requestTypeSel[itemDatas.value.requestType] || []
			// 公务用车报销单
			if(data.wfrequestexpenseclaimvehicleitems && data.wfrequestexpenseclaimvehicleitems.length > 0){
				 vehiclePaymentContentList.value = data.wfrequestexpenseclaimvehicleitems || []
				 vehiclePaymentContentList.value.forEach(item => {
					item.total = sumNestedProperties(item, arr);
				 }) 
				arr.forEach(item => {
                  vehiclePaymentContentObj[item] = totalNestedValue(vehiclePaymentContentList.value, item)
                })
			}

			if(itemDatas.value.requestType !== 'Vehicle'){
				arr.forEach(item => {
					vehiclePaymentContentObj[item] = itemDatas.value[item] || 0
				})
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
		
		.usage-details {
			padding: 0 32rpx 40rpx;
			
			.contract-section {
				box-sizing: border-box;
				border: 2rpx solid #ddd;
				padding: 16rpx;
				overflow: hidden;
				&.contract-section-vehicle {
					// border: none !important;
					padding: 0 !important;
				}
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
				// margin-top: 20rpx;
				padding: 20rpx 16rpx 20rpx;
				height: auto !important;
				
				.summary-label {
					display: flex;
					align-items: center;
					height: 48rpx;
					font-size: 26rpx;
					color: #000000;
					font-weight: bold;
				}
				
				.summary-value {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					height: 48rpx;
					font-size: 26rpx;
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
	.table1 .text-center {
		text-align: center !important;
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
	.bordr-bottom-border{
		border-bottom: 2rpx #ddd solid !important;
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
	
	.table1 .info,
	.table1 .type {
		white-space: nowrap;
	}
	
	.table1 td.sticky-xz-1 { position: sticky; left: 0; top: 0; z-index: 3;width: 88px !important;background: #fff;}
	.table1 td.sticky-xz-2 { position: sticky; left: 88px;  z-index: 4;background: #fff;border-right: 2rpx #ddd solid; }

	.table1 td.sticky-ry-1 { position: sticky; left: 0; top: 0; z-index: 3;width: 40%;background: #fff;  white-space: normal;
                word-break: break-all;
                word-wrap: break-word;}
	.table1 td.sticky-ry-2 { position: sticky; width: 30%;  z-index: 4;background: #fff;  white-space: normal;
                word-break: break-all;
                word-wrap: break-word; }
	.table1 td.sticky-ry-3 { position: sticky; width: 30%; z-index: 2;background: #fff;  white-space: normal;
                word-break: break-all;
                word-wrap: break-word; }
	
	.approval-record-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}
	.attachment-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}

	.company-title-ry {
		font-size: 24rpx;
		color: #666;
		text-align: left;
		font-weight: bold;
		padding: 20rpx 0 20rpx 10rpx;
	}
</style>