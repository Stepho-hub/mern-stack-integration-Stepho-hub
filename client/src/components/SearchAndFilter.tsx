import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { categoryService } from '@/services/api';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (categoryId: string) => void;
  onSort: (sortBy: string) => void;
  currentCategory?: string;
  currentSort?: string;
}

export const SearchAndFilter = ({
  onSearch,
  onCategoryFilter,
  onSort,
  currentCategory = 'all',
  currentSort = '-createdAt'
}: SearchAndFilterProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearch('');
  };

  const getSortLabel = (sort: string) => {
    switch (sort) {
      case '-createdAt': return 'Newest First';
      case 'createdAt': return 'Oldest First';
      case '-viewCount': return 'Most Viewed';
      case 'title': return 'Title A-Z';
      default: return 'Newest First';
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
        <Button type="submit" variant="default">
          Search
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </form>

      {/* Filters */}
      {isFilterOpen && (
        <div className="flex flex-wrap gap-4 p-4 bg-card rounded-lg border">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={currentCategory} onValueChange={onCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Sort By</label>
            <Select value={currentSort} onValueChange={onSort}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-createdAt">Newest First</SelectItem>
                <SelectItem value="createdAt">Oldest First</SelectItem>
                <SelectItem value="-viewCount">Most Viewed</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {(currentCategory !== 'all' || currentSort !== '-createdAt' || searchQuery) && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{searchQuery}"
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={clearSearch}
              />
            </Badge>
          )}
          {currentCategory !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {categories.find(c => c._id === currentCategory)?.name || currentCategory}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onCategoryFilter('all')}
              />
            </Badge>
          )}
          {currentSort !== '-createdAt' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Sort: {getSortLabel(currentSort)}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onSort('-createdAt')}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};