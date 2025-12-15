<template>
	<view class="layout-container">
      <view v-show="currentIndex === 0" >
        <Home v-if="cacheList[0]" @change="handleNavChange" :currentIndex="currentIndex"/>
      </view>
      <view v-show="currentIndex === 1">
        <Pending v-if="cacheList[1]" />
      </view>
      <view v-show="currentIndex === 2">
        <Completed v-if="cacheList[2]" />
      </view>
      <view v-show="currentIndex === 3">
        <Profile v-if="cacheList[3]" />
      </view>
		<!-- 底部导航栏 -->
		<BottomNavBar 
			ref="bottomNavRef" 
			:modelValueFlag="currentIndex"
			:componentMode="true"
			@change="handleNavChange"
		/>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import BottomNavBar from '@/components/navBar/bottomNavBar.vue'
// 导入组件
import Home from './home.vue'
import Pending from './pending.vue'
import Completed from './completed.vue'
import Profile from './profile.vue'
const cacheList = ref([true, false, false, true])
// 当前激活的索引
const currentIndex = ref(0)
// 底部导航栏引用
const bottomNavRef = ref(null)

// 切换组件
const switchComponent = (index) => { 
	cacheList.value[index] = true
	currentIndex.value = index
	// 同步更新底部导航栏的激活状态
	if (bottomNavRef.value) {
		bottomNavRef.value.setCurrentIndex(index)
	}
}
// 处理导航栏变化事件
const handleNavChange = (index, item) => {
	if (currentIndex.value === index) {
		return
	}
	switchComponent(index)
}
</script>

<style lang="scss" scoped>
page{
	background: #f3f7ff;
}
.layout-container {
	width: 100%;
	// height: 100vh;
	display: flex;
	flex-direction: column;
	background: #f3f7ff;
	overflow: hidden;
}

// .content-wrapper {
// 	flex: 1;
// 	width: 100%;
// 	overflow: hidden;
// 	position: relative;
	
// 	.component-wrapper {
// 		position: absolute;
// 		top: 0;
// 		left: 0;
// 		width: 100%;
// 		height: 100%;
// 		overflow: hidden;
// 	}
	
// 	// 确保组件占满整个区域
// 	:deep(.workplace-container),
// 	:deep(.order-page),
// 	:deep(.profile) {
// 		width: 100%;
// 		height: 100%;
// 	}
// }
@media (min-width: 320px) and (max-width: 539px) {
	@media (min-aspect-ratio: 13/20) {
	  ::v-deep .bottom-nav-bar {
		// opacity: 0 !important;
		display: none !important;
		height: 0 !important;
		background-color: #fff !important;
		
	  }
	}
}


</style>
