import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { postService } from '@/services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { SearchAndFilter } from '@/components/SearchAndFilter';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Sparkles, BookOpen, PenTool } from 'lucide-react';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  createdAt: string;
  author: {
    name: string;
  };
  category: {
    name: string;
  } | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('-createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [searchQuery, selectedCategory, sortBy, currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postService.getAllPosts(currentPage, 9, selectedCategory, searchQuery, sortBy);

      if (data.posts) {
        setPosts(data.posts);
        setTotalPages(data.totalPages || 1);
        setTotalPosts(data.total || 0);
      } else {
        // Fallback for old API format
        setPosts(data || []);
        setTotalPages(1);
        setTotalPosts(data?.length || 0);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSort = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12 relative">
        {/* Hero Section with Animations */}
        <div className="mb-12 text-center relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-400/10 rounded-full animate-float delay-100"></div>
            <div className="absolute top-20 right-20 w-16 h-16 bg-purple-400/10 rounded-full animate-float delay-300"></div>
            <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-pink-400/10 rounded-full animate-float delay-500"></div>
            <div className="absolute bottom-20 right-1/3 w-14 h-14 bg-teal-400/10 rounded-full animate-float delay-700"></div>

            {/* Floating Icons */}
            <BookOpen className="absolute top-16 left-20 w-8 h-8 text-emerald-400/30 animate-bounce-gentle delay-200" />
            <PenTool className="absolute top-32 right-32 w-6 h-6 text-purple-400/30 animate-bounce-gentle delay-400" />
            <Sparkles className="absolute bottom-24 left-16 w-7 h-7 text-pink-400/30 animate-bounce-gentle delay-600" />

            {/* Gradient Orbs */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/15 via-purple-400/10 to-pink-400/15 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-400/8 via-purple-400/5 to-emerald-400/8 rounded-full animate-pulse delay-1500"></div>
          </div>

          {/* Animated Title */}
          <div className="relative">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-text">
              <span className="inline-block animate-slide-in-left">Blog</span>{' '}
              <span className="inline-block animate-slide-in-right delay-200">Posts</span>
            </h1>

            {/* Animated Underline */}
            <div className="mx-auto w-24 h-1 bg-gradient-to-r from-emerald-400 via-purple-400 to-pink-400 rounded-full animate-scale-in delay-500"></div>
          </div>

          {/* Animated Subtitle */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mt-6 animate-fade-in-up delay-700">
            <span className="inline-block animate-slide-in-left delay-800">Explore</span>{' '}
            <span className="inline-block animate-slide-in-right delay-900">our</span>{' '}
            <span className="inline-block animate-slide-in-left delay-1000">latest</span>{' '}
            <span className="inline-block animate-slide-in-right delay-1100">articles</span>{' '}
            <span className="inline-block animate-slide-in-left delay-1200">and</span>{' '}
            <span className="inline-block animate-slide-in-right delay-1300">insights</span>
          </p>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-1/4 w-2 h-2 bg-emerald-400/40 rounded-full animate-ping delay-1000"></div>
            <div className="absolute top-32 right-1/4 w-1 h-1 bg-purple-400/50 rounded-full animate-ping delay-1200"></div>
            <div className="absolute bottom-16 left-1/3 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-ping delay-1400"></div>
            <div className="absolute bottom-24 right-1/5 w-1 h-1 bg-teal-400/45 rounded-full animate-ping delay-1600"></div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <SearchAndFilter
            onSearch={handleSearch}
            onCategoryFilter={handleCategoryFilter}
            onSort={handleSort}
            currentCategory={selectedCategory}
            currentSort={sortBy}
          />
        </div>

        {/* Results Summary */}
        {!loading && (
          <div className="mb-6 text-sm text-muted-foreground">
            {totalPosts > 0 ? (
              <>
                Showing {posts.length} of {totalPosts} posts
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== 'all' && ' in selected category'}
              </>
            ) : (
              'No posts found'
            )}
          </div>
        )}

        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            {searchQuery || selectedCategory !== 'all' ? 'No posts match your search criteria.' : 'No posts yet. Be the first to create one!'}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {posts.map((post) => (
                <Link key={post._id} to={`/post/${post.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg border-b border-border">
                      <img
                        src={post.featuredImage ? (
                          post.featuredImage.startsWith('http') ? post.featuredImage : `/uploads/${post.featuredImage}`
                        ) : '/placeholder.svg'}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {post.category && (
                          <Badge variant="secondary">{post.category.name}</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(post.createdAt), 'MMM dd, yyyy')}
                        </span>
                      </div>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                      <p className="text-sm text-muted-foreground mt-4">
                        By {post.author.name}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                    if (pageNum > totalPages) return null;

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Blog;