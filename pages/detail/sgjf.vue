<template>
	<view class="detail-page">
		<view class="header-stickt">
			<view class="status_bar" :style="{ height: `${statusBarHeight * 2}rpx` }"></view>
			<uni-nav-bar class="nav-bar-top">
				<template v-slot:left>
					<view class="back-btn" @click="goBack">
						<!-- <uni-icons type="back" color="#000" size="22" /> -->
						<!-- <image src="../../static/images/back.svg" mode=""></image> -->
					</view>
				</template>
				<view class="nav-title">审批详情</view>
				<template v-slot:right>
					<view style="width: 40rpx"></view>
				</template>
			</uni-nav-bar>
			<!-- 顶部蓝卡片 -->
			<view class="hero-card">
				<view class="hero-header">
					<view class="project-name">
						<view class="project-name-1">
							{{ infoRows[1].value }}
						</view>
						<view class="project-name-1">
							{{ itemDetail.taskName }}
						</view>
					</view>
					<view class="amount-box">
						<view class="amount-label">申请支付总金额</view>
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
					<view class="info-item" v-if="itemDatas.requestType === 'Travel' || itemDatas.requestType === 'GnE'">
						<text class="info-label">预算栏目</text>
						<text class="info-value">{{ itemDatas.budgetCategoryName || '--' }}</text>
					</view>
					
					<view class="info-item" v-if="itemDatas.requestType === 'GnE'">
						<text class="info-label">招待方式</text>
						<text class="info-value">{{ vehiclePaymentContentList[0].gnEtype.replace('|',',') || '--' }}</text>
					</view>
					<view class="info-item" v-if="itemDatas.requestType === 'GnE'">
						<text class="info-label">内容</text>
						<text class="info-value">{{ vehiclePaymentContentList[0].content || '--' }}</text>
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

			<!-- 用款情况 -->
			<view class="section" v-if="vehiclePaymentContentList.length > 0 &&itemDatas.requestType != 'GnE'">
				<view class="section-title-2" @click="setOptions(FUND_USAGE_STATUS)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">用款情况</text>
					</view>
					<!-- <image class="section-title-2-right" src="../../static/images/c2.png" mode="scaleToFill"
						style=" width: 28rpx;height: 16rpx;" /> -->
					<view class="section-title-2-right" :class="{ 'active': getOptions(FUND_USAGE_STATUS) }">

					</view>
				</view>
				<transition name="collapse">
					<view class="usage-details" v-if="getOptions(FUND_USAGE_STATUS)">
						<!-- 整体合同 -->
						<view class="contract-section">
							<!-- 支付内容 -->
							<!-- <view class="contract-header" v-if="vehiclePaymentContentList.length == 0">
								支付内容
							</view>
							<view class="contract-details" v-if="vehiclePaymentContentList.length == 0">
								<view class="detail-row">
									<text class="detail-label">ETC充值</text>
									<text class="detail-value">{{ formatNumber(vehiclePaymentContentList[0].etc) }}</text>
								</view>
								<view class="detail-row">
									<text class="detail-label">停车费</text>
									<text class="detail-value">{{ formatNumber(vehiclePaymentContentList[0].parking) }}</text>
								</view>
                                <view class="detail-row">
									<text class="detail-label">过路费</text>
									<text class="detail-value">{{ formatNumber(vehiclePaymentContentList[0].toll) }}</text>
								</view>
                                <view class="detail-row">
									<text class="detail-label">加油费</text>
									<text class="detail-value">{{ formatNumber(vehiclePaymentContentList[0].fuel) }}</text>
								</view>
                                <view class="detail-row">
									<text class="detail-label">修理费</text>
									<text class="detail-value">{{ formatNumber(vehiclePaymentContentList[0].repair) }}</text>
								</view>
                                <view class="detail-row">
									<text class="detail-label">保险费</text>
									<text class="detail-value">{{ formatNumber(vehiclePaymentContentList[0].insurance) }}</text>
								</view>
                                <view class="detail-row">
									<text class="detail-label">租车费</text>
									<text class="detail-value">{{ formatNumber(vehiclePaymentContentList[0].renting) }}</text>
								</view>
                                <view class="detail-row">
									<text class="detail-label">洗车费</text>
									<text class="detail-value">{{ formatNumber(vehiclePaymentContentList[0].wash) }}</text>
								</view>
                                <view class="detail-row">
									<text class="detail-label">其他</text>
									<text class="detail-value">{{ formatNumber(vehiclePaymentContentList[0].others) }}</text>
								</view>
							</view> -->
							<!-- <scroll-view scroll-x class="table-scroll-x" v-if="vehiclePaymentContentList.length > 0">
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
											<td class="type font_w sticky-xz-1">支付内容</td>
                                            <td class="type font_w text_right">
												</td>
										</tr>
										<tr>
											<td class="text sticky-xz-1">ETC充值</td>
											<td class="info">
												{{ formatNumber(vehiclePaymentContentObj.etc) }}</td>
										</tr>
										<tr>
											<td class="text sticky-xz-1">停车费</td>
											<td class="info">
												{{ formatNumber(vehiclePaymentContentObj.parking) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">过路费</td>
											<td class="info">
												{{ formatNumber(vehiclePaymentContentObj.toll) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">加油费</td>
											<td class="info">
												{{ formatNumber(vehiclePaymentContentObj.fuel) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">修理费</td>
											<td class="info">
												{{ formatNumber(vehiclePaymentContentObj.repair) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">保险费</td>
											<td class="info">
												{{ formatNumber(vehiclePaymentContentObj.insurance) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">租车费</td>
											<td class="info">
												{{ formatNumber(vehiclePaymentContentObj.renting) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">洗车费</td>
											<td class="info">
												{{ formatNumber(vehiclePaymentContentObj.wash) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">其他</td>
											<td class="info">
												{{ formatNumber(vehiclePaymentContentObj.others) }}</td>
										</tr>
									</tbody>
								</table>
							</scroll-view> -->
							<!-- 明细 -->
							<scroll-view scroll-x class="table-scroll-x" v-if="vehiclePaymentContentList.length > 1&&itemDatas.requestType === 'Vehicle'">
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
										   <td class="type font_w sticky-xz-1">{{ infoRows[0].value.slice(0,-3)}}明细</td>
                                           <td class="type font_w text_right">合计</td> 
										   <td class="type font_w text_right" v-for="(value,index) in itemDatas.vehiclePlateNo.split(';')" :key="index">
												{{ value || '' }}</td>
										</tr>
										<tr>
											<td class="text sticky-xz-1">ETC充值</td>
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.etc) }}</td>
										</tr>
										<tr>
											<td class="text sticky-xz-1">停车费</td>
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.parking) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">过路费</td>
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.toll) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">加油费</td>
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.fuel) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">修理费</td>
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.repair) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">保险费</td>
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.insurance) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">租车费</td>
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.renting) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">洗车费</td>
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.wash) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">其他</td>
											<td class="info" v-for="value in vehiclePaymentContentList" :key="value.id">
												{{ formatNumber(value.others) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">合计</td>
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
										   <td class="type font_w sticky-xz-1">{{ infoRows[0].value.slice(0,-3)}}明细</td>
                                           <!-- <td class="type font_w text_right">合计</td>  -->
										   <td class="type font_w text_right" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												</td>
										</tr>
										<tr>
											<td class="text sticky-xz-1">交通费</td>
											<td class="info" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.travelExpense) }}</td>
										</tr>
										<tr>
											<td class="text sticky-xz-1">住宿费</td>
											<td class="info" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.accommodationFee) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">误餐费</td>
											<td class="info" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.missedMealFee) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">会务费</td>
											<td class="info" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.meetingExpense) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">出差人数</td>
											<td class="info" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.travelPeopleCount) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">出差天数</td>
											<td class="info" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ formatNumber(value.travelDays) }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">交通方式</td>
											<td class="info" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ value.transportationMethod.replace('|',',') }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">内容</td>
											<td class="info" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ value.content }}</td>
										</tr>
									</tbody>
								</table>
							</scroll-view>
							<!-- <scroll-view scroll-x class="table-scroll-x" v-if="vehiclePaymentContentList.length > 0&&itemDatas.requestType === 'GnE'">
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
										   <td class="type font_w sticky-xz-1">{{ infoRows[0].value.slice(0,-3)}}明细</td>
										   <td class="type font_w text_right" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">招待方式</td>
											<td class="info" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ value.gnEtype.replace('|',',') }}</td>
										</tr>
                                        <tr>
											<td class="text sticky-xz-1">内容</td>
											<td class="info" v-for="(value,index) in vehiclePaymentContentList" :key="index">
												{{ value.content }}</td>
										</tr>
									</tbody>
								</table>
							</scroll-view> -->
							<view class="detail-row summary-row" v-if="vehiclePaymentContentList.length > 0 &&itemDatas.requestType != 'GnE'">
								<text class="detail-label summary-label">本次用款小计</text>
								<text
									class="detail-value summary-value">{{ formatNumber(itemDatas.paymentAmount) }}</text>
							</view>
						</view>
					</view>
				</transition>
			</view>

			<!-- 付款账户信息 -->
			<view class="section">
				<view class="section-title-2" @click="setOptions(PAYMENT_ACCOUNT_INFORMATION)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">补充信息</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(PAYMENT_ACCOUNT_INFORMATION) }">

					</view>
				</view>
				<!-- 付款账户信息卡片 -->
				<transition name="collapse">
					<view class="account-info-section" v-if="getOptions(PAYMENT_ACCOUNT_INFORMATION)">
						<!-- 单个公司账户信息 -->
						<view class="account-card">
							<!-- <view class="account-company-title">{{ itemDatas.companyName || '' }}</view> -->
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
		getStorage
	} from '@/utils/storage'
	import {
		FUND_USAGE_STATUS,
		PAYMENT_ACCOUNT_INFORMATION,
		COLLECTION_ACCOUNT_INFORMATION,
		APPROVAL_RECORD
	} from '@/utils/definitions'
	import http from '@/utils/request.js'
	import {
		formatNumber,
		formatDateTime
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
	// const formDetail = ref({})
	const stageTags = ref([])
	const amountColumns = ref(['总金额', '总金额']);
	// 每行高度（与样式保持一致）
	const ROW_H = 60

	// 分类-科目映射（key 对应你现有 itemDatas 字段）
	const categories = computed(() => ([{
			name: '城投拨付资金',
			items: [{
					label: '市财力',
					key: 'planToPayCtfundCityPr'
				},
				{
					label: '土地出让金',
					key: 'planToPayCtfundLandTransferFeePr'
				},
				{
					label: '专项债',
					key: 'planToPayCtfundSpecialPurposeBondPr'
				},
				{
					label: '城投其他资金',
					key: 'planToPayCtfundOtherPr'
				},
				{
					label: '资本金',
					key: 'planToPayCtfundCapitalPr'
				},
			],
		},
		{
			name: '非城投拨付资金',
			items: [{
					label: '市级财力',
					key: 'planToPayNonCtfundCityPr'
				},
				{
					label: '区县财力',
					key: 'planToPayNonCtfundDistrictPr'
				},
				{
					label: '自筹资金',
					key: 'planToPayNonCtfundSelfPr'
				},
				{
					label: '其他',
					key: 'planToPayNonCtfundOtherPr'
				},
			],
		},
		{
			name: '直拨(无资金流入)',
			items: [{
					label: '交通专项',
					key: 'planToPayDirectFundTransportationSpecialPr'
				},
				{
					label: '超长期国债',
					key: 'planToPayDirectFundUltraTbpr'
				},
				{
					label: '其他',
					key: 'planToPayDirectFundOtherPr'
				},
			],
		},
	]))

	const pullDownObj = reactive({
		[FUND_USAGE_STATUS]: true,
		[PAYMENT_ACCOUNT_INFORMATION]: true,
		[COLLECTION_ACCOUNT_INFORMATION]: true,
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
	const itemDatas = ref({});
	const vehiclePaymentContentList = ref([]);
    const vehiclePaymentContentObj = reactive({});
	// const GnEPaymentContent = ref([]);
	// const TravelPaymentContent = ref([]);
	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			itemDatas.value = res.data?.data?.wfrequestexpenseclaim || {}
			infoRows.value.forEach(item => {
				item.value = (typeof itemDatas.value[item.key] === 'number' || item.key === 'claimAmount' || item.key === 'paymentAmount') ? formatNumber(itemDatas.value[item.key]) : itemDatas.value[item.key] || ''
			})
            if(infoRows.value[0].value) {
                infoRows.value[0].value = requestTypeObj[infoRows.value[0].value] || ''
            }
            let arr = requestTypeSel[itemDatas.value.requestType] || []
			if(res.data?.data?.wfrequestexpenseclaimvehicleitems){
				 vehiclePaymentContentList.value = res.data?.data?.wfrequestexpenseclaimvehicleitems || []
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
			vehiclePaymentContentList.value.unshift({...vehiclePaymentContentObj})
			if(itemDatas.value.receivingBankName){
				 stageTags.value.push(itemDatas.value.receivingBankName)
			}
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
		// uni.showToast({
		// 	title: '已打回',
		// 	icon: 'none'
		// })
		inputDialogRequired.value = true
		openInputDialog('打回原因', '请输入打回原因')
	}

	const onApprove = () => {
		// uni.showToast({
		// 	title: '已通过',
		// 	icon: 'success'
		// })
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
		http.get('/WF/GetApprovalHistory?', {
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
		// 可选：横竖屏/窗口尺寸改变时重算
		// uni.onWindowResize?.(() => {
		// 	computeScrollHeight()
		// })
		// focusout 事件在元素失去焦点时触发，特别是在移动端输入框收起键盘时
		// document.addEventListener('focusout', () => {
		//   setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 20)
		// })
		// 视口变化 = 键盘弹起/收起

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

	// @media (min-aspect-ratio: 13/20) {
	// //   ::v-deep .uni-tabbar-bottom {
	// // 	display: none !important;
	// // 	height: 0 !important;
	// //   }
	//   ::v-deep .bottom-nav-bar{
	// 	  display: none !important;
	// 	  height: 0 !important;
	//   }
	// }

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
			// position: absolute;
			// z-index: 19;
			// top: 88rpx;
			// border-radius: 16rpx;
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
			}



			.hero-actions {
				position: absolute;
				bottom: 0;
				right: 0;
				width: 350rpx;
				height: 72rpx;
				background: url('../../static/images/bg_1@2x.jpg') no-repeat center center;
				background-size: 100% 100%;
				// border: 1rpx solid #030303;
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
				border: 1rpx solid #ddd;
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
					// border: 1rpx solid #ac4343;
					// border-top: none;
					// border-radius: 0 0 8rpx 8rpx;
				}
			}

			.other-info {
				box-sizing: border-box;
				border-radius: 25rpx;
				// margin-bottom: 10rpx;
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


		// 支付渠道表格独立样式 - 两列固定 + 右侧横滑
		// .payment-channel-section {
		// 	margin-top: 30rpx;

		// 	.payment-scroll {
		// 		overflow-x: auto;
		// 		overflow-y: hidden;
		// 		-webkit-overflow-scrolling: touch;
		// 	}

		// 	.payment-table {
		// 		background: #ffffff;
		// 		border: 1rpx solid #ddd;
		// 		border-bottom: none;
		// 		min-width: 720rpx;
		// 	}

		// 	// 两列固定：列宽需与下方一致
		// 	$col1-w: 274rpx; // 分类名
		// 	$col2-w: 194rpx; // 科目名
		// 	$amount-w: 220rpx; // 每个金额列宽
		// 	$row-h: 60rpx;

		// 	// .sticky-col-1 {
		// 	// 	position: sticky;
		// 	// 	left: 0;
		// 	// 	z-index: 3;
		// 	// 	background: #f6f8fc;
		// 	// }
		// 	// .sticky-col-2 {
		// 	// 	position: sticky;
		// 	// 	left: $col1-w;
		// 	// 	z-index: 2;
		// 	// 	background: #f6f8fc;
		// 	// }

		// 	/* 表头 */
		// 	.payment-header {
		// 		display: flex;
		// 		align-items: stretch;
		// 		border-bottom: 1rpx solid #ddd;
		// 		background: #f6f8fc;
		// 		height: $row-h;

		// 		.payment-header-cell {
		// 			display: flex;
		// 			align-items: center;
		// 			padding: 0 24rpx;
		// 			font-size: 24rpx;
		// 			color: #000;
		// 			font-weight: bold;
		// 			white-space: nowrap;
		// 			height: $row-h;
		// 			border-right: 1rpx solid #ddd;
		// 			box-sizing: border-box;
		// 		}
		// 		.sticky-col-1 { 
		// 			min-width: 139px; 
		// 			position: sticky;
		// 		    left: 0;
		// 		    z-index: 3;
		// 		    background: #f6f8fc;
		// 		}
		// 		.sticky-col-2 { 
		// 			min-width: 97px; 
		// 		    position: sticky;
		// 			left: 139px;
		// 			z-index: 2;
		// 			background: #f6f8fc;
		// 		}

		// 		.amount-headers {
		// 			display: flex;
		// 			flex: 1;
		// 			.amount-header {
		// 				flex: 0 0 $amount-w;
		// 				justify-content: flex-end;
		// 				text-align: right;
		// 				border-right: 1rpx solid #ddd;
		// 				display: flex;
		// 				align-items: center;
		// 				padding: 0 16rpx;
		// 			}
		// 		}
		// 	}

		// 	.payment-category {
		// 		position: relative; // 让覆盖层参照本区块
		// 		.sticky-col-1 {
		// 			min-width: 139px; 
		// 			position: sticky;
		// 		    left: 0;
		// 		    z-index: 3;
		// 		    background: #f6f8fc;
		// 		}

		// 	}

		// 	/* 覆盖层：分类名（视觉合并单元格，不占垂直高度） */
		// 	.cat-merge {
		// 		width: $col1-w;
		// 		background: #f6f8fc;
		// 		border-right: 1rpx solid #ddd;
		// 		padding: 0 16rpx;
		// 		box-sizing: border-box;
		// 		white-space: nowrap;
		// 		color: #000;
		// 		font-size: 24rpx;
		// 		z-index: 3;
		// 		// sticky 横向固定
		// 	}
		// 	.cat-items{
		// 		width: $col1-w;
		// 		display: flex;
		// 		flex-direction: column;
		// 		// gap: 10rpx;
		// 		position: sticky;
		// 		left: 139px;
		// 		z-index: 2;
		// 		.cat-item{
		// 			min-width: 97px;
		// 			height: $row-h;
		// 			// position: -webkit-sticky;
		// 			// position: sticky;
		// 			// left: 8.5625rem;
		// 			border-bottom: 1rpx solid #ddd;
		// 			border-right: 1rpx solid #ddd;
		// 			z-index: 2;
		// 			background: #f6f8fc;
		// 		}
		// 	}

		// 	.payment-row {
		// 		display: flex;
		// 		align-items: stretch;
		// 		border-bottom: 1rpx solid #ddd;
		//          /* 每行的占位列：仅占宽度，保持网格对齐 */
		// 		.col1-spacer {
		// 			width: $col1-w;
		// 			height: $row-h;
		// 			line-height: $row-h;
		// 			background: #f6f8fc;
		// 			border-right: 1rpx solid #ddd;
		// 			box-sizing: border-box;
		// 		}
		// 		.cell {
		// 			font-size: 24rpx;
		// 			box-sizing: border-box;
		// 			border-right: 1rpx solid #ddd;
		// 			white-space: nowrap;
		// 			color: #000;
		// 			background: #fff;
		// 		}
		// 		.sticky-col-2 {
		// 			position: sticky;
		// 			left: $col1-w;
		// 			z-index: 2;
		// 			background: #f6f8fc;
		// 		}

		// 		.cat-cell {
		// 			width: $col1-w;
		// 			text-align: left;
		// 			padding: 0 16rpx;
		// 			background: #f6f8fc;
		// 		}
		// 		.name-cell {
		// 			width: $col2-w;
		// 			text-align: left;
		// 			padding: 16rpx;
		// 			background: #f6f8fc;
		// 			line-height: $row-h;
		// 			height: $row-h;
		// 		}

		// 		.amount-cells {
		// 			display: flex;
		// 			flex: 1;

		// 			.amount-cell {
		// 				flex: 0 0 $amount-w;
		// 				text-align: right;
		// 				color: #666;
		// 				padding: 16rpx;
		// 				height: $row-h;
		// 				line-height: $row-h;
		// 				background: #fff;
		// 			}
		// 		}
		// 	}

		// 	/* 表尾 */
		// 	.payment-footer {
		// 		display: flex;
		// 		align-items: stretch;
		// 		border-bottom: 1rpx solid #ddd;
		// 		height: $row-h;
		// 		background: #f6f8fc;

		// 		.payment-footer-cell {
		// 			font-size: 24rpx;
		// 			white-space: nowrap;
		// 			border-right: 1rpx solid #ddd;
		// 			display: flex;
		// 			align-items: center;
		// 			padding: 0 16rpx;
		// 			height: $row-h;
		// 			box-sizing: border-box;
		// 		}

		// 		.sticky-col-1 { 
		// 			width: $col1-w; 
		// 			position: sticky;
		// 		    left: 0;
		// 		    z-index: 3;
		// 		    background: #f6f8fc;
		// 		}

		// 		.sticky-col-2 { 
		// 			width: $col2-w; 
		// 		    position: sticky;
		// 			left: $col1-w;
		// 			z-index: 2;
		// 			background: #f6f8fc;
		// 		}

		// 		.amount-cells {
		// 			display: flex;
		// 			flex: 1;
		// 			.amount-footer {
		// 				flex: 0 0 $amount-w;
		// 				color: #666;
		// 				justify-content: flex-end;
		// 				padding: 16rpx;
		// 				text-align: right;
		// 				border-right: 1rpx solid #ddd;
		// 				display: flex;
		// 				align-items: center;
		// 			}
		// 		}
		// 	}
		// }



		// 付款账户信息独立样式 - 不与其他样式共用
		.account-info-section {
			// padding: 20rpx 30rpx 30rpx;
			padding: 0 32rpx 40rpx;

			.account-card {
				// margin-bottom: 40rpx;

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
		// border-left: 1px #a83737 solid;
		// border-top: 1px #ddd solid;
		// border: 1px #a83737 solid;
		// padding: 20rpx;	
		border-bottom: 1rpx #ddd solid;
		// border-right: 1rpx #ddd solid;
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
		border-left: 1rpx #ddd solid;
		border-top: 1rpx #ddd solid;
		padding: 8px;
		font-size: 12px;
	}

	.table1 .info {
		text-align: right;
		color: #666;
	}

	.table1 .text {
		// text-align: lef;
		color: #666;
		white-space: nowrap;
	}

	// .table1 td{
	// 	text-align: right;
	// 	color: #666;
	// }
	.font_w {
		font-weight: bold;
	}

	.text_right {
		text-align: right;
	}



	// .table-scroll-x {
	// 	box-sizing: border-box;
	// 	overflow-x: auto;
	// 	-webkit-overflow-scrolling: touch; /* 移动端流畅滑动 */
	// }

	// /* 让表格按内容宽度撑开，超过容器时才出现横向滚动 */
	// .table-scroll-x .table1 {
	// 	box-sizing: border-box;
	// 	min-width: 100%;
	// 	width: max-content;
	// 	table-layout: auto;
	// }

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
</style>