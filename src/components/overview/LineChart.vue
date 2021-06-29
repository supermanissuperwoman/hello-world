<template>
  <div class="lineMainWrap">
    <div class="top">
      <div class="lineRootWrapTop"></div>
      <div class="tabCutTop">
        <div class="perTop commonTop" :class="{activeStyle: isActiveTop}" @click="toValue()">平均损伤值(%)</div>
        <div class="numTop commonTop" :class="{activeStyle: !isActiveTop}" @click="toNum()">平均损伤个数(个)</div>
      </div>
      <span class="xNameTop">日期</span>
    </div>
    <div class="down">
      <div class="lineRootWrapDown"></div>
      <div class="tabCutDown">
        <div class="perDown commonDown" :class="{activeStyle: isActiveDown}" @click="toMileage()">平均运行里程(km)</div>
        <div class="numDown commonDown" :class="{activeStyle: !isActiveDown}" @click="toTime()">平均运行时间(h)</div>
      </div>
      <span class="xNameDown">日期</span>
    </div>
    <div class="changeBigger el-icon-full-screen"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
  data() {
    return {
      damageOption: {},
      workingOption: {},
      isActiveTop: true,
      isActiveDown: true
    };
  },
  created() {
    this.damageOption = {
      xAxis: {
        type: "category",
        data: [
          "6-2",
          "6-3",
          "6-4",
          "6-5",
          "6-6",
          "6-7",
          "6-8",
          "6-9",
          "6-10",
          "6-11",
          "6-12",
          "6-13",
          "6-14",
          "6-15",
          "6-16",
          "6-17",
          "6-18",
          "6-19",
          "6-20",
          "6-21",
          "6-22",
          "6-23",
          "6-24",
          "6-25",
          "6-26",
          "6-27",
          "6-28",
          "6-29",
          "6-30",
        ],
        axisLabel: { interval: 2 },
        nameLocation: "center",
      },
      yAxis: {
        type: "value",
        axisLabel: {
          interval: 5,
          formatter: "{value} %",
        },
        max: 30,
      },
      grid: {
        bottom: "38px",
      },
      series: [
        {
          data: [
            "11",
            "12",
            "14",
            "15",
            "16",
            "15",
            "14",
            "13",
            "12",
            "11",
            "10",
            "16",
            "15",
            "24",
            "26",
            "16",
            "18",
            "19",
            "21",
            "22",
            "23",
            "24",
            "12",
            "14",
            "18",
            "16",
            "16",
            "20",
            "10",
          ],
          type: "line",
          smooth: true,
          symbol: "emptyCircle",
          color: "#0089ff",
          areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0,137,255,0.3)'
                }, {
                    offset: 1,
                    color: 'rgba(28,31,48,0.3)'
                }])
            }
        },
      ],
    };
    this.workingOption = {
      xAxis: {
        type: "category",
        nameLocation: "end",
        data: [
          "6-2",
          "6-3",
          "6-4",
          "6-5",
          "6-6",
          "6-7",
          "6-8",
          "6-9",
          "6-10",
          "6-11",
          "6-12",
          "6-13",
          "6-14",
          "6-15",
          "6-16",
          "6-17",
          "6-18",
          "6-19",
          "6-20",
          "6-21",
          "6-22",
          "6-23",
          "6-24",
          "6-25",
          "6-26",
          "6-27",
          "6-28",
          "6-29",
          "6-30",
        ],
        axisLabel: { interval: 1 },
        nameLocation: "center",
      },
      yAxis: {
        type: "value",
        axisLabel: {
          interval: 5,
          formatter: "{value} km",
        },
        max: 50,
      },
      grid: {
        bottom: "38px"
      },
      series: [
        {
          data: [
            "11",
            "12",
            "14",
            "15",
            "16",
            "15",
            "14",
            "13",
            "12",
            "11",
            "10",
            "16",
            "15",
            "24",
            "26",
            "16",
            "18",
            "19",
            "21",
            "22",
            "23",
            "24",
            "12",
            "14",
            "18",
            "16",
            "16",
            "20",
            "10",
          ],
          type: "line",
          smooth: true,
          symbol: "none",
          color: "#00cfff",
          areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0,207,255,0.3)'
                }, {
                    offset: 1,
                    color: 'rgba(28,31,48,0.3)'
                }])
            }
        },
      ],
    };
  },
  mounted() {
    this.damageEchart();
    this.workingEchart();
  },
  methods: {
    // 初始化平均损失值和平均损失个数图表
    damageEchart() {
      let lineWrap = document.getElementsByClassName("lineRootWrapTop")[0];
      let lineChart = echarts.init(lineWrap);

      this.damageOption && lineChart.setOption(this.damageOption);
    },
    // 初始化平均运行里程和平均运行时间图表
    workingEchart() {
      let workingWrap = document.getElementsByClassName("lineRootWrapDown")[0];
      let workChart = echarts.init(workingWrap);
      this.workingOption && workChart.setOption(this.workingOption);
    },
    // 将图标切换到平均损伤值
    toValue() {
      this.isActiveTop = true;
    },
    // 将图标切换到平均损伤个数
    toNum() {
      this.isActiveTop = false;
    },
    // 将图标切换到平均运行里程
    toMileage() {
      this.isActiveDown = true;
    },
    //  将图标切换到平均运行时间
    toTime() {
      this.isActiveDown = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.lineMainWrap {
  position: relative;
  height: 540px;
  .lineRootWrapTop {
    height: 270px;
  }
  .down {
    position: relative;
    .lineRootWrapDown {
      height: 270px;
    }
    .tabCutDown {
      position: absolute;
      left: 0;
      top: 0;
      .perDown {
        float: left;
      }
      .numDown {
        border-top: 5px solid #1c1f30;
      }
      .commonDown {
        width: 153px;
        float: left;
        text-align: center;
        box-sizing: border-box;
        line-height: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
    .xNameDown {
      position: absolute;
      right: 25px;
      bottom: 19px;
      font-size: 12px;
    }
  }
  .top {
    position: relative;
    .tabCutTop {
      position: absolute;
      left: 0;
      top: 0;
      .perTop {
        border-top: 5px solid #1c1f30;
      }
      .numTop {
        border-top: 5px solid #1c1f30;
      }
      .commonTop {
        width: 153px;
        height: 30px;
        float: left;
        text-align: center;
        box-sizing: border-box;
        line-height: 30px;
        cursor: pointer;
      }
    }
    .xNameTop {
      position: absolute;
      right: 25px;
      bottom: 19px;
      font-size: 12px;
    }
  }
  .changeBigger {
    width: 22px;
  height: 22px;
  position: absolute;
  right: 20px;
  top: 20px;
  font-size: 24px;
  color: #555C7E;
  cursor: pointer;
  }
  .activeStyle {
    border-top: 5px solid #3158ff !important;
    color: #3158FF;
  }
}
</style>
