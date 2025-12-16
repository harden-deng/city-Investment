// utils/h5Bridge.ts
import {
	onMounted,
	onUnmounted
} from 'vue'


export function useH5Bridge(onAppMessage) {
	const isInApp = !!(typeof window !== 'undefined' && (window).uni?.postMessage)

	// H5 -> App
	function postToApp(msg) {
		if ((window).uni?.postMessage) {
			;
			(window).uni.postMessage({
				data: msg
			})
		} else if (window.parent && window.parent !== window) {
			// 浏览器中联调（非 App 环境）
			window.parent.postMessage({
				from: 'h5',
				data: msg
			}, '*')
		} else {
			console.warn('不在 App WebView 环境，直接本地处理:', msg)
		}
	}

	// App -> H5（App 端通过 evalJS 调用 window.__onAppMessage）
	;
	(window).__onAppMessage = (data) => {
		onAppMessage?.(data)
	}

	// 纯浏览器联调回传
	const onWindowMessage = (e) => {
		const data = (e.data && (e.data.data || e.data))
		if (!data?.type) return
		onAppMessage?.(data)
	}

	onMounted(() => {
		window.addEventListener('message', onWindowMessage)
	})
	onUnmounted(() => {
		window.removeEventListener('message', onWindowMessage)
		if ((window).__onAppMessage)(window).__onAppMessage = null
	})

	return {
		isInApp,
		postToApp
	}
}

export function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
        gapTime = 1500
    }

    let _lastTime = null

    // 返回新的函数
    return function() {
        let _nowTime = +new Date()
        if (_nowTime - _lastTime > gapTime || !_lastTime) {
            fn.apply(this, arguments) //将this和参数传给原函数
            _lastTime = _nowTime
        }
    }
}


export function formatRelativeTime(dateString) {
    if (!dateString) return ''
    
    const now = new Date()
    const targetDate = new Date(dateString)
    
    // 如果日期无效，返回原字符串
    if (isNaN(targetDate.getTime())) {
        return dateString
    }
    
    const diffInSeconds = Math.floor((now - targetDate) / 1000)
    
    if (diffInSeconds < 60) {
        return '刚刚'
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) {
        return `${diffInMinutes}分钟前`
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) {
        return `${diffInHours}小时前`
    }
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 30) {
        return `${diffInDays}天前`
    }
    
    const diffInMonths = Math.floor(diffInDays / 30)
    if (diffInMonths < 12) {
        return `${diffInMonths}个月前`
    }
    
    const diffInYears = Math.floor(diffInMonths / 12)
    return `${diffInYears}年前`
}

// 方法1：使用 toLocaleString() - 推荐
export function formatNumber(num) {
	if (num === null || num === undefined || isNaN(num)) {
	  return '0.00';
	}
	return Number(num).toLocaleString('en-US', {
	  minimumFractionDigits: 2,
	  maximumFractionDigits: 2
	});
  }

export function formatDateTime(dateString) {
    if (!dateString) return ''
    // 去掉最后的 :秒 部分
    return dateString.substring(0, 16)
}
export function formatDateTimeMinute(dateString) {
    if (!dateString) return ''
    // 去掉最后的 :秒 部分，只保留时分
    return dateString.substring(0, 10)
}

export function goBack() {
	if (typeof window !== 'undefined' && (window).uni?.postMessage) {
		(window).uni.navigateBack()
	} else {
		window.history.back()
	}
}

	// 处理表格横向滚动时的 touchmove 事件
export	const handleTableTouchMove = (e) => {
		// 阻止事件冒泡到外层 scroll-view
		e.stopPropagation()
		// 只有在事件可取消时才阻止默认行为
		if (e.cancelable && !e.defaultPrevented) {
			// 允许横向滚动继续
		}
	}

	// 处理表格横向滚动时的 touchmove 事件
	export	const handleAmount = (num,item) => {
		if (num === null || num === undefined || isNaN(num) || num === 0) {
			let arr = JSON.parse(item.keyInfo)
			let val = arr[arr.length - 1]
			if(val.includes('￥')){
				return val.replace('￥', '')
			}else{
				return '0.00'
			}
		}
		return Number(num).toLocaleString('en-US', {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		});
	}


	export const sumNestedProperties = (obj, properties) => {
        return properties.reduce((sum, prop) => sum + (obj[prop] || 0), 0);
    }
    export const totalNestedValue = (array,properties) => {
        return array.reduce((accumulator, currentValue) => {
            return accumulator + currentValue[properties];
        }, 0);
    }

	// 主要目的是将扁平数组按照指定的 groupKey 转换成树形结构。
    export const flatToTree = (list, groupKey) => {
		return list.reduce((m, item) => {
			const key = item[groupKey];
			if (!m.has(key)) m.set(key, { [groupKey]: key, children: [] });
			m.get(key).children.push(item);
			return m;
		}, new Map())
	}


	export const detectImageType = (base64Data) => {
		// 移除data URL前缀（如果有）
		const base64 = base64Data.includes(',') 
			? base64Data.split(',')[1] 
			: base64Data;
		
		const binary = atob(base64.substring(0, 20)); // 解码前20个字符
		const bytes = new Uint8Array(binary.length);
		
		for (let i = 0; i < binary.length; i++) {
			bytes[i] = binary.charCodeAt(i);
		}
		
		// 检查文件头
		if (bytes[0] === 0xFF && bytes[1] === 0xD8) return 'jpeg';
		if (bytes[0] === 0x89 && bytes[1] === 0x50 && 
			bytes[2] === 0x4E && bytes[3] === 0x47) return 'png';
		if (bytes[0] === 0x47 && bytes[1] === 0x49 && 
			bytes[2] === 0x46) return 'gif';
		if (bytes[0] === 0x42 && bytes[1] === 0x4D) return 'bmp';
		if (bytes[0] === 0x52 && bytes[1] === 0x49 && 
			bytes[2] === 0x46 && bytes[3] === 0x46) return 'webp';
		
		return 'png';
	}

	/**
	 * 处理附件数据，将附件列表按分类组织成树形结构
	 * 
	 * @param {Array} attachmentList - 原始附件列表
	 * @param {Array} categories - 分类列表
	 * @returns {Array} 处理后的附件数据
	 */
	export function processAttachmentData(attachmentList = [], categories = []) {
		// 处理附件列表，统一格式
		const processedList = (attachmentList || []).map(item => ({
				fileTagName: item.fileTagName,
				fileName: item.fileName,
				fileUrl: item.fileUrl,
				id: item.attachmentId
		}))
	
		// 初始化分类结构
		const result = categories.map(category => ({
				fileTagName: category,
				children: []
		}))
	
		// 使用 Map 提高查找效率
		const categoryMap = new Map()
		result.forEach(item => {
		   categoryMap.set(item.fileTagName, item)
		})
	
		// 将附件分配到对应分类
		processedList.forEach(attachment => {
			const parent = categoryMap.get(attachment.fileTagName)
			if (parent) {
				parent.children.push(attachment)
			}
		})
	
		return result
	}
			
		


