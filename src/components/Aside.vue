<script setup>
</script>

<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      router
  >
    <el-menu-item index="/user">
      <el-icon>
        <document/>
      </el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="/building">
      <el-icon>
        <document/>
      </el-icon>
      <span>楼栋管理</span>
    </el-menu-item>
    <el-menu-item index="/electricity/record">
      <el-icon>
        <document/>
      </el-icon>
      <span>用电记录</span>
    </el-menu-item>
    <el-menu-item index="/payment/record">
      <el-icon>
        <document/>
      </el-icon>
      <span>缴费管理</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
</style>
