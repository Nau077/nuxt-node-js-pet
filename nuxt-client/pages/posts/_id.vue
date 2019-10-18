<template lang="pug">
 v-container
  v-layout(justify-center='' align-center='')
    .text-field
      h1 {{post.title}}
      h2 {{post.author}}
      p {{post.description}}
    <div v-html="post.tinyMce"></div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
  // data: () => ({
  //   id: null
  // }),
  // mounted() {
  //   this.id = this.$route.params.id
  // },
  computed: {
    // ...mapGetters({ posts: 'posts/posts' }),
    // post() {
    //   if (!this.posts) return null
    //   return this.posts.find((el) => el._id === this.id)
    // },
    tinyMce() {
      return JSON.parse(this.post.tinyMce)
    }
  },
  async asyncData({ $axios, params }) {
    const post = await $axios.$get(`/posts/post/${params.id}`)
    return { post }
  }
}
</script>
<style scoped>
.text-field {
  text-align: center;
}
.v-card {
  margin-bottom: 3.2rem;
}
.layout {
  max-width: 50rem;
  margin: auto;
  flex-wrap: wrap;
  flex-direction: column;
}
.v-input__slider {
  width: 100%;
}
</style>
