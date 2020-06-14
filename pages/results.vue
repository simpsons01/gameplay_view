<template>
  <div class="results container">
    <div class="results__title">
      <p class="results__title-name">
        <span>搜尋</span>"{{ title }}"
      </p>
      <p class="results__title-total">
        有 <span>{{ recommendResult.length }}</span> 項搜尋結果
      </p>
    </div>
    <div class="results__items">
      <ul>
        <li
          v-for="(result, index) in recommendResult"
          :key="index"
          @click="searchGame(result)"
        >
          {{ result }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  middleware ({ store, redirect }) {
    if (store.state.recommendResult.length === 0)
      return redirect('/')
  },
  layout: 'custom',
  data () {
    return {
      title: ''
    }
  },
  computed: {
    ...mapState(['recommendResult', 'searchResult'])
  },
  mounted () {
    this.title = this.$route.query.query
  },
  methods: {
    ...mapActions(['fetchSearchResult', 'updateSearchHistory']),
    async searchGame (game) {
      this.$nuxt.$loading.start()
      await this.fetchSearchResult({ text: game })
      if (this.searchResult.data.length > 0) {
        this.updateSearchHistory(game)
        this.$router.push({ path: `/analyse/?game_name=${game}` })
        this.$nuxt.$loading.finish()
      } else {
        this.$nuxt.$loading.finish()
        this.$router.push({ path: '/error' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.results {

   &__title {
     color: $white;

     &-name {
       margin: $gutter * 5 0 $gutter * 3 0;
       font-size: $font-xl;

       > span {
         color: $secondary;
         margin-right: $gutter;
       }
     }

     &-total {
       margin: 0;
       font-size: $font-md;

       > span {
         font-size: $font-lg;
       }
     }
   }

   &__items {
     margin-top: $gutter * 4;

     > ul {
       width: 100%;

       > li {
         cursor: pointer;
         padding: $gutter * 5;
         text-align: center;
         background: $secondary;
         color: $white;
         margin-bottom: $gutter * 3;

       }
     }
   }
}

</style>
