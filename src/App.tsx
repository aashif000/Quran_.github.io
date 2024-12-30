import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QuranLayout } from "@/components/layout/QuranLayout";
import { CompleteQuran } from "@/components/quran/CompleteQuran";
import { JuzView } from "@/components/quran/JuzView";
import { RukuView } from "@/components/quran/RukuView";
import { PageView } from "@/components/quran/PageView";
import { HizbView } from "@/components/quran/HizbView";
import { SearchView } from "@/components/quran/SearchView";
import { AyahView } from "@/components/quran/AyahView";
import { ManzilView } from "@/components/quran/ManzilView";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <QuranLayout>
            <Routes>
              <Route path="/" element={<CompleteQuran />} />
              <Route path="/quran" element={<CompleteQuran />} />
              <Route path="/juz" element={<JuzView />} />
              <Route path="/ruku" element={<RukuView />} />
              <Route path="/page" element={<PageView />} />
              <Route path="/hizb" element={<HizbView />} />
              <Route path="/search" element={<SearchView />} />
              <Route path="/ayah" element={<AyahView />} />
              <Route path="/manzil" element={<ManzilView />} />
            </Routes>
          </QuranLayout>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;