# Internshala Search Page Clone

A modular, highly responsive search page replication built using Next.js, Tailwind CSS, and TypeScript.

## Live Demo & Repository
- **Hosted Link:** [Insert Vercel URL here after deploying]
- **GitHub Repository:** [https://github.com/AKASHDHARDUBEY/internshala-search-clone.git](https://github.com/AKASHDHARDUBEY/internshala-search-clone.git)

## Technical Features
- **Frontend Filtering:** Multi-attribute filtering (Profile, Location, Duration, Stipend) operating entirely on the client-side for rapid response times.
- **Search Bar & URL State Sync:** Real-time search terms that persist and synchronize directly to URL query parameters.
- **API Proxy Route:** Handled API request to `https://internshala.com/hiring/search` on the server-side to bypass potential CORS limitations.
- **TypeScript Type Safety:** Strictly typed interfaces governing data models and state management throughout the application.
- **Performance Optimization:** Leveraged React `useMemo` hooks for heavy array operations (filtering and dynamic metadata aggregation).
- **Subtle Animations:** Premium list animations (staggered entries) and hover elevations implemented using Framer Motion.

## Getting Started Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/AKASHDHARDUBEY/internshala-search-clone.git
   cd internshala-search-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application.
