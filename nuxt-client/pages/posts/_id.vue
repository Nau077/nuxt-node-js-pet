<template lang="pug">
 v-container
  v-layout(justify-center='' align-center='')
    h1 {{post.title}}
    div {{post.tinyMce}}
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => {}
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
