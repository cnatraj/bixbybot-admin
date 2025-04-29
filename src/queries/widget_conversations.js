import { supabase } from "@/lib/supabaseClient";

export async function getConversationsForBotId(botId) {
  if (!botId) {
    throw new Error("botId is required");
  }
  return await supabase
    .from("widget_conversations")
    .select("*")
    .eq("bot_id", botId)
    .order("created_at", { ascending: true });
}
