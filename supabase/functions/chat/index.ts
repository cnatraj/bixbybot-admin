import { OpenAI } from "npm:openai@4.94.0";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const OPENAI_ASSISTANT_ID = Deno.env.get("OPENAI_ASSISTANT_ID");
const FUNCTION_VERSION = "1.0.6";
Deno.serve(async (req)=>{
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders
    });
  }
  try {
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key not configured");
    }
    if (!OPENAI_ASSISTANT_ID) {
      throw new Error("OpenAI Assistant ID not configured");
    }
    const { message, threadId } = await req.json();
    if (!message) {
      return new Response(JSON.stringify({
        error: "Message is required",
        version: FUNCTION_VERSION
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY,
      defaultHeaders: {
        "OpenAI-Beta": "assistants=v2"
      }
    });
    // Create or retrieve thread
    const thread = threadId ? await openai.beta.threads.retrieve(threadId) : await openai.beta.threads.create();
    // Add the user's message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: message
    });
    // Run the assistant
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: OPENAI_ASSISTANT_ID
    });
    // Wait for the run to complete
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    while(runStatus.status === "queued" || runStatus.status === "in_progress"){
      await new Promise((resolve)=>setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    }
    if (runStatus.status === "completed") {
      // Get the latest message from the thread
      const messages = await openai.beta.threads.messages.list(thread.id);
      const latestMessage = messages.data[0];
      return new Response(JSON.stringify({
        response: latestMessage.content[0].text.value,
        threadId: thread.id,
        version: FUNCTION_VERSION
      }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    } else {
      throw new Error(`Run failed with status: ${runStatus.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
    let errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    let statusCode = 500;
    if (errorMessage.includes("API key")) {
      statusCode = 401;
    }
    return new Response(JSON.stringify({
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined,
      version: FUNCTION_VERSION
    }), {
      status: statusCode,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }
});
