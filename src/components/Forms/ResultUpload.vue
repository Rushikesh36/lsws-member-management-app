<template>
    <section>
        <v-card color="primary" title="UPLOAD RESULT" class="text-center header-card"></v-card>

        <div class="mt-8"></div>
        <v-form @submit.prevent="submit" ref="form">
            <v-text-field v-model="obj.name" :rules="errorMessage.name" label="Name">
            </v-text-field>            

            <v-select v-model="obj.grade" :items="grades" :rules="errorMessage.grade"
                label="Select Grade/Standard"></v-select>

            <v-text-field v-model="obj.marks" :rules="errorMessage.marks" label="Percentage">
            </v-text-field>

            <v-btn v-if="filename === ''" @click="openUploadWidget()" prepend-icon="mdi-upload" class="me-4" color="info">
                Upload Document
            </v-btn>
            <v-card v-else class="ma-2 pl-2 pr-2 mt-3" color="success" label text-color="white" variant="tonal"><v-icon icon="mdi-upload"></v-icon>{{ filename }} is successfully uploaded, Please click on submit button</v-card>


            <v-btn class="me-4" type="submit" color="green">
                Submit
            </v-btn>

            <v-btn @click="handleReset" color="red" class="mt-4">
                clear
            </v-btn>
        </v-form>
        <v-alert v-if="error!== ''" color="error mt-3" icon="$error" title="Error" :text="error">
        </v-alert>

        <v-dialog v-model="snackbar" persistent="true">
            <v-card v-if="snackbar" loading :text="success" subtitle="Confirmation"></v-card>
        </v-dialog>
    </section>
</template>

<script>
import router  from '../../router';

export default {
    data() {
        return {
            obj: {
                name: '',
                grade: '',
                url: '',
                thumbnailUrl: '',
                type: 'result',
                year: '',
                marks: '',
            },
            grades: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '12th', 'Diploma', 'Graduation', 'Post-Graduation', 'PhD', 'PGDM', 'Extra Curricular Activities', 'Other Courses'],
            filename: '',
            errorMessage: {
                name: [v => !!v || 'Please enter Name'],
                grade: [v => !!v || 'Please select Standard/Grade'],
                marks: [v => !!v || 'Please enter Percentage'],
                url: [v => !!v || 'Please upload receipt']
            },
            snackbar: false,
            flag: false,
        }
    },
    mounted() {

    },
    methods: {
        handleReset() {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
            this.flag = false;
            this.filename = '';
        },
        async submit() {
            const validate = await this.$refs.form.validate();
            this.obj.date = this.getDate();
            this.flag = true;
            this.obj.profile = this.$store.state.headDetails;
            this.obj.uid = this.$store.state.uid;
            if(validate.valid && this.obj.url !== '') {
                this.$store.dispatch('uploadDocument', this.obj);
                this.success = 'Document Details Successfully Uploaded, Redirecting to Documents Page';
                this.snackbar = true;
                this.handleReset();
                setTimeout(function () {
                    router.push('/documents')
                }, 3000);
            }
        },
        openUploadWidget() {
            const widget = window.cloudinary.createUploadWidget(
                {
                    cloud_name: "day9yxxz0",
                    upload_preset: "owrfph85",
                    max_files: 1,
                },
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        console.log(result.info);
                        this.obj.url = result.info.secure_url;

                        this.obj.thumbnailUrl = result.info.thumbnail_url;

                        this.filename = result.info.original_filename;
                    }
                }
            )
            widget.open();
        },
        getDate() {
            const currentDate = new Date();

            // Get day, month, and year components
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
            const year = currentDate.getFullYear();

            this.obj.year = year;
            // Ensure day and month are formatted with leading zeros if needed
            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedMonth = month < 10 ? `0${month}` : month;

            // Create the "dd-mm-yyyy" formatted date string
            const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
            return formattedDate;
        }
    },
    computed: {
        error() {
            if (this.obj.url == '' && this.flag) {
                return 'Please Upload a Document';
            }
            return '';
        }
    }
}
</script>