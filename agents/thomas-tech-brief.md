# Technical Brief - Nederland Stemt
**For: Thomas (Tech Lead)**

## The Mission
Build and deploy a voting platform in 24 hours that can handle 100,000 Dutch citizens without spending a euro. No excuses, no delays, no "but what if" - just ship it.

## Tech Stack (Non-Negotiable)

### Frontend
- **Next.js 14** with App Router
- **React** (whatever Next includes)
- **Tailwind CSS** (utility-first, no custom CSS)
- **TypeScript** (strict mode, no any)
- Deploy to **Vercel** (free tier)

### Backend
- **Next.js API Routes** (no separate backend)
- **Vercel KV** for rate limiting (free tier: 30k requests)
- **localStorage** for vote tracking (MVP)
- **Resend** for emails (free tier: 100/day initially)

### Data Storage (MVP Phase)
- **localStorage** for vote state
- **Vercel Postgres** (free tier) for vote counts only
- **No user accounts** - email links only
- Migration path to Supabase when > 10k users

## API Endpoints Required

### Core Voting
```typescript
POST /api/vote
- Body: { priorities: string[], email: string }
- Returns: { success: boolean, voteId: string }
- Rate limit: 1 per email per week
- Store: Just increment counters

GET /api/results
- Returns: { week: number, results: VoteCount[], total: number }
- Cache: 30 seconds
- Public: No auth needed

GET /api/verify/:token
- Magic link validation
- Returns: { valid: boolean, email: string }
- Expires: 7 days
```

### Email Management
```typescript
POST /api/subscribe
- Body: { email: string }
- Double opt-in flow
- Rate limit: 3 per IP per hour

POST /api/unsubscribe/:token
- One-click unsubscribe
- No confirmation needed
```

### Admin (Basic Auth)
```typescript
GET /api/admin/stats
- Current week participation
- Geographic distribution
- Fraud indicators

POST /api/admin/topics
- Set next week's voting topics
- Maximum 10 topics
```

## Security Requirements

### MVP Security (Week 1)
1. **Rate Limiting**
   - IP-based: 10 votes per hour
   - Email-based: 1 vote per week
   - Use Vercel KV for counters

2. **Email Validation**
   - Magic links (no passwords)
   - JWT tokens with 7-day expiry
   - Hash emails in database

3. **Vote Fraud Prevention**
   - localStorage fingerprinting
   - Basic IP pattern detection
   - Manual review over 100 votes/hour

### Production Security (Month 1)
1. **DDoS Protection**
   - Cloudflare free tier
   - Vercel's built-in protection
   - Fallback static results page

2. **Data Protection**
   - GDPR compliance (email = only PII)
   - No cookies except functional
   - Data retention: 90 days

3. **Audit Logging**
   - Every vote: timestamp, hashed email, topic
   - Public audit feed (anonymized)
   - Daily backup to GitHub

## Deployment Requirements

### Day 0: Launch
```bash
vercel --prod
# That's it. No Docker, no K8s, no BS.
```

### Domain Setup
- nederland-stemt.nl → Vercel
- www → redirect to apex
- SSL: Vercel automatic

### Environment Variables
```env
RESEND_API_KEY=
JWT_SECRET=
ADMIN_PASSWORD=
KV_URL=
POSTGRES_URL=
```

### Monitoring (Free Tier)
- Vercel Analytics (built-in)
- Sentry (free tier: 5k errors)
- UptimeRobot (free tier: 50 monitors)
- Cloudflare Analytics (if using CF)

## Code Structure

```
/app
  /api
    /vote/route.ts
    /results/route.ts
    /verify/[token]/route.ts
  /(public)
    /page.tsx          # Landing
    /stem/page.tsx     # Vote
    /resultaten/page.tsx
  /(admin)
    /admin/page.tsx
/components
  /VoteForm.tsx
  /ResultsChart.tsx
  /EmailCapture.tsx
/lib
  /rate-limit.ts
  /email.ts
  /validation.ts
  /db.ts
```

## Performance Targets

### Critical Metrics
- **Time to Interactive**: < 2 seconds on 3G
- **API Response**: < 200ms p95
- **Email Delivery**: < 5 minutes
- **Uptime**: 99.9% (43 minutes downtime/month max)

### Load Testing
- Handle 1,000 concurrent users
- 10,000 votes per hour
- 100,000 page views per day
- All on free tier infrastructure

## Data Schema (Minimal)

### Votes Table
```sql
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  week INTEGER NOT NULL,
  topic VARCHAR(100) NOT NULL,
  count INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);
-- One row per topic per week
-- Just increment counters
```

### Emails Table (Optional Week 1)
```sql
CREATE TABLE emails (
  id SERIAL PRIMARY KEY,
  email_hash VARCHAR(64) UNIQUE,
  last_vote_week INTEGER,
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
-- Only if we need to track subscription
```

## Migration Path (When Success Hits)

### 10k Users (Month 1)
- Supabase for database ($25/month)
- Resend Pro for emails ($20/month)
- Still on Vercel free tier

### 100k Users (Month 3)
- Vercel Pro ($20/month)
- PostgreSQL dedicated ($50/month)
- SendGrid for emails ($50/month)
- Total: ~$150/month (find sponsors)

### 1M Users (Month 12)
- Full infrastructure review
- But that's a good problem to have

## Development Workflow

### Today's Sprint
1. **09:00**: Setup Next.js + deploy empty site
2. **10:00**: Create all pages (static first)
3. **12:00**: Add voting API + localStorage
4. **14:00**: Add results display
5. **16:00**: Email magic links working
6. **18:00**: Deploy to production
7. **20:00**: Test with 100 real users
8. **22:00**: Fix critical bugs only

### Git Workflow
```bash
main → deploy to production
dev → auto-deploy to preview
feature/* → PR required
hotfix/* → direct to main (emergencies)
```

### Testing Strategy
- No unit tests for MVP (controversial but fast)
- Manual testing checklist (30 minutes)
- Real user testing (friends/family)
- Monitor errors in production

## Common Objections (And Responses)

**"localStorage isn't secure!"**
- It's week 1. We'll migrate when we have users.

**"No database for votes?"**
- Counters in KV store are enough for MVP.

**"What about accessibility?"**
- Semantic HTML + system fonts = 90% there.

**"This won't scale!"**
- Correct. It scales to 10k users. That's enough for week 1.

**"No tests?"**
- Tests don't get users. Launching does.

## The Thomas Challenge

You have 24 hours to make Dutch democracy digital. No meetings, no planning poker, no architecture reviews. Just code.

Every hour you spend debating is an hour not shipping. Every feature you add is a bug you'll fix at midnight.

Build the simplest thing that could possibly work. Then ship it.

**The site goes live at 09:00 tomorrow. No delays.**

## Emergency Procedures

### If Vercel Dies
- Static HTML on GitHub Pages (backup ready)
- Results posted as image on Twitter
- Email blast with Google Form

### If Database Dies  
- Cache results for 1 hour
- Show last known good state
- Collect votes in localStorage, sync later

### If Email Dies
- Show results on site only
- Post to social media
- SMS backup for critical users

### If Everything Dies
- Twitter: "We zijn kapot. Morgen terug."
- Fix it
- Come back stronger

## Success Metrics (Technical)

- **Day 1**: Site loads, votes counted
- **Week 1**: No data loss, < 5 min downtime
- **Month 1**: Handle viral moment without crash
- **Month 3**: Politicians using our API

Remember: Perfect is the enemy of launched. Ship it.