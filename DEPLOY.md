# Deploying the DMV Study App

This app is a **static site** (HTML, JS, CSS). No server or database is needed. That makes deployment simpler and cheaper than EC2.

## Recommended: Vercel (easiest, free)

1. **Push the project to GitHub** (if you haven’t already).
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **Add New** → **Project** and import your repo.
4. Vercel will detect Vite. Keep the defaults:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**. You’ll get a URL like `dmv-study-app-xxx.vercel.app`.
6. Optional: add a custom domain in the project settings.

**Updates:** Push to GitHub; Vercel redeploys automatically.

---

## Alternative: Netlify (also free, similar)

1. Push to GitHub.
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**.
3. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy. You get a URL like `random-name.netlify.app`.

---

## If you prefer to stay on AWS

Use **S3 + CloudFront** instead of EC2. No server to maintain; you only serve static files.

1. **Build locally:** `npm run build` (creates the `dist` folder).
2. **S3:** Create a bucket, enable static website hosting, upload the contents of `dist` (not the folder itself).
3. **CloudFront:** Create a distribution with the S3 bucket as origin. Use the CloudFront URL (or attach a custom domain and certificate).

This is cheaper than a small EC2 instance and doesn’t require SSH, security patches, or process management.

---

## Summary

| Option        | Best for           | Cost   |
|--------------|--------------------|--------|
| **Vercel**   | Easiest, auto deploys from Git | Free tier |
| **Netlify**  | Same idea as Vercel | Free tier |
| **AWS S3 + CloudFront** | Staying in AWS, no server | Pay per request/bandwidth (very low for a small app) |
| **EC2**      | Apps that need a real server   | Overkill and more work for this app |

For this project, **Vercel or Netlify** is the simplest; **S3 + CloudFront** is the better choice if you want to keep everything on AWS.
