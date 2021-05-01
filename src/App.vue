<template>
  <div id="app">
    <v-app>
      <CHeaderNavBar v-if="this.$router.currentRoute.name !== 'login'" />
      <v-main>
        <router-view>
          <CLogin v-if="this.$router.currentRoute.name === 'login'"/>
          <CCommunityRoutines v-if="this.$router.currentRoute.name !== 'login'"/>
        </router-view>
      </v-main>
      <CFooter v-if="this.$router.currentRoute.name !== 'login'"/>
    </v-app>
  </div>
</template>



<script>
  import CommunityRoutines from "./views/CommunityRoutines";
  import Footer from "./components/Footer";
  import HeaderNavBar from "./components/HeaderNavBar";
  import Login from "./views/Login";
  export default {
    name: 'App',
    components: {
      CFooter : Footer,
      CHeaderNavBar : HeaderNavBar,
      CCommunityRoutines: CommunityRoutines,
      CLogin: Login
    },
    data: () => {
      return {
      }
    }
  }
</script>



<style lang="scss">
#app {

  font-family: 'Open Sans', sans-serif;
}

</style>
