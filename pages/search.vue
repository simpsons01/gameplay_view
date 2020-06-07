<template>
  <div class="auto-complete">
    <div class="auto-complete__type">
      <span>
        <font-awesome-icon :icon="['fas', 'search']" />
      </span>
      <input
        ref="type-input"
        v-model.trim="inputData"
        type="text"
        @compositionstart="isLoading = true"
        @input="onInputTyping"
        @keydown.enter="onInputEnter"
      >
      <span
        v-show="isLoading"
        class="auto-complete__type-loading"
      >
        <spinner
          :size="15"
        />
      </span>
      <div class="auto-complete__type-warning">
        <span> waring text </span>
      </div>
    </div>
    <div
      class="auto-complete__result"
    >
      <ul>
        <li
          v-for="(name, index) in autoCompleteResult"
          :key="index"
          class="auto-complete__result-item"
          @click="getSearchResult(name)"
        >
          {{ name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Spinner from 'components/Spinner'
import debounce from 'lodash/debounce'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AutoComplete',
  layout: 'custom',
  components: {
    Spinner
  },
  data () {
    return {
      isLoading: false,
      inputData: ''
    }
  },
  computed: {
    ...mapState(['recommendResult', 'searchHistory', 'searchResult']),
    autoCompleteResult () {
      return this.inputData ? this.recommendResult : this.searchHistory
    }
  },
  mounted () {
    this.$refs['type-input'].focus()
  },
  methods: {
    ...mapActions(['fetchRecommendResult', 'fetchSearchResult', 'updateSearchHistory']),
    async getSearchResult (name) {
      this.$nuxt.$loading.start()
      await this.fetchSearchResult({ text: name })
      if (this.searchResult.length > 0) {
        this.updateSearchHistory(name)
        this.$router.push({ path: `/analyse/?game_name=${name}` })
        this.$nuxt.$loading.finish()
      } else {
        this.$nuxt.$loading.finish()
        this.$router.push({ path: '/error' })
      }
    },
    onInputTyping: debounce(async function () {
      await this.fetchRecommendResult({ text: this.inputData })
      this.isLoading = false
    }, 600),
    onInputEnter (e) {
      if (e.keyCode === 229 || !this.inputData) return
      if (this.recommendResult.length > 0) {
        this.$nuxt.$loading.start()
        setTimeout(() => {
          this.$nuxt.$loading.finish()
          this.$router.push({ path: `/results?query=${this.inputData}` })
        }, 500)
      } else
        this.getSearchResult()
    }
  }
}
</script>

<style lang="scss" scoped>
 .auto-complete {

   position: relative;

    &__type {
      width: 97%;
      margin: auto;
      height: 40px;
      overflow: hidden;
      padding: $gutter $gutter * 2;
      display: flex;
      align-items: center;
      border-bottom: 1px solid $white;

      &-loading {
        width: 15px;
        display: inline-block;
      }

      > span {
        width: 32px;
        text-align: center;
        line-height: 41px;
        display: inline-block;
        height: 100%;
        color: $white;
        margin-right: 2px
      }

      > input[type=text] {
         border: none;
         outline: none;
         flex-grow: 1;
         height: 100%;
         background-color: transparent;
         color: $white;
         margin-top: 8px
      }

      &-warning {
         position: absolute;
         display: none;
      }
    }

    &__result {
      height: calc(100vh - 54px);
      position: absolute;
      width: 100%;
      margin-top: $gutter;

      > ul {
        height: 100%;
      }

      &-item {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: $gutter * 2.5 $gutter * 4;
        margin-right: $gutter * 2;
        display: block;
        min-height: 40px;
        color: $white;
        position: relative;
       &::before {
         content: "";
         display: inline-block;
         width: 0;
         height: 0;
         border-style: solid;
         border-width: 5px 0 5px 10px;
         border-color: transparent transparent transparent $white;
         margin-right: $gutter * 1.5;
         transform: translateY(-1px);
       }
      }

    }
 }
</style>
