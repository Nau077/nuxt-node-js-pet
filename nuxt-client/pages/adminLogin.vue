<template lang="pug">
    v-container(fluid='', fill-height='')
      v-layout(align-center='', justify-center='')
        v-flex(xs12='', sm8='', md6='')
          v-card.elevation-12
            v-toolbar(dark='', color='')
              v-toolbar-title Login form
            v-card-text
              v-form(v-model='valid', ref='form', validation='')
                v-textarea(name='Name', label='Admin name', type='text', v-model='name', :rules='nameRules')
                v-textarea(name='password', label='Password', type='password', :counter='6', v-model='password', :rules='passwordRules')
            v-card-actions
              v-spacer
              v-btn(color='primary', @click='onSubmit', :loading='loading', :disabled='!valid || loading') Log in
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      name: '',
      password: '',
      valid: false,
      nameRules: [(v) => !!v || 'Name is required'],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          (v && v.length >= 6) ||
          'Password must be equal or more than 6 characters'
      ]
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  created() {
    if (this.$route.query.loginError) {
      this.$store.dispatch('setError', 'Please log in to access this page.')
    }
  },
  methods: {
    ...mapActions({ loginAdmin: 'adminAuth/loginAdmin' }),
    onSubmit() {
      if (this.$refs.form.validate()) {
        const admin = {
          name: this.name,
          password: this.password
        }
        this.loginAdmin(admin)
          .then(() => {
            this.$router.push('/')
          })
          .catch((e) => {
            console.error(e)
          })
      }
    }
  }
}
</script>
