# CLAUDE.md

Ask follow-up questions until 95% confident you understand the task. Do not guess or assume.

## Never

- Use `--no-verify` to bypass hooks
- Disable tests instead of fixing them
- Commit code that doesn't compile
- Silently swallow exceptions or add fallback logic unless asked
- Add speculative code, comments, or refactors beyond the current task
- Use em dashes in text; use commas, periods, or colons instead
- Add Co-Authored-By lines or credit Claude in commits
- Amend or force-push unless explicitly asked

## Always

- Read existing code before editing; match repo style and conventions
- Find similar features/components before implementing new ones
- Check if logic or a dependency already covers the use case before adding code
- Run tests and lint before finishing if code changed
- Stop after 3 failed attempts and reassess
- Use non-interactive commands (`git --no-pager diff`, `git diff | cat`; prefer `rg`)

## Code Style

- DRY, KISS, YAGNI
- Early returns; flat over nested
- Single-purpose functions; no flag parameters or multi-mode behavior
- Functional patterns, pure functions, composition over inheritance, DI over singletons
- Strict typing everywhere; never `any`, `unknown`, or `Dict[str, Any]`
- No `useEffect` unless explicitly asked; prefer better alternatives
- No single-letter variables except `e` (events), `q` (queries), `t` (test contexts)
- Clear searchable names; extract complex conditions into named variables

## Error Handling

- Fail fast with descriptive messages including context (params, response body, status)
- Specific error types; no catch-all handlers
- External API calls: retry with warnings, then raise

## Testing

- Write tests first
- Run single relevant tests during development; full suite before declaring done
- Test behavior, not implementation details

## Git

- Short natural-language commit messages
- Atomic commits: one logical change each

## MCP

- Use Context7 to validate library documentation
