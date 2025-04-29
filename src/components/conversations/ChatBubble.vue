<template>
  <div
    class="messageWrapper d-flex align-end"
    :class="props.message.sender === 'user' ? 'user' : 'bot'"
  >
    <v-avatar
      :icon="
        props.message.sender === 'user'
          ? 'mdi-account-outline'
          : 'mdi-robot-outline'
      "
      :color="props.message.sender === 'user' ? 'info' : 'primary'"
      size="small"
      class="mb-2"
    ></v-avatar>

    <div
      class="messageBubble pa-4 ma-2"
      :class="props.message.sender === 'user' ? 'bg-white' : 'bg-primary'"
    >
      {{ props.message.message }}
      <div class="text-tiny text-medium-emphasis mt-2">
        {{ formatTime(props.message.created_at) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatTime } from "@/utils/time";
const props = defineProps({
  message: {
    type: Object,
    default: null,
  },
});
</script>

<style scoped>
.messageWrapper {
  justify-content: flex-start;
}
.messageWrapper.bot {
  flex-direction: row-reverse;
}
.messageBubble {
  max-width: 70%;
  -webkit-box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 16px 16px 0 16px;
}

.user .messageBubble {
  border-radius: 16px 16px 16px 0;
}
</style>
