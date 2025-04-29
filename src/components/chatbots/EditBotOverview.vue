<template>
  <h6 class="text-h6">Chatbot Name</h6>
  <div class="form-label my-2">
    Set a unique name and watch your AI Chatbot update on the right side of the
    screen.
  </div>
  <v-text-field block v-model="botName" class="mt-6"></v-text-field>

  <h6 class="text-h6">Chatbot Widget Colors</h6>
  <div class="form-label my-2">Customize your bot to your brand's colors</div>
  <div class="d-flex pa-2">
    <div
      class="colorBox mr-2"
      :style="{ backgroundColor: backgroundColor }"
      @click.prevent="showColorPicker = true"
    ></div>

    <v-color-picker
      v-if="showColorPicker"
      v-model="backgroundColor"
      mode="hex"
    ></v-color-picker>
  </div>

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
const widgetCode = `
  <!-- Bixby Chatbot Widget -->
  <script type="module" src="https://chat.bixbybot.com/bixby-widget.iife.js" data-bot-id="${botId}"><\/script>
  <!-- Bixby Chatbot Widget -->
  `;
const botName = ref("");
const backgroundColor = ref(null);
const copyResult = ref("");
const copying = ref(false);
const showColorPicker = ref(false);

const getOverview = () => {
  try {
    console.log("Fetching bot overview...");
    const botData = botStore.getBotById(botId);
    if (!botData) {
      throw new Error("Bot not found");
    }

    botName.value = botData.name;
    backgroundColor.value = botData.appearance.primaryColor;
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

<style scoped>
.colorBox {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  transition: transform 0.2s ease;
  cursor: pointer;
}
</style>
