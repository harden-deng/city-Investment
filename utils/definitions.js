export const FUND_USAGE_STATUS = `fund_usage_status` // 用款情况
export const PAYMENT_ACCOUNT_INFORMATION = `payment_account_information`  // 付款账户信息
export const COLLECTION_ACCOUNT_INFORMATION = `collection_account_information` // 收款账户信息
export const APPROVAL_RECORD = `approval_record` // 审批记录
export const ATTACHMENT_LIST = `attachment_list` // 附件列表

export const procDefCodeUrlObj = {
  'GC01': '/pages/detail/gcfk', //工程类款项(孙总)11/11 
  'SG01': '/pages/detail/sgjf', //三公经费(孙总)11/11
  'KY01': '/pages/detail/kyjf', //科研经费(孙总)11/11
  'DB01': '/pages/detail/zjdb', //资金调拨(孙总)11/11
  'SR01': '/pages/detail/srqr', //收入确认(宋来文)11/19 (需要再测)
  'QT01': '/pages/detail/qtjf', //其他(罗运永)11/19
  'XM01': '/pages/detail/szxm',  //市政项目(罗运永)11/19
  'ZZ01': '/pages/detail/fyzz',  //费用暂支(张旭)11/21
  'CB01': '/pages/detail/cbqr',  //成本确认(张旭)11/21 
  'HX01': '/pages/detail/zzhx',  //暂支核销(宋来文)11/25
  'ZC01': '/pages/detail/zcys',  //支出预算(孙总)11/28
}

export const currentUrlObj = {
  pending: '/WF/GetFormDataApproval',
  completed: '/WF/GetFormDataView'
}

//用于支出预算
 export const infoRowsArray = [
  [{
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
 [{
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
   ]
 ]