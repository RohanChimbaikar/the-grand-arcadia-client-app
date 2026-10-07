# Grand Arcadia

**A luxury hotel booking experience with room discovery, date-based availability, and a private guest account.**

Grand Arcadia is a full-stack web application for exploring hotel rooms and managing a stay. Guests can browse rooms, check dates against existing bookings, submit a reservation, and use a Google-authenticated account to view and manage reservations and profile details.

## ✨ Features

- Browse rooms and filter by guest capacity.
- View room details, pricing, and a date picker that disables unavailable dates.
- Select a date range and guest count, add stay notes, and submit a reservation.
- Sign in with Google using Auth.js (NextAuth.js v5).
- Access a guest account with a personalized home page, reservation list, and profile form.
- Edit guest count and notes on a reservation, or delete an upcoming reservation.
- Update guest nationality and national ID details.
- Responsive account navigation and room layouts, with a dark slate-and-gold visual theme.

## 🏨 About the Application

Guests start by exploring available rooms and opening a room’s detail page. The availability calendar loads booked dates and booking-length settings from Supabase. A signed-in guest can select dates, choose a guest count within the room’s capacity, add optional notes, and submit a reservation.

After signing in, guests can review upcoming and past reservations, edit eligible reservation details, delete upcoming reservations, and update profile information. The account home page highlights the next upcoming stay when one exists and provides a useful empty state otherwise.

## 🖥️ Screenshots / Demo

No application screenshots or deployed demo URL are currently included in the repository. Add screenshots here when available.

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| Next.js 16 (App Router) | Application framework, routing, server rendering, and API routes |
| React 19 | UI components and interactive client-side controls |
| Tailwind CSS 4 | Styling and design tokens |
| Supabase JavaScript client | PostgreSQL-backed application data access |
| Auth.js / NextAuth.js 5 beta | Google OAuth sign-in and session handling |
| Server Components and Server Actions | Server-side data rendering and form mutations |
| `react-day-picker` | Reservation date-range selection |
| `date-fns` | Date calculations and formatting |
| Heroicons | Interface icons |
| Sonner | Toast notifications |
| ESLint 9 | Linting |
| npm | Dependency management, with `package-lock.json` checked in |

## 🏗️ Architecture

The active application uses the Next.js App Router under `src/app`. Pages and layouts are primarily Server Components, fetching the data they need on the server. Interactive elements such as the date selector, capacity filter, reservation list, and navigation use Client Components.

Supabase access is centralized in `src/app/_lib/data-service.js`. This layer provides reads and mutations for rooms (`cabins`), guests, bookings, and settings. Server Actions in `src/app/_lib/actions.js` handle guest profile updates, reservation creation, editing and deletion, and sign-in/sign-out redirects; affected paths are revalidated after mutations.

Auth.js is configured in `src/app/_lib/auth.js`. Its Google sign-in callback creates a guest record when needed, and its session callback attaches the matching guest ID to the session. `src/proxy.js` applies authentication to `/account` and its nested routes. The app also includes a room availability API route at `/api/room/[roomId]`.

## 📁 Project Structure

```text
src/
├── app/
│   ├── _components/       # Shared navigation, room, booking, and form UI
│   ├── _lib/              # Auth.js setup, Supabase client, data services, actions
│   ├── _styles/           # Global Tailwind theme and styles
│   ├── about/             # Hotel information
│   ├── account/           # Guest home, profile, and reservation pages
│   ├── api/               # Auth.js and room availability API routes
│   ├── rooms/             # Room listing, details, and booking confirmation
│   ├── error.js           # Application error boundary
│   ├── loading.js         # Application loading UI
│   ├── layout.js          # Root layout and shared providers
│   └── page.js            # Public home page
├── proxy.js               # Auth.js protection for account routes
└── starter/               # Starter/example components; not active app routes
public/                    # Brand assets and static images
```

## 🔐 Authentication & Authorization

Authentication uses Auth.js / NextAuth.js v5 with Google as the configured provider. The sign-in callback looks up the guest by email and creates a guest record if one does not exist. The session callback loads the guest and adds its database ID to `session.user.guestId`.

The Auth.js proxy protects `/account` and all nested account routes. Reservation creation requires an authenticated session and associates the new booking with that session’s guest ID. Reservation deletion checks that the booking belongs to the signed-in guest. The current reservation update action checks that a user is signed in, but does not verify ownership of the booking; strengthen this authorization before using the application with untrusted users.

## 🗄️ Database

The data-service layer uses these Supabase tables:

| Table | Role in the application |
| --- | --- |
| `cabins` | Room details, capacity, pricing, discount, image, and description |
| `guests` | Guest identity and profile details; guest email is used to look up the account |
| `bookings` | Stay dates, guest and room references, guest count, nights, price, status, and stay notes |
| `settings` | Minimum and maximum booking length used by the availability calendar |

Bookings reference a guest through `guestID` and a room through `cabinID`. The code queries related room names and images when loading guest reservations. Database migrations or schema definitions are not included in this repository; configure the Supabase project with the tables and relationships expected by the application.

## 📅 Booking Flow

1. Browse `/rooms` and optionally filter by room capacity.
2. Open a room page to see its details, price, and availability calendar.
3. Select available dates, choose the number of guests, and optionally provide stay notes.
4. Sign in with Google if not already authenticated, then submit the reservation.
5. The server action records the booking in Supabase with an initial `unconfirmed` status and redirects to the confirmation page. The room page states that payment is due on arrival; online payment processing is not implemented.
6. View and manage reservations from the guest account. Upcoming reservations can be edited or deleted from the existing reservation list.

## 🚀 Getting Started

### Prerequisites

- Node.js compatible with the installed Next.js 16 release.
- npm.
- A Supabase project with the tables and relationships used by the data-service layer.
- Google OAuth credentials for Auth.js.

### Installation

```bash
git clone https://github.com/RohanChimbaikar/the-grand-arcadia-client-app.git
cd the-grand-arcadia-client-app
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```dotenv
SUPABASE_URL=
SUPABASE_KEY=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

Set `SUPABASE_URL` and `SUPABASE_KEY` to the Supabase project values used by the server-side Supabase client. Set `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` to the credentials for a Google OAuth client configured with the appropriate Auth.js callback URL. Keep credentials private and do not commit `.env.local`.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other available scripts:

```bash
npm run build
npm run start
npm run lint
```

## 🌐 Deployment

The project can be deployed to Vercel or another platform that supports Next.js. Configure the four environment variables above in the deployment environment, and ensure the Supabase database and Google OAuth callback configuration are set up for the deployed origin. No production deployment URL is currently specified in the repository.

## 🎨 Design

The interface uses a deep slate-blue background, warm gold accents, and EB Garamond typography for an understated luxury-hospitality feel. Tailwind theme tokens are defined in `src/app/_styles/globals.css`. Room pages, booking controls, and the guest account adapt their layouts for narrower screens.

## 🧠 Technical Highlights

- Server-rendered room, account, and profile pages load data through the shared Supabase service layer.
- The room detail route generates metadata and static route parameters from room data.
- Room listings revalidate hourly, and the about page revalidates daily.
- The availability calendar uses database bookings and configurable minimum/maximum stay lengths.
- Server Actions handle reservation and profile mutations; reservation deletion uses React optimistic UI.
- Loading fallbacks, room-specific not-found UI, a root error boundary, and toast feedback support common navigation and mutation states.
- The account home derives its next stay and stay counts from the signed-in guest’s booking data.

## 📌 Project Status

Grand Arcadia is an actively developed portfolio application. Core room discovery, guest authentication, reservation creation, and guest account flows are implemented. It is not ready to be treated as a production booking platform without further work: in particular, enforce guest ownership in reservation updates, review server-side validation and authorization, and add a payment workflow if online payments are required. The repository does not include database migrations or an automated test suite.

## 🔮 Future Improvements

- Enforce ownership and validate all booking mutations on the server.
- Add booking confirmation and reminder emails.
- Integrate online payment if the hotel should accept payment before arrival.
- Add database migrations and automated tests for booking and authorization flows.

## 👨‍💻 Author

Rohan Chimbaikar

## 📄 License

No license file is currently present in the repository. Add a license if you intend to specify reuse or distribution terms.
