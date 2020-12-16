<template>
  <div>
    <el-button type="Info" @click="logout">Exit</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
