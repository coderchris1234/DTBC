# Automatic Live Stream Detection

## 🤖 How Automatic Detection Works

Your website now has **THREE methods** to automatically detect when you're live streaming and change the button without manual intervention!

---

## 🎯 Detection Methods

### **Method 1: Time-Based Auto-Detection (Easiest)**

The system automatically detects your service times and shows "LIVE NOW" during those periods.

**Current Settings:**
- **Sunday Service**: 9:30 AM - 10:00 AM (automatically goes live)
- **Wednesday Service**: 6:00 PM - 6:30 PM (automatically goes live)

**How it works:**
1. System checks the current day and time every 30 seconds
2. If it's Sunday at 9:30 AM, button automatically shows "LIVE NOW"
3. After service time ends, button automatically returns to normal
4. No manual intervention needed!

**To Customize Service Times:**

Open `DTBC-1/src/hooks/useLiveStream.js` and modify:

```javascript
// Sunday Service (9:45 AM NJ time)
const isSundayService = currentDay === 0 && 
                        currentHour === 9 && 
                        currentMinute >= 45 && 
                        currentMinute <= 59

// Wednesday Service (6:00 PM)
const isWednesdayService = currentDay === 3 && 
                           currentHour === 18 && 
                           currentMinute >= 0 && 
                           currentMinute <= 30
```

**Day Numbers:**
- 0 = Sunday
- 1 = Monday
- 2 = Tuesday
- 3 = Wednesday
- 4 = Thursday
- 5 = Friday
- 6 = Saturday

---

### **Method 2: Environment Variable Control**

Set environment variables to control live status remotely.

**Setup:**
1. Create a `.env` file in your project root
2. Add: `VITE_IS_LIVE=true`
3. The button will show "LIVE NOW"
4. Change to `VITE_IS_LIVE=false` to go offline

**Benefits:**
- Can be controlled from hosting platform (Vercel, Netlify)
- No code changes needed
- Can be automated with deployment scripts

---

### **Method 3: YouTube API Integration (Most Advanced)**

Automatically detects when your YouTube channel is actually live streaming.

**Setup:**

1. **Get YouTube API Key:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable "YouTube Data API v3"
   - Create credentials (API Key)
   - Copy your API key

2. **Get Your Channel ID:**
   - Go to your YouTube channel
   - Click on your profile
   - Go to "Settings" → "Advanced settings"
   - Copy your Channel ID

3. **Configure Environment Variables:**
   ```
   VITE_YOUTUBE_API_KEY=your_actual_api_key
   VITE_YOUTUBE_CHANNEL_ID=your_actual_channel_id
   ```

4. **Update the Hook:**
   In `SermonsList.jsx`, change:
   ```javascript
   const { isLive, liveUrl } = useLiveStreamAPI() // Use API version
   ```

**How it works:**
- Checks YouTube API every 2 minutes
- Detects if your channel has an active live stream
- Automatically shows "LIVE NOW" when you go live
- Automatically returns to normal when stream ends
- Gets the actual live video URL

---

## ⚡ Real-Time Updates

### **Update Frequency:**
- **Time-Based**: Checks every 30 seconds
- **Environment Variable**: Checks on page load
- **YouTube API**: Checks every 2 minutes

### **Automatic State Changes:**
- ✅ Button changes to "LIVE NOW" automatically
- ✅ Button returns to normal automatically
- ✅ URL updates to live stream automatically
- ✅ Visual effects activate automatically
- ✅ Text descriptions change automatically

---

## 🔧 Configuration Examples

### **Example 1: Sunday 9:45 AM Service**

```javascript
const isSundayService = currentDay === 0 && // Sunday
                        currentHour === 9 &&  // 9 AM hour
                        currentMinute >= 45   // From 9:45 onwards
```

### **Example 2: Multiple Service Times**

```javascript
// Early service: 8:00 AM - 9:00 AM
const earlyService = currentDay === 0 && 
                     currentHour === 8

// Main service: 10:00 AM - 11:30 AM  
const mainService = currentDay === 0 && 
                    currentHour >= 10 && 
                    currentHour < 12

// Evening service: 6:00 PM - 7:30 PM
const eveningService = currentDay === 0 && 
                       currentHour >= 18 && 
                       currentHour < 20

const shouldBeLive = earlyService || mainService || eveningService
```

### **Example 3: Extended Service Time**

```javascript
// Service from 9:00 AM to 11:00 AM
const isSundayService = currentDay === 0 && 
                        currentHour >= 9 && 
                        currentHour < 11
```

---

## 🎮 Manual Override

Even with automatic detection, you can still manually control the live status:

```javascript
// In useLiveStream.js
const manualOverride = true // Force live status ON
const manualOverride = false // Force live status OFF
```

**Priority Order:**
1. Manual Override (highest priority)
2. Environment Variable
3. Time-Based Detection
4. YouTube API Detection

---

## 📊 Testing Your Setup

### **Test Time-Based Detection:**

1. Change service time to current time:
   ```javascript
   const isSundayService = currentDay === 0 && 
                           currentHour === 14 && // 2 PM
                           currentMinute >= 30
   ```

2. Wait 30 seconds
3. Button should show "LIVE NOW"
4. Change time back to normal

### **Test Environment Variable:**

1. Create `.env` file:
   ```
   VITE_IS_LIVE=true
   ```

2. Restart your website
3. Button should show "LIVE NOW"

### **Test Manual Override:**

1. Set `manualOverride = true`
2. Save file
3. Button should show "LIVE NOW" immediately

---

## 🐛 Debugging

### **Check Console Logs:**

The system logs its status:
- 🔴 "LIVE: Church service detected"
- ⚪ "OFFLINE: No service detected"

### **Common Issues:**

**Button not changing:**
- Check browser console for logs
- Verify service times are correct
- Check timezone settings

**Wrong time detection:**
- Server time might be different from local time
- Use UTC time or adjust for timezone

**API not working:**
- Verify API key is correct
- Check API quota limits
- Ensure YouTube Data API v3 is enabled

---

## 🌍 Timezone Considerations

The time-based detection uses the server's timezone. If your server is in a different timezone:

```javascript
// Convert to your timezone
const options = { timeZone: 'America/New_York' }
const localTime = new Date().toLocaleString('en-US', options)
```

---

## 💡 Best Practices

### **1. Use Time-Based for Regular Services**
Perfect for weekly services at consistent times.

### **2. Use Environment Variables for Special Events**
Great for one-time events or irregular schedules.

### **3. Use YouTube API for Full Automation**
Best for complete hands-off operation.

### **4. Combine Methods**
Use time-based as default + manual override for flexibility.

---

## 🚀 Quick Start

### **Easiest Setup (Time-Based):**

1. Open `useLiveStream.js`
2. Update service times to match your schedule
3. Save file
4. Done! Button will automatically change during services

### **No Configuration Needed:**

The system is already configured for:
- Sunday 9:30 AM
- Wednesday 6:00 PM

Just adjust these times to match your actual service schedule!

---

## ✅ Summary

**Yes, the button WILL change automatically!**

- ✅ Goes to "LIVE NOW" when you're live
- ✅ Returns to normal when service ends
- ✅ Updates every 30 seconds
- ✅ No manual intervention needed
- ✅ Works 24/7 automatically

**You can choose:**
- **Automatic**: Time-based detection (easiest)
- **Semi-Automatic**: Environment variables
- **Fully Automatic**: YouTube API integration
- **Manual**: Override when needed

**The system is smart enough to handle everything automatically while still giving you manual control when you need it!** 🎉