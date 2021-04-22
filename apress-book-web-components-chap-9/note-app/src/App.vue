<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <mwc-top-app-bar>
    <div slot="title"><router-link to="/">VueNoteApp</router-link></div>
    <div slot="actionItems"><router-link to="/About">About</router-link></div>
    <div><router-view/></div>
  </mwc-top-app-bar>
</template>

<script>
import '@material/mwc-top-app-bar';
import '@material/mwc-icon-button';

export default {
  name: 'App',
  methods: {
    handleAbout() {
      this.$router.push('About');
    }
  },
}
</script>

<style>
  a, a:visited {
    color:white;
    text-decoration:none;
    padding: 5px;
  }
</style>