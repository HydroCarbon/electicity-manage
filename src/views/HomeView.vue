<template>
  <div class="app_container">
    <div class="common-layout">
      <el-container>
        <el-aside width="250px" class="aside">
          <Aside/>
        </el-aside>
        <el-container>
          <el-header class="header"></el-header>
          <el-main class="main">
            <router-view/>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";

export default {
  name: 'app',
  components: {Aside},
  setup() {

  },
}
</script>

<style scoped>
html,
body,
.app_container,
.el-container {
  padding: 0;
  margin: 0;
  height: 100vh;
}

.aside {
  background-color: #545c64;
}

.header {
  background-color: #545c64;
}
</style>
