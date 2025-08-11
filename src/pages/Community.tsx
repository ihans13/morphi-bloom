import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageCircle, Share2, Sparkles, Plus } from "lucide-react";

const Community = () => {
  const [posts] = useState([
    {
      id: 1,
      author: "Anonymous",
      content: "Anyone else experiencing irregular periods around age 40? Starting to feel anxious about what this means...",
      reactions: 12,
      comments: 8,
      timestamp: "2 hours ago",
      aiResponse: true
    },
    {
      id: 2,
      author: "Anonymous",
      content: "Hot flashes are keeping me up at night. What strategies have worked for you?",
      reactions: 15,
      comments: 12,
      timestamp: "5 hours ago",
      aiResponse: false
    }
  ]);

  const [showNewPost, setShowNewPost] = useState(false);

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
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
        className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-200"
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
              className="bg-gradient-primary hover:shadow-glow transition-all duration-200"
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
            
            {post.aiResponse && (
              <Card className="p-3 bg-accent/50 border-accent">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={16} className="text-primary" />
                  <span className="text-xs font-medium text-primary">Morphi</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is common during perimenopause. Here are some helpful resources...
                </p>
              </Card>
            )}
            
            <div className="flex items-center gap-4 pt-2">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Heart size={16} />
                <span className="text-xs">{post.reactions}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <MessageCircle size={16} />
                <span className="text-xs">{post.comments}</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Share2 size={16} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Community;