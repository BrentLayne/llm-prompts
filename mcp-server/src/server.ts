import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "mcp-server", version: "1.0.0" },
  {
    capabilities: {
      prompts: {},
      resources: {},
    },
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio with 'hello-world' prompt");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
