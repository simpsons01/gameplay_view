
export const state = () => ({
  recommendResult: [],
  searchResult: [],
  searchHistory: [],
  isFirstLand: false
})

export const mutations = {
  setRecommendResult (state, payload) {
    state.recommendResult = payload
  },
  setSearchResult (state, payload) {
    state.searchResult = payload
  },
  setIsFisrtLand (state, payload) {
    state.isFirstLand = payload
  },
  setSearchHistory (state, payload) {
    state.searchHistory = payload
  }
}

export const actions = {
  async fetchRecommendResult ({ commit }, payload) {
    if (payload.text.trim().length < 1) return
    const result = await this.$axios.get(`${process.env.apiUrl}recommendResult?word=${payload.text}`)
    commit('setRecommendResult', result.data)
  },
  async fetchSearchResult ({ commit }, payload) {
    const result = await this.$axios.get(`${process.env.apiUrl}searchResult?word=${payload.text}`)
    commit('setSearchResult', result.data)
  },
  updateSearchHistory ({ commit }, payload = null) {
    const localStorageData = localStorage.getItem('searchHistory')
    const ary = localStorageData ? JSON.parse(localStorageData) : []
    if (payload && !ary.includes(payload)) ary.unshift(payload)
    if (ary.length > 10) ary.pop()
    localStorage.setItem('searchHistory', JSON.stringify(ary))
    commit('setSearchHistory', ary)
  }
}

export const getters = {

}
