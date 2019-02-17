<template>
  <div class="mod-app">
    <component-test :style="{'max-height': '200px'}" class="scroll">
      <ul>
        <li v-for="i in n" :key="i">{{i}}</li>
      </ul>
    </component-test>
  </div>
</template>

<script>  
  // import componentTest from '../src/index.vue'
  // import componentTest from '../src/index.js'
  import componentTest from '../dist/index.min.js'
  export default {
    name: 'app',
    data () {
      return {
        n: 40
      }
    },
    components: {componentTest}
  }
</script>

<style lang="stylus">
  .mod-app {
    margin: 64px auto;
    padding: 32px;
    width: 1184px;
    min-height: 320px;
    background: #fcfcfc;
    .scroll {
      max-height: 200px;
    }
  }
</style>
