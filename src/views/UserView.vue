<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="用户名">
      <el-input v-model="formInline.username" placeholder="用户名" clearable/>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="formInline.name" placeholder="姓名" clearable/>
    </el-form-item>
    <el-form-item label="学号">
      <el-input v-model="formInline.studentNo" placeholder="学号" clearable/>
    </el-form-item>
    <el-form-item label="房间">
      <el-select v-model="formInline.roomId" placeholder="房间" clearable>
        <el-option
            v-for="item in buildingInfo"
            :key="item.id"
            :label="item.name"
            :value="item.id"
        />
      </el-select>
    </el-form-item>
    <!--    <el-form-item label="时间范围">
          <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
          />
        </el-form-item>-->
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="username" label="用户名"/>
    <el-table-column prop="name" label="姓名"/>
    <el-table-column prop="building" label="楼栋"/>
    <el-table-column prop="room" label="房间"/>
    <el-table-column prop="phone" label="手机号"/>
    <el-table-column prop="email" label="邮箱"/>
    <el-table-column prop="studentNo" label="学号"/>
  </el-table>
  <el-pagination
      :page-size="formInline.pageSize"
      layout="prev, pager, next"
      :total="formInline.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>
</template>

<script lang="ts" setup>
import http from '@/api/api';
import {onMounted, reactive, ref} from 'vue'

const formInline = reactive({
  username: '',
  name: '',
  roomId: '',
  studentNo: '',
  date: '',

  pageSize: 10,
  total: 0,
})

/*const value1 = ref<[Date, Date]>([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])*/

const onSubmit = () => {
  search()
}

const tableData = reactive([])

const buildingInfo = reactive([])

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

function search() {
  http.get('/api/user/list', {
    params: {
      pageNo: 0,
      pageSize: 20,
      username: formInline.username,
      name: formInline.name,
      studentNo: formInline.studentNo,
    }
  }).then(res => {
    formInline.total = res.data.totalElements;
    // 清空表格数据
    tableData.splice(0, tableData.length);
    res.data.content.forEach((user: any) => {
      tableData.push({
        username: user.username,
        name: user.name,
        building: user.building,
        room: user.room,
        phone: user.phone,
        email: user.email,
        studentNo: user.studentNo,
      })
    })
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
  })

  search();
})
</script>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
