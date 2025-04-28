<template>
  <h6 class="text-h6">Welcome Message</h6>
  <div class="form-label my-2">
    This is the first message your visitors will see when they start interacting
    with the bot.
  </div>

  <v-text-field
    block
    v-model="greeting"
    density="compact"
    hide-details="auto"
    class="mt-2"
  ></v-text-field>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useBotStore } from "@/stores/botStore";

const route = useRoute();
const botStore = useBotStore();
const botId = route.params.botId;
const greeting = ref("");

const getDetails = () => {
  try {
    const botData = botStore.getBotById(botId);
    if (!botData) {
      throw new Error("Bot not found");
    }
    greeting.value = botData.personality.greeting;
  } catch (error) {
    console.error("Error fetching bot data:", error);
  }
};

onMounted(() => {
  getDetails();
});
</script>
