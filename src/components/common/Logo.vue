<template>
  <div
    class="d-flex align-center justify-center"
    @click="props.linkToApp ? router.push('/') : null"
  >
    <v-icon color="#6366f1" size="32" class="mr-1">mdi-circle-multiple</v-icon>
    <span class="text-h6 font-weight-bold">BIXBYBOT</span>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  linkToApp: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.logoText {
  color: #141313 !important;
}
</style>
