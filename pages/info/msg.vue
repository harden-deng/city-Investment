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
                <view class="nav-title">消息中心</view>
                <template v-slot:right>
                    <view style="width: 40rpx"></view>
                </template>
            </uni-nav-bar>
        </view>
        <!-- 消息列表 -->
        <view class="msg-list">
            <z-paging ref="paging" v-model="dataList" @onRefresh="onRefresh" @query="queryList"
                :fixed="false">
                <view class="msg-item" v-for="(item, index) in dataList" :key="index" @click="handleMsgClick(item)">
                    <view class="msg-header">
                        <view class="msg-icon">
                            <image class="msg-icon-img" src="../../static/images/ucicon_1.svg" mode="widthFix"></image>
                        </view>
                        <view class="msg-title">{{ item.title }}</view>
                        <!-- <view class="msg-options" @click.stop="handleOptionsClick(item, index)">
                            <view class="dots">⋯</view>
                        </view> -->
                    </view>
                    <view class="msg-content">
                        {{ item.content }}
                    </view>
                    <view class="msg-action">
                        <text class="action-text">{{ item.time }}</text>
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
const dataList = ref([]);
// const dataList = ref([
//     {
//         id: 1,
//         title: '关于近期贵金属业务市场风险提示',
//         content: '尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范尊敬的客户:近期国内外贵金属价格波动加剧,市场风险提升。请您提高贵金属业务的风险防范',
//         time: '2024-01-15 10:30',
//         read: false
//     },
//     {
//         id: 2,
//         title: '识诈反诈揭秘手机远程操控诈骗',
//         content: '近期,多地发生利用手机远控APP实施资金盗用的案件,受害者众多。这类诈骗隐蔽性极强,犯...',
//         time: '2024-01-14 15:20',
//         read: false
//     },
//     {
//         id: 3,
//         title: '关于第二批"西藏自治区成立60周',
//         content: '尊敬的客户:根据中国人民银行贵金属纪念币发行安排,"西藏自治区成立60周年金银纪念币"...',
//         time: '2024-01-13 09:15',
//         read: true
//     },
//     {
//         id: 4,
//         title: '关于第二批"西藏自治区成立60周',
//         content: '尊敬的客户:根据中国人民银行贵金属纪念币发行安排,"西藏自治区成立60周年金银纪念币"...',
//         time: '2024-01-13 09:15',
//         read: true
//     },
//     {
//         id: 5,
//         title: '关于第二批"西藏自治区成立60周',
//         content: '尊敬的客户:根据中国人民银行贵金属纪念币发行安排,"西藏自治区成立60周年金银纪念币"...',
//         time: '2024-01-13 09:15',
//         read: true
//     },
//     {
//         id: 6,
//         title: '关于第二批"西藏自治区成立60周',
//         content: '尊敬的客户:根据中国人民银行贵金属纪念币发行安排,"西藏自治区成立60周年金银纪念币"...',
//         time: '2024-01-13 09:15',
//         read: true
//     },
//     {
//         id: 7,
//         title: '关于第二批"西藏自治区成立60周',
//         content: '尊敬的客户:根据中国人民银行贵金属纪念币发行安排,"西藏自治区成立60周年金银纪念币"...',
//         time: '2024-01-13 09:15',
//         read: true
//     }
// ]);

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
        http.get('/Users/GetPersonalMessage', {
			Page: pageNo,
			Limit: pageSize,
		}).then(res => {
			paging.value.complete(res.data || [])
		}).catch(() => {
			paging.value.complete(false)
			uni.showToast({ title: '加载失败', icon: 'none' });
		})
	}
    const goBack = () => {
        uni.navigateBack({
            delta: 1
        })
    }

const statusBarHeight = ref(0)

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
::v-deep .uni-navbar__header-container {
    justify-content: center !important;
    align-items: center !important;
}

::v-deep .uni-navbar__header {
    padding: 0 !important;
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
}

.msg-header {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;
}

.msg-icon {
    width: 60rpx;
    height: 60rpx;
    background: #66cc33;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20rpx;
    flex-shrink: 0;

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
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

.msg-content {
    font-size: 24rpx;
    color: #666;
    line-height: 1.5;
    margin-bottom: 20rpx;
    overflow-wrap: break-word;
}

.msg-action {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.action-text {
    font-size: 28rpx;
    color: #999;
    margin-right: 8rpx;
}
</style>