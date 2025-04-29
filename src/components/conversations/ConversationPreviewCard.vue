<template>
  <div class="border-dashed border-sm rounded-lg pa-2 mb-2 d-flex align-center">
    <v-avatar color="info" size="small" class="mr-2">
      <v-icon size="small">mdi-account-outline</v-icon>
    </v-avatar>

    <div class="conversationPreview">
      <div class="text-caption font-weight-medium text-truncate">
        {{ conversation.name }}
        {{ conversation.lastMessage }}
      </div>
      <div
        class="d-flex text-tiny text-medium-emphasis justify-space-between align-center"
      >
        <span>{{ formatRelativeTime(conversation.created_at) }}</span>
        <v-chip size="x-small" color="primary" label>
          {{ conversation.messageCount }}
        </v-chip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatRelativeTime } from "@/utils/time";

const props = defineProps({
  conversation: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.conversationPreview {
  flex: 1;
  min-width: 0;
}
</style>
