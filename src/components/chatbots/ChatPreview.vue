<template>
  <v-card color="transparent">
    <v-card-title>Chat Preview</v-card-title>
  </v-card>

  <div class="bg-white rounded-lg chatPreview-bot">
    <div :style="'background-color:' + props.titleBg" class="rounded-t-lg pa-4">
      {{ props.name }}
    </div>
    <div class="messagesContainer pa-4">
      <div class="messageWrapper mt-4">
        <div
          class="messageBubble pa-3 text-body-2 rounded-lg bg-secondary-subtle"
        >
          {{ props.welcomeMessage }}
        </div>
        <v-avatar size="40" class="mr-3">
          <v-icon icon="mdi-robot" :color="props.titleBg"></v-icon>
        </v-avatar>
      </div>

      <div class="messageWrapper user mt-4">
        <v-avatar size="32" class="mx-2 mt-1">
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-avatar>
        <div
          class="messageBubble pa-3 text-body-2 bg-primary-subtle rounded-lg"
        >
          Hi! What areas do you serve?
        </div>
      </div>

      <div class="messageWrapper mt-4">
        <div
          class="messageBubble pa-3 text-body-2 rounded-lg bg-secondary-subtle"
        >
          We serve San Diego, Carlsbad, and Encinitas.
        </div>
        <v-avatar size="40" class="mr-3">
          <v-icon icon="mdi-robot" :color="props.titleBg"></v-icon>
        </v-avatar>
      </div>
    </div>

    <div class="inputBox border-t-thin pa-4">
      <v-text-field
        label="Type your message"
        variant="outlined"
        append-icon="mdi-send"
        :icon-color="props.titleBg"
        hide-details="auto"
      >
      </v-text-field>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  titleBg: {
    type: String,
    default: "#22c55e",
  },
  name: {
    type: String,
    default: "Chatbot",
  },
  welcomeMessage: {
    type: String,
    default: "Hi! How can I help you?",
  },
});
</script>
<style scoped>
.chatPreview-bot {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}

.messagesContainer {
  min-height: 300px;
}

.messageWrapper {
  display: flex;
  justify-content: flex-end;
}
.messageWrapper.user {
  justify-content: flex-start;
}
.messageBubble {
  max-width: 80%;
}

.inputBox {
  display: flex;
}
</style>
