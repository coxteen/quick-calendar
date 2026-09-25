# Quick Calendar

> Create detailed Google Calendar events from a focused, easy-to-use form.

![Application Preview](./assets/preview.png)

---

## 📌 About & Motivation

* **Description:** Quick Calendar is a Next.js application for creating Google Calendar events with structured event details. It combines event type, date and time, contact information, schedule locations, pricing, and calendar color into a single submission workflow. 
* **Motivation:** The project was built to reduce the friction of manually creating detailed calendar entries and to keep recurring event information consistent.

---

## ✨ Key Features

- **Structured event creation:** Add event types, custom titles, dates, start and end times, contact details, schedule locations, and pricing.
- **Google Calendar integration:** Submit validated event data to Google Calendar through a server-side API route.
- **Configurable event styling:** Choose a Google Calendar color for each new event.
- **Local API key persistence:** Keep the API secret key in the browser's local storage for subsequent submissions.
- **Validation and feedback:** Receive inline success and error messages when required fields are missing or the request fails.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
* **Backend & APIs:** Next.js App Router API route, Google Calendar API, `googleapis`
* **Database & ORM:** No database or ORM; configuration is provided through environment variables
* **Tooling & DevOps:** npm, TypeScript, Next.js development and production commands, Vercel deployment

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18 or newer
* npm
* A Google Cloud service account with access to the target Google Calendar

### Installation & Local Setup

1. **Clone the repository:**

	```bash
	git clone https://github.com/coxteen/quick-calendar.git
	cd quick-calendar
	```

2. **Configure environment variables:** Create a `.env.local` file in the project root:

	```bash
	API_SECRET_KEY=your-application-secret
	GOOGLE_CLIENT_EMAIL=your-service-account-email
	GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
	GOOGLE_CALENDAR_ID=your-google-calendar-id
	```

	Share the target Google Calendar with the service account email and grant it permission to manage events. Keep these values private and do not commit `.env.local`.

3. **Install dependencies:**

	```bash
	npm install
	```

4. **Run the development server:**

	```bash
	npm run dev
	```

	The application will be accessible at `http://localhost:3000`.

5. **Build and run the production server:**

	```bash
	npm run build
	npm run start
	```

	Automated tests are not currently configured in `package.json`.

## 📖 Quick Start Tutorial

The application is deployed with [Vercel](https://vercel.com). No installation is required to use the deployed version:

1. Open the deployed Quick Calendar site.
2. Specify the event details, including the event type, date, time range, contact information, schedule locations, price, and calendar color.
3. Enter the secret key and select **Adaugă Eveniment**.
4. Confirm the success message, then open Google Calendar to review the newly created event.

The complete workflow is available directly from the website: open the site, fill in the event details, enter the secret key, and submit the form.

## ☁️ Deployment

Quick Calendar is deployed on Vercel. The production deployment requires the same environment variables described above to be configured in the Vercel project settings.

## 🗺️ Roadmap

- [ ] Add automated unit and end-to-end tests.
- [ ] Add a safe environment-variable example file.
- [ ] Add deployment documentation and production configuration guidance.
- [ ] Improve authentication so API credentials do not need to be stored in browser local storage.

## 📄 License & Contact

No license file has been added yet.

- **Author:** [Project maintainer](https://github.com/coxteen)
- **GitHub:** [coxteen/quick-calendar](https://github.com/coxteen/quick-calendar)
