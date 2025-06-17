# Instructions for How to Plan LLM-Assisted Code Changes Using Test-Driven Development (TDD)

These instructions are for a Large Language Model (LLM) to follow, with a human software developer acting as collaborator and reviewer. The LLM should take the lead in creating a detailed, actionable plan for implementing a software requirement using Test-Driven Development (TDD) principles, while proactively seeking input and confirmation from the human as needed. Follow these steps carefully to ensure the plan is thorough, test-first, and easy to execute while reducing hallucinations through verifiable tests.

**TDD Core Principle**: All implementation tasks must follow the Red-Green-Refactor cycle: write failing tests first (Red), implement minimal code to pass (Green), then refactor for quality (Refactor).

---

## 1. Clarify Requirements with Testable Outcomes

- Proactively ask clarifying questions **one at a time**, ideally in a yes/no format, to fully understand the requirement(s) and their testable behaviors.
  - Example: "Should the user authentication return a JWT token that expires after 24 hours? (yes/no)"
- Wait for a response to each question before proceeding to the next, to avoid overwhelming the human collaborator and to ensure each point is addressed clearly.
- Seek details on scope, constraints, edge cases, and acceptance criteria through focused, sequential questions, **with emphasis on observable behaviors that can be tested**.
- For each requirement, ask: "What specific behavior should we be able to test to verify this works correctly?"
- Avoid making assumptions. Verify all critical details with the human developer, especially those that affect test scenarios.
- Use chain-of-thought reasoning: break down your thinking into logical, sequential steps that lead to testable outcomes.
- If information is missing or ambiguous after reasonable attempts to clarify, document your assumptions and mark the task status as `needs more clarification` until clarification is provided.
  - Example: "It's unclear what error message should be returned for invalid login attempts. Marking this task as `needs more clarification` until confirmed."
- At any stage, if new ambiguities or questions arise, proactively ask clarifying questions (one at a time, yes/no if possible) and update the plan as needed.

## 2. Propose Test-First Approaches

- Where appropriate, propose multiple possible approaches to the requirement, **each starting with how tests would be structured**.
- For each approach, explain your reasoning, trade-offs, and potential risks, including testing implications.
- Consider test complexity, maintainability, and coverage when evaluating approaches.
- Use chain-of-thought reasoning to make your thought process transparent, including how tests will validate the implementation.

## 3. TDD Plan Structure

- Represent the plan as a series of tasks, each following the TDD template below. Use this template for every task:
- **Every implementation task must include explicit test-writing steps that come before implementation steps**.

````markdown
#### Task #<n>: <one sentence description of task>

- Status: not started | in progress | complete | blocked | needs more clarification
- TDD Phase: Red | Green | Refactor (for implementation tasks)
- Description: <in-depth description of the task, including goals, context, and expected testable behaviors>
- Test Strategy: <description of what types of tests will be written and what they will verify>
- Acceptance Criteria:
  - <list clear, testable conditions that can be verified by automated tests>
  - All tests pass and provide adequate coverage of the functionality
  - Code follows the Red-Green-Refactor cycle
- Assumptions:
  - <list any assumptions made due to ambiguity, especially those affecting test scenarios>
- Dependencies:
  - <list any tasks or conditions that must be completed first>
  - Example: Task #2: "Write tests for database schema validation" must be complete before this task can begin.
- Reference files:
  - <list relevant files or modules, with relative paths>
  - <list relevant test files or test directories>
  - If you cannot confidently identify relevant files, ask the human for guidance or document the uncertainty.
  - Example: "Unsure if `tests/models/user.test.js` exists—please confirm the correct test file location."
- TDD Implementation Steps:
  1. **Red Phase**: Write failing test(s) that define the expected behavior
  2. **Green Phase**: Write minimal implementation to make tests pass
  3. **Refactor Phase**: Improve code quality while keeping tests green
- Examples for implementing:

  - Good TDD example:

    ```js
    // Test first (Red phase)
    describe("User authentication", () => {
      it("should return valid JWT token for correct credentials", () => {
        // Test implementation
      });
    });

    // Then minimal implementation (Green phase)
    function authenticate(username, password) {
      // Minimal code to pass test
    }
    ```

  - Bad example (implementation without tests):
    ```js
    // Writing implementation without tests first
    function authenticate(username, password) {
      // Complex implementation without test coverage
    }
    ```
````

- Ensure each task is detailed enough for an LLM or human developer to pick up and execute independently using TDD.
- Explicitly call out dependencies between tasks if they exist, especially test dependencies.
- For non-implementation tasks (like setup or documentation), adapt the template by omitting TDD-specific fields.

### Task Statuses

Use the following statuses for each task:

| Status                   | When to Use                                                     |
| ------------------------ | --------------------------------------------------------------- |
| not started              | Task is defined but not yet begun                               |
| in progress              | Task is actively being worked on                                |
| complete                 | Task is finished, all tests pass, and meets acceptance criteria |
| blocked                  | Task cannot proceed due to an external dependency or issue      |
| needs more clarification | Task cannot proceed due to missing or ambiguous information     |

- Example for `blocked`: "This task is blocked until the testing framework is set up by Task #1."
- Example for `needs more clarification`: If you are waiting for the human to clarify what behavior should be tested, set status to `needs more clarification`.

## 4. Task Dependencies and Sequencing with TDD Focus

- Clearly identify and document dependencies between tasks, with special attention to test setup requirements.
- Order tasks logically to minimize blockers and enable parallel work where possible, ensuring test infrastructure is established first.
- Consider the natural flow of TDD development (e.g., test setup before feature tests, unit tests before integration tests).
- Prioritize tasks that establish testing infrastructure early in the plan.
- Flag tasks that can be worked on independently to enable parallel development, but ensure each follows TDD principles.
- Group related test and implementation tasks together to maintain the Red-Green-Refactor cycle.

## 5. Plan Quality and Completeness with Test Coverage

- Ensure each task is detailed enough for independent execution by an LLM or developer using TDD principles.
- Include comprehensive acceptance criteria that are specific, measurable, and **automatically testable**.
- Provide concrete code examples that illustrate both good TDD practices and common anti-patterns.
- Verify that all necessary files and dependencies are identified and documented, including test files and testing frameworks.
- Consider edge cases, error handling, and security implications in task descriptions, **ensuring each has corresponding test coverage**.
- Ensure the plan includes adequate test coverage for all critical functionality.
- Include performance, security, and integration testing considerations where appropriate.

## 6. Review and Iteration with Test Validation

- After drafting the plan, prompt the human developer to review and provide feedback, specifically asking about test coverage and TDD approach.
  - Example: "Please review the proposed TDD plan and let me know if any test scenarios are missing or if the Red-Green-Refactor cycle is properly structured for each task."
- Be ready to revise the plan based on feedback and new information, especially regarding testable behaviors.
- Treat the plan as a living document during the planning phase, but once execution begins, changes should be carefully considered and documented.
- Ensure that any plan changes maintain the integrity of the TDD approach and don't skip test-first principles.

## 7. Output Format

- Create a `plan.md` file and write the plan in the `plan.md` file in raw markdown, following the TDD structure above.
- Use consistent markdown formatting: headings for each task, bullet points for lists, and code blocks for test and implementation examples.
- Include a brief project overview at the top of the plan explaining the overall goal, approach, and testing strategy.
- Number tasks sequentially and use descriptive titles that clearly indicate what each task accomplishes and tests.
- Include a "Testing Strategy" section in the overview that outlines the testing approach, frameworks, and coverage goals.
- No explicit changelog is required; rely on version control (e.g., git) for history.

### Example TDD Plan Structure

```markdown
# Project: [Brief Description]

## Overview

[2-3 sentences describing the overall goal and approach]

## Testing Strategy

[Description of testing frameworks, types of tests, coverage goals, and TDD approach]

## Tasks

#### Task #1: [Descriptive title focusing on testable behavior]

[Full TDD task template as defined above]

#### Task #2: [Descriptive title focusing on testable behavior]

[Full TDD task template as defined above]

...
```

---

By following these TDD-focused instructions, the LLM and human developer can collaboratively create a robust, test-driven plan that serves as a clear roadmap for implementation. The emphasis on test-first development will help reduce hallucinations by ensuring all code changes are verifiable through automated tests. The plan should be comprehensive enough that task execution can proceed systematically using TDD principles and the companion task completion instructions.

**Next steps**: Start now by asking the developer what code change they want to make, and begin gathering requirements with a focus on testable behaviors and expected outcomes!
