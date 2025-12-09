import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, FileText, Mic, Database } from 'lucide-react';

const stats = [
  { title: 'Total Scans', value: '1,234', icon: Activity, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { title: 'Text Extracted', value: '856', icon: FileText, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { title: 'Voice Notes', value: '342', icon: Mic, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { title: 'Storage Used', value: '2.4 GB', icon: Database, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your smart capture activities.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
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
                <p className="text-xs text-gray-500 mt-1">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-lg">
                Activity Chart Placeholder
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                    <FileText className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                    <h4 className="text-sm font-medium text-white">New Image Scan</h4>
                    <p className="text-xs text-gray-400">Extract text from image</p>
                </div>
            </div>
            <div className="flex items-center p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer transition-colors">
                <div className="h-10 w-10 rounded-full bg-pink-500/20 flex items-center justify-center mr-4">
                    <Mic className="h-5 w-5 text-pink-400" />
                </div>
                <div>
                    <h4 className="text-sm font-medium text-white">Record Voice</h4>
                    <p className="text-xs text-gray-400">Convert speech to text</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
