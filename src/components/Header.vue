<template>
  <el-row>
    <el-col :span='20'></el-col>
    <el-col :span='4' style="height: 100vh">
      <el-dropdown>
        <el-avatar :size="40"
                   src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
        <span class="el-dropdown-link">
      Dropdown List
      <el-icon class="el-icon--right">
        <arrow-down/>
      </el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/user/profile')">个人中心</el-dropdown-item>
            <el-dropdown-item @click="showChangePasswordDialog = true">修改密码</el-dropdown-item>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-col>
  </el-row>

  <el-dialog
      v-model="showChangePasswordDialog"
      title="添修改密码"
      width="500"
      align-center
  >
    <span>
      <el-form :label-position="labelPosition" label-width="auto"
               :model="passwordForm" style="max-width: 600px">
            <el-form-item label="密码">
              <el-input v-model="passwordForm.password"/>
            </el-form-item>
        <el-form-item label="确认密码">
              <el-input v-model="passwordForm.confirmPassword"/>
            </el-form-item>

          </el-form>
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showChangePasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="changePassword">
          修改
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import router from '@/router';
import {ArrowDown} from '@element-plus/icons-vue'
import {reactive, ref} from "vue";
import {ElMessage, FormProps} from "element-plus";
import http from '@/api/api';

const showChangePasswordDialog = ref(false)
const labelPosition = ref<FormProps['labelPosition']>('right')

const passwordForm = reactive({
  password: '',
  confirmPassword: ''
})

const changePassword = () => {
  if (passwordForm.password !== passwordForm.confirmPassword) {
    ElMessage.error('密码不匹配，请重新输入')
    return
  }

  const userId = localStorage.getItem('userId')
  http.post(`/api/user/${userId}/change-password`, {}, {
    params: {
      password: passwordForm.password
    }
  }).then(() => {
    ElMessage.success('修改成功，请重新登录')
    showChangePasswordDialog.value = false;
    logout()
  })

  passwordForm.password = ''
  passwordForm.confirmPassword = ''
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  router.push('/login')
}
</script>

<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
