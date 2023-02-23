<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>
    <div id="page" class="input-card">
      <label>骑行路线规划</label>
      <div class="input-item">
        <el-input placeholder="请输入线路名称" size="mini" v-model="origin">
          <template slot="prepend">起点名称</template>
        </el-input>
      </div>
      <div class="input-item">
        <el-input placeholder="请输入线路名称" size="mini" v-model="destination">
          <template slot="prepend">终点名称</template>
        </el-input>
      </div>
      <el-button round type="mini" style="width: 100%;" @click="initAMap()" >查询</el-button>
  
    </div>
    <div id="panel"></div>
  </div>
</template>

<script>
let riding
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        origin:'武汉东湖学院',
        destination:'武汉火车站',
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
        let that = this;
        let map = new AMap.Map("container", {
          resizeEnable: true,
          center: [116.397428, 39.90923],//地图中心点
          zoom: 13 //地图显示的缩放级别
        });

        if (riding) {
                //调用clear()函数清除上一次结果，可以清除地图上绘制的路线以及路径文本结果
                riding.clear();
            }

        //步行导航
        riding = new AMap.Riding({
          map: map,
          panel: "panel"
        });
        riding.search([
          {keyword: this.origin, city: '武汉'},
          {keyword: this.destination, city: '武汉'}
        ], function (status) {
          // result即是对应的骑行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_RidingResult
          if (status === 'complete') {
            that.$message({
              message: '绘制骑行路线完成',
              type: 'success'
            });
          } else {
            that.$message.error('骑行路线数据查询失败' + result);
          }
        });
      }
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

  #panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 160px;
    right: 20px;
    width: 280px;
  }
  #page {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 52px;
    right: 20px;
    width: 280px;
  }
</style>
