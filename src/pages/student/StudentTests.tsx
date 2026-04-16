import { motion } from 'motion/react';
import { ClipboardList, Clock, Calendar, CheckCircle2, ChevronRight, Play, Trophy, BrainCircuit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tests, results } from '../../data/mockData';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { cn } from '../../utils/cn';

export const StudentTests = () => {
  const upcomingTests = tests.filter(t => t.status === 'upcoming');
  const completedTests = tests.filter(t => t.status === 'completed');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 italic">Tests & Assessments</h1>
          <p className="text-slate-500 font-medium italic">Monitor your practice tests and academic evaluations.</p>
        </div>
        <div className="flex gap-4">
           <Card className="p-3 bg-primary/5 border-primary/10 flex items-center gap-4">
              <div className="p-2 bg-primary text-white rounded-lg"><Trophy size={20} /></div>
              <div>
                <p className="text-xs font-black italic text-slate-400 uppercase leading-none mb-1">Total Score</p>
                <p className="text-lg font-black text-slate-900 leading-none">84.5%</p>
              </div>
           </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Upcoming Tests */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black text-slate-900 italic uppercase tracking-widest flex items-center gap-2">
                <div className="w-1 h-4 bg-primary rounded-full" /> Upcoming Assessments
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingTests.map((test) => (
                <Card key={test.id} className="group hover:border-primary/20 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="outline" className="italic">{test.subject}</Badge>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-400 italic">
                      <Clock size={12} />
                      <span>{test.duration}m</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-black text-slate-900 italic mb-2 group-hover:text-primary transition-colors">{test.title}</h3>
                  
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-400 italic mb-6">
                    <Calendar size={14} />
                    <span>Scheduled for {test.date}</span>
                  </div>

                  <Link to={`/student/tests/${test.id}`}>
                    <Button className="w-full gap-2 font-black italic rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all">
                      <Play size={16} fill="currentColor" /> Start Practice
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </section>

          <section>
             <h2 className="text-sm font-black text-slate-900 italic uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-slate-400 rounded-full" /> Completed & Scores
              </h2>
              
              <div className="space-y-4">
                {completedTests.map((test) => {
                  const result = results.find(r => r.testId === test.id);
                  const percentage = result ? (result.score / result.totalMarks) * 100 : 0;
                  
                  return (
                    <div key={test.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 transition-all group">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-slate-100 text-slate-500 rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <ClipboardList size={22} />
                        </div>
                        <div>
                          <h4 className="font-black text-slate-900 italic leading-tight group-hover:text-primary transition-colors">{test.title}</h4>
                          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            <span className="flex items-center gap-1"><Calendar size={10} /> {test.date}</span>
                            <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-emerald-500" /> Score: {result?.score}/{result?.totalMarks}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className={cn(
                            "text-lg font-black italic",
                            percentage >= 80 ? "text-emerald-600" : percentage >= 60 ? "text-amber-600" : "text-red-600"
                          )}>{percentage.toFixed(0)}%</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accuracy</p>
                        </div>
                        <Button variant="ghost" className="p-2 h-auto rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                          <ChevronRight size={20} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
          </section>
        </div>

        {/* Right Column: AI Insights */}
        <div className="space-y-8">
          <Card className="bg-slate-950 border-none relative overflow-hidden text-white" title="Smart Suggestion">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BrainCircuit size={80} />
            </div>
            
            <div className="space-y-4 relative z-10">
              <p className="text-sm font-medium italic text-slate-300">
                You consistently score 90%+ in Algebra but drop to 65% in Geometry proofs.
              </p>
              
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 italic">
                <p className="text-[10px] font-black text-amber-400 uppercase tracking-tighter mb-1 select-none">Action Required</p>
                <p className="text-xs font-bold">Practice "Circle Theorems" for 45 mins this weekend to boost your average.</p>
              </div>
              
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-200 font-black italic rounded-xl h-12">Generate Practice Set</Button>
            </div>
          </Card>

          <Card title="Exam Statistics" description="Overview of your testing journey">
            <div className="space-y-6">
              {[
                { label: 'Avg Accuracy', value: '78%', color: 'text-emerald-600' },
                { label: 'Tests Attempted', value: '14', color: 'text-slate-900' },
                { label: 'Best Subject', value: 'Physics', color: 'text-primary' },
                { label: 'Time Efficiency', value: 'Fast', color: 'text-amber-600' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 italic">
                  <span className="text-sm font-medium text-slate-500">{stat.label}</span>
                  <span className={cn("text-sm font-black", stat.color)}>{stat.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
