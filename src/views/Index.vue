<template>
  <div>
    <el-container>
      <!-- 头部开始 -->
      <el-header height="70px">
        <el-row>
          <el-col :xs="9" :sm="10" :md="10" :lg="10" :xl="10">
            <div class="logo">
              <img src="../../public/lqlogo.svg" alt="">
            </div>
          </el-col>
          <el-col :xs="15" :sm="14" :md="14" :lg="14" :xl="14">
            <el-row class="navContainer">
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <div class="overview">
                  <router-link to="/index/overview" active-class="active">监控概览</router-link>
                </div>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <div class="detail">
                  <router-link to="/index/detail" active-class="active">实时详情</router-link>
                </div>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <div class="reportForm">
                  <router-link to="/index/report" active-class="active">统计报表</router-link>
                </div>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <div class="systermSetting">
                  <router-link to="/index/setting" active-class="active">系统设置</router-link>
                </div>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <div class="customerService">
                  <router-link to="/index/service" active-class="active">客户服务</router-link>
                </div>
              </el-col>
              <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
                <div @click="personFlag = !personFlag" class="personCount">
                  <img src="../../public/person.svg" alt="">
                </div>
                <div v-show="personFlag" class="personWrap">
                  <img src="../../public/head.svg" alt="">
                  <span>1</span>
                  <span>2</span>
                  <button @click="logOut()">退出登录</button>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <!-- 头部结束 -->

      <!-- 主体内容开始 -->
      <el-main style="background-color:#070A1D;">
        <router-view></router-view>
        <!-- <big-map></big-map> -->
      </el-main>
      <!-- 主体内容结束 -->
    </el-container>
  </div>
</template>

<script>
import BigMap from '../components/child/BigMap.vue'
export default {
  data() {
    return {
      personFlag: false
    }
  },
  components: {
    BigMap
  },
  methods: {
    // 打开个人中心
    openPerson() {

    },
    // 退出登录
    logOut() {
      window.sessionStorage.removeItem("token");
      this.$router.push('/login')
    }
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  margin: 0;
  padding: 0;
  background-color: #101324;
  color: white;
  box-sizing: border-box;
  border-bottom: 2px solid #394D65;
  .el-row {
    height: 100%;
    line-height: 70px;
    div {
      height: 100%;
    }
  }
  .personWrap {
    position: absolute;
    right: 0;
    top: 82px;
    width: 300px;
    height: 180px !important;
    background-color: red;
    z-index: 999;
    // display: none;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
.navContainer {
  text-align: right;
  font-size: 20px;
  .personCount {
    height: 68px;
    width: 6%;
    background-color:#203A53 ;
    position: absolute;
    right: 0;
  }
}
.logo {
    align-items: center;
    width: 378px;
    height: 34px;
    padding-top: 7px;
    padding-left: 36px;
    box-sizing: border-box;
    min-width: 100px;
}
.el-main {
  margin: 0;
  padding: 0;
}
.active {
  color: #0099FF;
  font-weight: bold;
}

</style>