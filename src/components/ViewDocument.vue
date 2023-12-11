<template>
    <div class="elevation-24 mt-16">
        <v-img :width="width" aspect-ratio="16/9" cover :src="imgSrc"></v-img>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        imgSrc() {
            return this.$route.query.id;
        },
        width() {
            if(window){
                return window.innerWidth;
            }
            return '300px';
        }
    }

}
</script>

