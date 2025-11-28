import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import { format } from 'date-fns';
import { ArrowLeft, Edit, Trash, Send } from 'lucide-react';
import { toast } from 'sonner';

interface Comment {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  content: string;
  createdAt: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  featuredImage: string;
  createdAt: string;
  author: {
    _id: string;
    name: string;
  };
  category: {
    name: string;
  } | null;
  comments: Comment[];
}

const PostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const data = await postService.getPost(slug!);
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Post not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await postService.deletePost(post!._id);
      toast.success('Post deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    setSubmittingComment(true);
    try {
      await postService.addComment(post!._id, { content: commentContent });
      setCommentContent('');
      // Refresh post to get updated comments
      await fetchPost();
      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-12 text-center">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to posts
        </Button>

        <div className="aspect-video w-full overflow-hidden rounded-lg mb-8 border-2 border-border shadow-lg">
          <img
            src={post.featuredImage ? (
              post.featuredImage.startsWith('http') ? post.featuredImage : `/uploads/${post.featuredImage}`
            ) : '/placeholder.svg'}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {post.category && (
              <Badge variant="secondary">{post.category.name}</Badge>
            )}
            <span className="text-sm text-muted-foreground">
              {format(new Date(post.createdAt), 'MMMM dd, yyyy')}
            </span>
          </div>

          {user && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/edit/${post._id}`)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

        <div className="flex items-center gap-3 mb-8 pb-8 border-b">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-lg font-semibold text-primary">
              {post.author.name[0].toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium">By {post.author.name}</p>
          </div>
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Comments Section */}
        <div className="mt-12 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">Comments ({post.comments.length})</h2>

          {user ? (
            <form onSubmit={handleAddComment} className="mb-8">
              <div className="space-y-4">
                <Textarea
                  placeholder="Write a comment..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  rows={3}
                  required
                />
                <Button type="submit" disabled={submittingComment}>
                  <Send className="h-4 w-4 mr-2" />
                  {submittingComment ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-muted rounded-lg text-center">
              <p className="text-muted-foreground">Please sign in to leave a comment.</p>
            </div>
          )}

          <div className="space-y-6">
            {post.comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No comments yet. Be the first to comment!</p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment._id} className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      {comment.user?.name ? comment.user.name[0].toUpperCase() : '?'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">{comment.user?.name || 'Anonymous'}</span>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(comment.createdAt), 'MMM dd, yyyy \'at\' HH:mm')}
                      </span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostDetail;
