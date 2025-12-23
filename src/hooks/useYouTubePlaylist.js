import { useState, useEffect } from 'react';

export const useYouTubePlaylist = (playlistId, apiKey) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPlaylistVideos = async () => {
      if (!apiKey) {
        // If no API key, use fallback static data
        setVideos(getFallbackSermons());
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Get both playlist IDs from environment variables
        const sundayPlaylistId = import.meta.env.VITE_YOUTUBE_SUNDAY_PLAYLIST || 'PLhhjC515-IIjINZvrIvpwmYCBrUjY3Cvu';
        const wednesdayPlaylistId = import.meta.env.VITE_YOUTUBE_WEDNESDAY_PLAYLIST || 'PLhhjC515-IIiqMpPQsCUO8UuOo9JV60Xr';
        
        console.log(`🔍 Fetching from multiple playlists:`);
        console.log(`📅 Sunday Playlist: ${sundayPlaylistId}`);
        console.log(`📅 Wednesday Playlist: ${wednesdayPlaylistId}`);
        
        let allVideos = [];
        
        // Function to fetch videos from a single playlist
        const fetchPlaylistVideos = async (playlistId, serviceName) => {
          console.log(`🔍 Fetching ${serviceName} videos from playlist: ${playlistId}`);
          
          let playlistVideos = [];
          let nextPageToken = '';
          
          do {
            const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
            
            const response = await fetch(url);

            if (!response.ok) {
              console.error(`❌ Failed to fetch ${serviceName} playlist: ${response.status} ${response.statusText}`);
              return [];
            }

            const data = await response.json();
            console.log(`📊 ${serviceName} API Response:`, {
              totalResults: data.pageInfo?.totalResults,
              resultsPerPage: data.pageInfo?.resultsPerPage,
              itemsInThisPage: data.items?.length,
              nextPageToken: data.nextPageToken,
              hasNextPage: !!data.nextPageToken
            });
            
            // Filter out private/deleted videos and add service type
            const validVideos = data.items
              .filter(item => 
                item.snippet.title !== 'Private video' && 
                item.snippet.title !== 'Deleted video'
              )
              .map(item => ({
                ...item,
                serviceType: serviceName // Add service type for categorization
              }));
            
            console.log(`✅ Valid ${serviceName} videos in this page: ${validVideos.length}`);
            console.log(`📝 ${serviceName} video titles:`, validVideos.map(v => v.snippet.title));
            
            playlistVideos = [...playlistVideos, ...validVideos];
            nextPageToken = data.nextPageToken;
            
          } while (nextPageToken);
          
          return playlistVideos;
        };
        
        // Fetch from both playlists
        const [sundayVideos, wednesdayVideos] = await Promise.all([
          fetchPlaylistVideos(sundayPlaylistId, 'Sunday'),
          fetchPlaylistVideos(wednesdayPlaylistId, 'Wednesday')
        ]);
        
        // Combine all videos
        allVideos = [...sundayVideos, ...wednesdayVideos];
        
        // Sort by publish date (newest first)
        allVideos.sort((a, b) => new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt));

        const formattedVideos = allVideos.map((item, index) => ({
          id: index + 1,
          title: item.snippet.title,
          description: item.snippet.description ? 
            (item.snippet.description.substring(0, 150) + (item.snippet.description.length > 150 ? '...' : '')) :
            'No description available.',
          date: formatDate(item.snippet.publishedAt),
          duration: 'N/A', // Would need additional API call to get duration
          videoUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
          thumbnail: item.snippet.thumbnails.maxresdefault?.url || 
                    item.snippet.thumbnails.high?.url || 
                    item.snippet.thumbnails.medium?.url ||
                    item.snippet.thumbnails.default?.url,
          videoId: item.snippet.resourceId.videoId,
          serviceType: item.serviceType // Include service type in final data
        }));

        setVideos(formattedVideos);
        setError(null);
        console.log(`🎉 FINAL RESULT: Loaded ${formattedVideos.length} total sermons`);
        console.log(`📊 Breakdown: ${sundayVideos.length} Sunday + ${wednesdayVideos.length} Wednesday`);
        console.log(`📋 All sermon titles:`, formattedVideos.map(v => `[${v.serviceType}] ${v.title}`));
      } catch (err) {
        console.error('Error fetching YouTube playlists:', err);
        setError(err.message);
        // Fallback to static data on error
        setVideos(getFallbackSermons());
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlaylistVideos();
  }, [playlistId, apiKey]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return date.toLocaleDateString();
  };

  // Fallback sermons when API is not available
  const getFallbackSermons = () => [
    {
      id: 1,
      title: "Prosperity of the Soul",
      description: "Discover what true prosperity means in God's kingdom and how to cultivate spiritual wealth that lasts for eternity.",
      date: "Recent",
      duration: "45 min",
      videoUrl: "https://www.youtube.com/watch?v=VUoLwrN7u20&list=PLhhjC515-IIjINZvrIvpwmYCBrUjY3Cvu&index=6",
      thumbnail: "https://img.youtube.com/vi/VUoLwrN7u20/maxresdefault.jpg",
      videoId: "VUoLwrN7u20"
    },
    {
      id: 2,
      title: "I Will Hear Good News",
      description: "Learn how to position yourself to receive God's good news and promises, even in challenging seasons of life.",
      date: "Recent",
      duration: "42 min",
      videoUrl: "https://www.youtube.com/watch?v=LBvlI-MmhHQ&list=PLhhjC515-IIjINZvrIvpwmYCBrUjY3Cvu&index=4",
      thumbnail: "https://img.youtube.com/vi/LBvlI-MmhHQ/maxresdefault.jpg",
      videoId: "LBvlI-MmhHQ"
    },
    {
      id: 3,
      title: "Divine Manifestation",
      description: "Experience the power of God's divine manifestation in your life and witness His supernatural intervention in every situation.",
      date: "Recent",
      duration: "40 min",
      videoUrl: "https://www.youtube.com/watch?v=SL2SK8Xbz5g&list=PLhhjC515-IIiqMpPQsCUO8UuOo9JV60Xr&index=1",
      thumbnail: "https://img.youtube.com/vi/SL2SK8Xbz5g/maxresdefault.jpg",
      videoId: "SL2SK8Xbz5g"
    },
    {
      id: 4,
      title: "Walking in Faith",
      description: "Learn how to walk by faith and not by sight, trusting God's promises even when circumstances seem impossible.",
      date: "1 week ago",
      duration: "38 min",
      videoUrl: "https://www.youtube.com/watch?v=example1",
      thumbnail: "https://img.youtube.com/vi/example1/maxresdefault.jpg",
      videoId: "example1"
    },
    {
      id: 5,
      title: "The Power of Prayer",
      description: "Discover the transformative power of prayer and how to develop a deeper relationship with God through communication.",
      date: "2 weeks ago",
      duration: "44 min",
      videoUrl: "https://www.youtube.com/watch?v=example2",
      thumbnail: "https://img.youtube.com/vi/example2/maxresdefault.jpg",
      videoId: "example2"
    },
    {
      id: 6,
      title: "God's Grace and Mercy",
      description: "Understanding the depth of God's grace and mercy in our lives and how it transforms our daily walk with Him.",
      date: "3 weeks ago",
      duration: "41 min",
      videoUrl: "https://www.youtube.com/watch?v=example3",
      thumbnail: "https://img.youtube.com/vi/example3/maxresdefault.jpg",
      videoId: "example3"
    }
  ];

  return { videos, loading, error };
};