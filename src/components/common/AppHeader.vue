<template>
  <div class="d-flex align-center w-100 justify-space-between">
    <div>
      <PageTitle />
    </div>
    <div class="d-flex align-center">
      <v-text-field
        hide-details
        variant="outlined"
        label="Search here..."
        prepend-inner-icon="mdi-magnify"
        density="compact"
        class="search-field mr-4"
        color="primary"
        bg-color="grey-lighten-4"
      ></v-text-field>

      <v-btn icon class="mx-1" color="default" variant="text">
        <v-icon>mdi-flag-outline</v-icon>
      </v-btn>

      <v-btn icon class="mx-1" color="default" variant="text">
        <v-icon>mdi-weather-sunny</v-icon>
      </v-btn>

      <v-btn icon class="mx-1" color="default" variant="text">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <HeaderAvatar />
    </div>
  </div>
</template>

<script setup>
import HeaderAvatar from "@/components/common/HeaderAvatar.vue";
import PageTitle from "@/components/common/PageTitle.vue";
// Component logic if needed
</script>

<style scoped>
.search-field {
  max-width: 300px;
}
</style>
