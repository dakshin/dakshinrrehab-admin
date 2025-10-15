# DakshinRehab Admin Project Rules

## Package Manager
**CRITICAL: This project uses pnpm exclusively**
- ALL dependency management commands must use `pnpm` instead of `npm` or `yarn`
- Installation: `pnpm install` (not `npm install`)
- Adding dependencies: `pnpm add <package>` (not `npm install <package>`)
- Dev dependencies: `pnpm add -D <package>` (not `npm install --save-dev <package>`)
- Running scripts: `pnpm run <script>` or `pnpm <script>`
- Removing packages: `pnpm remove <package>` (not `npm uninstall <package>`)

## Development Commands
- Start dev server: `pnpm dev`
- Build project: `pnpm build` 
- Start production: `pnpm start`
- Lint code: `pnpm lint`

## Project Context
- Current directory: /Users/gandhimac/Sites/dakshinrrehab-admin
- This is a Next.js 15 healthcare management system for DakshinRehab clinic
- Uses React 19, TypeScript, Tailwind CSS, and shadcn/ui components
- Always check for pnpm-lock.yaml file presence to confirm pnpm usage