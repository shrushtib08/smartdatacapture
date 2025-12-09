import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Download, FileAudio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { exportToExcel, exportToPDF, exportToWord } from '@/lib/export-utils';

// Type definition for Web Speech API
interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    onend: () => void;
}

declare global {
    interface Window {
        webkitSpeechRecognition: any;
        SpeechRecognition: any;
    }
}

export default function VoiceToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript) {
                setText(prev => prev + ' ' + finalTranscript);
            }
        };

        recognition.onerror = (event: any) => {
            console.error(event.error);
            toast.error("Microphone error occurred.");
            setIsRecording(false);
        };

        recognition.onend = () => {
            setIsRecording(false);
        };

        recognitionRef.current = recognition;
    } else {
        toast.error("Browser does not support Speech Recognition.");
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
        recognitionRef.current?.stop();
        // Save to history
        if (text) {
             const history = JSON.parse(localStorage.getItem('captureHistory') || '[]');
             history.unshift({
                id: Date.now(),
                type: 'voice',
                content: text,
                date: new Date().toISOString()
             });
             localStorage.setItem('captureHistory', JSON.stringify(history));
        }
    } else {
        recognitionRef.current?.start();
        setIsRecording(true);
    }
  };

  const handleExport = (type: 'pdf' | 'excel' | 'word') => {
    if (!text) {
        toast.error("No text to export");
        return;
    }
    const filename = `voice-note-${Date.now()}`;
    if (type === 'pdf') exportToPDF(text, filename);
    if (type === 'excel') exportToExcel(text, filename);
    if (type === 'word') exportToWord(text, filename);
    toast.success(`Exported to ${type.toUpperCase()}`);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col gap-6">
      <Card className="bg-black/40 backdrop-blur-xl border-white/10 flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-4">
                <Button
                    size="icon"
                    onClick={toggleRecording}
                    className={`rounded-full h-12 w-12 transition-all duration-300 ${isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-purple-600 hover:bg-purple-500'}`}
                >
                    {isRecording ? <Square className="h-5 w-5 fill-current" /> : <Mic className="h-6 w-6" />}
                </Button>
                <div>
                    <h3 className="font-semibold text-white">
                        {isRecording ? 'Listening...' : 'Click to Record'}
                    </h3>
                    <p className="text-xs text-gray-400">English (US)</p>
                </div>
            </div>
            
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-white/10 text-gray-300 hover:bg-white/10 hover:text-white">
                        <Download className="mr-2 h-4 w-4" />
                        Export Note
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10 text-gray-300">
                    <DropdownMenuItem onClick={() => handleExport('pdf')} className="hover:bg-white/10 cursor-pointer">As PDF</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('excel')} className="hover:bg-white/10 cursor-pointer">As Excel</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('word')} className="hover:bg-white/10 cursor-pointer">As Word</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <CardContent className="flex-1 p-0 relative">
            <Textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start recording or type here..."
                className="h-full w-full resize-none border-0 bg-transparent p-8 text-gray-300 focus-visible:ring-0 text-xl leading-relaxed"
            />
            
            {/* Visualizer Effect (CSS only) */}
            {isRecording && (
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none flex items-end justify-center gap-1 pb-8">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-2 bg-purple-500 rounded-full"
                            animate={{
                                height: [10, Math.random() * 60 + 20, 10],
                            }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.05,
                            }}
                        />
                    ))}
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
