<template>
    <section v-if="checkLogin == 'defaultValue'" style="background-color: white;">
        <v-dialog persistent width="auto" v-model="dialog" scrim="white">
            <v-col class="text-subtitle-1 text-center" cols="12">
                Loading... Please Wait!!!
            </v-col>
            <v-progress-linear color="deep-purple-accent-4" indeterminate rounded height="12"></v-progress-linear>
        </v-dialog>
    </section>
    <section v-if="checkLogin == 'notLoggedIn'">
        <v-card color="primary" title="LOGIN" class="text-center header-card"></v-card>

        <div class="mt-8"></div>
        <v-form @submit.prevent="submit" ref="form">
            <v-text-field v-model="obj.email" :rules="errorMessage.email" label="Enter Email">
            </v-text-field>
            <v-text-field v-model="obj.password" :rules="errorMessage.password" label="Enter Password">
            </v-text-field>
            <v-btn class="me-4" type="submit" color="success">
                Submit
            </v-btn>
            <v-btn @click="handleReset" color="red">
                Clear
            </v-btn>
            <v-alert v-if="$store.state.signInError !== ''" color="warning" icon="$warning" title="Warning"
                :text="`${$store.state.signInError} Please try again!`">
            </v-alert>
        </v-form>
        <v-btn @click="flag = !flag" class="mt-5" color="yellow">
            Forgot Password
        </v-btn>
        <v-form v-if="flag" @submit.prevent="passwordReset()" ref="passswordResetform">
            <div class="mt-12">
                <hr class="mb-12">
                <h2 class="text-center mb-12">Forgot Password?</h2>
                <v-text-field v-model="email" :rules="errorMessage.email" label="Enter Email">
                </v-text-field>
                <v-btn disable="email!=''" class="me-4" type="submit" color="success">
                    Submit
                </v-btn>
            </div>
        </v-form>
        <v-alert icon="$success" color="success" title="Success" :text="error" v-if="error">

        </v-alert>

        <div class="mt-12"></div>
        <v-card class="text-center pt-5 pb-5" color="primary" style="margin-top: 50vh;">
            Developed By
            <br>
            <a href="https://www.linkedin.com/in/abhishek-wani-673a62189/" style="color: inherit;">Abhishek Wani</a> | <a
                href="https://www.linkedin.com/in/rushikesh-wani/" style="color: inherit;">Rushikesh Wani</a>
        </v-card>
    </section>
</template>

<script>


export default {
    data() {
        return {
            flag: false,
            dialog: true,
            obj: {
                email: '',
                password: '',
            },
            email: '',
            errorMessage: {
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
                password: [v => !!v || 'Enter Password']
            },
        }
    },
    created() {
        this.$store.dispatch('checkLoggedIn');
    },
    mounted() {

    },
    methods: {
        async passwordReset() {
            const validate = await this.$refs.passswordResetform.validate();
            if (validate.valid) {
                this.$store.dispatch('passwordReset', this.email);
            }
        },
        handleReset() {
            this.$store.state.signInError = '';
            this.$refs.form.reset()
            this.$refs.form.resetValidation();
        },
        async submit() {
            const validate = await this.$refs.form.validate();
            console.log(validate.valid);
            if (validate.valid) {
                this.$store.dispatch('signUserIn', this.obj);
            }
            this.$router.push('/');
        },
    },
    computed: {
        error() {
            return this.$store.state.forgetPasswordError;
        },
        checkLogin() {
            console.log(this.$store.state.uid);
            return this.$store.state.uid;
        }
    },
}
</script>