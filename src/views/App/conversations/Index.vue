<template>
  <v-row class="conversations-container">
    <v-col cols="4">
      <MessagesList @select-conversation="selectConversation" />
    </v-col>
    <v-col cols="8">
      <ChatWindow
        v-if="selectedConversation"
        :selected-conversation="selectedConversation"
      />
      <div v-else class="pa-8 text-center align-center">
        <v-icon size="60" color="info" class="mt-8">mdi-chat-outline</v-icon>
        <div class="mt-4 text-h5 text-info">
          Select a conversation from the list to view messages
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import ChatWindow from "@/components/conversations/ChatWindow.vue";
import MessagesList from "@/components/conversations/MessagesList.vue";

const selectedConversation = ref(null);

const selectConversation = (conversation) => {
  selectedConversation.value = conversation;
};
</script>

<style scoped>
.conversations-container {
  height: calc(100vh - 150px);
}
</style>
