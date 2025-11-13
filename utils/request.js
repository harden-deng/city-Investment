/**
 * 通用uni-app网络请求
 * 基于 Promise 对象实现更简单的 request 使用方式，支持请求和响应拦截
 */
/*

*/
import myconfig from './config.js'

export default {
	config: {
		baseUrl: myconfig.base_url,
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			// 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
		},
		data: {},
		method: "POST",
		dataType: "json",
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	// 拦截器
	// interceptor: {
	// 	request: null, //请求
	// 	response: null //响应
	// },
	request(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.sslVerify = false
		options.data = options.data || {}
		options.method = options.method || this.config.method
		if (options.dataType === 'json') {
			options.header = {
				...options.header,
				'Content-Type': 'application/json;charset=UTF-8',
			}
		} else {
			options.header = {
				...options.header,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}

		if (uni.getStorageSync('token')) {
			options.header = {
				...options.header,
				'Authorization': 'Bearer' + ' ' + uni.getStorageSync('token') || '',
			}
		} else {
			options.header = {
				...options.header,
			}
		}
		return new Promise((resolve, reject) => {
			let _config = null
			options.complete = (response) => {
				let statusCode = response.statusCode
				response.config = _config
			
				if (statusCode === 200) { //成功
					resolve(response.data);
				} else if (statusCode === 401) {
					uni.clearStorageSync()
					uni.setStorageSync('token','')
					uni.reLaunch({
					    url: '/pages/index/index'
					})
				} else {
					reject(response)
					// console.log(JSON.stringify(response));
					// console.log("login err=: ", response);
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			// if (this.interceptor.request) {
			// 	this.interceptor.request(_config)
			// }
			// 在请求前添加日志
			if (process.env.NODE_ENV === 'development') {
				console.log('请求_config:', _config)
				console.log('请求URL:', _config.url)
				console.log('请求方法:', _config.method)
				console.log('请求头:', _config.header)
				console.log('请求数据:', _config.data)
			}
			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}