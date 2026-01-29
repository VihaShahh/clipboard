import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ClipboardHub from './components/ClipboardHub';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { ThemeProvider } from './components/provider/ThemeProvider';

import InfoModal from '../src/components/InfoModal';

import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col bg-[#f6f3eb] dark:bg-slate-950">
          
          <Header />

          <main className="flex-1 container mx-auto px-4 py-10 space-y-10">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="space-y-12">

                    {/* HOW TO USE BUTTON — MOVED TO TOP */}
                    <div className="flex justify-end">
                    <button
  onClick={() => setInfoOpen(true)}
  className="px-5 py-2.5 rounded-xl font-medium shadow-md transition-all 
             bg-[#2375e0] hover:bg-[rgb(69,128,199)] text-white"
>
  💡 How to Use?
</button>


                    </div>

                    {/* MODAL */}
                    <InfoModal open={infoOpen} onClose={() => setInfoOpen(false)} />

                    {/* MAIN FEATURE */}
                    <ClipboardHub />

                  </div>
                }
              />
            </Routes>
          </main>

          <Footer />
          <SpeedInsights />
          <Analytics />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
