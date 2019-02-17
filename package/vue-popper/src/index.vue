<template>
  <div ref="target"
    @click="HandleClick"
    @mouseenter="HandleMouseenter"
    @mouseleave="HandleMouseleave">
    <slot></slot>
    <div ref="popper" v-show="self_isShow" :class="popperClass" :style="popperStyle">
      <template>
        <slot name="popper"></slot>
      </template>
    </div>
  </div>
</template>
<script>
const forEach = (l, fn) => {
  for (let i = 0; i < l.length; i++) {
    fn && fn(l[i], i);
  }
};
const contain = (f, c) => {
  return f === c || f.compareDocumentPosition(c) === 20;
};
const methods = {
  __creatPopperInstance() {
    /* 实例化 plupload */
    if (this.Popper) {
      this.PopperInstance = new this.Popper(
        this.$refs.target,
        this.$refs.popper,
        this.__getPopperConfig()
      );
    } else {
      throw new Error('Please pass in "Popper", at use "Vue.use"');
    }
    /* 实例化 plupload end */
  },
  __getPopperConfig() {
    let self = this;
    let tmpMap = {
      onCreate() {
        self.$emit("Create", arguments);
      },
      onUpdate() {
        self.$emit("Update", arguments);
      }
    };
    // 通过 props 属性 设置 Plupload 配置
    forEach(
      ["placement", "eventsEnabled", "removeOnDestroy", "modifiers"],
      key => {
        this[key] && (tmpMap[key] = this[key]);
      }
    );
    return tmpMap;
  },
  // Plupload 方法构建
  __creatPluploadMethodFn(key) {
    return function() {
      this.PopperInstance[key].apply(this.PopperInstance, arguments);
    };
  },
  show() {
    this.setIsShow(true);
  },
  hide() {
    this.setIsShow(false);
  },
  setIsShow(bool) {
    this.self_isShow = bool;
    this.$emit("update:isShow", bool);
  },
  trigger() {
    this.setIsShow(!this.self_isShow);
  },
  HandleClick(ev) {
    if (this.target === "click" && !contain(this.$refs.popper, ev.target)) {
      this.trigger();
    }
  },
  HandleMouseenter() {
    this.target === "hover" && this.setIsShow(true);
  },
  HandleMouseleave() {
    this.target === "hover" && this.setIsShow(false);
  },
  HandleClickDoc(ev) {
    if (!this.self_isShow) {
      return 0
    }
    if (contain(this.$el, ev.target)) {
      return 0
    }
    if (this.relateEl && typeof this.relateEl === 'object') {
      let isRelateEl = false
      const ArrayRelateEl = (this.relateEl instanceof Array) ? this.relateEl : [this.relateEl]
      forEach(ArrayRelateEl, (item) => {
        contain(item, ev.target) && (isRelateEl = true)
      })
      if (isRelateEl) {
        return 0
      }
    }
    this.setIsShow(false)
  }
};
// 动态添加 method
forEach(
  [
    "update",
    "destroy",
    "enableEventListeners",
    "disableEventListeners",
    "scheduleUpdate"
  ],
  item => {
    methods[item] = methods.__creatPluploadMethodFn(item);
  }
);
export default {
  name: "vue-popper",
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    target: {
      type: String,
      default: "click"
    },
    placement: {
      type: String,
      default: "bottom"
    },
    eventsEnabled: {
      type: Boolean,
      default: true
    },
    removeOnDestroy: {
      type: Boolean,
      default: true
    },
    modifiers: {
      type: Object
    },
    popperClass: {
      default: "",
      type: [Object, String]
    },
    popperStyle: {
      default: "",
      type: [Object, String]
    },
    relateEl: {
      default: null
    }
  },
  updated() {
    this.update();
  },
  data() {
    let self = this
    return {
      /** Popper 组件对象 外部传入 */
      Popper: null,
      /* Popper 实例对象 */
      PopperInstance: null,
      /* 组件内单独记录isShow */
      self_isShow: self.isShow
    };
  },
  mounted() {
    // 创建 Popper 实例
    this.__creatPopperInstance();
    document.addEventListener("click", this.HandleClickDoc, true);
  },
  methods,
  watch: {
    isShow (v) {
      this.self_isShow !== v && (this.self_isShow = v)
    }
  },
  beforeDestroy() {
    // 销毁 Popper 实例
    this.destroy();
    this.PopperInstance = null;
    document.removeEventListener("click", this.HandleClickDoc, true);
  }
};
</script>
