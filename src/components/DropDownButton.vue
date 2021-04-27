<template>
  <span class="text-center">
    <v-menu
        open-on-hover
        offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            x-large
            class="white--text"
            text
            v-bind="attrs"
            v-on="on"
        >
          <v-icon left large>
            {{ payload.icon }}
          </v-icon> {{ payload.caption }} <v-icon> mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
            v-for="item in payload.sub_menu_items"
            :key="item.id"
        >
          <v-btn  :title="item.title"
                  @click="$router.push(item.route)"
                  text
          >
            <v-icon left >
              {{ item.icon }}
            </v-icon> {{ item.caption }}
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </span>
</template>

<script>
export default {
  name: "DropDownButton",
  props: {
    payload: Object
  }
}
</script>

<style scoped>

</style>