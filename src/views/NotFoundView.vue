<script setup>

</script>

<template>
  <div>
    <el-result
        icon="error"
        title="404 Not Found"
        sub-title="你找的页面走丢了"
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">回到首页</el-button>
      </template>
    </el-result>
  </div>
</template>

<style scoped>

</style>