export const appRoutes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/App/Home.vue"),
    meta: { requiresAuth: true, title: "Home" },
  },
  {
    path: "/chatbots",
    name: "Chatbots",
    component: () => import("@/views/App/chatbots/Index.vue"),
    meta: { requiresAuth: true, title: "Chatbots" },
    children: [
      {
        path: "",
        name: "ChatbotsList",
        component: () => import("@/views/App/chatbots/ListBots.vue"),
        meta: { requiresAuth: true, title: "All Chat Bots" },
      },
      {
        path: "CreateBot",
        name: "CreateChatbot",
        component: () => import("@/views/App/chatbots/CreateBot.vue"),
        meta: { requiresAuth: true, title: "Create a bot" },
      },
      {
        path: ":botId/edit",
        name: "EditChatbot",
        component: () => import("@/views/App/chatbots/EditBot.vue"),
        meta: { requiresAuth: true, title: "Edit Bot" },
      },
    ],
  },
  {
    path: "/conversations",
    name: "Conversations",
    component: () => import("@/views/App/conversations/Index.vue"),
    meta: { requiresAuth: true, title: "Chatbots" },
  },
  {
    path: "/reports",
    name: "Reports",
    component: () => import("@/views/App/conversations/Index.vue"),
    meta: { requiresAuth: true, title: "Chatbots" },
  },
];
