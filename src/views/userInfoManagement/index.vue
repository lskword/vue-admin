<template>
  <div class="content_sign">
    <el-card class="box-card">
      <el-tabs :tab-position="tabPosition" style="height: 600px;">
        <el-tab-pane label="用户管理"><userInfo /></el-tab-pane>
        <el-tab-pane label="修改密码"><password /></el-tab-pane>
        <el-tab-pane label="合同签约"> <contract /></el-tab-pane>
        <el-tab-pane label="业务学习"> <vocationalStudy /></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import userInfo from './cmpl/userInfo';
import Password from './cmpl/password';
import Contract from './cmpl/contract';
import vocationalStudy from './cmpl/vocationalStudy';

export default {
  name: 'UserInfoManagement',
  components: {
    Password,
    userInfo,
    Contract,
    vocationalStudy
  },
  data() {
    return {
      tabPosition: 'left'
    }
  }
}
</script>

<style lang="scss" scoped>
  .content_sign{
    padding: 15px;


  }
</style>

