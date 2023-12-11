<template>
  <div>
    <router-view></router-view>
    <Footer v-if="$store.state.isAuthenticated"/>
  </div>
</template>

<script>
import Footer from './components/FooterComponent.vue';

  export default {
    data(){ return{
      
    }},
    components: {
      Footer,
    },
    methods: {
      
    },
    computed: {

    },
    watch: {
   
    }
  }
</script>



<style>
#app {
  justify-content: center;
  /* Horizontal centering */
  margin: 20px;
  /* Add margin around the content */
}
</style>
