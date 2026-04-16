import { motion } from 'motion/react';
import { MessageSquare, Search, Filter, Plus, Clock, CheckCircle2, User, Send, BrainCircuit } from 'lucide-react';
import { doubts, mockUser } from '../../data/mockData';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';
import { cn } from '../../utils/cn';

export const StudentDoubts = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 italic">Doubt Resolution</h1>
          <p className="text-slate-500 font-medium italic">Ask questions and get verified answers from our top educators.</p>
        </div>
        <Button className="gap-2 font-bold rounded-xl italic h-12 px-6">
          <Plus size={18} /> Raise a Doubt
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Filters</h3>
            <div className="space-y-2">
              {['All Doubts', 'Mathematics', 'Science', 'English', 'History'].map((filter) => (
                <button
                  key={filter}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-sm font-bold italic transition-all",
                    filter === 'All Doubts' ? "bg-primary/10 text-primary" : "text-slate-500 hover:bg-slate-100"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <Card className="bg-primary/5 border-primary/10" title="Quick AI Help">
            <p className="text-xs text-slate-600 italic font-medium mb-4">Try our AI Tutor for instant explanations to conceptual questions.</p>
            <Button variant="outline" className="w-full gap-2 text-[10px] uppercase font-black tracking-widest h-10 border-primary/20 text-primary">
              <BrainCircuit size={14} /> Open AI Tutor
            </Button>
          </Card>
        </aside>

        {/* Doubt List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search your previous doubts..." 
              className="w-full bg-white border border-slate-200 pl-12 pr-4 py-4 rounded-2xl text-sm font-bold italic focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>

          <div className="space-y-6">
            {doubts.map((doubt) => (
              <Card key={doubt.id} className="p-0 overflow-hidden">
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant={doubt.status === 'resolved' ? 'success' : 'warning'}>
                      {doubt.status.toUpperCase()}
                    </Badge>
                    <span className="text-[10px] font-bold text-slate-400 italic flex items-center gap-1">
                      <Clock size={10} /> {doubt.createdAt}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <Badge variant="outline" className="italic h-fit">{doubt.subject}</Badge>
                    <p className="text-sm font-black text-slate-800 italic leading-relaxed">
                      "{doubt.question}"
                    </p>
                  </div>
                </div>

                {doubt.replies && doubt.replies.length > 0 && (
                  <div className="bg-slate-50 p-6 border-t border-slate-100">
                    <div className="space-y-4">
                      {doubt.replies.map(reply => (
                        <div key={reply.id} className="flex gap-4">
                          <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.authorName}`} 
                            className="w-8 h-8 rounded-lg bg-white border border-slate-200"
                            alt="avatar"
                          />
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black text-slate-900 italic">{reply.authorName}</span>
                              <Badge className="text-[8px] px-1 py-0 h-fit">EDUCATOR</Badge>
                            </div>
                            <p className="text-xs text-slate-600 italic font-medium font-serif leading-relaxed">
                              {reply.text}
                            </p>
                            <p className="text-[8px] font-bold text-slate-400 italic mt-2">{reply.createdAt}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4 bg-white border-t border-slate-50 flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Reply or add more context..." 
                    className="flex-1 bg-slate-50 border-none px-4 py-2 rounded-xl text-xs font-bold italic outline-none"
                  />
                  <Button variant="primary" className="p-2 h-10 w-10 text-white rounded-xl">
                    <Send size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
