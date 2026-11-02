# Security Policy

## Supported versions

Only the latest deployment from the `main` branch is supported with security updates.

## Reporting a vulnerability

Please do not open a public issue for a security problem.

Use GitHub private vulnerability reporting:

<https://github.com/Gianni03/JobTracker/security/advisories/new>

If private reporting is not available, contact the maintainer privately and include:

- a short description of the issue;
- the affected route, action, or dependency;
- reproduction steps or a proof of concept;
- the potential impact;
- any suggested remediation.

Do not include real user data, credentials, or production secrets in the report. Use synthetic examples whenever possible.

## Scope

In scope:

- authentication, session handling, and authorization;
- Row Level Security and cross-user data access;
- server actions and API routes;
- secrets exposure and dependency vulnerabilities;
- privacy issues involving real user data.

Out of scope:

- denial-of-service tests against production;
- social engineering;
- reports that require access to another user's account or production data;
- automated scanner output without a demonstrated impact.

## Disclosure

Please give the maintainer a reasonable opportunity to investigate and fix the issue before any public disclosure. Best effort is made to acknowledge reports, but this is a small project without a bug bounty program.
