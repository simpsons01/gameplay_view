<template>
  <div class="card">
    <p class="card__link">
      <a :href="articleUrl" target="_blank">文章連結</a>
    </p>
    <p class="card__price">
      價錢：{{ price }}
    </p>
    <p class="card__region">
      地區：{{ region }}
    </p>
    <p class="card__authorandtype">
      <span>作者：{{ author }}</span>
    </p>
    <p class="card_tray">
      交易方式：{{ tradeWay }}
    </p>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'Card',
  props: {
    gameName: VueTypes.string.def(''),
    price: VueTypes.number.def(0),
    articleUrl: VueTypes.string.def(''),
    author: VueTypes.string.def(''),
    tradeWay: VueTypes.string.def(''),
    region: VueTypes.string.def('')
  }
}
</script>

<style lang="scss" scoped>
.card {
  color: $white;
  padding: $gutter * 3 $gutter * 5;
  background-color: $primary;

  > p + p {
    margin: 0;
    margin-top: $gutter * 2;
  }

  &__link {
    margin: 0;
     > a {
        color:#0080FF;
     }
  }

  &__authorandtype {
    display: flex;
    justify-content: space-between;
  }
}
</style>
