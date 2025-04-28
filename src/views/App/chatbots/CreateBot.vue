<template>
  <v-row>
    <v-col cols="8">
      <v-card>
        <v-card-item>
          <v-tabs
            v-model="activeTab"
            color="primary"
            align-tabs="start"
            class="border-b-sm"
          >
            <v-tab v-for="tab in tabs" :key="tab" :value="tab" size="small">{{
              tab
            }}</v-tab>
          </v-tabs>

          <v-window v-model="activeTab" class="mt-6">
            <v-window-item value="Name">
              <h6 class="text-h6">Give your Chatbot a name</h6>
              <div class="form-label my-2">
                Set a unique name and watch your AI Chatbot update on the right
                side of the screen.
              </div>
              <v-text-field
                block
                v-model="bot.name"
                class="mt-6"
              ></v-text-field>

              <h6 class="text-h6">Pick your Chat widget's color</h6>
              <div class="form-label my-2">
                Customize your bot to your brand's colors
              </div>
              <div class="d-flex pa-2">
                <div
                  class="colorBox mr-2"
                  :style="{ backgroundColor: bot.appearance.primaryColor }"
                  @click.prevent="showColorPicker = true"
                ></div>

                <v-color-picker
                  v-if="showColorPicker"
                  v-model="bot.appearance.primaryColor"
                  mode="hex"
                ></v-color-picker>
              </div>
            </v-window-item>
            <v-window-item value="Knowledge">
              <h6 class="text-h6">Create your Chatbot's Knowledge</h6>
              <div class="form-label my-2">
                Your can upload documents and add links to your bot's knowledge.
                These documents will be used to train your bot and provide
                helpful answers to your visitors.
              </div>
              <v-row class="mt-4">
                <v-col cols="6">
                  <v-btn
                    variant="flat"
                    block
                    :color="showUpload ? 'light' : 'transparent'"
                    @click="showUpload = true"
                    >Upload</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-btn
                    variant="flat"
                    block
                    :color="showUpload ? 'transparent' : 'light'"
                    @click="showUpload = false"
                    >Paste Urls</v-btn
                  >
                </v-col>
              </v-row>
              <v-row class="mt-2" no-gutters>
                <v-col>
                  <div
                    v-if="showUpload"
                    class="border-md rounded-lg pa-8 bg-light border-dashed text-center"
                  >
                    <v-avatar color="white">
                      <v-icon color="info">mdi-upload</v-icon>
                    </v-avatar>
                    <div class="mt-4">Drag and drop your files here</div>
                    <div class="text-body-2 mt-2">
                      You can add pdf, and txt files. Max size 10MB
                    </div>
                  </div>

                  <div v-else>
                    <div class="form-label">
                      Paste website links, or Google Docs
                    </div>
                    <v-text-field
                      block
                      v-model="bot.training.urls[index]"
                      placeholder="example.com"
                      color="info"
                      v-for="(url, index) in bot.training.urls"
                      :key="index"
                      density="compact"
                      hide-details="auto"
                      class="mt-2"
                    ></v-text-field>

                    <v-btn
                      variant="text"
                      prepend-icon="mdi-plus"
                      color="info"
                      size="small"
                      @click="bot.training.urls.push('')"
                    >
                      Add another url</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item value="Leads">
              <h6 class="text-h6">Lead Information Setup</h6>
              <div class="form-label my-2">
                Choose the information you’d like to collect from visitors
                during a chat. This helps make sure you have everything you need
                to follow up with new leads quickly and easily.
              </div>
              <div class="form-label my-2">
                We recommend keeping it to 3–4 fields to keep the conversation
                quick and friendly.
              </div>
              <div>
                <v-text-field
                  block
                  v-model="bot.leadCapture.fields[index]"
                  v-for="(field, index) in bot.leadCapture.fields"
                  :key="index"
                  density="compact"
                  hide-details="auto"
                  class="mt-2"
                ></v-text-field>

                <v-btn
                  variant="text"
                  prepend-icon="mdi-plus"
                  color="info"
                  size="small"
                  @click="bot.leadCapture.fields.push('')"
                >
                  Add another Field</v-btn
                >
              </div>
            </v-window-item>
            <v-window-item value="Settings">
              <h6 class="text-h6">Welcome message</h6>
              <div class="form-label my-2">
                This is the first message your visitors will see when they
                start.
              </div>

              <v-text-field
                block
                v-model="bot.personality.greeting"
                density="compact"
                hide-details="auto"
                class="mt-2"
              ></v-text-field>
            </v-window-item>
          </v-window>
        </v-card-item>

        <v-card-item>
          <v-row>
            <v-col cols="6">
              <v-btn
                variant="text"
                @click="previousTab"
                v-if="activeTab !== 'Name'"
                color="primary"
              >
                Previous
              </v-btn>
            </v-col>
            <v-col cols="6" class="text-right">
              <v-btn
                v-if="activeTab !== 'Settings'"
                color="secondary"
                @click="nextTab"
                >Next</v-btn
              >
              <v-btn v-else color="primary" @click="createBot"
                >Create Bot</v-btn
              >
            </v-col>
          </v-row>
        </v-card-item>
      </v-card>
    </v-col>
    <v-col cols="4">
      <ChatPreview
        :name="bot.name"
        :title-bg="bot.appearance.primaryColor"
        :welcome-message="bot.personality.greeting"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useBotStore } from "@/stores/botStore";
import ChatPreview from "@/components/chatbots/ChatPreview.vue";

const router = useRouter();
const botStore = useBotStore();
const activeTab = ref("basic");

const bot = ref({
  name: "Chat Bot Name",
  personality: {
    greeting: "Hello! How can I assist you today?",
  },
  appearance: {
    primaryColor: "#22c55e",
  },
  settings: {},
  training: {
    urls: ["https://"],
    files: [],
  },
  leadCapture: {
    fields: ["Full Name", "Email", "Phone"],
  },
});

const showColorPicker = ref(false);
const showUpload = ref(true);
const tabs = ["Name", "Knowledge", "Leads", "Settings"];
const loading = ref(false);

const nextTab = () => {
  const currentIndex = tabs.indexOf(activeTab.value);
  if (currentIndex < tabs.length - 1) {
    activeTab.value = tabs[currentIndex + 1];
  }
};

const previousTab = () => {
  const currentIndex = tabs.indexOf(activeTab.value);
  if (currentIndex > 0) {
    activeTab.value = tabs[currentIndex - 1];
  }
};

const createBot = async () => {
  // Logic to create the bot
  loading.value = true;
  try {
    const newBot = await botStore.createBot({
      name: bot.value.name,
      personality: bot.value.personality,
      appearance: bot.value.appearance,
      training: bot.value.training,
      settings: bot.value.settings,
      lead_fields: bot.value.leadCapture,
    });

    router.push("/chatbots");
  } catch (error) {
    loading.value = false;
    console.log("Error creating bot: " + error.message);
  } finally {
    loading.value = false;
  }
};
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
