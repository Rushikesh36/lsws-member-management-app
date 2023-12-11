<template>
    <section v-if="!onUpdate">

        <v-card color="primary" title="ADD MEMBER DETAILS" class="text-center header-card"></v-card>
        <div class="mt-8"></div>
        <v-form @submit.prevent="submit" ref="form">
            <v-text-field v-model="obj.name" :rules="errorMessage.name" label="Name">
            </v-text-field>
            <v-text-field v-model="obj.dob" type="date" :rules="errorMessage.dob" label="Date of Birth">
            </v-text-field>
            <v-select v-model="obj.gender" :rules="errorMessage.gender" label="Gender" :items="genderArray">
            </v-select>
            <v-select v-model="obj.maritalStatus" :rules="errorMessage.maritalStatus" label="Marital Status" :items="['Married', 'UnMarried']">
            </v-select>
            <v-text-field v-model="obj.phoneNumber"  type="number" label="Phone Number">
            </v-text-field>
            <v-text-field v-model="obj.whatsappNumber" type="number" label="Whatsapp Number">
            </v-text-field>
            <v-text-field v-model="obj.email" :rules="errorMessage.email" label="Email">
            </v-text-field>
            <v-text-field v-model="obj.education" :rules="errorMessage.education" label="Education">
            </v-text-field>
            <v-select v-model="obj.bloodGroup" :rules="errorMessage.bloodGroup" :items="bloodGroupArray"
                label="Blood Group">
            </v-select>
            <v-select v-model="obj.occupation" :rules="errorMessage.occupation" :items="occupationArray" label="Occupation">
            </v-select>
            <v-text-field v-model="obj.company" :rules="errorMessage.company" label="Company/Business Name & Location">
            </v-text-field>

            <v-btn class="me-4" type="submit" color="success">
                Submit
            </v-btn>

            <v-btn @click="handleReset" color="yellow">
                Reset
            </v-btn>
        </v-form>
    </section>

    <section v-if="onUpdate">
        <v-dialog v-model="snackbar" persistent="true">
            <v-card loading :text="`${obj.name}'s profile details are successfully updated. Redirecting to Profile Page.`" subtitle="Confirmation"></v-card>
        </v-dialog>
    </section>

</template>

<script>
import router  from '../router';
export default {
    data() {
        return {
            onUpdate: false,
            genderArray: ['Male', 'Female'],
            bloodGroupArray: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-',],
            errorMessage: {
                name: [v => !!v || 'Please Enter a name'],
                education: [v => !!v || 'Please Enter your Education/Qualification'],
                occupation: [v => !!v || 'Please Enter your Occupation/Business'],
                dob: [v => !!v || 'Please Enter your Birth/Date of Birth'],
                gender: [v => !!v || 'Please Select a Gender'],
                company: [v => !!v || 'Please Enter your Company/Business Name and Location'],
                bloodGroup: [v => !!v || 'Please Select a Blood Group'],
                maritalStatus: [v => !!v || 'Please Select a Marital Status'],
                phone: [
                    value => {
                        if (value) return true
                        return 'Phone Number is requred.'
                    },
                    
                ],
                email: [
                    value => {
                        if (value) return true

                        return 'E-mail is requred.'
                    },
                    value => {
                        if (/.+@.+\..+/.test(value)) return true

                        return 'E-mail must be valid.'
                    },
                ],
            },
            obj: {
                name: '',
                education: '',
                gender: '',
                dob: '',
                phoneNumber: '',
                whatsappNumber: '',
                bloodGroup: '',
                occupation: '',
                company: '',
                maritalStatus: '',
                address: '',
            },
            occupationArray : [
                'Business / Self-Employed', 'Job', 'Home maker', 'Student', 'Retired'
            ]
        }
    },
    mounted() {

    },
    methods: {
        reverseDateFormat(inputDate) {
            var dateComponents = inputDate.split('-');
            var reversedDate = dateComponents[2] + '-' + dateComponents[1] + '-' + dateComponents[0];
            return reversedDate;
        },
        handleReset() {
            this.$refs.form.reset()
            this.$refs.form.resetValidation();
        },
        async submit() {
            const validate = await this.$refs.form.validate();
            if(validate.valid){
                this.obj.url =  'https://res.cloudinary.com/day9yxxz0/image/upload/v1698490338/profile_picture/rvsqs7wumhjefgbqamhv.jpg';
                this.obj.dob = this.reverseDateFormat(this.obj.dob);
                this.$store.dispatch('createProfile', this.obj);
                this.onUpdate = true;
                setTimeout(function () {
                    router.push('/profile')
                },3000);
            }
        }
    },
    computed: {

    },
    watch: {

    }

}
</script>