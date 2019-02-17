/*
 * @Author: ApathyJade <apathyjade@outlook.com>
 * @Version: 0.0.1
 * @Date: 2017-12-11 21:06:16
 * @Last Modified by:   xinyu.wang
 * @Last Modified Time: 2017-12-11 21:06:16
 */

import component from './index.vue'
export default {
  install (Vue, opts = {}) {
    let {key = '$photoswipe'} = opts
    const PhotoSwipe = Vue.extend(component)
    const $vm = new PhotoSwipe({el: document.createElement('div')})
    document.body.appendChild($vm.$el)
    Vue[key] = $vm
    Vue.mixin({
      created () {
        this[key] = Vue[key]
      }
    })
  }
}