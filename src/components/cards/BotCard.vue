<template>
  <v-card min-height="160" class="">
    <v-card-title>
      {{ props.bot.name || "No name provided" }}
    </v-card-title>
    <v-card-text class="botCardText">
      <div>
        <v-icon
          :color="props.bot.active ? 'yellow' : 'error'"
          :class="props.bot.active ? '' : 'text-medium-emphasis'"
          >mdi-lightning-bolt-outline</v-icon
        >
        <span v-if="props.bot.active">Active</span>
        <span v-else>Inactive</span>
      </div>
    </v-card-text>

    <v-card-actions
      class="d-flex justify-space-between align-center justify-center"
    >
      <!-- Status Badge -->
      <v-btn
        size="small"
        color="secondary"
        :to="'/chatbots/' + bot.id + '/edit'"
        >Edit Bot</v-btn
      >

      <v-spacer></v-spacer>
      <v-btn size="small" color="danger">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({
  bot: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.botCardText {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
}
</style>
