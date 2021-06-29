<template>
  <div class="statusRootWrap">
    <div class="title">设备状态概览</div>
    <div class="pieRootWrap"></div>
    <ul class="stateText" v-show="statusTxtShow">
      <li>健康</li>
      <li>轻度</li>
      <li>中度</li>
      <li>重度</li>
      <li>超限</li>
    </ul>
    <span class="common health">{{riskLevel.healthLeval}}</span>
    <span class="common light">{{riskLevel.lightLeval}}</span>
    <span class="common middle">{{riskLevel.middleLeval}}</span>
    <span class="common hard">{{riskLevel.severeLeval}}</span>
    <span class="common overrun">{{riskLevel.overrunLeval}}</span>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {getItem} from "../../api/index"
export default {
  name: "StateOverview",
  data() {
    return {
      // 图表设置数据
      chartOption: {},
      // 状态文字(健康,轻度,中度,重度,超限)提示开关
      statusTxtShow: false,
      // 风险等级数据
      riskLevel: {},
      // 初始化图表的容器
      healthChart: ''

    };
  },
  async created() {
    let data = { userCode: getItem("userData").userCode };
    // 获取风险等级数据
    this.initPieData(data);
  },
  watch: {
    
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.pieEchart();
        this.statusTxtShow = true;
      }, 600);
    });
  },
  methods: {
    // 初始化环形图
    pieEchart() {
      let healthWrap = document.getElementsByClassName("pieRootWrap")[0];
      this.healthChart = echarts.init(healthWrap);
      // 获取容器初始化的数据
      this.chartOption = this.getchartOption(this.riskLevel);
      this.chartOption && this.healthChart.setOption(this.chartOption);
    },
    // 初始化环形图状态数据
    async initPieData(reqData) {
      let healthNum = 0;
      let lightNum = 0;
      let middleNum = 0;
      let severeNum = 0;
      let overrunNum = 0;
      const {data: res} = await this.$http.post('http://192.168.111.7:8506/portal/equipment/query', reqData)
      if(res.resultMessage === 'Success') {
        let data = res.data;
        data.forEach(item => {
          if(item.riskLevel == 0) {
            healthNum += 1;
          }else if(item.riskLevel == 1) {
            lightNum += 1;
          }else if(item.riskLevel == 2) {
            middleNum += 1;
          }else if(item.riskLevel == 3) {
            severeNum += 1;
          }else {
            overrunNum += 1;
          }
        });
        
        this.riskLevel.healthLeval = Math.round(((healthNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.lightLeval = Math.round(((lightNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.middleLeval = Math.round(((middleNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.severeLeval = Math.round(((severeNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.overrunLeval = Math.round(((overrunNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.healthNum = healthNum;
        this.riskLevel.lightNum = lightNum;
        this.riskLevel.middleNum = middleNum;
        this.riskLevel.severeNum = severeNum;
        this.riskLevel.overrunNum = overrunNum;
        this.riskLevel.length = data.length;
      }else {
        window.alert("获取设备状态数据失败！")
      }
    },
    // 获取单个项目的所有设备的状态数据
    async getOneProjectState(params) {
      let healthNum = 0;
      let lightNum = 0;
      let middleNum = 0;
      let severeNum = 0;
      let overrunNum = 0;
      const {data: res} = await this.$http.post('http://192.168.111.7:8506/portal/equipment/query', { userCode: getItem("userData").userCode, projectCode: params.projectCode})
      if(res.resultMessage == 'Success') {
        let data = res.data;
        if(res.data.length) {
          res.data.forEach(item => {
            console.log(healthNum)
          if(item.riskLevel == 0) {
            healthNum += 1;
          }else if(item.riskLevel == 1) {
            lightNum += 1;
          }else if(item.riskLevel == 2) {
            middleNum += 1;
          }else if(item.riskLevel == 3) {
            severeNum += 1;
          }else {
            overrunNum += 1;
          }
        });
        
        this.riskLevel.healthLeval = Math.round(((healthNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.lightLeval = Math.round(((lightNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.middleLeval = Math.round(((middleNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.severeLeval = Math.round(((severeNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.overrunLeval = Math.round(((overrunNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.healthNum = healthNum;
        this.riskLevel.lightNum = lightNum;
        this.riskLevel.middleNum = middleNum;
        this.riskLevel.severeNum = severeNum;
        this.riskLevel.overrunNum = overrunNum;
        this.riskLevel.length = data.length;
        this.chartOption = this.getchartOption(this.riskLevel)
        this.chartOption && this.healthChart.setOption(this.chartOption);
        console.log('one',this.riskLevel)
        } else {
        this.riskLevel.healthLeval = '0%';
        this.riskLevel.lightLeval = '0%';
        this.riskLevel.middleLeval = '0%';
        this.riskLevel.severeLeval = '0%';
        this.riskLevel.overrunLeval = '0%';
        this.chartOption.series.forEach(item => {
          item.name = '其他';
          item.data = [{ value: 0, itemStyle: {color: '#DAE1E9'}}];
        })
        this.chartOption && this.healthChart.setOption(this.chartOption);
      }
      }
    },
    // 获取所有项目的所有设备的状态数据
    async getAllProjectState(projectGroup) {
      let healthNum = 0;
      let lightNum = 0;
      let middleNum = 0;
      let severeNum = 0;
      let overrunNum = 0;
      const {data: res} = await this.$http.post('http://192.168.111.7:8506/portal/equipment/query', { userCode: getItem("userData").userCode})
      if(res.resultMessage === 'Success') {
        let data = res.data;
        data.forEach(item => {
          if(item.riskLevel == 0) {
            healthNum += 1;
          }else if(item.riskLevel == 1) {
            lightNum += 1;
          }else if(item.riskLevel == 2) {
            middleNum += 1;
          }else if(item.riskLevel == 3) {
            severeNum += 1;
          }else {
            overrunNum += 1;
          }
        });
        
        this.riskLevel.healthLeval = Math.round(((healthNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.lightLeval = Math.round(((lightNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.middleLeval = Math.round(((middleNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.severeLeval = Math.round(((severeNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.overrunLeval = Math.round(((overrunNum / data.length) * 10000)/100).toFixed(0) + '%';
        this.riskLevel.healthNum = healthNum;
        this.riskLevel.lightNum = lightNum;
        this.riskLevel.middleNum = middleNum;
        this.riskLevel.severeNum = severeNum;
        this.riskLevel.overrunNum = overrunNum;
        this.riskLevel.length = data.length;
      }
      this.chartOption = {};
      this.chartOption = this.getchartOption(this.riskLevel);
      this.chartOption && this.healthChart.setOption(this.chartOption);
    },
    // 获取图表容器数据的方法，返回的是一个对象，图表的options
    getchartOption(riskLevel) {
      return {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: riskLevel.healthNum > 0 ? '健康' : '其他',
            type: "pie",
            radius: ["75%", "90%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [{ value: riskLevel.healthNum, itemStyle: {color: '#35C78C'}}, { value: riskLevel.length - riskLevel.healthNum, itemStyle: {color: '#DAE1E9'}}],
            left: "-80%",
          },
          {
            name: riskLevel.lightNum > 0 ? "轻度" : "其他",
            type: "pie",
            radius: ["75%", "90%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            color: ["#35C78C", "red"],
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: riskLevel.lightNum > 0 ? [{ value: riskLevel.lightNum,itemStyle: {color: '#8bd26c'}}, { value: riskLevel.length - riskLevel.lightNum ,itemStyle: {color: '#DAE1E9'}}]
            :[{ value: riskLevel.length - riskLevel.lightNum ,itemStyle: {color: '#DAE1E9'}}],
            left: "-40%",
          },
          {
            name:riskLevel.lightNum > 0 ? "中度" : "其他",
            type: "pie",
            radius: ["75%", "90%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            color: ["#35C78C", "#DAE1E9"],
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: riskLevel.middleNum > 0 ? [{ value: riskLevel.middleNum,itemStyle: {color: '#f79f3d'} }, { value: riskLevel.length-riskLevel.middleNum,itemStyle: {color: '#DAE1E9'} }]:
            [{ value: riskLevel.length-riskLevel.middleNum,itemStyle: {color: '#DAE1E9'} }],
            left: "left",
          },
          {
            name: riskLevel.lightNum > 0 ? "重度" : "其他",
            type: "pie",
            radius: ["75%", "90%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            color: ["#35C78C", "#DAE1E9"],
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: riskLevel.severeNum>0?[{ value: riskLevel.severeNum,itemStyle: {color: '#f8de42'} }, { value: riskLevel.length-riskLevel.severeNum,itemStyle: {color: '#DAE1E9'} }]:
            [{ value: riskLevel.length-riskLevel.severeNum,itemStyle: {color: '#DAE1E9'} }],
            left: "40%",
          },
          {
            name: riskLevel.lightNum > 0 ? "超限" : "其他",
            type: "pie",
            radius: ["75%", "90%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            color: ["#35C78C", "#DAE1E9"],
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: riskLevel.overrunNum>0?[{ value: riskLevel.overrunNum,itemStyle: {color: '#f54b36'} }, { value: riskLevel.length-riskLevel.overrunNum,itemStyle: {color: '#DAE1E9'} }]:
            [{ value: riskLevel.length-riskLevel.overrunNum,itemStyle: {color: '#DAE1E9'} }],
            left: "80%",
          },
        ],
      };
    }
  },
};
</script>

<style lang="scss" scoped>
.statusRootWrap {
  position: relative;
  .title {
    position: absolute;
    left: 18px;
    top: 18px;
    width: 113px;
    height: 18px;
    font-size: 18px;
    line-height: 16px;
    font-weight: 600;
  }
  .pieRootWrap {
    width: 680px;
    height: 120px;
    position: absolute;
    left: 50%;
    top: 101px;
    transform: translateX(-50%);
    .commonStyle {
      width: 120px;
      height: 120px;
      float: left;
      margin-left: 20px;
    }
    .healthy {
      margin-left: 0;
    }
  }
  .stateText {
    position: absolute;
    left: 0;
    top: 232px;
    padding-left: 13px;
    li {
      float: left;
      margin-left: 64px;
      margin-right: 41px;
      font-size: 16px;
      font-weight: 500;
    }
  }
  .common {
    color:#E8E8E8;
    font-size: 24px;
    position: absolute;
     top: 147px;
  }
  .health {
   
    left: 69px;
  }
  .light {
    left: 210px;
  }
  .middle {
    left: 349px;
  }
  .hard {
    left: 489px;
  }
  .overrun {
    left: 624px;
  }
}
</style>
