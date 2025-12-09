import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { motion } from 'framer-motion';
import { Upload, FileText, Download, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { exportToExcel, exportToPDF, exportToWord } from '@/lib/export-utils';

export default function ImageToText() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setText('');
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async () => {
    if (!image) return;
    setLoading(true);
    setProgress(0);

    try {
      const result = await Tesseract.recognize(image, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.floor(m.progress * 100));
          }
        },
      });
      setText(result.data.text);
      
      // Save to history (mock)
      const history = JSON.parse(localStorage.getItem('captureHistory') || '[]');
      history.unshift({
        id: Date.now(),
        type: 'image',
        preview: image,
        content: result.data.text,
        date: new Date().toISOString()
      });
      localStorage.setItem('captureHistory', JSON.stringify(history));
      
      toast.success('Text extracted successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to extract text.');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (type: 'pdf' | 'excel' | 'word') => {
    if (!text) {
        toast.error("No text to export");
        return;
    }
    const filename = `scan-${Date.now()}`;
    if (type === 'pdf') exportToPDF(text, filename);
    if (type === 'excel') exportToExcel(text, filename);
    if (type === 'word') exportToWord(text, filename);
    toast.success(`Exported to ${type.toUpperCase()}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
      {/* Input Section */}
      <Card className="bg-black/40 backdrop-blur-xl border-white/10 flex flex-col overflow-hidden">
        <CardContent className="flex-1 p-6 flex flex-col items-center justify-center border-2 border-dashed border-white/10 m-4 rounded-xl bg-white/5 relative">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
          
          {image ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <img src={image} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg shadow-lg" />
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute top-2 right-2 rounded-full"
                onClick={() => { setImage(null); setText(''); }}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto">
                <Upload className="h-10 w-10 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Upload an Image</h3>
                <p className="text-sm text-gray-400">Drag and drop or click to browse</p>
              </div>
              <Button onClick={() => fileInputRef.current?.click()} className="bg-purple-600 hover:bg-purple-500">
                Select File
              </Button>
            </div>
          )}
        </CardContent>
        <div className="p-4 border-t border-white/10 bg-white/5">
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white" 
            onClick={processImage}
            disabled={!image || loading}
          >
            {loading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing ({progress}%)
                </>
            ) : (
                <>
                    <FileText className="mr-2 h-4 w-4" />
                    Extract Text
                </>
            )}
          </Button>
        </div>
      </Card>

      {/* Output Section */}
      <Card className="bg-black/40 backdrop-blur-xl border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-semibold text-white flex items-center">
                <FileText className="mr-2 h-4 w-4 text-purple-400" />
                Extracted Content
            </h3>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="border-white/10 text-gray-300 hover:bg-white/10 hover:text-white">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-white/10 text-gray-300">
                    <DropdownMenuItem onClick={() => handleExport('pdf')} className="hover:bg-white/10 cursor-pointer">As PDF</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('excel')} className="hover:bg-white/10 cursor-pointer">As Excel</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleExport('word')} className="hover:bg-white/10 cursor-pointer">As Word</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <CardContent className="flex-1 p-0">
            <Textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Extracted text will appear here..."
                className="h-full min-h-[400px] resize-none border-0 bg-transparent p-6 text-gray-300 focus-visible:ring-0 text-lg leading-relaxed"
            />
        </CardContent>
      </Card>
    </div>
  );
}
