import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { Search } from 'lucide-react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        id="search"
        placeholder="Search posts, users, or groups..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
      />
      <Button type="primary" className="flex items-center gap-1">
        <Search size={16} />
        Search
      </Button>
    </form>
  );
}

export default SearchBar;
