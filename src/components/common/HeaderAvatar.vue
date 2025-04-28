<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    location="bottom end"
    offset="10"
  >
    <template v-slot:activator="{ props }">
      <v-avatar class="ml-3 cursor-pointer" size="40" v-bind="props">
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-avatar>
    </template>

    <v-card min-width="200" elevation="1">
      <div class="pa-4 pb-2 d-flex align-center">
        <v-avatar size="42" class="mr-3">
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-avatar>

        <div>
          <div class="font-weight-medium">William Martin</div>
          <div class="text-caption text-medium-emphasis">
            Front End Developer
          </div>
        </div>
      </div>

      <v-divider class="mb-2"></v-divider>

      <v-list density="compact" nav class="pa-0">
        <v-list-item
          prepend-icon="mdi-account-outline"
          title="Profile"
        ></v-list-item>
        <v-list-item prepend-icon="mdi-cash" title="Earning"></v-list-item>
      </v-list>

      <v-divider class="my-2"></v-divider>

      <v-list density="compact" nav class="pa-0">
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          color="error"
          class="px-4"
          @click="handleLogout"
        ></v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/lib/supabaseClient";

const router = useRouter();
const menu = ref(false);

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Only redirect after successful logout
    router.push("/login");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
</script>
