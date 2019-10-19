<template lang="pug">
    v-container
      v-app-bar(:clipped-left='clipped', fixed='', app='')
        v-btn(icon='', @click.stop='fixed = !fixed')
          v-icon mdi-minus
        v-toolbar-title(v-text='title')
        v-spacer
        v-toolbar-items
          v-btn(text='') Войти admin
          v-btn(text='') Войти user
          v-btn(text='') Регистрация
          v-btn(icon='', @click.stop='rightDrawer = !rightDrawer')
            v-icon mdi-menu
      v-navigation-drawer(v-model='rightDrawer', :right='right', temporary='', fixed='')
        v-list
          v-list-item(v-for='(item, i) in items', :key='i', :to='item.to', router='', exact='')
            v-list-item-action
              v-icon {{ item.icon }}
            v-list-item-content
              v-list-item-title(v-text='item.title')
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-chart-bubble',
          title: 'New post',
          to: '/newPost'
        },
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Psy up your lvl'
    }
  }
}
</script>
