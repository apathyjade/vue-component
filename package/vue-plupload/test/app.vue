<template>
  <div class="mod-app">
    <VuePlupload v-if="IsShow" class="asd"
        :url="'//m.apthyjade.com/finance/licence/upload'"
        :filters="{
          mime_types: 'image/*',
          max_file_size: '5120kb'
        }"
        :multi_selection="false"
        :headers="{
          [csrfHeader]: csrf
        }"
        @Error="() => {}"
        @FilesAdded="(up) => {up.start();}"
        @FileUploaded="() => {}">
        <ContentAddImg text="三证合一证件"></ContentAddImg>
      </VuePlupload>
    <button @click="IsShow = !IsShow">asassasas</button>
  </div>
</template>

<script>  
  // import componentTest from '../src/index.vue'
  // import componentTest from '../src/index.js'
  // import componentTest from '../dist/index.min.js'
  export default {
    name: 'app',
    data () {
      return {
        IsShow: true
      }
    },
    methods: {
      onBrowse (up) {
        console.log('onBrowse')
      },
      PostInit () {
        console.log('asdfghjkl')
      }
    }
  }
</script>

<style lang="">
  .mod-app {
    margin: 64px auto;
    padding: 32px;
    width: 1184px;
    min-height: 320px;
    background: #fcfcfc;
    
  }
  .asd {
      width: 1184px;
      min-height: 100px;
    }
</style>
