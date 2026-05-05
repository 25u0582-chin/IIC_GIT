# Email Setup & Troubleshooting Guide

## Why Emails Aren't Being Sent

The `.env` file contains **placeholder values** instead of your actual Gmail credentials. The system needs real SMTP credentials to send emails.

## Step-by-Step Setup

### 1️⃣ Enable 2-Factor Authentication (Required)

Before you can generate an App Password, 2FA must be enabled:

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Click "2-Step Verification" on the left sidebar
3. Follow the prompts to enable 2FA
4. Once enabled, you'll see "App passwords" option

### 2️⃣ Generate Gmail App Password

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select **"Mail"** from the first dropdown
3. Select **"Windows Computer"** (or your device type) from the second dropdown
4. Click **"Generate"**
5. Google will show a 16-character password like: `abcd efgh ijkl mnop`
6. **Copy this password** (without spaces)

### 3️⃣ Update Your `.env` File

Edit `d:\iic\festie2k26\.env` and replace the placeholders:

```env
PORT=3001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-actual-gmail@gmail.com
SMTP_PASS=your-16-char-password-without-spaces
SMTP_FROM=Festie 2K26 <your-actual-gmail@gmail.com>
```

**Example (do NOT use this):**
```env
SMTP_USER=john.doe@gmail.com
SMTP_PASS=abcdefghijklmnop
SMTP_FROM=Festie 2K26 <john.doe@gmail.com>
```

### 4️⃣ Test Your Configuration

**Option A: Quick Test (Recommended)**

```bash
npm run test:email
```

This will:
- ✅ Verify `.env` has credentials set
- ✅ Test SMTP connection
- ✅ Send a test email to your Gmail
- ✅ Show detailed error messages if something's wrong

**Option B: Restart Server**

1. Stop current `npm run dev` (Ctrl+C)
2. Restart: `npm run dev`
3. Register a participant
4. Check your Gmail inbox (and spam folder)

## Common Issues & Solutions

### ❌ "Email preview generated" still showing

**Problem:** Server is still in preview mode (credentials not set correctly)

**Solution:**
1. Check `.env` file - SMTP_USER and SMTP_PASS must NOT be placeholders
2. Ensure no extra spaces in the SMTP_PASS
3. Restart the server after editing `.env`

### ❌ "Invalid SMTP Credentials"

**Problem:** App Password not generated correctly or wrong credentials

**Solution:**
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) again
2. Make sure 2FA is enabled first
3. Generate a new App Password
4. Paste the **entire 16-character string** (remove spaces)
5. Save `.env` and restart server

### ❌ "Less secure apps" error

**Problem:** Using your actual Gmail password instead of App Password

**Solution:**
- NEVER use your actual Gmail password
- ALWAYS use the 16-character App Password from the apppasswords page
- Generate a new App Password if unsure

### ❌ Email goes to Spam folder

**Problem:** Gmail marks your test email as spam (normal for first emails)

**Solution:**
1. Check spam folder for the email
2. Mark as "Not Spam"
3. Future emails from your Gmail address will go to inbox

### ❌ "Connection refused" or timeout

**Problem:** Network issue or firewall blocking SMTP

**Solution:**
1. Check internet connection
2. Try from a different network (hotspot)
3. Check firewall/antivirus isn't blocking port 587
4. Try SMTP_PORT=465 with SMTP_SECURE=true as alternative

## Verification Checklist

✅ 2FA enabled on Google Account  
✅ App Password generated (16 characters)  
✅ `.env` file updated with real credentials  
✅ No spaces in SMTP_PASS  
✅ Server restarted after `.env` changes  
✅ `npm run test:email` shows "Connection Successful"  

## What Happens When It Works

When configured correctly:
1. User registers on the site
2. Server sends email with:
   - ✅ Congratulations message
   - ✅ Pass ID (for check-in)
   - ✅ QR code link
   - ✅ Event details
3. Email appears in user's inbox within seconds
4. User can click link to view their digital pass

## Need Help?

Run the test command to see detailed diagnostics:

```bash
npm run test:email
```

This will show exactly what's wrong and how to fix it.
