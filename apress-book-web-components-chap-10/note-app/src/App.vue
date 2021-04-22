<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <mwc-top-app-bar>
    <div slot="title"><router-link to="/">VueNoteApp</router-link></div>
    <div slot="actionItems"><router-link to="/About">About</router-link></div>
    <div slot="actionItems" v-if="logged" @click="handleLogout">Logout</div>
    <div><router-view @update-logged="updateLogged"/></div>
  </mwc-top-app-bar>
</template>

<script>
import '@material/mwc-top-app-bar';

import { fireApp } from './firebase';
const auth = fireApp.auth();

export default {
  name: 'App',
  data() {
    return {
      logged: false
    }
  },
  mounted() {
    this.updateLogged(true);
  },
  methods: {
    handleAbout() {
      this.$router.push('About');
    },
    handleLogout() {
      auth.signOut()
        .then(()=>{
          this.$router.push('/login');
          this.logged= false;
          })
        .catch((error)=> {
          // eslint-disable-next-line 
          console.log('error', error)
        });
    },
    updateLogged(status) {
      if(status) {
        fireApp.getCurrentUser()
        .then((user)=> {
          this.logged = user;
          this.$router.push('Dashboard');
          })
        .catch(() => {
          this.logged = false;
        });
      }
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