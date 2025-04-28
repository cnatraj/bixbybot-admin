import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const bixbyTheme = {
  dark: false,
  colors: {
    primary: "#22c55e",
    "primary-subtle": "#e7fbee",
    secondary: "#95a0c5",
    "secondary-subtle": "#eaecf3",
    background: "#F7F9FB",
    surface: "#FFFFFF",
    error: "#FF5252",
    success: "#22c5ad",
    warning: "#ff9f43",
    info: "#41cbd8",
    danger: "#ef4d56",
    light: "#f4f6f9",
    dark: "#2b2d3b",
    "form-label": "#656d9a",
    "on-surface": "#2b2d3b",
    "on-primary": "#FFFFFF",
    "on-secondary": "#FFFFFF",
    "on-success": "#FFFFFF",
    "on-warning": "#FFFFFF",
    "on-info": "#FFFFFF",
    "on-danger": "#FFFFFF",
    "on-light": "#2b2d3b",
    "on-dark": "#FFFFFF",
  },
  variables: {
    "text-body-2": "0.875rem",
    "high-emphasis-opacity": "1",
  },
};
export const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VContainer: {
      maxWidth: "1280",
    },
    VCard: {
      rounded: "lg",
      class: ["v-card-shadow", "pa-2"],
    },
    VCardText: {
      class: ["text-secondary"],
    },
    VTextField: {
      variant: "outlined",
      color: "primary",
      density: "comfortable",
      class: "mb-2",
    },
    VBtn: {
      color: "primary",
      class: "mb-2",
    },
  },
  theme: {
    defaultTheme: "bixbyTheme",
    themes: {
      bixbyTheme,
    },
  },
});
