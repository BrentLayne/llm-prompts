# Instructions for How to Complete LLM-Assisted Code Change Tasks

These instructions are for a Large Language Model (LLM) to follow when executing tasks from an existing `plan.md` file. The LLM should systematically work through tasks in sequence, updating their status and ensuring each task meets its acceptance criteria before proceeding.

---

## 1. Reading and Understanding the Plan

- Always start by reading the entire `plan.md` file to understand the overall scope and task dependencies.
- Identify the current state of the plan by checking task statuses.
- Look for tasks with status `not started` that have no unmet dependencies.
- If multiple tasks are ready to start, prioritize the first task that is marked as "not started"

## 2. Task Execution Process

### Before Starting a Task

1. **Update Status**: Change the task status from `not started` to `in progress`
2. **Verify Dependencies**: Confirm all listed dependencies are actually complete
3. **Review Acceptance Criteria**: Understand exactly what constitutes completion
4. **Check Reference Files**: Verify the listed files exist and are accessible
5. **Clarify Assumptions**: If any assumptions seem incorrect or outdated, flag them

### During Task Execution

- Follow the acceptance criteria precisely
- Use the provided "Good example" as a guide for implementation approach
- Avoid patterns shown in the "Bad example"
- If you encounter issues not covered in the original task description:
  - Document the issue clearly
  - Propose a solution approach
  - Update the task with additional context if needed

### After Completing a Task

1. **Verify Acceptance Criteria**: Ensure every acceptance criterion is met
2. **Test the Implementation**: Run any relevant tests or validation
3. **Update Status**: Change status from `in progress` to `complete`
4. **Document Completion**: Add a brief note about what was implemented
5. **Update Dependencies**: Check if completing this task unblocks other tasks
6. **Confirm next steps**: Tell the human you've completed the task and ask for next steps.
   For example "I've completed the task. Should I commit the changes to git?"

## 3. Status Management

### Status Transitions

- `not started` → `in progress`: When you begin working on a task
- `in progress` → `complete`: When all acceptance criteria are met
- `in progress` → `blocked`: When you encounter an external dependency
- `in progress` → `needs more clarification`: When requirements are unclear
- `blocked` → `in progress`: When the blocking issue is resolved
- `needs more clarification` → `in progress`: When clarification is provided

### When to Mark Tasks as Blocked

- External dependencies (API keys, third-party services, etc.)
- Missing files or resources that should be provided by others
- Decisions that require human input beyond the original plan

### When to Mark Tasks as Needing Clarification

- Acceptance criteria are ambiguous or contradictory
- Reference files don't exist or don't match expectations
- Assumptions in the task appear to be incorrect
- New edge cases are discovered that weren't considered in planning

## 4. Handling Issues and Blockers

### File or Resource Issues

- If reference files don't exist, check for similar files with different names/paths
- Document what you found vs. what was expected
- Propose alternative approaches if possible

### Technical Blockers

- Research and propose solutions for technical challenges
- Break down complex tasks into smaller sub-tasks if needed
- Document your reasoning and approach

### Scope Changes

- If you discover the task scope is larger than originally planned:
  - Complete what can reasonably be done within the original scope
  - Document what additional work is needed
  - Suggest breaking the remaining work into new tasks

## 5. Communication and Updates

### Updating the Plan

- Keep task statuses current and accurate
- Add implementation notes to completed tasks
- Update assumptions if they prove incorrect
- Add new dependencies discovered during implementation

### Progress Reporting

- Provide clear updates on what was accomplished
- Highlight any deviations from the original plan
- Flag any risks or issues for future tasks

### Example Task Update

```markdown
#### Task #3: Implement user authentication endpoint

- Status: complete
- Description: Create POST /auth/login endpoint with email/password validation
- Acceptance Criteria:
  - ✅ Endpoint accepts email and password
  - ✅ Returns JWT token on successful authentication
  - ✅ Returns 401 for invalid credentials
  - ✅ Includes input validation
- Implementation Notes:
  - Used bcrypt for password hashing
  - JWT expires in 24 hours
  - Added rate limiting (5 attempts per minute)
- Reference files:
  - `backend/routes/auth.js` (created)
  - `backend/middleware/validation.js` (updated)
```

## 6. Quality Assurance

### Before Marking Complete

- [ ] All acceptance criteria are met
- [ ] Code follows project conventions and style
- [ ] No obvious bugs or security issues
- [ ] Relevant tests pass (if applicable)
- [ ] Documentation is updated (if applicable)

### Code Quality Standards

- Write clean, readable code with appropriate comments
- Follow existing patterns and conventions in the codebase
- Handle edge cases and error conditions appropriately
- Ensure security best practices are followed

## 7. Workflow Summary

1. **Read** the plan.md file completely
2. **Identify** the next task to work on (not started + no unmet dependencies)
3. **Update** task status to "in progress"
4. **Execute** the task following acceptance criteria
5. **Verify** all criteria are met
6. **Update** status to "complete" and add implementation notes
7. **Check** if other tasks are now unblocked
8. **Ask for next steps** ask the human what next steps are, if they'd like you to commit the changes to git, etc.

---

By following these instructions, you can systematically execute a well-planned code change, ensuring each task is completed thoroughly and the overall project progresses smoothly toward completion.
