<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <editor
          v-model="timce"
          api-key="bpahh2whq5379tf02ni7wxsve2xkizju6g05xyni6zt22n5k"
          :plugins="myPlugins"
          :toolbar="myToolbar1"
          :init="myInit"
        >
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
        </editor>
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
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    editor: Editor // <- Important part
  },
  data() {
    return {
      title: '',
      description: '',
      author: '',
      content: '',
      image: '',
      timce: null,
      myToolbar1:
        'undo redo | bold italic underline preview | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      myPlugins: 'link image code preview imagetools',
      myInit: {
        automatic_uploads: true,
        images_upload_url: 'http://localhost:4000/posts/writeImage'
      }
    }
  },
  methods: {
    onFileChange(event) {
      this.image = this.$refs.fileInput.files[0]
      // const file = event.target.files[0]
      // eslint-disable-next-line
     // const formData = new FormData(event.target.files[0])
      // eslint-disable-next-line
      // const reader = new FileReader()
      // reader.onload = (e) => {
      //   this.urlImage = reader.result
      // }
      // reader.readAsDataURL(file)
      // this.image = formData
    },
    triggerUpload() {
      this.$refs.fileInput.click()
      console.log(this.timce)
    },
    async createAd() {
      if (this.$refs.form.validate() && this.image) {
        const coolData = {
          content: this.content,
          description: this.description,
          title: this.title,
          author: this.author
        }
        console.log(Object.entries(coolData))
        const objChange = Object.entries(coolData)
        // eslint-disable-next-line
        let formData = new FormData();
        // eslint-disable-next-line
        formData.append('file', this.image)
        formData.append('cool_data', JSON.stringify(objChange))
        await this.$axios.$post('/posts/createPost', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        // console.log(qwer)
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
