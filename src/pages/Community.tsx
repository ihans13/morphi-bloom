import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share2, Sparkles, Plus, Send, Play } from "lucide-react";

const Community = () => {
  const [posts] = useState([
    {
      id: 1,
      author: "Anonymous",
      content: "Anyone else experiencing irregular periods around age 40? Starting to feel anxious about what this means...",
      reactions: 12,
      comments: [
        { id: 1, author: "Sarah M.", content: "You're not alone! I went through this too.", timestamp: "1 hour ago" },
        { id: 2, author: "Anonymous", content: "Thank you for sharing, this gives me hope", timestamp: "45 min ago" }
      ],
      timestamp: "2 hours ago",
      aiResponse: {
        content: "This is very common during perimenopause, which typically begins in your 40s. Irregular periods are one of the first signs as hormone levels fluctuate. Consider tracking your symptoms and discussing with your healthcare provider.",
        resources: []
      }
    },
    {
      id: 2,
      author: "Anonymous",
      content: "Hot flashes are keeping me up at night. What strategies have worked for you?",
      reactions: 15,
      comments: [
        { id: 1, author: "Dr. Maria L.", content: "Cooling sheets and fans can help. Also consider avoiding triggers like spicy foods before bed.", timestamp: "3 hours ago" },
        { id: 2, author: "Jenny K.", content: "I started doing yoga before bed - it really helps!", timestamp: "2 hours ago" }
      ],
      timestamp: "5 hours ago",
      aiResponse: false
    },
    {
      id: 3,
      author: "Anonymous",
      content: "I've been struggling with mood swings and brain fog. Is this normal during perimenopause?",
      reactions: 23,
      comments: [
        { id: 1, author: "Dr. Emma T.", content: "These are very common symptoms due to hormonal fluctuations affecting neurotransmitters.", timestamp: "1 day ago" }
      ],
      timestamp: "1 day ago",
      aiResponse: {
        content: "Yes, mood changes and cognitive symptoms like brain fog are very common during perimenopause. The fluctuating estrogen levels affect serotonin and other neurotransmitters. Here's an excellent resource about the psychological effects:",
        resources: [
          {
            type: "youtube",
            title: "The Psychological Effects of Perimenopause & Menopause with Dr. Bev Young",
            url: "https://www.youtube.com/watch?v=dF-zsHshB0U",
            thumbnail: "https://img.youtube.com/vi/dF-zsHshB0U/maxresdefault.jpg"
          }
        ]
      }
    },
    {
      id: 4,
      author: "Anonymous",
      content: "What supplements have helped you during this transition? I'm feeling so fatigued lately.",
      reactions: 18,
      comments: [
        { id: 1, author: "Nutritionist Amy", content: "Magnesium and B-complex have helped many of my clients with energy levels.", timestamp: "6 hours ago" }
      ],
      timestamp: "8 hours ago",
      aiResponse: {
        content: "Fatigue is a common symptom. While supplements can help, it's important to consult with your healthcare provider first. Some commonly discussed options include magnesium, vitamin D, and B-complex vitamins. Consider getting blood work to check for deficiencies.",
        resources: []
      }
    },
    {
      id: 5,
      author: "Anonymous",
      content: "Started having trouble sleeping through the night. Anyone else experiencing this?",
      reactions: 31,
      comments: [
        { id: 1, author: "Sleep Coach Lisa", content: "Sleep disruption is so common! Try keeping your room cool and maintaining a consistent bedtime routine.", timestamp: "12 hours ago" },
        { id: 2, author: "Anonymous", content: "Melatonin has helped me, but definitely talk to your doctor first", timestamp: "10 hours ago" },
        { id: 3, author: "Dr. Susan R.", content: "Hormone fluctuations directly impact sleep patterns. This is very treatable!", timestamp: "8 hours ago" }
      ],
      timestamp: "14 hours ago",
      aiResponse: {
        content: "Sleep disturbances affect up to 80% of women during perimenopause. Declining estrogen and progesterone levels disrupt your natural sleep-wake cycle. Good sleep hygiene, keeping cool, and consistent routines can help significantly.",
        resources: []
      }
    }
  ]);

  const [showNewPost, setShowNewPost] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
  const [newComment, setNewComment] = useState<{[key: number]: string}>({});

  const toggleComments = (postId: number) => {
    setExpandedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleCommentChange = (postId: number, value: string) => {
    setNewComment(prev => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = (postId: number) => {
    // In a real app, this would add the comment to the database
    console.log(`Adding comment to post ${postId}: ${newComment[postId]}`);
    setNewComment(prev => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="h-screen overflow-y-auto" style={{ maxHeight: 'calc(100vh - 90px)' }}>
      <div className="max-w-md mx-auto p-4 space-y-6 bg-background pb-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">Community Q&A</h1>
        <p className="text-muted-foreground text-sm">
          Share experiences and support each other
        </p>
      </div>

      {/* New Post Button */}
      <Button 
        onClick={() => setShowNewPost(!showNewPost)}
        variant="default"
        className="w-full"
      >
        <Plus size={18} className="mr-2" />
        Ask a Question
      </Button>

      {/* New Post Form */}
      {showNewPost && (
        <Card className="p-4 space-y-4 border-accent">
          <Textarea 
            placeholder="Share your question or experience..."
            className="min-h-24"
          />
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="default"
            >
              Post
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setShowNewPost(false)}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <span className="text-sm font-medium text-foreground">{post.author}</span>
              <span className="text-xs text-muted-foreground">{post.timestamp}</span>
            </div>
            
            <p className="text-sm text-foreground leading-relaxed">{post.content}</p>
            
            {post.aiResponse && typeof post.aiResponse === 'object' && (
              <Card className="p-3 bg-accent/50 border-accent">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-primary" />
                  <span className="text-xs font-medium text-primary">Morphi</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {post.aiResponse.content}
                </p>
                
                {post.aiResponse.resources?.map((resource, idx) => (
                  <div key={idx} className="mt-3">
                    {resource.type === 'youtube' && (
                      <div className="bg-background rounded-lg border border-border overflow-hidden">
                        <div className="relative">
                          <img 
                            src={resource.thumbnail} 
                            alt={resource.title}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black/80 rounded-full p-3">
                              <Play size={20} className="text-white ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="text-xs font-medium text-foreground mb-1">{resource.title}</h4>
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline"
                          >
                            Watch on YouTube
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </Card>
            )}
            
            <div className="flex items-center gap-4 pt-2">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Heart size={16} />
                <span className="text-xs">{post.reactions}</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                onClick={() => toggleComments(post.id)}
              >
                <MessageCircle size={16} />
                <span className="text-xs">{post.comments.length}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Share2 size={16} />
              </Button>
            </div>

            {/* Comments Section */}
            {expandedPosts.includes(post.id) && (
              <div className="pt-3 border-t border-border space-y-3">
                {/* Existing Comments */}
                {post.comments.map((comment) => (
                  <div key={comment.id} className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-foreground">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                    </div>
                    <p className="text-xs text-muted-foreground pl-0">{comment.content}</p>
                  </div>
                ))}
                
                {/* Add Comment Form */}
                <div className="flex gap-2 pt-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment[post.id] || ''}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    className="text-xs h-8"
                  />
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleAddComment(post.id)}
                    disabled={!newComment[post.id]?.trim()}
                    className="px-2 h-8"
                  >
                    <Send size={14} />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Community;