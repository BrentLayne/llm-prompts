# MCP Server Standup Plan (MCP SDK Version, Yarn)

## Overview

This plan outlines the steps to implement a TypeScript-based MCP server in the `mcp-server` directory using the official Model Context Protocol (MCP) SDK. The server will expose prompt files from the `llm-prompts` directory as MCP resources and/or prompts, making them accessible to any MCP-compatible client (e.g., Claude Desktop, MCP Inspector). No database, authentication, or containerization is required. The server will be run locally using Node.js. **Yarn** will be used for all dependency management.

---

#### Task #1: Initialize TypeScript project and install MCP SDK (with Yarn)

- Status: not started
- Description: Set up a new Node.js project with TypeScript in the `mcp-server` directory. Install the MCP SDK and related dependencies using Yarn. Configure the project for ESM modules as recommended by the SDK docs.
- Acceptance Criteria:
  - `package.json` and `tsconfig.json` exist and are configured
  - MCP SDK (`@modelcontextprotocol/sdk`) is installed
  - Project uses ESM modules (`"type": "module"` in `package.json`)
  - `yarn.lock` is present
- Assumptions:
  - No existing project setup in `mcp-server`
- Dependencies:
  - None
- Reference files:
  - `mcp-server/package.json`
  - `mcp-server/tsconfig.json`
  - `mcp-server/yarn.lock`
- Examples for implementing:
  - Good example:
    ```sh
    yarn init -y
    yarn add @modelcontextprotocol/sdk
    yarn add --dev typescript @types/node
    yarn tsc --init
    # Edit package.json: add "type": "module"
    ```
  - Bad example:
    ```sh
    npm install @modelcontextprotocol/sdk
    ```
  - References:
    - https://github.com/modelcontextprotocol/typescript-sdk
    - https://medium.com/@cstroliadavis/building-mcp-servers-536969d27809
    - https://classic.yarnpkg.com/lang/en/docs/migrating-from-npm/

---

#### Task #2: Implement MCP server using the SDK

- Status: not started
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
