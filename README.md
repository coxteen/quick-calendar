# Quick Calendar

> Create structured Google Calendar events instantly through a clean, single-screen workflow.

![Application Demo](./assets/demo.gif)

## 📌 About & Motivation

- **Description:** Quick Calendar is an event-creation tool built with Next.js, allowing structured scheduling directly into Google Calendar. It bundles event type, time intervals, contact details, multi-stop schedule locations, pricing, and native calendar colors into a single submission.
- **Motivation:** Developed as a personal productivity tool to eliminate repetitive manual entry in Google Calendar, maintain consistent formatting for recurring bookings/tasks, and allow 1-tap additions from both desktop and mobile.

---

## ✨ Key Features

- **Structured Event Templates:** Pre-fill or customize event types, titles, date/time ranges, contact info, multi-location stops, and pricing.
- **Direct API Synchronization:** Creates events silently in Google Calendar via server-side Google Calendar API routes.
- **Native Color Selector:** Choose from official Google Calendar event colors.
- **Local Credential Persistence:** Keeps the API authorization secret saved in `localStorage` for effortless subsequent additions.
- **Mobile & Desktop Ready:** Fully responsive interface designed to be pinned on desktop or installed as a standalone PWA on mobile.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS
- **Integrations:** Google Calendar API (`googleapis`)
- **Infrastructure:** Serverless deployment on Vercel

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Google Cloud project with the **Google Calendar API** enabled
- A **Google Service Account** with its generated private key JSON

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/coxteen/quick-calendar.git
   cd quick-calendar
   ```

1. **Configure environment variables:**

Create a `.env.local` file in the root folder:

Fragment de cod

```
API_SECRET_KEY="your-chosen-access-key"
GOOGLE_CLIENT_EMAIL="service-account@project.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID="your-email@gmail.com"
```
2. **Grant Calendar Permissions:**

> Open your Google Calendar settings, go to **Share with specific people**, add your `GOOGLE_CLIENT_EMAIL`, and set permission to **Make changes to events**.
3. **Install dependencies & run:**

Bash

```
npm install
npm run dev
```

Open [http://localhost:3000] in your browser.

## ☁️ Deployment
The project is designed to run seamlessly on **Vercel**:

1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Add the four environment variables (`API_SECRET_KEY`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_CALENDAR_ID`) in **Project Settings > Environment Variables**.
4. Deploy.


## 📄 License & Author

- **Author:** Costin-Daniel Ghiujan ([coxteen](https://github.com/coxteen))
- **License:** MIT
