import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import ImageToText from './pages/ImageToText';
import VoiceToText from './pages/VoiceToText';
import History from './pages/History';
import { Sidebar } from './components/layout/Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  // Public pages do not have the sidebar layout
  const isPublicPage = ['/', '/login', '/register', '/forgot-password'].includes(location.pathname);

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans selection:bg-purple-500/30">
      {/* Global Background Gradients for Dashboard Area */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px]" />
      </div>

      <Sidebar />
      <main className="flex-1 overflow-y-auto relative z-10">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/image-to-text" element={<ImageToText />} />
          <Route path="/voice-to-text" element={<VoiceToText />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
      <Toaster theme="dark" position="top-right" />
    </Router>
  );
}

export default App;
