<template>
  <div class="tableContainer">
    <div class="title">
      <span class="titleName">设备类别列表</span>
      <span class="download el-icon-download"></span>
    </div>
    <div class="table" style="background-color: #1c1f30">
      <el-table
        :data="currentProjectEquip"
        :header-cell-style="headerCellStyle"
        :row-style="rowStyle"
        :cell-style="cellStyle"
        :row-class-name="tableRowClassName"
        :height="390"
      >
        <el-table-column prop="projectName" label="项目名称" width="200">
        </el-table-column>
        <el-table-column prop="equipmentName" label="设备名称" width="80">
        </el-table-column>
        <el-table-column prop="serial" label="传感器ID"> </el-table-column>
        <el-table-column prop="riskLevel" label="风险等级" sortable>
        </el-table-column>
        <el-table-column prop="installLocation" label="安装地址" width="210">
        </el-table-column>
        <el-table-column prop="installDate" label="安装时间" sortable>
        </el-table-column>
        <el-table-column prop="workingStatus" label="运行状态" sortable>
        </el-table-column>
        <el-table-column prop="validTime" label="到期时间" sortable>
        </el-table-column>
        <el-table-column prop="operation" width="50">
          <span class="toDetail">>></span>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// 导入事件总线方便兄弟组件之间通信
import { eventBus } from '@ai-zen/event-bus'
import {getItem} from '../../api/index'
export default {
  name: "EquipmentList",
  data() {
    return {
      // 当前项目的所有设备
      currentProjectEquip: [],
      //  所有行的样式对象
      rowStyle: {
        textAlign: "center",
        // background: "#1C1F30",
        color: "#D8D8D8",
      },
      // 所以单元格样式
      cellStyle: {
        textAlign: "center",
        border: 0,
      },
      // 表格头部样式
      headerCellStyle: {
        background: "#2F3349",
        color: "#fff",
        textAlign: "center",
      },
    };
  },
  async created() {
    // 初始化设备列表数据
    const {data: res} = await this.$http.post('http://192.168.111.7:8506/portal/equipment/query', {userCode: getItem("userData").userCode})
    if(res.resultMessage === "Success") {
      this.currentProjectEquip = res.data;
    }
  },
  
  mounted() {
    // 获取兄弟组件Map传递过来的当前项目的所有设备
    eventBus.on('send', data => {
      this.currentProjectEquip = data;
    });
  },
  methods: {
    // 控制表格单双行背景色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "even";
      }
      return "odd";
    },

    // 获取当前项目的设备
    getOneProjectEquip(e) {
      if (e.projectCode) {
        this.$http({
      method: "post",
      url: "http://192.168.111.7:8506/portal/equipment/query",
      data: { "userCode":getItem("userData").userCode,"projectCode": e.projectCode}
    }).then((res) => {
          let data = [];
          data = res.data.data;
          this.currentProjectEquip = data;
          console.log(this.currentProjectEquip);
          document.getElementsByClassName("text")[0].innerHTML = "当前项目";
          document.getElementsByClassName("number")[0].style.fontSize = "14px";
          document.getElementsByClassName("number")[0].innerHTML = e.projectName
         document.getElementsByClassName("number")[1].innerHTML = this.currentProjectEquip.length;
        });
      }
    },

    // 获取所有项目的设备
    getAllProjectEquip(projectGroup) {
      this.$http({
      method: "post",
      url: "http://192.168.111.7:8506/portal/equipment/query",
      data: {userCode: getItem("userData").userCode}
    }).then((res) => {
        let data = [];
        data = res.data.data;
        this.currentProjectEquip = data;
        document.getElementsByClassName("text")[0].innerHTML = "项目总数";
        document.getElementsByClassName("number")[0].innerHTML = projectGroup.length;
        document.getElementsByClassName("number")[0].style.fontSize = "34px";
        document.getElementsByClassName("number")[1].innerHTML = this.currentProjectEquip.length;

      });
    }
  },
};
</script>

<style lang="scss" scoped>
.tableContainer {
  position: relative;
  .title {
    position: relative;
    .titleName {
      position: absolute;
      left: 17px;
      top: 18px;
      font-weight: 700;
      font-size: 18px;
    }
    .download {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 22px;
      height: 22px;
      background-color: #1C1F30;
      font-size: 22px;
      color:#555c7e;
      cursor: pointer;
    }
  }
  .el-table {
    background-color: #1c1f30 !important;
  }
  .table {
    width: 100%;
    position: absolute;
    left: 2px;
    top: 60px;
    border-bottom: 0;
    .toDetail {
      width: 100px;
      height: 50px;
    }
  }
}
</style>