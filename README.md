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
- A Google account with access to Google Calendar and Google Cloud Console

---

### 1. Installation

```bash
git clone https://github.com/coxteen/quick-calendar.git
cd quick-calendar
npm install
```

### 2. Google Cloud & Calendar Configuration

To allow the server to create events on your behalf without manual login popups, you need a **Google Service Account**:

1. **Create or select a project:**
  - Open the [Google Cloud Console](https://console.cloud.google.com/).
  - Open the project dropdown, select **New Project**, and name it (for example, `quick-calendar`).

2. **Enable the Google Calendar API:**
  - In the sidebar, open **APIs & Services** > **Library**.
  - Search for **Google Calendar API**, select it, and click **Enable**.

3. **Create a service account:**
  - Go to **APIs & Services** > **Credentials**.
  - Click **+ Create Credentials** and choose **Service account**.
  - Give it a name, such as `calendar-sync`, then click **Create and Continue**.
  - You can skip project role assignments and click **Done**.

4. **Generate the JSON private key:**
  - In the Credentials table, click the new service account email.
  - Open the **Keys** tab.
  - Click **Add Key** > **Create new key**, select **JSON**, and click **Create**.
  - Store the downloaded `.json` file securely.

5. **Share your calendar with the service account:**
  - Open [Google Calendar](https://calendar.google.com/).
  - Hover over the calendar you want to use, click the three dots, and select **Settings and sharing**.
  - Scroll to **Share with specific people or groups** and click **Add people and groups**.
  - Paste the `client_email` value from the downloaded JSON file.
  - Set permissions to **Make changes to events** and click **Send**.

### 3. Environment Variables Setup

Create a `.env.local` file in the root directory:

```env
API_SECRET_KEY="your-custom-passphrase"
GOOGLE_CLIENT_EMAIL="calendar-sync@your-project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgk...YourKey...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID="your-email@gmail.com"
```

#### Where to find each value

| Variable | Source | Description |
| --- | --- | --- |
| `API_SECRET_KEY` | Chosen by you | Any secure password or phrase. You will also enter this key in the app to authenticate event submissions. |
| `GOOGLE_CLIENT_EMAIL` | Downloaded JSON file | The `client_email` property, which looks like `...@<project-id>.iam.gserviceaccount.com`. |
| `GOOGLE_PRIVATE_KEY` | Downloaded JSON file | The `private_key` property. Keep the entire block, including the `BEGIN PRIVATE KEY` and `END PRIVATE KEY` lines. |
| `GOOGLE_CALENDAR_ID` | Google Calendar settings | Usually your main Google email address. For secondary calendars, find it under **Settings and sharing** > **Integrate calendar** > **Calendar ID**. |

> ⚠️ **Security note:** Never commit `.env.local` or the downloaded `.json` file to GitHub. They are already listed in `.gitignore`.

### 4. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ☁️ Deployment

1. Push the repository to GitHub.
2. Import the project into your [Vercel Dashboard](https://vercel.com/).
3. Add the four environment variables from `.env.local` under **Project Settings** > **Environment Variables**.
4. Deploy the app.

For `GOOGLE_PRIVATE_KEY`, preserve the escaped newline characters (`\n`) when entering the value in Vercel.

## 📄 License & Author

- **Author:** Costin Ghiujan ([`@coxteen`](https://github.com/coxteen))
- **License:** MIT
