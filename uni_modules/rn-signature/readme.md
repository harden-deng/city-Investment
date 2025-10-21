
# 上来直接差评的就别提问了，你应该指点江山去，相信你自己。
# 上来直接差评的就别提问了，你应该指点江山去，相信你自己。
# 上来直接差评的就别提问了，你应该指点江山去，相信你自己。
# ===========================================================================================
# rn-signature 个性签名组件

> 组件名 rn-signature
> 签名组件兼容 H5、APP、小程序。模拟横屏签名效果。
> 兼容鸿蒙 APP 横屏（使用的模拟器：devecostudio 版本为 5.1.1，hbuilder x 版本为 4.66）

========================================
> 注意：vue2 只测试了 h5 和 小程序， 其他的平台没测试。
# 效果展示

- h5 端

![111](https://mp-00642497-21d5-4c92-b570-ed5c43cf500c.cdn.bspapp.com/rn-signature/111.png)

---

![222](https://mp-00642497-21d5-4c92-b570-ed5c43cf500c.cdn.bspapp.com/rn-signature/222.png)

- 小程序端

![333](https://mp-00642497-21d5-4c92-b570-ed5c43cf500c.cdn.bspapp.com/rn-signature/333.png)

---

![444](https://mp-00642497-21d5-4c92-b570-ed5c43cf500c.cdn.bspapp.com/rn-signature/444.png)

- APP 端

![777](https://mp-00642497-21d5-4c92-b570-ed5c43cf500c.cdn.bspapp.com/rn-signature/777.png)

---

![888](https://mp-00642497-21d5-4c92-b570-ed5c43cf500c.cdn.bspapp.com/rn-signature/888.png)

- 鸿蒙展示效果
  ![999](https://mp-00642497-21d5-4c92-b570-ed5c43cf500c.cdn.bspapp.com/rn-signature/hm9.png)

# 使用方式

1. 首先在插件市场进行下载
   地址：[rn-signature](https://ext.dcloud.net.cn/plugin?id=23993#rating)
2. 引入

```js
# vue3用法
<template>
	<rn-signature :options="options" :data="data" />
</template>

# vue2 用法
<template>
	<rn-signature :options="options" :data.sync="data" />
</template>
```
3. 配置

```js
<script>
export default {
	data() {
		return {
			options: {
				clear:{
					show: true,
				},
				placeholder: {
					content: '请设置个性签名',
				},
				style: { //设置签名容器宽高
					width: '600rpx',
					height: '300rpx',
					borderRadius: '20rpx'
				}
			},
			data: {
				url: '',//签名生成的图片地址。
			}
		}
	}
}
</script>
```

## options 配置

| 属性        | 说明               | 类型   | 默认值             | 可选值 |
| ----------- | ------------------ | ------ | ------------------ | ------ |
| clear       | 清除按钮相关配置项 | Object | clear 配置项       | -      |
| placeholder | 占位符提示信息，   | Object | placeholder 配置项 | -      |
| style       | 个性签名样式配置项 | Object | style 配置项       | -      |
| art         | 艺术字             | Object | art 配置项         | -      |
| btn         | 按钮配置项         | Object | btn 配置项         |        |
| ctx         | 画笔配置项         | Object | ctx 配置项         |        |

---

### clear 配置项

| 属性        | 说明                          | 类型    | 默认值         | 可选值 |
| ----------- | ----------------------------- | ------- | -------------- | ------ |
| show        | 是否显示清除按钮              | Boolean | true           | -      |
| slot        | 清除按钮插槽，名称“clearSlot” | Boolean | false          | -      |
| customClass | 自定义类名，需配合 slot 使用  | String  | btn_clear_wrap | -      |

> 自定义类名使用方式
>
> ```js
> ::v-deep .btn_clear_wrap {
>
> }
> ```

### art 配置项

| 属性   | 说明     | 类型    | 默认值 | 可选值 |
| ------ | -------- | ------- | ------ | ------ |
| enable | 是否启用 | Boolean | false  | -      |

### placeholder 配置项

| 属性         | 说明         | 类型   | 默认值         | 可选值 |
| ------------ | ------------ | ------ | -------------- | ------ |
| content      | 提示内容     | String | 请设置个性签名 | -      |
| fontSize     | 字体大小     | Number | 40             | -      |
| textBaseline | 字体对其方式 | String | middle         | -      |
| textAlign    | 对其方式     | String | center         | -      |
| fillStyle    | 字体颜色     | String | #888           | -      |

### style 配置项

| 属性                 | 说明   | 类型   | 默认值    | 可选值 |
| -------------------- | ------ | ------ | --------- | ------ |
| width                | 宽度   | String | 100%      | -      |
| height               | 高度   | String | 300rpx    | -      |
| background           | 背景色 | String | #fff      | -      |
| border               | 边框   | String | 1px solid | -      |
| borderRadius         | 圆角   | String | 20rpx     | -      |
| --其他样式属性都可以 | ---    | ----   | ---       | ----   |

---

### btn 按钮配置

| 属性      | 说明     | 类型   | 默认值                                   | 可选值 |
| --------- | -------- | ------ | ---------------------------------------- | ------ |
| saveBtn   | 保存按钮 | Object | {order: 1,content: '保存',style: {}}     | -      |
| resetBtn  | 重置按钮 | Object | {order: 2,content: '重新绘制',style: {}} | -      |
| cancelBtn | 取消按钮 | Object | {order: 3,content: '取消',style: {}}     | -      |

> - order 排序
> - content 按钮内容
> - style 按钮样式

---

### ctx 按钮配置

| 属性      | 说明     | 类型   | 默认值                                   | 可选值 |
| --------- | -------- | ------ | ---------------------------------------- | ------ |
| lineWidth   | 画笔宽度 | number| | 8     | -      |

> - order 排序
> - content 按钮内容
> - style 按钮样式

## Slot 插槽

| 名称      | 说明                                   |
| --------- | -------------------------------------- |
| clearSlot | 清除按钮插槽，用于清除生成好的签名图片 |

# 测试用例

```js
<template>
	<view class="test_container">
		<!-- 测试一 -->
		<rn-signature :options="options" :data="data" />
		<view style="margin: 20rpx;"></view>
		<!-- 测试二 -->
		<rn-signature :options="options" :data="data1" />
		<view style="margin: 20rpx;"></view>
		<button @click="uploadClick">上传</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: {
					// art: {//可选配置-艺术字设置
					// 	enable: true,
					// },
					// clear: {//可选配置-清除按钮设置
					// 	show: true,
					// 	slot: false,
					// 	customClass: 'btn_clear_wrap'
					// },
					// placeholder: {//可选配置-默认提示信息设置
					// 	content: '请设置个性签名',
					// },
					// btn: {//可选配置-画布中三个按钮设置
					// 	saveBtn: {
					// 		order: 1,
					// 		content: '保存',
					// 		style: {
					// 			border: '3px solid #00ffff'
					// 		}
					// 	},
					// 	resetBtn: {
					// 		order: 2,
					// 		content: '重绘',
					// 	},
					// 	cancelBtn: {
					// 		order: 1,
					// 	}
					// },
					style: { //设置签名容器宽高-一般都会设置下样式，配合自己的业务。
						width: '600rpx',
						height: '300rpx',
						border: 'none',
						'box-shadow': '0px 0px 5px rgba(0, 0, 0, 0.4)'
					},
				},
				data: {
					url: ''
				},
				data1: {
					url: ''
				}
			};
		},
		methods: {
			/**
			 * 简单的测试上传功能
			 */
			uploadClick() {
				uni.uploadFile({
					/**
					 * 小程序 和 APP端 ---- 正常上传 以  url: http://192.168.84.163:3000 为例
					 */
					// #ifdef MP-WEIXIN || APP-PLUS
					url: 'http://192.168.29.163:3000/file-service/upload',
					// #endif

					/**
					 * h5 端 走 vue.config.js 或 vite.config.js 中的代理
					 */
					// #ifndef MP-WEIXIN || APP-PLUS
					url: '/api/file-service/upload',
					// #endif
					header: {
						'content-type': 'multipart/form-data'
					},
					formData: {
						userId: '123'
					}, // 避免与name字段冲突
					filePath: this.data.url,
					name: 'file',
					success(res) {
						console.log('上传成功：', res)
					},
					fail(err) {
						console.log('上传失败：', err)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.test_container {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20px 0;
		flex-direction: column;
		padding: 20rpx
	}

	::v-deep .btn_clear_wrap {}
</style>
```

```js
# vue.config.js 或 vite.config.js 中的代理配置
proxy: {
	'/api': {
		target: 'http://192.168.84.163:3000',
		changeOrigin: true,
		rewrite: (path) => path.replace(/^\/api/, '')  // 路径重写（可选）
	}
}
```

## 效果图

![666](https://mp-00642497-21d5-4c92-b570-ed5c43cf500c.cdn.bspapp.com/rn-signature/666.png)

使用 uvue 页面：H5、小程序
使用 uts 文件： H5、小程序
