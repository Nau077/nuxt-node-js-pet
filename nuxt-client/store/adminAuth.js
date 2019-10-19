export const state = () => ({
  auth: {
    token: null,
    refreshToken: null,
    username: null,
    authRequire: false
  }
})

export const mutations = {
  setTokens(state, { accessToken, refreshToken }) {
    state.token = accessToken
    state.refreshToken = refreshToken
  }
}

export const actions = {
  async loginAdmin({ commit }, admin) {
    const tokens = await this.$axios.$post('/admins/login', admin)
    commit('setTokens', tokens)
  }
}

export const getters = {
  posts: (s) => s.posts
}
