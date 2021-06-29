<template>
  <div>
      <div class="left">
        <div class="title">实时监控概览</div>
        <div class="descripe">
          <div class="projectName">项目: <span>{{monitorData.projectName}}</span></div>
          <div class="equipName">设备: <span>{{monitorData.equipName}}</span></div>
          <div class="probeName">传感器: <span>{{monitorData.probeCode}}</span></div>
          <div class="workState">运行状态: <span>{{monitorData.workState}}</span></div>
        </div>
        <div class="image">
          <img src="../../../public/monitor.jpg" alt="">
        </div>
      </div>
      <div class="right">
        <div class="board"></div>
        <span class="rightIcon el-icon-arrow-right"></span>
        <span class="health">健康</span>
        <span class="overrun">超限</span>
      </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: "MonitorOverview",
    data() {
      return {
        // 监控概览数据
        monitorData: {},
        // 仪表盘设置数据
        boardData: {}
      }
    },
    created() {
      this.monitorData = {
        projectName: "洛阳项目",
        equipName: "1号塔吊",
        probeCode: "00010001",
        workState: "上行",
      };
      this.boardData = {
  series: [{
    name: "Indicator",
    type: "gauge",
    axisLabel:false,
    detail: {
      formatter: "{value}"
    },
    splitLine:{
             show:false,
         },
    data: [{value: 50,
            detail: {
              show: false
            }}],
    center: ["50%", "55%"],
    radius: "100%",
    startAngle: 180,
    splitNumber:10,
    endAngle: 0,
    clockwise: true,
    axisLine: {
      show: true,
      lineStyle: {
        color:[
            [1,new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0.1,
                color: "#41c987"
              },
              {
                offset: 0.6,
                color: "#f8d241"
              },
              {
                offset: 1,
                color: "#f55437"
              }
            ])
          ]
        ],
        width: 35,
        
      }
    },
    pointer: {
          show:false,
          length: "80%",
          width: 10,
          offsetCenter: ['0', "-20"],
          itemStyle: {
            color: "#fff"
          }
        },
    progress: {
      show: false,
      width: true
    },
    axisTick: {
      show: false,
      splitNumber: 0,
      distance: 0
    },
    axisLabel: {
      show: false
    }
  }]
}

    },
    mounted() {
      this.boardEchart()
    },
    methods: {
      boardEchart() {
        let boardDiv = document.getElementsByClassName("board")[0];
        let boardEchartInit = echarts.init(boardDiv);
        this.boardData && boardEchartInit.setOption(this.boardData)
      }
    }
}
</script>

<style lang="scss" scoped>
  .left {
    height: 319px;
    width: 232px;
    border-right: 1px solid #393C51;
    box-sizing: border-box;
    position: relative;
    padding-left: 17px;
    padding-top: 18px;
    float: left;
    .title {
      font-size: 18px;
      line-height: 16px;
      font-weight: bold;
    }
    .descripe {
      margin-top: 23px;
      font-size: 14px;
      color:#FEFEFE;
    }
    .image {
      width: 185px;
      height: 168px;
      position: absolute;
      left: 26px;
      bottom: 12px;
    }
  }
  .right {
    width: 228px;
    float: left;
    position: relative;
    .board {
      height: 180px;
      width: 181px;
      position: absolute;
      top: 122px;
      right: 22px;
    }
    .health {
      position: absolute;
      left: 27px;
      top: 230px;
      color:#FEFEFE;
      font-size: 14px;
    }
    .overrun {
      position: absolute;
      right: 25px;
      color:#FEFEFE;
      top: 230px;
      font-size: 14px;
    }
    .rightIcon {
      position: absolute;
      top: 20px;
      right: 20px;
      color: #555c7e;
      font-size: 24px;
      cursor: pointer;
    }
  }
</style>