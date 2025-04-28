<template>
  <h6 class="text-h6">Chatbot Knowledge Base</h6>
  <div class="form-label my-2">
    These are the files and links that your Chatbot will use to answer
    questions.
  </div>

  <div>
    <v-table density="compact" class="rounded-lg">
      <thead class="bg-light">
        <tr class="">
          <th class="border-0">File Name</th>
          <th class="border-0">Upload Date</th>
          <th class="border-0"></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="file in files" :key="file.id">
          <td>
            <v-icon
              :icon="getFileIcon(file.type)"
              class="mr-2"
              color="primary"
              size="20"
            ></v-icon>
            {{ file.name }}
          </td>
          <td class="text-medium-emphasis text-caption">
            {{ formatDate(file.created_at) }}
          </td>
          <td class="text-right">
            <v-btn
              icon="mdi-delete-outline"
              variant="text"
              color="primary"
              size="small"
            ></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "@/lib/supabaseClient";
import { useRoute } from "vue-router";

const route = useRoute();
const loading = ref(false);
const error = ref(null);
const files = ref([]);

const getFileIcon = (type) => {
  const icons = {
    "application/pdf": "mdi-file-pdf-box",
    "application/msword": "mdi-file-word",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "mdi-file-word",
    "text/plain": "mdi-file-document-outline",
  };
  return icons[type] || "mdi-file-outline";
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const fetchFiles = async () => {
  loading.value = true;
  error.value = null;
  try {
    const { data, error: fetchError } = await supabase
      .from("bots_knowledge")
      .select("*")
      .eq("bot_id", route.params.botId)
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError;
    files.value = data;

    console.log("Fetched files:", files.value);
  } catch (error) {
    console.error("Error fetching files:", error);
    error.value = "Failed to load files";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchFiles();
});
</script>
