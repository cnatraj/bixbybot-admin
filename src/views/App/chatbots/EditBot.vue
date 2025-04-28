<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-item v-if="loading">
          <div class="pa-8 text-center">
            <v-progress-circular
              color="primary"
              indeterminate
            ></v-progress-circular>
            <div class="mt-4 text-caption text-medium-emphasis">
              Loading Bot Details
            </div>
          </div>
        </v-card-item>

        <!-- Error Box-->
        <v-card-item v-if="error">
          <div class="pa-8 text-center">
            <v-icon
              icon="mdi-alert-outline"
              color="danger"
              size="large"
            ></v-icon>
            <div class="mt-4 text-danger">
              {{ error }}
            </div>
            <v-btn @click="fetchBotDetails">Load Bot Details</v-btn>
          </div>
        </v-card-item>

        <!-- Show the tabs after data has loaded -->
        <v-card-item v-if="dataLoaded">
          <v-tabs
            v-model="activeTab"
            color="primary"
            align-tabs="start"
            class="border-b-sm"
          >
            <v-tab v-for="tab in tabs" :key="tab" size="small">{{ tab }}</v-tab>
          </v-tabs>

          <v-window v-model="activeTab" class="mt-6">
            <v-window-item value="Overview">
              <edit-bot-overview />
            </v-window-item>

            <v-window-item value="Knowledge">
              <edit-bot-knowledge />
            </v-window-item>

            <v-window-item value="Leads">
              <edit-bot-leads />
            </v-window-item>

            <v-window-item value="Settings">
              <edit-bot-settings />
            </v-window-item>
          </v-window>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBotStore } from "@/stores/botStore";

import EditBotOverview from "@/components/chatbots/EditBotOverview.vue";
import EditBotKnowledge from "@/components/chatbots/EditBotKnowledge.vue";
import EditBotLeads from "@/components/chatbots/EditBotLeads.vue";
import EditBotSettings from "@/components/chatbots/EditBotSettings.vue";

const route = useRoute();
const botStore = useBotStore();
const activeTab = ref("Overview");
const tabs = ["Overview", "Knowledge", "Leads", "Settings"];
const loading = ref(false);
const dataLoaded = ref(false);
const error = ref(null);

const fetchBotDetails = async () => {
  // Fetch bot details from the API
  try {
    loading.value = true;
    error.value = null;

    // First ensure we have the bots loaded in the store
    if (!botStore.bots.length) {
      await botStore.fetchBots();
    }
    dataLoaded.value = true;
  } catch (error) {
    console.error("Error fetching bot details:", error);
    error.value = "Failed to load bot details. Please try again.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchBotDetails();
});
</script>

<style scoped></style>
