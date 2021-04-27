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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
