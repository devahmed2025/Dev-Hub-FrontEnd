import { Link, Star } from "lucide-react";

function TopPosts({topPosts}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-400" />
        Top Posts
      </h3>
      {topPosts.length > 0 ? (
        topPosts.map((post) => (
          <Link
            key={post._id || post.tempId}
            to={`/posts/${post._id || post.tempId}`}
            className="block p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 mb-2"
          >
            <p className="text-sm font-medium line-clamp-2">{post.content}</p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {post.likes?.length || 0} likes
            </span>
          </Link>
        ))
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">No posts yet</p>
      )}
    </div>
  );
}

export default TopPosts;
