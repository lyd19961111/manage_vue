<template>
  <el-container style="height: 100%">
    <!-- 右侧导航栏 -->
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <!-- 头部和主内容 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <common-header></common-header>
      </el-header>
      <!-- 头部导航 -->
      <common-tab></common-tab>
      <!-- 主内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonHeader from '../components/CommonHeader.vue'
import CommonAside from '../components/CommonAside.vue'
import CommonTab from '../components/CommonTab.vue'
export default {
  components: {
    CommonHeader,
    CommonAside,
    CommonTab
  }
}
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>
