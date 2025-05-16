import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = new McpServer({
  name: "mcp-server",
  version: "1.0.0",
});

server.tool(
  "getPlanningInstructions",
  `Provides detailed, step-by-step planning instructions for LLM-assisted software development.
  Use this tool to help a software developer and LLM collaboratively create a robust, actionable plan
  for implementing a software change, including best practices for clarifying requirements,
  structuring tasks, and managing dependencies.`,
  {}, // No parameters
  async () => {
    const promptPath = path.resolve(
      __dirname,
      "../../llm-prompts/planning-instructions.md"
    );
    const text = fs.readFileSync(promptPath, "utf8");
    return {
      content: [{ type: "text", text }],
    };
  }
);

server.tool(
  "getGitCommitInstructions",
  `Returns best-practice instructions and examples for writing semantic git commit messages. Use this tool to help a developer or LLM generate clear, conventional commit messages that communicate the intent and context of code changes, following the semantic commit format.`,
  {}, // No parameters
  async () => {
    const promptPath = path.resolve(
      __dirname,
      "../../llm-prompts/git-commit-instructions.md"
    );
    const text = fs.readFileSync(promptPath, "utf8");
    return {
      content: [{ type: "text", text }],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
