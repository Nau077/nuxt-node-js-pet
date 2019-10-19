export const state = () => ({
  auth: {
    token: null,
    refreshToken: null,
    username: null,
    authRequire: false
  }
})

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  }
}

export const actions = {
  async getPosts({ commit }) {
    const posts = await this.$axios.$get('/posts')
    commit('setPosts', posts)
  }
}

export const getters = {
  posts: (s) => s.posts
}
