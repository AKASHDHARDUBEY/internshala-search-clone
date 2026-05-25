# Internshala Search & Filter Clone

A clean, responsive, and robust replica of the Internshala internship search and discovery platform. This application allows candidates to browse, search, and filter internships using multi-parameter selectors that synchronize state directly with URL parameters for a bookmarkable and modern search experience.

---

## 🛠️ Tech Stack

- **Core**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, fully typed API models and filter systems)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Responsive layouts and design system tokens)
- **HTTP Client**: [Axios](https://axios-http.com/) (Data fetching with custom HTTP headers and timeouts)
- **Icons**: [Lucide React](https://lucide.dev/) (Clean and consistent iconography)

---

## ✨ Features

1. **Multi-Parameter Filter Panel**:
   - Filter by **Profile** (e.g., Web Development, Data Science, Design, Mobile App Development).
   - Filter by **Location** (e.g., Delhi, Bangalore, Remote, Pune, Munnar).
   - Filter by **Max Duration** (1, 2, 3, or 6 months).
   - Filter by **Minimum Stipend** with an interactive range slider showing formatted currencies.
2. **Searchable Selection Dropdowns**:
   - Integrated custom dropdown lists for Location and Profile.
   - Includes real-time fuzzy text search, checkmark active states, and auto-dismisses on option select or clicking outside.
3. **URL State Synchronization**:
   - Active filters and search queries are kept in sync with URL search parameters (e.g., `?location=Munnar&minStipend=10000`).
   - Reloading the page or sharing the link preserves the exact search configuration.
4. **Natural Grammar Search Summary**:
   - Generates a human-friendly query overview (e.g. *"Showing 2 opportunities in Munnar"* or *"Showing 1 opportunity for Web Development in Bangalore"*).
5. **Mobile Responsiveness**:
   - Single-column stacked layouts on mobile and tablet screens.
   - Flex-wrap badges and responsive grid details inside card entries to prevent text overlapping.
6. **Direct Apply Redirection**:
   - Clicking **Apply Now** takes candidates to the original Internshala details page via listing IDs.

---

## 📁 Folder Structure

```text
src/
├── app/
│   ├── api/
│   │   └── internships/
│   │       └── route.ts         # Proxy API route handler with fallback mocked data
│   ├── globals.css              # Custom font bindings and tailwind layers
│   ├── layout.tsx               # Next.js Root Layout with loaded Outfit/Jakarta fonts
│   └── page.tsx                 # Core Dashboard layout wrapper with Suspense boundaries
├── components/
│   ├── FilterBar/
│   │   └── FilterBar.tsx        # Desktop/Mobile filter selection panel
│   ├── InternshipCard/
│   │   └── InternshipCard.tsx   # Detailed individual listing card
│   ├── InternshipList/
│   │   └── InternshipList.tsx   # Container list with search results header
│   └── UI/
│       ├── EmptyState.tsx       # Fallback layout when no search matches are found
│       ├── LoadingSkeleton.tsx  # Shimmer load state loaders
│       └── SearchableSelect.tsx # Reusable dropdown with search input and outside-click listeners
├── hooks/
│   └── useInternships.ts        # Custom React hook for API states and URL parameters synchronization
├── services/
│   └── internshipApi.ts         # Axios integration for API communication
├── types/
│   └── internship.ts            # Core TypeScript interfaces for Filters and Internships
└── utils/
    └── filterHelpers.ts         # Case-insensitive matching rules and range validators
```

---

## ⚡ Setup & Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/AKASHDHARDUBEY/internshala-search-clone.git
   cd internshala-search-clone
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

4. **Verify Lint & Production Build**:
   ```bash
   npm run lint
   ```
   ```bash
   npm run build
   ```

---

## ⚙️ Architecture Decisions

- **URL-First State Model**: Synchronizing search terms and filters to the URL query string guarantees that back/forward navigation and link-sharing retain identical listing views.
- **Client API Proxy Routing**: The app handles CORS restrictions and downstream API failover by wrapping data requests in a Next.js API route (`/api/internships`). If the upstream API is unavailable or rate-limited, the system falls back to predefined mocked internship configurations.
- **Responsive Stacked Grids**: Replaced fixed grid columns on metadata cards with responsive layout definitions (`grid-cols-1 sm:grid-cols-3`) to prevent visual truncation on modern compact viewports (such as iPhone SE/Android viewports).
