<template>
  <div id="equipmentMap">
    <div id="mapContainer"></div>
    <div id="clickChangeBig" class="mapEnlarge el-icon-full-screen" @click="mapChangeBig()"></div>
    <big-map ref="refBigMap"></big-map>
    <!--  -->
    <span class="title">项目分布图</span>
  </div>
</template>

<script>
// 导入事件总线方便兄弟组件之间通信
import { eventBus } from '@ai-zen/event-bus'
import BigMap from "../child/BigMap.vue";
import { getItem } from "../../api/index";
export default {
  name: "EquipmentMap",
  data() {
    return {
      map: "",
      // 项目数据
      projectGroup: [],
      // 标点实例化数据
      markerGroup: []
    };
  },
  
  components: {
    BigMap,
  },
  async created() {
    const { data: res } = await this.$http.post(
      "http://192.168.111.7:8506/portal/project/query",
      { userCode: getItem("userData").userCode }
    );
    if (res.resultMessage === "Success") {
      this.projectGroup = res.data;
      console.log('1```',this.projectGroup)
    }
  },
  // 监听项目位置数据变化，做相应操作
  watch: {
    projectGroup() {
      this.$nextTick(() => {
        // 初始化标点
        this.initMarker();
      });
    },
  },
  mounted() {
    // 初始化地图
    this.init();
    // 加遮罩
    this.setMask();
  },
  methods: {
    // 初始化地图
    init() {
      this.map = new AMap.Map("mapContainer", {
        //缩放级别
        zoom: 3.4,
        //默认中心点
        //center:[116.364495,39.930694],
        center: [114.058345, 34.84321],
        //关闭拖拽平移
        dragEnable: false,
        //关闭缩放
        zoomEnable: false,
        //设置地图背景图
        mapStyle: "amap://styles/bb1743a4fd47c8c1f1242794e15bc373",
      });
    },
    // 给地图加遮罩，使其只显示中国地图
    setMask() {
      // 拷贝this，便于回调函数访问map
      let copyThis = this;
      console.log(this)
      //设置遮罩层
      new AMap.DistrictSearch({
        //返回完整行政区边界坐标点
        extensions: "all",
        //不返回下级行政区划
        subdistrict: 0,
      }).search("中国", function (status, result) {
        // 外多边形坐标数组和内多边形坐标数组
        var outer = [
          new AMap.LngLat(-360, 90, true),
          new AMap.LngLat(-360, -90, true),
          new AMap.LngLat(360, -90, true),
          new AMap.LngLat(360, 90, true),
        ];
        //取返回的第一个区域对象
        var resultDistrict = result.districtList[0];
        //获取区域边界坐标点集合
        var holes = resultDistrict.boundaries;
        //定位底层地图的中心点
        copyThis.map.setCenter(resultDistrict.center);
        var pathArray = [outer];
        pathArray.push.apply(pathArray, holes);
        var polygon = new AMap.Polygon({
          //设置遮罩应用地图对象
          map: copyThis.map,
          //设置遮罩范围
          path: pathArray,
          //线条颜色
          strokeColor: "rgb(20,164,173)",
          //线条宽度 单位像素
          strokeWeight: 5,
          //轮廓线透明度，取值范围[0,1]
          strokeOpacity: 0.1,
          //多边形填充颜色
          fillColor: "#1c1f30",
          //多边形填充透明度，取值范围[0,1]
          fillOpacity: 1,
          //轮廓线样式，实线:solid，虚线:dashed
          strokeStyle: "solid",
          /*勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在    
              ie9+浏览器有效 取值： 
              实线：[0,0,0] 
              虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
              点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实 
              线和10个像素的空白 （如此反复）组成的虚线*/
          strokeDasharray: [10, 2, 10],
        });
      });
    },

    // 初始化地图标点
    initMarker() {
      for(let i = 0; i < this.projectGroup.length; i++) {
        console.log(typeof(this.projectGroup[i].longitude))
        if(typeof(this.projectGroup[i].longitude) && typeof(this.projectGroup[i].latitude) !== "undefined"){
          console.log(i)
          let cache = {};
        cache.marker = new AMap.Marker({
          icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          position: [this.projectGroup[i].longitude, this.projectGroup[i].latitude],
          offset: new AMap.Pixel(-13, -30),
        });
        cache.projectCode = this.projectGroup[i].projectCode;
        this.markerGroup.push(cache)
        }
        
      }
      // 将所有点标记到地图上
      this.markerClick(this.markerGroup);
    },

    // 地图标点 点击事件
    markerClick(markerGroup) {
      for(let i = 0; i < markerGroup.length; i++) {
        this.map.add(markerGroup[i].marker);
        AMap.event.addListener(markerGroup[i].marker, "click", async function () {
          const { data: res } = await this.$http.post(
            "http://192.168.111.7:8506/portal/project/query",
            {
              userCode: getItem("userData").userCode,
              projectCode: markerGroup[i].projectCode,
            }
          );
          if (res.resultMessage === "Success") {
            console.log("click", res.data);
            document.getElementsByClassName("text")[0].innerHTML = "当前项目";
            document.getElementsByClassName("number")[0].style.fontSize =
              "14px";
            document.getElementsByClassName("number")[0].innerHTML =
              res.data[0].projectName;
          }
          const { data: resEquip } = await this.$http.post(
            "http://192.168.111.7:8506/portal/equipment/query",
            {
              userCode: getItem("userData").userCode,
              projectCode: markerGroup[i].projectCode,
            }
          );
          if(resEquip.resultMessage === "Success") {
            document.getElementsByClassName("number")[1].innerHTML = resEquip.data.length;
            eventBus.emit('send', resEquip.data)
          }else {
          }
      });
      }
    },
    // 显示大图点击事件
    mapChangeBig() {
      // 触发BigMap子组件获取项目信息的方法
      this.$refs.refBigMap.getProjectInfo();
      document.getElementById("mapBigger").style.display = "block";
      document.getElementsByClassName("shadowWrap")[0].style.display = "block";
    },
    updataIcon(data) {
      // console.log("updata",)
      this.markerGroup.forEach(item => {
        if(data.projectCode == item.projectCode) {
          item.marker.setIcon('//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png')
        }
      })
      
    }
  },
};
</script>

<style scoped>
/* 引入地图独立样式 */
/* @import '../../assets/css/map.css'; */
#equipmentMap {
  height: 100%;
  position: relative;
  border: 1px solid #1C1F30;
  box-sizing: border-box;
  border-radius: 4px;
}
#mapContainer {
  height: 100%;
  background-color: #1c1f30;
}
.mapEnlarge {
  width: 22px;
  height: 22px;
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 24px;
  color: #555C7E;
}
.title {
  position: absolute;
  left: 17px;
  top: 18px;
  font-size: 18px;
  line-height: 16px;
  width: 95px;
  height: 19px;
  font-weight: 600;
}


</style>