<template>
  <div class="app-container" :style="{ height: windowHeight - 50 + 'px' }">
    <div id="container"></div>

    <div class="input-card" style="width: 18rem">
      <label style="color: grey">关键字查询</label>
      <div class="input-item">
        <el-input
          placeholder="请输入关键字名称"
          size="mini"
          v-model="place"
        >
          <template slot="prepend">关键字名称</template>
        </el-input>
      </div>
      <el-button round type="mini" style="width: 100%" @click="initAMap()"
        >查询</el-button
      >
    </div>

    <div id="panel"></div>
  </div>
</template>

<script>
let placeSearch
  export default {
    name: "index",
    data() {
      return {
        //实时屏幕高度
        windowHeight: document.documentElement.clientHeight,
        map: null,
        result: '',
        place:'武汉东湖学院',
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
        let map = new AMap.Map("container", {
          resizeEnable: true
        });

        if (placeSearch) {
                //调用clear()函数清除上一次结果，可以清除地图上绘制的路线以及路径文本结果
                placeSearch.clear();
            }
        //构造地点查询类
          placeSearch = new AMap.PlaceSearch({
          pageSize: 5, // 单页显示结果条数
          pageIndex: 1, // 页码
          // city: "010", // 兴趣点城市
          citylimit: true,  //是否强制限制在设置的城市内搜索
          map: map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search(this.place);
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
    position: absolute;
    background: white;
    padding: 10px;
    right: 30px;
    top: 160px;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    width: 340px;
  }

  .input-card {
  position: absolute;
  background-color: white;
  max-height: 90%;
  overflow-y: auto;
  top: 30px;
  right: 30px;
  
  padding: 10px;
}

.input-card .input-item {
  margin: 10px 0;
}

  /*//滚动条凹槽的颜色，还可以设置边框属性*/
  ::-webkit-scrollbar-track-piece {
    background-color: #f8f8f8;
  }

  /*滚动条的宽度*/
  ::-webkit-scrollbar {
    width: 9px;
    height: 6px;
  }

  /*滚动条的设置*/
  ::-webkit-scrollbar-thumb {
    background-color: #dddddd;
    background-clip: padding-box;
    min-height: 28px;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
  }

</style>
