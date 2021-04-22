<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <div class="formContainer">
    <div class="formLogin">
      <div class="formFields">
        <h1>{{actionText}}</h1>
        <mwc-textfield
            id="text-email"
            outlined
            minlength="3"
            label="Email"
            required>
          </mwc-textfield>
        </div>
        <div class="formFields">
          <mwc-textfield
            id="text-password"
            type="password"
            outlined
            minlength="3"
            label="Password"
            required>
          </mwc-textfield>
        </div>
        <div class="actionButtons">
          <mwc-button
            id="link-action-button"
            class="actionButton"
            slot="primaryAction"
            @click="goToLink">
            {{linkButton}}
          </mwc-button>
        </div>
        <div class="actionButtons">
          <mwc-button
            raised
            id="primary-action-button"
            class="actionButton"
            slot="primaryAction"
            @click="submitAction">
            {{actionButton}}
          </mwc-button>
          <mwc-button
            raised
            slot="secondary-action-button"
            class="actionButton"
            @click="handleClear">
            Clear
          </mwc-button>
        </div>
      </div>
  </div>
</template>
<script>
import '@material/mwc-textfield';
import '@material/mwc-button';
import { fireApp } from '../firebase';

const auth = fireApp.auth();

export default {
  name: 'Login',
  data() {
    return {
      actionText: 'Login',
      actionButton: 'Send',
      linkButton: 'Register',
      user: null
    }
  },
  methods: {
    goToLink () {
      switch(this.linkButton) {
      case 'Login':
        this.actionText= 'Login';
        this.actionButton= 'Send';
        this.linkButton = 'Register';
        break;
      case 'Register':
        this.actionText= 'Register';
        this.actionButton= 'Register';
        this.linkButton = 'Login';
        break;
      }
    },
    goToDashboard () {
      this.$router.push('/dashboard');
    },
    handleClear() {
      let txtEmail = this.$el.querySelector('#text-email');
      let txtPassword = this.$el.querySelector('#text-password');

      txtEmail.value = '';
      txtPassword.value ='';
    },
    isUserLoggedIn () {
        return new Promise(
          (resolve, reject) => {
            auth.onAuthStateChanged(function(user) {
              if (user) {
                this.user = user;
                resolve(user);
              }
              else {
                reject(user);
              }
            })
          }
        );
    },
    signInUser (email, password) {
      auth.signInWithEmailAndPassword(email,password)
      .then(
        () => {
        this.goToDashboard();
        }
      )
      .catch(
        // eslint-disable-next-line
        (error) => {console.log('Something happened.', error)} 
      );
    },
    signUpUser (email, password) {
      auth.createUserWithEmailAndPassword(email,password)
      .then(
        (user) => {
          // eslint-disable-next-line
          console.log('User registered.', user);
          this.goToDashboard();
        }
      )
      .catch(
        // eslint-disable-next-line
        (error) => {console.log('Something happened.', error)} 
      );
    },
    submitAction () {

      let txtEmail = this.$el.querySelector('#text-email');
      let txtPassword = this.$el.querySelector('#text-password');
      const isValid = txtEmail.checkValidity() && txtPassword.checkValidity();

      if(isValid) {
        switch(this.actionText) {
          case 'Login':
            this.signInUser (txtEmail.value, txtPassword.value);
            
            txtEmail.value = '';
            txtPassword.value ='';
            break;
          case 'Register':
            this.signUpUser (txtEmail.value, txtPassword.value);
            
            txtEmail.value = '';
            txtPassword.value ='';
            break;
      }
      }
    }
  },
}
</script>
<style scoped>
  .formContainer {
    display:flex;
  }

  .formLogin {
    margin:auto;
  }

  .formFields {
    margin: 15px;
  }

  .actionButtons {
    text-align:center;
  }

  .actionButton {
    margin: 10px;
  }
</style>