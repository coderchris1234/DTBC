# 🎥 YouTube API Setup Guide

## Overview
This guide explains how to set up the YouTube Data API to automatically fetch all sermons from your YouTube playlist and display them on your website.

## 🔑 Getting a YouTube API Key

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Create Project" or select an existing project
3. Give your project a name (e.g., "DTBC Website")
4. Click "Create"

### Step 2: Enable YouTube Data API v3
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "YouTube Data API v3"
3. Click on it and press "Enable"

### Step 3: Create API Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Optional) Click "Restrict Key" to limit usage to YouTube Data API only

### Step 4: Add API Key to Your Project
1. Create a `.env` file in your project root (if it doesn't exist)
2. Add your API key:
```
VITE_YOUTUBE_API_KEY=your_api_key_here
```
3. Restart your development server

## 🎯 Current Configuration

### Playlist ID
Your playlist ID is already configured: `PLhhjC515-IIjINZvrIvpwmYCBrUjY3Cvu`

### Fallback System
- **With API Key**: Fetches all videos from your YouTube playlist automatically
- **Without API Key**: Uses fallback static data (current 3 sermons + 3 examples)

## ✨ Features

### 🔄 **Automatic Updates**
- New sermons added to YouTube appear automatically on your website
- No manual updates needed
- Real-time synchronization with your YouTube channel

### 📊 **Rich Data**
- **Video Titles**: Automatically pulled from YouTube
- **Descriptions**: First 150 characters from YouTube descriptions
- **Thumbnails**: High-quality YouTube thumbnails
- **Publish Dates**: Formatted relative dates (e.g., "2 days ago")
- **Direct Links**: Links to original YouTube videos

### 🎨 **Enhanced Display**
- **Grid Layout**: Beautiful responsive grid of sermon cards
- **Embedded Player**: Watch videos directly on your website
- **Hover Effects**: Interactive sermon cards with play buttons
- **Loading States**: Smooth skeleton loading animations

## 🔧 Technical Details

### API Limits
- **Free Quota**: 10,000 requests per day
- **Typical Usage**: ~1-2 requests per page load
- **Caching**: Results are cached in browser for performance

### Error Handling
- **API Failures**: Gracefully falls back to static content
- **Network Issues**: Shows cached content when possible
- **Invalid Videos**: Skips broken or private videos

### Performance
- **Lazy Loading**: Videos load as needed
- **Optimized Requests**: Fetches only necessary data
- **Caching**: Reduces API calls with smart caching

## 🚀 Benefits

### **For Your Church**
- ✅ **Automatic Updates**: New sermons appear instantly
- ✅ **Complete Library**: All YouTube videos available
- ✅ **No Maintenance**: Set it once, works forever
- ✅ **Professional Display**: Beautiful, organized presentation

### **For Your Visitors**
- ✅ **Complete Access**: See all available sermons
- ✅ **Fresh Content**: Always up-to-date with latest messages
- ✅ **Easy Navigation**: Browse entire sermon library
- ✅ **Embedded Viewing**: Watch without leaving your site

## 🔒 Security Notes

### API Key Protection
- Never commit API keys to version control
- Use environment variables (`.env` file)
- Restrict API key to YouTube Data API only
- Monitor usage in Google Cloud Console

### Best Practices
- Set up API key restrictions by HTTP referrer
- Monitor quota usage regularly
- Have fallback content ready
- Test both with and without API key

## 🛠️ Troubleshooting

### Common Issues

**"Quota Exceeded" Error**
- Check Google Cloud Console for quota usage
- Wait for quota reset (daily)
- Consider upgrading quota if needed

**"API Key Invalid" Error**
- Verify API key is correct in `.env` file
- Ensure YouTube Data API v3 is enabled
- Check API key restrictions

**"Playlist Not Found" Error**
- Verify playlist is public
- Check playlist ID is correct
- Ensure playlist exists and has videos

### Testing
```javascript
// Test API key in browser console
fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=PLhhjC515-IIjINZvrIvpwmYCBrUjY3Cvu&key=YOUR_API_KEY`)
  .then(response => response.json())
  .then(data => console.log(data));
```

## 📈 Future Enhancements

Potential additions:
- **Video Duration**: Fetch actual video lengths
- **View Counts**: Show popularity metrics
- **Categories**: Organize sermons by topic
- **Search**: Find specific sermons
- **Pagination**: Handle large sermon libraries

---

With the YouTube API integration, your website becomes a dynamic, always-updated portal to your complete sermon library!