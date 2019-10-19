import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _aadb24e2 = () => interopDefault(import('..\\pages\\adminLogin.vue' /* webpackChunkName: "pages_adminLogin" */))
const _13ad32f5 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages_inspire" */))
const _0b2d190a = () => interopDefault(import('..\\pages\\newPost.vue' /* webpackChunkName: "pages_newPost" */))
const _82dbeed8 = () => interopDefault(import('..\\pages\\posts\\index.vue' /* webpackChunkName: "pages_posts_index" */))
const _66711ffc = () => interopDefault(import('..\\pages\\posts\\_id.vue' /* webpackChunkName: "pages_posts__id" */))
const _1576f1ad = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
      path: "/adminLogin",
      component: _aadb24e2,
      name: "adminLogin"
    }, {
      path: "/inspire",
      component: _13ad32f5,
      name: "inspire"
    }, {
      path: "/newPost",
      component: _0b2d190a,
      name: "newPost"
    }, {
      path: "/posts",
      component: _82dbeed8,
      name: "posts"
    }, {
      path: "/posts/:id",
      component: _66711ffc,
      name: "posts-id"
    }, {
      path: "/",
      component: _1576f1ad,
      name: "index"
    }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}
