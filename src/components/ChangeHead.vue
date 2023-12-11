<template>
    <v-card color="primary" title="CHANGE FAMILY HEAD" class="text-center header-card"></v-card>
    <p>Your current Family Head is {{ getHeadDetails.name }}</p>



    <section>
        <v-form @submit.prevent="submit" ref="form">
            <div class="mt-8">
                <h3>Select a Family-Member who you want to make Head of Family</h3>
                <v-select :items="getMemberDetails" v-model="selectedMember" label="Select Member" class="mt-5" item-value="name" return-object :rules="errorMessage">
                </v-select>
            </div>
            <v-btn class="me-4" type="submit" color="success">
                Save
            </v-btn>
        </v-form>
    </section>

    <v-dialog v-model="snackbar" persistent="true">
        <v-card v-if="snackbar" loading :text="success" subtitle="Confirmation"></v-card>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import router from '../router';

export default {
    data() {
        return {
            snackbar: false,
            selectedMember: '',
            errorMessage: [v => !!v || 'Please Select a Member who you want to make Head of Family'],
        }
    },
    mounted() {
        this.$store.dispatch('getAccountProfileDetails');
    },
    methods: {
        async submit() {
            console.log(this.selectedMember);
            const validate = await this.$refs.form.validate();
            if(validate.valid) {
                this.snackbar = true;
                const prof1 = this.getHeadDetails;
                prof1.head = false;
                const prof2 = this.selectedMember;
                prof2.head = true;

                this.$store.dispatch('changeHead', {prof1, prof2});
                setTimeout(function () {
                    router.push('/profile')
                }, 3000);
            }
        }
    },
    computed: {
        ...mapGetters(['getHeadDetails', 'getMemberDetails']),
        success() {
            return `${this.selectedMember.name} is now Head of Family`
        }
    },
    watch: {

    }

}
</script>

<style scoped>
.prof-img {
    border-radius: 50%;
}

.prof_pic {
    margin-left: 30vw;
}

.prof_pic_text {
    position: absolute;
    left: 13px;
    bottom: 0px !important;
    color: blue;
    background-color: white;
    padding-left: 25px;
    padding-right: 25px;
}
</style>