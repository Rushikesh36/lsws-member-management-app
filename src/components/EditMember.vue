<template>
    <v-card color="primary" title="EDIT MEMBER DETAILS" class="text-center header-card"></v-card>

    <div class="mt-8">
        <h3>Select a member to edit</h3>
        <v-select v-model="editProfile" :items="profileNames" label="Select Member" class="mt-5">
        </v-select>
    </div>

    <section v-if="editProfile != ''">
        <v-form @submit.prevent="submit" ref="form">
            <div class="prof_pic">
                <v-img :width="100" class="prof-img text-center" @click="openUploadWidget()" aspect-ratio="1/1" cover
                    :src="obj.url"><div class="prof_pic_text"><v-icon icon="mdi-pencil"></v-icon></div></v-img>
            </div>
            <v-text-field v-model="obj.name" :rules="errorMessage.name" label="Name">
            </v-text-field>
            <v-text-field v-model="obj.dob" type="date" :rules="errorMessage.dob" label="Date of Birth">
            </v-text-field>
            <v-select v-model="obj.gender" :rules="errorMessage.gender" label="Gender" :items="genderArray">
            </v-select>
            <v-select v-model="obj.maritalStatus" :rules="errorMessage.maritalStatus" label="Marital Status" :items="['Married', 'UnMarried']"></v-select>
            <div v-if="obj.head">
                <v-text-field v-model="obj.address" :rules="errorMessage.address" label="Address">
                </v-text-field>
                <v-select v-model="obj.area" :rules="errorMessage.area" label="Area" :items="areaArray"></v-select>
            </div>            
            <v-text-field v-model="obj.phoneNumber"  type="number" label="Phone Number">
            </v-text-field>
            <v-text-field v-model="obj.whatsappNumber"  type="number" label="Whatsapp Number">
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
                Save
            </v-btn>

            <v-btn color="yellow" @click="cancel()">
                Cancel
            </v-btn>

            <v-dialog width="500">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" v-if="!obj.head" prepend-icon="mdi-account-remove" text="Delete Member" class="mt-5" color="red">
                    </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="Dialog">
                        <v-card-text>
                            Are you sure you want to delete this member?
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Yes" @click="deleteMember()"></v-btn>
                            <v-btn text="Cancel" @click="isActive.value = false"></v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-form>
    </section>

    <section v-if="onUpdate && editProfile == ''">
        <v-alert type="success" title="Confirmation"
            :text="`${successName}'s profile details are successfully updated.`"></v-alert>
    </section>

    <section v-if="onDelete && editProfile == ''">
        <v-alert type="info" title="Confirmation" :text="`${deleteMember}'s profile successfully deleted.`"></v-alert>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            onDelete: false,
            isActive: { value: false },
            onUpdate: false,
            profiles: [],
            profileNames: [],
            editProfile: '',
            genderArray: ['Male', 'Female'],
            bloodGroupArray: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-',],
            areaArray: ['Shivganga Nagar','Kansai Section','Sai Section','Kher Section','Vadavli','Palegaon','Green City Area','B-Cabin','Ambernath West','Navare Nagar','Vardhman Nagar'],
            errorMessage: {
                name: [v => !!v || 'Please Enter a name'],
                education: [v => !!v || 'Please Enter your Education/Qualification'],
                occupation: [v => !!v || 'Please Enter your Occupation/Business'],
                dob: [v => !!v || 'Please Enter your Birth/Date of Birth'],
                gender: [v => !!v || 'Please Select a Gender'],
                company: [v => !!v || 'Please Enter your Company/Business Name and Location'],
                address: [v => !!v || 'Please Enter Address'],
                bloodGroup: [v => !!v || 'Please Select a Blood Group'],
                maritalStatus: [v => !!v || 'Please Select a Marital Status'],
                area: [v => !!v || 'Please Select an Area'],
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
                address: '',
                url: '',
                thumbnailUrl: '',
                area: '',
                maritalStatus: '',
            },
            occupationArray : [
                'Business / Self-Employed', 'Job', 'Home maker', 'Student', 'Retired'
            ],
            filename: '',
            successName: '',
            profileIds: '',
        }
    },
    mounted() {
        this.$store.dispatch('getAccountProfileDetails');
    },
    methods: {
        openUploadWidget() {
            const widget = window.cloudinary.createUploadWidget(
                {
                    cloud_name: "day9yxxz0",
                    upload_preset: "l1p7bxqg",
                },
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        this.obj.url = result.info.secure_url;

                        this.obj.thumbnailUrl = result.info.thumbnail_url;

                        this.filename = result.info.original_filename;
                    }
                }
            )
            widget.open();
        },
        cancel() {
            this.editProfile = '';
        },
        reverseDateFormat(inputDate) {
            var dateComponents = inputDate.split('-');
            var reversedDate = dateComponents[2] + '-' + dateComponents[1] + '-' + dateComponents[0];
            return reversedDate;
        },
        async submit() {
            if (this.obj.address == '') {
                delete this.obj['address'];
            }
            if (this.obj.area == '') {
                delete this.obj['area'];
            }
            const validate = await this.$refs.form.validate();
            console.log('equi', this.obj);
            if (validate.valid) {
                this.obj.dob = this.reverseDateFormat(this.obj.dob);
                this.$store.dispatch('setAccountProfileDetails', this.obj);
                if(this.obj.head){
                    const payload = {
                        address: this.obj.address,
                        area: this.obj.area,
                    }
                    this.getAllMembers.forEach(element => {
                        console.log('equi', element.id);
                        payload.id = element.id;
                        this.$store.dispatch('setAccountProfileDetails', payload);
                    });
                }
                this.onUpdate = true;
                this.successName = this.editProfile;
                this.editProfile = '';
            }
        },
        deleteMember() {
            this.isActive.value = false;
            console.log('equi', this.obj);
            this.$store.dispatch('deleteMemberProfile', this.obj);
            this.onDelete = true;
            this.deleteMember = this.editProfile;
            this.editProfile = '';
            
        }
    },
    computed: {
        ...mapGetters(['getAllMembers']),
    },
    watch: {
        getAllMembers(value) {
            let keyToExtract = 'name';
            const profileNames = value.map(obj => obj[keyToExtract]);
            keyToExtract = 'id';
            const profileIds = value.map(obj => obj[keyToExtract]);
            console.log('calyx', profileNames)
            this.profileIds = profileIds;
            this.profileNames = profileNames;
        },
        editProfile(value) {
            const selectedProfile = this.getAllMembers.find(obj => obj.name === value);
            this.obj = selectedProfile;
            if(value){
                this.obj.dob = this.obj.dob.split("-").reverse().join("-");
                console.log('calyx', this.obj.dob);
            }
        }
    }

}
</script>

<style scoped>
.prof-img {
    border-radius: 10%;
}
.prof_pic{
    margin-left: 35vw;
}
.prof_pic_text{
    position: absolute;
    left: 13px;
    bottom:0px !important;
    color: blue;
    background-color: white;
    padding-left: 25px;
    padding-right: 25px;
}
</style>