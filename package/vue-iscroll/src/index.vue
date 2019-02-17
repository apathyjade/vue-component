<template>
<div ref="scrollView" :style="[{'overflow': 'hidden'}, elStyle]" :class="elClass">
  <div ref="scroller" :style="scrollStyle" :class="scrollClass">
    <slot></slot>
  </div>
</div>
</template>

<script>
import IScroll from 'iscroll'
export default {
  name: 'vue-iscroll',
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    elClass: {
      type: Object,
      default () {
        return {}
      }
    },
    elStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    scrollClass: {
      type: Object,
      default () {
        return {}
      }
    },
    scrollStyle: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  updated () {
    this.refresh()
  },
  methods: {
    zoom () {
      this.$nextTick(() => this.iscroll.zoom.apply(this.iscroll, arguments))
    },
    goToPage () {
      this.$nextTick(() => this.iscroll.goToPage.apply(this.iscroll, arguments))
    },
    next () {
      this.$nextTick(() => this.iscroll.next.apply(this.iscroll, arguments))
    },
    prev () {
      this.$nextTick(() => this.iscroll.prev.apply(this.iscroll, arguments))
    },
    scrollToElement () {
      this.$nextTick(() => this.iscroll.scrollToElement.apply(this.iscroll, arguments))
    },
    scrollBy () {
      this.$nextTick(() => this.iscroll.scrollBy.apply(this.iscroll, arguments))
    },
    scrollTo () {
      this.$nextTick(() => this.iscroll.scrollTo.apply(this.iscroll, arguments))
    },
    refresh () {
      this.$nextTick(() => this.iscroll.refresh.apply(this.iscroll, arguments))
    }
  },
  beforeDestroy () {
    this.iscroll && this.iscroll.destroy()
    this.iscroll = null
  },
  data () {
    return {
      events: [
        'beforeScrollStart',
        'scrollCancel',
        'scrollStart',
        'scrollEnd',
        'scroll',
        'flick',
        'zoomStart',
        'zoomEnd'
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.iscroll = new IScroll(this.$refs.scrollView, this.options)
      this.events.forEach(event => {
        this.iscroll.on(event, () => this.$emit(event, this.iscroll))
      })
      this.iscroll.on('scrollEnd', e => {
        if (this.iscroll.y <= this.iscroll.maxScrollY) {
          this.$emit('pullUp', this.iscroll)
        } else if (this.iscroll.y >= 0) {
          this.$emit('pullDown', this.iscroll)
        }
      })
    })
  }
}
</script>