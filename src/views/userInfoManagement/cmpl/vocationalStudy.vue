<template>
  <div style="padding:0px 30px;">
    <h3 class="header">业务学习</h3>
    <div>
      <p v-for="(item, index) in 5" :key="index">操作手册.PDF <a :href="item" style="color: #1890ff">下载</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VocationalStudy'
}
</script>

<style scoped>

</style>
