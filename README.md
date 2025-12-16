# city-Investment

## 项目简介

`city-Investment` 是一个基于 **uni-app + Vue 3** 开发的移动端 H5 项目，主要用于城市投融资相关业务的线上审批与信息展示，例如：

- 费用支付 / 工程款付款申请
- 合同及预算信息查看
- 审批流转记录查询
- 消息通知与帮助信息查看

项目支持在手机浏览器、微信内置浏览器中访问，并针对移动端做了适配和交互优化。

## 技术栈

- **开发框架**：uni-app（Vue 3）
- **语言**：JavaScript / SCSS
- **构建工具**：HBuilderX / Vue CLI（通过 uni-app 工程）
- **UI & 组件**：
  - 官方 `uni-ui` 组件（如 `uni-nav-bar` 等）
  - 自定义业务组件（如 `bottomNavBar`、`detailNavBar`、`approvalTimeline` 等）
- **网络请求**：自封装 `utils/request.js`（基于 `uni.request`）
- **路由管理**：uni-app 内置路由（`pages.json`）

## 目录结构

> 只列最常用的几个目录，方便新人快速上手。

```text
city-Investment/
├─ App.vue               # 全局入口组件，全局样式
├─ main.js               # 入口脚本，创建应用
├─ pages.json            # 页面路由 & tabBar 配置
├─ manifest.json         # uni-app 项目配置（appid、H5、打包等）
├─ index.html            # H5 入口模板（viewport 等）
├─ components/           # 公共组件
│  └─ navBar/
│     ├─ bottomNavBar.vue    # 底部导航
│     └─ detailNavBar.vue    # 详情页顶部导航
├─ pages/                # 业务页面
│  ├─ nav/
│  │  ├─ pending.vue         # 待办列表
│  │  ├─ completed.vue       # 已办列表
│  │  └─ home.vue            # 首页 / 工作台
│  ├─ detail/
│  │  ├─ zcys.vue            # 资产预算 / 费用组成详情
│  │  ├─ gcfk.vue            # 工程付款详情
│  │  ├─ cbqr.vue            # 成本确认详情
│  │  └─ ...                 # 其他业务详情页
│  └─ info/
│     ├─ msg.vue             # 消息通知
│     └─ help.vue            # 帮助中心
├─ utils/
│  ├─ definitions.js         # 常量、枚举、配置项
│  ├─ h5Bridge.js            # H5 工具函数，如 formatNumber、flatToTree 等
│  ├─ useListHeight.js       # 动态计算列表 / 滚动区域高度的 hook
│  ├─ useApproval.js         # 审批通用逻辑（通过/打回等）
│  └─ useDetailCommon.js     # 详情页通用逻辑（urlParams、开关控制等）
└─ uni_modules/              # uni-app 插件模块
```

## 本地运行

> 以下命令以 HBuilderX / npm 为例，根据你的实际开发环境调整。

### 安装依赖

```bash
# 在项目根目录
npm install
```

### 启动 H5 开发调试

```bash
# 使用 uni-app H5 运行
npm run dev:h5
# 或在 HBuilderX 中：运行 -> 运行到浏览器 -> 选择 Chrome 等
```

启动成功后，在浏览器中访问终端输出的地址（如 `http://localhost:8080` 或 `http://localhost:3000`）。

## 构建发布

### H5 打包

```bash
npm run build:h5
```

打包完成后，静态资源输出到 `unpackage/dist/build/h5` 目录，可部署到 Nginx / 静态服务器。

> 如果有自定义发布目录或 CI/CD，可在这里补充公司内部流程。

## 接口与环境配置

### 接口代理（H5）

接口代理配置在 `manifest.json` 中的 `h5.devServer.proxy`：

```json
"h5": {
  "devServer": {
    "proxy": {
      "/WebApi/api": {
        "target": "http://47.99.104.91:8039",
        "changeOrigin": true,
        "secure": true,
        "pathRewrite": {
          "^/WebApi/api": "/WebApi/api"
        }
      }
    }
  },
  "router": {
    "base": "./"
  }
}
```

- **开发环境**：通过 `/WebApi/api` 代理到后端接口
- **生产环境**：请在部署的 Nginx / 网关中配置同样的反向代理规则

> 若后续有多环境（dev / test / prod），建议在这里补充环境说明。

## 主要功能模块说明

- **首页 / 工作台（`pages/nav/home.vue`）**
  - 展示入口模块、统计信息等
- **待办列表（`pending.vue`） & 已办列表（`completed.vue`）**
  - 分页加载审批任务
  - 支持搜索、切换状态
- **详情页（`pages/detail/*.vue`）**
  - 如 `zcys.vue`、`gcfk.vue`、`cbqr.vue` 等
  - 统一使用 `detailNavBar` 顶部导航
  - 通过 `useApproval`、`useDetailCommon` 复用审批和详情逻辑
- **附件管理**
  - 按 “工程付款申请单 / 发票 / 其他资料”等维度分组展示附件列表

## 开发约定

- **组件命名**：业务组件使用小驼峰文件名 + `.vue`，目录按功能分层
- **样式**：统一使用 `lang="scss" scoped`，全局样式在 `uni.scss` 与 `App.vue`
- **接口调用**：统一封装在 `utils/request.js` 中，页面通过 `http.get/post` 调用
- **列表高度计算**：如有滚动区域，优先使用 `useListHeight` 统一计算，避免重复代码

## 注意事项

- 项目主要面向 **手机 H5 场景**，已对横屏做了限制和适配（如有变更，请同步更新本说明）。
- 如需打包 App（`app-plus`），需在 `manifest.json` 配置对应平台参数，并在 HBuilderX 中执行打包。

---

> 如有新的业务模块 / 环境配置变更，建议在对应小节下更新说明，保持 README 与实际项目一致。
