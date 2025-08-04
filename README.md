# Job Applicant Management System

A modern React application for managing job applicants with a clean, responsive interface built using Material-UI, React Query, and Zustand.

## Features

- **Modern UI/UX**: Clean design with Material-UI components and responsive layout
- **Multiple Views**: Card list view and dashboard table view
- **Real-time Data**: Powered by React Query for efficient data fetching and caching
- **State Management**: Zustand for lightweight, reactive state management
- **Responsive Design**: Fully responsive layout that works on all devices
- **Sorting & Pagination**: Advanced data manipulation features
- **Modal Details**: Reusable modal component for candidate details

## Tech Stack

- **Frontend**: React 19, Material-UI 5, React Router 6
- **Data Fetching**: React Query (TanStack Query)
- **State Management**: Zustand
- **Backend**: JSON Server (mock API)
- **Testing**: Jest, React Testing Library
- **Styling**: Material-UI with custom theme

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the JSON server (backend):
```bash
npm run server
```

3. In a new terminal, start the React application:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

### Running Tests

```bash
npm test
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout/         # Layout components (Header, Sidebar, Layout)
│   └── CandidateModal.js
├── pages/              # Page components
│   ├── Home.js
│   ├── CandidateList.js
│   └── CandidateTable.js
├── hooks/              # Custom React hooks
│   └── useCandidates.js
├── services/           # API services
│   └── api.js
├── store/              # State management
│   └── useStore.js
├── theme/              # Material-UI theme
│   └── theme.js
├── utils/              # Utility functions
│   └── statusColors.js
└── __tests__/          # Unit tests
```

## API Endpoints

The JSON server provides the following endpoints:

- `GET /candidates` - Get all candidates
- `GET /candidates?_page=1&_limit=10` - Get paginated candidates
- `GET /candidates/:id` - Get candidate by ID

## Data Structure

Each candidate object contains:

```javascript
{
  id: number,
  name: string,
  email: string,
  phone: string,
  role: string,
  status: 'new' | 'processed' | 'rejected' | 'hired',
  resume: string,
  date: string,
  experience: number,
  assignee: string
}
```

## Features Overview

### Home Page
- Welcome message and navigation instructions
- Clean, informative layout

### Card List
- Card-based layout with candidate information
- Status pills with color coding
- Pagination (10 items per page)
- Quick action buttons

### Dashboard Table
- Sortable columns (name, role, status, date)
- Click rows to view details
- Comprehensive data display

### Candidate Modal
- Reusable component for detailed candidate information
- Clean, modern design
- All candidate details in one view

## Performance Optimizations

- React Query for efficient data caching and background updates
- Memoized sorting in table view
- Optimized re-renders with proper state management
- Lazy loading and code splitting ready

## Testing

The application includes unit tests for:
- Components (CandidateModal, CandidateList)
- API services
- Utility functions
- Custom hooks