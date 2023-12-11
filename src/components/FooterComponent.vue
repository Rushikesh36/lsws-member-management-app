<template>
  <v-layout class="overflow-visible" style="height: 112px;">
    <v-bottom-navigation v-model="value" mandatory="true" grow color="primary">
      <v-btn @click="redirect('/')">
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>

      <v-btn @click="redirect('/profile')">
        <v-icon>mdi-account-multiple</v-icon>
        Profile
      </v-btn>

      <v-btn @click="redirect('/documents')">
        <v-icon>mdi-file-multiple</v-icon>
        <span>Documents</span>
      </v-btn>

      <v-btn @click="dialog = true">
        <v-icon>mdi-logout</v-icon>
        <span>Logout</span>
      </v-btn>


    </v-bottom-navigation>
  </v-layout>
  <v-dialog v-model="dialog" width="auto">
    <v-card>
      <v-card-text>
        Are you sure you want to log out?
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text="Yes" @click="logout()"></v-btn>
        <v-btn color="green" text="Cancel" @click="dialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
     dialog: false,
    }
  },
  methods: {
    redirect(value) {
      this.$router.push({ path: value });
    },
    logout(){
      this.$store.dispatch('logout');
      this.$router.push('/');
    }
  },
  computed: {
    value() {
      if(this.$route.name === undefined) {
        return 0;
      }
      else if(this.$route.name.includes('home')) {
        return 0;
      } else if (this.$route.name.includes('document')) {
        return 2;
      }
      else if (this.$route.name.includes('profile')) {
        return 1;
      }
      else if (this.$route.name.includes('logout')) {
        return 3;
      }
      return 0;
    }
  }
}
</script>
