# Analytics Setup

## Environment Variables

### Web (`apps/web`)
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` (optional)
- `NEXT_PUBLIC_CLARITY_PROJECT_ID` (optional)
- `NEXT_PUBLIC_SENTRY_DSN_BROWSER` (optional)
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (optional)
- `NEXT_PUBLIC_APP_ENV` (optional, defaults to `production`)

### API (`apps/api`)
- No new required vars for ingestion endpoints.

## New Endpoints

### Product event ingestion
- `POST /api/v1/analytics/events`
  - Accepts single event or `{ events: [...] }`
  - Enforces strict no-PII property sanitization.

### Admin analytics
- `GET /api/v1/admin/analytics/overview?days=30`
- `GET /api/v1/admin/analytics/funnels?days=30`
- `GET /api/v1/admin/analytics/retention?days=30`
- `GET /api/v1/admin/analytics/feature-adoption?days=30`
- `GET /api/v1/admin/analytics/scanner-quality?days=30`

## Notes
- Run Prisma migration/generate for the new `AnalyticsEvent` model before deploying API.
- Shared-types build tooling failed in this environment, so `dist` was updated directly to expose analytics exports.
