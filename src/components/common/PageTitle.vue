<template>
  <h1 class="text-h5 font-weight-medium">{{ pageTitle }}</h1>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const pageTitle = computed(() => route.meta.title || "");
</script>
