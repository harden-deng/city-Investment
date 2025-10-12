<template>
	<uni-popup ref="popupRef" type="right" :safe-area="true" :mask-click="true" @change="onPopupChange">
		<view class="filter-popup">
			<!-- Header -->
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="fp-header">
					<text class="fp-title">服务/折扣</text>
					<view class="fp-location" v-if="locationText">
						<text class="dot"></text>
						<text class="loc-text">{{ locationText }}</text>
						<text class="loc-edit" @click="emit('editLocation')">修改</text>
					</view>
				</view>

				<!-- 服务/折扣 多选 -->
				<view class="fp-section">
					<view class="chip-row">
						<view v-for="it in serviceOptions" :key="it.value" class="chip"
							:class="{ active: state.service.has(it.value) }"
							@click="toggleSet(state.service, it.value)">{{ it.label }}</view>
					</view>
				</view>

				<!-- 价格区间 -->
				<view class="fp-block-title">价格区间</view>
				<view class="fp-price">
					<input class="price-input" v-model="state.priceMin" type="number" placeholder="最低价" />
					<text class="price-split">—</text>
					<input class="price-input" v-model="state.priceMax" type="number" placeholder="最高价" />
				</view>

				<!-- 品牌 可展开 -->
				<view class="fp-block-title with-toggle">
					<text>品牌</text>
					<view class="toggle" @click="brandExpand = !brandExpand">
						<text class="toggle-text">{{ brandExpand ? '收起' : '展开' }}</text>
						<text class="toggle-arrow">{{ brandExpand ? '▲' : '▼' }}</text>
					</view>
				</view>
				<view class="fp-section">
					<view class="chip-row">
						<view v-for="(it, idx) in brandDisplay" :key="it.value" class="chip"
							:class="{ active: state.brand.has(it.value) }" @click="toggleSet(state.brand, it.value)">
							{{ it.label }}</view>
					</view>
				</view>

				<!-- 全部分类 单选 -->
				<view class="fp-block-title with-note">
					<text>全部分类</text>
					<text class="note">单选</text>
				</view>
				<view class="fp-section">
					<view class="chip-row">
						<view v-for="it in categoryOptions" :key="it.value" class="chip"
							:class="{ active: state.category === it.value }" @click="state.category = it.value">
							{{ it.label }}</view>
					</view>
				</view>

				<!-- 装订方式 多选 -->
				<view class="fp-block-title with-toggle">
					<text>装订方式</text>
					<view class="toggle" @click="bindExpand = !bindExpand">
						<text class="toggle-text">{{ bindExpand ? '收起' : '展开' }}</text>
						<text class="toggle-arrow">{{ bindExpand ? '▲' : '▼' }}</text>
					</view>
				</view>
				<view class="fp-section">
					<view class="chip-row">
						<view v-for="it in bindDisplay" :key="it.value" class="chip"
							:class="{ active: state.bind.has(it.value) }" @click="toggleSet(state.bind, it.value)">
							{{ it.label }}</view>
					</view>
				</view>

				<!-- 类型 多选 -->
				<view class="fp-block-title with-toggle">
					<text>类型</text>
					<view class="toggle" @click="typeExpand = !typeExpand">
						<text class="toggle-text">{{ typeExpand ? '收起' : '展开' }}</text>
						<text class="toggle-arrow">{{ typeExpand ? '▲' : '▼' }}</text>
					</view>
				</view>
				<view class="fp-section">
					<view class="chip-row">
						<view v-for="it in typeDisplay" :key="it.value" class="chip"
							:class="{ active: state.type.has(it.value) }" @click="toggleSet(state.type, it.value)">
							{{ it.label }}</view>
					</view>
				</view>
				<view style="height: 140rpx;">

				</view>
			</scroll-view>
			<!-- 底部操作 -->
			<view class="fp-footer">
				<view class="btn reset" @click="onReset">重置</view>
				<view class="btn confirm" @click="onConfirm">
					确定
					<!-- <span v-if="confirmCount !== undefined">（{{ confirmCount }}+件商品）</span> -->
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script setup lang="ts">
	import { ref, reactive, computed, watch, defineProps, defineEmits, defineExpose } from 'vue'

	type KV = { label : string; value : string }

	const props = defineProps<{
		modelValue ?: boolean
		locationText ?: string
		confirmCount ?: number
		serviceOptions ?: KV[]
		brandOptions ?: KV[]
		categoryOptions ?: KV[]
		bindOptions ?: KV[]
		typeOptions ?: KV[]
		defaultExpandedCount ?: number // 每组默认展示的数量（超出可展开）
	}>()

	const emit = defineEmits<{
		(e : 'update:modelValue', v : boolean) : void
		(e : 'confirm', payload : any) : void
		(e : 'reset') : void
		(e : 'editLocation') : void
	}>()

	const locationText = computed(() => props.locationText || '张河头')
	const confirmCount = computed(() => props.confirmCount)

	const popupRef = ref<any>(null)

	const serviceOptions = computed<KV[]>(() =>
		props.serviceOptions || [
			{ label: '京东物流', value: 'jdwuliu' },
			{ label: '包邮', value: 'baoyou' },
			{ label: '支持送礼', value: 'gift' },
			{ label: '分期免息', value: 'fenqi' },
			{ label: '配送全球', value: 'global' },
			{ label: '促销', value: 'promo' },
			{ label: '价保', value: 'priceprotect' },
			{ label: '送礼95折起', value: '95off' },
			{ label: '仅看有货', value: 'instock' },
			{ label: '货到付款', value: 'cod' }
		]
	)

	const brandOptions = computed<KV[]>(() =>
		props.brandOptions || [
			{ label: '得力', value: 'deli' },
			{ label: '思进', value: 'sijin' },
			{ label: '文轩', value: 'wenxuan' },
			{ label: '山头林村', value: 'shantou' },
			{ label: '当当', value: 'dangdang' },
			{ label: '易复得', value: 'yfd' },
			{ label: '帆软软件', value: 'fanruan' },
			{ label: '欧客欣', value: 'aukewin' },
			{ label: '人民出版社', value: 'renmin' }
		]
	)

	const categoryOptions = computed<KV[]>(() =>
		props.categoryOptions || [
			{ label: '建筑', value: 'build' },
			{ label: '文具', value: 'stationery' },
			{ label: '更多分类', value: 'more' }
		]
	)

	const bindOptions = computed<KV[]>(() =>
		props.bindOptions || [
			{ label: '活页夹装订', value: 'huoyejia' },
			{ label: '胶装式装订', value: 'jiaozhuang' },
			{ label: '其他', value: 'other' }
		]
	)

	const typeOptions = computed<KV[]>(() =>
		props.typeOptions || [
			{ label: '彩色凭证', value: 'color' },
			{ label: '单据', value: 'danju' },
			{ label: '费用报销单', value: 'expense' }
		]
	)

	const defaultExpandedCount = computed(() => props.defaultExpandedCount ?? 6)

	const brandExpand = ref(false)
	const bindExpand = ref(true)
	const typeExpand = ref(true)

	const brandDisplay = computed(() =>
		brandExpand.value ? brandOptions.value : brandOptions.value.slice(0, defaultExpandedCount.value)
	)
	const bindDisplay = computed(() =>
		bindExpand.value ? bindOptions.value : bindOptions.value.slice(0, defaultExpandedCount.value)
	)
	const typeDisplay = computed(() =>
		typeExpand.value ? typeOptions.value : typeOptions.value.slice(0, defaultExpandedCount.value)
	)

	const state = reactive({
		service: new Set<string>(),
		brand: new Set<string>(),
		bind: new Set<string>(),
		type: new Set<string>(),
		category: '' as string,
		priceMin: '' as string,
		priceMax: '' as string
	})

	function toggleSet(set : Set<string>, v : string) {
		if (set.has(v)) set.delete(v)
		else set.add(v)
	}

	function onReset() {
		state.service.clear()
		state.brand.clear()
		state.bind.clear()
		state.type.clear()
		state.category = ''
		state.priceMin = ''
		state.priceMax = ''
		emit('reset')
	}

	function onConfirm() {
		const payload = {
			service: Array.from(state.service),
			brand: Array.from(state.brand),
			bind: Array.from(state.bind),
			type: Array.from(state.type),
			category: state.category,
			price: {
				min: state.priceMin ? +state.priceMin : undefined,
				max: state.priceMax ? +state.priceMax : undefined
			}
		}
		emit('confirm', payload)
		close()
	}

	function open() {
		popupRef.value?.open?.()
	}
	function close() {
		popupRef.value?.close?.()
	}
	defineExpose({ open, close, state })

	// v-model 同步（可选）
	watch(
		() => props.modelValue,
		v => {
			if (v) open()
			else close()
		}
	)
	function onPopupChange(e : any) {
		if (e?.show === false) emit('update:modelValue', false)
	}
	
	
</script>

<style lang="scss" scoped>
	$primary: #ff3b30;
	$border: #eeeeee;
	$text: #333;
	$muted: #999;

	::v-deep .uni-popup__wrapper {
		display: flex !important;
		justify-content: flex-end !important;
	}

	.filter-popup {
		position: relative;
		z-index: 19;
		width: 600rpx;
		background: #fff;
		border-top-left-radius: 24rpx;
		border-bottom-left-radius: 24rpx;
		max-height: calc(100vh);
		overflow-y: auto;
		// padding-bottom: 140rpx; // 给底部按钮留空间
		// margin-top: 100rpx;
		overflow: hidden;
	}

	.fp-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 28rpx 28rpx 8rpx 28rpx;

		.fp-title {
			font-size: 32rpx;
			font-weight: 600;
			color: $text;
		}

		.fp-location {
			display: flex;
			align-items: center;
			color: $muted;
			font-size: 24rpx;

			.dot {
				width: 12rpx;
				height: 12rpx;
				background: $primary;
				border-radius: 50%;
				margin-right: 10rpx;
			}

			.loc-text {
				margin-right: 12rpx;
			}

			.loc-edit {
				color: $primary;
			}
		}
	}

	.fp-block-title {
		padding: 24rpx 28rpx 8rpx 28rpx;
		font-size: 30rpx;
		color: $text;
		font-weight: 600;

		&.with-note {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.note {
				font-size: 22rpx;
				color: $muted;
			}
		}

		&.with-toggle {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.toggle {
				display: flex;
				align-items: center;
				color: $muted;

				.toggle-text {
					margin-right: 8rpx;
				}

				.toggle-arrow {
					font-size: 20rpx;
				}
			}
		}
	}

	.fp-section {
		padding: 8rpx 20rpx 12rpx 20rpx;
	}

	.chip-row {
		display: flex;
		flex-wrap: wrap;
		gap: 18rpx;
	}

	.chip {
		padding: 18rpx 26rpx;
		font-size: 26rpx;
		color: #222;
		background: #f7f8fa;
		border-radius: 14rpx;
		border: 2rpx solid transparent;

		&.active {
			color: $primary;
			background: #fff;
			border-color: $primary;
		}
	}

	.fp-price {
		padding: 8rpx 28rpx 20rpx 28rpx;
		display: flex;
		align-items: center;

		.price-input {
			flex: 1;
			height: 72rpx;
			line-height: 72rpx;
			background: #f7f8fa;
			border-radius: 12rpx;
			padding: 0 20rpx;
			font-size: 28rpx;
			color: #333;
		}

		.price-split {
			margin: 0 20rpx;
			color: $muted;
		}
	}

	.fp-footer {
		position: absolute;
		right: 0;
		bottom: 0;
		z-index: 29;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #FFFFFF;
		padding: 10rpx;

		.btn {
			flex: 0.4;
			height: 88rpx;
			border-radius: 48rpx;
			font-size: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.reset {
			background: #f7f8fa;
			color: #333;
			border: none;
		}

		.confirm {
			background: $primary;
			color: #fff;
		}
	}
</style>