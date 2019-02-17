/*
 * @Author: ApathyJade <apathyjade@outlook.com>
 * @Version: 0.0.1
 * @Date: 2017-12-11 21:06:16
 * @Last Modified by:   xinyu.wang
 * @Last Modified Time: 2017-12-11 21:06:16
 */

import component from './index.vue'
component.install = (Vue, opts = {}) => {
  let {
    // 当需要 Vue 绑定全局属性是 使用的配置 例如：Vue[key] = xxx
    key = '$Popper',
    tag = 'VuePopper',
    isRegisteredTag = true,
    Popper
  } = opts
  let mixins = {
    created () {
      // 注入 Plupload
      this.Popper = Popper
    }
  }
  // 添加 component mixins 对象
  if (typeof component.mixins === 'array') {
    component.mixins.splice(0, 0, mixins)
  } else {
    component.mixins = [mixins]
  }
  // 注册标签
  isRegisteredTag && Vue.component(tag, component)
}
export default component