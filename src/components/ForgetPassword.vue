<template>
    <p>Forget Password</p>
    <v-form @submit.prevent="submit" ref="form">
        <v-text-field type="password" v-model="password" label="Password" :rules="passwordError">

        </v-text-field>

        <v-text-field type="password" v-model="cnfPassword" label="Re-enter Password" :rules="passwordError">
        </v-text-field>

        <v-btn class="me-4" type="submit" color="success">
            Submit
        </v-btn>

        <v-btn @click="handleReset" color="red">
            Clear
        </v-btn>
        <v-alert icon="$error" title="Error" :text="errMsg" v-if="errMsg">
            
        </v-alert>
    </v-form>
    <v-dialog v-model="snackbar" persistent="true">
        <v-card v-if="snackbar" loading :text="success" subtitle="Confirmation"></v-card>
    </v-dialog>
</template>


<script>
import router from '../router';
export default {
    data() {
        return {
            password: '',
            cnfPassword: '',
            passwordError: [v => !!v || 'Please Enter Password'],
            errMsg: '',
            success: 'Password Successfully changed, Redirecting to Profile Page...',
            snackbar: false,
        }
    },
    watch: {
        password(val) {
            if (this.cnfPassword != val) {
                this.errMsg = 'Both the Entered Passwords are not same';
            }else{
                this.errMsg = '';
            }
        },
        cnfPassword(val) {
            if (this.password != val) {
                this.errMsg = 'Both the Entered Passwords are not same';
            }else{
                this.errMsg = '';
            }
        }
    },
    methods: {
        handleReset() {
            this.$refs.form.reset()
            this.$refs.form.resetValidation();
            this.password = '';
            this.cnfPassword = '';
            this.errMsg = '';
        },
        async submit(){
            const validate = await this.$refs.form.validate();
            if (validate.valid && this.errMsg == '') {
                this.snackbar = true;
                console.log(this.password);
                this.$store.dispatch('changePassword', this.password);
                setTimeout(function () {
                    router.push('/profile')
                }, 3000);
            }
        }
    }
}
</script>