// utils/useDetailCommon.js
import { reactive, computed } from 'vue'
import {
  FUND_USAGE_STATUS,
  APPROVAL_RECORD,
  PAYMENT_ACCOUNT_INFORMATION,
  COLLECTION_ACCOUNT_INFORMATION,
  ATTACHMENT_LIST,
} from '@/utils/definitions'

/**
 * 详情页通用逻辑 composable
 * 类似 Vue 2 的 mixin，可以在多个详情页组件中复用
 * 
 * @param {Object} options - 配置选项
 * @param {Object} options.itemDetail - 详情数据对象（ref）
 * @param {Object} options.itemDatas - 详情数据对象（ref）
 * @param {Object} options.currentType - 当前类型（ref），'pending' 或 'completed'
 * @param {Array} options.sections - 需要控制的区块列表，默认为所有区块
 * @param {Object} options.defaultStates - 各区块的默认展开状态，默认为全部展开
 * @returns {Object} 返回可折叠区块和 URL 参数相关的方法和状态
 */
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
  } = options
 console.log('来了这里了吗1111',itemDatas.value)
  // 初始化区块状态
  const initSectionStates = () => {
    const states = {}
    sections.forEach(section => {
      // 如果提供了默认状态，使用默认状态，否则默认为 true（展开）
      states[section] = defaultStates[section] !== undefined 
        ? defaultStates[section] 
        : true
    })
    return reactive(states)
  }

  // 可折叠区块状态管理
  const pullDownObj = initSectionStates()

  /**
   * 切换区块展开/收起状态
   * @param {String} name - 区块名称
   */
  const setOptions = (name) => {
    if (pullDownObj.hasOwnProperty(name)) {
      pullDownObj[name] = !pullDownObj[name]
    }
  }

  /**
   * 获取区块展开/收起状态
   * @param {String} name - 区块名称
   * @returns {Boolean} 是否展开
   */
  const getOptions = (name) => {
    return pullDownObj[name] ?? false
  }

  /**
   * 批量设置区块状态
   * @param {Object} states - 状态对象，如 { [APPROVAL_RECORD]: false }
   */
//   const setMultipleOptions = (states) => {
//     Object.keys(states).forEach(name => {
//       if (pullDownObj.hasOwnProperty(name)) {
//         pullDownObj[name] = states[name]
//       }
//     })
//   }

  /**
   * 展开所有区块
   */
//   const expandAll = () => {
//     Object.keys(pullDownObj).forEach(name => {
//       pullDownObj[name] = true
//     })
//   }

  /**
   * 收起所有区块
   */
//   const collapseAll = () => {
//     Object.keys(pullDownObj).forEach(name => {
//       pullDownObj[name] = false
//     })
//   }

  /**
   * 详情页 URL 参数计算属性
   * 根据 currentType 和 itemDetail 自动生成对应的请求参数
   */
  const urlParams = computed(() => {
    if (!itemDetail?.value || !currentType?.value) {
      return null
    }

    const params = {
      pending: {
        procCode: itemDetail.value.procDefCode,
        workitemid: itemDetail.value.workItemId
      },
      completed: {
        procCode: itemDetail.value.procDefCode,
        wfInstanceId: itemDetail.value.wfinstanceId
      }
    }

    return params[currentType.value] || null
  })

  const wfstatusText = computed(() => {
    return itemDatas?.value?.wfstatus == 'Running' ? '流转中' : (itemDatas?.value?.wfstatus == 'Completed' ? '已审批' : '')
  })

  return {
    // 状态
    pullDownObj,
    urlParams,
    wfstatusText,
    // 方法
    setOptions,
    getOptions,
    // setMultipleOptions,
    // expandAll,
    // collapseAll,
  }
}