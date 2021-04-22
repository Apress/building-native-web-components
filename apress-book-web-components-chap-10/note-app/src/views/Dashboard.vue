<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
  <div>
    <mwc-list v-for="(note) in notes" :key="note.id" multi>
      <mwc-list-item twoline hasMeta>
        <span>{{note.title}}</span>
        <span slot="meta" class="material-icons" @click="handleDelete(note.id)">delete</span>
        <span slot="secondary">{{note.description}}</span>
      </mwc-list-item>
      <li divider padded role="separator"></li>
    </mwc-list>
    <mwc-fab class="floatButton" @click="handleAdd" mini icon="add"></mwc-fab>
    <mwc-dialog id="dialog" heading="Add Note">
      <div class="formFields">
        <mwc-textfield
          id="text-title"
          outlined
          minlength="3"
          label="Title"
          required>
        </mwc-textfield>
      </div>
      <div class="formFields">
        <mwc-textfield
          id="text-description"
          outlined
          minlength="3"
          label="Description"
          required>
        </mwc-textfield>
      </div>
      <div>
        <mwc-button
          id="primary-action-button"
          slot="primaryAction"
          @click="handleAddNote">
          Add
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          dialogAction="close"
          @click="handleClose">
          Cancel
        </mwc-button>
      </div>
    </mwc-dialog>
  </div>
</template>
<script>
import '@material/mwc-list/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-fab';
import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-textfield';
import { fireApp } from'../firebase'
import { v4 as uuidv4 } from 'uuid';

const db = fireApp.database().ref();
const auth = fireApp.auth();

export default {
  name: 'Dashboard',
  data() {
    return {
      notes: [],
      user: null
    }
  },
  mounted() {
    this.isUserLoggedIn()
    .then(
      (user) => {
        this.user = user;
        this.updateLogged();
        this.getUserNotes();
      }
    )
    .catch(
      () => {
        this.$router.push('/login');
      }
    )
    ;
  },
  methods: {
    getUserNotes() {
      db.orderByChild('userId')
        .equalTo(this.user.uid)
        .once("value")
        .then(
          (notes) => {
            notes.forEach((note) => {
              this.notes.push({
                id: note.child('id').val(),
                title: note.child('title').val(),
                description: note.child('description').val(),
                userId: note.child('userId').val(),
                ref: note.ref
              })
            })
          }
        );
    },
    handleDelete(id) {
      const noteToDelete = this.notes.findIndex((item) => (item.id === id));
      const noteRef = this.notes[noteToDelete].ref;
      if(noteRef) {
        noteRef.remove();
      }
      this.notes.splice(noteToDelete, 1);
    },
    handleAdd() {
      const formDialog = this.$el.querySelector('#dialog');
      formDialog.show();
    },
    handleAddNote() {
      const formDialog = this.$el.querySelector('#dialog');
      let txtTitle = this.$el.querySelector('#text-title');
      let txtDescription = this.$el.querySelector('#text-description');
      const isValid = txtTitle.checkValidity() && txtDescription.checkValidity();

      if(isValid) {
        const newIndex = uuidv4();
        const newItem = {
          id: newIndex,
          title: txtTitle.value,
          description: txtDescription.value,
          userId: this.user.uid
        };
        this.notes.push(newItem);
        db.push(newItem);

        txtTitle.value ='';
        txtDescription.value = '';
        formDialog.close();
      }
    },
    handleClose() {
      let txtTitle = this.$el.querySelector('#text-title');
      let txtDescription = this.$el.querySelector('#text-description');
      const formDialog = this.$el.querySelector('#dialog');

      txtTitle.value ='';
      txtDescription.value = '';
      formDialog.close();
    },
    updateLogged() {
      this.$emit("update-logged", true);
    },
    isUserLoggedIn () {
        return new Promise(
          (resolve, reject) => {
            auth.onAuthStateChanged(function(user) {
              if (user) {
                resolve(user);
              }
              else {
                reject(user);
              }
            })
          }
        )
        ;
    }
  },
}
</script>
<style scoped>
  .floatButton {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }

  .formFields {
    margin: 15px;
  }
</style>