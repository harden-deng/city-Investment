<template>
	<view class="detail-page">
		<view class="header-stickt">
			<detailNavBar></detailNavBar>
			<!-- 顶部蓝卡片 -->
			<view class="hero-card">
				<view class="hero-header">
					<view class="project-name">
						<view class="project-name-1">
							{{ itemDetail.taskName || '工程付款申请单'  }}
						</view>
						<view class="project-name-1">
							{{ itemDatas.projectName }}
							  <!-- {{ itemDatas.projectCategory }} -->
						</view>
					</view>
					<view class="amount-box">
						<view class="amount-label">申请支付总金额</view>
						<view class="amount-value"><text class="amount-value-symbol">¥</text><text
								class="amount-value-number">
								{{ formatNumber(itemDatas.planToPayTotalPr) }}</text></view>
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
			<!-- 顶部蓝卡片 -->
			<!-- 基本信息 -->
			<view class="section">
				<view class="section-title">
					<text class="section-title-vertical"></text>
					<text class="section-title-text">基本信息</text>
				</view>
				<view class="info-list">
					<view class="info-item" :class="{'info-item-column': (row.value?.length > 34&&row.key === 'businessRemarkPr'),'info-item-border': (row.key === 'businessRemarkPr')}" v-for="(row, idx) in infoRows" :key="idx">
						<text class="info-label">{{ row.label }}</text>
						<text class="info-value" :class="{'info-value-left': (row.value?.length > 34&&row.key === 'businessRemarkPr')}">{{ row.value || '--' }}</text>
					</view>
				</view>
			</view>

			<!-- 用款情况 -->
			<view class="section">
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
							<view class="contract-header">
								整体合同
							</view>
							<view class="contract-details">
								<view class="detail-row">
									<text class="detail-label">合同价/审定价</text>
									<text class="detail-value">{{ formatNumber(itemDatas.contractPrice) }}</text>
								</view>
								<view class="detail-row">
									<text class="detail-label">累计付款 含本次</text>
									<text
										class="detail-value">{{ formatNumber(itemDatas.contractPaymentTotalIncludeCurrentPr) }}</text>
								</view>
								<view class="detail-row">
									<text class="detail-label">累计付款 不含本次</text>
									<text
										class="detail-value">{{ formatNumber(itemDatas.contractPaymentTotalExcludeCurrentPr) }}</text>
								</view>
							</view>
							<view class="contract-header">
								其中{{ itemDatas.highlightPartName || '' }}
							</view>
							<view class="contract-details">
								<view class="detail-row">
									<text class="detail-label">合同价/审定价</text>
									<text class="detail-value">{{ formatNumber(itemDatas.highlightPartPrice) }}</text>
								</view>
								<view class="detail-row">
									<text class="detail-label">累计付款 含本次</text>
									<text
										class="detail-value">{{ formatNumber(itemDatas.highlightPaymentTotalIncludeCurrent2Pr) }}</text>
								</view>
								<view class="detail-row">
									<text class="detail-label">累计付款 不含本次</text>
									<text
										class="detail-value">{{ formatNumber(itemDatas.highlightPaymentTotalExcludeCurrent2Pr) }}</text>
								</view>
							</view>
						</view>
						<!-- 其他信息 -->
						<view class="other-info">
							<!-- <view class="detail-row">
								<text class="detail-label">验工计价年月</text>
								<text class="detail-value">{{ itemDatas.settlementYearMonth || '--' }}</text>
							</view>
							<view class="detail-row">
								<text class="detail-label">验工计价期数</text>
								<text class="detail-value">{{ itemDatas.settlementPhase || '--' }}</text>
							</view> 
							<view class="detail-row">
								<text class="detail-label">对应工作量</text>
								<text class="detail-value">{{ formatNumber(itemDatas.settlementWorkload) }}</text>
							</view> -->
						</view>
						<view class="contract-section">
							<!-- 用款性质 -->
							<view class="contract-header" v-if="roadSectionList.length === 0">
								用款性质
							</view>
							<view class="contract-details" v-if="roadSectionList.length === 0">
								<view class="detail-row">
									<text class="detail-label">确定性</text>
									<text class="detail-value">{{ formatNumber(itemDatas.planToPayConfirmedPr) }}</text>
								</view>
								<view class="detail-row">
									<text class="detail-label">预估性</text>
									<text class="detail-value">{{ formatNumber(itemDatas.planToPayEstimatedPr) }}</text>
								</view>
							</view>
							<scroll-view scroll-x class="table-scroll-x" v-if="roadSectionList.length > 0" @touchmove.stop="handleTableTouchMove">
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
											<td colspan="2" class="type font_w sticky-xz-1 bordr-none bordr-right-none">用款性质</td>
											<td class="type font_w text_right bordr-none bordr-right-none" v-for="value in roadSectionList"
												:key="value.id">{{ value.roadName }}</td>
										</tr>
										<tr>
											<td class="text sticky-xz-1 bordr-right-none">确定性</td>
											<td class="info sticky-xz-2">{{ formatNumber(itemDatas.planToPayConfirmedPr) }}</td>
											<td class="info bordr-right-none" v-for="value in roadSectionList" :key="value.id">
												{{ formatNumber(value.confirmed) }}</td>
										</tr>
										<tr class="border-top">
											<td class="text sticky-xz-1 bordr-right-none bordr-bottom-none">预估性</td>
											<td class="info sticky-xz-2 bordr-bottom-none">{{ formatNumber(itemDatas.planToPayEstimatedPr)  }}</td>
											<td class="info bordr-right-none bordr-bottom-none" v-for="value in roadSectionList" :key="value.id">
												{{ formatNumber(value.estimated) }}</td>
										</tr>
									</tbody>
								</table>
							</scroll-view>
							<!-- 款项类型 -->
							<view class="contract-header" v-if="roadSectionList.length === 0">
								款项类型
							</view>
							<view class="contract-details" v-if="roadSectionList.length === 0">
								<view class="detail-row">
									<text class="detail-label">工程费用</text>
									<text
										class="detail-value">{{ formatNumber(itemDatas.planToPayConstructionAmountPr) }}</text>
								</view>
								<view class="detail-row">
									<text class="detail-label">农民工工资</text>
									<text
										class="detail-value">{{ formatNumber(itemDatas.planToPayRuralLaborsSalaryPr) }}</text>
								</view>
								<view class="detail-row">
									<text class="detail-label">材料款</text>
									<text
										class="detail-value">{{ formatNumber(itemDatas.planToPayMaterialAmountPr) }}</text>
								</view>
								<view class="detail-row">
									<text class="detail-label">前期费用/动拆迁</text>
									<text
										class="detail-value">{{ formatNumber(itemDatas.planToPayProphaseAmountPr) }}</text>
								</view>
								<view class="detail-row">
									<text class="detail-label">前期费用/管线搬迁</text>
									<text
										class="detail-value">{{ formatNumber(itemDatas.planToPayProphaseLineMigrationAmountPr) }}</text>
								</view>
								<view class="detail-row">
									<text class="detail-label">前期费用/前期工程款</text>
									<text
										class="detail-value">{{ formatNumber(itemDatas.planToPayProphaseConstructionAmountPr) }}</text>
								</view>
								<view class="detail-row">
									<text class="detail-label">二类费用等</text>
									<text
										class="detail-value">{{ formatNumber(itemDatas.planToPayOtherAmountPr) }}</text>
								</view>
								<view class="detail-row summary-row">
									<text class="detail-label summary-label">本次用款小计</text>
									<text
										class="detail-value summary-value">{{ formatNumber(itemDatas.planToPayTotalPr) }}</text>
								</view>
							</view>
							<scroll-view scroll-x class="table-scroll-x" v-if="roadSectionList.length > 0" @touchmove.stop="handleTableTouchMove">
								<table cellspacing="0" cellpadding="0" class="table1 table2">
									<tbody>
										<tr>
											<td colspan="2" class="type font_w sticky-lx-1  bordr-none bordr-right-none">款项类型</td>
											<td class="type font_w text_right bordr-none bordr-right-none" v-for="value in roadSectionList"
												:key="value.id">{{ value.roadName }}</td>
										</tr>

										<tr>
											<td class="text sticky-lx-1 bordr-right-none">工程费用</td>
											<td class="info sticky-lx-2">{{ formatNumber(itemDatas.planToPayConstructionAmountPr) }}
											</td>
											<td class="info bordr-right-none" v-for="value in roadSectionList" :key="value.id">
												{{ formatNumber(value.constructionAmount) }}</td>
										</tr>
										<tr>
											<td class="text sticky-lx-1 bordr-right-none">农民工工资</td>
											<td class="info sticky-lx-2">{{ formatNumber(itemDatas.planToPayRuralLaborsSalaryPr)  }}
											</td>
											<td class="info bordr-right-none" v-for="value in roadSectionList" :key="value.id">
												{{ formatNumber(value.ruralLaborsSalary) }}</td>
										</tr>
										<tr>
											<td class="text sticky-lx-1 bordr-right-none">材料款</td>
											<td class="info sticky-lx-2">{{ formatNumber(itemDatas.planToPayMaterialAmountPr)  }}
											</td>
											<td class="info bordr-right-none" v-for="value in roadSectionList" :key="value.id">
												{{ formatNumber(value.materialAmount) }}</td>
										</tr>
										<tr>
											<td class="text sticky-lx-1 bordr-right-none text_white_space_normal">前期费用/动拆迁</td>
											<td class="info sticky-lx-2">{{ formatNumber(itemDatas.planToPayProphaseAmountPr)  }}
											</td>
											<td class="info bordr-right-none" v-for="value in roadSectionList" :key="value.id">
												{{ formatNumber(value.prophaseAmount) }}</td>
										</tr>
										<tr>
											<td class="text sticky-lx-1 bordr-right-none text_white_space_normal">前期费用/管线搬迁</td>
											<td class="info sticky-lx-2">{{ formatNumber(itemDatas.planToPayProphaseLineMigrationAmountPr)  }}
											</td>
											<td class="info bordr-right-none" v-for="value in roadSectionList" :key="value.id">
												{{ formatNumber(value.prophaseLineMigrationAmount) }}</td>
										</tr>
										<tr>
											<td class="text sticky-lx-1 bordr-right-none text_white_space_normal">前期费用/前期工程款</td>
											<td class="info sticky-lx-2">{{ formatNumber(itemDatas.planToPayProphaseConstructionAmountPr)  }}
											</td>
											<td class="info bordr-right-none" v-for="value in roadSectionList" :key="value.id">
												{{ formatNumber(value.prophaseConstructionAmount) }}</td>
										</tr>
										<tr>
											<td class="text sticky-lx-1 bordr-right-none bordr-bottom-none">二类费用等</td>
											<td class="info sticky-lx-2 bordr-bottom-none">{{ formatNumber(itemDatas.planToPayOtherAmountPr)  }}</td>
											<td class="info bordr-right-none bordr-bottom-none" v-for="value in roadSectionList" :key="value.id">
												{{ formatNumber(value.otherAmount) }}</td>
										</tr>
									</tbody>
								</table>
							</scroll-view>
							<view class="detail-row summary-row" v-if="roadSectionList.length > 0">
								<text class="detail-label summary-label">本次用款小计</text>
								<text
									class="detail-value summary-value">{{ formatNumber(itemDatas.planToPayTotalPr) }}</text>
							</view>
						</view>

						<scroll-view scroll-x class="table-scroll-x" v-if="roadSectionList.length == 0" @touchmove.stop="handleTableTouchMove">
							<!-- <table cellspacing="0" cellpadding="0" class="table1 margin_1 table1—left-border"> -->
							<table cellspacing="0" cellpadding="0" class="table1 margin_1">
								<tbody>
									<tr>
										<td colspan="2" class="type font_w sticky-1">支付渠道</td>
										<td class="type font_w text_right">总金额</td>
										<td class="type font_w text_right" v-for="value in roadSectionList"
											:key="value.id">{{ value.roadName }}</td>
									</tr>
									<tr>
										<td rowspan="5" class="type td_w1 sticky-1">城投拨付资金</td>
										<td class="type td_w2 sticky-2">市财力</td>
										<td class="info">{{ formatNumber(itemDatas.planToPayCtfundCityPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundCity) }}</td>
									</tr>
									<tr>
										<td class="type sticky-2">土地出让金</td>
										<td class="info">{{ formatNumber(itemDatas.planToPayCtfundLandTransferFeePr) }}
										</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundLandTransferFee) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2">专项债</td>
										<td class="info">
											{{ formatNumber(itemDatas.planToPayCtfundSpecialPurposeBondPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundSpecialPurposeBond) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2">城投其他资金</td>
										<td class="info">{{ formatNumber(itemDatas.planToPayCtfundOtherPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundOther) }}</td>
									</tr>
									<tr>
										<td class="type sticky-2">资本金</td>
										<td class="info">{{ formatNumber(itemDatas.planToPayCtfundCapitalPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundCapital) }}
										</td>
									</tr>
									<tr>
										<td rowspan="4" class="type sticky-1">城投拨付资金</td>
										<td class="type sticky-2">市财力</td>
										<td class="info">{{ formatNumber(itemDatas.planToPayNonCtfundCityPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundCity) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2">区县财力</td>
										<td class="info">{{ formatNumber(itemDatas.planToPayNonCtfundDistrictPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundDistrict) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2">自筹资金</td>
										<td class="info">{{ formatNumber(itemDatas.planToPayNonCtfundSelfPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundSelf) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2">其他</td>
										<td class="info">{{ formatNumber(itemDatas.planToPayNonCtfundOtherPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundOther) }}
										</td>
									</tr>
									<tr>
										<td rowspan="3" class="type sticky-1">直拨(无资金流入)</td>
										<td class="type sticky-2">交通专项</td>
										<td class="info">
											{{ formatNumber(itemDatas.planToPayDirectFundTransportationSpecialPr) }}
										</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayDirectFundTransportationSpecial) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2">超长期国债</td>
										<td class="info">{{ formatNumber(itemDatas.planToPayDirectFundUltraTbpr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayDirectFundUltraTb) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2">其他</td>
										<td class="info">{{ formatNumber(itemDatas.planToPayDirectFundOtherPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayDirectFundOther) }}
										</td>
									</tr>
									<tr>
										<td colspan="2" class="type sticky-1">开具银票(无资金流出)</td>
										<td class="info">{{ formatNumber(itemDatas.planToPayBankNotePr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayBankNote) }}</td>
									</tr>
								</tbody>
							</table>
						</scroll-view>

						<scroll-view scroll-x class="table-scroll-x" v-if="roadSectionList.length > 0" @touchmove.stop="handleTableTouchMove">
							<table cellspacing="0" cellpadding="0" class="table1 margin_1">
								<tbody>
									<tr>
										<td colspan="2" class="type font_w sticky-1-plus">支付渠道</td>
										<td class="type font_w text_right sticky-3-plus">总金额</td>
										<td class="type font_w text_right" v-for="value in roadSectionList"
											:key="value.id">{{ value.roadName }}</td>
									</tr>
									<tr>
										<td rowspan="6" class="type td_w1 sticky-1-plus">城投拨付资金</td>
										<td class="type td_w2 sticky-2-plus">市财力城区</td>
										<td class="info sticky-3-plus">{{ formatNumber(itemDatas.planToPayCtfundCityDistrictPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundCityDistrict) }}</td>
									</tr>
									<tr>
										<td class="type sticky-2-plus">市财力</td>
										<td class="info sticky-3-plus">{{ formatNumber(itemDatas.planToPayCtfundCityPr) }}
										</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundCity) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2-plus">土地出让金</td>
										<td class="info sticky-3-plus">{{ formatNumber(itemDatas.planToPayCtfundLandTransferFeePr) }}
										</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundLandTransferFee) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2-plus">专项债</td>
										<td class="info sticky-3-plus">
											{{ formatNumber(itemDatas.planToPayCtfundSpecialPurposeBondPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundSpecialPurposeBond) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2-plus">城投其他资金</td>
										<td class="info sticky-3-plus">{{ formatNumber(itemDatas.planToPayCtfundOtherPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundOther) }}</td>
									</tr>
									<tr>
										<td class="type sticky-2-plus">资本金</td>
										<td class="info sticky-3-plus">{{ formatNumber(itemDatas.planToPayCtfundCapitalPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayCtfundCapital) }}
										</td>
									</tr>
									<tr>
										<td rowspan="4" class="type sticky-1-plus">城投拨付资金</td>
										<td class="type sticky-2-plus">市财力</td>
										<td class="info sticky-3-plus">{{ formatNumber(itemDatas.planToPayNonCtfundCityPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundCity) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2-plus">区县财力</td>
										<td class="info sticky-3-plus">{{ formatNumber(itemDatas.planToPayNonCtfundDistrictPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundDistrict) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2-plus">自筹资金</td>
										<td class="info sticky-3-plus">{{ formatNumber(itemDatas.planToPayNonCtfundSelfPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundSelf) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2-plus">其他</td>
										<td class="info sticky-3-plus">{{ formatNumber(itemDatas.planToPayNonCtfundOtherPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayNonCtfundOther) }}
										</td>
									</tr>
									<tr>
										<td rowspan="3" class="type sticky-1-plus">直拨(无资金流入)</td>
										<td class="type sticky-2-plus">交通专项</td>
										<td class="info sticky-3-plus">
											{{ formatNumber(itemDatas.planToPayDirectFundTransportationSpecialPr) }}
										</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayDirectFundTransportationSpecial) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2-plus">超长期国债</td>
										<td class="info sticky-3-plus">{{ formatNumber(itemDatas.planToPayDirectFundUltraTbpr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayDirectFundUltraTb) }}
										</td>
									</tr>
									<tr>
										<td class="type sticky-2-plus">其他</td>
										<td class="info sticky-3-plus">{{ formatNumber(itemDatas.planToPayDirectFundOtherPr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayDirectFundOther) }}
										</td>
									</tr>
									<tr>
										<td colspan="2" class="type sticky-1-plus">开具银票(无资金流出)</td>
										<td class="info sticky-3-plus">{{ formatNumber(itemDatas.planToPayBankNotePr) }}</td>
										<td class="info" v-for="value in roadSectionList" :key="value.id">
											{{ formatNumber(value.roadSectionPlanToPayInfo.planToPayBankNote) }}</td>
									</tr>
								</tbody>
							</table>
						</scroll-view>

					</view>
				</transition>
			</view>

			<!-- 付款账户信息 -->
			<view class="section">
				<view class="section-title-2" @click="setOptions(PAYMENT_ACCOUNT_INFORMATION)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">付款账户信息</text>
					</view>
					<view class="section-title-2-right" :class="{ 'active': getOptions(PAYMENT_ACCOUNT_INFORMATION) }">

					</view>
				</view>
				<!-- 付款账户信息卡片 -->
				<transition name="collapse">
					<view class="account-info-section" v-if="getOptions(PAYMENT_ACCOUNT_INFORMATION)">
						<view style="height: 10rpx;"></view>
						<!-- 多个公司账户信息 -->
						<template v-if="itemDatas?.roadSectionList?.length > 0">
							<view class="account-card" v-for="item in itemDatas.roadSectionList" :key="item.id">
								<view class="account-company-title">{{ item.roadName || '' }}</view>
								<view class="account-info-block">
									<view class="account-info-row">
										<text class="account-info-label">付款银行(资金)</text>
										<text class="account-info-value">{{ item.paymentBank || '' }}</text>
									</view>
									<view class="account-info-row">
										<text class="account-info-label">付款账号(资金)</text>
										<text class="account-info-value">{{ item.paymentAccount || '' }}</text>
									</view>
									<view class="account-info-row">
										<text class="account-info-label">付款银行(银票)</text>
										<text class="account-info-value"> {{ item.paymentBankNote || '' }} </text>
									</view>
									<view class="account-info-row">
										<text class="account-info-label">付款账号(银票)</text>
										<text class="account-info-value">{{ item.paymentAccountNote || '' }}</text>
									</view>
								</view>
							</view>
						</template>
						<!-- 单个公司账户信息 -->
						<view class="account-card" v-else>
							<view class="account-company-title">{{ itemDatas.companyName || '' }}</view>
							<view class="account-info-block">
								<view class="account-info-row">
									<text class="account-info-label">付款银行(资金)</text>
									<text class="account-info-value">{{ itemDatas.paymentBank || '' }}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">付款账号(资金)</text>
									<text class="account-info-value">{{ itemDatas.paymentAccount || '' }}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">付款银行(银票)</text>
									<text class="account-info-value"> {{ itemDatas.paymentBankNote || '' }} </text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">付款账号(银票)</text>
									<text class="account-info-value">{{ itemDatas.paymentAccountBankNote || '' }}</text>
								</view>
							</view>
						</view>
					</view>
				</transition>
			</view>

			<!-- 收款账户信息 -->
			<view class="section">
				<view class="section-title-2" @click="setOptions(COLLECTION_ACCOUNT_INFORMATION)">
					<view class="section-title-2-left">
						<text class="section-title-vertical"></text>
						<text class="section-title-text">收款账户信息</text>
					</view>
					<view class="section-title-2-right"
						:class="{ 'active': getOptions(COLLECTION_ACCOUNT_INFORMATION) }">
					</view>
				</view>
				<!-- 收款账户信息卡片 -->
				<transition name="collapse">
					<view class="account-info-section" v-if="getOptions(COLLECTION_ACCOUNT_INFORMATION)">
						<view style="height: 10rpx;"></view>
						<!-- 第一个公司账户信息 -->
						<view class="account-card">
							<view class="account-company-title">农民工工资</view>
							<view class="account-info-block">
								<view class="account-info-row">
									<text class="account-info-label">收款单位</text>
									<text
										class="account-info-value">{{ itemDatas.receiverAccountNameRuralLaborPr || ''}}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">开户行</text>
									<text
										class="account-info-value">{{ itemDatas.receiverBankNameRuralLaborPr  || ''}}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">账号</text>
									<text
										class="account-info-value">{{ itemDatas.receiverAccountNumberRuralLaborPr  || ''}}</text>
								</view>
							</view>
						</view>

						<!-- 第二个公司账户信息 -->
						<view class="account-card">
							<view class="account-company-title">材料款、其他工程款</view>
							<view class="account-info-block">
								<view class="account-info-row">
									<text class="account-info-label">收款单位</text>
									<text
										class="account-info-value">{{ itemDatas.receiverAccountNameMncpr  || ''}}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">开户行</text>
									<text class="account-info-value">{{ itemDatas.receiverBankNameMncpr  || ''}}</text>
								</view>
								<view class="account-info-row">
									<text class="account-info-label">帐号</text>
									<text class="account-info-value"> {{ itemDatas.receiverAccountNumberMncpr  || ''}}
									</text>
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
		reactive,
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
		formatNumber,handleTableTouchMove,formatDateTimeMinute,processAttachmentData
	} from '@/utils/h5Bridge'
	import { useListHeight } from '@/utils/useListHeight.js'
	import { useApproval } from '@/utils/useApproval.js'
	import { useDetailCommon } from '@/utils/useDetailCommon.js'
	import detailNavBar from '@/components/navBar/detailNavBar.vue'
	import InputDialog from '@/components/inputDialog/inputDialog.vue'
	import approvalTimeline from '@/components/approvalTimeline/approvalTimeline.vue'
	import attachmentList from '@/components/attachmentList/attachmentList.vue'

	const currentType = ref('')
	const itemDetail = ref({})
	const itemDatas = ref({});
	const roadSectionList = ref([]);
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
			label: '项目名称',
			value: '',
			key: 'projectName'
		},
		{
			label: '项目阶段/预算事项',
			value: '',
			key: 'budgetContent'
		},
		{
			label: '付款单位',
			value: '',
			key: 'companyName'
		},
		{
			label: '合同名称',
			value: '',
			key: 'contractName'
		},
		{
			label: '合同编号',
			value: '',
			key: 'contractNo'
		},
		// {
		// 	label: '收款单位',
		// 	value: '',
		// 	key: 'payToCompany' //deng
		// },
		{
			label: '具体事项',
			value: '',
			key: 'detailedDescription'
		},
		{
			label: '业务性质',
			value: '',
			key: 'businessNature'
		},
		{
			label: '业务类别',
			value: '',
			key: 'businessCategory'
		},
		{
			label: '付款内容',
			value: '',
			key: 'contentDescription'
		},
		{
			label: '预算事项',
			value: '',
			key: 'lv1AccountName'
		},
		{
			label: '支付节点',
			value: '',
			// key: 'budgetCategoryId'
			key: 'budgetCategoryName'
		},
		// {
		// 	label: '业务备注',
		// 	value: '',
		// 	key: '' //deng
		// },
		// {
		// 	label: '备注',
		// 	value: '',
		// 	key: '' //deng
		// },
		{
			label: '保函有效期',
			value: '',
			key: 'guaranteeLetterValidTo'
		},
		{
			label: '业务摘要',
			value: '',
			key: 'businessRemarkPr'
		},
		{
			label: '是否有取得发票计划',
			value: '',
			key: 'hasInvoicePlan'
		},
		{
			label: '验工计价年月',
			value: '',
			key: 'settlementYearMonth'
		},
		{
			label: '验工计价期数',
			value: '',
			key: 'settlementPhase'
		},
	])

	let cc1 = reactive({
	"id": "e28c6698fb77416682a12131131332123123245c516bc",
	"roadId": "roadc8f5e0414ac0a0c16e42743a1001",
	"roadName": "S2沪芦",
	"paymentBank": "工商银行市分行营业部",
	"paymentAccount": "1001244319006338868-000000010",
	"paymentBankNote": null,
	"paymentAccountBankNote": null,
	"planToPayTotal": 30000000,
	"confirmed": 20000000,
	"estimated": 10000000,
	"constructionAmount": 20000000,
	"ruralLaborsSalary": null,
	"materialAmount": null,
	"prophaseAmount": 5000000,
	"otherAmount": 5000000,
	"status": "200",
	"lastApprovedBy": null,
	"lastApprovedByName": null,
	"lastApprovedDate": null,
	"roadSectionPlanToPayInfo": {
		"planToPayCtfundCityDistrict": 10000000,
		"planToPayCtfundCity": 10000000,
		"planToPayCtfundLandTransferFee": 10000000,
		"planToPayCtfundSpecialPurposeBond": null,
		"planToPayCtfundOther": null,
		"planToPayCtfundCapital": null,
		"planToPayNonCtfundCity": null,
		"planToPayNonCtfundDistrict": null,
		"planToPayNonCtfundSelf": null,
		"planToPayNonCtfundOther": null,
		"planToPayDirectFundTransportationSpecial": null,
		"planToPayDirectFundUltraTb": null,
		"planToPayDirectFundOther": null,
		"planToPayBankNote": null
	},
	"paymentBankList": []
})
	let cc2 = reactive({
	"id": "e28c6698fb774166werwerw82a13131213132123123245c516bc",
	"roadId": "roadc8f5e0414ac0a0c16e42743a1001",
	"roadName": "S2沪芦",
	"paymentBank": "工商银行市分行营业部",
	"paymentAccount": "1001244319006338868-000000010",
	"paymentBankNote": null,
	"paymentAccountBankNote": null,
	"planToPayTotal": 30000000,
	"confirmed": 20000000,
	"estimated": 10000000,
	"constructionAmount": 20000000,
	"ruralLaborsSalary": null,
	"materialAmount": null,
	"prophaseAmount": 5000000,
	"otherAmount": 5000000,
	"status": "200",
	"lastApprovedBy": null,
	"lastApprovedByName": null,
	"lastApprovedDate": null,
	"roadSectionPlanToPayInfo": {
		"planToPayCtfundCityDistrict": 10000000,
		"planToPayCtfundCity": 10000000,
		"planToPayCtfundLandTransferFee": 10000000,
		"planToPayCtfundSpecialPurposeBond": null,
		"planToPayCtfundOther": null,
		"planToPayCtfundCapital": null,
		"planToPayNonCtfundCity": null,
		"planToPayNonCtfundDistrict": null,
		"planToPayNonCtfundSelf": null,
		"planToPayNonCtfundOther": null,
		"planToPayDirectFundTransportationSpecial": null,
		"planToPayDirectFundUltraTb": null,
		"planToPayDirectFundOther": null,
		"planToPayBankNote": null
	},
	"paymentBankList": []
})
	let cc3 = reactive({
	"id": "e28c6698fb77416682a1213132131232122423423123245c516bc",
	"roadId": "roadc8f5e0414ac0a0c16e42743a1001",
	"roadName": "S2沪芦",
	"paymentBank": "工商银行市分行营业部",
	"paymentAccount": "1001244319006338868-000000010",
	"paymentBankNote": null,
	"paymentAccountBankNote": null,
	"planToPayTotal": 30000000,
	"confirmed": 20000000,
	"estimated": 10000000,
	"constructionAmount": 20000000,
	"ruralLaborsSalary": null,
	"materialAmount": null,
	"prophaseAmount": 5000000,
	"otherAmount": 5000000,
	"status": "200",
	"lastApprovedBy": null,
	"lastApprovedByName": null,
	"lastApprovedDate": null,
	"roadSectionPlanToPayInfo": {
		"planToPayCtfundCityDistrict": 10000000,
		"planToPayCtfundCity": 10000000,
		"planToPayCtfundLandTransferFee": 10000000,
		"planToPayCtfundSpecialPurposeBond": null,
		"planToPayCtfundOther": null,
		"planToPayCtfundCapital": null,
		"planToPayNonCtfundCity": null,
		"planToPayNonCtfundDistrict": null,
		"planToPayNonCtfundSelf": null,
		"planToPayNonCtfundOther": null,
		"planToPayDirectFundTransportationSpecial": null,
		"planToPayDirectFundUltraTb": null,
		"planToPayDirectFundOther": null,
		"planToPayBankNote": null
	},
	"paymentBankList": []
})

	const getFormDataApproval = () => {
		http.get(currentUrlObj[currentType.value], urlParams.value).then(res => {
			let data = res.data || {}
			itemDatas.value = data?.itemdata || {}
			infoRows.value.forEach(item => {
				item.value = itemDatas.value[item.key] || ''
                if(item.key === 'lv1AccountName'){
					if(itemDatas.value.lv2AccountName && itemDatas.value.lv3AccountName){
						item.value = itemDatas.value.lv2AccountName + '/' + itemDatas.value.lv3AccountName
					}else{
						item.value = itemDatas.value.lv3AccountName || itemDatas.value.lv2AccountName || itemDatas.value.lv1AccountName || ''
					}
                    
                }
                if(item.key === 'guaranteeLetterValidTo'){
                    item.value = formatDateTimeMinute(itemDatas.value[item.key])
                }
				if(item.key === 'hasInvoicePlan'){
					item.value = itemDatas.value[item.key] == true ? '是' : '否'
				}
			})

			const tagFields = ['businessCategory', 'businessUnitName', 'budgetCategoryName']
			for(const field of tagFields){
				itemDatas.value[field] && stageTags.value.push(itemDatas.value[field])
			}
			if(itemDatas.value.roadSectionList&&itemDatas.value.roadSectionList.length > 0){
				roadSectionList.value = itemDatas.value.roadSectionList
			}
			// else{
			// 	roadSectionList.value.push({...cc1})
			// 	roadSectionList.value.push({...cc2})
			// 	roadSectionList.value.push({...cc3})
			// }

			attachmentData.value = processAttachmentData(itemDatas.value?.attachmentList || [], ['工程付款申请单','工程费用支付申请表','发票','财务监理付款意见书','合同要求其他资料'])

			computeScrollHeight()
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
				// border: 2rpx solid #030303;
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
			padding: 0 32rpx 20rpx;
			.info-item-column{
                flex-direction: column;

			}
			.info-value-left{
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
					// border: 2rpx solid #ac4343;
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
				min-height: 48rpx;
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
                    word-break: break-all;
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
			// padding: 20rpx 30rpx 30rpx;
			padding: 0 32rpx 20rpx;

			.account-card {
				margin-bottom: 40rpx;

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



	.attachment-section {    
		padding: 20rpx 32rpx 40rpx;
	}
	.attachment-list {    
		display: flex;    
		flex-wrap: wrap;    
		gap: 24rpx;
	}
	.attachment-item {    
		width: 200rpx;    
		padding: 24rpx 16rpx 18rpx;    
		border-radius: 24rpx;  
		background: linear-gradient(180deg, #ffffff 0%, #f5f7ff 100%);   
		box-shadow: 0 8rpx 24rpx rgba(60, 108, 254, 0.08);    display: flex;    
		flex-direction: column;    align-items: center;    
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}
	.attachment-item:active {    
		transform: translateY(4rpx);   
		box-shadow: 0 6rpx 16rpx rgba(60, 108, 254, 0.12);
	}
	.attachment-item-icon {  
		width: 80rpx;   
		height: 80rpx;   
		border-radius: 50%;    
		background: rgba(60, 108, 254, 0.12);   
		display: flex;   
		align-items: center;    
		justify-content: center;   
		margin-bottom: 16rpx;
	}
	.attachment-item-name {   
   	    font-size: 24rpx;    
	    color: #333;   
		text-align: center;   
		line-height: 1.4;    
		word-break: break-word;
	}





// ------------------------------------------
	.margin_1 {
		margin-top: 40rpx;
	}

	.table1 {
		box-sizing: border-box;
		width: 100%;
	
		// border-left: 1px #a83737 solid;
		// border-top: 1px #ddd solid;
		// border: 1px #a83737 solid;
		// padding: 20rpx;	
	    // border-left: 2rpx #ddd solid;
		border-top: 2rpx #ddd solid;
		border-collapse: separate;
		border-spacing: 0;
	}
	.table1—left-border{
		border-left: 2rpx #ddd solid;
	}

	.table2 {
		box-sizing: border-box;
		width: 100%;
		border: none !important;

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
		border-bottom: 2rpx #ddd solid;
		border-right: 2rpx #ddd solid;
		padding: 16rpx;
		font-size: 24rpx;
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

    .text_white_space_normal{
		white-space: normal !important;
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
	.table1 td.sticky-1 { position: sticky; left: 0; top: 0; z-index: 3;max-width: 218.04rpx !important;min-width: 218.04rpx !important;box-sizing: border-box;  border-left: 2rpx #ddd solid; /* 解决左右滑动时，边框不显示 */ }
	.table1 td.sticky-2 { position: sticky; left: 218.04rpx;  z-index: 4;box-sizing: border-box; }
	.table1 td.sticky-3 { position: sticky; left: 440rpx;  z-index: 2;box-sizing: border-box; }

	 /* max-width: 55px !important;min-width: 55px !important;确保组件宽度始终精确为55px，忽略所有其他影响因素 */
	.table1 td.sticky-1-plus { position: sticky; left: 0; top: 0; z-index: 3;max-width: 110rpx !important;min-width: 110rpx !important;box-sizing: border-box; 
                              white-space: normal; /* 默认值，允许文本换行 */ border-left: 2rpx #ddd solid;  /* 解决左右滑动时，边框不显示 */
							  background-clip: padding-box; }
	.table1 td.sticky-2-plus { position: sticky; left: 110rpx;  z-index: 4;max-width: 118rpx !important;min-width: 118rpx !important;box-sizing: border-box;  white-space: normal; /* 默认值，允许文本换行 */
	                    	}
	.table1 td.sticky-3-plus { position: sticky; left: 228rpx;  z-index: 2;box-sizing: border-box;background: #fff; 
		                   }

	.table1 td.sticky-xz-1 { position: sticky; left: 0; top: 0; z-index: 3;max-width: 110rpx !important;min-width: 110rpx !important;background: #fff; white-space: normal; /* 默认值，允许文本换行 */}
	.table1 td.sticky-xz-2 { position: sticky; left: 110rpx;  z-index: 4;background: #fff;border-right: 2rpx #ddd solid !important; }
	.table1 td.sticky-xz-3 { position: sticky; left: 440rpx;  z-index: 2;background: #fff; }

	.table1 td.sticky-lx-1 { position: sticky; left: 0; top: 0; z-index: 3;max-width: 152rpx !important;min-width: 152rpx !important;background: #fff; }
	.table1 td.sticky-lx-2 { position: sticky; left: 152rpx;  z-index: 4;background: #fff;border-right: 2rpx #ddd solid !important; }
	.table1 td.sticky-lx-3 { position: sticky; left: 440rpx;  z-index: 2;background: #fff; }

	/* 审批记录独立样式区域 */
	.approval-record-section {
		padding: 20rpx 32rpx 40rpx;
		position: relative;
	}


	.bordr-none{
		border-bottom: none !important;
	}
	.bordr-right-none{
		border-right: none !important;
	}
	.bordr-bottom-none{
		border-bottom: none !important;
	}
</style>