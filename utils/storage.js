/* 设置 */
export const setStorage = (key, value, expireSeconds) => {
  try {
    const data = { value }
    if (expireSeconds && expireSeconds > 0) {
      data.expire = Date.now() + expireSeconds * 1000
    }
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.warn('localStorage set error:', e)
  }
}

/* 获取 */
export const getStorage = (key) => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const { value, expire } = JSON.parse(raw)
    if (expire && Date.now() > expire) {
      localStorage.removeItem(key)
      return null
    }
    return value
  } catch (e) {
    console.warn('localStorage get error:', e)
    return null
  }
}

/* 删除单个 */
export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.warn('localStorage remove error:', e)
  }
}

/* 清空全部 */
export const clearStorage = () => {
  try {
    localStorage.clear()
  } catch (e) {
    console.warn('localStorage clear error:', e)
  }
}