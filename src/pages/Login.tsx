import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TiltCard } from '@/components/3d/TiltCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden relative">
      
      {/* Back to Home */}
      <Link to="/" className="absolute top-8 left-8 z-50">
        <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </Link>

      {/* Background 3D blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-75" />
      
      <TiltCard className="w-full max-w-md p-4 relative z-10">
        <Card className="border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20 flex items-center justify-center transform rotate-3 hover:rotate-6 transition-transform">
                <span className="text-3xl font-bold text-white">S</span>
            </div>
            <CardTitle className="text-3xl font-bold text-white tracking-tight">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400 text-base">
              Sign in to continue to your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                <Input 
                    id="email" 
                    placeholder="name@example.com" 
                    type="email" 
                    required 
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300">Forgot password?</Link>
                </div>
                <Input 
                    id="password" 
                    type="password" 
                    required 
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 text-base font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 shadow-lg shadow-purple-500/25 transition-all duration-300 hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? (
                    <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Authenticating...
                    </span>
                ) : 'Sign In'}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">
                <p>Don't have an account? <Link to="/register" className="text-purple-400 cursor-pointer hover:underline font-medium">Create account</Link></p>
            </div>
          </CardContent>
        </Card>
      </TiltCard>
    </div>
  );
}
