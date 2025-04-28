<template>
  <v-app>
    <SidebarNavigation />
    <v-main>
      <v-container class="px-6">
        <AppHeader />
        <div class="py-4">
          <router-view></router-view>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import SidebarNavigation from "@/components/common/SidebarNavigation.vue";
import AppHeader from "@/components/common/AppHeader.vue";
</script>
