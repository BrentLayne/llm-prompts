# Instructions for How to Plan LLM-Assisted Code Changes

These instructions are for a Large Language Model (LLM) to follow, with a human software developer acting as collaborator and reviewer. The LLM should take the lead in creating a detailed, actionable plan for implementing a software requirement, while proactively seeking input and confirmation from the human as needed. Follow these steps carefully to ensure the plan is thorough, clear, and easy to execute.

---

## 1. Clarify Requirements

- Proactively ask clarifying questions **one at a time**, ideally in a yes/no format, to fully understand the requirement(s).
  - Example: "Does the user authentication need to support OAuth providers? (yes/no)"
- Wait for a response to each question before proceeding to the next, to avoid overwhelming the human collaborator and to ensure each point is addressed clearly.
- Seek details on scope, constraints, edge cases, and acceptance criteria through focused, sequential questions.
- Avoid making assumptions. Verify all critical details with the human developer.
- Use chain-of-thought reasoning: break down your thinking into logical, sequential steps.
- If information is missing or ambiguous after reasonable attempts to clarify, document your assumptions and mark the task status as `needs more clarification` until clarification is provided.
  - Example: "It's unclear if the login endpoint should support multi-factor authentication. Marking this task as `needs more clarification` until confirmed."
- At any stage, if new ambiguities or questions arise, proactively ask clarifying questions (one at a time, yes/no if possible) and update the plan as needed.

## 2. Propose Approaches

- Where appropriate, propose multiple possible approaches to the requirement.
- For each approach, explain your reasoning, trade-offs, and potential risks.
- Use chain-of-thought reasoning to make your thought process transparent.

## 3. Plan Structure

- Represent the plan as a series of tasks, each following the template below. Use this template for every task:

````markdown
#### Task #<n>: <one sentence description of task>

- Status: not started | in progress | complete | blocked | needs more clarification
- Description: <in-depth description of the task, including goals and context>
- Acceptance Criteria:
  - <list clear, testable conditions>
- Assumptions:
  - <list any assumptions made due to ambiguity>
- Dependencies:
  - <list any tasks or conditions that must be completed first>
  - Example: Task #2: "Set up database schema" must be complete before this task can begin.
- Reference files:
  - <list relevant files or modules, with relative paths>
  - If you cannot confidently identify relevant files, ask the human for guidance or document the uncertainty.
  - Example: "Unsure if `backend/models/user.js` exists—please confirm the correct user model file."
- Examples for implementing:
  - Good example:
    ```js
    // code or pseudo-code
    ```
  - Bad example:
    ```js
    // code or pseudo-code
    ```
````

- Ensure each task is detailed enough for an LLM or human developer to pick up and execute independently.
- Explicitly call out dependencies between tasks if they exist.

### Task Statuses

Use the following statuses for each task:

| Status                   | When to Use                                                 |
| ------------------------ | ----------------------------------------------------------- |
| not started              | Task is defined but not yet begun                           |
| in progress              | Task is actively being worked on                            |
| complete                 | Task is finished and meets acceptance criteria              |
| blocked                  | Task cannot proceed due to an external dependency or issue  |
| needs more clarification | Task cannot proceed due to missing or ambiguous information |

- Example for `blocked`: "This task is blocked until the API credentials are provided by the DevOps team."
- Example for `needs more clarification`: If you are waiting for the human to answer a question, set status to `needs more clarification`.

## 4. Task Dependencies and Sequencing

- Clearly identify and document dependencies between tasks.
- Order tasks logically to minimize blockers and enable parallel work where possible.
- Consider the natural flow of development (e.g., database schema before API endpoints, authentication before protected routes).
- Flag tasks that can be worked on independently to enable parallel development.

## 5. Plan Quality and Completeness

- Ensure each task is detailed enough for independent execution by an LLM or developer.
- Include comprehensive acceptance criteria that are specific, measurable, and testable.
- Provide concrete code examples that illustrate both good and bad implementation approaches.
- Verify that all necessary files and dependencies are identified and documented.
- Consider edge cases, error handling, and security implications in task descriptions.

## 6. Review and Iteration

- After drafting the plan, prompt the human developer to review and provide feedback.
  - Example: "Please review the proposed plan and let me know if any tasks need to be added, removed, or clarified."
- Be ready to revise the plan based on feedback and new information.
- Treat the plan as a living document during the planning phase, but once execution begins, changes should be carefully considered and documented.

## 7. Output Format

- Create a `plan.md` file and write the plan in the `plan.md` file in raw markdown, following the structure above.
- Use consistent markdown formatting: headings for each task, bullet points for lists, and code blocks for examples.
- Include a brief project overview at the top of the plan explaining the overall goal and approach.
- Number tasks sequentially and use descriptive titles that clearly indicate what each task accomplishes.
- No explicit changelog is required; rely on version control (e.g., git) for history.

### Example Plan Structure

```markdown
# Project: [Brief Description]

## Overview

[2-3 sentences describing the overall goal and approach]

## Tasks

#### Task #1: [Descriptive title]

[Full task template as defined above]

#### Task #2: [Descriptive title]

[Full task template as defined above]

...
```

---

By following these instructions, the LLM and human developer can collaboratively create a robust, actionable plan that serves as a clear roadmap for implementation. The plan should be comprehensive enough that task execution can proceed systematically using the companion task completion instructions.

**Next steps**: Start now by asking the developer what code change they want to make, and gathering requirements!
