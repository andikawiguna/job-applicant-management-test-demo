# Changelog

All notable changes will be documented in this file.

## [1.2.0] - 2025-08-6

### ✨ New Features
- **Stats Cards**: Added card-style statistics to table page
  - Total applicants, hired, rejected, and applied this week counters
- **Dark/Light Mode Toggle**: Full theme switching functionality
  - Toggle button in header with sun/moon icons
- **Breadcrumb Navigation**: Reusable breadcrumb component
  - Added to all pages (Home, List, Table)
  - Clickable navigation links with home icon
  - Shows current navigation path
- **Page Persistence**: Maintains current page on page changes
  - Separate tracking for list and table views
  - Automatic state updates on page changes

### 🛠 UX Improvements
- **Enhanced Table Sorting**: 3-state sorting cycle (asc → desc → reset)
  - Reset to default sort functionality
  - Visual feedback with conditional sort icons
  - Only active column shows sort indicators
- **Side Drawer Enhancements**: 
  - App-level positioning with proper z-index stacking

### 🔧 Technical Improvements
- **Enhanced Theme System**: Dynamic theme creation based on mode
- **State Management**: Enhanced Zustand store with new features
- **Enhanced Testing**: Added unit test coverage for new features

---

## [1.1.0] - 2025-08-5

### ✨ New Features
- **Quick Status Change**: Added quick action buttons to candidate list for instant status updates
- **Search & Filter**: Search and filtering system for table view
  - Search by name and email
  - Filter by status, role, HR assignee, and date range
  - Active filter chips and collapsible controls
- **Side Drawer**: Replaced modal with side drawer for candidate details
  - Status change functionality within drawer
- **Enhanced Sorting**: Improved table sorting with ascending/descending name sorting
- **Form Validation**: Form validation for status change operations
  - Prevents selecting current status
  - Required field validation

### 🛠 Technical Improvements
- **Reusable Components**: Created modular, reusable components
  - `StatusChangeForm`: Validated form component for status updates
  - `CandidateDrawer`: Side drawer with status management
  - `SearchAndFilter`: Search and filtering component
- **Enhanced Testing**: Added unit test coverage for new features

---

## [1.0.0] - 2025-08-4

### 🎉 Initial Commit

#### ✨ Features
- **Multiple View Modes**:
  - Home page with navigation instructions
  - Jira-style card list with pagination (10 items per page)
  - Dashboard table view with sortable columns
- **Candidate Management**:
  - View detailed candidate information in modal
  - Status tracking (new, processed, rejected, hired)
  - Pagination support for large datasets
- **Real-time Data Fetching** with React Query (TanStack Query)
- **Mock Backend** with JSON Server (1000+ candidate records)

#### 🛠 Technical Stack
- **Frontend**: React 19.1.1, Material-UI 5, React Router 6
- **Data Fetching**: TanStack React Query v5
- **State Management**: Zustand v4
- **Testing**: Jest, React Testing Library v16
- **Backend**: JSON Server (development)
- **Styling**: Material-UI with custom theme

#### 🧪 Testing
- Component testing with React Testing Library
- API service testing
- Utility function testing
