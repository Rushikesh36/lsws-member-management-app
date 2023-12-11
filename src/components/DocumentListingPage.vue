<template>
    <v-card color="primary" title="UPLOADED DOCUMENTS" class="text-center header-card"></v-card>
    <router-link to="/upload">
        <div class="text-center mt-8">
            <v-btn prepend-icon="mdi-file-upload" class="mb-6" color="success">
                Add a Document
            </v-btn>
        </div>
    </router-link>

    <v-select v-model="selectedYear" :items="yearArray"></v-select>

    <div class="text-center mb-4">
        <v-chip class="ma-2" color="indigo" label text-color="white">Documents</v-chip>
    </div>
    
    <div v-if="getAllDocs.length == 0" class="no_docs">No Documents Uploaded</div>
    <div v-else><v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="item in getAllDocs" :key="item" :title="item.title">
                <v-expansion-panel-text>
                    <v-list lines="one">
                        <v-list-item>
                            <router-link :to="{ name: 'view-document', query: { id: item.url } }">
                                <v-list-item-title>
                                    View Document
                                    <v-icon icon="mdi-eye">

                                    </v-icon>
                                </v-list-item-title>
                            </router-link>
                        </v-list-item>
                        <v-list-item title="Date Uploaded" :subtitle="item.date">
                        </v-list-item>
                        <v-list-item title="Description" :subtitle="item.description">
                        </v-list-item>
                        <v-list-item>
                            <button @click="deleteDoc(item.id)">
                                <v-list-item-title class="deleteDocument">
                                    Delete Document
                                    <v-icon icon="mdi-delete">

                                    </v-icon>
                                </v-list-item-title>
                            </button>

                        </v-list-item>
                    </v-list>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
    <div class="mt-5"></div>
    <hr />
    <div class="text-center mb-4 mt-4">
        <v-chip class="ma-2" color="info" label text-color="white">Results</v-chip>
    </div>
    <div v-if="getAllResult.length == 0" class="no_docs">No Results Uploaded</div>
    <div v-else>
        <v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="item in getAllResult" :key="item" :title="`Date Uploaded: ${item.date}`">
                <v-expansion-panel-text>
                    <v-list lines="one">
                        <v-list-item>
                            <router-link :to="{ name: 'view-document', query: { id: item.url } }">
                                <v-list-item-title>
                                    View Document
                                    <v-icon icon="mdi-eye">

                                    </v-icon>
                                </v-list-item-title>
                            </router-link>
                        </v-list-item>
                        <v-list-item title="Name" :subtitle="item.name">
                        </v-list-item>
                        <v-list-item title="Standard" :subtitle="item.grade">
                        </v-list-item>
                        <v-list-item title="Marks" :subtitle="item.marks">
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title class="deleteDocument" @click="deleteDoc(item.id)">
                                Delete Document
                                <v-icon icon="mdi-delete">

                                </v-icon>
                            </v-list-item-title>

                        </v-list-item>
                    </v-list>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
    <div class="mt-5"></div>
    <hr />
    <div class="text-center mb-4 mt-4">
        <v-chip class="ma-2 " color="purple" label text-color="white">Receipts</v-chip>
    </div>
    <div v-if="getAllReceipt == 0" class="no_docs">No Receipts Uploaded</div>
    <div v-else>
        <v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="item in getAllReceipt" :key="item" :title="`Date Uploaded: ${item.date}`">
                <v-expansion-panel-text>
                    <v-list lines="one">
                        <v-list-item v-if="item.approved==true">
                            <router-link :to="{ name: 'document-receipt', query: { id: item.id } }">
                                <v-list-item-title>
                                    View Document
                                    <v-icon icon="mdi-eye">

                                    </v-icon>
                                </v-list-item-title>

                            </router-link>
                        </v-list-item>
                        <v-btn color="red" v-if="item.approved === false">Rejected</v-btn>
                        <v-list-item v-if="item.rejectionMessage!=''" title="Rejection Reason" :subtitle="item.rejectionMessage">
                        </v-list-item>
                        <v-btn color="green" v-if="item.approved == true">Approved on {{ item.approvedDate }}</v-btn>
                        <v-btn color="yellow" v-if="item.approved === 'none'">Waiting for Approval</v-btn>
                        <v-list-item v-if="item.approved === 'none'">
                            <v-list-item-title>
                                You will receive Receipt within 7
                                <br>
                                days.
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item title="Mode of Payment" :subtitle="item.paymentMode">
                        </v-list-item>
                        <v-list-item v-if="item.paymentInfo != ''" title="Payment Information" :subtitle="item.paymentInfo">
                        </v-list-item>
                        <v-list-item title="Uploaded By" :subtitle="item.requestedBy">
                        </v-list-item>
                        <v-list-item title="Total amount paid" :subtitle="item.total">
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title v-if="item.approved == 'none'" class="deleteDocument" @click="deleteDoc(item.id)">
                                Delete Document
                                <v-icon icon="mdi-delete">

                                </v-icon>
                            </v-list-item-title>

                        </v-list-item>
                    </v-list>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            selectedYear: '',
            yearArray: [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        }
    },
    mounted() {
        const currentDate = new Date();
        this.selectedYear = currentDate.getFullYear();
        this.$store.dispatch('getAccountProfileDetails');
        this.$store.dispatch('getAllDocuments',this.selectedYear);
        this.$store.dispatch('getAllReceipt',this.selectedYear);
        this.$store.dispatch('getAllResult',this.selectedYear);
    },
    methods: {
        deleteDoc(id) {
            console.log('calyx', id);
            this.$store.dispatch('deleteDoc', id);
            this.$store.dispatch('getAllDocuments',this.selectedYear);
            this.$store.dispatch('getAllReceipt',this.selectedYear);
            this.$store.dispatch('getAllResult',this.selectedYear);
        }
    },
    computed: {
        ...mapGetters(['getAllDocs', 'getAllReceipt', 'getAllResult']),
    },
    watch: {
        selectedYear(value) {
            this.$store.dispatch('getAllDocuments',value);
            this.$store.dispatch('getAllReceipt',value);
            this.$store.dispatch('getAllResult',value);
        }
    }
}
</script>

<style scoped>
a {
    text-decoration: none;
    color: blue;
}

.v-chip {
    font-size: 1.2rem !important;
}

.deleteDocument {
    color: red !important;
}

.no_docs {
    color: red !important;
    text-align: center !important;
}</style>