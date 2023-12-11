<template>
    <v-card color="primary" title="PROFILE SETTINGS" class="text-center header-card"></v-card>
    <div class="text-center prof-settings">
        <router-link to="/edit">
            <v-btn prepend-icon="mdi-account-edit" class="mb-5" color="indigo">
                Edit Profile
            </v-btn>
        </router-link>
        <br>
        <router-link to="/addMember">
            <v-btn prepend-icon="mdi-account-plus" color="indigo" class="mb-5">
                Add Member
            </v-btn>
        </router-link>
        <router-link to="/changePassword">
            <v-btn prepend-icon="mdi-key" color="indigo" class="mb-5">
                Change Password
            </v-btn>
        </router-link>
        <router-link to="/changehead">
            <v-btn prepend-icon="mdi-pencil" color="indigo" class="mb-5">
                Change Family Head
            </v-btn>
        </router-link>


    </div>
    
</template>
<script>

</script>

<style>
.prof-settings {
    margin-top: 15vh;
}
</style>
