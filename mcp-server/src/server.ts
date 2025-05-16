import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "fs";
import path from "path";
import { z } from "zod";

const server = new Server(
  { name: "mcp-server", version: "1.0.0" },
  {
    capabilities: {
      prompts: {},
      resources: {},
    },
  }
);

server.registerCapabilities({
  tools: {
    getPlanningInstructions: {
      description: "Returns the planning instructions prompt.",
      parameters: z.object({}), // No parameters
      handler: async () => {
        const promptPath = path.resolve(
          __dirname,
          "../../llm-prompts/planning-instructions.md"
        );
        const text = fs.readFileSync(promptPath, "utf8");
        return { content: text };
      },
    },
  },
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
