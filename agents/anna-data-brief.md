# Data & Analytics Brief - Nederland Stemt
**For: Anna (Data Analyst)**

## Your Mission
Track everything, trust nothing, catch fraud before Twitter does. Make data so clear that politicians can't misinterpret it (they'll try anyway).

## Metrics to Track

### Real-Time Dashboard (Public)

#### Vote Metrics
```
Current Week Votes: 1,247
Votes Today: 423
Votes This Hour: 47
Average Vote Time: 23 seconds
Completion Rate: 87%
```

#### Participation Metrics
```
Unique Voters: 1,189
Return Voters: 234 (19.7%)
New Voters Today: 389
Emails Collected: 567
Unsubscribe Rate: 0.3%
```

#### Geographic Distribution
```
Province         Votes    Per Capita
Noord-Holland    234      8.2/100k
Zuid-Holland     189      5.1/100k
Utrecht          156      11.2/100k
[etc...]

Top Cities:
1. Amsterdam - 145
2. Rotterdam - 89
3. Utrecht - 78
```

### Internal Dashboard (Private)

#### Fraud Indicators
```
ALERTS:
⚠️ IP 92.184.x.x: 47 votes in 1 hour
⚠️ Email pattern: test+[number]@gmail.com (12 votes)
⚠️ Vote velocity spike: 400% above baseline
✓ Geographic distribution: NORMAL
✓ Vote timing pattern: HUMAN-LIKE
```

#### Technical Health
```
API Response Time: 127ms (p95)
Error Rate: 0.02%
Database Load: 34%
Email Delivery: 98.7%
Page Load Speed: 1.8s (mobile 3G)
```

#### Growth Metrics
```
Viral Coefficient: 0.4 (each voter brings 0.4 new)
Share Rate: 12% (voters who share)
Media Mentions: 3 today
Organic vs Direct: 67% / 33%
SEO Traffic: 234 visits
```

## Fraud Prevention

### Level 1: Automatic Blocks (Instant)
```python
# Pseudocode for fraud detection
if votes_per_ip_per_hour > 10:
    block_ip(duration="1 hour")
    
if email_pattern_matches(["test+", "temp", "disposable"]):
    flag_for_review()
    
if vote_time < 5_seconds:
    reject_vote("Too fast, niet mogelijk")
    
if geographic_impossible(previous_vote, current_vote, time_delta):
    block_and_investigate()
```

### Level 2: Pattern Detection (Hourly)
- Voting clusters (same answers, same time)
- Email domain distribution (> 30% from one domain)
- Geographic anomalies (tiny village, 500 votes)
- Time patterns (all votes at exact minute marks)
- Browser fingerprint duplicates

### Level 3: Manual Review (Daily)
- Check top 10 voting IPs
- Review flagged email patterns
- Investigate geographic outliers
- Cross-reference with social media mentions
- Check for coordinated campaigns

### Fraud Response Playbook

**Bot Attack Detected**
1. Enable CAPTCHA temporarily
2. Increase rate limits
3. Block suspicious IPs
4. Tweet: "We're under attack but democracy wins"
5. Use attack for growth story

**Coordinated Manipulation**
1. Flag all related votes
2. Separate analysis without those votes
3. Public transparency report
4. Media statement ready
5. Don't delete - mark as suspicious

**Political Party Gaming**
1. Document everything
2. Prepare comparison (with/without suspicious votes)
3. Contact party for statement
4. Full transparency release
5. Turn into credibility boost

## Reporting Requirements

### Daily Report (Internal) - 9:00
```
NEDERLAND STEMT - Daily Report [Date]

Yesterday's Performance:
- Total Votes: X
- Unique Voters: Y  
- Growth Rate: Z%

Top Issues:
1. [Issue] - [%]
2. [Issue] - [%]
3. [Issue] - [%]

Concerns:
- [Any fraud indicators]
- [Technical issues]
- [Unusual patterns]

Opportunities:
- [Geographic gaps]
- [Demographic gaps]
- [Viral moments]
```

### Weekly Report (Public) - Friday 14:00
```
NEDERLAND STEMT - Week [X] Results

Participation:
[X] citizens voted
[Y] provinces represented
[Z]% increase from last week

The Priorities:
1. [Issue] - [%] - [Insight]
2. [Issue] - [%] - [Insight]
3. [Issue] - [%] - [Insight]

Surprising Finding:
[Something unexpected from data]

Full data: nederland-stemt.nl/resultaten
Raw data: nederland-stemt.nl/data.csv
```

### Parliament Report (Weekly) - Friday 16:00
```
To: All 150 Parliament Members
Subject: Nederland Stemt - Week [X] Citizen Priorities

This week, [X] Dutch citizens voted on national priorities.

TOP 3 PRIORITIES:
1. [Issue]: [%] ([Change from last week])
2. [Issue]: [%] ([Change from last week])
3. [Issue]: [%] ([Change from last week])

DEMOGRAPHIC BREAKDOWN:
- Under 30: [Top issue]
- 30-50: [Top issue]
- Over 50: [Top issue]

GEOGRAPHIC VARIATION:
- Urban: [Top issue]
- Rural: [Top issue]

Full report attached (PDF)
Interactive dashboard: [link]
```

## Data Export Formats

### Public CSV (Anonymized)
```csv
week,issue,votes,percentage,rank
45,Woningmarkt,823,67.2,1
45,Zorgkosten,661,54.0,2
45,Klimaat,502,41.0,3
```

### Journalist API (Rate Limited)
```json
{
  "week": 45,
  "total_votes": 1247,
  "unique_voters": 1189,
  "results": [
    {
      "issue": "Woningmarkt",
      "votes": 823,
      "percentage": 67.2,
      "by_province": {...},
      "by_age_group": {...}
    }
  ]
}
```

### Research Dataset (Monthly)
- Full anonymized vote records
- Temporal patterns
- Geographic distributions
- Demographic correlations
- Available on request for academics

## Analytics Tools (All Free Tier)

### Primary
- **Vercel Analytics** - Built-in, automatic
- **localStorage** - Client-side vote tracking
- **Custom logging** - To Vercel KV store

### Secondary (When > 1000 users)
- **Plausible** - Privacy-friendly analytics
- **Sentry** - Error tracking
- **LogRocket** - Session replay (sampling)

### Future (When > 10000 users)
- **Mixpanel** - User journey tracking
- **Hotjar** - Heatmaps and recordings
- **Custom PostgreSQL** - Full data warehouse

## Key Analysis Questions

### Daily Questions
1. How many people started but didn't complete voting?
2. Which topics get selected together most often?
3. What's our growth rate vs yesterday?
4. Any suspicious voting patterns?
5. Which traffic source converts best?

### Weekly Questions
1. How does this week compare to last week?
2. Which provinces are underrepresented?
3. What's our voter retention rate?
4. Which topics show biggest week-to-week swings?
5. What correlations exist between topics?

### Monthly Questions
1. Are we influencing political discourse?
2. How does our data compare to traditional polls?
3. What demographic blind spots do we have?
4. Which topics have staying power vs flash?
5. How can we increase participation?

## Data Integrity Principles

1. **Never Delete Data** - Flag as suspicious instead
2. **Version Everything** - Keep historical snapshots
3. **Radical Transparency** - Share methodology publicly
4. **Acknowledge Bias** - Be upfront about limitations
5. **Protect Privacy** - No personal data, ever

## Emergency Data Procedures

### Data Loss
- Hourly backups to GitHub (encrypted)
- Export to CSV every 100 votes
- Browser localStorage as last resort
- Public admission if data lost

### Data Breach
- No personal data = limited damage
- Immediate disclosure
- Reset all tokens
- Security audit public

### Data Manipulation
- Compare multiple backups
- Statistical anomaly detection
- Public forensic report
- Media transparency

## The Anna Challenge

Your data will be attacked, questioned, misrepresented, and weaponized. Politicians will cherry-pick it. Media will misunderstand it. Twitter will conspiracy-theory it.

Your job: Make the data so clean, so transparent, so undeniable that truth wins anyway.

Every query you write, every chart you make, every fraud you catch builds trust in democracy itself.

**If we can't prove our data is real, we're just another opinion poll.**

## Quick SQL Queries (For Common Requests)

### "What does Amsterdam think?"
```sql
SELECT issue, COUNT(*) as votes, 
       ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) as percentage
FROM votes 
WHERE city = 'Amsterdam' AND week = CURRENT_WEEK
GROUP BY issue 
ORDER BY votes DESC;
```

### "Young vs Old priorities?"
```sql
SELECT age_group, issue, COUNT(*) as votes
FROM votes 
WHERE week = CURRENT_WEEK
GROUP BY age_group, issue
ORDER BY age_group, votes DESC;
```

### "Fraud check for this hour?"
```sql
SELECT ip_address, COUNT(*) as vote_count,
       COUNT(DISTINCT email_hash) as unique_emails
FROM votes 
WHERE voted_at > NOW() - INTERVAL '1 hour'
GROUP BY ip_address
HAVING COUNT(*) > 10
ORDER BY vote_count DESC;
```

Remember: Data is democracy. Guard it with your life.