import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import QRCode from 'qrcode';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = Number(process.env.PORT || 3001);
const dataDir = path.join(__dirname, 'data');
const registrationsFile = path.join(dataDir, 'registrations.json');
const emailMode = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS ? 'smtp' : 'preview';

app.use(express.json({ limit: '1mb' }));
app.use(cors({ origin: 'http://localhost:5173' }));

const mailTransport =
  emailMode === 'smtp'
    ? nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })
    : nodemailer.createTransport({
        streamTransport: true,
        buffer: true,
        newline: 'unix',
      });

async function ensureStore() {
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }

  if (!existsSync(registrationsFile)) {
    await writeFile(registrationsFile, '[]', 'utf8');
  }
}

async function readRegistrations() {
  await ensureStore();

  try {
    const file = await readFile(registrationsFile, 'utf8');
    const parsed = JSON.parse(file);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveRegistration(registration) {
  const registrations = await readRegistrations();
  registrations.push(registration);
  await writeFile(registrationsFile, JSON.stringify(registrations, null, 2), 'utf8');
}

function buildEmailHtml(registration) {
  return `
    <div style="font-family:Arial,sans-serif;background:#020408;color:#e8f4f8;padding:32px">
      <div style="max-width:640px;margin:0 auto;border:1px solid rgba(0,245,255,.2);background:rgba(255,255,255,.03);padding:32px;border-radius:8px">
        <h1 style="margin:0 0 24px;font-size:32px;color:#00f5ff;text-align:center">🎉 Congratulations!</h1>
        
        <p style="font-size:18px;line-height:1.8;margin:0 0 24px;text-align:center">
          <strong>${registration.firstName}, your registration to Festie 2K26 is confirmed!</strong>
        </p>
        
        <div style="margin:24px 0;padding:20px;border:2px solid #00f5ff;background:rgba(0,245,255,.08);border-radius:6px;text-align:center">
          <p style="margin:0 0 12px;font-size:14px;color:#00f5ff">YOUR PASS ID</p>
          <p style="margin:0;font-size:24px;font-weight:bold;font-family:monospace;color:#adff2f;letter-spacing:2px">${registration.id}</p>
          <p style="margin:12px 0 0;font-size:12px;color:rgba(232,244,248,.7)">Keep this ID safe - you'll need it at check-in</p>
        </div>
        
        <div style="margin:24px 0;padding:16px;border-left:4px solid #ff006e;background:rgba(255,0,110,.08);border-radius:4px">
          <p style="margin:0 0 8px"><strong>📋 Registration Details:</strong></p>
          <p style="margin:0 0 6px;font-size:14px">Category: ${registration.category}</p>
          <p style="margin:0 0 6px;font-size:14px">College: ${registration.college}</p>
          <p style="margin:0;font-size:14px">Year: ${registration.year}</p>
        </div>
        
        <div style="margin:24px 0;padding:16px;background:rgba(173,255,47,.1);border-left:4px solid #adff2f;border-radius:4px">
          <p style="margin:0 0 8px;font-size:14px"><strong>📱 Your Event Pass QR Code:</strong></p>
          <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(232,244,248,.85)">
            View your personalized QR code pass online: <br>
            <a href="http://localhost:5173/profile?id=${registration.id}" style="color:#00f5ff;text-decoration:none;font-weight:bold">Get Your Digital Pass →</a>
          </p>
        </div>
        
        <p style="font-size:13px;line-height:1.7;margin:24px 0;color:rgba(232,244,248,.7)">
          <strong>What's Next?</strong><br>
          ✓ Save this email<br>
          ✓ Download your QR code pass<br>
          ✓ Bring your pass ID to check-in on event day<br>
          ✓ Join our WhatsApp group for updates
        </p>
        
        <p style="font-size:12px;text-align:center;margin:24px 0;color:rgba(232,244,248,.6);border-top:1px solid rgba(0,245,255,.1);padding-top:16px">
          See you at Festie 2K26! • KLS GIT BELGAVI • March 14-16, 2026
        </p>
      </div>
    </div>
  `;
}

function buildEmailText(registration) {
  return [
    '🎉 CONGRATULATIONS! 🎉',
    '',
    `${registration.firstName}, your registration to Festie 2K26 is confirmed!`,
    '',
    '═══════════════════════════════════',
    'YOUR PASS ID (Save this!)',
    '═══════════════════════════════════',
    registration.id,
    '',
    '📋 REGISTRATION DETAILS:',
    `  Category: ${registration.category}`,
    `  College: ${registration.college}`,
    `  Year: ${registration.year}`,
    '',
    '📱 YOUR QR CODE PASS:',
    'View your digital pass online at:',
    `  http://localhost:5173/profile?id=${registration.id}`,
    '',
    'WHAT\'S NEXT:',
    '  ✓ Save this email',
    '  ✓ Download your QR code pass',
    '  ✓ Bring your pass ID to check-in',
    '  ✓ Join our WhatsApp group for updates',
    '',
    '═══════════════════════════════════',
    'We are excited to welcome you to Festie 2K26!',
    'KLS GIT BELGAVI | March 14-16, 2026',
    '═══════════════════════════════════',
  ].join('\n');
}

function validateRegistration(payload) {
  const errors = {};
  const firstName = String(payload.firstName || '').trim();
  const lastName = String(payload.lastName || '').trim();
  const email = String(payload.email || '').trim();
  const phone = String(payload.phone || '').trim();
  const college = String(payload.college || '').trim();
  const year = String(payload.year || '').trim();
  const category = String(payload.category || '').trim();

  if (!firstName) errors.firstName = 'First name is required.';
  if (!lastName) errors.lastName = 'Last name is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (!/^[0-9+\s\-]{8,}$/.test(phone)) errors.phone = 'Enter a valid phone number.';
  if (!college) errors.college = 'College name is required.';
  if (!year) errors.year = 'Year of study is required.';
  if (!category) errors.category = 'Event category is required.';

  return {
    errors,
    data: {
      firstName,
      lastName,
      email,
      phone,
      college,
      year,
      category,
      team: String(payload.team || '').trim(),
      notes: String(payload.notes || '').trim(),
    },
  };
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, status: 'ready' });
});

app.get('/api/registration/:id', async (request, response) => {
  const { id } = request.params;
  const registrations = await readRegistrations();
  const registration = registrations.find((reg) => reg.id === id);

  if (!registration) {
    return response.status(404).json({ message: 'Registration not found.' });
  }

  return response.json(registration);
});

app.get('/api/registration/:id/qrcode', async (request, response) => {
  const { id } = request.params;
  const registrations = await readRegistrations();
  const registration = registrations.find((reg) => reg.id === id);

  if (!registration) {
    return response.status(404).json({ message: 'Registration not found.' });
  }

  const qrData = JSON.stringify({
    id: registration.id,
    name: `${registration.firstName} ${registration.lastName}`,
    email: registration.email,
    college: registration.college,
    category: registration.category,
    eventDate: '2026-03-14 to 2026-03-16',
  });

  try {
    const qrCode = await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      width: 300,
      color: {
        dark: '#00f5ff',
        light: '#020408',
      },
    });

    return response.json({ qrCode, registration });
  } catch (error) {
    console.error('QR code generation failed:', error.message);
    return response.status(500).json({ message: 'Could not generate QR code.' });
  }
});

app.post('/api/register', async (request, response) => {
  const { errors, data } = validateRegistration(request.body || {});

  if (Object.keys(errors).length > 0) {
    return response.status(400).json({
      message: 'Please fix the highlighted fields and try again.',
      errors,
    });
  }

  const registration = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };

  await saveRegistration(registration);

  try {
    const info = await mailTransport.sendMail({
      from: process.env.SMTP_FROM || 'Festie 2K26 <noreply@festie2k26.local>',
      to: registration.email,
      subject: `Congratulations ${registration.firstName}! Festie 2K26 registration confirmed`,
      text: buildEmailText(registration),
      html: buildEmailHtml(registration),
    });

    if (emailMode !== 'smtp') {
      console.log('Email preview generated for:', registration.email);
      console.log(info.message.toString());
    }
  } catch (error) {
    console.error('Email delivery failed:', error.message);
    return response.status(500).json({
      message: 'Registration saved, but the congratulations email could not be sent.',
    });
  }

  return response.status(201).json({
    message: `Congratulations ${registration.firstName}! Your registration is confirmed and a congratulations email has been sent to ${registration.email}.`,
    registrationId: registration.id,
    email: registration.email,
  });
});

app.listen(port, () => {
  console.log(`\n🎉 Festie 2K26 API running on http://localhost:${port}`);
  console.log(`📧 Email Mode: ${emailMode === 'smtp' ? '✅ REAL EMAILS (SMTP)' : '🔍 PREVIEW (Check server logs)'}\n`);
  
  if (emailMode !== 'smtp') {
    console.log('📝 To enable real email delivery:');
    console.log('   1. Edit .env file with Gmail credentials');
    console.log('   2. Run: npm run test:email');
    console.log('   3. Restart the server\n');
  }
});