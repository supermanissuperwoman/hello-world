<template>
  <div>
    <!-- 状态概览开始 -->
    <!-- <div class="showStateWrap"> -->
    <el-row class="showStateWrap">
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <div
          @mouseover="show = true"
          @mouseleave="show = false"
          class="projectAmount stateCommon"
        >
          <div class="icon">
            <img src="../../public/xiangmu.svg" alt="">
          </div>
          <span class="number">{{projectGroup.length}}</span>
          <span class="text">项目总数</span>
          <div @mouseleave="show = !show" class="projectDropDownBox">
            <el-collapse-transition>
              <div v-show="show">
                <div class="transitionBox">
                  <div>
                    <el-button
                      @click="selectALLClick(projectGroup)"
                      style="width: 75%"
                      type="primary"
                      >全部项目</el-button
                    >
                  </div>
                  <ul>
                    <li
                      @click="selectOneClick(item), setMarkRedColor(item)"
                      v-for="item in projectGroup"
                      :key="item"
                    >
                      {{ item.projectName }}
                    </li>
                  </ul>
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
      </el-col>
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
        <div class="equipementAmount stateCommon">
          <div class="icon">
            <img src="../../public/shebei.svg" alt="">
          </div>
          <span class="number">{{equipGroup.length}}</span>
          <span class="text">设备总数</span>
        </div></el-col
      >
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"
        ><div class="workingAmount stateCommon">
          <div class="icon">
            <img src="../../public/yunxing.svg" alt="">
          </div>
          <span class="number">0</span>
          <span class="text">运行数</span>
        </div></el-col
      >
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"
        ><div class="offlineAmount stateCommon">
          <div class="icon">
            <img src="../../public/lixian.svg" alt="">
          </div>
          <span class="number">0</span>
          <span class="text">离数数</span>
        </div></el-col
      >
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"
        ><div class="alarmAmount stateCommon">
          <div class="icon">
            <img src="../../public/baojing.svg" alt="">
          </div>
          <span class="number">0</span>
          <span class="text">报警数</span>
        </div></el-col
      >
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"
        ><div class="freeAmount stateCommon">
          <div class="icon">
            <img src="../../public/daiji.svg" alt="">
          </div>
          <span class="number">0</span>
          <span class="text">待机数</span>
        </div></el-col
      >
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"
        ><div class="faultAmount stateCommon">
          <div class="icon">
            <img src="../../public/guzhang.svg" alt="">
          </div>
          <span class="number">0</span>
          <span class="text">故障数</span>
        </div></el-col
      >
      <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3"
        ><div class="disableAmount stateCommon">
          <div class="icon">
            <img src="../../public/tingyong.svg" alt="">
          </div>
          <span class="number">0</span>
          <span class="text">停用数</span>
        </div></el-col
      >
    </el-row>
    <!-- </div> -->
    <!-- 状态概览结束 -->

    <!-- 中间区域开始 -->
    <div class="stateAndViewWrap">
      <el-row>
        <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="8">
          <div class="mapWrap stateAndViewCommon" id="map">
            <equipment-map ref="refMap"></equipment-map>
          </div>
        </el-col>
        <el-col :xs="11" :sm="11" :md="11" :lg="11" :xl="10">
          <div class="stateOverview stateAndViewCommon">
            <state-overview ref="refState"></state-overview>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <div class="monitorOverview stateAndViewCommon">
            <monitor-overview></monitor-overview>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 中间区域结束 -->

    <!-- 底部区域开始 -->
    <div>
      <el-row class="footerWrap">
        <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
          <div class="chart">
            <div id="lineChart">
              <line-chart></line-chart>
              
            </div>
            
          </div>
        </el-col>
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
          <div class="equipmentList" style="background-color:#1C1F30;">
            <equipment-list ref="refEquipList"></equipment-list>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 底部区域结束 -->
  </div>
</template>

<script>
import EquipmentMap from "../components/overview/Map.vue";
import StateOverview from "../components/overview/Status.vue";
import MonitorOverview from "../components/overview/Monitor.vue";
import LineChart from "../components/overview/LineChart.vue";
import EquipmentList from "../components/overview/EquipmentList.vue";
import { getItem, setItem } from "../api";
export default {
  name: "Overview",
  data() {
    return {
      msg: "hi",
      // 当前项目的名称
      currentProjectName: "项目总数",
      // 项目下拉框开关
      show: false,
      // 项目信息
      projectGroup: [],
      // 设备信息
      equipGroup: []
    };
  },
  components: {
    EquipmentMap,
    StateOverview,
    MonitorOverview,
    LineChart,
    EquipmentList,
  },
  async created() {
    // 发送请求获取项目信息
    const resProject = await this.$http.post(
      "http://192.168.111.7:8506/portal/project/query",
      { userCode: getItem("userData").userCode },
    );
    if(resProject.status === 200) {
      this.projectGroup = resProject.data.data;
    } 
    const resEquip = await this.$http.post('http://192.168.111.7:8506/portal/equipment/query',
    { "userCode":getItem("userData").userCode});
    if(resEquip.status === 200) {
      this.equipGroup = resEquip.data.data;
    }
  },
  mounted() {
  },
  methods: {
    // 单个项目选择点击事件
    selectOneClick(name) {
      this.show = false;
      // 执行EquipmentList子组件的获取当前项目设备的方法
      this.$refs.refEquipList.getOneProjectEquip(name);
      this.$refs.refState.getOneProjectState(name);
    },

    // 全部项目选择点击事件
    selectALLClick(projectGroup) {
      // 在这里请求数据设备信息传递给子组件
      this.show = false;
      // 执行EquipmentList子组件获取所有设备的方法
      this.$refs.refEquipList.getAllProjectEquip(projectGroup);
      this.$refs.refState.getAllProjectState(projectGroup);
    },

    // 单击单个项目地图上用颜色标注
    setMarkRedColor(data) {
      console.log("data",data);
      this.$refs.refMap.updataIcon(data)
    }
  },
};
</script>

<style  lang="scss" scoped>
// 状态概览样式开始
.showStateWrap {
  padding-top: 26px;
  padding-bottom: 24px;
  .projectDropDownBox {
    background-color: #494C59;
    position: absolute;
    left: 89px;
    top: 60px;
    z-index: 999;
    .el-button {
      margin-left: 20px;
    }
    .transitionBox {
      color: white;
      width: 200px;
      height: 200px;
      overflow: auto;
    }
  }
  .stateCommon {
    height: 60px;
    display: flex;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    
  }
  .icon {
    width: 54px;
    height: 54px;
  }
  .number {
    font-size: 34px;
    position: absolute;
    left: 155px;
    top: 4px;
    height: 28px;
    line-height: 28px;
    color: #adadad;
  }
  .text {
    font-size: 16px;
    color: #adadad;
    position: absolute;
    left: 153px;
    bottom: 0;
    font-weight: 400;
  }
}
// 状态概览样式结束

// 中间区域样式开始
.stateAndViewWrap {
  padding-left: 20px;
  padding-right: 20px;
  .stateAndViewCommon {
    height: 320px;
    background-color: #1c1f30;
    color: #fff;
    box-sizing: border-box;
    border: 1px solid #1C1F30;
    border-radius: 4px;
  }
  .stateOverview {
    margin-left: 20px;
    margin-right: 20px;
  }
}
// 中间区域样式结束

// 底部样式开始
.footerWrap {
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fff;

  .chart {
    height: 540px;
    box-sizing: border-box;
    background-color: #1c1f30;
  }
  .equipmentList {
    height: 540px;
    box-sizing: border-box;
    margin-left: 20px;
  }
}
// 底部样式结束
</style>