# Deployment Guide

This document provides detailed instructions for deploying the Kaykov Media website to various hosting platforms.

## 📋 Pre-Deployment Checklist

- [ ] All environment variables are configured
- [ ] Google Apps Script is deployed and URL is updated
- [ ] All images are optimized
- [ ] Build completes without errors
- [ ] Production build is tested locally
- [ ] SEO meta tags are verified
- [ ] Open Graph image is uploaded (`public/og-image.jpg`)

## 🏗 Building for Production

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Build the Project

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Step 3: Test Production Build Locally

```bash
npm run preview
```

Visit `http://localhost:4173` to verify the build works correctly.

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

#### Automatic Deployment (GitHub Integration)

1. **Connect Repository**
   - Go to [Netlify](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account
   - Select the `Kaykov-Signages-3` repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - These settings are already configured in `netlify.toml`

3. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy
   - Future pushes to main branch will auto-deploy

#### Manual Deployment

1. Build the project: `npm run build`
2. Drag and drop the `dist/` folder to Netlify dashboard
3. Site will be live immediately

#### Custom Domain Setup

1. Go to Site settings → Domain management
2. Add your custom domain (e.g., `kaykovmedia.com`)
3. Configure DNS records as instructed by Netlify
4. SSL certificate is automatically provisioned

### Option 2: Vercel

#### Automatic Deployment (GitHub Integration)

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com/)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the `Kaykov-Signages-3` repository

2. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - These settings are already configured in `vercel.json`

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy
   - Future pushes to main branch will auto-deploy

#### Custom Domain Setup

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. SSL certificate is automatically provisioned

### Option 3: Traditional Hosting (cPanel, FTP, etc.)

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Upload Files**
   - Upload all contents of the `dist/` folder to your web server
   - Ensure files are in the root directory or appropriate subdirectory

3. **Configure Server**
   - Ensure your server supports SPA routing
   - Configure `.htaccess` (Apache) or `nginx.conf` (Nginx) to redirect all routes to `index.html`

#### Apache (.htaccess)

Create `.htaccess` in the root directory:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name kaykovmedia.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔧 Post-Deployment Configuration

### 1. Verify Open Graph Image

- Ensure `og-image.jpg` is accessible at `https://kaykovmedia.com/og-image.jpg`
- Test with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 2. Verify Google Apps Script

- Test form submission on the live site
- Check Google Sheets for incoming submissions
- Verify error handling works correctly

### 3. SEO Verification

- Submit sitemap to Google Search Console
- Verify robots.txt is accessible
- Check meta tags with browser dev tools
- Test social media sharing previews

### 4. Performance Testing

- Run Lighthouse audit
- Check Core Web Vitals
- Verify image optimization
- Test loading speeds

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --dir=dist --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🐛 Troubleshooting

### Build Fails

- Check Node.js version (requires 18+)
- Clear `node_modules` and reinstall
- Check for TypeScript errors
- Verify all dependencies are installed

### Routing Issues

- Ensure server is configured for SPA routing
- Check `netlify.toml` or `vercel.json` redirects
- Verify `index.html` is served for all routes

### Form Submission Fails

- Verify Google Apps Script is deployed
- Check CORS settings in Apps Script
- Verify API URL is correct
- Check browser console for errors

### Images Not Loading

- Verify image paths are correct
- Check that images are in `public/` or properly imported
- Ensure build includes all assets
- Check file extensions (case-sensitive)

## 📊 Monitoring

### Recommended Tools

- **Google Analytics**: Track website traffic
- **Google Search Console**: Monitor SEO performance
- **Netlify Analytics** (if using Netlify): Built-in analytics
- **Sentry** (optional): Error tracking

## 🔐 Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **API Keys**: Store in environment variables, not in code
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure CORS properly in Google Apps Script
5. **Rate Limiting**: Consider rate limiting for form submissions

## 📝 Deployment Notes

- **Build Time**: ~2-5 minutes depending on platform
- **Deployment Time**: ~1-2 minutes after build
- **Downtime**: Zero downtime with most platforms (blue-green deployment)
- **Rollback**: Easy rollback available on Netlify/Vercel

## 🆘 Support

If you encounter issues during deployment:

1. Check the build logs for errors
2. Verify all configuration files are correct
3. Test the build locally first
4. Check platform-specific documentation
5. Review the troubleshooting section above

---

Last updated: 2025

