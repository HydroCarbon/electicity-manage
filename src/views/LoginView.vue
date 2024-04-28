<template>
  <el-row class="min-h-screen bg-indigo-500">
    <el-col :span="16" class="flex items-center justify-center">
      <div>
        <div class="font-bold el-text--large">欢迎光临</div>
        <div>校园电力管理系统</div>
      </div>
    </el-col>

    <el-col :span="8" class="bg-light-50 flex items-center justify-center">
      <el-card>
        <div>
          <el-form
              label-width="auto"
              style="max-width: 600px"
          >
            <el-form-item label="用户名">
              <el-input v-model="loginForm.username" style="width: 240px" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                  v-model="loginForm.password"
                  style="width: 240px"
                  type="password"
                  placeholder="请输入密码"
                  show-password
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登录</el-button>
              <el-button @click="router.push('/register')">注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import {reactive, ref} from "vue";
import axios from "axios";
import http from "@/api/api.js";
import router from "@/router/index.js";

const loginForm = reactive({
  username: '',
  password: '',
})

function onSubmit() {
  http.post('/api/auth/login', loginForm).then(res => {
    console.log(res.data.token);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('userId', res.data.userId);
    window.location.href = '/';
  }).catch(err => {
    console.log(err);
  });
}
</script>
