<template lang="pug">
 v-container
  v-layout(justify-center='' align-center='' v-if='post')
    .text-field
      h1 {{post.title}}
      h2 {{post.author}}
      p {{post.description}}
    <div v-html="post.tinyMce"></div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: (route) => ({
    ...route.params
  }),
  data: () => ({
    id: null
  }),
  mounted() {
    this.id = this.$route.params.id
    console.log(this.id)
  },
  computed: {
    ...mapGetters({ posts: 'posts/posts' }),
    post() {
      if (!this.posts) return null
      return this.posts.find((el) => el._id === this.id)
    },
    tinyMce() {
      return JSON.parse(this.post.tinyMce)
    }
  },
  methods: {
    clickme() {
      console.log(this.tinyMce)
    }
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
