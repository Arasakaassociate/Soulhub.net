# Supabase Email Configuration

## Issue
Users are seeing "Email address is invalid" errors when trying to sign up. This is because Supabase has email confirmation enabled by default, but no email service is configured.

## Solution

### Option 1: Disable Email Confirmation (Recommended for Development)
1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Providers** → **Email**
3. Find the **"Confirm email"** setting
4. **Disable** it (toggle off)
5. Save changes

This allows users to sign up immediately without email verification.

### Option 2: Configure Email Service (Recommended for Production)
If you want to keep email confirmation:
1. Go to **Authentication** → **Email Templates**
2. Configure an email provider (SendGrid, Mailgun, AWS SES, etc.)
3. Set up SMTP settings
4. Customize email templates

## Testing
After disabling email confirmation:
1. Try signing up with a new email
2. Should work immediately without verification
3. User can log in right away

## Security Note
For production, you should enable email confirmation with a proper email service to prevent spam accounts and verify user identities.
