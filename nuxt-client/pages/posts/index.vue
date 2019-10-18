<template lang="pug">
 v-container
  v-layout(justify-center='' align-center='')
    v-flex(v-for='(post, _id) in posts' :key='_id')
      v-card.mx-auto(:flat='flat' :loading='loading' :outlined='outlined' :elevation='elevation' :raised='raised' :width-main='widthMain' :height='height')
        v-img.white--text(v-if='media' height='200px' :src="post.imgUrl")
          v-card-title.align-end.fill-height
            | I&apos; {{ post.title }}
        v-card-title(v-else='')
          | I&apos;m a title
        v-card-text {{ post.description }}
        v-card-actions(v-if='actions')
          v-btn(outlined='' @click.prevent="openPost(post)")
            | Click
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    flat: false,
    media: true,
    loading: false,
    actions: true,
    outlined: false,
    elevation: undefined,
    raised: false,
    width: 344,
    widthMain: 600,
    height: undefined
  }),
  computed: {
    ...mapGetters({ loadedPosts: 'posts/posts' }),
    posts() {
      return this.loadedPosts
    }
  },
  async fetch({ store }) {
    if (store.getters['posts/posts'].length === 0) {
      await store.dispatch('posts/getPosts')
    }
  },
  methods: {
    ...mapActions({ getAllPosts: 'posts/getPosts' }),
    openPost(post) {
      this.$router.push('/posts/' + post._id)
    }
  }
}
</script>
<style scoped>
.v-card {
  margin-bottom: 3.2rem;
}
.layout {
  max-width: 50rem;
  margin: auto;
  flex-wrap: wrap;
}
.v-input__slider {
  width: 100%;
}
</style>
