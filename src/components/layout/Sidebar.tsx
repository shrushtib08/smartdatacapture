import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Image as ImageIcon, Mic, History, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

// Defined distinct colors for each menu item as requested
const menuItems = [
  { 
    icon: LayoutDashboard, 
    label: 'Dashboard', 
    path: '/dashboard',
    activeColor: 'text-cyan-400',
    activeBg: 'bg-cyan-500/10 border-cyan-500/30',
    hoverColor: 'hover:text-cyan-300 hover:bg-cyan-500/5',
    iconColor: 'text-cyan-500' 
  },
  { 
    icon: ImageIcon, 
    label: 'Image to Text', 
    path: '/image-to-text',
    activeColor: 'text-purple-400',
    activeBg: 'bg-purple-500/10 border-purple-500/30',
    hoverColor: 'hover:text-purple-300 hover:bg-purple-500/5',
    iconColor: 'text-purple-500'
  },
  { 
    icon: Mic, 
    label: 'Voice to Text', 
    path: '/voice-to-text',
    activeColor: 'text-pink-400',
    activeBg: 'bg-pink-500/10 border-pink-500/30',
    hoverColor: 'hover:text-pink-300 hover:bg-pink-500/5',
    iconColor: 'text-pink-500'
  },
  { 
    icon: History, 
    label: 'History', 
    path: '/history',
    activeColor: 'text-emerald-400',
    activeBg: 'bg-emerald-500/10 border-emerald-500/30',
    hoverColor: 'hover:text-emerald-300 hover:bg-emerald-500/5',
    iconColor: 'text-emerald-500'
  },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate('/login');
  };

  return (
    <div className="flex h-full w-64 flex-col bg-black/40 backdrop-blur-xl border-r border-white/10 shadow-2xl relative z-20">
      <div className="flex h-16 items-center px-6 border-b border-white/10 bg-white/5">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mr-3 shadow-lg shadow-purple-500/20" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          SmartCapture
        </span>
      </div>
      
      <div className="flex-1 py-6 px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-base font-medium transition-all duration-300 mb-1",
                  isActive 
                    ? cn(item.activeBg, item.activeColor, "border shadow-[0_0_15px_-3px_rgba(0,0,0,0.1)]") 
                    : cn("text-gray-400", item.hoverColor)
                )}
              >
                <Icon className={cn("mr-3 h-5 w-5 transition-colors", isActive ? "fill-current opacity-100" : item.iconColor)} />
                <span className={cn(isActive ? "font-bold" : "")}>{item.label}</span>
                
                {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                )}
              </Button>
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-white/10 bg-white/5">
        <Button 
            variant="ghost" 
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10 group"
            onClick={handleLogout}
        >
            <LogOut className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Logout
        </Button>
      </div>
    </div>
  );
}
