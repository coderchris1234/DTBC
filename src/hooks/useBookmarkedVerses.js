import { useState } from 'react';

// Initialize state with localStorage data
const getInitialBookmarks = () => {
  try {
    const saved = localStorage.getItem('bookmarkedVerses');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading bookmarked verses:', error);
    return [];
  }
};

export const useBookmarkedVerses = () => {
  const [bookmarkedVerses, setBookmarkedVerses] = useState(getInitialBookmarks);

  // Add verse to bookmarks
  const addBookmark = (verse) => {
    const updated = [...bookmarkedVerses, { ...verse, bookmarkedAt: new Date().toISOString() }];
    setBookmarkedVerses(updated);
    localStorage.setItem('bookmarkedVerses', JSON.stringify(updated));
  };

  // Remove verse from bookmarks
  const removeBookmark = (reference) => {
    const updated = bookmarkedVerses.filter(verse => verse.reference !== reference);
    setBookmarkedVerses(updated);
    localStorage.setItem('bookmarkedVerses', JSON.stringify(updated));
  };

  // Check if verse is bookmarked
  const isBookmarked = (reference) => {
    return bookmarkedVerses.some(verse => verse.reference === reference);
  };

  // Clear all bookmarks
  const clearBookmarks = () => {
    setBookmarkedVerses([]);
    localStorage.removeItem('bookmarkedVerses');
  };

  // Get bookmarks sorted by date
  const getSortedBookmarks = () => {
    return [...bookmarkedVerses].sort((a, b) => 
      new Date(b.bookmarkedAt) - new Date(a.bookmarkedAt)
    );
  };

  return {
    bookmarkedVerses,
    addBookmark,
    removeBookmark,
    isBookmarked,
    clearBookmarks,
    getSortedBookmarks
  };
};