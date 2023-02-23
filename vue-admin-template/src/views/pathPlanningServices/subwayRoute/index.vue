


<template>
  

  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div class="subway-container">
      <div id="mysubway"></div>
    </div>
    
  </div>
  
</template>


<script>

  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        mysubway: null,
        map: null,
      }
    },
    mounted() {
      this.initsub()
    
    },
    methods: {
      initsub() {
      this.mysubway = subway("mysubway", { adcode: 4201,theme: "colorful",easy: 1 });
    
    },
     
    }
  }
</script>

<style scoped>

#app-container {
    width: 100%;
    position: relative;
  }

  #container {
    width: 100%;
    height: 100%;
  }

  
</style>