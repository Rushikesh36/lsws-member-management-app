<template>
    <v-card color="primary" title="UPLOAD DOCUMENTS" class="text-center header-card"></v-card>

    <div class="text-center upload-document">       
        <router-link to="/upload/result">
            <v-btn prepend-icon="mdi-school" class="mb-5 mt-8" color="success"> Result Upload </v-btn>
        </router-link>
        <router-link to="/upload/document">
            <v-btn prepend-icon="mdi-file-multiple" color="indigo"> Upload Other Documents </v-btn>            
        </router-link>
        <router-link to="/upload/receipt">
            <v-btn prepend-icon="mdi-receipt" class="mb-16 mt-5" color="info"> Upload Transaction Receipt </v-btn>
        </router-link>
    </div>
</template>

<style>
    .upload-document{
        margin-top: 15vh;
    }
</style>
