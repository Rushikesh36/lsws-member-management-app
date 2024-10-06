<template>
    <div>
        <v-card color="primary" title="PROFILE SECTION" class="text-center header-card"></v-card>

        <div class="mt-4 text-center">
            <div class="mr-2">
                <router-link to="/documents">
                    <v-btn prepend-icon="mdi-file-multiple" class="mb-5" color="success">
                        View Documents
                    </v-btn>
                </router-link>
            </div>
            <div class="">
                <router-link to="/settings">
                    <v-btn prepend-icon="mdi-cog" class="mb-5" color="orange">
                        Profile Settings
                    </v-btn>
                </router-link>
            </div>
        </div>

        <div class="commonDetails mb-5">
            <div class="mt-5">
                <v-card>
                    <v-card-title>Address</v-card-title>
                    <v-card-text color="black" class="pb-3">{{ getHeadDetails.address }}</v-card-text>
                    <v-chip class="ma-2" color="blue" label>
                        <h2 class="text-center">{{ getHeadDetails.area }}</h2>
                    </v-chip>
                </v-card>
            </div>
            <div class="mt-5 ">
                <v-card>
                    <v-card-title>Kuldevi</v-card-title>
                    <v-card-subtitle class="pb-3">{{ getHeadDetails.kuldevi }}</v-card-subtitle>
                </v-card>
            </div>
        </div>
        <div class="mb-5 text-center">
            <v-chip class="ma-2" color="primary" label>
                <h2 class="text-center">Family Head</h2>
            </v-chip>
        </div>

        <v-expansion-panels variant="popout" v-model="panel" class="mb-10">
            <v-expansion-panel color="green" value="open">
                <v-expansion-panel-title>
                    {{ getHeadDetails.name }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-list lines="one">
                        <v-list-item>
                                <div class="prof_pic">
                                    <v-img :width="100" class="prof-img text-center" 
                                        aspect-ratio="1/1" cover :src="getHeadDetails.url">
                                    </v-img>
                                </div>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Date of Birth</v-list-item-title>
                            <v-list-item-subtitle>{{ getHeadDetails.dob }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Gender</v-list-item-title>
                            <v-list-item-subtitle>{{ getHeadDetails.gender }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Marital Status</v-list-item-title>
                            <v-list-item-subtitle>{{ getHeadDetails.maritalStatus }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Phone Number</v-list-item-title>
                            <v-list-item-subtitle>{{ getHeadDetails.phoneNumber }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Whatsapp Number</v-list-item-title>
                            <v-list-item-subtitle>{{ getHeadDetails.whatsappNumber }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Email</v-list-item-title>
                            <v-list-item-subtitle>{{ getHeadDetails.email }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Education</v-list-item-title>
                            <v-list-item-subtitle>{{ getHeadDetails.education }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Blood Group</v-list-item-title>
                            <v-list-item-subtitle>{{ getHeadDetails.bloodGroup }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Occupation</v-list-item-title>
                            <v-list-item-subtitle>{{ getHeadDetails.occupation }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Company/Business</v-list-item-title>
                            <v-list-item-subtitle>{{ getHeadDetails.company }}</v-list-item-subtitle>
                        </v-list-item>

                    </v-list>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
        <div class="mb-5 text-center">
            <v-chip class="ma-2" color="primary" label>
                <h2 class="text-center">Family Members</h2>
            </v-chip>
        </div>
        <h3 v-if="getMemberDetails.length === 0" class="text-center">No Family Member Added Yet</h3>
        <v-expansion-panels variant="popout">
            <v-expansion-panel v-for="i in getMemberDetails" :key="i">
                <v-expansion-panel-title>{{ i?.name }}</v-expansion-panel-title>
                <v-expansion-panel-text>
                    <v-list lines="one">
                        <v-list-item>
                                <div class="prof_pic">
                                    <v-img :width="100" class="prof-img text-center" 
                                        aspect-ratio="1/1" cover :src="i?.url">
                                    </v-img>
                                </div>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Date of Birth</v-list-item-title>
                            <v-list-item-subtitle>{{ i?.dob }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Gender</v-list-item-title>
                            <v-list-item-subtitle>{{ i?.gender }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Marital Status</v-list-item-title>
                            <v-list-item-subtitle>{{ i?.maritalStatus }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Phone Number</v-list-item-title>
                            <v-list-item-subtitle>{{ i?.phoneNumber }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Whatsapp Number</v-list-item-title>
                            <v-list-item-subtitle>{{ i?.whatsappNumber }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Email</v-list-item-title>
                            <v-list-item-subtitle>{{ i?.email }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Education</v-list-item-title>
                            <v-list-item-subtitle>{{ i?.education }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Blood Group</v-list-item-title>
                            <v-list-item-subtitle>{{ i?.bloodGroup }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Occupation</v-list-item-title>
                            <v-list-item-subtitle>{{ i?.occupation }}</v-list-item-subtitle>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title>Company/Business</v-list-item-title>
                            <v-list-item-subtitle>{{ i?.company }}</v-list-item-subtitle>
                        </v-list-item>

                    </v-list>
                </v-expansion-panel-text>

            </v-expansion-panel>

        </v-expansion-panels>

        <div class="text-center mt-8">

            <div>

            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            panel: ['open']
        }
    },
    mounted() {
        this.$store.dispatch('getAccountProfileDetails');
    },
    methods: {

    },
    computed: {
        ...mapGetters(['getHeadDetails', 'getMemberDetails']),
    }

}
</script>

<style>
.header-card {
    margin-top: -20px !important;
    margin-left: -20px !important;
    margin-right: -20px;
    border-radius: 0px !important;
}

.commonDetails .v-card-subtitle {
    opacity: unset;
    font-size: 1rem !important;
    font-weight: 400 !important;
}

.commonDetails .v-card-title {
    font-weight: 700 !important;
}

.v-list-item-subtitle {
    opacity: unset !important;
    font-weight: 500;
    font-size: 1.1 !important;
}

.v-list-item-title {
    font-weight: 400;
    font-size: 1.15rem !important;
}

.v-expansion-panel-title {
    font-size: 1.15rem !important;
    font-weight: 700;
}
.prof-img {
    border-radius: 10%;
}
.prof_pic{
    margin-left: 25vw;
}

</style>