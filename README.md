# Quick Calendar

> Create structured Google Calendar events instantly through a clean, single-screen workflow.

![Application Demo](./assets/demo.gif)

## 📌 About & Motivation

Quick Calendar is a personal productivity tool built with Next.js for creating structured Google Calendar entries faster and more consistently.

- **Description:** It brings together event type, time windows, contact details, multi-stop schedule locations, pricing, and official Google Calendar colors in a single streamlined form.
- **Motivation:** The app was designed to eliminate repetitive manual entry, reduce formatting errors, and keep recurring bookings/tasks consistent across desktop and mobile usage.

---

## ✨ Key Features

- **Structured event templates:** Add or customize titles, event types, date/time ranges, contact info, route stops, and pricing.
- **Direct Google Calendar sync:** Submit data through a server-side API route to create events automatically.
- **Native color selection:** Choose from Google Calendar’s built-in event colors.
- **Local credential persistence:** Store the API secret in the browser for fast follow-up submissions.
- **Responsive interface:** Works well on desktop and mobile, with support for standalone app-like usage.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS
- **Integration:** Google Calendar API via `googleapis`
- **Deployment:** Vercel

---

## 🚀 Getting Started

### Prerequisites

Before starting, make sure you have:

- Node.js 18+
- npm
- A Google Cloud project with the Google Calendar API enabled
- A Google service account with a generated private key

### Installation & Local Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/coxteen/quick-calendar.git
   cd quick-calendar
   ```

2. Create a `.env.local` file in the project root with the following values:

   ```env
   API_SECRET_KEY="your-chosen-access-key"
   GOOGLE_CLIENT_EMAIL="service-account@project.iam.gserviceaccount.com"
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_CALENDAR_ID="your-email@gmail.com"
   ```

3. Grant calendar access:

   Open your Google Calendar settings, go to **Share with specific people**, add your `GOOGLE_CLIENT_EMAIL`, and set permission to **Make changes to events**.

4. Install dependencies and run the app:

   ```bash
   npm install
   npm run dev
   ```

5. Open the app in your browser:

   ```text
   http://localhost:3000
   ```

---

## ☁️ Deployment

This project is designed to deploy easily on Vercel.

1. Push the repository to GitHub.
2. Create a new project in Vercel.
3. Add the required environment variables in **Project Settings > Environment Variables**:
   - `API_SECRET_KEY`
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_CALENDAR_ID`
4. Deploy the app.

On mobile devices, open the deployed app in Chrome or Safari and choose **Add to Home Screen** for a PWA-like experience.

---

## 📄 License & Author

- **Author:** Costin Ghiujan ([coxteen](https://github.com/coxteen))
- **License:** MIT
