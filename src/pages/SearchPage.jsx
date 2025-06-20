import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts, getGroups, getUser } from '../api/api';
import SearchBar from '../components/ui/SearchBar';
import Post from '../components/posts/Post';
import GroupCard from '../components/groups/GroupCard';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import LinkButton from '../components/ui/LinkButton';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function SearchPage() {
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ['searchPosts', searchQuery],
    queryFn: () => getPosts({ search: searchQuery, limit: 10 }),
    enabled: !!searchQuery && !!user,
  });

  const { data: groupsData, isLoading: groupsLoading } = useQuery({
    queryKey: ['searchGroups', searchQuery],
    queryFn: () => getGroups({ search: searchQuery, limit: 10 }),
    enabled: !!searchQuery && !!user,
  });

  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ['searchUsers', searchQuery],
    queryFn: () => getUser({ search: searchQuery, limit: 10 }),
    enabled: !!searchQuery && !!user,
  });

  const posts = postsData?.data.data || [];
  const groups = groupsData?.data.data || [];
  const users = usersData?.data.data || [];

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    document.title = 'Search - DevsHub';
  }, []);

  if (!user) return <Navigate to="/login" replace />;
  if (postsLoading || groupsLoading || usersLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="p-4 mb-6">
        <SearchBar onSearch={handleSearch} />
      </Card>
      {searchQuery && (
        <>
          <Card className="p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Users
            </h3>
            {users.length > 0 ? (
              <div className="mt-4 space-y-2">
                {users.map((user) => (
                  <LinkButton
                    key={user._id}
                    to={`/profile/${user._id}`}
                    type="card"
                    className="flex items-center gap-2"
                  >
                    <Avatar src={user.profilePhoto} alt={user.name} size="sm" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {user.name}
                    </span>
                  </LinkButton>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                No users found
              </p>
            )}
          </Card>
          <Card className="p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Posts
            </h3>
            {posts.length > 0 ? (
              <div className="mt-4 space-y-4">
                {posts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                No posts found
              </p>
            )}
          </Card>
          <Card className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Groups
            </h3>
            {groups.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {groups.map((group) => (
                  <GroupCard
                    key={group._id}
                    group={group}
                    isMember={group.members.some((m) => m._id === user?._id)}
                    hasRequested={group.joinRequests.some(
                      (r) => r._id === user?._id
                    )}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                No groups found
              </p>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

export default SearchPage;
