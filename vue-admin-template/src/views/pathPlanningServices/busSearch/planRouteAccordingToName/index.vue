<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>

    <div id="page" class="input-card">
      <label>公交路线规划</label>
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

    <div id="panel">
        
      
    </div>
    
  </div>
</template>

<script>

let transfer
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
      
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
          center: [116.397428, 39.90923],
          zoom: 13
        });
        
        let transOptions = {
          map:map,
          city: '武汉市',
          panel: 'panel',
          policy: AMap.TransferPolicy.LEAST_TIME //乘车策略
        };
        if (transfer) {
                //调用clear()函数清除上一次结果，可以清除地图上绘制的路线以及路径文本结果
                transfer.clear();
            }
        
         //构造公交换乘类
         transfer = new AMap.Transfer(transOptions);
        //根据起、终点名称查询公交换乘路线
        
        transfer.search([
          {keyword: this.origin,city:'武汉'},
          //第一个元素city缺省时取transOptions的city属性
          {keyword: this.destination,city:'武汉'}
          //第二个元素city缺省时取transOptions的cityd属性
        ], function(status, result) {
          //result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
          if (status === 'complete') {
            that.$message({
              message: '绘制公交路线完成',
              type: 'success',
              
            });
            
          } else {
            that.$message.error('公交路线数据查询失败' + result);
          }
          
        });
        
        
        
        

      },

    
      
      
      
    },

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
