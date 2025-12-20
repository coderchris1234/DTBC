import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Analytics = () => {
  const location = useLocation()

  useEffect(() => {
    // Google Analytics 4 (GA4) tracking
    // Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics measurement ID
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

    if (GA_MEASUREMENT_ID && typeof window !== 'undefined' && window.gtag) {
      // Track page views
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title
      })
    }

    // Facebook Pixel tracking (optional)
    // Replace 'FB_PIXEL_ID' with your actual Facebook Pixel ID
    const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID

    if (FB_PIXEL_ID && typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView')
    }

    // Custom analytics event for church-specific tracking
    const trackChurchPageView = () => {
      const pageData = {
        page: location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      }

      // You can send this data to your own analytics service
      // or store it locally for later analysis
      console.log('Church Page View:', pageData)
    }

    trackChurchPageView()
  }, [location])

  return null // This component doesn't render anything
}

export default Analytics