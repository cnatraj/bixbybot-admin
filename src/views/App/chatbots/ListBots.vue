<template>
  <v-container>
    <!--- Loading State-->
    <v-row v-if="botStore.loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card
          color="background border-md border-dashed cursor-pointer"
          @click="router.push({ name: 'CreateChatbot' })"
        >
          <v-card-text
            class="d-flex flex-column align-center justify-center fill-height"
          >
            <v-icon size="48" color="secondary" class="mb-4">
              mdi-plus-circle-outline
            </v-icon>
            <v-card-title class="text-secondary">Add Chatbot</v-card-title>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        v-for="bot in filteredBots"
        :key="bot.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <BotCard :bot="bot" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useBotStore } from "@/stores/botStore";
import BotCard from "@/components/cards/BotCard.vue";

const router = useRouter();
const botStore = useBotStore();
const search = ref("");

onMounted(() => {
  botStore.fetchBots();
});

const filteredBots = computed(() => {
  if (!search.value) return botStore.bots;
});
</script>

<style scoped></style>
