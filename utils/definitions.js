export const FUND_USAGE_STATUS = `fund_usage_status` // 用款情况
export const PAYMENT_ACCOUNT_INFORMATION = `payment_account_information`  // 付款账户信息
export const COLLECTION_ACCOUNT_INFORMATION = `collection_account_information` // 收款账户信息
export const APPROVAL_RECORD = `approval_record` // 审批记录
export const ATTACHMENT_LIST = `attachment_list` // 附件列表

export const procDefCodeUrlObj = {
  'GC01': '/pages/detail/gcfk', //工程类款项11/11
  'SG01': '/pages/detail/sgjf', //三公经费11/11
  'KY01': '/pages/detail/kyjf', //科研经费11/11
  'DB01': '/pages/detail/zjdb', //资金调拨11/11
  'SR01': '/pages/detail/srqr', //收入确认11/19
  'QT01': '/pages/detail/qtjf', //其他11/19
  'XM01': '/pages/detail/szxm',  //市政项目11/19
  'ZZ01': '/pages/detail/fyzz',  //费用暂支11/21
  'CB01': '/pages/detail/cbqr',  //成本确认11/21 
  'ZC01': '/pages/detail/zcys',  //支出预算
}
export const currentUrlObj = {
  pending: '/WF/GetFormDataApproval',
  completed: '/WF/GetFormDataView'
}