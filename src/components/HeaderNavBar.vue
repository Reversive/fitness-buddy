<template>
  <nav>
    <v-toolbar flat>
      <img src="../assets/header_logo.png" height="60" class="logo" alt="Fitness Buddy Logo"/>

      <v-toolbar-title class="text-uppercase logo" >
        <span class="font-weight-light grey--text">Fitness</span>
        <span class="black--text">Buddy</span>
      </v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items class="toolbar-items">
        <span class="text-center">
          <v-btn  x-large
                  text
                  :title="menu_items[0].title"
                  @click="$router.push(menu_items[0].route)">
            <v-icon left>
              {{ menu_items[0].icon }}
            </v-icon> {{ menu_items[0].caption }}
          </v-btn>
        </span>

        <CDropDownButton v-bind:payload="menu_items[1]"></CDropDownButton>
        <CDropDownButton v-bind:payload="menu_items[2]"></CDropDownButton>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
</template>

<script>
import DropDownButton from "./DropDownButton";

export default {
  name: "HeaderNavBar",
  data: function () {
    return {
      menu_items: [
        {caption: "Home", title: "Go to the Home Page", route: "/", icon: "mdi-home"},
        {caption: "Routines", title: "Go to the Routines Page", icon: "mdi-dumbbell",
          sub_menu_items: [
            {id: 1, caption: "Community Routines", title: "Go to the Community Routines Page", icon: "mdi-account-group", route: "/community-routines"},
            {id: 2, caption: "Personal Routines", title: "Go to the Personal Routines Page", icon: "mdi-account", route: "/personal-routines"}

          ]},
        {caption: "Profile", title: "Go to the Profile Page", route: "/profile", icon: "mdi-account",
          sub_menu_items: [
            {id: 3, caption: "My Profile", title: "Go to My Profile", icon: "mdi-card-account-details", route: "/profile"},
            {id: 4, caption: "Log Out", title: "Log Out", icon: "mdi-logout", route: "/login"}

          ]}
      ]
    }
  },
  components: {
    CDropDownButton : DropDownButton,

  }
}
</script>

<style scoped>

.logo {
  margin-top: 1em;
  margin-left: 1em;
}

.toolbar-items {
  margin-top: 1.2em;
}

</style>