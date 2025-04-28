<template>
  <div class="dashboard-container">
    <AnalyticsCards class="mb-4" />
    <MessagingInterface />
  </div>
</template>

<script setup>
import MessagingInterface from "./messaging/MessagingInterface.vue";
import AnalyticsCards from "./analytics/AnalyticsCards.vue";
</script>

<style scoped>
.dashboard-container {
  height: 100%;
  background-color: #f9fafb;
}
</style>
