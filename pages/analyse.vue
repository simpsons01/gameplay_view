<template>
  <div class="result container">
    <div class="result__title">
      {{ name }}
    </div>
    <div class="result__chart">
      <client-only>
        <line-chart
          v-if="searchResult.data.length > 0"
          :chart-data="datacollection"
        />
      </client-only>
    </div>
    <div class="result__text">
      <p class="result__text-date">
        從
        <span>
          {{ searchResult.firstDate }}
        </span>
        到
        <span>
          {{ searchResult.lastDate }}
        </span>
      </p>
      <div class="result__text-info">
        <table>
          <tbody>
            <tr>
              <td>平均交易價格</td>
              <td>{{ searchResult.averagePrice }} 元</td>
            </tr>
            <tr>
              <td>最高交易價格</td>
              <td>{{ searchResult.maxPrice }} 元</td>
            </tr>
            <tr>
              <td>最低交易價格</td>
              <td>{{ searchResult.minPrice }} 元</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'custom',
  middleware ({ store, redirect }) {
    if (store.state.searchResult.data.length === 0)
      return redirect('/')
  },
  components: {},
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState(['searchResult']),
    datacollection () {
      const labels = this.searchResult.data.map((item, index) => {
        return index + 1
      })
      const data = this.searchResult.data.map(item => item.price)
      return {
        labels,
        datasets: [
          {
            label: 'price',
            backgroundColor: 'rgba(232, 231, 231, 0.3)',
            borderColor: '#fff',
            data
          }
        ]
      }
    }
  },
  mounted () {
    this.name = this.$route.query.game_name
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

    &__text {
      margin-bottom: 25px;

      &-date {
        color: $secondary;

        > span {
          color: $white
        }
      }

      &-info {

        > table {
          border-collapse: collapse;
          width: 100%;

          tr {
           background: $secondary;

           &:nth-child(2n) {
             background: lighten($secondary, 20%)
           }

            > td {
              width: 50%;
              padding: $gutter * 4 $gutter * 3;
              color: $white;
              border-right: 1px solid darken($secondary, 10%);
              text-align: center;

              &:nth-child(2) {
                border: 0;
              }
            }
          }

        }
      }

    }
 }
</style>
