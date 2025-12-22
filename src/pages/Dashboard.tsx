import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, FileText, Mic, CheckCircle2, Database, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    image: 0,
    voice: 0
  });
  const [dbConnected, setDbConnected] = useState(true);

  useEffect(() => {
    checkDatabase();
  }, []);

  const checkDatabase = async () => {
    try {
      // Try to fetch count to check connection
      const { count, error } = await supabase
        .from('captures')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;

      // If successful, fetch actual stats
      const { data: allCaptures } = await supabase
        .from('captures')
        .select('type');
      
      if (allCaptures) {
        setStats({
            total: allCaptures.length,
            image: allCaptures.filter(i => i.type === 'image').length,
            voice: allCaptures.filter(i => i.type === 'voice').length
        });
      }
      setDbConnected(true);
    } catch (error) {
      console.error("Database check failed:", error);
      setDbConnected(false);
    }
  };

  const statCards = [
    { title: 'Total Scans', value: stats.total.toString(), icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { title: 'Text Extracted', value: stats.image.toString(), icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { title: 'Voice Notes', value: stats.voice.toString(), icon: Mic, color: 'text-pink-400', bg: 'bg-pink-500/10' },
    { 
        title: 'System Status', 
        value: dbConnected ? 'Online' : 'Offline', 
        icon: dbConnected ? CheckCircle2 : AlertTriangle, 
        color: dbConnected ? 'text-emerald-400' : 'text-red-400', 
        bg: dbConnected ? 'bg-emerald-500/10' : 'bg-red-500/10' 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
            <p className="text-muted-foreground">Overview of your smart capture activities.</p>
        </div>
        {!dbConnected && (
            <Link to="/setup-database">
                <Button variant="destructive" className="animate-pulse">
                    <Database className="mr-2 h-4 w-4" />
                    Connect Database
                </Button>
            </Link>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-black/40 backdrop-blur-xl border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                {stat.title !== 'System Status' && (
                    <p className="text-xs text-gray-500 mt-1">
                    Lifetime captures
                    </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
                <p className="text-gray-400 mb-4">
                    Ready to capture? Select a mode below to start converting reality to digital data.
                </p>
                
                <div className="flex gap-4">
                    <Link to="/image-to-text">
                        <Button className="bg-purple-600 hover:bg-purple-500">
                            <FileText className="mr-2 h-4 w-4" /> New Image Scan
                        </Button>
                    </Link>
                    <Link to="/voice-to-text">
                        <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                            <Mic className="mr-2 h-4 w-4" /> New Voice Note
                        </Button>
                    </Link>
                </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-lg">
                <Activity className="h-8 w-8 mb-2 opacity-50" />
                <span>Check History tab for details</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
