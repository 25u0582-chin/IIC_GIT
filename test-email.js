#!/usr/bin/env node
// Simple SMTP test script to verify email configuration

import 'dotenv/config';
import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM || 'Festie 2K26 <noreply@festie2k26.local>';

console.log('📧 Email Configuration Test\n');
console.log('Configuration loaded:');
console.log(`  SMTP_HOST: ${SMTP_HOST}`);
console.log(`  SMTP_PORT: ${SMTP_PORT}`);
console.log(`  SMTP_USER: ${SMTP_USER ? '✓ Set' : '✗ NOT SET'}`);
console.log(`  SMTP_PASS: ${SMTP_PASS ? '✓ Set' : '✗ NOT SET'}`);
console.log(`  SMTP_FROM: ${SMTP_FROM}`);

if (!SMTP_USER || !SMTP_PASS) {
  console.log('\n❌ ERROR: Email credentials are not configured!');
  console.log('\n📝 To fix this:');
  console.log('  1. Go to https://myaccount.google.com/apppasswords');
  console.log('  2. Generate an "App Password" for Gmail');
  console.log('  3. Edit .env file and set:');
  console.log('     SMTP_USER=your-email@gmail.com');
  console.log('     SMTP_PASS=your-16-char-app-password');
  console.log('  4. Save and restart the server');
  process.exit(1);
}

console.log('\n🔍 Testing SMTP connection...\n');

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ SMTP Connection Failed:');
    console.log(`   ${error.message}\n`);
    console.log('Troubleshooting:');
    console.log('  • Check SMTP_USER is your full Gmail address');
    console.log('  • Check SMTP_PASS is the 16-char App Password (not your Gmail password)');
    console.log('  • Ensure 2FA is enabled on your Google Account');
    console.log('  • Visit https://myaccount.google.com/apppasswords to generate new password');
    process.exit(1);
  } else {
    console.log('✅ SMTP Connection Successful!\n');
    console.log('📨 Sending test email...\n');

    const testEmail = SMTP_USER;

    transporter.sendMail(
      {
        from: SMTP_FROM,
        to: testEmail,
        subject: '✅ Festie 2K26 - Email Configuration Working!',
        html: `
          <div style="font-family:Arial;background:#020408;color:#e8f4f8;padding:32px">
            <div style="max-width:640px;margin:0 auto;border:1px solid rgba(0,245,255,.2);background:rgba(255,255,255,.03);padding:32px;border-radius:8px">
              <h1 style="color:#00f5ff;margin:0 0 16px">✅ Email System Working!</h1>
              <p style="font-size:16px;line-height:1.8">Your Festie 2K26 email configuration is properly set up.</p>
              <div style="margin:20px 0;padding:16px;background:rgba(0,245,255,.08);border-left:4px solid #00f5ff;border-radius:4px">
                <p style="margin:0;font-size:14px"><strong>System Status:</strong></p>
                <p style="margin:8px 0 0;font-size:13px">✓ SMTP Connection: Active</p>
                <p style="margin:4px 0 0;font-size:13px">✓ Authentication: Success</p>
                <p style="margin:4px 0 0;font-size:13px">✓ Email Delivery: Ready</p>
              </div>
              <p style="font-size:12px;color:rgba(232,244,248,.7);margin:20px 0">
                Participants will now receive real congratulations emails with their Pass IDs and QR codes when they register.
              </p>
            </div>
          </div>
        `,
        text: 'Your Festie 2K26 email configuration is properly set up. SMTP connection is active and authentication successful. Email delivery is ready.',
      },
      (error, info) => {
        if (error) {
          console.log('❌ Email Send Failed:');
          console.log(`   ${error.message}\n`);
          process.exit(1);
        } else {
          console.log('✅ Test email sent successfully!\n');
          console.log('📧 Check your inbox (and spam folder) for the test email.');
          console.log('\n✅ Your email system is ready for production!');
          console.log('   Participants will receive real emails with their Pass IDs.');
          process.exit(0);
        }
      }
    );
  }
});
