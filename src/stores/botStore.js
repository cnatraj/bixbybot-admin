import { defineStore } from "pinia";
import { getOrgsForUserId } from "@/queries/orgs_users";
import { supabase } from "@/lib/supabaseClient";
import {
  getBotsForOrgId,
  updateBotByBotId,
  createBotForOrgId,
  deleteBotById,
} from "@/queries/bots";

export const useBotStore = defineStore("bot", {
  state: () => ({
    bots: [],
    loading: false,
    error: null,
  }),

  getters: {
    getBotById: (state) => (id) => {
      console.log("Fetching bot by ID:", id);
      return state.bots.find((bot) => bot.id === id);
    },
  },

  actions: {
    async fetchBots() {
      this.loading = true;
      this.error = null;

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) throw new Error("No authenticated session");

        const { data: orgUser, error: orgError } = await getOrgsForUserId(
          session.user.id
        );

        if (orgError) throw orgError;

        const { data, error: botsError } = await getBotsForOrgId(
          orgUser.org_id
        );

        if (botsError) throw botsError;

        this.bots = data;
      } catch (error) {
        console.error("Error fetching bots:", error);
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateBot(botId, updates) {
      try {
        const { data, error } = await updateBotByBotId(botId, updates);

        if (error) throw error;

        // Update the bot in the local state
        const index = this.bots.findIndex((b) => b.id === botId);
        if (index !== -1) {
          this.bots[index] = data;
        }

        return data;
      } catch (error) {
        console.error("Error updating bot:", error);
        this.error = error.message;
        throw error;
      }
    },

    async deleteBot(botId) {
      try {
        const { error } = await deleteBotById(botId);
        if (error) throw error;
        // Remove the bot from the local state
        this.bots = this.bots.filter((bot) => bot.id !== botId);
      } catch (error) {
        console.error("Error deleting bot:", error);
        this.error = error.message;
        throw error;
      }
    },

    async createBot(botData) {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) throw new Error("No authenticated session");

        const { data: orgUser, error: orgError } = await getOrgsForUserId(
          session.user.id
        );
        if (orgError) throw orgError;

        const { data, error: createError } = await createBotForOrgId(
          orgUser.org_id,
          botData
        );
        if (createError) throw createError;

        // Add the new bot to the local state
        this.bots.unshift(data);

        return data;
      } catch (error) {
        console.error("Error creating bot:", error);
        this.error = error.message;
        throw error;
      }
    },
  },
});
