# DataFeed Kenya — Frontend

The face of the operation. Built with Next.js so fast it'll make your head spin.

While the backend was busy handling JWT tokens and database migrations like a seasoned bouncer, this frontend was out here making sure Kenyan journalism actually *looks* good on the internet.


## What It Does

- Displays news articles fetched straight from the DataFeed Kenya API
- Lets journalists log in, publish, edit, and delete their stories
- Protects the dashboard so random people can't mess with your articles
- Loads articles server-side so Google actually knows we exist


## Tech Stack

Next.js 15: The framework. App Router. Server components. The whole shebang. 
TypeScript: JavaScript but with trust issues (in a good way)
Tailwind CSS v4: Dark mode. Orange accents. Looks like a real news site now.
Next/Image: Compresses images so your slow internet doesn't suffer

## Pages

/                    → Homepage — all articles, latest first, server-rendered
/articles/[id]       → Single article — full story with author and timestamp
/login               → Journalist login — JWT token stored in localStorage
/dashboard           → Protected — redirects strangers to /login
/dashboard/create    → Write and publish a new article


## Getting Started

**1. Clone the repo**

```bash
git clone https://github.com/your-username/datafeed-kenya-frontend.git
cd datafeed-kenya-frontend
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variable**

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Make sure the DataFeed Kenya backend is running on port 8000 or this will be a very empty news site.

**4. Run the dev server**

```bash
npm run dev
```

Visit `http://localhost:3000` and try not to be impressed.

---

## Project Structure

```
newsfeed-kenya-fronted/
├── app/
│   ├── components/
│   │   └── Navbar.tsx        ← sticky nav with auth-aware links
│   ├── articles/
│   │   └── [id]/
│   │       └── page.tsx      ← single article page (server component)
│   ├── dashboard/
│   │   ├── page.tsx          ← journalist dashboard (protected)
│   │   └── create/
│   │       └── page.tsx      ← create article form
│   ├── login/
│   │   └── page.tsx          ← login form (client component)
│   ├── globals.css           ← dark mode color palette
│   ├── layout.tsx            ← root layout with Navbar
│   └── page.tsx              ← homepage (server component)
├── public/
│   └── logo/                 ← the beautiful Kenyan spear logo
├── next.config.ts
└── package.json

## Design System

Dark mode. Always. No light mode. We don't do that here.

Background:      #0f0f0f   (near black — easy on the eyes at 2am)
Surface:         #1a1a1a   (cards and navbar)
Border:          #2a2a2a   (subtle dividers)
Accent:          #f97316   (orange — breaking news energy)
Text primary:    #ffffff   (headlines)
Text secondary:  #a1a1aa   (timestamps, metadata)

## Authentication Flow
1. Journalist visits /login
2. Submits username + password
3. FastAPI returns JWT token
4. Token stored in localStorage
5. Navbar detects token → shows Dashboard + Logout
6. Protected pages check token → redirect to /login if missing
7. Article requests include "Authorization: Bearer <token>" header
8. FastAPI validates token → allows or rejects

No token, no access. Simple as that.


## Backend
This frontend talks to the DataFeed Kenya API:
👉 https://github.com/Kutola/newsfeed-crud

Make sure it's running before starting the frontend or you'll be staring at a very empty homepage wondering what went wrong.


## Author

Built by **Mike Kutola** — self-taught, fueled by curiosity and probably too much coffee.

X: [@Mike_Kutola](https://x.com/Mike_Kutola)
GitHub: [github.com/Kutola](https://github.com/Kutola)


## License

MIT — take it, learn from it, build something better.