# MCP Server Standup Plan (MCP SDK Version, Yarn)

## Overview

This plan outlines the steps to implement a TypeScript-based MCP server in the `mcp-server` directory using the official Model Context Protocol (MCP) SDK. The server will expose prompt files from the `llm-prompts` directory as MCP resources and/or prompts, making them accessible to any MCP-compatible client (e.g., Claude Desktop, MCP Inspector). No database, authentication, or containerization is required. The server will be run locally using Node.js. **Yarn** will be used for all dependency management.

---

#### Task #1: Initialize TypeScript project and install MCP SDK (with Yarn)

- Status: complete
- Description:
  Set up a new Node.js project with TypeScript in the `mcp-server` directory using Yarn. Follow best practices for a greenfield TypeScript project:
  - Create initial directory structure:
    ```
    src/
    ├── server.ts      # Main server entry point
    ├── handlers/      # Directory for tool handlers
    └── types/         # Directory for TypeScript type definitions
    ```
  - Initialize the project and install dependencies:
    - `yarn init -y`
    - `yarn add @modelcontextprotocol/sdk dotenv`
    - `yarn add --dev typescript @types/node nodemon ts-node eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`
  - Initialize TypeScript config: `yarn tsc --init`
  - Edit `package.json` to add `"type": "module"`
  - Configure `tsconfig.json` with recommended options:
    - `"rootDir": "./src"`, `"outDir": "./build"`, `"strict": true`, `"esModuleInterop": true`, `"skipLibCheck": true`, `"forceConsistentCasingInFileNames": true`, `"target": "ES2022"`, `"module": "Node16"`, `"moduleResolution": "Node16"`
    - `"include": ["src/**/*"]`
  - Add a `.gitignore` file to exclude `node_modules/`, `build/`, `.env`, etc.
  - Add a `.eslintrc.json` for TypeScript linting:
    ```json
    {
      "parser": "@typescript-eslint/parser",
      "plugins": ["@typescript-eslint"],
      "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"]
    }
    ```
  - Create `.env.example` for documenting environment variables:
    ```
    # Server Configuration
    PORT=3000
    NODE_ENV=development
    ```
  - Add VS Code debug configuration in `.vscode/launch.json`:
    ```json
    {
      "version": "0.2.0",
      "configurations": [
        {
          "type": "node",
          "request": "launch",
          "name": "Debug Server",
          "skipFiles": ["<node_internals>/**"],
          "program": "${workspaceFolder}/src/server.ts",
          "preLaunchTask": "tsc: build - tsconfig.json",
          "outFiles": ["${workspaceFolder}/build/**/*.js"]
        }
      ]
    }
    ```
  - Add scripts to `package.json`:
    ```json
    "scripts": {
      "dev": "nodemon src/server.ts",
      "build": "tsc",
      "start": "node build/server.js",
      "lint": "eslint src/**/*.ts",
      "lint:fix": "eslint src/**/*.ts --fix"
    }
    ```
  - (Optional) Add a `README.md` to document setup and usage
- Acceptance Criteria:
  - `package.json`, `tsconfig.json`, `yarn.lock`, `.gitignore`, `.eslintrc.json`, `.env.example`, and `src/` directory structure exist and are configured
  - MCP SDK and all dev dependencies are installed
  - Project uses ESM modules (`"type": "module"` in `package.json`)
  - Scripts for dev/build/start/lint are present
  - VS Code debugging is configured
  - ESLint is configured for TypeScript
- Assumptions:
  - No existing project setup in `mcp-server`
- Dependencies:
  - None
- Reference files:
  - `mcp-server/package.json`
  - `mcp-server/tsconfig.json`
  - `mcp-server/yarn.lock`
  - `mcp-server/.gitignore`
  - `mcp-server/.eslintrc.json`
  - `mcp-server/.env.example`
  - `mcp-server/.vscode/launch.json`
  - `mcp-server/src/`
  - `mcp-server/README.md` (optional)
- Examples for implementing:

  - Good example:

    ```sh
    # Create directory structure
    mkdir -p src/{handlers,types}
    touch src/server.ts

    # Initialize project and install dependencies
    yarn init -y
    yarn add @modelcontextprotocol/sdk dotenv
    yarn add --dev typescript @types/node nodemon ts-node eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

    # Initialize TypeScript
    yarn tsc --init

    # Create config files
    echo 'node_modules/\nbuild/\n.env' > .gitignore
    mkdir .vscode
    # Create .eslintrc.json, .env.example, and launch.json as specified above
    ```

  - Bad example:
    ```sh
    # No organized directory structure
    # Missing ESLint and debug configuration
    # No environment variable management
    ```
  - References:
    - https://github.com/modelcontextprotocol/typescript-sdk
    - https://medium.com/@cstroliadavis/building-mcp-servers-536969d27809
    - https://www.digitalocean.com/community/tutorials/typescript-new-project
    - https://losikov.medium.com/part-1-project-initial-setup-typescript-node-js-31ba3aa7fbf1

---

#### Task #2: Implement MCP server using the SDK

- Status: complete
- Description: Create a server using the MCP SDK, following the [official example](https://github.com/modelcontextprotocol/typescript-sdk#low-level-server). Set up the server to advertise resource and/or prompt capabilities.
- Acceptance Criteria:
  - Server starts and responds to MCP protocol requests
  - Server advertises resource and/or prompt capabilities
- Assumptions:
  - Using `StdioServerTransport` for local communication
- Dependencies:
  - Task #1: Project initialization must be complete
- Reference files:
  - `mcp-server/src/server.ts`
- Examples for implementing:
  - Good example:
    ```ts
    import { Server } from "@modelcontextprotocol/sdk/server/index.js";
    import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
    const server = new Server(
      { name: "mcp-server", version: "1.0.0" },
      { capabilities: { resources: {}, prompts: {} } }
    );
    const transport = new StdioServerTransport();
    await server.connect(transport);
    ```
  - Bad example:
    ```ts
    // Using Express or HTTP server directly
    ```
  - References:
    - https://github.com/modelcontextprotocol/typescript-sdk
    - https://medium.com/@cstroliadavis/building-mcp-servers-536969d27809

---

#### Task #3: Implement specific tool request handlers for prompts

- Status: not started
- Description:
  Define and register custom tool handlers for each prompt or function you want to expose. For example, implement a `getPlanningInstructions` tool that returns the contents of the planning instructions prompt file from `llm-prompts/planning-instructions.md`. Each tool should have a clear schema and return type, and be registered with the MCP server using the SDK's `server.tool` method.
- Acceptance Criteria:
  - Each tool is registered with a unique name and schema
  - Calling the tool returns the correct prompt content or error
  - Example: `getPlanningInstructions` returns the full text of `llm-prompts/planning-instructions.md`
- Assumptions:
  - Only specific, named tools are exposed (no generic file/resource listing)
- Dependencies:
  - Task #2: MCP server must be running
- Reference files:
  - `mcp-server/src/server.ts`
  - `llm-prompts/planning-instructions.md`
- Examples for implementing:
  - Good example:
    ```ts
    import { z } from "zod";
    import fs from "fs";
    server.tool(
      "getPlanningInstructions",
      {}, // No parameters
      async () => {
        const text = fs.readFileSync(
          "../llm-prompts/planning-instructions.md",
          "utf8"
        );
        return { content: text };
      }
    );
    ```
  - Bad example:
    ```ts
    // Exposing a generic file browser or resource handler
    ```

---

#### Task #4: Add development and run scripts

- Status: not started
- Description: Add Yarn scripts for development (`nodemon` + `ts-node`) and production (`tsc` + `node`).
- Acceptance Criteria:
  - `yarn dev` starts the server with hot reload
  - `yarn build` compiles TypeScript
  - `yarn start` runs the compiled server
- Assumptions:
  - Standard Node.js/TypeScript workflow
- Dependencies:
  - Task #1: Project initialization must be complete
- Reference files:
  - `mcp-server/package.json`
- Examples for implementing:
  - Good example:
    ```json
    "scripts": {
      "dev": "nodemon src/server.ts",
      "build": "tsc",
      "start": "node build/server.js"
    }
    ```
  - Bad example:
    ```json
    "scripts": {}
    ```

---

#### Task #5: (Optional) Document usage and protocol endpoints

- Status: not started
- Description: Add a README or documentation section describing how to run the server and interact with it using MCP clients (e.g., Claude Desktop, MCP Inspector).
- Acceptance Criteria:
  - Clear instructions for running and testing the server
  - Example client usage (optional)
- Dependencies:
  - Task #2: MCP server must be running
- Reference files:
  - `mcp-server/README.md`
- Examples for implementing:

  - Good example:

    ```md
    # MCP Server

    Run with: yarn dev
    See [MCP SDK docs](https://github.com/modelcontextprotocol/typescript-sdk) for client usage.
    ```

  - Bad example:
    ```md
    # No usage instructions
    ```

---

Please review the revised plan. All dependency management now uses Yarn. For more details, see the [MCP SDK documentation](https://github.com/modelcontextprotocol/typescript-sdk), [Building MCP Servers tutorial](https://medium.com/@cstroliadavis/building-mcp-servers-536969d27809), and [Yarn migration guide](https://classic.yarnpkg.com/lang/en/docs/migrating-from-npm/).
