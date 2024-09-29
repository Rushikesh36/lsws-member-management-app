<template>
    <div>
        <v-card color="primary" title="NOTICES" class="text-center header-card mb-5"></v-card>
        <div v-for="i in notices" :key="i">
            <v-card :variant="elevated" class="mx-auto" color="#d5def5" max-width="344">
                <div class="notice">
                    <p class="title">{{ i.title }}</p>
                    <p class="desc">{{ i.description }}</p>
                    <p class="date">दिनांक - {{ i.date }}</p>
                </div>
                <div class="text-center pb-5">
                    <router-link :to="{ name: 'view-document', query: { id: i.url } }"><v-btn text="Open notice"></v-btn></router-link>
                </div>
              

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

<style>
.notice .title{
    text-align: center;
    font-size: 1.5rem;
    font-weight: 600;
    padding-top: 10px;
}
.notice .desc {
    padding: 2.5%;
    font-size: 1.15rem;
    font-weight: 400;
}
.notice .date{
    padding: 2.5%;
    font-size: 1.15rem;
    font-weight: 400;
}
</style>