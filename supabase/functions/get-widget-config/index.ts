import { createClient } from "npm:@supabase/supabase-js@2.39.7";

// const origin = req.headers.get("Origin");

Deno.serve(async (req) => {
  // Handle CORS
  const origin = req.headers.get("Origin");

  const corsHeaders = {
    "Access-Control-Allow-Origin": "http://localhost:5174",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
  };

  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders, status: 200 });
  }

  try {
    const url = new URL(req.url);
    // const clientId = url.searchParams.get("clientId");
    const botId = url.searchParams.get("botId");

    if (!botId) {
      return new Response(JSON.stringify({ error: "Bot ID is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch bot details
    const { data: bot, error: botError } = await supabase
      .from("bots")
      .select("*")
      .eq("id", botId)
      .single();

    if (botError) {
      throw botError;
    }

    if (!bot) {
      return new Response(JSON.stringify({ error: "Bot not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return configuration with bot details
    return new Response(
      JSON.stringify({
        bot,
        client: {
          id: botId,
          name: bot.name || "",
          assitant_id: bot.assistant_id || "",
        },
        config: {
          theme: {
            position: {
              bottom: "20px",
              right: "20px",
            },
            button: {
              size: "60px",
              backgroundColor: bot.appearance?.primaryColor || "#1867C0",
              iconColor: "white",
              hoverColor: bot.appearance?.primaryColor || "#1557A0",
            },
            window: {
              width: "350px",
              height: "500px",
              backgroundColor: "white",
              borderRadius: "12px",
            },
            header: {
              backgroundColor: bot.appearance?.primaryColor || "#1867C0",
              textColor: "white",
            },
            messages: {
              userBackground: "#1867C0",
              userText: "white",
              botBackground: "#f0f0f0",
              botText: "#333",
            },
            input: {
              borderColor: "#ddd",
            },
          },
          settings: bot.settings || {
            inputPlaceholder: "Type your message...",
            sendButtonText: "Send",
          },
          personality: {
            greeting:
              bot.personality?.greeting || "Hello! How can I help you today?",
          },
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
