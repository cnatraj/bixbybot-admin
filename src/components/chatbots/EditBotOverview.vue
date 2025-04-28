<template>
  <h6 class="text-h6">Chatbot Name</h6>
  <div class="form-label my-2">
    Set a unique name and watch your AI Chatbot update on the right side of the
    screen.
  </div>
  <v-text-field block v-model="botName" class="mt-6"></v-text-field>

  <h6 class="text-h6">Chatbot Installation Code</h6>
  <div class="form-label my-2">
    This code will add your Chatbot to your website. You can add it to the
    footer of your website or use a tag manager.
  </div>
  <div class="pa-4 border-sm rounded-lg text-secondary">
    {{ widgetCode }}
  </div>
  <div>
    <v-btn
      color="secondary"
      size="small"
      prepend-icon="mdi-content-copy"
      class="mt-2"
      @click="copyCode"
      :loading="copying"
      >Copy Code</v-btn
    >
    <span class="ml-2 text-body-2 copyResult">{{ copyResult }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBotStore } from "@/stores/botStore";

const route = useRoute();
const botStore = useBotStore();
const botId = route.params.botId;
const widgetCode = `<script type="module" src="https://kmztjgixkokzhnxczhpk.netlify.app/bixby-widget.js" data-client-id="${botId}"><\/script>`;
const botName = ref("");
const copyResult = ref("");
const copying = ref(false);

const getOverview = () => {
  try {
    console.log("Fetching bot overview...");
    const botData = botStore.getBotById(botId);
    if (!botData) {
      throw new Error("Bot not found");
    }

    botName.value = botData.name;
  } catch (error) {
    console.error("Error fetching bot data:", error);
  }
};

const copyCode = async () => {
  copying.value = true;
  try {
    await navigator.clipboard.writeText(widgetCode);
    copyResult.value = "Code copied to clipboard!";
    setTimeout(() => {
      copyResult.value = "";
    }, 2000);
  } catch (error) {
    console.error("Failed to copy code:", error);
    copyResult.value = "Failed to copy code.";
    setTimeout(() => {
      copyResult.value = "";
    }, 2000);
  } finally {
    copying.value = false;
  }
};

onMounted(() => {
  getOverview();
});
</script>
