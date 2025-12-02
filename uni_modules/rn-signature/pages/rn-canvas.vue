<template>
	<view class="container">
		<canvas class="canvas_container" canvas-id="canvas_container" id="canvas_container" :disable-scroll="true"
			@touchstart="touchstart" @touchmove="touchmove" @touchend="touchend"></canvas>
		<!-- 控制按钮-包裹 -->
		<!-- #ifdef UNI-APP-X -->
		<!-- #ifndef APP-HARMONY || APP-PLUS -->
		<cover-view class="control_wrap">
			<cover-view v-for="btn in btnList" :key="btn.prop" class="btn" :class="btn.class" :style="btn.style"
				@tap="clickHandler(btn.prop)">
				<cover-view class="text">{{ btn.content }}</cover-view>
			</cover-view>
		</cover-view>
		<!-- #endif -->
		<!-- #ifdef APP-HARMONY || APP-PLUS-->
		<view class="control_wrap" v-if="btnShow">
			<view v-for="btn in btnList" :key="btn.prop" class="btn" :class="btn.class" :style="btn.style"
				@tap="clickHandler(btn.prop)">
				<view class="text">{{ btn.content }}</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #endif -->
		<!-- #ifndef UNI-APP-X -->
		<!-- #ifndef  APP-PLUS || APP-HARMONY -->
		<cover-view class="control_wrap">
			<cover-view v-for="btn in btnList" :key="btn.prop" class="btn" :class="btn.class" :style="btn.style"
				@tap="clickHandler(btn.prop)">
				<cover-view class="text">{{ btn.content }}</cover-view>
			</cover-view>
		</cover-view>
		<!-- #endif -->
		<!-- #ifdef APP-PLUS || APP-HARMONY -->
		<view class="control_wrap" v-if="btnShow">
			<view v-for="btn in btnList" :key="btn.prop" class="btn" :class="btn.class" :style="btn.style"
				@tap="clickHandler(btn.prop)">
				<view class="text">{{ btn.content }}</view>
			</view>
		</view>
		<!-- #endif -->
		<!-- #endif -->
	</view>
</template>

<script>
	// #ifdef APP-HARMONY
	import {
		ScreenOrientation
	} from "@/uni_modules/rn-pageOrientation";
	// #endif
	// #ifdef UNI-APP-X
	import CanvasControl from "@/uni_modules/rn-signature/js/canvas/index.uts";
	// #endif
	// #ifndef UNI-APP-X
	import CanvasControl from "@/uni_modules/rn-signature/js/canvas/index.js";
	// #endif
	export default {
		name: "RnCanvas",
		computed: {
			//按钮配置
			btnConfig() {
				let btn = this.options.btn || {};
				let saveBtn = btn.saveBtn || {};
				let resetBtn = btn.resetBtn || {};
				let cancelBtn = btn.cancelBtn || {};
				return {
					...this.btnOptions,
					...btn,
					saveBtn: {
						...this.btnOptions.saveBtn,
						...saveBtn,
						style: {
							...this.btnOptions.saveBtn.style,
							...(saveBtn.style || {})
						}
					},
					resetBtn: {
						...this.btnOptions.resetBtn,
						...resetBtn,
						style: {
							...this.btnOptions.resetBtn.style,
							...(resetBtn.style || {})
						}
					},
					cancelBtn: {
						...this.btnOptions.cancelBtn,
						...cancelBtn,
						style: {
							...this.btnOptions.cancelBtn.style,
							...(cancelBtn.style || {})
						}
					}
				};
			},
			//按钮排序
			btnList() {
				let arr = [	
					this.btnConfig.cancelBtn,
					this.btnConfig.resetBtn,
					this.btnConfig.saveBtn
				];
				return arr.sort((a, b) => a.order - b.order);
			}
		},
		data() {
			return {
				ctx: null,
				data: {},
				query: {},
				options: {},
				btnShow: false, //控制APP按钮显隐，（优化 横屏过程中 按钮变化）
				btnOptions: {
					cancelBtn: {
						prop: "cancel",
						order: 1,
						content: "取消",
						class: "btn_cancel",
						style: {}
					},
					resetBtn: {
						prop: "reset",
						order: 2,
						content: "清空",
						class: "btn_reset",
						style: {}
					},
					saveBtn: {
						prop: "save",
						order: 3,
						content: "保存",
						class: "btn_save",
						style: {}
					}
				}
			};
		},
		watch: {
			data: {
				handler(newVal) {
					console.log('签名数据更新1=>', newVal)
					newVal.url && uni.$emit(`rnReturnData${this.query.tempTime}`, newVal);
				},
				deep: true,
				immediate: true
			}
		},
		onLoad(query) {
			this.query = query;
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on(
				`receiveData${this.query.tempTime}`,
				async ({
					data,
					options
				}) => {
					this.data = data;
					this.options = options; //按钮配置
					let defaultTime = 300;
					try {
						// #ifdef UNI-APP-X
						// #ifdef APP-HARMONY || MP-WEIXIN
						defaultTime = 1000;
						// #endif
						// #endif
						// #ifndef UNI-APP-X
						// #ifdef APP-PLUS
						this.btnShow = false;
						plus.screen.unlockOrientation(); // 解除方向锁定
						plus.screen.lockOrientation("landscape-primary"); // 进入页面锁定横屏
						// #endif
						// #endif
						// #ifdef APP-HARMONY
						let inst = new ScreenOrientation();
						await inst.setLandscape();
						defaultTime = 1000;
						// #endif
					} catch (err) {
						console.log("err:", err);
						this.btnShow = true;
					}
					setTimeout(() => {
						this.initStyle();
						this.$nextTick(() => {
							this.btnShow = true;
							this.ctx = new CanvasControl({
									canvas_id: "canvas_container",
									data: this.data,
									...options
								},
								this
							);
							console.log(this.ctx);
						});
					}, defaultTime);
				}
			);
		},
		// #ifdef VUE3
		beforeUnmount() {
			this.clearStyle();
		},
		// #endif
		// #ifdef VUE2
		beforeDestroy() {
			this.clearStyle();
		},
		// #endif
		methods: {
			//初始化-模拟态-提示框的横屏样式清除
			async clearStyle() {
				try {
					// #ifdef APP-PLUS
					plus.screen.lockOrientation("portrait-primary");
					// #endif
					// #ifdef H5
					let el = document.querySelectorAll("head style.custom_h5_style");
					for (let i = 0; i < el.length; i++) {
						document.querySelector("head").removeChild(el[i]);
					}
					// #endif
					// #ifdef APP-HARMONY
					let inst = new ScreenOrientation();
					await inst.setPortrait();
					// #endif
				} catch {}
			},
			//初始化-模拟态-提示框的横屏样式
			initStyle() {
				// #ifdef H5
				let el = document.createElement("style");
				el.type = "text/css";
				el.setAttribute("class", "custom_h5_style");
				el.innerHTML = `@media screen and (orientation: portrait) {
					.uni-toast,
					.uni-modal { 
						transform: translate(-50%, -50%) rotate(90deg) !important;
					}
				}
				.uni-modal_dialog__container.uni-modal_dialog__show {
					transform: rotate(90deg) scale(1) !important;
				}
				`;
				document.querySelector("head").append(el);
				// #endif
			},
			/**
			 * 控制按钮
			 */
			clickHandler(prop) {
				this[prop + "Click"]();
			},
			//保存-点击
			async saveClick() {
				if (!this.ctx.drawCount) {
					uni.showToast({
						title: "请进行签名"
					});
					return;
				}
				let url = await this.ctx.rotateCanvas();
				this.data.url = url;
				uni.navigateBack(-1);
			},
			//重置-点击
			resetClick() {
				this.ctx.resetConfig();
			},
			//取消
			cancelClick() {
				uni.navigateBack(-1);
				// uni.showModal({
				// 	title: "提示",
				// 	content: "确定取消签名？",
				// 	success(res) {
				// 		if (res.confirm) {
				// 			uni.navigateBack(-1);
				// 		}
				// 	}
				// });
			},
			/**
			 * 绘制过程=========
			 */
			//触摸开始
			touchstart(e) {
				this.ctx.touchstart(e);
			},
			//触摸移动
			touchmove(e) {
				this.ctx.touchmove(e);
			},
			//触摸结束
			touchend() {}
		},
		onReady() {
			// // #ifdef H5
			// //禁用移动端手机下拉 问题
			// document.body.addEventListener(
			// 	'touchmove',
			// 	function(evt) {
			// 		if (!evt._isScroller) {
			// 			evt.preventDefault()
			// 		}
			// 	}, {
			// 		passive: false
			// 	}
			// )
			// // #endif
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
        /* #ifdef H5 */
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: row;
	    /* #endif */
		.control_wrap {
			position: absolute;
			transform-origin: bottom;
			z-index: 9999;
			display: flex;
			flex-direction: row;
			padding: 20rpx;
			/* #ifdef APP-HARMONY ||MP-WEIXIN || APP-PLUS */
			top: 100%;
			left: 50%;
			white-space: nowrap;
			transform: translate(-50%, -100%);
			/* #endif */

			/* #ifdef H5 */
			// top: 46.3%;
			// left: 0;
			// transform: translate(-50%, -50%) rotate(90deg);

			/* #endif */
			/* #ifdef H5 */
			transform: translate(-50%, -50%) rotate(90deg);
			/* #endif */
			.btn {
				width: fit-content;
				// border: 1px solid #777;
				border-radius: 10rpx;
				/* #ifdef APP-HARMONY|| MP-WEIXIN || APP-PLUS */
				font-size: 24rpx;

				.text {
					margin: 12rpx 40rpx;
				}

				/* #endif */

				/* #ifndef APP-HARMONY || MP-WEIXIN || APP-PLUS  */
				font-size: 32rpx;

				.text {
					margin: 20rpx 40rpx;
				}

				/* #endif */

				/* #ifdef APP-HARMONY || APP-PLUS */
				display: flex;

				flex-direction: row;
				align-items: center;
				justify-content: center;
				/* #endif */
				font-weight: 700;
				margin: 0 20rpx;
				background: #fff;

				&.btn_save {}

				&.btn_reset {}

				&.btn_cancel {}
			}
		}
	}

	.canvas_container {
		width: 100% !important;
		height: 100% !important;
		display: flex !important;
		justify-content: center !important;
		align-items: center !important;
	}
</style>