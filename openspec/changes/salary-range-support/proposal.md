# Proposal: Salary Range Support

## Intent

Currently, salary fields (`salary_desired` and `salary_expressed`) only support single numeric values. However, in many job applications, candidates have a salary range in mind, or companies express a range for the role. Supporting ranges allows for more accurate tracking of salary expectations and offers.

## Scope

### In Scope
- Database schema update to support min/max values for desired and expressed salaries.
- Update TypeScript definitions to reflect range support.
- Modify `ApplicationForm.tsx` to include a toggle for "Fixed" vs "Range" salary and appropriate input fields.
- Update Server Actions (`createApplication`, `updateApplication`) to handle range data.
- Update data fetching logic to map DB columns to the updated frontend structure.
- Ensure existing single-value data remains valid (migration/compatibility).

### Out of Scope
- Salary range support for the `offer` field (typically offers are fixed amounts, though we could reconsider this if needed).
- Advanced analytics based on ranges (this will be part of a future statistics enhancement).

## Approach

### Data Migration & Storage
We will add four new columns to the `applications` table in Supabase:
- `salary_desired_min` (numeric)
- `salary_desired_max` (numeric)
- `salary_expressed_min` (numeric)
- `salary_expressed_max` (numeric)

We will keep `salary_desired` and `salary_expressed` as the primary fields for single values. If a range is provided, the single value field will store the average of the range (or we can leave it null and rely on the new columns). 

*Alternative Approach*: Use `JSONB` for the `salary` field. This would be more flexible but might make SQL-based analytics harder. Given the current structure, adding columns is more idiomatic for this project.

### UI/UX
- In the `ApplicationForm`, each salary input (Desired/Expressed) will have a "Range" toggle.
- If "Fixed" (default): Show one input (mapped to existing field).
- If "Range": Show two inputs (Min/Max).

### Types
Update `ApplicationSalary` in `src/lib/definitions.ts`:
```typescript
export type SalaryValue = number | { min: number; max: number };

export type ApplicationSalary = {
  desired: SalaryValue;
  expressed?: SalaryValue;
  offer?: number;
  frequency?: ApplicationSalaryFrequency;
};
```

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `Supabase Schema` | Modified | Add `salary_desired_min/max` and `salary_expressed_min/max` columns. |
| `src/lib/definitions.ts` | Modified | Update `ApplicationSalary` type. |
| `src/components/dashboard/application-form.tsx` | Modified | Add range toggle and min/max inputs. Update Zod schema. |
| `src/lib/actions.ts` | Modified | Handle range data in `createApplication` and `updateApplication`. |
| `src/lib/data.ts` | Modified | Map new DB columns to the frontend `ApplicationSalary` object. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Data inconsistency between single value and range columns. | Medium | Use a clear priority logic in the data fetching layer (prefer range if present). |
| Breaking existing statistics/charts. | Low | Most charts currently use the single value fields. We will ensure these remain populated with a representative value (e.g., the average of the range). |
| Increased complexity in the form. | Low | Use a clean UI toggle to keep the form simple for the majority of cases. |

## Rollback Plan

1. Revert code changes in `src/`.
2. Keep the new DB columns (they won't interfere if not used) or drop them if no data was migrated.
3. If data was migrated, ensure single-value columns are restored from the min/max values.

## Dependencies

- Supabase DB access for schema modifications.

## Success Criteria

- [ ] Users can toggle between "Fixed" and "Range" for desired and expressed salaries.
- [ ] Ranges are correctly saved to and retrieved from the database.
- [ ] Existing applications with single-value salaries still display correctly.
- [ ] The dashboard and statistics continue to function without errors.
