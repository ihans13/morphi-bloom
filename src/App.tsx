import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import Index from "./pages/Index";
import Chat from "./pages/Chat";
import ChatTranscript from "./pages/ChatTranscript";
import ChatHistory from "./pages/ChatHistory";

import Community from "./pages/Community";
import Resources from "./pages/Resources";
import Track from "./pages/Track";
import SavedArticles from "./pages/SavedArticles";
import Supplements from "./pages/Supplements";
import QnAPosts from "./pages/QnAPosts";
import TriedTested from "./pages/TriedTested";
import SignsSymptoms from "./pages/SignsSymptoms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isChatPage = location.pathname === '/chat' || location.pathname.startsWith('/chat/');
  const isHomePage = location.pathname === '/';

  return (
    <div className={
      isChatPage 
        ? "h-screen bg-background overflow-hidden" 
        : isHomePage 
          ? "h-screen bg-background overflow-hidden"
          : "h-screen bg-background pb-28 overflow-hidden"
    }>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/history" element={<ChatHistory />} />
        <Route path="/chat/transcript/:chatId" element={<ChatTranscript />} />
        <Route path="/track" element={<Track />} />
        <Route path="/community" element={<Community />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/articles" element={<SavedArticles />} />
        <Route path="/resources/supplements" element={<Supplements />} />
        <Route path="/resources/qna" element={<QnAPosts />} />
        <Route path="/resources/tried" element={<TriedTested />} />
        <Route path="/signs-symptoms" element={<SignsSymptoms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNavigation />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
