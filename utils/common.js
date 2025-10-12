/**
 * 导航栏工具函数 - 可在多个页面组件中复用
 * 提供状态栏高度、导航栏高度计算及返回功能
 */

import { ref } from 'vue'

/**
 * 使用导航栏高度计算功能
 * @returns 包含高度数据和初始化方法的对象
 */
export const useNavigationBar = () => {
  const statusBarHeight = ref(0)
  const navHeight = ref(0)
  const navigationBarHeight = ref(0)
  
  /**
   * 初始化导航栏高度计算
   * 需要在页面onLoad生命周期中调用
   */
  const initNavigationBar = () => {
    // 状态栏高度
    statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight
    // #ifdef MP-WEIXIN
    const custom = wx.getMenuButtonBoundingClientRect()
    // 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
    navigationBarHeight.value = custom.height + (custom.top - statusBarHeight.value) * 2
     
    // 总体高度 = 状态栏高度 + 导航栏高度
    navHeight.value = navigationBarHeight.value + statusBarHeight.value
    // #endif
  }
  
  return {
    statusBarHeight,
    navHeight,
    navigationBarHeight,
    initNavigationBar
  }
}

/**
 * 页面返回方法
 * 可在任何需要返回操作的组件中调用
 */
export const toBack = () => {
  uni.navigateBack()
}