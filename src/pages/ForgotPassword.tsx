import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TiltCard } from '@/components/3d/TiltCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (error) throw error;

      setSubmitted(true);
      toast.success("Reset link sent to your email");
    } catch (error: any) {
      console.error('Reset Error:', error);
      toast.error(error.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden relative">
      
      {/* Back to Login */}
      <Link to="/login" className="absolute top-8 left-8 z-50">
        <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
        </Button>
      </Link>

      {/* Background 3D blobs */}
      <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" />
      
      <TiltCard className="w-full max-w-md p-4 relative z-10">
        <Card className="border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-6 h-14 w-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-purple-400" />
            </div>
            <CardTitle className="text-2xl font-bold text-white tracking-tight">Reset Password</CardTitle>
            <CardDescription className="text-gray-400 text-base">
              Enter your email to receive a reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!submitted ? (
                <form onSubmit={handleReset} className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <Input 
                        id="email" 
                        placeholder="name@example.com" 
                        type="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                            Sending Link...
                        </span>
                    ) : 'Send Reset Link'}
                </Button>
                </form>
            ) : (
                <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                        We have sent a password reset link to your email address. Please check your inbox.
                    </div>
                    <Button 
                        onClick={() => navigate('/login')}
                        variant="outline"
                        className="w-full h-11 border-white/10 text-white hover:bg-white/5"
                    >
                        Return to Sign In
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>
      </TiltCard>
    </div>
  );
}
