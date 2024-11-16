import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoutes } from './routes';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useAuth } from './stores/auth';
import { Toaster } from 'react-hot-toast';
import { initGA, trackPageView } from './lib/analytics';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Initialize Google Analytics
    initGA();
  }, []);

  useEffect(() => {
    // Track page views
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    // Track initial page view
    handleRouteChange(window.location.pathname);

    // Listen for route changes
    const observer = new MutationObserver(() => {
      handleRouteChange(window.location.pathname);
    });

    observer.observe(document.querySelector('#root')!, {
      childList: true,
      subtree: true
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] font-source-code flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
      <Footer />
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e1e2d',
            color: '#fff',
            border: '1px solid rgba(0, 243, 255, 0.1)'
          }
        }}
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;