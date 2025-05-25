# LLM Prompts

A repository of LLM prompts that can be served over MCP to your LLM. Write once, prompt anywhere.

## Features

- A collection of useful LLM prompts (see: [src/llm-prompts](./src/llm-prompts/))
- LLM prompts are served via MCP
- Easily extendable for additional LLM prompts
- Built with TypeScript and the official MCP SDK

---

## Available prompts

#### `getCodeChangePlanningInstructions`

- **Description:** Provides detailed, step-by-step instructions for planning an LLM-assisted code change.
  Use this tool to help a software developer and LLM collaboratively create a robust, actionable plan
  for implementing a code change, including best practices for clarifying requirements,
  structuring tasks, and managing dependencies.
- **Returns:** The full contents of [`code-change-planning-instructions.md`](./src/llm-prompts/code-change-planning-instructions.md)

#### `getGitCommitInstructions`

- **Description:** Returns best-practice instructions and examples for writing semantic git commit messages. Use this tool to help a developer or LLM generate clear, conventional commit messages that communicate the intent and context of code changes, following the semantic commit format.
- **Returns:** The full contents of [`git-commit-instructions.md`](./src/llm-prompts/git-commit-instructions.md)

#### `getCodeChangeTaskCompletionInstructions`

- **Description:** Provides detailed, step-by-step instructions for completing a code change task.
  Use this tool to get instructions for completing a code change task defined in the plan.md file.
  Instructions include best practices for testing, debugging, and committing changes.
- **Returns:** The full contents of [`code-change-task-completion-instructions.md`](./src/llm-prompts/code-change-task-completion-instructions.md)

---

## Installation

1. **Clone the repository**

   ```sh
   git clone git@github.com:BrentLayne/llm-prompts.git
   ```

2. **Install dependencies**
   ```sh
   yarn install
   ```

---

## Usage

1. **Make sure to build**

Compile the source code so it's ready to run.

```sh
yarn build
```

2. **Add the MCP server to Cursor (or your other MCP client of choice) and get your LLM to pull in prompts that you can then use to prompt the LLM!**

Example Cursor usage:

1. Add to MCP config

```typescript
// in Cursor's mcp.json file
{
   ...other MCPs,
   "llm-prompts": {
      "command": "node",
      "args": [
        "/your/path/to/llm-prompts/build/server.js"
      ]
    }
}
```

2. Prompt the agent to prompt itself

- Example: "Read the instructions on how to plan a feature and then follow those instructions to help me write a new feature"

---

## Local development workflow

- Add a new prompt to [src/llm-prompts](./src/llm-prompts/)
- Register the prompt in [src/mcp-server/server.ts](./src/mcp-server/server.ts)

### Run the MCP server locally (with hot reload)

```sh
yarn dev
```

### Debug with MCP Inspector (always make sure to build first, to pick up your latest changes)

```sh
yarn build
yarn inspector
```

---

## References

- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
