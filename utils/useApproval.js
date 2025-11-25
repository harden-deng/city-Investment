// utils/composables/useApproval.js
import { ref, onUnmounted } from 'vue'
import http from '@/utils/request.js'
import {
  goBack
} from '@/utils/h5Bribge'
/**
 * 审批提交的 composable
 * 类似 Vue 2 的 mixin，可以在多个组件中复用
 * 
 * @param {Object} options - 配置选项
 * @param {Object} options.itemDetail - 详情数据对象（ref）
 * @param {Object} options.currentType - 当前类型（ref），用于判断是否需要刷新列表
 * @param {Function} options.onSuccess - 成功后的回调函数
 * @param {Function} options.onError - 失败后的回调函数
 * @param {String} options.successMessage - 成功提示信息，默认为 '已审批'
 * @param {Boolean} options.autoGoBack - 成功后是否自动返回，默认为 true
 * @param {Boolean} options.autoRefresh - 成功后是否自动刷新列表，默认为 true
 * @returns {Object} 返回审批相关的方法和状态
 */
export function useApproval(options = {}) {
  const {
    itemDetail,
    currentType,
    onSuccess,
    onError,
    successMessage = '已审批',
    autoGoBack = true,
    autoRefresh = true
  } = options

  // 输入对话框相关
  const inputDialogRef = ref(null)
  const inputDialogRequired = ref(false)
  const inputDialogTitle = ref('')
  const inputDialogPlaceholder = ref('')
  const inputDialogValue = ref('')
  //获取审批记录相关
  const approvalRecordList = ref([])

   // 保存定时器 ID
   let timeoutId = null
	const getApprovalRecord = () => {
		http.get('/WF/GetApprovalHistory', {
			wfinstanceId: itemDetail.value.wfinstanceId,
		}).then(res => {
			approvalRecordList.value = res.data || []
		})
	}
  /**
   * 打开输入对话框
   * @param {String} title - 对话框标题
   * @param {String} placeholder - 输入框占位符
   * @param {Boolean} required - 是否必填
   */
  const openInputDialog = (title, placeholder, required = false) => {
    inputDialogTitle.value = title
    inputDialogPlaceholder.value = placeholder
    inputDialogRequired.value = required
    inputDialogValue.value = ''
    inputDialogRef.value?.open()
  }
	const onReject = () => {
		openInputDialog('打回原因', '请输入打回原因',true)
	}

	const onApprove = () => {
		openInputDialog('通过原因', '请输入通过原因',false)
	}
  /**
   * 处理输入确认
   * @param {String} value - 输入的值
   * @param {String|Boolean} dialogType - 审批类型（true/false 或 'approve'/'reject'）
   */
  const handleInputConfirm = (value, dialogType) => {
    inputDialogValue.value = value
    inputDialogRef.value?.close()
    doSubmitApproval(dialogType)
  }

  /**
   * 处理输入取消
   */
  const handleInputCancel = () => {
    inputDialogRef.value?.close()
    inputDialogValue.value = ''
  }

  /**
   * 提交审批
   * @param {String|Boolean} dialogType - 审批类型
   * @param {Object} extraParams - 额外的参数
   */
  const doSubmitApproval = (dialogType, extraParams = {}) => {
    if (!itemDetail?.value) {
      uni.showToast({
        title: '缺少审批信息',
        icon: 'none'
      })
      return
    }

    const params = {
      wfInstanceId: itemDetail.value.wfinstanceId,
      workItemId: itemDetail.value.workItemId,
      approvalComment: inputDialogValue.value,
      annotationComment: '',
      pictureBaseData: '',
      isApproval: dialogType,
      procDefCode: itemDetail.value.procDefCode,
      ...extraParams // 允许传入额外参数
    }
    http.post('/WF/SubmitApproval', params).then(res => {
      if (res.code === 0) {
        uni.showToast({
          title: successMessage,
          icon: 'success'
        })

        // 执行成功回调
        if (onSuccess) {
          onSuccess(res)
        }

        timeoutId = setTimeout(() => {
          // 自动刷新列表
          if (autoRefresh && currentType?.value === 'pending') {
            uni.$emit('refresh-pending')
            uni.$emit('refresh-completed')
          }

          // 自动返回
          if (autoGoBack) {
             goBack();
          }
        }, 1000)
      } else {
        uni.showToast({
          title: res.message || '审批失败',
          icon: 'none'
        })

        // 执行失败回调
        if (onError) {
          onError(res)
        }
      }
    }).catch(err => {
      console.error('审批提交失败:', err)
      uni.showToast({
        title: '网络错误，请重试',
        icon: 'none'
      })

      // 执行失败回调
      if (onError) {
        onError(err)
      }
    })
  }
  // 组件卸载时清理定时器
  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  })

  return {
    // 输入对话框相关
    inputDialogRef,
    inputDialogRequired,
    inputDialogTitle,
    inputDialogPlaceholder,
    inputDialogValue,
    approvalRecordList,
    // 方法
    openInputDialog,
    handleInputConfirm,
    handleInputCancel,
    doSubmitApproval,
    onReject,
    onApprove,
    getApprovalRecord
  }
}