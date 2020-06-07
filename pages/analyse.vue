<template>
  <div class="result container">
    <div class="result__title">
      {{ name }}
    </div>
    <div class="result__chart">
      <client-only>
        <line-chart
          v-if="searchResult.length > 1"
          :chart-data="datacollection"
        />
      </client-only>
    </div>
    <div class="result__cards">
      <card
        v-for="(item, index) in sliceSearchResult"
        :key="index"
        :game-name="item.game_name"
        :price="item.price"
        :article-url="item.article_url"
        :author="item.author"
        :trade-way="item.trade_way"
        :region="item.region"
      />
    </div>
  </div>
</template>

<script>
import Card from 'components/Card'
import { mapState } from 'vuex'

export default {
  layout: 'custom',
  middleware ({ store, redirect }) {
    if (store.state.searchResult.length === 0)
      return redirect('/')
  },
  components: {
    Card
  },
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState(['searchResult']),
    datacollection () {
      const labels = this.searchResult.map((item, index) => {
        return index + 1
      })
      const data = this.searchResult.map(item => item.price)
      return {
        labels,
        datasets: [
          {
            label: 'price',
            borderColor: '#fff',
            data
          }
        ]
      }
    },
    sliceSearchResult () {
      return [...this.searchResult]
    }
  },
  mounted () {
    this.name = this.$route.query.game_name
  },
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
 .result {

   position: relative;
   margin-top: $gutter * 3;

    &__title {
       padding: 0 0 25px 0;
       text-align: center;
       font-size: $font-xl;
       color: $white;
    }

    &__chart {
      max-width: 600px;
      margin: 0 auto;
      margin-bottom: 20px;
    }

    &__cards {
      margin: 0 auto;

      /deep/ .card {
        border: 2px solid lighten($primary, 50%);
        margin-bottom: $gutter * 3;
      }
    }
 }
</style>
