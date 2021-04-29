<template>
  <div id="app">
    <v-app>
      <CHeaderNavBar />
      <v-main>
        <router-view>
          <CCommunityRoutines/>
        </router-view>
      </v-main>
      <CFooter/>
    </v-app>
  </div>
</template>



<script>
  import CommunityRoutines from "./views/CommunityRoutines";
  import Footer from "./components/Footer";
  import HeaderNavBar from "./components/HeaderNavBar";
  export default {
    name: 'App',
    components: {
      CFooter : Footer,
      CHeaderNavBar : HeaderNavBar,
      CCommunityRoutines: CommunityRoutines,
    }
  }
</script>



<style lang="scss">
#app {

  font-family: 'Open Sans', sans-serif;
}

</style>
