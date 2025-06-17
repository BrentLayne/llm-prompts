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

const registerPrompt = ({
  name,
  description,
  fileName,
}: {
  name: string;
  description: string;
  fileName: string;
}) => {
  server.tool(
    name,
    description,
    {}, // No parameters
    async () => {
      const promptPath = path.resolve(
        __dirname,
        `../src/llm-prompts/${fileName}.md`
      );
      const text = fs.readFileSync(promptPath, "utf8");
      return {
        content: [{ type: "text", text }],
      };
    }
  );
};

registerPrompt({
  name: "getCodeChangePlanningInstructions",
  fileName: "code-change-planning-instructions",
  description: `Provides detailed, step-by-step instructions for planning an LLM-assisted code change.
  Use this tool to help a software developer and LLM collaboratively create a robust, actionable plan
  for implementing a code change, including best practices for clarifying requirements,
  structuring tasks, and managing dependencies.`,
});

registerPrompt({
  name: "getGitCommitInstructions",
  fileName: "git-commit-instructions",
  description: `Returns best-practice instructions and examples for writing semantic git commit messages.
  Use this tool to help a developer or LLM generate clear, conventional commit messages that
  communicate the intent and context of code changes, following the semantic commit format.`,
});

registerPrompt({
  name: "getCodeChangePlanningInstructionsWithTdd",
  fileName: "code-change-planning-instructions-with-tdd",
  description: `Provides detailed, step-by-step instructions for planning an LLM-assisted code change.
  Use this tool to help a software developer and LLM collaboratively create a robust, test-driven plan
  for implementing a code change, including best practices for clarifying requirements,
  structuring tasks, and managing dependencies.
  Call this tool when the developer specifies they want to write a code change using TDD.`,
});

registerPrompt({
  name: "getCodeChangeTaskCompletionInstructions",
  fileName: "code-change-task-completion-instructions",
  description: `Provides detailed, step-by-step instructions for completing a code change task.
  Use this tool to get instructions for completing a code change task defined in the plan.md file.
  Instructions include best practices for testing, debugging, and committing changes.
  Call this tool when the developer specifies something like "Help me implement the first task in the plan"`,
});

const main = async () => {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP server running on stdio");
};

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
