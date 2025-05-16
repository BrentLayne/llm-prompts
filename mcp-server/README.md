# MCP Server

A TypeScript-based Model Context Protocol (MCP) server that exposes LLM prompts for LLM-assisted software planning and development. Built using the official [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk).

Use this MCP server to pull in reusable LLM prompts to help with software development

---

## Features

- Exposes planning instructions and other LLM prompts via MCP
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

### Development (with hot reload)

```sh
yarn dev
```

### Build

```sh
yarn build
```

### Run (production)

```sh
yarn start
```

### Debug with MCP Inspector

```sh
yarn inspector
```

---

## Tool Endpoints

### `getPlanningInstructions`

- **Description:** Provides detailed, step-by-step planning instructions for LLM-assisted software development. Use this tool to help a software developer and LLM collaboratively create a robust, actionable plan for implementing a software change, including best practices for clarifying requirements, structuring tasks, and managing dependencies.
- **Returns:** The full contents of [`llm-prompts/planning-instructions.md`](../llm-prompts/planning-instructions.md)

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
