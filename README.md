<div align="center">

# 📅 Quick Calendar

**Create structured Google Calendar events instantly through a clean, single-screen workflow.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](#-license--author)

[Report Bug](https://github.com/coxteen/quick-calendar/issues) · [Request Feature](https://github.com/coxteen/quick-calendar/issues)

</div>

---

<p align="center">
  <img src="./assets/demo.gif" alt="Quick Calendar interactive demo" width="850">
</p>

---

## 📌 Problem & Motivation

Creating Google Calendar events that require the same details such as event type, date and time, client info, location and pricing is tedious and repetitive. Additionally, it's easy to forget a crucial detail along the way.

**Quick Calendar** brings the complete workflow into one responsive form:

- Multi-stop destinations and client details in a formatted description.
- Native Google Calendar event colors.
- Date, time buffers, and custom pricing fields.
- A focused experience with no unnecessary context switching.

## ✨ Key Features

- **⚡ Streamlined event submission:** Define titles, client metadata, multi-stop route details, and billing in a few taps.
- **🎨 Native color mapping:** Choose from Google Calendar’s official event colors directly from the form.
- **🔒 Server-side synchronization:** Uses Google Service Account authentication inside a Next.js API route. The private key remains server-side.
- **💾 Local key persistence:** Stores the submission authorization key in `localStorage` for fast recurring use.
- **📱 PWA-ready:** Optimized for mobile browsers and standalone **Add to Home Screen** usage.

## 🧠 Architecture & How It Works

```mermaid
sequenceDiagram
    autonumber
    actor User as Client / User
    participant Browser as Browser / Mobile PWA
    participant NextApi as Next.js API Route (/api/events)
    participant Google as Google Calendar API

    User->>Browser: Fill form with event data
    Browser->>NextApi: POST /api/events
    Note over NextApi: Validates the request and payload
    NextApi->>Google: Authenticate with Google Service Account
    NextApi->>Google: calendar.events.insert()
    Google-->>NextApi: Event created
    NextApi-->>Browser: Success response and event link
    Browser->>User: Show confirmation
```

## 🛠️ Tech Stack

| Category | Technology |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| API integration | [`googleapis`](https://github.com/googleapis/google-api-nodejs-client) with Service Account authentication |
| Deployment | [Vercel](https://vercel.com/) |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17+ or 20+
- **npm**, pnpm, or yarn
- A **Google Cloud project** with the Google Calendar API enabled
- A **Google Service Account** with an exported JSON key

### 1. Installation

```bash
git clone https://github.com/coxteen/quick-calendar.git
cd quick-calendar
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
API_SECRET_KEY="your-custom-passphrase"
GOOGLE_CLIENT_EMAIL="quick-cal@your-project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID="your-personal-or-shared-calendar@gmail.com"
```

In Google Calendar, open **Settings and sharing** > **Share with specific people**, add `GOOGLE_CLIENT_EMAIL`, and grant permission to **Make changes to events**.

> Keep `.env.local` private and never commit service account credentials to source control.

### 3. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## ☁️ Deployment

1. Push the repository to GitHub.
2. Import the project into your [Vercel Dashboard](https://vercel.com/).
3. Add the four environment variables from `.env.local` under **Project Settings** > **Environment Variables**.
4. Deploy the app.

For `GOOGLE_PRIVATE_KEY`, preserve the escaped newline characters (`\n`) when entering the value in Vercel.

## 📄 License & Author

- **Author:** Costin Ghiujan ([`@coxteen`](https://github.com/coxteen))
- **License:** MIT
