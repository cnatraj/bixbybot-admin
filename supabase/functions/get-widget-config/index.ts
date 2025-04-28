const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }
  try {
    const url = new URL(req.url);
    const clientId = url.searchParams.get("clientId");
    if (!clientId) {
      return new Response(
        JSON.stringify({
          error: "Client ID is required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
    // Return mock configuration
    const config = {
      client: {
        id: clientId,
        name: "Demo Company",
      },
      config: {
        theme: {
          position: {
            bottom: "20px",
            right: "20px",
          },
          button: {
            size: "60px",
            backgroundColor: "#1867C0",
            iconColor: "white",
            hoverColor: "#1557A0",
          },
          window: {
            width: "350px",
            height: "500px",
            backgroundColor: "white",
            borderRadius: "12px",
          },
          header: {
            backgroundColor: "#1867C0",
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
        settings: {
          inputPlaceholder: "Type your message...",
          sendButtonText: "Send",
        },
      },
    };
    return new Response(JSON.stringify(config), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
