<template>
  <v-app-bar
             height="80px"
             flat
             hide-on-scroll
             app
             color="#6F2DBD">

    <v-app-bar-nav-icon class="pl-10 ml-10">
      <v-img src="../assets/test.png"
             alt="Fitness Buddy Logo" contain height="60px"/>
    </v-app-bar-nav-icon>
    <span class="text-uppercase pl-9 font-weight-bold">
      <span class="white--text">Fitness </span>
      <span class="white--text">Buddy</span>
    </span>
    <v-spacer/>
    <v-toolbar-items class="toolbar-items justify-center align-center">
      <CTopIconButton v-bind:payload="menu_items[0]"/>
      <CTopIconButton v-bind:payload="menu_items[1]"/>
      <CDropDownButton v-bind:payload="menu_items[2]"/>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import DropDownButton from "./DropDownButton";
import TopIconTextButton from "./TopIconTextButton";
export default {
  name: "HeaderNavBar",
  data: function () {
    return {
      menu_items: [
        {caption: "COMMUNITY ROUTINES", title: "Go to the Community Routines Page", icon: "mdi-account-group", route: "/community-routines" },
        {caption: "MY ROUTINES", title: "Go to the Personal Routines Page", icon: "mdi-clipboard-account-outline", route: "/personal-routines"},
        {caption: "", title: "Go to the Profile Page", route: "/profile", icon: "mdi-account-circle",
          sub_menu_items: [
            {id: 2, caption: "CREATE ROUTINE", title: "Go to the Create Routine Page", icon: "mdi-clipboard-text", route: "/create-routine"},
            {id: 3, caption: "MY PROFILE", title: "Go to My Profile", icon: "mdi-card-account-details", route: "/profile"},
            {id: 4, caption: "LOG OUT", title: "Log Out", icon: "mdi-logout", route: "/"}

          ]}
      ]
    }
  },
  components: {
    CDropDownButton : DropDownButton,
    CTopIconButton : TopIconTextButton
  }
}
</script>

<style scoped>

 span {
   font-family: 'Open Sans', sans-serif;
   font-size: large;
 }

</style>