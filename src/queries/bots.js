import { supabase } from "@/lib/supabaseClient";

export async function getBotsForOrgId(orgId) {
  return await supabase
    .from("bots")
    .select("*")
    .eq("org_id", orgId)
    .order("created_at", { ascending: false });
}

export async function updateBotByBotId(botId, updates) {
  return await supabase
    .from("bots")
    .update(updates)
    .eq("id", botId)
    .select()
    .single();
}

export async function createBotForOrgId(orgId, bot) {
  return await supabase
    .from("bots")
    .insert({ ...bot, org_id: orgId })
    .select()
    .single();
}

export async function deleteBotById(botId) {
  return await supabase.from("bots").delete().eq("id", botId);
}
