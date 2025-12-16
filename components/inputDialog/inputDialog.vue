<template>
	<uni-popup ref="popupRef" type="center" :mask-click="false">
		<view class="idlg">
			<text class="idlg-title">{{ title }}</text>
			<view class="idlg-input-wrap">
				<uni-easyinput type="textarea" :placeholder="placeholder" :clearable="true" :maxlength="maxlength" autoHeight
					v-model="innerValue"></uni-easyinput>
			</view>
			<view class="idlg-footer">
				<view class="btn cancel" @click="handleCancel">取消</view>
				<view class="divider"></view>
				<view class="btn confirm" :class="{ disabled: confirmDisabled }" @click="handleConfirm">确定</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup>
import { throttle } from '@/utils/h5Bridge'
import { ref, watch, computed,reactive } from 'vue'

	const handleConfirm = throttle(() => {
		doConfirm()
	}, 1000)
	
	const props = defineProps({
		modelValue: {
			type: Boolean,
			default: undefined
		},
		title: {
			type: String,
			default: undefined
		},
		placeholder: {
			type: String,
			default: undefined
		},
		maxlength: {
			type: Number,
			default: undefined
		},
		required: {
			type: Boolean,
			default: undefined
		},
		validator: {
			type: Function,
			default: undefined
		}
	})

	const emit = defineEmits(['confirm', 'cancel'])

	const popupRef = ref(null)
	const innerValue = ref('')

	const title = computed(() => props.title ?? '输入内容')
	const placeholder = computed(() => props.placeholder ?? '请输入内容')
	const inputType = computed(() => props.inputType ?? 'text')
	const maxlength = computed(() => props.maxlength ?? 140)
    const dialogTypeObj = reactive({'打回原因': false, '通过原因': true})
	const confirmDisabled = computed(() => {
		if (props.required && !innerValue.value) return true
		const r = props.validator ? props.validator(innerValue.value) : true
		return r !== true
	})

	function open() {
		popupRef.value?.open?.('center')
	}

	function close() {
		popupRef.value?.close?.()
	}

	function handleCancel() {
		emit('cancel')
		innerValue.value = ''
		close()
	}

	function doConfirm() {
		if (confirmDisabled.value) return
		let dialogType = dialogTypeObj[props.title]
		emit('confirm', innerValue.value, dialogType)
		innerValue.value = ''
		close()
	}



	defineExpose({
		open,
		close
	})
</script>

<style lang="scss" scoped>
	::v-deep .is-input-border{
		border-color: #eee !important;
	}
	.idlg {
		width: 600rpx;
		background: #fff;
		border-radius: 22rpx;
		overflow: hidden;
	}

	.idlg-title {
		display: block;
		text-align: center;
		font-size: 30rpx;
		color: #000;
		padding-top: 25rpx;
	}

	.idlg-input-wrap {
		padding: 40rpx 24rpx;
	}

	.idlg-footer {
		display: flex;
		align-items: stretch;
		border-top: 1rpx solid #eee;
	}

	.btn {
		flex: 1;
		height: 92rpx;
		line-height: 92rpx;
		border-radius: 0;
		background: #fff;
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cancel {
		color: #000;
	}

	.confirm {
		color: #3e65f6;
	}

	.confirm.disabled {
		color: #eee;
	}

	.divider {
		width: 1rpx;
		border-left: 1rpx solid #eee;
	}
</style>