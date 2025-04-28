<template>
  <div class="login-container">
    <v-card class="pa-8" elevation="0" rounded="lg" width="400">
      <div class="text-center mb-6">
        <Logo />

        <h3 class="text-h5 font-weight-bold mt-6">Sign in to your account</h3>
      </div>

      <v-form @submit.prevent="handleLogin" ref="form">
        <div class="form-label">Email</div>
        <v-text-field
          v-model="email"
          placeholder="user@email.com"
          required
          :rules="[
            (v) => !!v || 'Email is required',
            (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
          ]"
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
          required
          placeholder="Enter password"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          :rules="[
            (v) => !!v || 'Password is required',
            (v) => v.length >= 6 || 'Password must be at least 6 characters',
          ]"
        ></v-text-field>

        <div class="text-danger text-body-2 mb-2">{{ errorMessage }}</div>
        <v-btn
          block
          color="primary"
          size="large"
          type="submit"
          class="mb-6"
          :loading="loading"
          :disabled="loading"
        >
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
import { supabase } from "@/lib/supabaseClient";

import Logo from "@/components/common/Logo.vue";

const router = useRouter();

const form = ref(null);
const loading = ref(false);
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const showPassword = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  const { valid } = await form.value.validate();
  console.log(valid);
  clearError();
  loading.value = true;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) throw error;
  } catch (error) {
    console.log("In catch");
    showError(error);
  } finally {
    loading.value = false;
  }
  // Add login logic here
  router.push("/");
};

const showError = (error) => {
  // Convert technical error messages to user-friendly ones
  if (error.code.includes("invalid_credentials")) {
    errorMessage.value = "Invalid email or password.";
  } else {
    errorMessage.value = error.message;
  }
};

const clearError = () => {
  errorMessage.value = "";
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
