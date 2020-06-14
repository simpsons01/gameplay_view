<template>
  <div>
    <div
      v-show="isMenuOpen"
      class="backdrop"
      @click="isMenuOpen = false"
    />
    <div class="backtoindex" @click="backToindex">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
      回首頁
    </div>
    <nuxt />
    <div
      class="tool"
      :class="{'rotate': isMenuOpen}"
      @click="isMenuOpen = !isMenuOpen"
    >
      <div
        class="tool__menu"
        :class="{'open': isMenuOpen}"
      >
        <button @click.stop="backToindex">
          回首頁
        </button>
        <button @click.stop="goToRule">
          關於本站
        </button>
      </div>
      <span
        :class="{'rotate': isMenuOpen}"
      >
        <font-awesome-icon :icon="['fas', 'cog']" />
      </span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Custom',
  data () {
    return {
      isMenuOpen: false
    }
  },
  watch: {
    isMenuOpen (newVal) {
      if (newVal)
        document.querySelector('body').classList.add('backdrop')
      else
        document.querySelector('body').classList.remove('backdrop')
    }
  },
  methods: {
    backToindex () {
      this.isMenuOpen = false
      this.$router.push({
        path: '/'
      })
    },
    goToRule () {
      this.isMenuOpen = false
      this.$router.push({
        path: '/about'
      })
    }
  }
}
</script>

<style lang="scss">
body.backdrop {
  height: 100vh;
  overflow: hidden;
}

.backdrop {
  overflow: hidden;

  &::before {
     content: "";
     display: block;
     width: 100%;
     height: 100%;
     background: black;
     opacity: 0.5;
     position: fixed;
     left: 0;
     top: 0;
     z-index: 1;
  }
}

</style>
<style lang="scss" scoped>

 .backtoindex {
  color: $white;
  margin-top: 20px;
  margin-left: 20px;
  color: $secondary
 }
 .tool {
   position: fixed;
   right: 10px;
   bottom: 30px;
   border-radius: 50%;
   line-height: 50px;
   width: 50px;
   height: 50px;
   text-align: center;
   background: $white;
   color: $secondary;
   font-size: $font-xl;
   z-index: 1;

   > span {
     display: block;
     transform-origin: 25px 24px;
     transition: .3s transform ease-in-out;

     &.rotate {
      transform:rotate(360deg);
     }
   }

   &__menu {
     position: absolute;
     padding: $gutter * 2;
     background: $white;
     left: 0;
     top: 10px;
     width: 150px;
     transform: translate(-100%, -100%);
     border-radius: $gutter;
     display: flex;
     flex-direction: column;
     justify-content: flex-start;
     align-items: flex-start;
     z-index:  2;
     opacity: 0;
     transition: .3s opacity ease-in-out;

     &.open {
       opacity: 1;
     }

     > button {
       font-size: $font-md;
       background: $white;

       &:first-child {
         margin-bottom: $gutter * 1.5;
       }
     }
   }
 }
</style>
