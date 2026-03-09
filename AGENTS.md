# AGENTS.md

## Project Overview

This is a shadcn/ui Storybook registry focused on component documentation and
distribution. The registry ships Radix UI story sets with v3 output.

## Quick Commands

- **Dev server**: `bun run storybook` (port 6006)
- **Build**: `bun run build` (builds Next.js app + Storybook)
- **Test all**: `bun run test`
- **Test Storybook**: `bun run test:storybook` (browser tests)
- **Test unit**: `bun run test:unit`
- **Lint**: `bun run lint`
- **Type check**: `bun run type-check`
- **Format**: `bun run format:write`

## Registry Development

### File Structure

- Stories: `registry/**/` with `*-radix.stories.tsx` files per story folder
- Design tokens: `registry/tokens/**/` with radix story variants
- Radix implementation: `bases/radix/components/ui/*`
- Registry config: `registry.radix.json`
- Registry output: `public/v3/radix`

### Story Categories

- `ui/radix/ComponentName` - Radix UI story variants
- `design/radix/TokenName` - Radix UI design token stories

### Story Naming & Documentation

- Story files use `*-radix.stories.tsx` suffix
- Match story titles to the registry prefix (`ui/radix/...`)
- Follow existing JSDoc comment pattern for each story export
- Example:
  `/** Use the 'outline' button to reduce emphasis on secondary actions */`
- Main component gets descriptive JSDoc explaining overall purpose

## Storybook Conventions

### Story Structure

```typescript
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Component } from "@/bases/radix/components/ui/component";

const meta: Meta<typeof Component> = {
  title: "ui/radix/Component",
  component: Component,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    // Default args here unless story needs variants
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### Required Stories

- `Default`: Basic component usage
- Interactive components with state changes need `play` function test stories
- Common variants: Loading, Disabled, Small, Large, WithIcon as applicable

### Testing Stories

- Use `tags: ["!dev", "!autodocs"]` for test-only stories
- Include both success and error case tests for forms/validation
- Use `play` functions with `userEvent` and `expect` for interactions

## Code Style

### Imports

- **Story imports**: use `@/bases/radix/components/ui/`
- **Registry output**: postbuild rewrites `@/bases/*/components` to
  `@/components` for published JSON
- **Framework**: `@storybook/nextjs-vite` for type imports
- **Icons**: `lucide-react` for consistent iconography

### TypeScript

- Use `satisfies Meta<typeof Component>` for type safety
- Prefer explicit types over `any`
- Define schemas with `zod` for forms

## Registry System

### Dependencies

- `registryDependencies`: shadcn/ui components (e.g., `["button", "form"]`)
- `dependencies`: External npm packages (e.g., `["lucide-react", "zod"]`)

### Registry Entry

Each story needs corresponding entry in `registry.radix.json`:

```json
{
  "name": "component-story",
  "title": "Component Story",
  "type": "registry:ui",
  "meta": { "type": "ui", "story": "ui-component" },
  "registryDependencies": ["component"],
  "dependencies": ["external-lib"],
  "files": [
    {
      "path": "registry/ui/component-story/component-radix.stories.tsx",
      "type": "registry:component"
    }
  ]
}
```

## Testing Strategy

- **Storybook tests**: Browser-based with Playwright
- **Accessibility**: a11y addon configured with 'todo' level
- **Visual testing**: Stories serve as visual regression tests
- Run `bun run lint && bun run type-check` before completing tasks

## Common Patterns

### Form Components

- Use `react-hook-form` with `zod` validation
- Include both success/error test scenarios
- Use `action()` from Storybook for form submissions

### Charts

- Use `recharts` with `ChartContainer` wrapper
- Define `ChartConfig` for consistent theming
- Support responsive design

### Design Tokens

- Use `getComputedStyle()` to read CSS custom properties
- Display both CSS variable names and computed values
- Organize by functional vs component token types

### Figma Token → CSS 변환

Figma 토큰은 `/`로 그룹을 구분합니다. CSS custom property에는 `/`가 허용되지 않으므로
**`/` → `-`** 변환 후 사용합니다. 예: `--base/background` → `--base-background`

## Important Notes

- **Focus on registry development**: Most work lives in `registry/`, Radix
  component implementation lives under `bases/radix/`
- **Registry builds**: run `bun run registry:build` to generate v3/radix
  registry and apply postbuild import rewrites
- **Maintain consistency**: Follow existing patterns in story structure and
  naming
- **Test interactivity**: Add play functions for components with state changes
- **Registry dependencies**: Use correct dependency types (registry vs npm)
- **Always use @/ imports**: Required for registry build system

Always maintain consistency with existing patterns and run quality checks before
completion.
