# vue-popper
基于 popper.js 的vue组件
## Install

```sh
$ npm install vue-popper-aj --save
```

## Usage
```sh
<script>
import Vue from 'vue'
// 依赖 Popper 
import Popper from 'popper.js'
import VuePopper from 'vue-popper-aj'
Vue.use(VuePopper, {
    // 注册标签名 默认为 'VuePopper' 选填项
    tag: 'VuePopper',
    // 需要注入 Popper 必填项
    Popper,
    // 是否注册全局标签 默认注册， 当为 false 时需要手动注册 component 
    isRegisteredTag: true
})
</script>
// 模版使用
<template>
<VuePopper ref="VuePlupload" 
  :isShow.sync="需要自由控制显示隐藏时使用" @target="Create">
    上传
</VuePopper>
</template>

### props
isShow: {
  type: Boolean,
  default: false
}
target: {
  type: String,
  default: 'click' // 'click' or 'hover'
}
// popper.js 配置
'placement'
'eventsEnabled'
'removeOnDestroy'
'modifiers'
### methods
'show'
'hide'
'trigger'
// popper.js 方法
'update'
'destroy'
'enableEventListeners'
'disableEventListeners'
'scheduleUpdate'
### Event
'Create' //对应 popper.js onCreate
'Update' //对应 popper.js onUpdate
```