# Festie2k26

Festie2k26 is a React + Vite single-page event website for a fictional inter-college festival. The site is built as a high-energy landing experience for promotion, discovery, and participant registration, with dedicated sections for the event overview, 3-day schedule, hackathon themes, FAQs, contact details, and festival background.

## Project Overview

This project presents Festie2k26 as a bold, animated college fest microsite with:

- a hero section with animated counters and CTA buttons
- smooth in-page navigation across all major sections
- a themed event overview for technical, cultural, sports, and pro-night experiences
- a tabbed 3-day schedule
- hackathon themes and sample problem statements
- a registration form with client-side validation
- an accordion-style FAQ section
- contact and venue details
- an about section describing the festival identity
- a custom cursor and scroll-reveal effects for a more immersive feel

## Tech Stack

- React 19
- Vite 8
- CSS Modules
- Plain CSS for global styles and animations
- ESLint for linting

## Main Sections In The Site

### Hero

The landing section introduces Festie2k26 with animated stats for:

- 5000+ participants
- 40+ events
- 3+ days
- 50+ colleges

It also includes quick actions for registration and theme exploration.

### Overview

The overview section explains the event positioning and highlights four main categories:

- Technical Events
- Cultural Events
- Sports Arena
- Pro Nights

### Schedule

The schedule is organized into three tabs:

- Day 1: inauguration, hackathon kickoff, sports opening, dance battle
- Day 2: hackathon midpoint, paper presentation, tech quiz, drama, fine arts, pro night
- Day 3: hackathon finals, sports finals, fashion show, prize distribution

### Themes

The hackathon section showcases six themes:

- AI & Machine Learning
- Sustainability Tech
- Smart Cities
- Cybersecurity
- EdTech
- HealthTech

Each theme includes short sample problem statements.

### Registration

The registration section contains:

- participant details form
- event category selection
- validation for required fields, email, and phone
- backend submission to save registrations
- congratulations email sent to the registered address
- post-submit success state
- registration perks and participation benefits

Backend setup for local development:

- `npm run dev` starts both the Vite frontend and the registration API
- registrations are stored locally in `server/data/registrations.json`
- email delivery uses SMTP credentials from `.env` when available
- if SMTP is not configured, the server still accepts registrations and logs the mail preview for development

Environment variables supported by the backend:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

#### Setting Up Email Delivery

To send real congratulations emails to registered participants:

1. **For Gmail Users:**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Enable 2-Factor Authentication if not already enabled
   - Visit [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your device)
   - Generate an app-specific password
   - Copy the `.env.example` to `.env` and fill in:
     ```
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_SECURE=false
     SMTP_USER=your-email@gmail.com
     SMTP_PASS=your-generated-app-password
     SMTP_FROM=Festie 2K26 <your-email@gmail.com>
     ```

2. **For Outlook/Office365:**
   ```
   SMTP_HOST=smtp.office365.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@outlook.com
   SMTP_PASS=your-password
   SMTP_FROM=Festie 2K26 <your-email@outlook.com>
   ```

3. **Restart the Dev Server:**
   - Save `.env` file
   - Restart with `npm run dev`
   - The server will now send real emails instead of previewing them

#### Email Features

When a user registers, they receive:
- Personalized congratulations email
- Registration ID (Pass ID)
- Event category and college details
- Link to their digital pass with QR code
- Event date and venue information

### FAQ

The FAQ section includes answers covering:

- eligibility
- pricing
- accommodation
- multiple event participation
- prize pool
- hackathon rules
- venue access

### Contact

The contact section includes placeholder event support details such as:

- email
- helpline
- venue
- social handle
- WhatsApp group CTA
- support hours

### About

The about section explains the festival story and includes organizing highlights for the fictional campus event.

## Local Development

1. Install dependencies with `npm install`
2. Run the app with `npm run dev`
3. Open `http://localhost:5173/`
4. Submit the registration form to store the entry and trigger the congratulations email flow

## Project Structure

```text
festie2k26/
|-- public/
|   |-- favicon.svg
|   `-- icons.svg
|-- src/
|   |-- assets/
|   |-- components/
|   |   |-- About/
|   |   |-- Common/
|   |   |-- Contact/
|   |   |-- CustomCursor/
|   |   |-- FAQ/
|   |   |-- Footer/
|   |   |-- Hero/
|   |   |-- Navigation/
|   |   |-- Overview/
|   |   |-- Registration/
|   |   |-- Schedule/
|   |   `-- Themes/
|   |-- hooks/
|   |   |-- useCounter.js
|   |   `-- useScrollReveal.js
|   |-- styles/
|   |   |-- animations.css
|   |   `-- globals.css
|   |-- App.jsx
|   |-- App.css
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- package.json
|-- vite.config.js
`-- README.md
```

## Key Implementation Notes

- `src/App.jsx` composes the full single-page experience by stacking all major sections.
- `src/components/Navigation/Navigation.jsx` handles smooth navigation to the registration section.
- `src/components/Hero/Hero.jsx` drives hero counter animation and parallax-like orb motion.
- `src/components/Schedule/Schedule.jsx` renders the tabbed event timeline.
- `src/components/Registration/Registration.jsx` manages form state, validation, and success feedback.
- `src/hooks/useScrollReveal.js` adds reveal-on-scroll behavior using `IntersectionObserver`.
- `src/components/CustomCursor/CustomCursor.jsx` creates the custom pointer effect for desktop interaction.

## Getting Started

### Prerequisites

- Node.js
- npm

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build For Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint The Project

```bash
npm run lint
```

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run build` creates the production build
- `npm run preview` previews the built app locally
- `npm run lint` runs ESLint across the project

## Customization Guide

To adapt this project for a real event, update:

- event name, dates, venue, and branding text in the section components
- schedule entries inside `src/components/Schedule/Schedule.jsx`
- hackathon themes inside `src/components/Themes/Themes.jsx`
- registration options and validation behavior inside `src/components/Registration/Registration.jsx`
- FAQs and contact information inside their respective components
- images and icons inside `public/` and `src/assets/`

If you want real registrations, the next logical step is connecting the form to:

- a backend API
- Google Sheets or Airtable
- Firebase or Supabase
- email notifications and confirmation workflows

## Current Limitations

- content is currently static and hardcoded in components
- registration is not persisted anywhere
- contact links include placeholder event data
- some displayed copy appears to have encoding issues in source text and may need cleanup

## Summary

This repository contains a polished promotional frontend for Festie2k26, focused on visual impact, event storytelling, and participant onboarding. It is a good base for a college fest landing page, hackathon microsite, or cultural event registration website.
