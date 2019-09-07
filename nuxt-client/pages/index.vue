<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex v-for="(post, index) in posts" :key="index">
        <v-card
          class="mx-auto"
          :flat="flat"
          :loading="loading"
          :outlined="outlined"
          :elevation="elevation"
          :raised="raised"
          :width="width"
          :height="height"
        >
          <v-img
            v-if="media"
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title class="align-end fill-height">
              I'm a title
            </v-card-title>
          </v-img>
          <v-card-title v-else>
            I'm a title
          </v-card-title>
          <v-card-text>{{ post.text }}</v-card-text>
          <v-card-actions v-if="actions">
            <v-btn outlined>
              Click
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout justify-center align-center>
      <v-flex v-for="(post, index) in postsMain" :key="index">
        <v-card
          class="mx-auto"
          :flat="flat"
          :loading="loading"
          :outlined="outlined"
          :elevation="elevation"
          :raised="raised"
          :width-main="widthMain"
          :height="height"
        >
          <v-img
            v-if="media"
            class="white--text"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title class="align-end fill-height">
              I'm a title
            </v-card-title>
          </v-img>
          <v-card-title v-else>
            I'm a title
          </v-card-title>
          <v-card-text>{{ post.text }}</v-card-text>
          <v-card-actions v-if="actions">
            <v-btn outlined>
              Click
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex'
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
    height: undefined,
    posts: [
      {
        text: 111
      },
      {
        text: 222
      },
      {
        text: 333
      },
      {
        text: 444
      }
    ],
    postsMain: [
      {
        text: 111
      },
      {
        text: 333
      },
      {
        text: 444
      }
    ]
  }),
  mounted() {
    this.getPosts()
  },
  // async asyncData({$axios, params}) {
  //   const user = await $axios.$get('https://jsonplaceholder.typicode.com/users/' + params.id)
  //   return {user}
  // },
  methods: {
    ...mapActions({ getAllPosts: 'posts/getPosts' }),
    getPosts() {
      this.getAllPosts()
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
