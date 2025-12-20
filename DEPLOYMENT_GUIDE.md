# Divine Touch Bible Church - Deployment Guide

## Pre-Deployment Checklist

### 1. Dependencies and Build
- [ ] Ensure all dependencies are installed: `npm install`
- [ ] Verify Terser is installed for minification: `npm install --save-dev terser`
- [ ] Test production build locally: `npm run build`
- [ ] Test the production build: `npm run preview`

### 2. Environment Configuration
- [ ] Copy `.env.example` to `.env` and fill in your actual values
- [ ] Update Google Analytics ID if using analytics
- [ ] Configure EmailJS credentials for contact forms
- [ ] Update church contact information

### 3. Domain and SEO Setup
- [ ] Update domain references in `public/sitemap.xml`
- [ ] Update canonical URLs in `index.html`
- [ ] Update Open Graph URLs for social media sharing
- [ ] Verify robots.txt allows proper crawling

### 4. Content Verification
- [ ] Review all church information for accuracy
- [ ] Verify contact details (email, phone, address)
- [ ] Check Zelle payment information
- [ ] Update sermon videos with actual YouTube links
- [ ] Verify leadership information and photos

### 5. Performance Optimization
- [ ] Run `npm run build` to create production build
- [ ] Test the production build locally with `npm run preview`
- [ ] Verify all images are optimized
- [ ] Check that lazy loading is working properly

## Common Deployment Issues

### Terser Error Fix
If you encounter "terser not found" error during build:
```bash
npm install --save-dev terser
```

### CSS Import Warning Fix
Ensure @import statements are at the top of CSS files, before any other rules.

## Deployment Options

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Option 2: Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Option 3: Traditional Web Hosting
1. Run `npm run build` locally
2. Upload the `dist` folder contents to your web server
3. Configure your web server to serve the SPA properly

## Post-Deployment Tasks

### 1. Analytics Setup
- [ ] Verify Google Analytics is tracking properly
- [ ] Set up Google Search Console
- [ ] Submit sitemap to search engines

### 2. Performance Monitoring
- [ ] Test website speed with Google PageSpeed Insights
- [ ] Verify mobile responsiveness
- [ ] Test all forms and interactive elements

### 3. SEO Optimization
- [ ] Verify meta tags are displaying correctly
- [ ] Test social media sharing (Facebook, Twitter)
- [ ] Check that structured data is valid

### 4. Security
- [ ] Ensure HTTPS is properly configured
- [ ] Test contact forms for spam protection
- [ ] Verify no sensitive information is exposed

## Maintenance

### Regular Updates
- Update sermon videos weekly/monthly
- Review and update church events
- Monitor website performance
- Keep dependencies updated with `npm update`

### Content Management
- Leadership changes
- Service time updates
- Contact information changes
- New ministry programs

## Support

For technical support or questions about this website:
- Review the code documentation
- Check the React and Vite documentation
- Contact your web developer

## Backup Strategy

- Keep regular backups of your content
- Use version control (Git) for code changes
- Document any customizations made after deployment