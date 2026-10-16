# Blog Portfolio - Frontend

React app (Create React App + Tailwind CSS). Uses Firebase Authentication and talks to the blog API.

```bash
npm install
cp .env.example .env    # fill in the API URL and Firebase config
npm start
```

Pages: `/home`, `/blogs`, `/blogs/:id`, `/about`, `/contact`, `/login`, `/signup`,
and admin only: `/admin`, `/admin/new`, `/admin/edit/:id`.

Deploying to Vercel: see the main README. Set the same variables from `.env.example` in the Vercel project settings.
