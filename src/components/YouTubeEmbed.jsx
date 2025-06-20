import { PlayCircle } from 'lucide-react';

const YouTubeEmbed = ({ url, videoId, className = '' }) => {
  // If videoId is provided directly, use it
  let finalVideoId = videoId;
  
  // If url is provided, try to extract videoId from it
  if (!finalVideoId && url) {
    finalVideoId = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    )?.[1];
  }

  if (!finalVideoId) {
    return (
      <div className={`bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <PlayCircle className="w-12 h-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500 dark:text-gray-400">فيديو غير متوفر</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`aspect-video ${className}`}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${finalVideoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-md w-full h-full"
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;