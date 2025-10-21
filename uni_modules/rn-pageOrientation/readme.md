# rn-pageOrientation
### 开发文档
[UTS 语法](https://uniapp.dcloud.net.cn/tutorial/syntax-uts.html)
[UTS API插件](https://uniapp.dcloud.net.cn/plugin/uts-plugin.html)
[UTS uni-app兼容模式组件](https://uniapp.dcloud.net.cn/plugin/uts-component.html)
[UTS 标准模式组件](https://doc.dcloud.net.cn/uni-app-x/plugin/uts-vue-component.html)
[Hello UTS](https://gitcode.net/dcloud/hello-uts)

# 鸿蒙app 横屏竖屏功能API功能

# 功能（就俩功能），设置某个页面的横屏、竖屏展示
# 引入
```js
// #ifdef APP-HARMONY
import { ScreenOrientation } from '@/uni_modules/rn-pageOrientation'
// #endif
```
# 设置横屏
```js
// #ifdef APP-HARMONY
let inst = new ScreenOrientation()
await inst.setLandscape()
// #endif
```
# 设置竖屏
```js
// #ifdef APP-HARMONY
let inst = new ScreenOrientation()
await inst.setPortrait()
// #endif
```