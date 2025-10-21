<!-- 签名 -->
<template>
	<view class="rn_signature" :style="[optionsAll.style]" style="border: 1px soild red;">
		<view class="sign_container" @click="btnClick">
			<!-- <span v-if="!data.url">{{ optionsAll.placeholder.content }}</span> -->
			<span v-if="!data.url">请点击设置签名</span>
			<!-- <span v-if="data.url && optionsAll.clear.show" :class="{
					clear_url: !optionsAll.clear.slot,
					[clearClassName]: optionsAll.clear.slot
				}" @tap.stop="clearClick">
				<slot name="clearSlot">
					<view class="icon_left"></view>
					<view class="icon_right"></view>
				</slot>
			</span> -->
			<image v-if="data.url" class="signature_img" :src="data.url" alt=""></image>
		</view>
	</view>
</template>
<script>
	export default {
		name: "RnSignature",
		props: {
			options: {
				type: Object,
				default: () => ({})
			},

			data: {
				type: Object,
				default: () => ({
					url: ""
				})
			}
		},
		computed: {
			clearClassName() {
				return this.optionsAll.clear.customClass;
			},
			optionsAll() {
				return {
					...this.options,
					clear: {
						...this.config.clear,
						...(this.options.clear || {})
					},
					placeholder: {
						...this.config.placeholder,
						...(this.options.placeholder || {})
					},
					style: {
						...this.config.style,
						...(this.options.style || {})
					}
				};
			}
		},
		data() {
			return {
				config: {
					clear: {
						show: true
					},
					style: {
						width: "100%",
						height: "300rpx",
						background: "#fff",
						// "box-shadow": "0px 0px 5px rgba(0, 0, 0, 0.4)",
						border: '1px soild',
						borderRadius: "20rpx"
					},
					placeholder: {
						content: "请点击设置签名"
					}
				}
			};
		},
		created() {
			
		},
		mounted() {
			
		},
		methods: {
			//清除-事件
			clearClick() {
				this.data.url = "";
				// #ifdef VUE2
				// #ifdef MP-WEIXIN
				this.$emit("update:data", {
					...this.data,
					url: ""
				});
				// #endif
				// #endif
			},
			//点击-事件
			btnClick() {
				this.data.tempTime && uni.$off(`rnReturnData${this.data.tempTime}`);
				this.data.tempTime = Date.now();
				uni.$on(`rnReturnData${this.data.tempTime}`, (res) => {
					// this.$set(this, 'data', res) // 使用内部变量替代props
					// this.data = JSON.parse(JSON.stringify(res))
					for (let key in res) {
						this.data[key] = res[key];
					}
					// #ifdef VUE2
					// #ifdef MP-WEIXIN
					this.$emit("update:data", res);
					// #endif
					// #endif
				});
				uni.navigateTo({
					url: "/uni_modules/rn-signature/pages/rn-canvas" +
						`?tempTime=${this.data.tempTime}`,
					success: (res) => {
						res.eventChannel.emit(`receiveData${this.data.tempTime}`, {
							data: this.data,
							options: this.optionsAll
						});
					},
					fail: (error) => {
						console.log("跳转页面：", error, this.data, "fail");
					}
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.rn_signature {
		overflow: hidden;
		border-radius: 24rpx !important;
		.sign_container {
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			.clear_url {
				position: absolute;
				/* #ifdef UNI-APP-X */
				/* #ifdef APP-HARMONY */
				width: 60rpx;
				height: 60rpx;
				border-radius: 30rpx;
				/* #endif */
				/* #endif */
				/* #ifndef UNI-APP-X */
				width: 120rpx;
				height: 120rpx;
				border-radius: 60rpx;
				/* #endif */
				left: 100%;
				top: 0;
				transform: translate(-50%, -50%);

				// box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
				overflow: hidden;
				z-index: 999;

				.icon_left {
					position: absolute;
					right: 51%;
					top: 66%;
					width: 35%;
					height: 5px;
					background: #888;
					border-radius: 5px;
					transform: rotate(42deg);
				}

				.icon_right {
					position: absolute;
					right: 51%;
					top: 66%;
					width: 35%;
					height: 5px;
					background: #888;
					border-radius: 5px;
					transform: rotate(135deg);
				}
			}

			.signature_img {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>