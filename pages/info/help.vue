<template>
    <view class="msg-page">
        <view class="header-stickt">
            <view class="status_bar" :style="{ height: `${statusBarHeight * 2}rpx` }"></view>
            <uni-nav-bar class="nav-bar-top">
                <template v-slot:left>
                    <view class="back-btn" @click="goBack">
                        <!-- <uni-icons type="back" color="#000" size="22" /> -->
                        <!-- <image src="../../static/images/back.svg" mode=""></image> -->
                    </view>
                </template>
                <view class="nav-title">在线帮助</view>
                <template v-slot:right>
                    <view style="width: 40rpx"></view>
                </template>
            </uni-nav-bar>
        </view>
        <!-- 消息列表 -->
        <view class="msg-list">
            <z-paging ref="paging" v-model="dataList" @onRefresh="onRefresh" @query="queryList"
                :fixed="false">
                <view class="msg-item" v-for="(item, index) in dataList" :key="index">
                    <view class="msg-header" @click="toggleItem(index)">
                        <view class="msg-icon">
                            <image class="msg-icon-img" src="../../static/images/ucicon_3.svg" mode="widthFix"></image>
                        </view>
                        <view class="msg-title">{{ item.title }}</view>
                        <view class="expand-icon" :class="{ 'expanded': item.expanded }">
                            <!-- <text class="chevron">></text> -->
                            <image class="chevron" src="../../static/images/arrow-right-s-line.svg" mode="widthFix"></image>
                        </view>
                    </view>
                    <view class="msg-content-wrapper" :class="{ 'expanded': item.expanded }">
                        <view class="qa-content">
                            <view class="qa-item" v-for="(qa, qaIndex) in item.qaList" :key="qaIndex">
                                <view class="question-section">
                                    <text class="qa-label">Q:</text>
                                    <text class="question-text">{{ qa.question }}</text>
                                </view>
                                <view class="answer-section">
                                    <text class="qa-label">A:</text>
                                    <text class="answer-text">{{ qa.answer }}</text>
                                </view>
                            </view>
                        </view>
                        <!-- <view class="msg-action">
                            <text class="action-text">{{ item.time }}</text>
                        </view> -->
                    </view>
                </view>
            </z-paging>
        </view>
        <!-- 底部导航栏 -->
    </view>
</template>
<script setup>
import { ref, onMounted,getCurrentInstance,nextTick } from 'vue'
import http from '@/utils/request.js'
// 消息列表数据
// const dataList = ref([]);
	const statusBarHeight = getApp().globalData.statusBarHeight

const dataList = ref([
    {
        id: 1,
        title: '关于近期贵金属业务市场风险提示',
        qaList: [
            {
                question: '为什么需要更新技术简历？',
                answer: '技术简历是技术岗位授权流程中的必要要求。其内容应包含在TMT中注册的所有学习、经验和技术发展的证据。'
            },
            {
                question: '技术简历需要包含哪些内容？',
                answer: '技术简历应包含您的教育背景、工作经验、技能证书、项目经验等与技术岗位相关的所有信息。'
            },
            {
                question: '如何更新技术简历？',
                answer: '您可以通过登录系统，在个人资料页面找到技术简历选项，按照提示填写相关信息并提交审核。'
            }
        ],
        time: '2024-01-15 10:30',
        read: false,
        expanded: false
    },
    {
        id: 2,
        title: '识诈反诈揭秘手机远程操控诈骗新远程操控诈骗新.远程操控诈骗新.远程操控诈骗新....',
        qaList: [
            {
                question: '如何保护自己免受手机远程操控诈骗？',
                answer: '要谨慎对待可疑应用，不要与陌生人分享屏幕，定期检查设备权限，发现任何可疑活动立即向银行报告。'
            },
            {
                question: '什么是手机远程操控诈骗？',
                answer: '手机远程操控诈骗是指诈骗分子通过各种手段获取您的手机控制权，进而盗取您的个人信息和资金。'
            },
            {
                question: '如何识别可疑的远程操控请求？',
                answer: '注意不要接受来自陌生人的屏幕共享请求，不要下载来源不明的应用，定期检查手机权限设置。'
            }
        ],
        time: '2024-01-14 15:20',
        read: false,
        expanded: false
    },
    {
        id: 3,
        title: '关于第二批"西藏自治区成立60周年"纪念币发行',
        qaList: [
            {
                question: '纪念币收藏是什么？',
                answer: '西藏自治区成立60周年金银纪念币由中国人民银行发行，用于庆祝西藏自治区成立60周年。'
            },
            {
                question: '如何购买这些纪念币？',
                answer: '您可以通过授权银行和官方渠道购买这些纪念币。请联系您当地的分行了解供应情况和价格信息。'
            },
            {
                question: '这些纪念币的投资价值如何？',
                answer: '纪念币可能具有收藏价值，但不保证投资回报。购买前请考虑您的财务状况和投资目标。'
            },
            {
                question: '是否有身份验证要求？',
                answer: '是的，您可能需要提供有效身份证明并满足某些资格标准。请向您的银行咨询具体要求。'
            },
            {
                question: '如果对订单有疑问应该怎么办？',
                answer: '通过官方渠道联系我们的客服团队或访问最近的分行。我们的工作人员很乐意为您解答任何疑问。'
            }
        ],
        time: '2024-01-13 09:15',
        read: true,
        expanded: false
    }
]);

const paging = ref(null)
const onRefresh =() => {
		// 告知z-paging下拉刷新结束，这样才可以开始下一次的下拉刷新
		setTimeout(() => {
			// 1.5秒之后停止刷新动画
			paging.value.complete();
			paging.value.reload()
		}, 10)
	}
	//分页加载
	// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
	const queryList = (pageNo, pageSize) => {
        paging.value.complete(dataList.value || [])
        // http.get('/Users/GetOnlineHelp', {
		// 	Page: pageNo,
		// 	Limit: pageSize,
		// }).then(res => {
		// 	paging.value.complete(res.data || [])
		// }).catch(() => {
		// 	paging.value.complete(false)
		// })
	}
const goBack = () => {
    uni.navigateBack({
        delta: 1
    })
}
// 处理消息点击
const handleMsgClick = (item) => {
    console.log('点击消息:', item)
    // 标记为已读
    item.read = true
    // 可以跳转到详情页
    // uni.navigateTo({
    //   url: `/pages/detail/index?id=${item.id}`
    // })
}

// 切换展开/折叠状态
const toggleItem = (index) => {
    dataList.value[index].expanded = !dataList.value[index].expanded
    console.log('切换展开状态:', index, dataList.value[index].expanded)
}



const msgListHeight = ref('');
const computeMsgListHeight = () => {
    try {
        const {
            windowHeight
        } = uni.getSystemInfoSync() // px
        const inst = getCurrentInstance()
        const q = uni.createSelectorQuery().in(inst?.proxy)
        q.select('.header-stickt').boundingClientRect(rect => {
            const headerH = rect?.height || 0
            const h = Math.max(0, windowHeight - headerH)
            console.log('h-0000000000000->', h)
            msgListHeight.value = `${h}px`
        }).exec()
    } catch (e) {
        // 兜底，避免阻塞页面
        msgListHeight.value = 'calc(100vh - 100rpx)'
    }
}
onMounted(() => {
    console.log('消息页面加载完成');
    nextTick(() => computeMsgListHeight());
    // 横竖屏切换/窗口改变时重算（H5 有效）
    uni.onWindowResize?.(() => computeMsgListHeight());
})
</script>
<style lang="scss" scoped>
	page {
		background: #f3f7ff;
	}
::v-deep .uni-navbar__header-container {
    justify-content: center !important;
    align-items: center !important;
}

::v-deep .uni-navbar__header {
    padding: 0 !important;
}
	// PC端适配
	@media screen and (min-width: 768px) {
		.msg-page {
			max-width: 768rpx;
			margin: 0 auto;
		}
	}
.msg-page {
    width: 100%;
    height: auto;
    background: #f3f7ff;

    .header-stickt {
        position: sticky;
        top: 0;
        z-index: 19;
        box-sizing: border-box;

        .status_bar {
            background: #fff;
            width: 100%;
        }
    }

    .nav-bar-top {
        ::v-deep .uni-navbar__header {
            background: #fff !important;
        }

        .back-btn {
            width: 100rpx;
            height: 100rpx;
            background: url('../../static/images/back.svg') center center no-repeat;
            background-size: 24rpx;
        }

        .nav-title {
            font-size: 32rpx;
            font-weight: bold;
            color: #000;
        }
    }
}

/* 消息列表样式 */
.msg-list {
    box-sizing: border-box;
    height: v-bind(msgListHeight);
}

.msg-item {
    box-sizing: border-box;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    background: #fff;
    border-radius: 24rpx;
    margin-bottom: 32rpx;
    margin-top: 32rpx;
    padding: 32rpx;
    // box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
    // transition: box-shadow 0.3s ease;
    
    // &:hover {
    //     box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.12);
    // }
}

.msg-header {
    display: flex;
    align-items: flex-start;
    padding: 16rpx;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 12rpx;
    
    &:hover {
        background: rgba(0, 0, 0, 0.02);
    }
}

.msg-icon {
    width: 60rpx;
    height: 60rpx;
    background: #ff6666;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20rpx;
    flex-shrink: 0;
    margin-top: 4rpx;

    .msg-icon-img {
        width: 32rpx;
        height: 28.7rpx;
    }
}



.msg-title {
    flex: 1;
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    line-height: 1.5;
    word-wrap: break-word;
    word-break: break-all;
    overflow-wrap: break-word;
    hyphens: auto;
    margin-right: 20rpx;
}

.expand-icon {
    margin-left: 20rpx;
    flex-shrink: 0;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 40rpx;
    height: 40rpx;
    margin-top: 4rpx;
    
    &.expanded {
        transform: rotate(90deg);
    }
    
    .chevron {
        width: 34rpx;
        height: 34rpx;
    }
}

// .msg-options {
// 	margin-left: 20rpx;
// 	flex-shrink: 0;
// }

// .dots {
// 	font-size: 24rpx;
// 	color: #666;
// 	line-height: 1;
// 	transform: rotate(90deg);
// }

.msg-content-wrapper {
  
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                opacity 0.3s ease,
                padding 0.3s ease;
    opacity: 0;
    padding: 0 0;
    
    &.expanded {
        padding-top: 32rpx !important;
        max-height: 1000rpx;
        opacity: 1;
        padding: 16rpx 0 0 0;
    }
}

.qa-content {
    margin-bottom: 0;
}

.qa-item {
    margin-bottom: 24rpx;
    
    &:last-child {
        margin-bottom: 0;
    }
}

.question-section {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16rpx;
    padding: 16rpx;
    background: rgba(255, 152, 0, 0.05);
    border-radius: 12rpx;
    border-left: 4rpx solid #ff9800;
}

.answer-section {
    display: flex;
    align-items: flex-start;
    padding: 16rpx;
    background: rgba(0, 0, 0, 0.02);
    border-radius: 12rpx;
    border-left: 4rpx solid #4CAF50;
}

.qa-label {
    font-weight: bold;
    font-size: 28rpx;
    color: #333;
    margin-right: 12rpx;
    flex-shrink: 0;
    min-width: 40rpx;
}

.question-text {
    font-size: 26rpx;
    color: #333;
    line-height: 1.5;
    flex: 1;
}

.answer-text {
    font-size: 24rpx;
    color: #666;
    line-height: 1.6;
    flex: 1;
    text-align: justify;
}

// .msg-action {
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
// }

// .action-text {
//     font-size: 28rpx;
//     color: #999;
//     margin-right: 8rpx;
// }
</style>