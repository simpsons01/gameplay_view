<template>
  <div>
    <div class="backtoindex" @click="backToindex">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
      回首頁
    </div>
    <nuxt />
  </div>
</template>

<script>

export default {
  name: 'Custom',
  methods: {
    backToindex () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .backtoindex {
  color: $white;
  margin-top: 20px;
  margin-left: 20px;
  color: $secondary
 }
</style>
