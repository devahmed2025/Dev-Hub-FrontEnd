import { Link, Tag } from "lucide-react"

function Tags({topTags}) {
    return (
       <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Tag className="w-5 h-5 text-blue-500" />
          Popular Tags
        </h3>
        {topTags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {topTags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
              >
                #{tag}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No tags yet
          </p>
        )}
      </div>
    )
}

export default Tags
