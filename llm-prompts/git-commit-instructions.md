# Semantic Commit Notepad

## What is Semantic Commit?

Semantic commit messages follow a structured format that helps communicate the **intent** of a change. This makes it easier to understand the history of a project, automate releases, and generate changelogs.

## Basic Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- **type**: The kind of change (see below for common types)
- **scope**: (optional) The part of the codebase affected (e.g., `api`, `auth`, `ui`)
- **description**: A short summary of the change (imperative, lower case)
- **body**: (optional) More detailed explanation
- **footer**: (optional) Issues closed, breaking changes, etc.

---

## Common Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect meaning (formatting, missing semi-colons, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding or correcting tests
- **chore**: Changes to the build process or auxiliary tools

---

## Examples

### 1. Feature
```
feat(auth): add JWT authentication middleware
```

### 2. Bug Fix
```
fix(api): handle null user in getProfile endpoint
```

### 3. Documentation
```
docs(readme): update installation instructions
```

### 4. Refactor
```
refactor(user-service): simplify user lookup logic
```

### 5. Chore
```
chore(deps): update dependency eslint to v8.0.0
```

### 6. Breaking Change
```
feat(api): remove deprecated /v1/users endpoint

BREAKING CHANGE: The /v1/users endpoint has been removed. Use /v2/users instead.
```

### 7. Closing an Issue
```
fix(login): correct password validation

Closes #123
```

---

## Tips

- Keep the **description** concise (ideally under 72 characters).
- Use the **imperative mood** (“add”, not “added” or “adds”).
- Use **scope** to clarify what part of the code is affected.
- Use **body** for context or reasoning behind the change.
- Use **footer** for breaking changes or referencing issues.

---

**Happy committing!**
