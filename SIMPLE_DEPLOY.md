# 🚀 Nederland Stemt - Simpele Deployment

## Makkelijkste Manier: Via Vercel Dashboard

### Stap 1: Ga naar Vercel
Ga naar: **https://vercel.com**

### Stap 2: Login
- Klik "Sign up" (of "Login" als je al een account hebt)
- Kies "Continue with GitHub" 
- Login met je GitHub account

### Stap 3: Import Repository
- Klik "Add New Project" of "Import Git Repository"
- Zoek naar: **`joostkamstra/nederland-stemt`**
- Klik "Import"

### Stap 4: Deploy Settings
Vercel detecteert automatisch Next.js. Verander niets, klik gewoon "Deploy"

### Stap 5: Wachten
Vercel bouwt en deployt je app (duurt ~2-3 minuten)

### Stap 6: Live URL
Je krijgt een URL zoals: `https://nederland-stemt-abc123.vercel.app`

## Na Deployment:

### Environment Variables Toevoegen (Belangrijk!)
1. Ga naar je project in Vercel dashboard
2. Ga naar "Settings" → "Environment Variables"  
3. Voeg toe:
   - `ADMIN_PASSWORD` = `JouwWachtwoord2025!`
   - `JWT_SECRET` = `jouw-64-karakter-geheime-sleutel-hier`
   - `CSRF_SECRET` = `jouw-64-karakter-csrf-sleutel-hier`

### Custom Domain (Optioneel)
- Ga naar "Settings" → "Domains"
- Voeg toe: `nederlandstemt.com`

**Klaar! 🎉**

Je app draait dan live op internet!