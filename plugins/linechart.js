import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

Vue.component('line-chart', {
  name: 'LineChart',
  extends: Line,
  mixins: [reactiveProp],
  data () {
    return {
      options: {
        elements: {
          point: {
            radius: 0
          }
        },
        responsive: true,
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            gridLines: {
              color: '#9D9D9D'
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 2000,
              fontColor: '#9D9D9D'
            }
          }]
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
})
