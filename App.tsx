
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import AdminToolbar from './components/AdminToolbar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Weddings from './pages/Weddings';
import GalleryPage from './pages/Gallery';
import Flavors from './pages/Flavors';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/weddings" element={<Weddings />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/flavors" element={<Flavors />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </main>
      <Footer />
      <AdminToolbar />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ContentProvider>
      <HashRouter>
        <ScrollToTop />
        <AppRoutes />
      </HashRouter>
    </ContentProvider>
  );
};

export default App;
