import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import ChatTranscript from "./pages/ChatTranscript";
import Logging from "./pages/Logging";
import Community from "./pages/Community";
import Resources from "./pages/Resources";
import SavedArticles from "./pages/SavedArticles";
import Supplements from "./pages/Supplements";
import QnAPosts from "./pages/QnAPosts";
import TriedTested from "./pages/TriedTested";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background pb-20">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/transcript/:chatId" element={<ChatTranscript />} />
            <Route path="/logging" element={<Logging />} />
            <Route path="/community" element={<Community />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/articles" element={<SavedArticles />} />
            <Route path="/resources/supplements" element={<Supplements />} />
            <Route path="/resources/qna" element={<QnAPosts />} />
            <Route path="/resources/tried" element={<TriedTested />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNavigation />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
