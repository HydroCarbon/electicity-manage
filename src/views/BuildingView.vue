<template>
  <el-row>
    <el-col :span="6">
      <el-button type="primary" @click="buildingSubmitDialog = true">
        新增楼栋
      </el-button>
      <el-button type="primary" @click="roomSubmitDialog = true">
        新增房间
      </el-button>

      <el-dialog v-model="roomSubmitDialog" title="新增房间" width="500" align-center>
        <span>
          <el-form :label-position="labelPosition" label-width="auto"
                   :model="roomForm" style="max-width: 600px">
            <el-form-item label="名称">
              <el-select v-model="roomForm.buildingId" placeholder="楼栋" clearable>
                <el-option
                    v-for="item in data"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="名称">
              <el-input v-model="roomForm.name"/>
              </el-form-item>
          </el-form>
        </span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="roomSubmitDialog = false">取消</el-button>
            <el-button type="primary" @click="submitRoom">
              保存
            </el-button>
          </div>
        </template>
      </el-dialog>

      <el-dialog
          v-model="buildingSubmitDialog"
          title="新增楼栋"
          width="500"
          align-center
      >
        <span>
          <el-form
              :label-position="labelPosition"
              label-width="auto"
              :model="buildingForm"
              style="max-width: 600px"
          >
    <el-form-item label="名称">
      <el-input v-model="buildingForm.name"/>
    </el-form-item>
  </el-form>
        </span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="buildingSubmitDialog = false">取消</el-button>
            <el-button type="primary" @click="submitBuilding">
              保存
            </el-button>
          </div>
        </template>
      </el-dialog>
      <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
      />
    </el-col>
    <el-col :span="18">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="username" label="用户名"/>
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="building" label="楼栋"/>
        <el-table-column prop="room" label="房间"/>
        <el-table-column prop="phone" label="手机号"/>
        <el-table-column prop="email" label="邮箱"/>
        <el-table-column prop="studentNo" label="学号"/>
      </el-table>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import http from "@/api/api";
import {onMounted, reactive, ref} from "vue";
import {ElMessage, FormProps} from "element-plus";

const buildingSubmitDialog = ref(false)

const roomSubmitDialog = ref(false)

interface Tree {
  label: string
  id: String
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  // 判断是否是叶子节点,叶子结点才有房间
  let buildingId: any;
  let roomId: any;
  if (data.children) {
    buildingId = data.id;
  } else {
    roomId = data.id;
  }

  http.get('/api/building/users', {
    params: {
      buildingId: buildingId,
      roomId: roomId
    }
  }).then(res => {
    tableData.splice(0, tableData.length);
    res.data.forEach((user: any) => {
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

function getBuildingTree() {
  http.get('/api/building/list').then(res => {
    // 清空 data
    data.splice(0, data.length);

    res.data.forEach((building: any) => {
      data.push({
        label: building.name,
        id: building.id,
        children: building.rooms.map((room: any) => {
          return {
            id: room.id,
            label: room.name,
          }
        })
      })
    })
  }).catch(err => {
    console.log(err);
  }).then(() => {
    // 默认选中第一个节点
    handleNodeClick(data[0]);
  })
}

onMounted(() => {
  getBuildingTree()
})

const data: Tree[] = reactive([])

const tableData = reactive([])

const defaultProps = {
  children: 'children',
  label: 'label',
}

function submitBuilding() {
  http.put('/api/building', {}, {
    params: {
      name: buildingForm.name
    }
  }).then(() => {
    buildingSubmitDialog.value = false;
    getBuildingTree();
    ElMessage.success('新增成功');
  }).catch(err => {
    console.log(err);
  })
}

function submitRoom() {
  http.put('/api/building/room', {
    name: roomForm.name,
    buildingId: roomForm.buildingId
  }).then(() => {
    roomSubmitDialog.value = false;
    getBuildingTree();
    ElMessage.success('新增成功');
  }).catch(err => {
    console.log(err);
  })
}

const labelPosition = ref<FormProps['labelPosition']>('right')

const buildingForm = reactive({
  name: '',
})

const roomForm = reactive({
  name: '',
  buildingId: ''
})
</script>
