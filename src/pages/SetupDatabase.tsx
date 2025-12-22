import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy, Database, ExternalLink, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function SetupDatabase() {
  const [copied, setCopied] = useState(false);

  const sqlCode = `-- 1. Create profiles table (Users)
create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create captures table (History)
create table if not exists public.captures (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  type text check (type in ('image', 'voice')),
  content text,
  preview_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (Security)
alter table public.profiles enable row level security;
alter table public.captures enable row level security;

-- 4. Create Security Policies
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can view own captures" on public.captures for select using (auth.uid() = user_id);
create policy "Users can insert own captures" on public.captures for insert with check (auth.uid() = user_id);
create policy "Users can delete own captures" on public.captures for delete using (auth.uid() = user_id);`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(sqlCode);
    } catch (err) {
      // Fallback for restricted environments (iframe/WebContainer)
      const textArea = document.createElement("textarea");
      textArea.value = sqlCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
    setCopied(true);
    toast.success("SQL code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold text-white">Database Setup</h2>
          <p className="text-gray-400">Follow these steps to activate your SQL database.</p>
        </div>
      </div>

      {/* Error Explanation Banner */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex gap-3 items-start">
        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
        <div>
            <h3 className="font-bold text-red-400">Did you see a "Cannot POST" error?</h3>
            <p className="text-sm text-red-300/80 mt-1">
                If you saw <code>Cannot POST /v1/projects//database/query</code>, it means <strong>Supabase is not connected</strong>. 
                The system cannot run migrations because the Project ID is missing (the <code>//</code> part).
                <br /><br />
                <strong>Solution:</strong> Complete Step 1 below.
            </p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Step 1 */}
        <Card className="bg-black/40 backdrop-blur-xl border-white/10 border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-sm border border-purple-500/50">1</span>
              Connect Supabase (Required)
            </CardTitle>
            <CardDescription className="text-base">
              Click the <strong>"Connect Supabase"</strong> button in the top right corner of the Dualite editor.
              <br />
              <span className="text-purple-400 text-xs uppercase font-bold tracking-wider">This fixes the "Cannot POST" error</span>
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Step 2 */}
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-sm border border-blue-500/50">2</span>
              Run SQL Schema
            </CardTitle>
            <CardDescription>
              Copy the code below and run it in your Supabase SQL Editor.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative rounded-lg bg-black/50 border border-white/10 p-4 font-mono text-sm text-gray-300 overflow-x-auto">
              <Button
                size="sm"
                variant="secondary"
                className="absolute top-2 right-2 h-8"
                onClick={copyToClipboard}
              >
                {copied ? <Check className="mr-2 h-3 w-3" /> : <Copy className="mr-2 h-3 w-3" />}
                {copied ? 'Copied' : 'Copy SQL'}
              </Button>
              <pre className="whitespace-pre-wrap">{sqlCode}</pre>
            </div>
            
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="w-full border-white/10 hover:bg-white/5 text-white"
                onClick={() => window.open('https://supabase.com/dashboard/project/_/sql', '_blank')}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Supabase SQL Editor
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="bg-black/40 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-sm border border-emerald-500/50">3</span>
              Verify
            </CardTitle>
            <CardDescription>
              Once the SQL is run, refresh this page. The dashboard status should turn green.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
