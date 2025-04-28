<template>
  <v-navigation-drawer
    permanent
    color="white"
    width="240"
    elevation="1"
    class="sidebar"
  >
    <div class="pa-4 d-flex align-center">
      <Logo />
    </div>

    <div class="category-header">MAIN MENU</div>
    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, i) in mainMenuItems"
        :key="i"
        :prepend-icon="item.icon"
        :title="item.title"
        :class="['nav-item', i === 0 ? 'active' : '']"
        :to="item.path"
        rounded="lg"
        class="mb-1 mx-2"
      >
      </v-list-item>
    </v-list>

    <!-- <template #append>
      <div class="pa-4 bg-surface-variant rounded-lg ma-2">
        <div class="d-flex align-center mb-2">
          <v-avatar color="primary" size="36" class="mr-2">
            <v-icon color="white" icon="mdi-leaf"></v-icon>
          </v-avatar>
          <div>
            <div class="text-subtitle-1 font-weight-medium">Mannat Themes</div>
            <div class="text-caption text-medium-emphasis">Rizz is a high quality web applications.</div>
          </div>
        </div>
        <v-btn 
          color="primary" 
          variant="tonal" 
          block
        >
          Upgrade your plan
        </v-btn>
      </div>
    </template> -->
  </v-navigation-drawer>
</template>

<script setup>
import Logo from "@/components/common/Logo.vue";

const mainMenuItems = [
  { title: "Home", icon: "mdi-home-outline", path: "/" },
  { title: "Conversations", icon: "mdi-chat-outline", path: "/conversations" },
  { title: "Chat Bots", icon: "mdi-robot-outline", path: "/chatbots" },
  { title: "Reports", icon: "mdi-chart-line", path: "/reports" },
];
</script>
