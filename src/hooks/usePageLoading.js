import { useState, useEffect } from 'react'

export const usePageLoading = (delay = 800) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return isLoading
}

export const useImageLoading = (src) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (!src) {
      setIsLoading(false)
      return
    }

    const img = new Image()
    
    img.onload = () => {
      setIsLoading(false)
      setHasError(false)
    }
    
    img.onerror = () => {
      setIsLoading(false)
      setHasError(true)
    }
    
    img.src = src
  }, [src])

  return { isLoading, hasError }
}

export const useComponentLoading = (dependencies = [], delay = 300) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if all dependencies are loaded
    const allLoaded = dependencies.every(dep => dep !== null && dep !== undefined)
    
    if (allLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, delay)
      
      return () => clearTimeout(timer)
    }
  }, [...dependencies, delay])

  return isLoading
}