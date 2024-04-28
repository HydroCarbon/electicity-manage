<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
    <el-form-item label="时间范围">
      <el-date-picker
          v-model="formInline.timeRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="username" label="姓名"/>
    <el-table-column prop="building" label="楼栋"/>
    <el-table-column prop="room" label="房间"/>
    <el-table-column prop="cost" label="充值金额"/>
    <el-table-column prop="paymentTime" label="支付时间"/>
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small" @click.prevent="detail(scope.$index)">
          详情
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      :page-size="formInline.pageSize"
      layout="prev, pager, next"
      :total="formInline.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"/>

  <el-button type="primary" @click="addVisible = true">充值</el-button>

  <el-dialog
      v-model="addVisible"
      title="充值"
      width="500"
      align-center
  >
    <span>
      <el-form :label-position="labelPosition" label-width="auto"
               :model="recordForm" style="max-width: 600px">
            <el-form-item label="充值金额">
              <el-input v-model="recordForm.amount"/>
              </el-form-item>
          </el-form>
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRecord">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog
      v-model="detailVisible"
      title="用电记录详情"
      width="500"
      align-center
  >
    <span>
      <el-form :label-position="labelPosition" label-width="auto"
               :model="detailForm" style="max-width: 600px">
        <el-form-item label="姓名">
              <el-input v-model="detailForm.name" disabled/>
            </el-form-item>
            <el-form-item label="楼栋">
              <el-input v-model="detailForm.building" disabled/>
            </el-form-item>
            <el-form-item label="房间">
              <el-input v-model="detailForm.room" disabled/>
            </el-form-item>
        <el-form-item label="充值金额">
              <el-input v-model="detailForm.cost" disabled/>
            </el-form-item>
        <el-form-item label="充值时间">
              <el-input v-model="detailForm.paymentTime" disabled/>
            </el-form-item>
          </el-form>
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="detailVisible = false">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import http from '@/api/api';
import {onMounted, reactive, ref} from 'vue'
import {FormProps} from "element-plus";

const tableData = reactive([])

const buildingInfo = reactive([])

const addVisible = ref(false)

const detailVisible = ref(false)

const formInline = reactive({
  roomId: '',

  timeRange: [null,
    null
  ],

  pageNo: 0,
  pageSize: 10,
  total: 0,
})

const labelPosition = ref<FormProps['labelPosition']>('right')

const recordForm = reactive({
  roomId: '',
  amount: '',
})

const detailForm = reactive({
  name: '',
  building: '',
  room: '',
  cost: '',
  paymentTime: '',
})

const onSubmit = () => {
  search()
}

const handleSizeChange = (val: number) => {
  formInline.pageSize = val
  search()
}
const handleCurrentChange = (val: number) => {
  formInline.pageNo = val
  search()
}

function search() {
  http.get('/api/electricity/payment/list', {
    params: {
      pageNo: formInline.pageNo ? formInline.pageNo - 1 : 0,
      pageSize: formInline.pageSize ? formInline.pageSize : 10,
      roomId: formInline.roomId ? formInline.roomId : null,
      startTime: formInline.timeRange && formInline.timeRange[0] ? formInline.timeRange[0].toISOString() : null,
      endTime: formInline.timeRange && formInline.timeRange[1] ? formInline.timeRange[1].toISOString() : null,
    }
  }).then(res => {
    formInline.total = res.data.totalElements;
    // 清空表格数据
    tableData.splice(0, tableData.length);
    res.data.content.forEach((record: any) => {
      tableData.push({
        id: record.id,
        username: record.username,
        building: record.building,
        room: record.room,
        cost: record.cost,
        paymentTime: record.paymentTime,
      })
    })
  }).catch(err => {
    console.log(err);
  })
}

function submitRecord() {
  addVisible.value = false;
  http.put('/api/electricity/record/pay', {
    amount: recordForm.amount,
  }).then(res => {
    search();
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

const detail = (index: number) => {
  detailForm.name = tableData[index].username;
  detailForm.building = tableData[index].building;
  detailForm.room = tableData[index].room;
  detailForm.cost = tableData[index].cost;
  detailForm.paymentTime = tableData[index].paymentTime;
  detailVisible.value = true;
}
</script>

<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
