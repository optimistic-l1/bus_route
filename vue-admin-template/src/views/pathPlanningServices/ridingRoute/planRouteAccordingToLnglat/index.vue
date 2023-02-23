<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>

    <div id="page" class="input-card">
      <label>驾车路线规划</label>
      <div class="input-item">
        <div class="input-item1">
          <el-input placeholder="请输入经度" size="mini" v-model="origin">
          <template slot="prepend">起点经度</template>
          </el-input>
          <el-input placeholder="请输入纬度" size="mini" v-model="origin1">
          <template slot="prepend">起点纬度</template>
          </el-input>
        </div>
     
      </div>
      <div class="input-item">
        <div class="input-item1">
        <el-input placeholder="请输入经度" size="mini" v-model="destination">
          <template slot="prepend">终点经度</template>
        </el-input>
        <el-input placeholder="请输入纬度" size="mini" v-model="destination1">
          <template slot="prepend">终点纬度</template>
        </el-input>
        </div>
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
        origin: '114.424376',
        origin1:'30.607375',
        destination:'114.316449',
        destination1:'30.530624'
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
          center: [114.424376,30.607375],//地图中心点
          zoom: 13 //地图显示的缩放级别
        });

        if (riding) {
                //调用clear()函数清除上一次结果，可以清除地图上绘制的路线以及路径文本结果
                riding.clear();
            }

        //骑行导航
        riding = new AMap.Riding({
          map: map,
          panel: "panel"
        });
        //根据起终点坐标规划骑行路线
        riding.search([this.origin,this.origin1], [this.destination,this.destination1], function (status, result) {
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
    top: 220px;
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
