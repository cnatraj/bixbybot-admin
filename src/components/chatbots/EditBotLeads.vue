<template>
  <h6 class="text-h6">Lead Capture</h6>
  <div class="form-label my-2">
    These are the fields that your Chatbot will use to capture leads.
  </div>
  <div class="form-label my-2">We recommend keeping it to 3–4 fields.</div>

  <div>
    <v-text-field
      block
      v-for="(field, index) in fields"
      :key="index"
      density="compact"
      hide-details="auto"
      class="mt-2"
      v-model="fields[index]"
    ></v-text-field>

    <v-btn
      variant="text"
      prepend-icon="mdi-plus"
      color="info"
      size="small"
      @click="fields.push('')"
    >
      Add another Field</v-btn
    >
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useBotStore } from "@/stores/botStore";

const route = useRoute();
const botStore = useBotStore();
const botId = route.params.botId;
const fields = ref([]);

const getLeads = () => {
  try {
    const botData = botStore.getBotById(botId);
    if (!botData) {
      throw new Error("Bot not found");
    }
    fields.value = botData.lead_fields.fields;
    console.log("Bot Data:", fields.value);
  } catch (error) {
    console.error("Error fetching bot data:", error);
  }
};

onMounted(() => {
  getLeads();
});
</script>
