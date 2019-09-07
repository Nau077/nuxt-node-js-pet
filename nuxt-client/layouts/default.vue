<template>
  <v-app dark>
    <Drawer />
    <v-content>
      <nuxt />
    </v-content>
    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Drawer from '@/components/Drawer'

export default {
  components: {
    Drawer
  }
}
</script>
