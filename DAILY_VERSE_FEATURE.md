# Daily Verse Widget Feature

## Overview
The Daily Verse Widget is a beautiful, interactive component that displays inspirational Bible verses with social sharing and bookmarking capabilities.

## Features

### 🎯 **Core Functionality**
- **Daily Rotation**: Automatically shows a different verse each day
- **Manual Refresh**: Users can get a new random verse anytime
- **Beautiful Typography**: Elegant design with gradient backgrounds
- **Theme Support**: Adapts to light/dark mode

### 📖 **Verse Management**
- **Curated Collection**: 10 carefully selected verses covering themes like hope, trust, faith, courage, peace, comfort, strength, and love
- **Theme Tags**: Each verse is categorized by its spiritual theme
- **Smart Rotation**: Uses date-based algorithm for consistent daily verses

### 🔖 **Bookmarking System**
- **Save Favorites**: Bookmark verses for later reference
- **Persistent Storage**: Uses localStorage to maintain bookmarks across sessions
- **Bookmark Page**: Dedicated page to view all saved verses (`/bookmarks`)
- **Easy Management**: Add/remove bookmarks with one click

### 📱 **Social Sharing**
- **Multiple Platforms**: Share to Twitter, Facebook, WhatsApp
- **Copy to Clipboard**: Quick copy functionality
- **Formatted Text**: Properly formatted verse text with attribution
- **Custom Hashtags**: Includes relevant hashtags for social media

### 🎨 **Visual Design**
- **Gradient Backgrounds**: Beautiful color gradients that adapt to theme
- **Smooth Animations**: Loading states and hover effects
- **Responsive Design**: Works perfectly on all device sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Usage

### Adding to Pages
```jsx
import DailyVerse from '../Components/DailyVerse';

// Add to any page component
<DailyVerse />
```

### Accessing Bookmarks
- **Desktop**: Click the bookmark icon (📖) in the header navigation
- **Mobile**: Access through mobile menu "Bookmarked Verses"
- **Direct URL**: Navigate to `/bookmarks`

### Using the Hook
```jsx
import { useBookmarkedVerses } from '../hooks/useBookmarkedVerses';

const { 
  bookmarkedVerses, 
  addBookmark, 
  removeBookmark, 
  isBookmarked, 
  clearBookmarks 
} = useBookmarkedVerses();
```

## Technical Implementation

### Components
- `DailyVerse.jsx` - Main widget component
- `BookmarkedVerses.jsx` - Bookmarks management page
- `useBookmarkedVerses.js` - Custom hook for bookmark management

### Data Storage
- Uses browser localStorage for persistence
- Bookmark data includes verse text, reference, theme, and timestamp
- Automatic cleanup and error handling

### Navigation Integration
- Added bookmark link to header navigation
- Mobile-responsive menu integration
- Route configuration in App.jsx

## Customization

### Adding New Verses
Edit the `verses` array in `DailyVerse.jsx`:
```jsx
{
  text: "Your verse text here...",
  reference: "Book Chapter:Verse",
  theme: "hope" // or faith, peace, strength, etc.
}
```

### Styling
The component uses CSS-in-JS with theme integration:
- Adapts to existing theme colors
- Responsive breakpoints
- Smooth transitions and animations

## Benefits for Church Website

1. **Daily Engagement**: Encourages visitors to return daily
2. **Spiritual Growth**: Provides daily inspiration and reflection
3. **Community Sharing**: Easy social media evangelism
4. **Personal Connection**: Bookmarking creates personal investment
5. **Modern UX**: Professional, app-like experience
6. **Mobile Friendly**: Perfect for on-the-go inspiration

## Future Enhancements

Potential additions could include:
- Verse of the week/month
- Commentary or devotional content
- Audio verse playback
- Verse search functionality
- Categories/topics filtering
- Push notifications for daily verses
- Integration with Bible APIs for expanded content

---

This feature adds significant value to the church website by providing daily spiritual content that visitors can engage with, share, and save for personal reflection.