import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TiltCard } from '@/components/3d/TiltCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate registration
    setTimeout(() => {
      setLoading(false);
      toast.success("Account created successfully!");
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
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse delay-75" />
      
      <TiltCard className="w-full max-w-md p-4 relative z-10">
        <Card className="border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20 flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform">
                <span className="text-3xl font-bold text-white">S</span>
            </div>
            <CardTitle className="text-3xl font-bold text-white tracking-tight">Create Account</CardTitle>
            <CardDescription className="text-gray-400 text-base">
              Join SmartCapture to start digitizing your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                <Input 
                    id="name" 
                    placeholder="John Doe" 
                    type="text" 
                    required 
                    className="h-11 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all"
                />
              </div>
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
                <Label htmlFor="password" className="text-gray-300">Password</Label>
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
                        Creating Account...
                    </span>
                ) : 'Sign Up'}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-500">
                <p>Already have an account? <Link to="/login" className="text-purple-400 cursor-pointer hover:underline font-medium">Sign in</Link></p>
            </div>
          </CardContent>
        </Card>
      </TiltCard>
    </div>
  );
}
