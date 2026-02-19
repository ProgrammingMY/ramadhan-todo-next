# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sunnah Garden (formerly Ramadhan Garden) is a Progressive Web App for tracking Sunnah activities and Islamic practices. Users track daily tasks, view progress through a garden metaphor, access Islamic handbook content, and receive AI-powered weekly/monthly analysis.

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev              # Regular dev server

# Database operations
pnpm db:generate      # Generate Drizzle schema types after schema changes
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Seed database with initial tasks data

# Build and production
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

## Architecture

### Tech Stack
- **Next.js 15** with App Router and TypeScript
- **PostgreSQL** with Drizzle ORM
- **Tailwind CSS 4.0.8** for styling
- **Radix UI** for primitive components
- **SST** for deployment to AWS/Cloudflare
- **Google Gemini API** for AI analysis

### Directory Structure

```
app/
├── _components/          # Shared UI components (grouped by feature)
│   ├── auth/            # Login/signup forms
│   ├── cabinets/        # Cabinet/shelf visualization components
│   ├── feedback/        # Feedback form and prompt
│   ├── prayer/          # Prayer times and clock components
│   ├── profile/         # Profile editing components
│   ├── progress/        # Progress visualization
│   └── story/           # Story viewer for onboarding/announcements
├── _context/            # React Context providers
│   ├── user-context.tsx     # User state, period dates, zone location
│   └── progress-context.tsx # Progress tracking state
├── api/                 # API routes (RESTful)
├── constant/            # Static data (todo categories, hijri dates, zones, version logs)
├── handbook/            # Islamic handbook pages (doa, zikir, prayer times, lailatul qadr)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and AI service
├── components/ui/       # Radix UI primitive components
├── layout.tsx           # Root layout with providers
└── page.tsx             # Home page

db/
├── drizzle.ts          # Drizzle database instance
├── schema.ts           # Database table definitions
└── seed.ts             # Database seeding script

lambda/
└── cron.ts             # AWS Lambda function for daily reminders

public/
├── data/               # Static JSON data (amalan, doa, hadith, qiam, sunnah)
├── flowers/            # Plant images for progress visualization
└── manifest.json       # PWA manifest
```

### Database Schema

| Table | Purpose |
|-------|---------|
| `usersTable` | User profiles (id, name, email, password, gender, picture) |
| `tasksTable` | Predefined Sunnah activities (id, name, category, isPeriodCan, displayOrder) |
| `progressTable` | Daily task completions per user (userId, taskId, date, completed, completedAt) |
| `periodTable` | Menstruation period tracking for female users |
| `subscriptionsTable` | Push notification subscriptions (deviceId, subscription, isActive) |
| `analyticsTable` | AI analysis results (userId, analysis, startDate, mode) |
| `feedbackTable` | User feedback (rating, feedback, createdAt) |

### State Management Pattern

1. **UserContext** (`app/_context/user-context.tsx`): Global user state
   - User authentication (anonymous or registered)
   - Month progress data
   - Period dates (for female users)
   - Prayer time zone

2. **ProgressContext**: Progress tracking state

3. **localStorage Fallback**: All critical state persisted to localStorage for offline support

### Authentication Flow

- **Anonymous users**: Auto-generated UUID stored in localStorage
- **Registered users**: Custom auth with bcryptjs password hashing
- No JWT tokens - session managed through user context and API validation

### PWA & Offline Strategy

- Offline page at `app/~offline/page.tsx`
- localStorage caching for data persistence
- API sync when connection restored

### Prayer Times

- Zone-based prayer time calculation (Malaysian zones)
- Zone codes in `app/constant/zones.tsx`
- Hijri calendar support via `moment-hijri`

### AI Analysis

- Google Gemini API integration in `app/lib/ai-service.ts`
- Weekly/monthly progress reports stored in `analyticsTable`
- Triggered via user action or cron

### Internationalization

- English (`messages/en.json`) and Malay (`messages/ms.json`)
- Next.js i18n routing

### Deployment

- SST configuration in `sst.config.ts`
- Cron job for push notifications in `lambda/cron.ts`
- Environment variables: DATABASE_URL, GEMINI_API, CRON_AUTH_TOKEN, Cloudflare zone settings

## Component Patterns

- Client components marked with `"use client"` directive
- UI primitives from Radix UI in `app/components/ui/`
- Feature components organized by domain in `app/_components/`
- Garden metaphor: progress visualized as plants growing (`public/flowers/`)

## Task Categories

Defined in `app/constant/todo.tsx`:
- Recommended
- Prayer
- Zikir
- Daily

Each task has `isPeriodCan` flag indicating whether female users can complete during menstruation.
