<template>
    <div class="table">
        <v-img
            lazy-src="https://firebasestorage.googleapis.com/v0/b/wani-samaj.appspot.com/o/Screenshot%202023-10-07%20104513.png?alt=media&token=7015725f-6312-4861-929e-107904b275db&_gl=1*6iv9di*_ga*MTA0NTAyMzc1LjE2OTYyNjQ4Njc.*_ga_CW55HF8NVT*MTY5NjY1NjAxMy4xMS4xLjE2OTY2NTYzNTkuNTIuMC4w"
            src="https://firebasestorage.googleapis.com/v0/b/wani-samaj.appspot.com/o/Screenshot%202023-10-07%20104513.png?alt=media&token=7015725f-6312-4861-929e-107904b275db&_gl=1*6iv9di*_ga*MTA0NTAyMzc1LjE2OTYyNjQ4Njc.*_ga_CW55HF8NVT*MTY5NjY1NjAxMy4xMS4xLjE2OTY2NTYzNTkuNTIuMC4w">
        </v-img>
        <hr>
        <div class="ml-5">
            <h5 class="mt-2">पावती क्रमांक : {{ getTemplateReceipt.receiptNumber }}</h5>
            <h5 class="mt-2">दिनांक : {{ getTemplateReceipt.approvedDate }}</h5>
            <h5 class="mt-2">नाव : {{ getTemplateReceipt.profile.name }}</h5>
            <h5 class="mt-2">पेमेंट मोड : {{ getTemplateReceipt.paymentMode }}</h5>
        </div>
        <v-table v-if="getTemplateReceipt" class="text-center">
            <thead>
                <tr>
                    <th class="text-center">
                        अ.क.
                    </th>
                    <th class="text-center">
                        तपशील
                    </th>
                    <th class="text-center">
                        रक्कम
                    </th>
                </tr>
                <hr>
            </thead>
            
            <tbody>
                <tr>
                    <td>1</td>
                    <td>वार्षिक वर्गणी</td>
                    <td>{{ getTemplateReceipt.vargani }}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>सभासद नोंदणी शुल्क</td>
                    <td>{{ getTemplateReceipt.shulk }}</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>पुरस्कृत रक्कम</td>
                    <td>{{ getTemplateReceipt.purskrut_rakkam }}</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>विशेष बक्षीस</td>
                    <td>{{ getTemplateReceipt.vishesh_bakshish }}</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>विशेष देणगी</td>
                    <td>{{ getTemplateReceipt.dengi }}</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>भोजन खर्च पुरस्कृत</td>
                    <td>{{ getTemplateReceipt.bhojan }}</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>नवविवाहित देणगी</td>
                    <td>{{ getTemplateReceipt.navvivahit }}</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>स्मरणार्थ देणगी</td>
                    <td>{{ getTemplateReceipt.smarnarth_dengi }}</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>इतर</td>
                    <td>{{ getTemplateReceipt.others }}</td>
                </tr>
                <hr>
                <tr>
                    <td></td>
                    <td>एकूण</td>
                    <td>{{ getTemplateReceipt.total }}</td>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>
export default {

    data() {
        return {
            details: {

            }
        }
    },
    created() {
        this.$store.dispatch('getOneReceipt', this.$route.query.id);
    },
    methods: {

    },
    computed: {
        getTemplateReceipt() {
            return this.$store.state.templateReceipt;
        }
    }
}
</script>

<style scoped>
td {
    border-right: 1px solid black;
    border-left: 1px solid black;
    color: orange !important;
}
th{
    border-right: 1px solid black;
    border-left: 1px solid black;
    border-top: 1px solid black;
}

.table {
    color: orange !important;
    border: 1px solid black;
}

h5 {
    color: #000 !important;
}

hr{
    color:#000 !important;
    font-size: 100px;
}
</style>