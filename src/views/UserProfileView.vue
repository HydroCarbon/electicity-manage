<template>
  <div style="margin: 20px"/>
  <el-form
      :label-position="labelPosition"
      label-width="auto"
      :model="formLabelAlign"
      style="max-width: 600px"
  >
    <el-form-item label="姓名">
      <el-input v-model="formLabelAlign.name"/>
    </el-form-item>
    <el-form-item label="用户名">
      <el-input v-model="formLabelAlign.username"/>
    </el-form-item>
    <el-form-item label="房间">
      <el-select v-model="formLabelAlign.room" placeholder="请选择房间">
        <el-option
            v-for="item in buildingInfo"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="formLabelAlign.phone"/>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="formLabelAlign.email"/>
    </el-form-item>
    <el-form-item label="学号">
      <el-input v-model="formLabelAlign.studentNo"/>
    </el-form-item>
    <el-form-item label="角色">
      <el-input v-model="formLabelAlign.role"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="editInfo">
        修改
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import {ElMessage, FormProps} from 'element-plus'
import http from '@/api/api';

const labelPosition = ref<FormProps['labelPosition']>('left')

const buildingInfo = reactive([])

const formLabelAlign = reactive({
  name: '',
  username: '',
  room: '',
  phone: '',
  email: '',
  studentNo: '',
  role: ''
})

const editInfo = () => {
  const userId = localStorage.getItem('userId');
  http.post(`/api/user/${userId}/info`, {
    name: formLabelAlign.name,
    username: formLabelAlign.username,
    roomId: formLabelAlign.room,
    phone: formLabelAlign.phone,
    email: formLabelAlign.email,
    studentNo: formLabelAlign.studentNo,
    role: formLabelAlign.role
  }).then(res => {
    ElMessage.success('修改成功');
    console.log(res);
  }).catch(err => {
    console.log(err);
  })
}

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
  }).then(() => {
    const userId = localStorage.getItem('userId');
    http.get(`/api/user/${userId}/info`).then(res => {
      formLabelAlign.name = res.data.name;
      formLabelAlign.username = res.data.username;
      formLabelAlign.room = res.data.roomId;
      formLabelAlign.phone = res.data.phone;
      formLabelAlign.email = res.data.email;
      formLabelAlign.studentNo = res.data.studentNo;
      formLabelAlign.role = res.data.role;
    }).catch(err => {
      console.log(err);
    })
  })
})
</script>
