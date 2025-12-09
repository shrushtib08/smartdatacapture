import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ScanLine, Mic, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TiltCard } from '@/components/3d/TiltCard';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              SmartCapture
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/5">
                Sign In
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 shadow-lg shadow-purple-500/25">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Next Gen AI OCR & Voice Recognition
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Reality</span> into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Digital Data</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-xl">
              Instantly convert images and voice notes into editable text. Export to PDF, Excel, or Word with a single click. Professional, secure, and fast.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/login">
                <Button size="lg" className="h-14 px-8 text-lg bg-white text-black hover:bg-gray-200 transition-all rounded-full">
                  Start Capturing <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="#features">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/10 rounded-full bg-transparent backdrop-blur-sm">
                  View Features
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block perspective-1000"
          >
            <TiltCard className="w-full">
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
                {/* Mock UI Elements */}
                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="h-2 w-20 bg-white/10 rounded-full" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-1/2 h-32 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <ScanLine className="h-8 w-8 text-purple-400" />
                    </div>
                    <div className="w-1/2 space-y-2">
                      <div className="h-2 w-full bg-white/10 rounded animate-pulse" />
                      <div className="h-2 w-3/4 bg-white/10 rounded animate-pulse delay-75" />
                      <div className="h-2 w-full bg-white/10 rounded animate-pulse delay-150" />
                      <div className="h-2 w-5/6 bg-white/10 rounded animate-pulse delay-200" />
                    </div>
                  </div>
                  
                  <div className="h-24 rounded-lg bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/5 p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Mic className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-end gap-1 h-8">
                            {[1,2,3,4,5,6,7,8].map((i) => (
                                <div key={i} className="w-1 bg-blue-500/50 rounded-full" style={{ height: `${Math.random() * 100}%` }} />
                            ))}
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400">Everything you need to digitize your workflow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart OCR",
                desc: "Extract text from any image with high accuracy using advanced optical character recognition.",
                icon: ScanLine,
                color: "text-purple-400",
                gradient: "from-purple-500/20 to-transparent"
              },
              {
                title: "Voice Transcription",
                desc: "Real-time speech-to-text conversion with support for continuous dictation.",
                icon: Mic,
                color: "text-pink-400",
                gradient: "from-pink-500/20 to-transparent"
              },
              {
                title: "Multi-Format Export",
                desc: "Download your data in PDF, Excel, or Word formats instantly.",
                icon: FileText,
                color: "text-blue-400",
                gradient: "from-blue-500/20 to-transparent"
              }
            ].map((feature, i) => (
              <TiltCard key={i} className="h-full">
                <div className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors relative overflow-hidden group">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-6`} />
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-purple-500 to-pink-500" />
            <span className="font-bold text-lg">SmartCapture</span>
          </div>
          <div className="text-gray-500 text-sm">
            © 2025 SmartCapture. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
