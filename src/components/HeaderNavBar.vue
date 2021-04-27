<template>
  <v-app-bar app
             fixed
             height="80px"
             flat
             class="light-blue darken-1">

    <v-app-bar-nav-icon class="justify-center align-center pl-9 ml-7">
      <v-img src="../assets/header_logo.png"
             alt="Fitness Buddy Logo" contain height="60px"/>
    </v-app-bar-nav-icon>
    <span class="text-uppercase pl-9">
      <span class="font-weight-light white--text">Fitness</span>
      <span class="black--text">Buddy</span>
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
        {caption: "ROUTINES", title: "Go to the Community Routines Page", icon: "mdi-account-group", route: "/community-routines" },
        {caption: "CREATE ROUTINE", tile: "Go to the routine creation page", icon: "mdi-clipboard-text", route: "/create-routine"},
        {caption: "", title: "Go to the Profile Page", route: "/profile", icon: "mdi-account-circle",
          sub_menu_items: [
            {id: 2, caption: "MY ROUTINES", title: "Go to the Personal Routines Page", icon: "mdi-account", route: "/personal-routines"},
            {id: 3, caption: "MY PROFILE", title: "Go to My Profile", icon: "mdi-card-account-details", route: "/profile"},
            {id: 4, caption: "LOG OUT", title: "Log Out", icon: "mdi-logout", route: "/login"}

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


</style>