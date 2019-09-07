<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <v-form ref="form" class="mb-3">
          <!-- <input ref="author" v-model="author" type="text" />
          <input ref="title" v-model="title" type="text" /> -->
          <v-textarea
            v-model="author"
            name="author"
            label="author"
            type="text"
            multi-line
            required
          ></v-textarea>
          <v-textarea
            v-model="title"
            name="title"
            label="title"
            type="text"
            multi-line
            required
          ></v-textarea>
          <v-textarea
            v-model="content"
            name="Сontent"
            label="Сontent"
            type="text"
            multi-line
            required
          ></v-textarea>
          <v-textarea
            v-model="description"
            name="description"
            label="Ad description"
            type="text"
            multi-line
          ></v-textarea>
        </v-form>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn class="warning" @click="triggerUpload">
              Upload
              <!-- <v-icon right dark>cloud_upload</v-icon> -->
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="onFileChange"
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn class="success" @click="createAd">
              Create ad
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      author: '',
      content: '',
      image: ''
    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        this.urlImage = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    },
    triggerUpload() {
      this.$refs.fileInput.click()
    },
    async createAd() {
      if (this.$refs.form.validate() && this.image) {
        const ad = {
          content: this.content,
          description: this.description,
          title: this.title,
          author: this.author,
          image: this.image
        }
        await this.$axios.$post('/posts/createPost', ad, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log(ad)

        // this.$store.dispatch('createAd', ad)
        //     .then(() => {
        //         this.$router.push('/list');
        //     })
        //     .catch(() => {});
      }
    }
  }
}
</script>
<style lang="stylus" scoped></style>
