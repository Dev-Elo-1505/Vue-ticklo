# Vue-ticklo — Ticketing app (Vue / Vite)

This repository contains the Vue 3 + Vite rewrite of a ticketing demo app. The project uses TypeScript and Vue Single File Components. The README below documents frameworks, setup, high-level UI structure, accessibility notes, known issues and example test credentials.

## Frameworks & libraries used

- Vue 3 (Composition API) — core framework
- Vite — dev server and bundler
- TypeScript — static typing
- Vue Router — client routing
- Tailwind CSS — utility-first styling
- vee-validate + @vee-validate/zod — form validation (Zod integration)
- zod — schema validation
- clsx — conditional class names helper
- tailwind-merge — merge Tailwind class lists
- vue-tsc — SFC-aware type-checking

See `package.json` for exact versions.

## Setup & run (development)

1. Install dependencies

```bash
npm install
```

2. Start dev server (hot reload)

```bash
npm run dev
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

Optional: run TypeScript type-check only

```bash
npx vue-tsc --noEmit -p tsconfig.json
```

## Project structure (high level)

- `src/`
  - `main.ts` — app bootstrap, router registration
  - `App.vue` — top-level layout (background decor, router-view, footer, toast container)
  - `pages/` — page components
    - `LandingPage.vue` — public landing
    - `Dashboard.vue` — protected dashboard
    - `TicketsPage.vue` — protected tickets list
    - `auth/Login.vue`, `auth/Signup.vue` — auth pages
  - `components/` — reusable UI components (Footer, ToastContainer, ButtonLink, icons, etc.)
  - `composables/` — Vue composables (e.g., `useAuth.ts`, `useToast.ts`)
  - `utils/` — small utilities and localStorage-based mock auth (`auth.ts`, `tickets.ts`)
  - `lib/` — helpers such as `cn` (class name + tailwind-merge)

## UI components & state explanation (short)

- App.vue — main layout that renders `<router-view />`. Includes decorative background shapes, a `Footer` and a `ToastContainer` for notifications.

- Pages:

  - `LandingPage.vue` — marketing/home page with features and call-to-action buttons.
  - `Login.vue` / `Signup.vue` — forms that call `utils/auth.ts` to perform mock auth (stored in `localStorage`). On success, the code dispatches a `ticketapp_auth_changed` window event.
  - `Dashboard.vue`, `TicketsPage.vue` — protected pages; routing guards redirect unauthenticated users to the login page.

- Components:

  - `Footer.vue` — site footer.
  - `ToastContainer.vue` — notification container; `provideToast()` composable exposes toasts.
  - `ButtonLink.vue` — small link-styled button that uses `lib/cn` helper for class merging.
  - `icons/` — collection of inline SVG icon components.

- State & auth flow:
  - Authentication is currently mocked in `src/utils/auth.ts`. It stores users and session data in `localStorage` and emits a `ticketapp_auth_changed` window event on changes.
  - `src/composables/useAuth.ts` exposes a reactive `isAuthenticated` ref that reads from `getSession()` and listens to the event — components can import `useAuth()` to react to auth changes.


## Routing & protected routes

- Routes are configured in `src/main.ts` (or `src/router/index.ts` in some variants). Protected routes (Dashboard, Tickets) have `meta.requiresAuth` and a global `router.beforeEach` guard redirects unauthenticated users to `/auth/login` with a `redirect` query parameter.

Login pages should redirect the user back after successful login. Example:

```ts
// inside Login.vue after successful login
const redirect = (route.query.redirect as string) || "/dashboard";
router.push(redirect);
```

## Accessibility notes

- Decorative elements use `aria-hidden="true"` so screen readers ignore them.
- Forms include labels and validation errors (via `vee-validate` + `zod`). Ensure label `for` attributes / input `id`s are present when editing components.
- Keyboard navigation: interactive elements (buttons, links) use native elements (`<button>`, `<a>`/`<router-link>`) where possible.
- Color contrast: app uses Tailwind variables — check contrast especially for small text; consider accessible color tokens.

Recommendations to improve accessibility further:

- Add `aria-live` region for toast notifications (so screen readers announce them).
- Manage focus after route changes (e.g., focus main heading on page load or after redirect to login).
- Ensure form error messages are programmatically associated with inputs (aria-describedby).

## Known issues & migration notes

- Zod API: earlier versions used some different helpers (e.g., `z.email()`), the code uses `z.string().email()` now. If migrating or updating Zod, check schema APIs.
- TypeScript config: tooling may warn about deprecated `moduleResolution=node10` if you upgrade to TypeScript 7+. See the TypeScript migration link referenced in warnings.
- `import.meta.env.BASE_URL`: some TypeScript setups may complain; the router currently uses `createWebHistory()` without passing `BASE_URL` to avoid the complaint. If you want to restore `import.meta.env.BASE_URL`, ensure `tsconfig.json` has `module: "esnext"` and the `vite/client` types are included.


## Example test credentials

This app uses a mock localStorage-based user store. You can create accounts via the Signup page. For quick testing, you can sign up with these example credentials:

- Email: `test@example.com`
- Password: `password123`

After signing up, you'll be logged in automatically and stored in localStorage. To log out, use the app's logout action which clears the session and emits the `ticketapp_auth_changed` event.

If you want a pre-seeded user, you can run this in the browser console (dev only):

```js
localStorage.setItem(
  "mock_users",
  JSON.stringify([{ email: "test@example.com", password: "password123" }])
);
```

## Troubleshooting

- If you see type errors about missing module declarations (e.g., `clsx`, `tailwind-merge`) ensure you installed dependencies:

```bash
npm install clsx tailwind-merge
```

- To run a full TypeScript check:

```bash
npx vue-tsc --noEmit -p tsconfig.json
```

- If routing behaves oddly, check `src/main.ts` and ensure router is registered with `app.use(router)` before `app.mount(...)`.


