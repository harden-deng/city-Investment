# BottomNavBar 底部导航栏组件

一个功能完整的底部导航栏组件，支持 uni-app Vue3 + TypeScript + SCSS。

## 功能特性

- ✅ 支持自定义导航项
- ✅ 支持图标和Emoji图标
- ✅ 自动页面跳转
- ✅ 响应式设计
- ✅ 深色模式适配
- ✅ TypeScript 支持
- ✅ 平滑动画效果
- ✅ 安全区域适配

## 基础用法

### 1. 在页面中引入组件

```vue
<template>
  <view class="page">
    <!-- 页面内容 -->
    <view class="content">
      <!-- 你的页面内容 -->
    </view>
    
    <!-- 底部导航栏 -->
    <BottomNavBar 
      v-model="currentTab"
      :nav-items="navItems"
      active-color="#007AFF"
      inactive-color="#999999"
      @change="handleNavChange"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BottomNavBar from '@/components/navBar/bottomNavBar.vue'
import type { NavItem } from '@/components/navBar/types'

const currentTab = ref(0)

const navItems: NavItem[] = [
  {
    label: '首页',
    iconText: '🏠',
    path: '/pages/index/index',
    pagePath: 'pages/index/index'
  },
  {
    label: '待办流程',
    iconText: '📋',
    path: '/pages/pending/pending',
    pagePath: 'pages/pending/pending'
  },
  {
    label: '已办流程',
    iconText: '✅',
    path: '/pages/completed/completed',
    pagePath: 'pages/completed/completed'
  },
  {
    label: '个人中心',
    iconText: '👤',
    path: '/pages/profile/profile',
    pagePath: 'pages/profile/profile'
  }
]

const handleNavChange = (index: number, item: NavItem) => {
  console.log('导航切换:', index, item)
}
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  padding-bottom: 120rpx; // 给底部导航栏留出空间
}

.content {
  padding: 20rpx;
}
</style>
```

### 2. 使用图标文件

```vue
<template>
  <BottomNavBar 
    v-model="currentTab"
    :nav-items="iconNavItems"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { iconNavItems } from '@/components/navBar/types'

const currentTab = ref(0)
</script>
```

## API 文档

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `modelValue` | `number` | `0` | 当前激活的导航索引 |
| `navItems` | `NavItem[]` | `defaultNavItems` | 导航项配置数组 |
| `activeColor` | `string` | `#007AFF` | 激活状态的颜色 |
| `inactiveColor` | `string` | `#999999` | 非激活状态的颜色 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:modelValue` | `(value: number)` | 当前激活索引变化时触发 |
| `change` | `(index: number, item: NavItem)` | 导航项点击时触发 |

### NavItem 接口

```typescript
interface NavItem {
  label: string        // 显示文字
  icon?: string        // 图标路径（可选）
  activeIcon?: string  // 激活状态图标路径（可选）
  iconText?: string    // Emoji图标（可选，与icon二选一）
  path: string         // 跳转路径
  pagePath?: string    // 页面路径（用于匹配当前页面）
}
```

### 方法

通过 `ref` 可以调用以下方法：

```vue
<template>
  <BottomNavBar ref="bottomNavRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const bottomNavRef = ref()

// 获取当前激活索引
const getCurrentIndex = () => {
  return bottomNavRef.value?.getCurrentIndex()
}

// 设置当前激活索引
const setCurrentIndex = (index: number) => {
  bottomNavRef.value?.setCurrentIndex(index)
}
</script>
```

## 自定义样式

### 修改导航栏高度

```scss
// 在父组件中覆盖样式
:deep(.bottom-nav-bar) {
  height: 160rpx; // 自定义高度
}

.page {
  padding-bottom: 160rpx; // 对应调整页面底部间距
}
```

### 修改激活状态样式

```scss
:deep(.nav-item.active) {
  .icon-container {
    background: rgba(0, 122, 255, 0.1);
    border-radius: 50%;
  }
}
```

## 注意事项

1. **页面路径配置**：确保 `path` 和 `pagePath` 配置正确
2. **安全区域**：组件已自动处理底部安全区域
3. **页面样式**：记得为页面添加底部内边距，避免内容被导航栏遮挡
4. **图标资源**：如使用图标文件，请确保路径正确且资源存在

## 兼容性

- ✅ H5
- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ App (Android/iOS)
- ✅ 快手小程序
- ✅ 字节跳动小程序
