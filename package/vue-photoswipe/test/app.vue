<template>
  <div class="mod-app">
    <button @click="preview">test</button>
  </div>
</template>

<script>  
  // import componentTest from '../src/index.vue'
  import Vue from 'vue'
  import componentTest from '../src/index.js'
  // import componentTest from '../dist/index.min.js'
  Vue.use(componentTest)
  export default {
    name: 'app',
    data () {
      return {
        test: 24
      }
    },
    created () {
      this.test = 12
      console.log(this.$data.test)
    },
    methods: {
      preview () {
        this.$photoswipe.open(2, [
          {
            src: 'http://f12.baidu.com/it/u=468241778,2123731313&fm=76',
            w: 1024,
            h: 768
          }, {
            src: 'http://f11.baidu.com/it/u=4274608525,1507073155&fm=76',
            w: 20,
            h: 10
          }
        ])
      }
    }
  }
</script>

<style>
  .mod-app {
    margin: 64px auto;
    padding: 32px;
    width: 1184px;
    min-height: 320px;
    background: #fcfcfc;
  }
</style>
