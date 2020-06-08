<template>
  <div class="landing-page">
    <div
      class="landing-page__button"
      @click="startSearch"
    >
      <p
        class="landing-page__button-landing-text"
      >
        <span>
          {{ landingText }}
          <span
            class="typing-prefix"
          />
        </span>
      </p>
      <span
        class="landing-page__button-icon"
      >
        <font-awesome-icon :icon="['fas', 'search']" />
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

let timer

export default {
  layout: 'default',
  data () {
    return {
      landingText: '',
      textCount: 0,
      typingSpeed: 300,
      isFirstTextFinish: false,
      firstText: ['W', 'e', 'l', 'c', 'o', 'm', 'e'],
      secondText: ['S', 'e', 'a', 'r', 'c', 'h', ' ', 'F', 'u', 'n', ' ', 'G', 'a', 'm', 'e', '!']
    }
  },
  computed: {
    ...mapState(['isFirstLand'])
  },
  mounted () {
    if (!this.isFirstLand) {
      this.landingText = ''
      this.setIsFisrtLand(true)
      this.updateSearchHistory()
      this.initTypingAnimate()
    } else
      this.landingText = 'Search Fun Game'
  },
  methods: {
    ...mapActions(['updateSearchHistory']),
    ...mapMutations(['setIsFisrtLand']),
    startSearch () {
      clearInterval(timer)
      this.$router.push({ path: '/search' })
    },
    initTypingAnimate () {
      timer = setInterval(() => {
        if (this.textCount !== this.firstText.length &&
          this.firstText.length > 0 &&
          !this.isFirstTextFinish
        ) {
          this.landingText += this.firstText[this.textCount]
          this.textCount += 1
        } else if (this.textCount !== 0 && this.firstText.length > 0) {
          clearInterval(timer)
          this.initTypingAnimate()
          this.typingSpeed = 100
          this.isFirstTextFinish = true
          this.textCount -= 1
          this.firstText.splice(this.textCount, 1)
          this.landingText = this.firstText.join('')
        } else if (this.textCount !== this.secondText.length) {
          clearInterval(timer)
          this.initTypingAnimate()
          this.typingSpeed = 300
          this.landingText += this.secondText[this.textCount]
          this.textCount += 1
        } else
          clearInterval(timer)
      }, this.typingSpeed)
    }
  }
}
</script>

<style lang="scss" scoped>
.landing-page {

  height: 100vh;

  &__top-search {
    padding-top: 10px;
  }

  &__button {
    max-width: 500px;
    width: 80%;
    border-radius: 20px;
    height: 44px;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    border: 1px solid $secondary;
    background-color: $white;
    position: fixed;

    &-landing-text {
      display: inline-block;
      width: 100%;
      position: absolute;
      left: 0;
      top: -55px;
      font-size: 32px;
      text-align: center;
      color: #fff;
      margin: 0;

      > span {
        position: relative;
      }
    }

    &-icon {
      display: inline;
      content: "搜尋";
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.typing-prefix {
  position: absolute;
  right: -6px;
  display: inline-block;
  height: 38px;
  width: 4px;
  background-color: $primary;
  animation: typing-prefix .9s infinite
}

@keyframes typing-prefix {
  0% { background-color: $primary; }
  25% { background-color: $primary; }
  50% { background-color: $primary; }
  75% { background-color: $white; }
  100% { background-color: $white; }
}
</style>
