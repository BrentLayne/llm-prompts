# LLM Prompts

A repository of LLM prompts that can be served over MCP to your LLM. Write once, prompt anywhere.


---

## Features

- Exposes LLM prompts via MCP
- Built with TypeScript and the official MCP SDK
- Hot-reload development workflow with yarn and tsx
- Easily extendable for additional LLM prompts

---

## Installation

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd mcp-server
   ```
2. **Install dependencies**
   ```sh
   yarn install
   ```

---

## Usage

Add the MCP server to Cursor (or your other MCP client of choice) and get the LLM to pull in prompts that you can then use to prompt the LLM!

Example cursor usage:
```typescript
// in Cursor's mcp.json file

```

## Development workflow,

### Run the MCP server locally (with hot reload)

```sh
yarn dev
```


### Debug with MCP Inspector (make sure to build first to pick up latest changes)

```sh
yarn build
yarn inspector
```

---

## Tool Endpoints

### `getPlanningInstructions`

- **Description:** Provides detailed, step-by-step planning instructions for LLM-assisted software development. Use this tool to help a software developer and LLM collaboratively create a robust, actionable plan for implementing a software change, including best practices for clarifying requirements, structuring tasks, and managing dependencies.
- **Returns:** The full contents of [`llm-prompts/planning-instructions.md`](../llm-prompts/planning-instructions.md)

### `getGitCommitInstructions`

- **Description:** Returns best-practice instructions and examples for writing semantic git commit messages. Use this tool to help a developer or LLM generate clear, conventional commit messages that communicate the intent and context of code changes, following the semantic commit format.
- **Returns:** The full contents of [`llm-prompts/git-commit-instructions.md`](../llm-prompts/git-commit-instructions.md)

---

## Project Structure

```
.
├── src/
│   └── server.ts         # Main server entry point
├── llm-prompts/
│   └── planning-instructions.md
├── package.json
├── tsconfig.json
├── .eslintrc.json
├── .env.example
├── .gitignore
└── README.md
```

---

## References

- [MCP SDK Documentation](https://github.com/modelcontextprotocol/typescript-sdk)
- [Building MCP Servers Tutorial](https://medium.com/@cstroliadavis/building-mcp-servers-536969d27809)
- [Yarn Migration Guide](https://classic.yarnpkg.com/lang/en/docs/migrating-from-npm/)
