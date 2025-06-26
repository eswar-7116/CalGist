# 📅 CalGist: AI-Powered Calendar Summarizer

CalGist is an event summarizing assistant that connects with your Google Calendar, generates helpful AI summaries for your upcoming events, and displays everything in a beautiful, easy-to-navigate dashboard.

> 🔗 Live Demo: [CalGist](https://cal-gist.vercel.app)

---

## 🚀 Features

- 👤 **User Authentication**  
  Simple sign-up/login with Supabase Auth.

- 🔗 **Google Calendar Integration**  
  Securely connects your Google account and fetches upcoming events.

- 📅 **Upcoming Events View**  
  Lists your scheduled events from Google Calendar with live sync.

- 🤖 **AI-Powered Summaries**  
  Uses Gemini (Google AI) to generate smart, concise summaries for each event.

- ✨ **Clean Dashboard**  
  Organized view of your events and summaries in one place.

- 🔁 **Regenerate Summary Button**  
  Instantly generate a fresh summary for any event.

- 📋 **Copy to Clipboard**  
  Quickly copy any summary with a single click.

---

## 🧑‍💻 Tech Stack

- **Next.js** + **TypeScript**
- **Supabase** (Auth + Database)
- **Google Calendar API**
- **Google Gemini API** (AI summaries)
- **Tailwind CSS + ShadCN** for UI
- **Vercel** for deployment

---

## 🛠️ Local Setup

```bash
# Clone the repo
git clone https://github.com/eswar-7116/CalGist.git
cd CalGist

# Install dependencies
npm install

# Create .env.local and fill with required values
cp .env.example .env

# Run locally
npm dev
````

---

## 🔐 Environment Variables

Make sure to set these in `.env`:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=

GEMINI_API_KEY=
```

---

## 📄 Privacy Policy

You can view the privacy policy here:
🔗 [CalGist Privacy Policy](https://cal-gist.vercel.app/privacy-policy)

---

## 📄 License

MIT – feel free to use, fork, and build on top of it!

---

Made with ❤️ by [Eswar Dudi](https://github.com/eswar-7116)
