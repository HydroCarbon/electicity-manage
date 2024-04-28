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
</template>

<script lang="ts" setup>
import router from '@/router';
import {ArrowDown} from '@element-plus/icons-vue'
import {ref} from "vue";

const showChangePasswordDialog = ref(false)

const logout = () => {
  localStorage.removeItem('token')
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
