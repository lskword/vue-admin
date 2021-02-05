<template>
  <div style="padding:0px 30px;">
    <h3 class="header">合同签约</h3>
    <div>
      <p>志愿者合同.PDF <a href="" style="color: #1890ff">下载</a></p>
      <el-button type="primary" @click="submitForm">确认签约</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contract',
  methods: {
    submitForm(done) {
      this.$confirm('确认签约？')
        .then(_ => {
          this.$message.success('签约成功')
        })
        .catch(_ => {});
    }
  }
}
</script>

<style scoped style="scss">

</style>
