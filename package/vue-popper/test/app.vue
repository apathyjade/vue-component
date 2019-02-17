<template>
  <div class="mod-app">
    <component-test
      target="click"
      placement="top"
      :isShow.sync="isShow"
      :eventsEnabled="true"
      :removeOnDestroy="true"
      :modifiers="{
        shift: {
          order: -1
        },
        offset: {
          offset: '-100px'
        },
        preventOverflow: {
          enabled: true
        }
      }">
      asdfghjk
      <template slot="popper">
        yes, you know i'm your fahter
      </template>
    </component-test>
  </div>
</template>

<script>
import vue from "vue";
import Popper from "popper.js";
import componentTest from '../src/index.js'
// import componentTest from "../dist/index.min.js";
vue.use(componentTest, {
  Popper,
  isRegisteredTag: false
});

export default {
  name: "app",
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    onCreate() {
      window.console.log("onCreate");
    },
    onUpdate() {
      window.console.log("onUpdate");
    },
    fn() {
      console.log("fn");
    }
  },
  components: { componentTest }
};
</script>

<style lang="stylus">
.mod-app {
  margin: 64px auto;
  padding: 32px;
  width: 400px;
  min-height: 320px;
  background: #fcfcfc;
}
</style>
