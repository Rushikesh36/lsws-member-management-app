<template>
    <v-card color="primary" title="कार्यकारणी (२०२१ - २०२३)" class="text-center header-card"></v-card>
    <div class="mt-12"></div>
    <div class="text-center">
        <v-card>
            <v-list lines="two">
                <v-list-item v-for="i in memberList" :key="i" :title="i.name" :subtitle="i.position">
                    <hr>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            memberList: [
                {
                    name: "विहार किशोर मराठे",
                    position: "अध्यक्ष"
                },
                {
                    name: "केशव शांताराम चिंचोले",
                    position: "उपाध्यक्ष"
                },
                {
                    name: "राजू पुंडलिक कोतकर",
                    position: "सचिव"
                },
                {
                    name: "तुषार अशोक मराठे",
                    position: "सह सचिव"
                },
                {
                    name: "हेमंत प्रभाकर अमृतकर",
                    position: "खजिनदार"
                },
                {
                    name: "प्रतिक अनिल शिरूडे",
                    position: "सह खजिनदार"
                },
                {
                    name: "महेश भालचंद्र येवले",
                    position: "सदस्य"
                },
                {
                    name: "प्रमोद काशिनाथ लाड",
                    position: "सदस्य"
                },
                {
                    name: "आतिश एकनाथ बाविस्कर",
                    position: "सदस्य"
                },
                {
                    name: "महेश सुभाष शिरूडे",
                    position: "सदस्य"
                },
                {
                    name: "किरण रघुनाथ वझरे",
                    position: "सदस्य"
                },
                {
                    name: "ऋषिकेश शरद अमृतकर",
                    position: "सदस्य"
                },
                {
                    name: "प्रथमेश सुनिल येवले",
                    position: "सदस्य"
                },
            ]

        }
    }
}
</script>
<style scoped>
li {
    font-size: 25px;
    font-weight: 500;
    padding-top: 10px;
    list-style: none;
}
</style>