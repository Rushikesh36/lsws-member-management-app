<template>
    <v-card color="primary" title="PAYMENT DETAILS" class="text-center header-card"></v-card>
    <div class="mt-5"></div>
    <div>
        <h2 class="text-center mb-5">Netbanking Details</h2>
        <v-card>

            <v-list lines="one">
                <v-list-item>
                    <v-list-item-title>Bank Name</v-list-item-title>
                    <v-list-item-subtitle>Dombivli Nagari Sahakari Bank</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Branch</v-list-item-title>
                    <v-list-item-subtitle>Ambernath</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>Account No.</v-list-item-title>
                    <v-list-item-subtitle>007010100008964</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                    <v-list-item-title>IFSC CODE</v-list-item-title>
                    <v-list-item-subtitle>DNSB0000007</v-list-item-subtitle>
                </v-list-item>
            </v-list>
        </v-card>

        <h2 class="text-center mt-5 mb-5">QR Code</h2>
        <v-img
            src="https://res.cloudinary.com/day9yxxz0/image/upload/v1697477079/Payment%20Details/codtasouiblsze6krign.jpg"></v-img>
        
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.v-list-item-subtitle {
    opacity: unset !important;
    font-weight: 400;
    font-size: 1.15rem !important;
}

.v-list-item-title {
    font-weight: 600;
    font-size: 1.25rem !important;
}
</style>