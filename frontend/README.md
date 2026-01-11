# Louder - Sydney Events Frontend

A modern, dark-themed event discovery platform for Sydney, Australia.

## 🚀 Features

- **Dark Minimal Design**: Clean, distraction-free interface
- **Modal-First UX**: Welcome modal → Subscribe → Browse events
- **Real-time Data**: Events automatically synced from sydney.com
- **Email Collection**: Subscribe to event updates
- **Direct Ticketing**: One-click redirect to event ticket pages
- **Responsive**: Optimized for all device sizes

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Radix UI** - Unstyled, accessible primitives
- **Axios** - HTTP client
- **Lucide React** - Modern icon set

## 📦 Installation

```bash
npm install
```

## 🔧 Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your backend API URL:

```env
VITE_API_URL=https://your-backend-url.com/api
```

## 🏃 Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:5173`

## 🏗️ Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## 📤 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:

- Vercel (Recommended)
- Netlify
- GitHub Pages
- Render

### Quick Deploy to Vercel

```bash
npm i -g vercel
vercel
```

### Quick Deploy to Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── events/
│   │   │   └── EventCard.jsx
│   │   ├── layout/
│   │   │   └── Header.jsx
│   │   ├── modals/
│   │   │   ├── WelcomeModal.jsx
│   │   │   └── SubscriberModal.jsx
│   │   └── ui/
│   │       └── [shadcn components]
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── .env
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🎨 Design System

### Colors

- Background: `#0a0a0a`
- Cards: `zinc-900`
- Borders: `zinc-800`
- Text: `white`, `zinc-400`, `zinc-500`
- Accent: White buttons

### Typography

- Font: System font stack
- Headings: Bold, tight tracking
- Body: Regular, relaxed leading

## 🔄 User Flow

1. User visits site → **Welcome Modal** appears
2. Click "Get Events" → **Subscribe Modal** (optional)
3. After subscribe/skip → **Event Listing** loads
4. Click event "Get Tickets" → **Subscribe Modal** (email capture)
5. After submit → Redirect to ticket URL

## 🌐 API Integration

The frontend connects to the backend API:

```javascript
// Get all events
GET / api / events;

// Subscribe email
POST / api / subscribe;
Body: {
  email: "user@example.com";
}
```

## 📊 Build Metrics

- **Modules**: 2,128 transformed
- **CSS**: 26.60 KB (gzipped: 5.52 KB)
- **JavaScript**: 327.82 KB (gzipped: 105.83 KB)
- **Build Time**: ~1.2s

## ✅ Production Ready

- [x] Build succeeds without errors
- [x] Tailwind CSS properly configured
- [x] Environment variables set
- [x] API endpoints working
- [x] Modal flow implemented
- [x] Responsive design
- [x] Performance optimized
- [x] SEO-friendly structure

## 🤝 Contributing

This is an assignment project, but suggestions are welcome!

## 📄 License

MIT
