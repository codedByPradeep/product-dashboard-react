# Product Management Dashboard

A responsive frontend application for managing products, featuring Grid/List views, real-time search, and pagination.

## Features

- **Product Display**: Switch between Grid and List (Table) views.
- **Search**: Real-time search with 500ms debounce.
- **Management**: Add and Edit products with validation.
- **Pagination**: Client-side pagination.
- **Responsive Design**: Premium dark-themed UI.

## Tech Stack

- React
- Vite
- Vanilla CSS (Custom variables & responsiveness)
- Lucide React (Icons)

## Setup Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Deployment

To deploy to Vercel or Netlify:

1. Push this repository to GitHub.
2. Import the project in Vercel/Netlify.
3. The build settings should auto-detect Vite:
   - Build Command: `npm run build`
   - Output Directory: `dist`
