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