# Security Policy

## API Keys and Secrets

### Public Keys
You may notice the following keys in our client-side code:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**These are safe to be public.**
The `ANON` key is designed to be exposed in the browser. It allows users to connect to the Supabase instance. Ideally, it has *no privileges* by default. All access to data is controlled via **Row Level Security (RLS)** in the Postgres database.

### Private Keys
The following keys must **NEVER** be committed to Git or exposed in client-side code:
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `DATABASE_URL` (direct connection string)

These keys have administrative privileges and bypass RLS. If you suspect these have been leaked, rotate them immediately in your [Supabase Dashboard](https://supabase.com/dashboard/project/_/settings/api).

## Row Level Security (RLS)

We use Postgres Row Level Security to ensure users can only access their own data.

### Verification
To verify your policies are active, run the following SQL in the [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql):

```sql
-- Check if RLS is enabled on tables
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

Ensure `rowsecurity` is `true` for `profiles`, `companions`, and `messages`.

## Reporting Vulnerabilities
If you find a security issue, please do not open a public issue. Instead, check the repository settings for private reporting.
