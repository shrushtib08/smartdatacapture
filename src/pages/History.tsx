import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { FileText, Mic, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface HistoryItem {
    id: number;
    type: 'image' | 'voice';
    content: string;
    date: string;
    preview?: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('captureHistory');
    if (saved) {
        setHistory(JSON.parse(saved));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('captureHistory');
    setHistory([]);
    toast.success("History cleared");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold text-white">History</h2>
            <p className="text-gray-400">Your recent captures and transcriptions.</p>
        </div>
        <Button variant="destructive" onClick={clearHistory} disabled={history.length === 0}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid gap-4">
            {history.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                    No history found. Start capturing!
                </div>
            ) : (
                history.map((item) => (
                    <Card key={item.id} className="bg-black/40 backdrop-blur-xl border-white/10 hover:bg-white/5 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${item.type === 'image' ? 'bg-purple-500/20 text-purple-400' : 'bg-pink-500/20 text-pink-400'}`}>
                                    {item.type === 'image' ? <FileText className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                </div>
                                <Badge variant="outline" className="border-white/10 text-gray-400">
                                    {item.type === 'image' ? 'OCR Scan' : 'Voice Note'}
                                </Badge>
                            </div>
                            <div className="flex items-center text-xs text-gray-500">
                                <Calendar className="mr-1 h-3 w-3" />
                                {new Date(item.date).toLocaleDateString()} • {new Date(item.date).toLocaleTimeString()}
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="flex gap-4">
                                {item.preview && (
                                    <img src={item.preview} alt="Thumb" className="h-16 w-16 object-cover rounded-md border border-white/10" />
                                )}
                                <p className="text-sm text-gray-300 line-clamp-2 flex-1">
                                    {item.content}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
      </ScrollArea>
    </div>
  );
}
