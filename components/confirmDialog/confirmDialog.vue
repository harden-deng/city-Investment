<template>
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog
			:content="content"
			:type="msgType"
			cancelText="关闭"
			confirmText="确定"
			@confirm="dialogConfirm"
			@close="dialogClose"
		/>
	</uni-popup>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose } from 'vue'

defineOptions({ name: 'confirmDialog' })

const props = defineProps<{
    content?: string
    msgType?: 'success' | 'warn' | 'error' | 'info'
}>()

const content = props.content ?? ''
const msgType = props.msgType ?? 'info'

const alertDialog = ref()
const emit = defineEmits()

const dialogConfirm = () => {
    emit('confirm')
}
const dialogClose = () => {}

function open(position) {
    alertDialog.value?.open?.(position || 'center')
}

defineExpose({ open })
</script>

<style>
</style>