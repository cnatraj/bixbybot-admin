<template>
  <v-sheet class="messaging-container" rounded="lg" elevation="1">
    <div class="messaging-layout">
      <div class="conversations-sidebar">
        <v-tabs
          v-model="activeTab"
          bg-color="white"
          color="primary"
          class="message-tabs"
        >
          <v-tab value="messages">Messages</v-tab>
          <v-tab value="active">Active</v-tab>
        </v-tabs>
        
        <div class="px-3 py-2">
          <v-text-field
            hide-details
            variant="outlined"
            placeholder="Searching..."
            prepend-inner-icon="mdi-magnify"
            density="compact"
            class="search-messages"
            color="primary"
            bg-color="grey-lighten-4"
          ></v-text-field>
        </div>
        
        <div class="messages-list">
          <div
            v-for="(message, index) in conversations"
            :key="index"
            class="message-card pa-3"
            :class="{ active: activeConversation === index }"
            @click="setActiveConversation(index)"
          >
            <div class="d-flex">
              <v-avatar size="42" class="mr-3">
                <v-img :src="message.avatar"></v-img>
              </v-avatar>
              <div class="flex-grow-1">
                <div class="d-flex justify-space-between align-center">
                  <div class="font-weight-medium">{{ message.name }}</div>
                  <div class="text-caption text-grey">{{ message.time }}</div>
                </div>
                <div class="d-flex align-center text-body-2">
                  <div v-if="message.typing" class="typing-indicator">
                    <span>Typing</span>
                    <span class="dot mx-1"></span>
                    <span class="dot mx-1"></span>
                    <span class="dot mx-1"></span>
                  </div>
                  <div v-else class="text-subtitle-2 text-secondary text-medium-emphasis text-truncate" style="max-width: 160px">
                    <v-icon v-if="message.voiceMessage" size="small" color="primary" class="mr-1">
                      mdi-microphone
                    </v-icon>
                    {{ message.lastMessage }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="conversation-content">
        <div class="conversation-header pa-4 d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-avatar size="42" class="mr-3">
              <v-img :src="conversations[activeConversation].avatar"></v-img>
            </v-avatar>
            <div>
              <div class="font-weight-medium">{{ conversations[activeConversation].name }}</div>
              <div class="text-caption">Last seen: {{ conversations[activeConversation].lastSeen }}</div>
            </div>
          </div>
          <div>
            <v-btn icon variant="text" class="mr-1">
              <v-icon>mdi-phone</v-icon>
            </v-btn>
            <v-btn icon variant="text" class="mr-1">
              <v-icon>mdi-video</v-icon>
            </v-btn>
            <v-btn icon variant="text">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </div>
        </div>
        
        <div class="conversation-messages pa-6">
          <div v-for="(day, dayIndex) in messagesByDay" :key="dayIndex">
            <div class="time-label my-4">{{ dayIndex }}</div>
            <div v-for="(message, msgIndex) in day" :key="`${dayIndex}-${msgIndex}`">
              <div class="d-flex mb-4" v-if="message.type === 'sender'">
                <v-avatar size="36" class="mr-3 mt-1">
                  <v-img :src="message.avatar"></v-img>
                </v-avatar>
                <div>
                  <div class="message-bubble received text-body-2">{{ message.text }}</div>
                </div>
              </div>
              <div v-else class="d-flex justify-end mb-4">
                <div class="message-bubble sent text-body-2">
                  {{ message.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="conversation-input pa-4 d-flex align-center">
          <v-text-field
            hide-details
            variant="outlined"
            placeholder="Type something here..."
            prepend-inner-icon="mdi-emoticon-outline"
            append-inner-icon="mdi-paperclip"
            density="compact"
            v-model="newMessage"
            class="mr-2"
          ></v-text-field>
          <v-btn color="primary" icon size="large" @click="sendMessage">
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from 'vue';

const activeTab = ref('messages');
const activeConversation = ref(0);
const newMessage = ref('');

const conversations = ref([
  {
    name: 'Daniel Madsen',
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    lastMessage: 'Hey there!',
    time: '5 min ago',
    unread: 2,
    typing: true,
    lastSeen: '2 hours ago'
  },
  {
    name: 'James Andrews',
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    lastMessage: 'Amazing Work! 🔥',
    time: '30 min ago',
    unread: 1,
    typing: false,
    lastSeen: '1 hour ago'
  },
  {
    name: 'Shauna Jones',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    lastMessage: 'Congratulations!',
    time: 'Yesterday',
    unread: 0,
    typing: false,
    lastSeen: '3 hours ago'
  },
  {
    name: 'Frank Wei',
    avatar: 'https://randomuser.me/api/portraits/men/31.jpg',
    lastMessage: 'Voice message!',
    time: '1 Feb',
    unread: 0,
    typing: false,
    voiceMessage: true,
    lastSeen: '5 hours ago'
  },
  {
    name: 'Karen Savage',
    avatar: 'https://randomuser.me/api/portraits/women/31.jpg',
    lastMessage: 'Ok, I like it 👍',
    time: '8 Feb',
    unread: 0,
    typing: false,
    lastSeen: '2 days ago'
  },
  {
    name: 'Carol Maier',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    lastMessage: 'Send a pic!',
    time: '12 Feb',
    unread: 0,
    typing: false,
    lastSeen: '1 day ago'
  },
  {
    name: 'Shauna Jones',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    lastMessage: 'I need to talk to you',
    time: '15 Feb',
    unread: 0,
    typing: false,
    lastSeen: '4 hours ago'
  },
]);

const setActiveConversation = (index) => {
  activeConversation.value = index;
  if (conversations.value[index].unread) {
    conversations.value[index].unread = 0;
  }
};

const messages = ref({
  'yesterday': [
    {
      type: 'sender',
      text: 'There are many variations of passages of Lorem Ipsum available.',
      time: '10:30',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
    },
  ],
  'today': [
    {
      type: 'sender',
      text: 'Good Morning!',
      time: '09:15',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
    },
    {
      type: 'receiver',
      text: 'Have a nice day!',
      time: '09:17',
    },
    {
      type: 'sender',
      text: 'Command was run with root privileges. I\'m sure about that.',
      time: '09:20',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
    },
    {
      type: 'receiver',
      text: 'ok',
      time: '09:22',
    },
    {
      type: 'receiver',
      text: 'Thanks for your message David. I thought I\'m alone with this issue. Please, the issue to support it.',
      time: '09:25',
    },
    {
      type: 'sender',
      text: 'Sorry, I just back!',
      time: '09:30',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
    }
  ]
});

const messagesByDay = computed(() => {
  return messages.value;
});

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  
  messages.value.today.push({
    type: 'receiver',
    text: newMessage.value,
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  });
  
  newMessage.value = '';
};
</script>

<style scoped>
.messaging-container {
  height: calc(100vh - 160px);
  overflow: hidden;
  background: white;
}

.messaging-layout {
  display: grid;
  grid-template-columns: 350px 1fr;
  height: 100%;
}

.conversations-sidebar {
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.message-tabs {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.messages-list {
  flex: 1;
  overflow-y: auto;
}

.conversation-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.conversation-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.conversation-messages {
  flex: 1;
  overflow-y: auto;
  background-color: #FAFAFA;
}

.conversation-input {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}

@media (max-width: 960px) {
  .messaging-layout {
    grid-template-columns: 1fr;
  }
  
  .conversations-sidebar {
    display: none;
  }
  
  .conversation-content {
    display: flex;
  }
}
</style>