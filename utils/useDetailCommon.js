// utils/useDetailCommon.js
import { reactive, computed } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { getCurrentInstance } from 'vue'
import {
  FUND_USAGE_STATUS,
  APPROVAL_RECORD,
  PAYMENT_ACCOUNT_INFORMATION,
  COLLECTION_ACCOUNT_INFORMATION,
  ATTACHMENT_LIST,
} from '@/utils/definitions'

export function useDetailCommon(options = {}) {
  const {
    itemDetail,
    currentType,  
    itemDatas,
    sections = [
      FUND_USAGE_STATUS,
      APPROVAL_RECORD,
      PAYMENT_ACCOUNT_INFORMATION,
      COLLECTION_ACCOUNT_INFORMATION,
      ATTACHMENT_LIST,
    ],
    defaultStates = {},
    onDetailOpen, // 新增：回调函数
  } = options

  // 初始化区块状态
  const initSectionStates = () => {
    const states = {}
    sections.forEach(section => {
      states[section] = defaultStates[section] !== undefined 
        ? defaultStates[section] 
        : true
    })
    return reactive(states)
  }

  const pullDownObj = initSectionStates()

  const setOptions = (name) => {
    if (pullDownObj.hasOwnProperty(name)) {
      pullDownObj[name] = !pullDownObj[name]
    }
  }

  const getOptions = (name) => {
    return pullDownObj[name] ?? false
  }

  // eventChannel 处理逻辑
  let eventChannel = null
  let handleOpenDetail = null

  onLoad(() => {
    const instance = getCurrentInstance()
    eventChannel = instance?.proxy?.getOpenerEventChannel?.()
    
    if (eventChannel && onDetailOpen) {
      handleOpenDetail = (data) => {
        if (currentType) currentType.value = data.type
        if (itemDetail) itemDetail.value = data.order
        onDetailOpen(data)
      }
      eventChannel.on('open-detail', handleOpenDetail)
    }
  })

  onUnload(() => {
    if (eventChannel && handleOpenDetail) {
      eventChannel.off('open-detail', handleOpenDetail)
    }
    handleOpenDetail = null
  })

  const urlParams = computed(() => {
    if (!itemDetail?.value || !currentType?.value) {
      return null
    }
    
    const { procDefCode } = itemDetail.value
    
    if (currentType.value === 'pending') {
      return {
        procCode: procDefCode,
        workitemid: itemDetail.value.workItemId
      }
    }
    
    if (currentType.value === 'completed') {
      return {
        procCode: procDefCode,
        wfInstanceId: itemDetail.value.wfinstanceId
      }
    }
    
    return null
  })

  const wfstatusText = computed(() => {
    return itemDatas?.value?.wfstatus == 'Running' ? '流转中' : (itemDatas?.value?.wfstatus == 'Completed' ? '已审批' : '')
  })

  return {
    pullDownObj,
    urlParams,
    wfstatusText,
    setOptions,
    getOptions,
  }
}