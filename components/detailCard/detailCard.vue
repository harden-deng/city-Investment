<template>
    <view class="hero-card">
        <view class="hero-header">
            <view class="project-name">
                <view class="project-name-1">{{ title || '' }}</view>
                <view class="project-name-1">{{ subTitle || '' }}</view>
            </view>

            <view class="amount-box">
                <view class="amount-label">{{ amountLabel }}</view>
                <view class="amount-value">
                    <text class="amount-value-symbol">¥</text>
                    <text class="amount-value-number">{{ amountText }}</text>
                </view>
            </view>
        </view>

        <view class="hero-tags" :class="{ 'hero-tags-width': !showActionButtons }">
            <view class="tag" v-for="(t, i) in tags" :key="i">{{ t }}</view>
        </view>

        <view class="hero-actions" v-show="showActionButtons">
            <view class="btn outline" @click="$emit('reject')">{{ rejectText }}</view>
            <view class="btn primary" @click="$emit('approve')">{{ approveText }}</view>
        </view>

        <view class="wfstatus-actions" v-show="showStatusText">
            {{ statusText }}
        </view>
    </view>
</template>

<script setup>
const props = defineProps({
    title: { type: String, default: '' },
    subTitle: { type: String, default: '' },
    amountLabel: { type: String, default: '申请金额' },
    amountText: { type: [String, Number], default: '' },
    tags: { type: Array, default: () => [] },
    showActionButtons: { type: Boolean, default: false },
    showStatusText: { type: Boolean, default: false },
    statusText: { type: String, default: '' },
    rejectText: { type: String, default: '打回' },
    approveText: { type: String, default: '通过' }
});

defineEmits(['reject', 'approve']);
</script>

<style lang="scss" scoped>
.hero-card {
    box-sizing: border-box;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    padding: 14.4928rpx 28.9856rpx 0;
    background: #2d4ec8;
    min-height: 200rpx;
    color: #fff;
    position: relative;
    z-index: 9;

    .hero-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 14.4928rpx;
    }

    .project-name {
        width: 60%;
        font-size: 21.7392rpx;
        color: #fff;

        .project-name-1 {
            display: flex;
            align-items: center;
            word-wrap: break-word;
            word-break: break-all;
            white-space: normal;
            min-height: 65.2176rpx;
        }
    }

    .amount-box {
        text-align: right;

        .amount-label {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            word-wrap: break-word;
            word-break: break-all;
            white-space: normal;
            height: 65.2176rpx;
            font-size: 21.7392rpx;
            color: #99ccff;
            text-align: right;
        }

        .amount-value {
            height: 65.2175rpx;
            display: flex;
            align-items: center;

            .amount-value-symbol {
                font-size: 21.7392rpx;
                color: #ffffff;
                margin-right: 10rpx;
            }

            .amount-value-number {
                font-size: 32.609rpx;
                color: #ffd615;
                font-weight: bold;
            }
        }
    }

    .hero-tags {
        width: calc(100% - 326.07rpx);
        height: 65.2176rpx;
        overflow: hidden;
        display: flex;
        align-items: center;
        gap: 14.4928rpx;
        flex-wrap: nowrap;

        .tag {
            box-sizing: border-box;
            height: 36.232rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1.8116rpx solid #66ccff;
            padding: 1.8116rpx 12rpx;
            border-radius: 8rpx;
            font-size: 18rpx;
            color: #66ccff;
            white-space: nowrap;
        }

        &.hero-tags-width {
            width: calc(100% - 180rpx);
        }
    }

    .wfstatus-actions {
        position: absolute;
        bottom: 12rpx;
        right: 36rpx;
        width: 120rpx;
        height: 42rpx;
        border: 1.8116rpx solid #66ccff;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 25rpx;
        font-size: 21.7392rpx;
        color: #66ccff;
        white-space: nowrap;
    }

    .hero-actions {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 326.07rpx;
        height: 65.2175rpx;
        background: url('../../static/images/bg_1@2x.jpg') left center no-repeat;
        background-size: cover;
        margin-top: 18rpx;
        display: flex;
        justify-content: flex-end;
    }

    .btn {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 21.7392rpx;
        color: #fff;
    }

    .btn.primary {
        box-sizing: border-box;
        width: 126.84rpx;
        background: #3e65f6;
    }

    .btn.outline {
        box-sizing: border-box;
        border-top-left-radius: 15rpx;
        width: 126.84rpx;
        background: #6699ff;
    }
}
</style>