# Design Brief - Nederland Stemt
**For: Dirk (Design)**

## Brand Personality

### Dutch Directness
- No bullshit, no decoration, pure function
- Like NS.nl or Rijksoverheid.nl but friendlier
- Trust through simplicity, not fancy graphics
- "Doe maar normaal" aesthetic

### Visual Identity
- **Colors**: Dutch orange (#FF6B00), Government blue (#004699), Clean white
- **Typography**: System fonts only (no loading delays)
- **Icons**: None. Text is clear enough.
- **Images**: None. This is about votes, not stock photos.
- **Logo**: Text only "Nederland Stemt" in bold

## Must-Have Pages (Total: 5)

### 1. Landing Page (index)
```
[Nederland Stemt]

De stem van Nederland. Elke week.

[→ Stem Nu] (big orange button)

Deze week stemmen we over:
1. Woningmarkt crisis
2. Klimaatverandering 
3. Zorgkosten
[etc...]

Al 1,247 stemmen deze week
Nog 4 dagen tot resultaten

[Zie Vorige Resultaten]
```

### 2. Vote Page (/stem)
```
Kies je top 3 prioriteiten:

□ Woningmarkt crisis
□ Klimaatverandering
□ Zorgkosten
□ Onderwijs kwaliteit
□ Immigratie beleid
□ Pensioen zekerheid
□ Criminaliteit aanpak
□ Mentale gezondheid
□ Digitalisering overheid
□ EU verhoudingen

[Email adres voor resultaten]

[→ Stem] (disabled until 3 selected + email)

Een stem per email per week.
```

### 3. Results Page (/resultaten)
```
Week 45 Resultaten - 1,247 stemmen

1. Woningmarkt crisis - 67%
   ████████████░░░
   
2. Zorgkosten - 54%
   ██████████░░░░░
   
3. Klimaatverandering - 41%
   ████████░░░░░░░

[Zie per provincie] [Download PDF]

Vorige weken: [44] [43] [42] [41]
```

### 4. About Page (/over)
```
Nederland Stemt

Waarom?
Politici weten niet wat jij belangrijk vindt.
Wij meten het. Elke week.

Hoe?
- Maandag: nieuwe onderwerpen
- Week lang: stemmen
- Vrijdag: resultaten naar Tweede Kamer

Wie?
Onafhankelijk burgerinitiatief.
Geen partijen. Geen sponsors. Geen agenda.

Contact: info@nederland-stemt.nl
```

### 5. Transparency Page (/transparantie)
```
Volledig Transparant

Stemmen deze week: 1,247
Unieke emails: 1,189
Geblokkeerde bots: 58

[Download stemdata (CSV)]
[Bekijk broncode (GitHub)]
[Lees methodologie (PDF)]

Laatste audit: 2 dagen geleden
Door: Security.nl
```

## Mobile-First Constraints

### Touch Targets
- Minimum 48x48px (WCAG standard)
- Buttons full width on mobile
- 16px minimum font size
- 1.5 line height minimum

### Performance Budget
- Max 50KB CSS
- Max 100KB JavaScript  
- No web fonts
- No external dependencies
- 2 second load time max on 3G

### Responsive Breakpoints
- Mobile: 0-768px (design here first)
- Tablet: 769-1024px (minor adjustments)
- Desktop: 1025px+ (center in 800px column)

## Component Library (Keep It Minimal)

### Button
```
Primary: Orange background, white text, rounded corners
Secondary: White background, blue border, blue text
Disabled: Grey background, grey text
```

### Form Elements
```
Text Input: Full width, 48px tall, blue border on focus
Checkbox: 24x24px, orange check when selected
Email: Native HTML5 validation
```

### Feedback States
```
Success: Green border + check icon
Error: Red border + text below
Loading: Orange spinner (CSS only)
```

## Accessibility Requirements

- **WCAG 2.1 AA** compliant
- Keyboard navigation complete
- Screen reader tested
- Color contrast 4.5:1 minimum
- Focus indicators visible
- No auto-playing content
- Alt text where needed (though we use no images)

## What NOT to Design

- No animations (accessibility + performance)
- No modals or popups
- No hamburger menus
- No carousels
- No video/audio
- No maps or complex visualizations
- No user accounts or dashboards
- No dark mode (yet)
- No app install prompts
- No cookie banners (we don't use them)

## Design Deliverables

1. **Figma file** with 5 pages (mobile + desktop)
2. **CSS file** - one single file, minified
3. **Component examples** in plain HTML
4. **Shareables templates** for social media

## Testing Requirements

- Works on iPhone 6 (2014) and newer
- Works on Android 5.0 and newer  
- Works in Internet Explorer 11 (yes, really)
- Works without JavaScript enabled
- Works with ad blockers

## Copy Guidelines

- Short sentences (max 15 words)
- Active voice always
- No jargon or English
- "Je/jij" not "u"
- Call-to-actions: verb + now ("Stem nu", "Bekijk resultaten")

## The Dirk Challenge

Design this so your oma can vote without calling you for help. Design this so a teenager thinks it's legit. Design this so a politician can't ignore it.

Make it so simple that complexity becomes impossible.

**Deadline: End of today. We launch tomorrow morning.**