import { describe, expect, it } from 'vitest';
import {
  passwordFormSchema,
  passwordUpdateSchema,
  profileSchema,
} from '@/lib/validation/profile';

describe('profileSchema', () => {
  it('trims the name and defaults the last name', () => {
    const parsed = profileSchema.parse({ firstName: '  Gianni  ' });

    expect(parsed.firstName).toBe('Gianni');
    expect(parsed.lastName).toBe('');
  });

  it('rejects an empty first name', () => {
    expect(profileSchema.safeParse({ firstName: '   ' }).success).toBe(false);
  });
});

describe('passwordFormSchema', () => {
  it('accepts matching passwords with at least 8 characters', () => {
    expect(
      passwordFormSchema.safeParse({
        password: 'supersecret',
        confirmPassword: 'supersecret',
      }).success,
    ).toBe(true);
  });

  it('rejects short passwords and mismatches', () => {
    expect(
      passwordFormSchema.safeParse({
        password: 'short',
        confirmPassword: 'short',
      }).success,
    ).toBe(false);
    expect(
      passwordFormSchema.safeParse({
        password: 'supersecret',
        confirmPassword: 'different',
      }).success,
    ).toBe(false);
  });

  it('keeps the server-side update schema free of confirmation fields', () => {
    expect(
      passwordUpdateSchema.safeParse({ password: 'supersecret' }).success,
    ).toBe(true);
    expect(passwordUpdateSchema.safeParse({ password: 'short' }).success).toBe(
      false,
    );
  });
});
