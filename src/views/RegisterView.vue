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
            <el-form-item label="用户名" required>
              <el-input v-model="loginForm.username" style="width: 240px" placeholder="请输入用户名"/>
            </el-form-item>
            <el-form-item label="密码" required>
              <el-input
                  v-model="loginForm.password"
                  style="width: 240px"
                  type="password"
                  placeholder="请输入密码"
                  show-password
              />
            </el-form-item>
            <el-form-item label="姓名" required>
              <el-input v-model="loginForm.name" style="width: 240px" placeholder="请输入姓名"/>
            </el-form-item>
            <el-form-item label="邮箱" required>
              <el-input v-model="loginForm.email" style="width: 240px" placeholder="请输入邮箱"/>
            </el-form-item>
            <el-form-item label="手机号" required>
              <el-input v-model="loginForm.phone" style="width: 240px" placeholder="请输入手机号"/>
            </el-form-item>
            <el-form-item label="房间" required>
              <el-select v-model="loginForm.roomId" placeholder="请选择房间">
                <el-option
                    v-for="item in buildingInfo"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="学号" required>
              <el-input v-model="loginForm.studentNo" style="width: 240px" placeholder="请输入学号"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">注册</el-button>
              <el-button @click="router.push('/login')">返回登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import http from "@/api/api.js";
import router from "@/router/index.js";

const buildingInfo = reactive([])

const registerSuccess = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  name: '',
  email: '',
  phone: '',
  roomId: '',
  studentNo: '',
})

onMounted(() => {
  http.get('/api/building/list').then(res => {
    res.data.forEach((building: any) => {
      const rooms = building.rooms;
      rooms.forEach((room: any) => {
        const name = building.name + '#' + room.name;
        buildingInfo.push({
          id: room.id,
          name: name,
        })
      })
    })
  }).catch(err => {
    console.log(err);
  })
})

function onSubmit() {
  http.post('/api/auth/register', loginForm).then(() => {
    window.location.href = '/login';
  }).catch(err => {
    console.log(err);
  });
}
</script>
