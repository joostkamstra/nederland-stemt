# Nederland Stemt - Development Guide

## Project Overview
Nederland Stemt is a direct democracy platform that allows Dutch citizens to vote on weekly priority topics. The platform features a voting system, admin panel, email capture, and comprehensive analytics.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: JWT tokens with environment variables
- **Storage**: Enhanced localStorage with versioning
- **Analytics**: Google Analytics 4 with custom event tracking

## Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run type checking
npm run type-check
```

## Environment Variables
Required environment variables (see `.env.example`):

```env
# Admin Authentication
ADMIN_PASSWORD_HASH=your_bcrypt_hash_here
JWT_SECRET=your_32_char_secret_here

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## API Endpoints

### Vote API (`/api/vote`)

#### POST `/api/vote` - Submit Vote
Submit user vote for 3 priorities.

**Request Body:**
```json
{
  "priorities": ["priority-1", "priority-2", "priority-3"]
}
```

**Response (Success 200):**
```json
{
  "success": true,
  "voteId": "vote_1234567890_abc123def",
  "message": "Vote recorded successfully"
}
```

**Response (Error 400):**
```json
{
  "error": "Must select exactly 3 priorities"
}
```

**Response (Rate Limit 429):**
```json
{
  "error": "Rate limit exceeded. Please try again later."
}
```

#### POST `/api/vote` - Admin Actions
Approve or reject proposals (admin only).

**Request Body:**
```json
{
  "action": "approve", // or "reject"
  "proposalId": "proposal_1234567890_abc123def"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Proposal approved successfully"
}
```

#### GET `/api/vote` - Get Results
Retrieve voting results and statistics.

**Query Parameters:**
- `type=proposals` - Get proposals instead of vote results

**Response (Vote Results):**
```json
{
  "results": [
    {
      "id": "priority-1",
      "title": "Climate Action",
      "votes": 150,
      "percentage": 35.7
    }
  ],
  "totalVotes": 420,
  "week": 34,
  "lastUpdated": "2025-01-20T10:30:00.000Z"
}
```

**Response (Proposals):**
```json
{
  "proposals": [
    {
      "id": "proposal_1234567890_abc123def",
      "title": "Proposal Title",
      "description": "Proposal description",
      "category": "Climate",
      "votes": 0,
      "submittedAt": "2025-01-20T10:30:00.000Z",
      "status": "pending"
    }
  ],
  "lastUpdated": "2025-01-20T10:30:00.000Z"
}
```

### Admin Login API (`/app/admin/login/route.ts`)

#### POST `/app/admin/login/route.ts` - Admin Authentication
Authenticate admin user with password.

**Request Body:**
```json
{
  "password": "admin_password"
}
```

**Response (Success 200):**
```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

**Response (Error 401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

## Security Features

### Rate Limiting
- **Vote submissions**: 20 requests per minute per IP
- **General API calls**: 10 requests per minute per IP
- Implementation: In-memory storage (replace with Redis in production)

### XSS Protection
- Input sanitization using DOMPurify
- Content Security Policy headers
- HTML encoding for user-generated content

### CSRF Protection
- CSRF tokens for sensitive operations
- SameSite cookie attributes
- Origin validation

### Content Validation
- Input length limits
- Profanity detection
- Spam detection algorithms

## Storage System

### Enhanced localStorage
The platform uses a sophisticated localStorage system with:

- **Versioning**: Automatic schema migration
- **Backup/Restore**: Automatic backup creation
- **Data Types**: Votes, submissions, email signups, preferences, analytics

### Storage Schema
```typescript
interface StorageSchema {
  version: string;
  data: {
    votes?: {
      priorities: string[];
      timestamp: string;
      week: number;
      sessionId: string;
    };
    voteCounts?: { [priorityId: string]: number };
    submissions?: Proposal[];
    emailSignups?: EmailSignup[];
    userPreferences?: UserPreferences;
    analytics?: AnalyticsData;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    backups: BackupInfo[];
  };
}
```

### Storage Methods
```typescript
// Vote management
storage.hasVotedThisWeek(): boolean
storage.setVotes(priorities: string[]): void
storage.getVotes(): VoteData | null
storage.clearVotes(): void

// User preferences
storage.getUserPreferences(): UserPreferences
storage.setUserPreference(key, value): void

// Data export/import
storage.exportData(): string
storage.importData(jsonData: string): boolean

// Backup management
storage.getBackups(): BackupInfo[]
storage.restoreFromBackup(timestamp: string): boolean
```

## Analytics System

### Event Tracking
The platform includes comprehensive analytics tracking:

```typescript
// Page views
analytics.trackPageView(path: string, title?: string): void

// Custom events
analytics.trackEvent(name: string, data?: object): void

// Vote tracking
analytics.trackVote(priorities: string[], completionTime: number): void

// Error tracking
analytics.trackError(error: string, fatal: boolean): void
```

### Event Types
- `page_view` - Page navigation
- `priority_selected` - Priority selection
- `priority_deselected` - Priority deselection
- `vote_submission_started` - Vote process start
- `vote_completed` - Successful vote
- `email_capture_opened` - Email modal opened
- `email_submitted` - Email subscription
- `share_clicked` - Social sharing

## Component Architecture

### Key Components
- **VotePage** (`/app/stem/page.tsx`) - Main voting interface
- **AdminPanel** (`/app/admin/page.tsx`) - Admin dashboard
- **EmailCapture** - Email collection modal
- **AnalyticsTracker** - GA4 integration
- **EventTracker** - User interaction tracking
- **CookieConsent** - GDPR compliance
- **ShareCard** - Social sharing

### Reusable UI Components
- **ProgressIndicator** - Loading states
- **StatsCard** - Data visualization
- **SuccessModal** - Success feedback
- **LoadingSpinner** - Async operations

## GDPR Compliance

### Privacy Features
- Cookie consent management
- Data export capabilities
- Privacy policy integration
- Granular consent controls

### Cookie Categories
- **Necessary**: Essential functionality
- **Functional**: Enhanced features
- **Analytics**: Usage tracking

## Testing Guidelines

### Manual Testing Checklist
1. **Vote Flow**: Select 3 priorities → Submit → Confirmation
2. **Admin Panel**: Login → View proposals → Approve/Reject
3. **Email Capture**: Complete vote → Email modal → Submit
4. **Analytics**: Verify event tracking in GA4
5. **Mobile**: Test responsive design
6. **Accessibility**: Keyboard navigation, screen reader compatibility

### Browser Testing
- Chrome (primary)
- Firefox
- Safari
- Edge
- Mobile browsers

## Deployment Notes

### Production Considerations
1. **Database**: Replace in-memory storage with PostgreSQL/MySQL
2. **Redis**: Implement Redis for rate limiting
3. **CDN**: Use CDN for static assets
4. **Monitoring**: Add error tracking (Sentry)
5. **SSL**: Ensure HTTPS certificate
6. **Environment**: Configure production environment variables

### Performance Optimizations
- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Bundle analysis and optimization
- Service worker for offline functionality

## Troubleshooting

### Common Issues
1. **Build Errors**: Check TypeScript types and unused imports
2. **Authentication**: Verify JWT secret and password hash
3. **Storage**: Clear localStorage if migration fails
4. **Analytics**: Confirm GA4 tracking ID configuration

### Debug Commands
```bash
# Check build issues
npm run build 2>&1 | grep -i error

# Analyze bundle size
npm run build && npm run analyze

# Type check only
npm run type-check
```