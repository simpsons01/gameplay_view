<template>
  <div class="collapse-menu">
    <div
      class="collapse-menu__title"
      @click="isOpen = !isOpen"
    >
      <span>{{ title }}</span>
      <span
        v-text="isOpen ? '-' : '+'"
      />
    </div>
    <div
      v-show="isOpen"
      class="collapse-menu__content"
    >
      {{ content }}
    </div>
  </div>
</template>

<script>
import VueTypes from 'vue-types'

export default {
  name: 'CollapseMenu',
  props: {
    title: VueTypes.string.def(''),
    content: VueTypes.string.def('')
  },
  data () {
    return {
      isOpen: false
    }
  }
}
</script>

<style lang="scss" scoped>
 .collapse-menu {

   border: 1px solid lighten($secondary, 20%);
   margin-top: -1px;

   &__title {
     background-color: $secondary;
     color: $white;
     padding: $gutter * 4 $gutter * 3;
     display: flex;
     justify-content: space-between;
   }

   &__content {
     background-color: darken($secondary, 15%);
     color: $white;
     letter-spacing: 1.2;
     line-height: 1.7;
     padding: $gutter * 3;
   }
 }
</style>
