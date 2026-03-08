# Technical Design: Salary Input Fix & Frequency Field

## 1. Technical Approach

### 1.1 Quick Win: Fix Default "0" in Salary Inputs
- **File**: `src/components/dashboard/application-form.tsx`
- **Change**: Replace `|| 0` with `|| null` in defaultValues for salary fields (lines 115-117)
- **Impact**: Salary inputs will show empty placeholders instead of "0" when no value is provided

### 1.2 New Feature: Salary Frequency Column
Add a new column to store salary frequency (hourly/monthly/yearly) to properly contextualize salary values.

---

## 2. Architecture Decisions

| Decision | Rationale |
|----------|-----------|
| **TEXT column for salary_frequency** | Simple, no migration needed for enum. Validated at app level. |
| **Selector in same card as salary inputs** | Keeps related information together; familiar UX pattern |
| **Default to null (not 'month')** | Users may not want to specify frequency; let them choose explicitly |
| **Display frequency in table compactly** | e.g., "$120K/yr" or "$50/hr" — clear at a glance |

---

## 3. Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           USER INTERFACE                                │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────────┐ │
│  │ ApplicationForm │    │ Applications    │    │ Statistics Charts   │ │
│  │ (salary + freq) │    │ Table           │    │ (if applicable)     │ │
│  └────────┬────────┘    └────────┬────────┘    └──────────┬──────────┘ │
└───────────┼──────────────────────┼─────────────────────────┼────────────┘
            │                      │                         │
            ▼                      ▼                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         SERVER ACTIONS (actions.ts)                     │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ createApplication() / updateApplication()                           │ │
│  │ - salary_frequency: data.salaryFrequency || null                   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      SUPABASE DATABASE                                   │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ applications table                                                 │ │
│  │ - salary_desired: numeric                                          │ │
│  │ - salary_expressed: numeric (nullable)                             │ │
│  │ - salary_offer: numeric (nullable)                                  │ │
│  │ - salary_frequency: text (nullable)  ◄── NEW COLUMN                │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────┬─────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATA FETCHING (data.ts)                         │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │ fetchUserApplications() / getApplicationById()                   │ │
│  │ - Maps salary_frequency from DB to Application.salaryFrequency     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. File Changes Table

| File | Line(s) | Change |
|------|---------|--------|
| `src/lib/definitions.ts` | 27-31 | Add `salaryFrequency?: 'hour' \| 'month' \| 'year'` to Application type |
| `src/components/dashboard/application-form.tsx` | 52-56 | Add `salaryFrequency` to Zod schema |
| `src/components/dashboard/application-form.tsx` | 114-118 | Change `\|\| 0` to `\|\| null` for salary defaults |
| `src/components/dashboard/application-form.tsx` | 115-118 | Add `salaryFrequency: application?.salaryFrequency \|\| null` to defaults |
| `src/components/dashboard/application-form.tsx` | 463-517 | Add salary frequency Select in "Información Salarial" card (after salary inputs) |
| `src/lib/actions.ts` | 47-49 (create) | Add `salary_frequency: data.salaryFrequency \|\| null` |
| `src/lib/actions.ts` | 95-97 (update) | Add `salary_frequency: data.salaryFrequency \|\| null` |
| `src/lib/data.ts` | 38-42 | Add `salaryFrequency: app.salary_frequency` to salary object mapping |
| `src/lib/data.ts` | 87-91 | Same mapping in getApplicationById |
| `src/components/dashboard/applications-table.tsx` | 236-282 | Display frequency suffix (e.g., "/hr", "/mo", "/yr") next to salary values |

---

## 5. Testing Strategy

### Manual Testing Checklist
- [ ] Create new application without salary → salary fields show placeholder (not "0")
- [ ] Create new application with salary frequency → value saved correctly
- [ ] Edit existing application → frequency loads in form
- [ ] Table displays salary with frequency suffix
- [ ] Statistics (if any) handle new column gracefully

### Edge Cases
- **Existing data**: Null frequency for old records → display as default (no suffix or "N/A")
- **Invalid frequency**: Only accept 'hour', 'month', 'year' in Zod validation

---

## 6. Migration Plan (SQL)

Run in Supabase SQL Editor:

```sql
-- Add salary_frequency column
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS salary_frequency TEXT;

-- Optional: Add check constraint (recommended)
ALTER TABLE applications 
ADD CONSTRAINT salary_frequency_check 
CHECK (salary_frequency IN ('hour', 'month', 'year') OR salary_frequency IS NULL);

-- Optional: Index for query performance (if filtering by frequency)
CREATE INDEX IF NOT EXISTS idx_applications_salary_frequency 
ON applications(salary_frequency);
```

---

## 7. Open Questions

1. **Backward compatibility**: Should old salary values be assumed as "yearly" (common default)? 
   - *Recommendation*: Yes, treat null as "year" for display purposes, but don't store a default value.

2. **Statistics impact**: Do charts need to normalize salary values based on frequency?
   - *Recommendation*: For MVP, no. Future enhancement could convert all to annual for comparison.

3. **Currency**: Should we add a currency field (USD/EUR/etc.) in a future iteration?
   - *Recommendation*: Scope to MVP first. Currency can be a separate issue.

---

## 8. Implementation Order

1. Run SQL migration
2. Update TypeScript definitions
3. Update data.ts mapping
4. Update server actions
5. Update form UI (fix "0" + add selector)
6. Update table display
7. Test end-to-end
