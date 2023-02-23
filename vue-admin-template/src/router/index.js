import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "首页",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: "/system",
    name: "system",
    redirect: "/system/role",
    component: Layout,
    meta: { title: "系统管理", icon: "link" },
    children: [
      {
        path: "role",
        component: () => import("@/views/system/role"), // Parent router-view
        name: "role",
        meta: { title: "角色管理", icon: "example" },
      },
      {
        path: "user",
        component: () => import("@/views/system/user"), // Parent router-view
        name: "user",
        meta: { title: "人员管理", icon: "example" },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
  {
    path: "/pathPlanning-services",
    component: Layout,
    redirect: "/pathPlanning-services/driving-route",
    name: "路线规划服务",
    meta: { title: "路线规划服务", icon: "nested" },
    children: [
      {
        path: "driving-route",
        component: () =>
          import("@/views/pathPlanningServices/drivingRoute/index"), // Parent router-view
        name: "驾车路线规划",
        meta: { title: "驾车路线规划", icon: "example" },
        children: [
          {
            path: "plan-route-according-to-lnglat",
            name: "位置经纬度 + 驾车规划路线",
            component: () =>
              import(
                "@/views/pathPlanningServices/drivingRoute/planRouteAccordingToLnglat"
              ),
            meta: { title: "位置经纬度 + 驾车规划路线", icon: "component" },
          },
          {
            path: "plan-route-according-to-name",
            name: "地点关键字 + 驾车路线规划",
            component: () =>
              import(
                "@/views/pathPlanningServices/drivingRoute/planRouteAccordingToName"
              ),
            meta: { title: "地点关键字 + 驾车路线规划", icon: "component" },
          },
        ],
      },

      {
        path: "walking-route",
        component: () =>
          import("@/views/pathPlanningServices/walkingRoute/index"), // Parent router-view
        name: "步行路线规划",
        meta: { title: "步行路线规划", icon: "example" },
        children: [
          {
            path: "plan-route-according-to-lnglat",
            name: "位置经纬度 + 步行路线规划",
            component: () =>
              import(
                "@/views/pathPlanningServices/walkingRoute/planRouteAccordingToLnglat"
              ),
            meta: { title: "位置经纬度 + 步行路线规划", icon: "component" },
          },
          {
            path: "plan-route-according-to-name",
            name: "地点关键字 + 步行路线规划",
            component: () =>
              import(
                "@/views/pathPlanningServices/walkingRoute/planRouteAccordingToName"
              ),
            meta: { title: "地点关键字 + 步行路线规划", icon: "component" },
          },
        ],
      },
      {
        path: "riding-route",
        component: () =>
          import("@/views/pathPlanningServices/ridingRoute/index"), // Parent router-view
        name: "骑行路径规划",
        meta: { title: "骑行路径规划", icon: "example" },
        children: [
          {
            path: "plan-route-according-to-lnglat",
            name: "位置经纬度 + 骑行路线规划",
            component: () =>
              import(
                "@/views/pathPlanningServices/ridingRoute/planRouteAccordingToLnglat"
              ),
            meta: { title: "位置经纬度 + 骑行路线规划", icon: "component" },
          },
          {
            path: "plan-route-according-to-name",
            name: "地点关键字 + 骑行路线规划",
            component: () =>
              import(
                "@/views/pathPlanningServices/ridingRoute/planRouteAccordingToName"
              ),
            meta: { title: "地点关键字 + 骑行路线规划", icon: "component" },
          },
        ],
      },
      {
        path: "bus-search",
        component: () => import("@/views/pathPlanningServices/busSearch/index"), // Parent router-view
        name: "公交路线规划",
        meta: { title: "公交路线规划", icon: "example" },
        children: [
          {
            path: "plan-route-according-to-lnglat",
            name: "位置经纬度 + 公交路线规划",
            component: () =>
              import(
                "@/views/pathPlanningServices/busSearch/planRouteAccordingToLnglat"
              ),
            meta: { title: "位置经纬度 + 公交路线规划", icon: "component" },
          },
          {
            path: "plan-route-according-to-name",
            name: "地点关键字 + 公交路线规划",
            component: () =>
              import(
                "@/views/pathPlanningServices/busSearch/planRouteAccordingToName"
              ),
            meta: { title: "地点关键字 + 公交路线规划", icon: "component" },
          },
        ],
      },

      {
        path: "/subwayRoute",
        component: () =>
          import("@/views/pathPlanningServices/subwayRoute/index"), // Parent router-view
        meta: { title: "地铁路线规划", icon: "example" },
        name: "地铁路线规划",
      },
    ],
  },

  {
    path: "/businfo",
    component: Layout,
    redirect: "/businfo/life-cycle",
    name: "公交信息查询",
    meta: {
      title: "公交信息查询",
      icon: "nested",
    },

    children: [
      {
        path: "search-bus-station",
        name: "公交站点查询",
        component: () => import("@/views/busInfo/searchBusStation"),
        meta: { title: "公交站点查询", icon: "component" },
      },
      {
        path: "search-bus-route",
        name: "公交线路查询",
        component: () => import("@/views/busInfo/searchBusRoute"),
        meta: { title: "公交线路查询", icon: "component" },
      },
      {
        path: "arrival-range",
        name: "公交到达圈",
        component: () => import("@/views/busInfo/arrivalRange"),
        meta: { title: "公交到达圈", icon: "component" },
      },
    ],
  },

  {
    path: "/layers",
    component: Layout,
    redirect: "/layers/layer-common",
    name: "图层",
    meta: { title: "图层", icon: "nested" },
    children: [
      {
        path: "layer-common",
        component: () => import("@/views/layers/layerCommon/index"), // Parent router-view
        name: "图层通用接口",
        meta: { title: "图层通用接口", icon: "example" },
        children: [
          {
            path: "layergroup",
            name: "批量修改图层",
            component: () => import("@/views/layers/layerCommon/layergroup"),
            meta: { title: "批量修改图层", icon: "component" },
          },
          {
            path: "layer-add-rm",
            name: "图层添加与移除",
            component: () => import("@/views/layers/layerCommon/layerAddRm"),
            meta: { title: "图层添加与移除", icon: "component" },
          },
          {
            path: "layer-zindex",
            name: "层级设定",
            component: () => import("@/views/layers/layerCommon/layerZindex"),
            meta: { title: "层级设定", icon: "component" },
          },
          {
            path: "layer-opacity",
            name: "图层透明度",
            component: () => import("@/views/layers/layerCommon/layerOpacity"),
            meta: { title: "图层透明度", icon: "component" },
          },
        ],
      },
      {
        path: "layers",
        component: () => import("@/views/layers/layers/index"), // Parent router-view
        name: "高德官方图层",
        meta: { title: "高德官方图层", icon: "example" },
        children: [
          {
            path: "layergroup",
            name: "默认标准图层",
            component: () => import("@/views/layers/layers/default"),
            meta: { title: "默认标准图层", icon: "component" },
          },
          {
            path: "trafffic",
            name: "实时路况图层",
            component: () => import("@/views/layers/layers/trafffic"),
            meta: { title: "实时路况图层", icon: "component" },
          },
          {
            path: "satellite",
            name: "卫星图",
            component: () => import("@/views/layers/layers/satellite"),
            meta: { title: "卫星图", icon: "component" },
          },
          {
            path: "roadnet",
            name: "卫星和路网",
            component: () => import("@/views/layers/layers/roadnet"),
            meta: { title: "卫星和路网", icon: "component" },
          },
          {
            path: "buildings",
            name: "楼块图层",
            component: () => import("@/views/layers/layers/buildings"),
            meta: { title: "楼块图层", icon: "component" },
          },
        ],
      },
      {
        path: "district",
        component: () => import("@/views/layers/district/index"), // Parent router-view
        name: "简易行政区图",
        meta: { title: "简易行政区图", icon: "example" },
        children: [
          {
            path: "district-labels",
            name: "简易行政区图+标注",
            component: () => import("@/views/layers/district/districtLabels"),
            meta: { title: "简易行政区图+标注", icon: "component" },
          },
          {
            path: "district-world",
            name: "简易行政区图-世界",
            component: () => import("@/views/layers/district/districtWorld"),
            meta: { title: "简易行政区图-世界", icon: "component" },
          },
          {
            path: "district-chn",
            name: "简易行政区图-中国",
            component: () => import("@/views/layers/district/districtChn"),
            meta: { title: "简易行政区图-中国", icon: "component" },
          },
          {
            path: "district-country",
            name: "简易行政区图-外国",
            component: () => import("@/views/layers/district/districtCountry"),
            meta: { title: "简易行政区图-外国", icon: "component" },
          },
          {
            path: "district-pro",
            name: "简易行政区图-省区",
            component: () => import("@/views/layers/district/districtPro"),
            meta: { title: "简易行政区图-省区", icon: "component" },
          },
          {
            path: "layer-switch",
            name: "图层切换",
            component: () => import("@/views/layers/district/layerSwitch"),
            meta: { title: "图层切换", icon: "component" },
          },
          {
            path: "districtPick",
            name: "行政区拾取+修改样式",
            component: () => import("@/views/layers/district/districtPick"),
            meta: { title: "行政区拾取+修改样式", icon: "component" },
          },
        ],
      },
      {
        path: "thirdlayer",
        component: () => import("@/views/layers/thirdlayer/index"), // Parent router-view
        name: "三方标准图层",
        meta: { title: "三方标准图层", icon: "example" },
        children: [
          {
            path: "terrain-mask",
            name: "卫星图+掩模",
            component: () => import("@/views/layers/thirdlayer/terrainMask"),
            meta: { title: "卫星图+掩模", icon: "component" },
          },
          {
            path: "wmts",
            name: "WMTS",
            component: () => import("@/views/layers/thirdlayer/wmts"),
            meta: { title: "WMTS", icon: "component" },
          },
          {
            path: "custom-grid-map",
            name: "XYZ栅格图层",
            component: () => import("@/views/layers/thirdlayer/customGridMap"),
            meta: { title: "XYZ栅格图层", icon: "component" },
          },
          {
            path: "functile",
            name: "函数加载栅格图",
            component: () => import("@/views/layers/thirdlayer/functile"),
            meta: { title: "函数加载栅格图", icon: "component" },
          },
        ],
      },
      {
        path: "selflayer",
        component: () => import("@/views/layers/selflayer/index"), // Parent router-view
        name: "自有数据图层",
        meta: { title: "自有数据图层", icon: "example" },
        children: [
          {
            path: "imagelayer",
            name: "图片图层",
            component: () => import("@/views/layers/selflayer/imagelayer"),
            meta: { title: "图片图层", icon: "component" },
          },
          {
            path: "canvaslayer",
            name: "Canvas图层",
            component: () => import("@/views/layers/selflayer/canvaslayer"),
            meta: { title: "Canvas图层", icon: "component" },
          },
          {
            path: "heatmap",
            name: "热力图",
            component: () => import("@/views/layers/selflayer/heatmap"),
            meta: { title: "热力图", icon: "component" },
          },
          {
            path: "heatmap-3d",
            name: "3D 热力图",
            component: () => import("@/views/layers/selflayer/heatmap3d"),
            meta: { title: "3D 热力图", icon: "component" },
          },
          {
            path: "cus-svg",
            name: "自定义图层-SVG",
            component: () => import("@/views/layers/selflayer/cusSvg"),
            meta: { title: "自定义图层-SVG", icon: "component" },
          },
          {
            path: "glcustom-layer",
            name: "自定义图层-GLCustomLayer 结合 THREE",
            component: () => import("@/views/layers/selflayer/glcustomLayer"),
            meta: {
              title: "自定义图层-GLCustomLayer 结合 THREE",
              icon: "component",
            },
          },
          {
            path: "glcustomlayer-regl",
            name: "自定义图层-GLCustomLayer 结合 ReGL",
            component: () =>
              import("@/views/layers/selflayer/glcustomlayerRegl"),
            meta: {
              title: "自定义图层-GLCustomLayer 结合 ReGL",
              icon: "component",
            },
          },
          {
            path: "3dtileslayer",
            name: "3D Tiles 图层",
            component: () => import("@/views/layers/selflayer/3dtileslayer"),
            meta: { title: "3D Tiles 图层", icon: "component" },
          },
          {
            path: "custom-layer",
            name: "自定义图层-Canvas",
            component: () => import("@/views/layers/selflayer/customLayer"),
            meta: { title: "自定义图层-Canvas", icon: "component" },
          },
          {
            path: "flex-canvas",
            name: "Canvas作为切片",
            component: () => import("@/views/layers/selflayer/flexCanvas"),
            meta: { title: "Canvas作为切片", icon: "component" },
          },
          {
            path: "flex-img",
            name: "img作为切片",
            component: () => import("@/views/layers/selflayer/flexImg"),
            meta: { title: "img作为切片", icon: "component" },
          },
        ],
      },
      {
        path: "indoormap",
        component: () => import("@/views/layers/indoormap/index"), // Parent router-view
        name: "室内地图",
        meta: { title: "室内地图", icon: "example" },
        children: [
          {
            path: "indoormap",
            name: "默认室内图层",
            component: () => import("@/views/layers/indoormap/indoormap"),
            meta: { title: "默认室内图层", icon: "component" },
          },
        ],
      },
    ],
  },

  {
    path: "/search-services",
    component: Layout,
    redirect: "/search-services/searchServices",
    name: "搜索服务",
    meta: { title: "搜索服务", icon: "nested" },
    children: [
      {
        path: "input",
        component: () => import("@/views/searchServices/input/index"), // Parent router-view
        name: "输入提示",
        meta: { title: "输入提示", icon: "example" },
        children: [
          {
            path: "get-input-data",
            name: "获取输入提示数据",
            component: () =>
              import("@/views/searchServices/input/getInputData"),
            meta: { title: "获取输入提示数据", icon: "component" },
          },
          {
            path: "input-prompt",
            name: "输入提示",
            component: () => import("@/views/searchServices/input/inputPrompt"),
            meta: { title: "输入提示", icon: "component" },
          },
        ],
      },
      {
        path: "poi-search",
        component: () => import("@/views/searchServices/poiSearch/index"), // Parent router-view
        name: "POI搜索",
        meta: { title: "POI搜索", icon: "example" },
        children: [
          {
            path: "get-search-data",
            name: "获取输入提示数据",
            component: () =>
              import("@/views/searchServices/poiSearch/getSearchData"),
            meta: { title: "获取输入提示数据", icon: "component" },
          },
          {
            path: "keywords-search",
            name: "关键字搜索",
            component: () =>
              import("@/views/searchServices/poiSearch/keywordsSearch"),
            meta: { title: "关键字搜索", icon: "component" },
          },

          {
            path: "around-search",
            name: "周边搜索",
            component: () =>
              import("@/views/searchServices/poiSearch/aroundSearch"),
            meta: { title: "周边搜索", icon: "component" },
          },

          {
            path: "search-after-enter-prompt",
            name: "输入提示后查询",
            component: () =>
              import("@/views/searchServices/poiSearch/searchAfterEnterPrompt"),
            meta: { title: "输入提示后查询", icon: "component" },
          },
        ],
      },
    ],
  },

  {
    path: "/other-lbs-services",
    component: Layout,
    redirect: "/other-lbs-services/geocoder",
    name: "其他LBS服务",
    meta: { title: "其他LBS服务", icon: "nested" },
    children: [
      {
        path: "geocoder",
        component: () => import("@/views/otherLbsServices/geocoder/index"), // Parent router-view
        name: "地理编码",
        meta: { title: "地理编码", icon: "example" },
        children: [
          {
            path: "geocoding",
            name: "地理编码（地址 -> 坐标）",
            component: () =>
              import("@/views/otherLbsServices/geocoder/geocoding"),
            meta: { title: "地理编码（地址 -> 坐标）", icon: "component" },
          },

          {
            path: "regeocoding",
            name: "逆地理编码（坐标 -> 地址）",
            component: () =>
              import("@/views/otherLbsServices/geocoder/regeocoding"),
            meta: { title: "逆地理编码（坐标 -> 地址）", icon: "component" },
          },
        ],
      },
      {
        path: "district-search",
        component: () =>
          import("@/views/otherLbsServices/districtSearch/index"), // Parent router-view
        name: "行政区划查询",
        meta: { title: "行政区划查询", icon: "example" },
        children: [
          {
            path: "draw-district-boundaries",
            name: "行政区边界查询",
            component: () =>
              import(
                "@/views/otherLbsServices/districtSearch/drawDistrictBoundaries"
              ),
            meta: { title: "行政区边界查询", icon: "component" },
          },
          {
            path: "city-drop-down-list",
            name: "下属行政区查询",
            component: () =>
              import(
                "@/views/otherLbsServices/districtSearch/cityDropDownList"
              ),
            meta: { title: "下属行政区查询", icon: "component" },
          },
        ],
      },
      {
        path: "grasp",
        component: () => import("@/views/otherLbsServices/grasp/index"), // Parent router-view
        name: "轨迹纠偏",
        meta: { title: "轨迹纠偏", icon: "example" },
        children: [
          {
            path: "grasp-driving",
            name: "驾车轨迹纠偏",
            component: () =>
              import("@/views/otherLbsServices/grasp/graspDriving"),
            meta: { title: "驾车轨迹纠偏", icon: "component" },
          },
        ],
      },

      {
        path: "location",
        component: () => import("@/views/otherLbsServices/location/index"), // Parent router-view
        name: "定位",
        meta: { title: "定位", icon: "example" },
        children: [
          {
            path: "get-city-name-by-ip-location",
            name: "IP城市定位",
            component: () =>
              import(
                "@/views/otherLbsServices/location/getCityNameByIpLocation"
              ),
            meta: { title: "IP城市定位", icon: "component" },
          },
          {
            path: "map-is-initially-loaded-into-the-current-city",
            name: "地图初始IP城市定位",
            component: () =>
              import(
                "@/views/otherLbsServices/location/mapIsInitiallyLoadedIntoTheCurrentCity"
              ),
            meta: { title: "地图初始IP城市定位", icon: "component" },
          },
          {
            path: "browser-location",
            name: "浏览器精确定位",
            component: () =>
              import("@/views/otherLbsServices/location/browserLocation"),
            meta: { title: "浏览器精确定位", icon: "component" },
          },
          {
            path: "custom-location-icon",
            name: "浏览器精确定位-定位点自定义",
            component: () =>
              import("@/views/otherLbsServices/location/customLocationIcon"),
            meta: { title: "浏览器精确定位-定位点自定义", icon: "component" },
          },
        ],
      },
      {
        path: "weather-forecast",
        component: () =>
          import("@/views/otherLbsServices/weatherForecast/index"), // Parent router-view
        name: "天气预报",
        meta: { title: "天气预报", icon: "example" },
        children: [
          {
            path: "weather-forecast",
            name: "IP城市定位",
            component: () =>
              import(
                "@/views/otherLbsServices/weatherForecast/weatherForecast"
              ),
            meta: { title: "IP城市定位", icon: "component" },
          },
        ],
      },
    ],
  },

  {
    path: "/auxiliary-interface",
    component: Layout,
    redirect: "/auxiliary-interfac/mouse-operate-map",
    name: "辅助接口",
    meta: { title: "辅助接口", icon: "nested" },
    children: [
      {
        path: "mouse-operate-map",
        component: () =>
          import("@/views/auxiliaryInterface/mouseOperateMap/index"), // Parent router-view
        name: "工具类",
        meta: { title: "工具类", icon: "example" },
        children: [
          {
            path: "mouse-draw-overlayers",
            name: "鼠标工具-绘制覆盖物",
            component: () =>
              import(
                "@/views/auxiliaryInterface/mouseOperateMap/mouseDrawOverlayers"
              ),
            meta: { title: "鼠标工具-绘制覆盖物", icon: "component" },
          },
          {
            path: "pull-box-enlarged-map",
            name: "鼠标工具-拉框缩放",
            component: () =>
              import(
                "@/views/auxiliaryInterface/mouseOperateMap/pullBoxEnlargedMap"
              ),
            meta: { title: "鼠标工具-拉框缩放", icon: "component" },
          },
          {
            path: "measure-area",
            name: "鼠标工具-距离面积测量",
            component: () =>
              import("@/views/auxiliaryInterface/mouseOperateMap/measureArea"),
            meta: { title: "鼠标工具-距离面积测量", icon: "component" },
          },
          {
            path: "measure-distance",
            name: "测距工具",
            component: () =>
              import(
                "@/views/auxiliaryInterface/mouseOperateMap/measureDistance"
              ),
            meta: { title: "测距工具", icon: "component" },
          },
        ],
      },

      {
        path: "calcutation",
        component: () =>
          import("@/views/geometricCalculation/calcutation/index"), // Parent router-view
        name: "距离/面积计算",
        meta: { title: "距离/面积计算", icon: "example" },
        children: [
          {
            path: "calculate-distance-between-two-markers",
            name: "两点间距离",
            component: () =>
              import(
                "@/views/geometricCalculation/calcutation/calculateDistanceBetweenTwoMarkers"
              ),
            meta: { title: "两点间距离", icon: "component" },
          },
          {
            path: "calcute-distance-from-marker-to-line",
            name: "点到线的距离",
            component: () =>
              import(
                "@/views/geometricCalculation/calcutation/calcuteDistanceFromMarkerToLine"
              ),
            meta: { title: "点到线的距离", icon: "component" },
          },
          {
            path: "path-length",
            name: "路径长度",
            component: () =>
              import("@/views/geometricCalculation/calcutation/pathLength"),
            meta: { title: "路径长度", icon: "component" },
          },
          {
            path: "ring-area",
            name: "区域面积",
            component: () =>
              import("@/views/geometricCalculation/calcutation/ringArea"),
            meta: { title: "区域面积", icon: "component" },
          },
        ],
      },
    ],
  },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
