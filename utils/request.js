/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
import myconfig from './config.js'

export default {
	config: {
		baseUrl: myconfig.base_url,
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
		},
		data: {},
		method: "POST",
		dataType: "json",
		responseType: "text",
		token: '',
		success() {},
		fail() {},
		complete() {}
	},
	// Token 缓存，避免频繁读取存储
	_tokenCache: null,
	
	// 请求去重 Map，key: url+method+JSON.stringify(data)
	_pendingRequests: new Map(),
	
	// 获取 token（带缓存）
	_getToken() {
		// 读取并更新缓存
		this._tokenCache = uni.getStorageSync('token') || null
		this.config.token = this._tokenCache
		return this._tokenCache
	},
	// 清除 token 缓存
	_clearTokenCache() {
		this._tokenCache = null
		this.config.token = null
		uni.clearStorageSync()
	},
	setToken(token) {
		this.config.token = token
		uni.setStorageSync('token', token)
	},
	getToken(){
		return this.config.token || this._getToken();
	},
	// 生成请求唯一标识
	_getRequestKey(url, method, data) {
		return `${method}:${url}:${JSON.stringify(data || {})}`
	},
	
	request(options) {
		if (!options) {
			options = {}
		}
		
		// 合并配置，减少对象创建
		const baseUrl = options.baseUrl || this.config.baseUrl
		const dataType = options.dataType || this.config.dataType
		const method = options.method || this.config.method
		const url = `${baseUrl}${options.url}` // 使用模板字符串
		
		// 构建请求唯一标识
		const requestKey = this._getRequestKey(url, method, options.data)
		
		// 请求去重：如果相同请求正在进行，返回同一个 Promise
		if (this._pendingRequests.has(requestKey)) {
			return this._pendingRequests.get(requestKey)
		}
		
		// 构建 header（一次性构建，避免多次对象创建）
		const token = this.getToken() // 只读取一次
		const header = {
			...this.config.header,
			...options.header,
			'Content-Type': dataType === 'json' 
				? 'application/json;charset=UTF-8'
				: 'application/x-www-form-urlencoded;charset=UTF-8'
		}
		
		if (token) {
			header['Authorization'] = `Bearer ${token}` // 使用模板字符串
		}
		
		// 创建 Promise
		const requestPromise = new Promise((resolve, reject) => {
			const _config = {
				...this.config,
				...options,
				url,
				method,
				dataType,
				header,
				data: options.data || {},
				sslVerify: false,
				requestId: Date.now() // 使用 Date.now() 替代 new Date().getTime()
			}
			
			_config.complete = (response) => {
				// 请求完成，从 pending 中移除
				this._pendingRequests.delete(requestKey)
				console.log('response', response)
				const statusCode = response.statusCode
				switch (statusCode) {
					case 200:	
						resolve(response.data);
						break;
					case 401:
						// 清除 token 缓存
						this._clearTokenCache()
						uni.showToast({
							title: '登录过期，请重新登录',
							icon: 'none',
							duration: 4500
						})
						uni.reLaunch({
							url: '/pages/index/index'
						})
						reject(response)
						break;
					case 404:
						uni.showToast({
							title: '您访问的链接可能已失效或输入有误',
							icon: 'none',
							duration: 3500
						})
						reject(response)
						break;
					default:
						uni.showToast({
							title: `状态码：${statusCode}，接口：${_config.url}请求失败，请稍后重试`,
							icon: 'none',
							duration: 2500
						})
						reject(response)
						break;
				}
			}
			
			// 开发环境日志优化：合并为一次输出
			if (process.env.NODE_ENV === 'development') {
				console.log('请求信息:', {
					url: _config.url,
					method: _config.method,
					header: _config.header,
					data: _config.data
				})
			}
			
			uni.request(_config);
		})
		
		// 将请求加入 pending Map
		this._pendingRequests.set(requestKey, requestPromise)
		
		// 请求完成后自动清理（防止内存泄漏）
		requestPromise.finally(() => {
			// 延迟清理，给可能的重复请求留出时间
			setTimeout(() => {
				this._pendingRequests.delete(requestKey)
			}, 500)
		})
		
		return requestPromise
	},
	
	get(url, data, options) {
		options = options || {}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	
	post(url, data, options) {
		options = options || {}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	
	put(url, data, options) {
		options = options || {}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	
	delete(url, data, options) {
		options = options || {}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}