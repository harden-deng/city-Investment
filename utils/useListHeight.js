import { ref, nextTick, onMounted, getCurrentInstance } from 'vue'
/**
 * 计算列表高度的 composable
 * 类似 Vue 2 的 mixin，可以在多个组件中复用
 * 
 * @param {Object} options - 配置选项
 * @param {String} options.headerSelector - 头部选择器，默认为 '.header-stickt'
 * @param {String} options.fallbackHeight - 兜底高度，默认为 'calc(100vh - 50px)'
 * @param {Boolean} options.autoCompute - 是否自动计算，默认为 true
 * @param {Boolean} options.enableResize - 是否监听窗口大小变化，默认为 true
 * @returns {Object} 返回 { listHeight, computeScrollHeight }
 */
export function useListHeight(options = {}) {
  const {
    headerSelector = '.header-stickt',
    fallbackHeight = 'calc(100vh - 50px)',
    autoCompute = true,
    enableResize = true,
    iosFit = false,
  } = options

  // 列表高度
  const listHeight = ref('')

  /**
   * 计算列表高度
   */
  const computeScrollHeight = () => {
    try {
      const { windowHeight } = uni.getSystemInfoSync() // px
      const inst = getCurrentInstance()
      const q = uni.createSelectorQuery().in(inst?.proxy)
      
      q.select(headerSelector).boundingClientRect(rect => {
        const headerH = rect?.height || 0
        const h = Math.max(0, windowHeight - headerH)
        listHeight.value = `${h}px`
      }).exec()
    } catch (e) {
      console.warn('计算列表高度失败:', e)
      // 兜底，避免阻塞页面
      listHeight.value = fallbackHeight
    }
  }

  // 页面显示时重新计算高度
  if (autoCompute) {
    // 页面挂载时计算高度
    onMounted(() => {
      console.log('页面加载完成，计算列表高度')
      nextTick(() => computeScrollHeight())
      
      // 横竖屏切换/窗口改变时重算（H5 有效）
      if (enableResize) {
        uni.onWindowResize?.(() => computeScrollHeight())
      }
      //这块适用于详情审批
      if(iosFit){
        const systemInfo = uni.getSystemInfoSync()
		const isIOS = systemInfo.platform === 'ios'
		const isH5 = systemInfo.platform === 'h5' || process.env.UNI_PLATFORM === 'h5'
		if (isIOS && isH5) {
			// 这段代码是一个针对移动端浏览器（特别是iOS）的适配处理，主要解决的是移动端输入框唤起键盘后页面滚动的问题
			// 监听'focusout'事件（输入框失去焦点时触发）
			// 使用setTimeout延迟20ms执行滚动操作
			// 将页面滚动回顶部（top: 0）
			// behavior: 'instant' 表示立即滚动，不带动画
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
			window.visualViewport?.addEventListener('resize', ()=> computeScrollHeight())
			window.addEventListener('resize', ()=> computeScrollHeight())
		}
      }
      
    })
  }
  return {
    listHeight,
    computeScrollHeight
  }
}