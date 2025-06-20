import { PlayCircle } from 'lucide-react';

const VideoPlayer = ({ url, className = '' }) => {
  if (!url) {
    return (
      <div
        className={`bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center ${className}`}
      >
        <div className="text-center p-4">
          <PlayCircle className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500 dark:text-gray-400">فيديو غير متوفر</p>
        </div>
      </div>
    );
  }

  // YouTube
  const youtubeId = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  )?.[1];
  // Vimeo
  const vimeoId = url.match(
    /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/
  )?.[1];

  // Cloudinary or direct video URL
  const isDirectVideo =
    /\.(mp4|webm|ogg)$/i.test(url) ||
    url.includes('cloudinary') ||
    url.includes('res.cloudinary.com');

  if (youtubeId) {
    return (
      <div className={`aspect-video ${className}`}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-md w-full h-full"
        ></iframe>
      </div>
    );
  }

  if (vimeoId) {
    return (
      <div className={`aspect-video ${className}`}>
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}?title=0&byline=0&portrait=0`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="rounded-md"
        ></iframe>
      </div>
    );
  }

  if (isDirectVideo) {
    return (
      <div className={`aspect-video ${className}`}>
        <video
          controls
          className="w-full h-full rounded-md"
          src={url}
          onError={(e) => {
            console.error('Video load error:', e);
            e.target.parentElement.innerHTML = `
              <div class="bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center h-full">
                <div class="text-center p-4">
                  <svg class="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                  <p class="text-gray-500 dark:text-gray-400">تعذر تحميل الفيديو</p>
                </div>
              </div>
            `;
          }}
        >
          متصفحك لا يدعم تشغيل الفيديو
        </video>
      </div>
    );
  }

  // Fallback for unsupported URLs
  return (
    <div
      className={`bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center ${className}`}
    >
      <div className="text-center p-4">
        <PlayCircle className="w-12 h-12 mx-auto text-gray-400 mb-2" />
        <p className="text-gray-500 dark:text-gray-400">
          نوع الفيديو غير مدعوم
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          مشاهدة في نافذة جديدة
        </a>
      </div>
    </div>
  );
};

export default VideoPlayer;
