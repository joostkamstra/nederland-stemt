# Vercel Deployment Setup

## Automatische deployment via GitHub Actions

Ik heb een GitHub Actions workflow opgezet die automatisch naar Vercel deployed. Volg deze stappen:

### 1. Vercel Token aanmaken

1. Ga naar https://vercel.com/account/tokens
2. Klik op "Create Token"
3. Geef het een naam zoals "GitHub Actions Deploy"
4. Kopieer de token (je ziet hem maar 1x!)

### 2. Vercel Project IDs ophalen

Run dit commando nadat je eenmalig handmatig hebt gedeployed:
```bash
cat .vercel/project.json
```

Dit geeft je:
- `orgId` - Dit is je VERCEL_ORG_ID
- `projectId` - Dit is je VERCEL_PROJECT_ID

### 3. GitHub Secrets toevoegen

Ga naar je GitHub repository:
1. Settings → Secrets and variables → Actions
2. Voeg deze secrets toe:
   - `VERCEL_TOKEN` - De token uit stap 1
   - `VERCEL_ORG_ID` - De orgId uit stap 2
   - `VERCEL_PROJECT_ID` - De projectId uit stap 2

### 4. Deployment triggeren

Nu kun je op 3 manieren deployen:

#### Optie A: Push naar main branch
```bash
git add .
git commit -m "Deploy dark mode to production"
git push origin main
```

#### Optie B: Manual trigger in GitHub
1. Ga naar Actions tab in GitHub
2. Selecteer "Deploy to Vercel Production"
3. Klik "Run workflow"

#### Optie C: Eenmalig handmatig (voor eerste keer)
```bash
vercel --prod
```

## Alternatief: Direct deployment script

Als je toch direct wilt deployen zonder GitHub:

```bash
# Eenmalig inloggen
vercel login

# Dan kun je deployen met
vercel --prod --yes
```

## Environment variabelen

Vergeet niet je environment variabelen in Vercel dashboard te zetten:
- `ADMIN_PASSWORD_HASH`
- `JWT_SECRET`
- `NEXT_PUBLIC_GA_ID` (optioneel)