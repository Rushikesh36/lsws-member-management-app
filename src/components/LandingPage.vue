<template>
  <div class="header text-center">
    <v-img
      src="https://firebasestorage.googleapis.com/v0/b/wani-samaj.appspot.com/o/lsws-logo-new.png?alt=media&token=f7b19a63-2191-4b89-97e4-45c5fcd05da5"></v-img>
    <p>लाडशाखीय वाणी समाज सेवा व उन्नती मंडळ, अंबरनाथ</p>
  </div>
  <hr>
  <div class="mt-8"></div>
  <div v-if="birthdays.length != 0">
    <v-card class="mb-4">
      <v-img
        src="https://firebasestorage.googleapis.com/v0/b/wani-samaj.appspot.com/o/birthday.jpg?alt=media&token=af08da68-86d6-4a58-bba3-8a20428a4502&_gl=1*odk268*_ga*MTA0NTAyMzc1LjE2OTYyNjQ4Njc.*_ga_CW55HF8NVT*MTY5ODQ4OTQyOC41OS4xLjE2OTg0ODk0NzQuMTQuMC4w"></v-img>
      <p class="mt-5 text-center font-weight-bold">लाडशाखीय वाणी समाज सेवा व उन्नती मंडळ, अंबरनाथ कडून वाढदिवसाच्या
        हार्दिक शुभेच्छा</p>

      <br />

      <div class="birthday-img">
        <div v-for="i in birthdays" :key="i">

          <span><v-img :src="i.url" width="50"></v-img></span> <span class="pl-12">{{ i.name }}</span>

        </div>
      </div>
    </v-card>
  </div>



  <h3 class="mb-3">Search Members</h3>
  <v-autocomplete label="Search Members" :items="info" v-model="search" return-object clearable>
  </v-autocomplete>
  <v-expansion-panels v-if="search !== '' && search" variant="popout" v-model="panel" class="mb-10">
    <v-expansion-panel color="green" value="open">
      <v-expansion-panel-title>
        {{ search.name }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-list lines="one">
          <v-list-item>
            <div class="prof_pic">
              <v-img :width="100" class="prof-img text-center" aspect-ratio="1/1" cover :src="search.url">
              </v-img>
            </div>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Date of Birth</v-list-item-title>
            <v-list-item-subtitle>{{ search.dob }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Gender</v-list-item-title>
            <v-list-item-subtitle>{{ search.gender }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item lines="three">
            <v-list-item-title>Address</v-list-item-title>
            <v-list-item-subtitle>{{ search.address }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Area</v-list-item-title>
            <v-list-item-subtitle>{{ search.area }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Marital Status</v-list-item-title>
            <v-list-item-subtitle>{{ search.maritalStatus }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Kuldevi</v-list-item-title>
            <v-list-item-subtitle>{{ search.kuldevi }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Phone Number</v-list-item-title>
            <v-list-item-subtitle>{{ search.phoneNumber }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Whatsapp Number</v-list-item-title>
            <v-list-item-subtitle>{{ search.whatsappNumber }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>{{ search.email }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Education</v-list-item-title>
            <v-list-item-subtitle>{{ search.education }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Blood Group</v-list-item-title>
            <v-list-item-subtitle>{{ search.bloodGroup }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Occupation</v-list-item-title>
            <v-list-item-subtitle>{{ search.occupation }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Company/Business</v-list-item-title>
            <v-list-item-subtitle>{{ search.company }}</v-list-item-subtitle>
          </v-list-item>

        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  
  <div class="mt-12"></div>
  <div v-if="password == 123456">
  <v-alert density="compact" type="warning" title="Change Password"
    text="Please change your password as it is set to default password"></v-alert>
  </div>
  <router-link to="/paymentDetails">
    <div class="text-center" style="margin-top: 15vh;">
      <v-btn color="primary">
        PAYMENT DETAILS
      </v-btn>
    </div>
  </router-link>



  
  <div class="mt-12"></div>
  <router-link to="/membersList">
    <div class="text-center">
      <v-btn class="" color="warning" size="x-large">
        Initiative
        <br>
        कार्यकारणी (२०२१ - २०२३)
      </v-btn>

    </div>
  </router-link>
  <div class="mt-12"></div>
  <v-card class="text-center pt-5 pb-5" color="primary">
    Developed By
    <br>
    <a href="https://www.linkedin.com/in/abhishek-wani-673a62189/" style="color: inherit;">Abhishek Wani</a> | <a href="https://www.linkedin.com/in/rushikesh-wani/" style="color: inherit;">Rushikesh Wani</a>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      panel: ['open'],
    }
  },
  mounted() {
    this.$store.dispatch('getInfo');
    this.$store.dispatch('getAllBirthdays');
    console.log(this.info)

  },
  computed: {
    info() {
      console.log(this.$store.state.info);
      return this.$store.state.info;
    },
    birthdays() {
      return this.$store.state.birthdays;
    },
    password() {
      return this.$store.state.password;
    },

  },
  methods: {
    
  }
}

</script>

<style scoped>
.v-card {
  font-size: 1.15rem;

  font-weight: 600;
  padding-bottom: 10px;
}

.v-card p {
  padding-top: 10px;
  font-size: 1.25rem;
  font-weight: 500;
}

.birthday-img {
  padding-top: -100px;
}


.birthday-img .v-img {
  border-radius: 50% !important;
  position: relative !important;
  left: -2px !important;
  top: 35px;
  height: 50px;
  width: 100%;
}

.header .v-img {
  height: 50px;
  width: auto;
}

.header p {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>