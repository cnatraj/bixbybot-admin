<template>
  <div class="login-container">
    <v-card class="pa-8" elevation="0" rounded="lg" width="400">
      <div class="text-center mb-6">
        <Logo />

        <h3 class="text-h5 font-weight-bold mt-6">Sign in to your account</h3>
      </div>

      <v-form @submit.prevent="handleLogin">
        <div class="form-label">Email</div>
        <v-text-field
          v-model="username"
          placeholder="user@email.com"
        ></v-text-field>

        <div class="form-label d-flex">
          <span>Password</span>
          <v-spacer></v-spacer>
          <a href="#" class="text-secondary text-body-2 text-decoration-none"
            >Forgot password?</a
          >
        </div>
        <v-text-field
          v-model="password"
          placeholder="Enter password"
          type="password"
        ></v-text-field>

        <v-btn block color="primary" size="large" type="submit" class="mb-6">
          Log In
        </v-btn>
      </v-form>
      <v-card-text>
        <div class="text-center text-body-2">
          <span class="text-medium-emphasis">Don't have an account? </span>
          <a
            href="#"
            class="text-success text-decoration-none font-weight-medium"
            >Register for Free</a
          >
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import Logo from "@/components/common/Logo.vue";

const router = useRouter();
const username = ref("");
const password = ref("");
const rememberMe = ref(false);

const handleLogin = () => {
  // Add login logic here
  router.push("/");
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f9fb;
}
</style>
