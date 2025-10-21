// 底部导航栏相关类型定义

export interface NavItem {
  label: string
  icon?: string
  activeIcon?: string
  iconText?: string
  path: string
  pagePath?: string
}

export interface BottomNavBarProps {
  modelValue?: number
  navItems?: NavItem[]
  activeColor?: string
  inactiveColor?: string
}

export interface BottomNavBarEmits {
  (e: 'update:modelValue', value: number): void
  (e: 'change', index: number, item: NavItem): void
}

// 预设的导航配置
export const defaultNavItems: NavItem[] = [
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

// 使用图标文件的导航配置示例
export const iconNavItems: NavItem[] = [
  {
    label: '首页',
    icon: '/static/icons/home.png',
    activeIcon: '/static/icons/home-active.png',
    path: '/pages/index/index',
    pagePath: 'pages/index/index'
  },
  {
    label: '待办流程',
    icon: '/static/icons/pending.png',
    activeIcon: '/static/icons/pending-active.png',
    path: '/pages/pending/pending',
    pagePath: 'pages/pending/pending'
  },
  {
    label: '已办流程',
    icon: '/static/icons/completed.png',
    activeIcon: '/static/icons/completed-active.png',
    path: '/pages/completed/completed',
    pagePath: 'pages/completed/completed'
  },
  {
    label: '个人中心',
    icon: '/static/icons/profile.png',
    activeIcon: '/static/icons/profile-active.png',
    path: '/pages/profile/profile',
    pagePath: 'pages/profile/profile'
  }
]
