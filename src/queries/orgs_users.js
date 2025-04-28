import { supabase } from "@/lib/supabaseClient";

export async function getOrgsForUserId(userId) {
  return await supabase
    .from("orgs_users")
    .select("org_id")
    .eq("user_id", userId)
    .single();
}
