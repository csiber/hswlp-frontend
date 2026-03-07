# GEMINI.md - HSWLP Frontend

## Project Overview
**HSWLP Frontend** is the central hub for the HSWLP (Hybrid Service Workflow Launch Platform) ecosystem. It is a production-ready Next.js SaaS application designed to run on **Cloudflare Pages** using **OpenNext**. It features multi-tenancy, credit-based billing, and modern security practices like Passkeys.

### Core Technology Stack
- **Framework:** Next.js 15 (App Router, React 19)
- **Runtime/Hosting:** Cloudflare Pages + OpenNext
- **Database:** Cloudflare D1 (SQLite) with **Drizzle ORM**
- **Session/Cache:** Cloudflare KV (Key-Value)
- **Object Storage:** Cloudflare R2
- **Styling:** Tailwind CSS, Radix UI, HeroUI, Framer Motion
- **Type Safety:** TypeScript, Zod, ZSA (Zero-overhead Server Actions)
- **Authentication:** Custom KV-based session management, Passkeys (WebAuthn), Email Verification
- **Billing:** Stripe integration (Credit-based system)
- **Email:** React Email

---

## Architecture & Conventions

### Directory Structure
- `src/app`: Next.js App Router pages and layouts.
- `src/actions`: Server Actions (using `zsa`) for business logic.
- `src/db`: Drizzle schema (`schema.ts`), migrations, and database initialization.
- `src/components`: UI components, categorized into `ui` (base), `forms`, and feature-specific folders.
- `src/utils`: Shared utilities (auth, stripe, credits, Cloudflare bindings).
- `src/lib`: Core library code (database clients, base metadata).
- `wrangler.jsonc`: Cloudflare resource bindings and configuration.

### Security Note
- **API deprecation:** Legacy API endpoints in `functions/api` have been removed for security reasons. All authentication and user management should go through Next.js Server Actions.
- **Secrets:** Avoid hardcoding secrets like `JWT_SECRET` in `wrangler.jsonc`. Use Cloudflare Secrets (`wrangler secret put`) instead.
- **Transactions:** Always use `db.batch()` for atomic multi-table updates in D1 (e.g., updating user balance and logging a transaction).

### Development Workflow
- **Server Actions:** Use `zsa` for all server-side logic called from the client.
- **Database:** Use Drizzle ORM for all database interactions. Always run `pnpm db:generate` after schema changes.
- **Environment Variables:** Managed via Cloudflare `vars` in `wrangler.jsonc` and secrets in the Cloudflare dashboard.
- **Types:** Run `pnpm cf-typegen` to update Cloudflare environment types (`CloudflareEnv`).

---

## Building and Running

### Prerequisites
- Node.js (v20+)
- `pnpm` (v10+)
- Cloudflare Wrangler CLI

### Key Commands
- **Development:** `pnpm dev`
- **Build:** `pnpm build` (local Next.js build)
- **Production Build:** `pnpm build:prod` (OpenNext build for Cloudflare)
- **Deploy:** `pnpm deploy`
- **Database Migrations:**
    - `pnpm db:generate`: Generate SQL migrations from schema.
    - `pnpm db:migrate:dev`: Apply migrations to local D1 instance.
- **Type Generation:** `pnpm cf-typegen`: Generate types for Cloudflare bindings.
- **Email Preview:** `pnpm email:dev`: Start React Email development server.

---

## Coding Standards
- **Strict TypeScript:** Ensure all components and functions are properly typed.
- **Server-Only:** Use `import "server-only"` for database and utility files that should not leak to the client.
- **Styling:** Use Tailwind CSS for all styling. Follow the established patterns in `src/components/ui`.
- **Validation:** Use `zod` for all form and input validation.
- **Error Handling:** Use the `try-catch` utility or `zsa` error handling for consistent user feedback.
