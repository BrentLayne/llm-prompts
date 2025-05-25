# Semantic Git Commit Message Instructions

## Overview

When generating git commit messages, you MUST follow the semantic commit format to ensure consistency, clarity, and automated tooling compatibility.

## Required Format

Generate commit messages using this exact structure:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Step-by-Step Instructions

### 1. Determine the Commit Type

Select the appropriate type based on the nature of the changes:

- **feat**: Use for new features or functionality additions
- **fix**: Use for bug fixes or error corrections
- **docs**: Use for documentation-only changes
- **style**: Use for formatting, whitespace, or code style changes (no logic changes)
- **refactor**: Use for code restructuring without changing functionality
- **perf**: Use for performance improvements
- **test**: Use for adding, modifying, or fixing tests
- **chore**: Use for build process, dependency updates, or tooling changes

### 2. Add Scope (Optional but Recommended)

Include a scope in parentheses to specify the affected area:

- Use lowercase
- Be specific but concise (e.g., `auth`, `api`, `ui`, `database`)
- Omit if the change affects the entire codebase

### 3. Write the Description

Follow these rules for the description:

- Use imperative mood ("add", "fix", "update" - NOT "added", "fixed", "updated")
- Start with lowercase letter
- Keep under 72 characters
- Be specific and actionable
- Do NOT end with a period

### 4. Add Body (When Necessary)

Include a body when:

- The change requires explanation of WHY it was made
- The implementation is complex or non-obvious
- You need to provide context for future developers

Body formatting:

- Separate from description with a blank line
- Wrap lines at 72 characters
- Use present tense
- Explain the motivation and contrast with previous behavior

### 5. Add Footer (When Applicable)

Include footers for:

- **Breaking changes**: Start with "BREAKING CHANGE: " followed by description
- **Issue references**: Use "Closes #123", "Fixes #456", or "Refs #789"
- **Co-authors**: Use "Co-authored-by: Name <email>"

## Examples to Follow

### Simple Feature

```
feat(auth): add JWT token validation middleware
```

### Bug Fix with Context

```
fix(api): handle null user data in profile endpoint

Previously the endpoint would crash when user data was null.
Now returns appropriate 404 error with helpful message.
```

### Breaking Change

```
feat(api): remove deprecated v1 authentication endpoints

BREAKING CHANGE: All v1 auth endpoints (/auth/v1/*) have been removed.
Migrate to v2 endpoints (/auth/v2/*) which provide enhanced security.
```

### Chore with Issue Reference

```
chore(deps): upgrade React to v18.2.0

Closes #234
```

## Validation Checklist

Before finalizing a commit message, verify:

- [ ] Type is appropriate for the change
- [ ] Description uses imperative mood
- [ ] Description is under 72 characters
- [ ] Scope is relevant and lowercase (if used)
- [ ] Body explains WHY when necessary
- [ ] Breaking changes are clearly marked
- [ ] Issue numbers are referenced when applicable

## Common Mistakes to Avoid

- Using past tense ("added" instead of "add")
- Ending description with a period
- Being too vague ("fix bug" instead of "fix null pointer in user lookup")
- Missing scope when it would add clarity
- Not explaining breaking changes in footer
- Exceeding character limits
