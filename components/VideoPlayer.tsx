'use client';

import { useState } from 'react';

interface VideoPlayerProps {
  videoUrl?: string;
  posterImage?: string;
  posterImageFallback?: string;
  title?: string;
  duration?: string;
  aspectRatio?: string;
  className?: string;
}

export default function VideoPlayer({
  videoUrl = '',
  posterImage = '',
  posterImageFallback = '',
  title = 'Overview Video',
  duration = '2 min',
  aspectRatio = '16/9',
  className = ''
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPoster, setCurrentPoster] = useState(posterImage);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  // If no video URL is provided, show placeholder
  if (!videoUrl) {
    return (
      <div className={className} style={{
        background: 'linear-gradient(135deg, var(--card-blue), #0F172A)',
        borderRadius: '16px',
        aspectRatio,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          background: 'var(--revolution-red)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          zIndex: 1
        }}>
          <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px', fill: 'white', marginLeft: '4px' }}>
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem', zIndex: 1 }}>
          {title} • {duration}
        </p>
      </div>
    );
  }

  // Extract video ID from Google Drive URL if applicable
  const getEmbedUrl = (url: string) => {
    // Google Drive format: https://drive.google.com/file/d/FILE_ID/view
    const driveMatch = url.match(/\/file\/d\/([^\/]+)/);
    if (driveMatch) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }

    // YouTube format
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // Return original URL if not recognized
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className={className} style={{
      background: 'linear-gradient(135deg, var(--card-blue), #0F172A)',
      borderRadius: '16px',
      aspectRatio,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {!isPlaying && (
        <>
          {currentPoster && (
            <img
              src={currentPoster}
              alt={title}
              loading="lazy"
              style={{
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
              onError={() => {
                if (posterImageFallback && currentPoster !== posterImageFallback) {
                  setCurrentPoster(posterImageFallback);
                }
              }}
            />
          )}
          <div
            onClick={handlePlayClick}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '70px',
              height: '70px',
              background: 'var(--revolution-red)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              zIndex: 2
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.1)';
              e.currentTarget.style.boxShadow = '0 0 40px rgba(229, 57, 53, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px', fill: 'white', marginLeft: '4px' }}>
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <p style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            zIndex: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}>
            {title} • {duration}
          </p>
        </>
      )}
      {isPlaying && (
        <iframe
          src={embedUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '16px'
          }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}
    </div>
  );
}
