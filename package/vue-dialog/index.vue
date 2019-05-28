<template>
  <transition name="fade"
    :enter-class="$style['enter-class']"
    :enter-to-class="$style['enter-to-class']"
    :leave-active-class="$style['leave-to-class']"
    @after-leave="show = false">
  <div v-show="show" :class="$style.block"
    @click="HandleClick">
    <div :class="$style.lay">
      <span v-if="showClose" :class="$style.closeBtn" data-event="close"></span>
      <div :class="$style.head"><slot name="head">{{title}}</slot></div>
      <div :class="$style.body"><slot></slot></div>
      <div :class="$style.foot">
        <slot name="foot">
          <button v-if="showCancel" :class="$style.minorBtn" data-event="cancel">{{textCancel}}</button>
          <button v-if="showConfirm" :class="$style.majorBtn" data-event="confirm">{{textConfirm}}</button>
        </slot>
      </div>
    </div>
  </div>
  </transition>
</template>
<script>
export default {
  props: {
    title: {
      default: '提示',
    },
    show: {
      default: false
    },
    showClose: {
      default: true,
    },
    showCancel: {
      default: true,
    },
    showConfirm:  {
      default: true,
    },
    textConfirm:  {
      default: '确定',
    },
    textCancel:  {
      default: '取消',
    },
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    HandleClick (ev) {
      const dataType = ev.target.getAttribute("data-event");
      if(!dataType){
        return this;
      }
      let isStopClose = false;

      let stopClose = () => {
        isStopClose = true;
      }
      
      this.$emit('dataType', dataType, stopClose, this.close)

      stopClose = null;

      !isStopClose && this.close();
    },
    close () {
      this.$emit('update:show', false)
    }
  },
}
</script>
<style module lang="stylus">
.block {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  z-index: 999;
  text-align: center;
  
  &,
  &.enter-to-class,
  &[data-state=opening],
  &[data-state=open] {
    background-color: rgba(35, 35, 35, .4);
    transition: all .5s linear;
    .lay {
      transform: scale(1, 1);
      transition: all .2s linear;
    }
  }

  &.enter-class,
  &.leave-to-class,
  &[data-state=closing],
  &[data-state=close] {
    background-color: rgba(35, 35, 35, 0);
    transition: all .5s linear;
    .lay {
      transform: scale(0, 0);
      transition: all .2s linear;
    }
  }

  &:after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
  }

  .lay {
    position: relative;
    display: inline-block;
    width: 448px;
    color: #656565;
    font-size: 12px;
    line-height: 20px;
    background-color: #fff;
    text-align: left;
    vertical-align: middle;
  }
  .head {
    padding: 0 24px;
    height: 46px;
    line-height: 46px;
    font-size: 14px;
    font-weight: 600;
    border-bottom: 1px solid #F1F1F1;
  }
  .body {
    padding: 32px;
    ~/[data-type=ok] ^[1..1]:before,
    ~/[data-type=warn] ^[1..1]:before,
    ~/[data-type=error] ^[1..1]:before {
      display: block;
      margin: 14px auto 16px;
      width: 64px;
      height: 64px;
      content: '';
    }
    ~/[data-type=ok] ^[1..1]:before {
      background: url('./imgs/icon-ok.png') no-repeat;
    }
    ~/[data-type=warn] ^[1..1]:before {
      background: url('./imgs/icon-warn.png') no-repeat;
    }
    ~/[data-type=error] ^[1..1]:before {
      background: url('./imgs/icon-error.png') no-repeat;
    }
  }
  .foot {
    margin: 0;
    text-align : center;
    height: 72px;
  }
  .majorBtn,
  .minorBtn {
    display: inline-block;
    box-sizing: border-box;
    border: 1px #316CCB solid;
    padding: 0 24px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    vertical-align: top;
    user-select : none;
    &:focus{
      outline : none;
    }
  }
  .majorBtn {
    margin-left : 16px;
    color: #fff;
    background: #316CCB;
    &:hover {
      border-color: #407fe7;
      background: #407fe7;
    }
  }
  .minorBtn {
    color: #316CCB;
    background: #fff;
    &:hover {
      color: #fff;
      background: #316CCB;
    }
  }
  .closeBtn {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 17px;
    height: 17px;
    cursor: pointer;
    &:before, 
    &:after{
      position: absolute;
      background: #959595;
      content: ' ';
      transform: rotate(45deg);
      box-shadow: 0 0 0 .1px #959595;
    }
    &:before {
      top: 0;
      left: 8px;
      width: 1px;
      height: 17px;
    }
    &:after {
      top: 8px;
      left: 0;
      width: 17px;
      height: 1px;
    }
    &:hover {
      &:before, 
      &:after{
        background: #316CCB;
        box-shadow: 0 0 0 .1px #316CCB;
      }
    }
  }
  .tipTitle {
    margin: 0 auto 8px;
    font-size: 18px;
    line-height: 18px;
    color: #353535;
    text-align: center;
  }
  .tipMsg {
    text-align: center;
  }
}
</style>

