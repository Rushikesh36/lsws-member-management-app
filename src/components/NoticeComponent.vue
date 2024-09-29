<template>
    <div>
        <p>Notices</p>
        <div v-for="i in notices" :key="i">
            <v-card :variant="variant" class="mx-auto" color="surface-variant" max-width="344" :subtitle="i.description"
                :title="i.title">
                <template v-slot:actions>
                    <router-link :to="{ name: 'view-document', query: { id: i.url } }"><v-btn text="Open notice"></v-btn></router-link>
                </template>
                <p>{{ i.date }}</p>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.$store.dispatch('getNotices');
    },
    computed: {
        notices() {
            console.log('notices', this.$store.state.notices);
            return this.$store.state.notices;
        }
    }
}
</script>