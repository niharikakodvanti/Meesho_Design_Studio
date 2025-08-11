# Eraser Clone

A collaborative document and diagram editor built with Next.js, Convex, and Kinde authentication.

## Features

- Real-time collaborative editing
- Document editor with rich text formatting
- Whiteboard/canvas functionality
- Team-based file organization
- User authentication with Kinde

## Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Backend**: Convex (real-time database)
- **Authentication**: Kinde
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui

## Environment Variables

You need to set up the following environment variables in your Vercel deployment:

### Kinde Authentication
```
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_SITE_URL=https://your-vercel-domain.vercel.app
KINDE_POST_LOGOUT_REDIRECT_URL=https://your-vercel-domain.vercel.app
KINDE_POST_LOGIN_REDIRECT_URL=https://your-vercel-domain.vercel.app/dashboard
```

### Convex
```
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eraser_clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Create a `.env.local` file with the variables listed above
   - For production, add these to your Vercel environment variables

4. **Set up Kinde Authentication**
   - Go to [Kinde](https://kinde.com) and create a new application
   - Configure your redirect URLs:
     - Allowed callback URLs: `https://your-domain.vercel.app/api/auth/kinde_callback`
     - Allowed logout redirect URLs: `https://your-domain.vercel.app`
   - Copy the Client ID, Client Secret, and Issuer URL to your environment variables

5. **Set up Convex**
   - Create a new Convex project
   - Copy the deployment URL to your environment variables

6. **Run the development server**
   ```bash
   npm run dev
   ```

## Deployment

1. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add all environment variables in Vercel dashboard
   - Deploy

2. **Configure Kinde for Production**
   - Update your Kinde application settings with the production domain
   - Ensure all redirect URLs are properly configured

## Project Structure

```
app/
├── (routes)/
│   ├── dashboard/          # Dashboard pages
│   ├── teams/             # Team management
│   └── workspace/         # Document editor
├── _components/           # Shared components
├── _context/             # React contexts
└── api/                  # API routes
convex/                   # Convex backend functions
components/ui/            # UI components
```

## Common Issues

### Authentication Redirect Issues
If you see `undefined%2Fdashboard` in the redirect URL:
1. Check that all Kinde environment variables are set correctly
2. Ensure the `KINDE_SITE_URL` matches your production domain
3. Verify redirect URLs are configured in Kinde dashboard

### Build Errors
If you encounter TypeScript errors during build:
1. Run `npx tsc --noEmit` to check for type errors
2. Ensure all dependencies are properly installed
3. Check that all environment variables are set

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License
