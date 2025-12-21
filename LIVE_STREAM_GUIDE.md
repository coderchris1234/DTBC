# Live Stream Feature Guide

## 🔴 Live Stream Button Feature

Your sermon section now includes a dynamic "LIVE NOW" button that automatically changes when your YouTube channel is live streaming!

---

## 🎯 How It Works

### **Normal State:**
- Button shows: "View All Sermons on YouTube"
- Links to your sermon playlist
- Standard red YouTube color

### **Live State:**
- Button shows: "LIVE NOW - Join Service" 
- Pulsing red animation with glowing effect
- Blinking white dot indicator
- Links directly to your live stream
- Text changes to encourage joining the live service

---

## 🚀 How to Control Live Status

### **Method 1: Manual Code Control (Easiest)**

Open: `DTBC-1/src/hooks/useLiveStream.js`

Find this line:
```javascript
const isCurrentlyLive = false // ← Change this to true when going live!
```

**To Go Live:**
1. Change `false` to `true`
2. Save the file
3. The button will immediately show "LIVE NOW"

**To Go Offline:**
1. Change `true` to `false`
2. Save the file
3. The button returns to normal

### **Method 2: Environment Variable Control**

Create a `.env` file in your project root with:
```
VITE_IS_LIVE=true
VITE_LIVE_URL=https://www.youtube.com/watch?v=YOUR_LIVE_STREAM_ID
```

**To Go Live:**
1. Set `VITE_IS_LIVE=true`
2. Update `VITE_LIVE_URL` with your live stream link
3. Restart your website

**To Go Offline:**
1. Set `VITE_IS_LIVE=false`
2. Restart your website

---

## 📱 Live Button Features

### **Visual Effects:**
- **Pulsing Animation** - Button pulses every 2 seconds
- **Glowing Effect** - Red glow around the button
- **Blinking Dot** - White dot blinks to indicate live status
- **Color Change** - Brighter red color when live

### **Text Changes:**
- **Live**: "LIVE NOW - Join Service"
- **Normal**: "View All Sermons on YouTube"

### **Description Changes:**
- **Live**: "We're currently live! Click to join our worship service now."
- **Normal**: "Access our complete sermon library and subscribe to stay updated with new messages."

---

## 🔧 Customization Options

### **Change Live Stream URL**

In `useLiveStream.js`, update this line:
```javascript
const liveStreamUrl = 'YOUR_LIVE_STREAM_URL_HERE'
```

### **Change Check Interval**

The system checks for live status every 2 minutes. To change this:
```javascript
const interval = setInterval(checkLiveStatus, 5 * 60 * 1000) // 5 minutes
```

### **Manual Controls**

You can also control live status programmatically:
```javascript
const { isLive, liveUrl, goLive, goOffline } = useLiveStream()

// To go live
goLive('https://youtube.com/your-live-stream')

// To go offline
goOffline()
```

---

## 📋 Quick Setup Checklist

### **Before Going Live:**
- [ ] Test your YouTube live stream setup
- [ ] Get your live stream URL
- [ ] Update the live stream URL in the code
- [ ] Test the button functionality

### **Going Live Process:**
1. [ ] Start your YouTube live stream
2. [ ] Copy the live stream URL
3. [ ] Update the code: `isCurrentlyLive = true`
4. [ ] Verify the button shows "LIVE NOW"
5. [ ] Test clicking the button opens your live stream

### **After Service:**
1. [ ] End your YouTube live stream
2. [ ] Update the code: `isCurrentlyLive = false`
3. [ ] Verify the button returns to normal

---

## 🎥 YouTube Live Stream URLs

### **Different URL Types:**

**Live Stream Page:**
```
https://www.youtube.com/watch?v=LIVE_VIDEO_ID
```

**Channel Live Page:**
```
https://www.youtube.com/@your-channel-name/streams
```

**Direct Live URL:**
```
https://www.youtube.com/c/YourChannelName/live
```

### **Getting Your Live Stream URL:**
1. Start your live stream on YouTube
2. Go to your live stream page
3. Copy the URL from the browser
4. Use this URL in your live stream settings

---

## 💡 Pro Tips

### **1. Test Before Going Live**
Always test the button functionality before your actual service.

### **2. Update URLs**
Make sure your live stream URL is current and working.

### **3. Mobile Testing**
Test the live button on mobile devices to ensure it works properly.

### **4. Backup Plan**
Always have your regular YouTube channel link as a backup.

### **5. Timing**
Update the live status a few minutes before your service starts.

---

## 🔄 Automation Ideas

### **Future Enhancements:**
- **Scheduled Live**: Automatically go live at service times
- **YouTube API Integration**: Automatically detect when you're live
- **Notification System**: Alert website visitors when you go live
- **Countdown Timer**: Show countdown to next live service

---

## 🛠️ Troubleshooting

### **Button Not Changing:**
- Check if `isCurrentlyLive` is set to `true`
- Verify the file was saved properly
- Refresh the website page

### **Wrong URL Opening:**
- Check the `liveStreamUrl` variable
- Ensure the YouTube URL is correct and public

### **Animation Not Working:**
- Check browser compatibility
- Ensure CSS animations are enabled

---

## 📞 Quick Reference

### **Go Live:**
```javascript
// In useLiveStream.js
const isCurrentlyLive = true
```

### **Go Offline:**
```javascript
// In useLiveStream.js
const isCurrentlyLive = false
```

### **Update Live URL:**
```javascript
// In useLiveStream.js
const liveStreamUrl = 'https://youtube.com/your-new-live-url'
```

---

**Your live stream feature is ready to engage your congregation and bring them directly into your worship services! 🎉**