# JobTracker - Case Study & Technical Documentation

> A modern, full-stack job application tracking system built with Next.js 15, Supabase, and TypeScript. This README serves as both documentation and a case study exploring the architectural decisions, design patterns, and technical choices that power the application.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture & Design Philosophy](#architecture--design-philosophy)
- [Tech Stack Deep Dive](#tech-stack-deep-dive)
- [Design Patterns](#design-patterns)
- [Key Technical Decisions](#key-technical-decisions)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Features](#features)
- [Roadmap](#roadmap)

---

## Overview

### What is JobTracker?

JobTracker is a comprehensive web application designed to help job seekers manage their application process efficiently. It provides a centralized dashboard for tracking applications, monitoring interview stages, analyzing salary data, and visualizing progress through interactive charts.

### Why This Project Exists

The job search process is inherently chaotic—multiple applications across different platforms, various interview stages, salary negotiations, and feedback from recruiters. JobTracker solves this by providing:

- **Centralized Management**: All applications in one place
- **Progress Tracking**: Visual feedback on application stages
- **Data-Driven Insights**: Statistics and charts to understand your job search patterns
- **Time Management**: Interview scheduling with timezone-aware date handling
- **Salary Intelligence**: Track desired, expressed, and offered salaries

---

## Architecture & Design Philosophy

### Core Principles

1. **Server-First Architecture**: Leveraging Next.js 15's App Router for server-side rendering and data fetching
2. **Type Safety**: Comprehensive TypeScript usage with strict type checking
3. **Component Composition**: Reusable, atomic UI components built with Radix UI primitives
4. **Data Integrity**: Row-Level Security (RLS) in Supabase ensuring user data isolation
5. **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with client-side interactivity

### Architectural Layers

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (React Server/Client Components)       │
├─────────────────────────────────────────┤
│         Business Logic Layer            │
│  (Server Actions, Data Utilities)       │
├─────────────────────────────────────────┤
│         Data Access Layer               │
│  (Supabase Client, Type Definitions)    │
├─────────────────────────────────────────┤
│         Infrastructure Layer            │
│  (Supabase Database, Auth, Storage)     │
└─────────────────────────────────────────┘
```

---

## Tech Stack Deep Dive

### Frontend Framework: Next.js 15 (App Router)

**Why Next.js?**

- **Server Components**: Reduce client-side JavaScript by rendering on the server
- **Built-in Routing**: File-system based routing with layouts and nested routes
- **Performance**: Automatic code splitting, image optimization, and font optimization
- **Developer Experience**: Fast Refresh, TypeScript support, and excellent documentation

**Why App Router over Pages Router?**

- Server Components by default (better performance)
- Nested layouts without prop drilling
- Streaming and Suspense support
- Simplified data fetching with async/await in components

### Backend & Database: Supabase

**Why Supabase?**

- **PostgreSQL**: Robust, ACID-compliant relational database
- **Real-time Subscriptions**: Built-in WebSocket support for live updates (future feature)
- **Row-Level Security**: Database-level authorization, not just application-level
- **Authentication**: Complete auth solution with social providers, magic links, and JWT
- **Edge Functions**: Serverless functions for complex business logic
- **Storage**: Built-in file storage for future resume/document uploads

**Alternative Considered**: Firebase

- **Why Not**: Less SQL flexibility, vendor lock-in concerns, pricing model less predictable

### UI Framework: Tailwind CSS + Shadcn UI

**Why Tailwind CSS?**

- **Utility-First**: Rapid prototyping without context switching
- **Consistency**: Design tokens enforced through configuration
- **Performance**: Purges unused CSS in production
- **Customization**: Easy theming and dark mode support

**Why Shadcn UI?**

- **Copy-Paste Components**: Full ownership of component code (no black box)
- **Radix UI Primitives**: Accessible, unstyled components as foundation
- **Customizable**: Easy to modify and extend
- **Type-Safe**: Full TypeScript support

**Alternative Considered**: Material UI, Chakra UI

- **Why Not**: Larger bundle sizes, less customization flexibility, opinionated styling

### Data Visualization: Recharts

**Why Recharts?**

- **React-Native**: Built specifically for React (not a wrapper)
- **Declarative**: Component-based API matches React paradigms
- **Responsive**: Built-in responsive behavior
- **Customizable**: Easy to style and extend

**Alternative Considered**: Chart.js, D3.js

- **Why Not**:
  - Chart.js: Imperative API, harder to integrate with React
  - D3.js: Steeper learning curve, overkill for our use case

### Form Management: React Hook Form + Zod

**Why React Hook Form?**

- **Performance**: Minimizes re-renders with uncontrolled components
- **Developer Experience**: Simple API, great TypeScript support
- **Bundle Size**: Lightweight (~9KB)
- **Validation**: Integrates seamlessly with Zod

**Why Zod?**

- **Type Inference**: TypeScript types automatically inferred from schema
- **Runtime Validation**: Catches errors at runtime, not just compile time
- **Composable**: Easy to build complex validation schemas
- **Error Messages**: Customizable, user-friendly error messages

### Date Handling: date-fns

**Why date-fns?**

- **Modular**: Import only what you need (tree-shakeable)
- **Immutable**: Pure functions, no mutation
- **TypeScript**: First-class TypeScript support
- **Locale Support**: Internationalization built-in

**Alternative Considered**: Moment.js, Day.js

- **Why Not**:
  - Moment.js: Large bundle size, mutable API
  - Day.js: Smaller but less comprehensive

---

## Design Patterns

### 1. Server Actions Pattern

**What**: Server-side functions that can be called directly from client components.

**Why**:

- Eliminates need for API route boilerplate
- Automatic serialization/deserialization
- Progressive enhancement (works without JS)

**Example**:

```typescript
// lib/actions.ts
'use server';

export async function createApplication(data: ApplicationData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Business logic here
  const { error } = await supabase.from('applications').insert({
    user_id: user.id,
    ...data,
  });

  if (error) throw new Error(error.message);

  revalidatePath('/dashboard');
  return { success: true };
}
```

### 2. Compound Component Pattern

**What**: Components that work together to form a cohesive UI element.

**Why**:

- Flexible API for consumers
- Encapsulated state management
- Clear component relationships

**Example**:

```typescript
// Shadcn UI Select component
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select status" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="applied">Applied</SelectItem>
    <SelectItem value="interview">Interview</SelectItem>
  </SelectContent>
</Select>
```

### 3. Repository Pattern

**What**: Abstraction layer between business logic and data access.

**Why**:

- Decouples data fetching from components
- Easier to test and mock
- Single source of truth for data operations

**Example**:

```typescript
// lib/data.ts
export async function fetchUserApplications() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false });

  return data || [];
}
```

### 4. Optimistic UI Updates

**What**: Update UI immediately, then sync with server.

**Why**:

- Perceived performance improvement
- Better user experience
- Graceful error handling

**Example**:

```typescript
const [isPending, startTransition] = useTransition();

const handleDelete = (id: string) => {
  startTransition(async () => {
    await deleteApplication(id);
    router.refresh(); // Revalidate server data
  });
};
```

### 5. Controlled vs Uncontrolled Components

**Decision**: Use uncontrolled components with React Hook Form for better performance.

**Why**:

- Fewer re-renders (only on submit/blur)
- Better performance with large forms
- Simpler mental model

---

## Key Technical Decisions

### 1. Timezone Handling Strategy

**Problem**: Interview dates were showing incorrect times due to UTC conversion.

**Solution**:

- Store dates as ISO 8601 strings with timezone offset
- Convert to local time on display using `date-fns`
- Convert from local time to UTC on save

**Why This Approach**:

- Industry standard for datetime storage
- Supports users in different timezones
- Prevents data loss from timezone shifts

**Code**:

```typescript
// On save: Local → UTC
const isoString = new Date(localDateTimeString).toISOString();

// On display: UTC → Local
const localDisplay = format(new Date(isoString), 'PPpp');
```

### 2. Authentication Flow

**Decision**: Use Supabase Auth with middleware protection.

**Why**:

- Secure, battle-tested authentication
- Automatic session management
- Built-in email verification and password reset
- JWT-based, works with server components

**Implementation**:

```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const supabase = createServerClient(/* ... */);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}
```

### 3. State Management

**Decision**: No global state management library (Redux, Zustand, etc.).

**Why**:

- Server Components reduce need for client state
- React Hook Form manages form state
- URL state for filters and pagination
- Server Actions handle mutations

**When We Might Need It**:

- Real-time collaboration features
- Complex client-side interactions
- Offline-first capabilities

### 4. Data Fetching Strategy

**Decision**: Server-side data fetching in Server Components.

**Why**:

- Faster initial page load (no client-side waterfall)
- SEO benefits
- Reduced client bundle size
- Direct database access (no API layer needed)

**Pattern**:

```typescript
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const applications = await fetchUserApplications();

  return <ApplicationsTable applications={applications} />;
}
```

### 5. Error Handling

**Decision**: Multi-layered error handling strategy.

**Layers**:

1. **Database Level**: Constraints and triggers
2. **Server Action Level**: Try-catch with user-friendly messages
3. **Component Level**: Error boundaries and error.tsx files
4. **User Feedback**: Toast notifications for async operations

**Example**:

```typescript
try {
  await createApplication(data);
  toast({ title: 'Success', description: 'Application created' });
} catch (error) {
  toast({
    title: 'Error',
    description: 'Failed to create application',
    variant: 'destructive',
  });
}
```

### 6. Form Validation

**Decision**: Client-side validation with Zod, server-side re-validation.

**Why**:

- Better UX with immediate feedback
- Security through server-side validation
- Type safety with shared schemas

**Pattern**:

```typescript
// Shared schema
const applicationSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  role: z.string().min(1, 'Role is required'),
  // ...
});

// Client: React Hook Form + Zod
const form = useForm({
  resolver: zodResolver(applicationSchema),
});

// Server: Re-validate
export async function createApplication(data: unknown) {
  const validated = applicationSchema.parse(data); // Throws if invalid
  // ...
}
```

---

## Project Structure

```
jobtracker/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Auth route group (shared layout)
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.tsx
│   │   ├── dashboard/                # Protected routes
│   │   │   ├── applications/
│   │   │   │   ├── [id]/            # Dynamic route for editing
│   │   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   ├── statistics/
│   │   │   ├── settings/
│   │   │   ├── layout.tsx           # Dashboard layout with sidebar
│   │   │   └── page.tsx
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Landing page
│   ├── components/
│   │   ├── charts/                  # Recharts components
│   │   │   ├── application-flow-chart.tsx
│   │   │   ├── status-distribution-chart.tsx
│   │   │   └── salary-range-chart.tsx
│   │   ├── dashboard/               # Complex business components
│   │   │   ├── application-form.tsx
│   │   │   ├── applications-table.tsx
│   │   │   ├── date-range-filter.tsx
│   │   │   └── sidebar.tsx
│   │   └── ui/                      # Shadcn UI primitives
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── ...
│   ├── lib/
│   │   ├── actions.ts               # Server Actions (CRUD operations)
│   │   ├── data.ts                  # Data fetching functions
│   │   ├── definitions.ts           # TypeScript types
│   │   └── date-utils.ts            # Date filtering logic
│   └── utils/
│       └── supabase/
│           ├── client.ts            # Client-side Supabase client
│           ├── server.ts            # Server-side Supabase client
│           └── middleware.ts        # Auth middleware
├── public/                          # Static assets
├── .env.local                       # Environment variables
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Key Directories Explained

- **`app/`**: Next.js 15 App Router. Each folder represents a route.
- **`components/ui/`**: Atomic, reusable UI components from Shadcn UI.
- **`components/dashboard/`**: Composed, feature-specific components.
- **`lib/`**: Business logic, data access, and type definitions.
- **`utils/`**: Utility functions and configurations.

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account (free tier works)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/jobtracker.git
   cd jobtracker
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Set up Supabase**:

   - Create a new project in Supabase
   - Run the SQL migrations (see `docs/database-schema.sql`)
   - Enable Row Level Security policies

5. **Run the development server**:

   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

---

## Features

### ✅ Completed (MVP)

- **Authentication**: Login, register, password reset
- **Application Management**: Full CRUD operations
- **Dynamic Stages**: Interview and offer stage tracking
- **Statistics Dashboard**:
  - Application flow (Sankey diagram)
  - Status distribution (Pie chart)
  - Salary analysis (Bar chart)
- **Date Filtering**: 30 days, 3 months, 6 months, 1 year, custom range
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode**: System-aware theme switching
- **Visual Feedback**: Confetti and toasts for progress milestones

### 🚧 In Progress

- **Settings Page**: User profile editing
- **Loading States**: Skeleton screens for better UX

### 📋 Roadmap

See [AGENTS.md](./AGENTS.md) for detailed roadmap.

---

## Contributing

Contributions are welcome! Please read the [Contributing Guide](./CONTRIBUTING.md) first.

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful components
- [Vercel](https://vercel.com/) for hosting and deployment

---

**Built with ❤️ by [Your Name]**
