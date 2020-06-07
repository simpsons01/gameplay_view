<template>
  <div class="error container">
    <p>沒有相關搜尋結果</p>
  </div>
</template>

<script>
export default {
  layout: 'custom'
}
</script>

<style lang="scss" scoped>
.error {

  > p {
     color: $white;
     font-size: $font-xl;
  }
}
</style>
