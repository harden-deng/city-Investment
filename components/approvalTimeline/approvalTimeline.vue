<template>
	<view class="approval-timeline">
		<view class="approval-item" v-for="(item, index) in list" :key="index">
			<!-- 状态指示器 -->
			<view class="timeline-indicator-container">
				<view
					class="timeline-indicator"
					:class="{
						'status-pending': item.approvalActionType === 'vmPending',
						'status-approved': item.approvalActionType === '已审批' && item.approvalResult == '批准',
						'status-rejected': item.approvalActionType === '已审批' && (item.approvalResult == '驳回' || item.approvalResult == '已拒绝'),
						'status-successed': item.approvalResult == '完成' || item.approvalResult === '处理完成',
						'status-submitted': item.approvalActionType === '提交'
					}"
				>
					<view class="indicator-checkmark" v-if="item.approvalResult == '完成' || item.approvalResult === '处理完成'">
						<uni-icons type="smallcircle-filled" size="24rpx" color="#07c160"></uni-icons>
					</view>
					<view class="indicator-checkmark" v-if="item.approvalActionType === '已审批' && item.approvalResult == '批准'">
						<uni-icons type="checkmarkempty" size="20rpx" color="#07c160"></uni-icons>
					</view>
					<view class="indicator-checkmark" v-if="item.approvalActionType === '已审批' && (item.approvalResult == '驳回' || item.approvalResult == '已拒绝')">
						<uni-icons type="checkmarkempty" size="20rpx" color="#ffb800"></uni-icons>
					</view>
					<view class="indicator-loading" v-else-if="item.approvalActionType === 'vmPending'"></view>
					<view class="indicator-empty" v-else-if="item.approvalActionType === '提交'"></view>
				</view>
			</view>

			<!-- 审批记录内容 -->
			<view class="approval-content">
				<view class="approval-header">
					<view class="approval-title">
						<text class="title-text">{{ item.stepName }}</text>
						<text
							class="title-status"
							:class="{
								'status-text-green':
									item.approvalActionType === '已审批' ||
									item.approvalActionType === 'vmPending' ||
									item.approvalActionType === '提交'
							}"
						>
							{{ item.approvalActionType == 'vmPending' ? '审批中' : item.approvalActionType }}
						</text>
					</view>
				</view>

				<view class="approval-body">
					<view class="approval-info" style="display: flex; justify-content: flex-start; gap: 10rpx;">
						<text class="approver-name">{{ item.approverDisplayName }}</text>
						<view
							class="action-btn"
							:class="{
								'btn-approved': item.approvalResult == '批准' || item.approvalResult == '提交' || item.approvalResult == '完成' || item.approvalResult === '处理完成',
								'btn-pending': item.approvalResult == '待审批' || item.approvalResult == '待处理',
								'btn-rejected': item.approvalResult == '驳回'|| item.approvalResult == '已拒绝'
							}"
						>
							{{ item.approvalResult }}
						</view>
						<text class="approval-time">
							{{ formatDateTime(item.approvalResult == '待审批' ? item.approvalTime : item.createdDate) }}
						</text>
					</view>

					<view class="approval-remark" v-if="item.approvalComment">
						<text class="remark-label">备注:</text>
						<text class="remark-text">{{ item.approvalComment }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { defineProps } from 'vue'
import { formatDateTime } from '@/utils/h5Bridge'

defineProps({
	list: {
		type: Array,
		default: () => []
	}
})
</script>

<style lang="scss" scoped>
.approval-timeline {
	position: relative;

	/* 整体左侧时间线（如需） */
	.timeline-line-main {
		position: absolute;
		left: 24rpx;
		top: 48rpx;
		bottom: 0;
		width: 2rpx;
		background: #ddd;
		z-index: 1;
	}
}

.approval-item:not(:last-child)::before {
	content: "";
	position: absolute;
	left: 16rpx;
	top: 0;
	z-index: 0;
	width: 2rpx;
	height: 100%;
	background: #ddd;
}

.approval-item {
	position: relative;
	display: flex;
	align-items: flex-start;
	padding-bottom: 20rpx;
	border-radius: 12rpx;
	min-height: 140rpx;

	.timeline-indicator-container {
		position: absolute;
		width: 30rpx;
		height: 80rpx;
		background: #fff;
	}

	.timeline-indicator {
		box-sizing: border-box;
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		margin-top: 22rpx;
		z-index: 2;
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 1rpx;

		&.status-approved {
			background: #fff;
			border: 2rpx solid #07c160;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&.status-successed {
			background: #fff;
			border: 2rpx solid #07c160;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&.status-rejected {
			background: #fff;
			border: 2rpx solid #ffb800;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&.status-pending {
			background: #fff;
		}
		&.status-submitted {
			background: #fff;
			border: 2rpx solid #07c160;
		}

		.indicator-checkmark {
			// color: #fff;
			// font-size: 32rpx;
			// font-weight: bold;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.indicator-empty {
			width: 100%;
			height: 100%;
		}

		.indicator-loading {
			width: 100%;
			height: 100%;
			border: 2rpx solid transparent;
			border-top: 2rpx solid #7b93a6;
			border-right: 2rpx solid #7b93a6;
			border-radius: 50%;
			animation: rotate 1s linear infinite;
		}

		@keyframes rotate {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}
	}

	.approval-content {
		flex: 1;
		min-width: 0;
		background: #f6f8fc;
		padding: 20rpx;
		margin-left: 54rpx;

		.approval-header {
			margin-bottom: 16rpx;
		}

		.approval-title {
			display: flex;
			align-items: center;
			gap: 16rpx;
			flex-wrap: wrap;

			.title-text {
				font-size: 28rpx;
				font-weight: bold;
				color: #000;
			}

			.title-status {
				font-size: 24rpx;

				&.status-text-green {
					color: #07c160;
				}
			}
		}

		.approval-body {
			.approval-info {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				gap: 10rpx;
				flex-wrap: wrap;

				.approver-name {
					font-size: 24rpx;
					color: #000;
				}

				.approval-time {
					font-size: 24rpx;
					color: #999;
					text-align: right;
					flex: 1;
					white-space: nowrap;
				}

				.action-btn {
					display: block;
					padding: 4rpx 10rpx;
					border-radius: 6rpx;
					font-size: 24rpx;
					color: #fff;

					&.btn-approved {
						background: #07c160;
					}
					&.btn-pending {
						background: #ffd615;
					}
					&.btn-rejected {
						background: #ff5722;
					}
				}
			}

			.approval-remark {
				margin-top: 12rpx;

				.remark-label {
					font-size: 24rpx;
					color: #666;
					margin-right: 8rpx;
				}
				.remark-text {
					font-size: 24rpx;
					color: #666;
					line-height: 1.6;
				}
			}
		}
	}
}
</style>