<template>
  <div>
    <div v-show="bigMapShow" id="mapBigger" class="mapBigger">
      <div id="bigMapContainer"></div>
      <div
        class="selectWrap"
        @mouseover="selectWrapOver()"
        @mouseleave="selectWrapLeave()"
      >
        <input
          @change="inputChange()"
          type="text"
          class="input"
          placeholder="请输入项目名称"
        />
        <img @click="findProjectOnMap()" class="img" src="../../../public/sousuo.svg" alt="" />
        <div class="itemWrap" style="display: none">
          <ul id="ulWrap" @click="selectItem($event)">
            <li v-for="item in projectGroup" :key="item">
              {{ item.projectName }}
            </li>
          </ul>
        </div>
      </div>
      <div @click="closeMap" class="closeMap">x</div>
    </div>
    <div class="shadowWrap"></div>
  </div>
</template>

<script>
import { getItem } from "../../api/index";
export default {
  name: "BigMap",
  data() {
    return {
      // 实例化地图
      map: "",
      // 地图开关
      bigMapShow: true,
      // 项目数据
      projectGroup: [],
    };
  },
  async created() {
    // let icon =
    //   "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png";
    // let position = [
    //   { positionX: "113.406315", positionY: "34.908775" },
    //   { positionX: "117.406315", positionY: "39.908775" },
    //   { positionX: "118.406315", positionY: "39.908775" },
    //   { positionX: "119.406315", positionY: "39.908775" },
    //   { positionX: "120.406315", positionY: "39.908775" },
    // ];
    // position.forEach((item) => {
    //   this.positionArray.push({
    //     icon: icon,
    //     position: [item.positionX, item.positionY],
    //   });
    // });
    // console.log(121)
    // const {data: res} = await this.$http.post("http://192.168.111.7:8506/portal/project/query",
    //   { userCode: getItem("userData").userCode })
    // if(res.resultMessage === "Success") {
    //   console.log("bigmap",data)
    // }
  },
  watch: {
    projectGroup() {
      this.$nextTick(() => {
        console.log("projectGroup1", this.projectGroup);
        this.init();
      });
    },
  },
  methods: {
    // 初始化地图
    init() {
      this.map = new AMap.Map("bigMapContainer", {
        //缩放级别
        zoom: 8,
        //默认中心点
        //center:[116.364495,39.930694],
        center: [113.663221, 34.7568711],
        //关闭拖拽平移
        // dragEnable: false,
        //关闭缩放
        // zoomEnable: false,
        //设置地图背景图
        mapStyle: "amap://styles/dcfcd281e36b08e2745aa060daab1b1b",
      });

      this.initMarker(this.map);
    },
    // 初始化地图标点
    initMarker(map) {
      // 拷贝this,便于回调函数访问
      var copyThis = this;
      let markerGroup = [];
      // 实例化所有的点标记
      // this.projectGroup.forEach(function (item) {
      //   let cache = {};
      //   cache.marker = new AMap.Marker({
      //     // map: that.map,
      //     icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
      //     position: [item.longitude, item.latitude],
      //     offset: new AMap.Pixel(-13, -30),
      //   });
      //   cache.projectCode = item.projectCode;
      //   markerGroup.push(cache);
      // });
      for(let i =0 ; i < this.projectGroup.length; i++) {
        let cache = {};
        if(typeof(this.projectGroup[i].longitude) && typeof(this.projectGroup[i].latitude) !== "undefined") {
          cache.marker = new AMap.Marker({
          // map: that.map,
          icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
          position: [this.projectGroup[i].longitude, this.projectGroup[i].latitude],
          offset: new AMap.Pixel(-13, -30),
        });
        cache.projectCode = this.projectGroup[i].projectCode;
        markerGroup.push(cache);
        }
        
      }
      // 将所有点标记到地图上
      this.markerClick(markerGroup, copyThis);
    },
    // 地图标点 点击事件
    markerClick(markerGroup, copyThis) {
      // markerGroup.forEach((item) => {
      //   that.map.add(item.marker);
      //   AMap.event.addListener(item.marker, "click", function () {
      //     //在指定位置打开信息窗体
      //     var infoWindow = new AMap.InfoWindow({
      //       isCustom: true, //使用自定义窗体
      //       content: that.createInfoWindow("window", "<h1>222</h1>"),
      //       offset: new AMap.Pixel(16, -45),
      //     });
      //     infoWindow.open(map, item.marker.getPosition());
      //   });
      // });
      for(let i = 0; i < markerGroup.length; i++) {
        this.map.add(markerGroup[i].marker);
        AMap.event.addListener(markerGroup[i].marker, "click", function () {
          //在指定位置打开信息窗体
          var infoWindow = new AMap.InfoWindow({
            isCustom: true, //使用自定义窗体
            content: copyThis.createInfoWindow("window", "<h1>222</h1>"),
            offset: new AMap.Pixel(16, -45),
          });
          infoWindow.open(markerGroup.marker.getPosition());
        });
      }
    },
    // 搜索框悬停事件
    selectWrapOver() {
      let itemWrap = document.getElementsByClassName("itemWrap")[0];
      itemWrap.style.display = "block";
    },
    // 搜索框离开事件
    selectWrapLeave() {
      let itemWrap = document.getElementsByClassName("itemWrap")[0];
      itemWrap.style.display = "none";
    },
    // 输入值改变时，更新下拉框列表数据
    inputChange() {
      let input = document.getElementsByClassName("input")[0];
      
    },
    // 将选择的项目名称填入搜索框
    selectItem(e) {
      let input = document.getElementsByClassName("input")[0];
      input.value = e.target.innerHTML;
    },
    // 关闭地图事件
    closeMap() {
      let divChild = document.getElementsByClassName("divChild");
      let divEquip = document.getElementsByClassName("divEquip");
      this.bigMapShow = !this.bigMapShow;
      divChild.forEach((item) => {
        item.style.display = "none";
      });
      divEquip.forEach((item) => {
        item.style.display = "none";
      });
      document.getElementsByClassName("shadowWrap")[0].style.display = "none";
    },

    // 请求项目信息
    async getProjectInfo() {
      // 发送请求获取项目信息
      const { data: res } = await this.$http.post(
        "http://192.168.111.7:8506/portal/project/query",
        { userCode: getItem("userData").userCode }
      );
      if (res.resultMessage === "Success") {
        this.initSearch(res.data);
      }
    },
    // 初始化搜索框数据
    initSearch(data) {
      this.projectGroup = [];
      data.forEach((item) => {
        this.projectGroup.push(item);
      });
    },
    
    createInfoWindow() {
      var info =
        '<el-menu class="el-menu-vertical-demo">' +
        '      <el-submenu index="1">' +
        "        <template #title>" +
        '          <i class="el-icon-location"></i>' +
        "          <span>导航一</span>" +
        "        </template>" +
        "        <el-menu-item-group>" +
        '          <el-menu-item index="1-1"' +
        "            ><button>选项一</button> <span>>></span></el-menu-item" +
        '          <el-menu-item index="1-2">选项2</el-menu-item>' +
        '          <el-menu-item index="1-3">选项3</el-menu-item>' +
        '          <el-menu-item index="1-4">选项3</el-menu-item>' +
        "        </el-menu-item-group>" +
        "    </el-menu>";
      return info;
    },

    findProjectOnMap() {
      console.log(1)
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/bigMap.css";
.mapBigger {
  width: 1000px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #000;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  padding-top: 4px;
  box-sizing: border-box;
}
#bigMapContainer {
  width: 1858px;
  height: 881px;
  background-color: #fff;
}
.selectWrap {
  position: absolute;
  left: 0;
  top: -152px;
  .input {
    width: 306px;
    height: 40px;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    left: 50px;
    top: 200px;
    border: 0;
    border-radius: 2px;
    padding-left: 12px;
    box-sizing: border-box;
    outline: none;
    color: #0099ff;
  }
  .itemWrap {
    width: 306px;
    height: 420px;
    background: rgba(0, 0, 0, 0.8);
    position: absolute;
    left: 50px;
    top: 240px;
    border-radius: 2px;
    color: #fff;
    li {
      height: 40px;
      width: 100px;
    }
  }
  .img {
    width: 19px;
    height: 19px;
    position: absolute;
    left: 327px;
    top: 211px;
  }
}
.closeMap {
  width: 30px;
  height: 30px;
  border: 2px solid #fff;
  box-sizing: border-box;
  border-radius: 2px;
  position: absolute;
  right: 40px;
  top: -26px;
  color: #fff;
  font-size: 17px;
  text-align: center;
}
.shadowWrap {
  width: 1920px;
  height: 1010px;
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: -25px;
  top: -110px;
  z-index: 99999;
  display: none;
}
</style>