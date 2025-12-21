import { useState, useEffect } from 'react'

// Hook to automatically detect YouTube live streams
export const useLiveStream = () => {
  const [isLive, setIsLive] = useState(false)
  const [liveUrl, setLiveUrl] = useState('')

  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        // Method 1: Check your YouTube channel's live page
        const channelHandle = '@divinetouchbiblechurchnewj9570' // Your channel handle
        const livePageUrl = `https://www.youtube.com/${channelHandle}/streams`
        
        // Method 2: Use YouTube RSS feed to detect live streams
        // eslint-disable-next-line no-unused-vars
        const channelId = 'UCYourChannelId' // Replace with your actual channel ID
        
        // For now, we'll use a simple time-based check + manual override
        const now = new Date()
        const currentDay = now.getDay() // 0 = Sunday, 3 = Wednesday
        const currentHour = now.getHours()
        const currentMinute = now.getMinutes()
        
        // Auto-detect based on service times
        const isSundayService = currentDay === 0 && currentHour === 9 && currentMinute >= 30 && currentMinute <= 59 // Sunday 9:30-10:00 AM
        const isWednesdayService = currentDay === 3 && currentHour === 18 && currentMinute >= 0 && currentMinute <= 30 // Wednesday 6:00-6:30 PM
        
        // Manual override (you can still control this manually)
        const manualOverride = false // Set to true to force live status
        
        // Environment variable override
        const envOverride = import.meta.env.VITE_IS_LIVE === 'true'
        
        const shouldBeLive = isSundayService || isWednesdayService || manualOverride || envOverride
        
        setIsLive(shouldBeLive)
        setLiveUrl(shouldBeLive ? livePageUrl : '')
        
        // Log for debugging
        if (shouldBeLive) {
          console.log('🔴 LIVE: Church service detected - button should show LIVE NOW')
        } else {
          console.log('⚪ OFFLINE: No service detected - showing regular sermons')
        }
        
      } catch (error) {
        console.error('Error checking live status:', error)
        setIsLive(false)
      }
    }

    // Check immediately
    checkLiveStatus()
    
    // Check every 30 seconds for real-time updates
    const interval = setInterval(checkLiveStatus, 30 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Manual controls for override
  const goLive = (url = `https://www.youtube.com/@divinetouchbiblechurchnewj9570/streams`) => {
    setIsLive(true)
    setLiveUrl(url)
    console.log('🔴 MANUAL: Going live with URL:', url)
  }

  const goOffline = () => {
    setIsLive(false)
    setLiveUrl('')
    console.log('⚪ MANUAL: Going offline')
  }

  return {
    isLive,
    liveUrl,
    goLive,
    goOffline
  }
}

// Advanced YouTube API integration (requires API key)
export const useLiveStreamAPI = () => {
  const [isLive, setIsLive] = useState(false)
  const [liveUrl, setLiveUrl] = useState('')

  useEffect(() => {
    const checkYouTubeLive = async () => {
      try {
        const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY
        const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID
        
        if (!apiKey || !channelId) {
          console.log('YouTube API credentials not configured')
          return
        }

        // Check for live broadcasts
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`
        )
        
        const data = await response.json()
        
        if (data.items && data.items.length > 0) {
          const liveVideo = data.items[0]
          const liveVideoUrl = `https://www.youtube.com/watch?v=${liveVideo.id.videoId}`
          
          setIsLive(true)
          setLiveUrl(liveVideoUrl)
          console.log('🔴 API: Live stream detected:', liveVideo.snippet.title)
        } else {
          setIsLive(false)
          setLiveUrl('')
          console.log('⚪ API: No live streams found')
        }
        
      } catch (error) {
        console.error('YouTube API error:', error)
        setIsLive(false)
      }
    }

    checkYouTubeLive()
    
    // Check every 2 minutes
    const interval = setInterval(checkYouTubeLive, 2 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return {
    isLive,
    liveUrl
  }
}