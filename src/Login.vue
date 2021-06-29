<template>
  <div class="loginWrap">
      <div class="formWrap">
        <div class="textLogin">
          <h2>用户登录</h2>
        </div>
        <div class="form"> 
          <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="userName">
          <el-input type="text" autocomplete="off" v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input type="password" autocomplete="off" v-model="ruleForm.passWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
        </div>
        
      </div>
      
  </div>
</template>

<script>
import {getItem, setItem} from './api/index'
export default {
  data() {
    return {
      ruleForm: {
          userName: "",
          passWord: "",
          accessToken: "",
          userData: {}
        },
      rules: {
        // 用户名校验规则
        userName: [
          { required: true, message: '请输入账户名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ],
        passWord: [
          { required: true, message: '请输入账户密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
          ]
      }
    }
  },
  created() {
    
  },
  mounted() {
    
  },
  methods: {
      submitForm(formName) {
      this.$refs[formName].validate( valid => {
        if(valid) {
          this.$http({method: "post", 
                      url: "http://192.168.111.7:8506/portal/user/login", 
                      data: {"userCode": this.ruleForm.userName, "userPassword": this.ruleForm.passWord}
        }).then(res => {
          console.log(res)
          if(res.status == 200) {
            this.ruleForm.userData = res.data.data;
            this.ruleForm.accessToken = res.headers.accesstoken;
            setItem("token", this.ruleForm.accessToken);
            setItem("userData", this.ruleForm.userData);
            this.$store.commit("getUserCode",this.ruleForm.userData)
            this.$router.push("/index/overview")
          }
          })
        }
      })
      }
    }
  }

</script>

<style lang="scss" scoped>
  .el-form-item {
    width: 370px;
    border-bottom: 1px solid #000;
  }
  .loginWrap {
    width: 1920px;
    height: 1080px;
    background: url('../public/bj.png');
  }
  .formWrap {
    width: 460px;
    height: 560px;
    background-color: #fff;
    top: 250px;
    right: 256px;
    position: absolute;
    .textLogin {
      width: 98px;
      position: absolute;
      left: 50%;
      top: 59px;
      transform: translateX(-50%);
    }
    .form {
      position: absolute;
      top: 198px;
      left: 50%;
      width: 370px;
      transform: translateX(-50%);
    }
  }
</style>