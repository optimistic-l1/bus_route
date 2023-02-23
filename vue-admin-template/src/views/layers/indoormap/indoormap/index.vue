<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>

    <div class="input-card" style="width: 18rem">
      <label style="color: grey">室内地图查询</label>
      <div class="input-item">
        <el-input
          placeholder="请输入地方经纬度"
          size="mini"
          v-model='center'
        >
          <template slot="prepend">经度</template>
        </el-input>

        <el-input
          placeholder="请输入地方经纬度"
          size="mini"
          v-model='center1'
        >
          <template slot="prepend">纬度</template>
        </el-input>

      </div>
      <el-button round type="mini" style="width: 100%" @click="initAMap()"
        >查询</el-button
      >
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
        map: null,
        meshes: [],
        center:'114.167026',
        center1:'30.61733',//114.356574,30.526436
      }
    },
    mounted() {
      // 当浏览器被重置大小时执行
      window.onresize = () => {
        return (() => {
          this.windowHeight = document.documentElement.clientHeight;
        })()
      };
      //调用地图初始化方法
      this.initAMap()
    },
    methods: {
      initAMap() {

        // if (indoorMap) {
        //         //调用clear()函数清除上一次结果，可以清除地图上绘制的路线以及路径文本结果
        //         indoorMap.clear();
        //     }
        let indoorMap = new AMap.IndoorMap();
        let map = new AMap.Map('container', {
          center:[this.center,this.center1],
          showIndoorMap:true, //显示地图自带的室内地图图层
          zoom:18
        });
        indoorMap.showIndoorMap('B0FFHF1JEF');
        map.on('indoor_create',function(){
          map.indoorMap.showIndoorMap('B0FFHF1JEF',5);
        })
      }
    }
  }
</script>

<style scoped>
  #app-container {
    width: 100%;
    position: relative
  }

  #container {
    width: 100%;
    height: 100%;
  }
  .input-card {
  position: absolute;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  bottom: 30px;
  right: 30px;
  padding: 10px;
}

.input-card .input-item {
  margin: 10px 0;
}
</style>
