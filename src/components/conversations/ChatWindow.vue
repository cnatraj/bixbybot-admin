<template>
  <div class="chatWindow overflow-y-auto" v-if="props.selectedConversation">
    <!-- Conversation Header -->
    <div class="pa-4 bg-white rounded-t-lg d-flex align-center">
      <v-avatar
        icon="mdi-account-outline"
        color="info"
        size="40"
        class="mr-4"
      ></v-avatar>
      <div class="text-caption font-weight-medium text-medium-emphasis">
        <div>
          Conversation started at:
          {{ formatTime(props.selectedConversation.messages[0].created_at) }}
        </div>
        <div>
          Last message sent at:
          {{
            formatTime(props.selectedConversation.messages.at(-1).created_at)
          }}
        </div>
      </div>
    </div>

    <!-- Conversation Messages -->
    <div class="pa-4 text-body-2 font-weight-regular" ref="messagesContainer">
      <div v-for="message in selectedConversation.messages" :key="message.id">
        <ChatBubble :message="message" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { formatTime } from "@/utils/time";

import ChatBubble from "./ChatBubble.vue";
import { onMounted } from "vue";

const props = defineProps({
  selectedConversation: {
    type: Object,
    default: null,
  },
});
const messagesContainer = ref(null);

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>
.chatWindow {
  height: calc(100vh - 150px);
  overflow-y: auto;
}
</style>
