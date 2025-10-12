type StorageValue = string | number | boolean | object | null

interface StorageData<T = StorageValue> {
  value: T
  expire?: number // 过期时间戳（ms）
}

/* 设置 */
export const setStorage = <T = StorageValue>(
  key: string,
  value: T,
  expireSeconds?: number // 传值则 N 秒后过期
): void => {
  try {
    const data: StorageData<T> = { value }
    if (expireSeconds && expireSeconds > 0) {
      data.expire = Date.now() + expireSeconds * 1000
    }
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.warn('localStorage set error:', e)
  }
}

/* 获取 */
export const getStorage = <T = StorageValue>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const { value, expire }: StorageData<T> = JSON.parse(raw)
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
export const removeStorage = (key: string): void => {
  try {
    localStorage.removeItem(key)
  } catch (e) {
    console.warn('localStorage remove error:', e)
  }
}

/* 清空全部 */
export const clearStorage = (): void => {
  try {
    localStorage.clear()
  } catch (e) {
    console.warn('localStorage clear error:', e)
  }
}