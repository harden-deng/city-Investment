// uni-app 全局类型声明
declare global {
  const uni: any
  const getCurrentPages: () => any[]
  
  interface Window {
    uni: any
  }
}

export {}
