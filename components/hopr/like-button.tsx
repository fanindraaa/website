'use client';

import { useState, useEffect } from 'react';

export default function HoprLikeButton() {
  const [likes, setLikes] = useState<number>(42);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [isBouncing, setIsBouncing] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('hopr_studio_likes');
      if (stored) {
        setLikes(parseInt(stored, 10));
      }
      const userLiked = localStorage.getItem('hopr_user_liked');
      if (userLiked === 'true') {
        setHasLiked(true);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleLike = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);

    const nextCount = hasLiked ? likes - 1 : likes + 1;
    const nextState = !hasLiked;
    setLikes(nextCount);
    setHasLiked(nextState);

    try {
      localStorage.setItem('hopr_studio_likes', nextCount.toString());
      localStorage.setItem('hopr_user_liked', nextState ? 'true' : 'false');
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      className={`group relative inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-semibold shadow-sm transition-all duration-200 select-none ${
        hasLiked
          ? 'bg-rose-50/90 border-rose-200 text-rose-700 shadow-rose-100'
          : 'bg-white/85 border-sand-4 text-sand-11 hover:text-sand-12 hover:border-sand-6 hover:bg-white'
      } backdrop-blur-sm`}
      aria-label="Hit like for Hopr studio board"
    >
      <span
        className={`inline-block transition-transform duration-300 ${
          isBouncing ? 'scale-125' : 'scale-100'
        } ${hasLiked ? 'text-rose-500 fill-rose-500' : 'text-sand-9 group-hover:text-rose-500'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill={hasLiked ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </span>
      <span className="font-medium">Hit like</span>
      <span
        className={`rounded-full px-1.5 py-0.2 text-[11.5px] font-bold ${
          hasLiked ? 'bg-rose-100 text-rose-800' : 'bg-sand-3 text-sand-10'
        }`}
      >
        {likes}
      </span>
    </button>
  );
}
