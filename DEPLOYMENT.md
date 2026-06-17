# Kalyanam Resort • Vercel Deployment Manual

Follow these streamlined instructions to link your GitHub repository and automatically deploy **Kalyanam** to a fast, production-grade domain on Vercel.

---

## 🏛️ Repository Connections

- **GitHub Repository URL**: `https://github.com/devvratbhuriya857-boop/kalyanam.git`
- **Deployment Platform**: [Vercel](https://vercel.com/)
- **Configuration Engine**: Embedded inside `./vercel.json`

---

## ⚡ Step-By-Step Deployment Protocol

### Option A: Direct Connection via Vercel Dashboard (Recommended)

1. **Access Vercel Dashboard**:
   - Navigate to [Vercel](https://vercel.com/) and register or sign in using your **GitHub account**.

2. **Launch New Project**:
   - Click the **"Add New..."** button in the top right corner and select **"Project"**.

3. **Import Your Repository**:
   - Under the *"Import Git Repository"* panel, find `kalyanam` from the search box.
   - If you cannot locate it, click **"Adjust GitHub App Permissions"** to grant Vercel access to your newly configured `devvratbhuriya857-boop/kalyanam` repository.
   - Click **"Import"** next to the `kalyanam` repository item.

4. **Review Build Settings & Framework Configurations**:
   - Vercel automatically detects the **Vite Framework** and configurations from `vercel.json`.
   - **Framework Preset**: `Vite` (Detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Trigger First Deploy**:
   - Click the **"Deploy"** button. Within 60 seconds, Vercel will bundle all assets, optimize paths, compile TypeScript, and launch your royal resort live!

---

### Option B: Command Line Interface (CLI) Deployment

If you prefer to command deployments directly from your terminal:

1. **Install Vercel CLI globally**:
   ```bash
   npm install -g vercel
   ```

2. **Login to your Vercel space**:
   ```bash
   vercel login
   ```

3. **Link your local repository to a Vercel project**:
   - Navigate to your project folder:
     ```bash
     cd kalyanam
     ```
   - Initialize the link:
     ```bash
     vercel link
     ```
     *(Answer "yes" to prompts, link to your Vercel organization account)*

4. **Deploy a static preview draft**:
   ```bash
   vercel
   ```

5. **Deploy live to production division**:
   ```bash
   vercel --prod
   ```

---

## 🔄 Automatic Continuous Integration (CI/CD)

Vercel is now linked to your GitHub repository branches:
- **`production` (main/master Branch)**: Every commit pushed to your main branch triggers an automatic production build and updates your live domain without causing down-times.
- **`draft/experimental` (Preview Branches)**: Pull Requests or pushes on other branches will produce temporary preview URLs (ideal for viewing modifications or testing experimental layouts safely).

---

## 🛡️ Theme Design Guidelines & Technology Stack

The application has been outfitted with:
1. **Buttery Smooth Inertial Scrolling**: Managed globally using lightweight browser virtualization (`Lenis`).
2. **Gold-Faceted Glassmorphism Grid system**: Responsive styling via `Tailwind CSS`.
3. **Bespoke Entry Sequences**: Integrated using physics-driven transitions with `motion`/`motion/react`.
