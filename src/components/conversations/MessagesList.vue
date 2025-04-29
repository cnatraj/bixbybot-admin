<template>
  <v-card class="fill-height">
    <v-card-title>
      <v-select
        :items="bots"
        v-model="selectedBot"
        item-title="name"
        item-value="id"
        hide-details="auto"
        label="Select a bot"
        density="compact"
        variant="outlined"
        @update:model-value="fetchConversations"
      ></v-select>
    </v-card-title>
    <v-card-item v-if="loadingConversation" class="pa-8 text-center">
      <v-progress-circular color="primary" indeterminate></v-progress-circular>
      <div class="mt-4 text-caption text-medium-emphasis">
        Loading Conversations
      </div>
    </v-card-item>
    <v-card-item v-else-if="error" class="pa-8 text-center text-body-2">
      <v-icon icon="mdi-alert-outline" color="danger" size="large"></v-icon>
      <div class="mt-4 text-danger">Error loading conversations</div>
      <v-btn @click="fetchConversations(selectedBot.id)" class="mt-4"
        >Please try again.</v-btn
      >
    </v-card-item>
    <v-card-item v-else>
      <ConversationPreviewCard
        v-for="conversation in groupedConversations"
        :conversation="conversation"
        :key="conversation.thread_id"
        class="conversation-preview-card"
        :class="{
          active: selectedConversation?.thread_id === conversation.thread_id,
        }"
        @click="
          selectedConversation = conversation;
          $emit('select-conversation', conversation);
        "
      />
    </v-card-item>
  </v-card>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useBotStore } from "@/stores/botStore";
import { getConversationsForBotId } from "@/queries/widget_conversations";

import ConversationPreviewCard from "./ConversationPreviewCard.vue";

const emit = defineEmits(["select-conversation"]);

const botStore = useBotStore();
const bots = ref([]);
const selectedBot = ref(null);
const selectedConversation = ref(null);
const loadingConversation = ref(false);
const conversations = ref([]);
const error = ref(false);

// Group conversations by thread_id and add metadata
const groupedConversations = computed(() => {
  const groups = conversations.value.reduce((acc, curr) => {
    if (!acc[curr.thread_id]) {
      acc[curr.thread_id] = {
        thread_id: curr.thread_id,
        messages: [],
        messageCount: 0,
        created_at: curr.created_at,
        lastMessage: curr.message,
      };
    }
    acc[curr.thread_id].messages.push(curr);
    acc[curr.thread_id].messageCount++;

    // Update created_at if this message is newer
    if (new Date(curr.created_at) > new Date(acc[curr.thread_id].created_at)) {
      acc[curr.thread_id].created_at = curr.created_at;
      acc[curr.thread_id].lastMessage = curr.message;
    }

    return acc;
  }, {});

  return Object.values(groups).sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
});

const fetchConversations = async (botId) => {
  if (!botId) return;

  loadingConversation.value = true;
  error.value = false;

  try {
    const { data, error } = await getConversationsForBotId(botId);

    if (error) throw error;
    conversations.value = data || [];
  } catch (error) {
    console.error("Error fetching conversations:", error);
    error.value = true;
  } finally {
    loadingConversation.value = false;
  }
};

const fetchBots = async () => {
  try {
    await botStore.fetchBots();
    bots.value = botStore.bots;

    if (bots.value.length > 0) {
      selectedBot.value = bots.value[0];
      fetchConversations(selectedBot.value.id);
    }
  } catch (error) {
    console.error("Error fetching bots:", error);
  }
};

onMounted(() => {
  fetchBots();
});
</script>

<style scoped>
.conversation-preview-card {
  cursor: pointer;
  transition: background-color 0.3s;
}

.conversation-preview-card:hover,
.conversation-preview-card.active {
  background-color: rgb(var(--v-theme-light));
}
</style>
