import { motion } from 'motion/react';
import { 
  Users, BookOpen, Clock, Calendar, CheckCircle2, 
  TrendingUp, Play, FileText, ChevronRight, Award,
  MessageSquare, ClipboardList, BrainCircuit
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const performanceData = [
  { name: 'Jan', score: 65 },
  { name: 'Feb', score: 72 },
  { name: 'Mar', score: 68 },
  { name: 'Apr', score: 85 },
  { name: 'May', score: 92 },
];

const attendanceData = [
  { name: 'Math', pct: 95 },
  { name: 'Science', pct: 88 },
  { name: 'English', pct: 100 },
  { name: 'History', pct: 92 },
];

export const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 italic">Welcome back, {user?.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500 font-medium">Here's what's happening with your studies today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="px-4 py-2 text-sm italic">Class {user?.class} • {user?.batch}</Badge>
          <Button size="sm" className="gap-2 rounded-full font-bold">Ask AI Doubts <BrainCircuit size={16} /></Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Attendance', val: '92%', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Avg. Score', val: '88/100', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Total Doubts', val: '12', icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Tests Taken', val: '08', icon: ClipboardList, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <Card key={i} className="p-4 md:p-4">
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-xl", stat.bg, stat.color)}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.val}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Chart */}
        <Card className="lg:col-span-2" title="Learning Progress" description="Your performance trend across monthly assessments">
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#0d9488" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI Recommendations */}
        <Card title="Smart Suggestions" description="AI insights based on your recent performance">
          <div className="space-y-4">
            {[
              { type: 'High', title: 'Revise Polynomials', desc: 'You struggled with this in the last test.', icon: BrainCircuit, color: 'text-red-600', bg: 'bg-red-50' },
              { type: 'Med', title: 'Practice Grammar', desc: 'Your passive voice concepts are a bit weak.', icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' },
              { type: 'Info', title: 'Great Work!', desc: 'You are leading in Science this week.', icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((s, i) => (
              <div key={i} className="group p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all cursor-pointer">
                <div className="flex gap-4">
                  <div className={cn("p-2 rounded-lg shrink-0", s.bg, s.color)}>
                    <s.icon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900 text-sm italic">{s.title}</h4>
                      <Badge variant={s.type === 'High' ? 'error' : s.type === 'Med' ? 'warning' : 'success'} className="text-[10px] scale-90">{s.type}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs font-bold border-primary/20 text-primary hover:bg-primary/5">View Full Analysis</Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Upcoming Classes */}
        <Card title="Upcoming Classes" description="Next 24 hours schedule">
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', teacher: 'Mr. Verma', time: '04:00 PM', type: 'Live Class' },
              { subject: 'Science', teacher: 'Dr. Khanna', time: '05:30 PM', type: 'Doubt Session' },
            ].map((cls, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 italic">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg"><Clock size={16} className="text-slate-500" /></div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{cls.subject}</p>
                    <p className="text-xs text-slate-500 font-medium">{cls.teacher} • {cls.time}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-[10px]">{cls.type}</Badge>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs font-bold text-slate-500">View Full Timetable</Button>
          </div>
        </Card>

        {/* Subjects Attendance */}
        <Card title="Attendance Summary" description="Subject-wise percentage">
          <div className="h-[200px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} 
                />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar 
                  dataKey="pct" 
                  fill="#6366f1" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Homework/Tasks */}
        <Card title="Tasks & Homework" description="Pending items for this week">
          <div className="space-y-4">
            {[
              { task: 'Science Lab Manual', due: 'Tomorrow', done: false },
              { task: 'History Notes (Ch-4)', due: '2 Days', done: false },
              { task: 'Math Practice Sets', due: 'Done', done: true },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className={cn(
                  "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                  t.done ? "bg-emerald-500 border-emerald-500" : "border-slate-200 group-hover:border-primary"
                )}>
                  {t.done && <CheckCircle2 size={12} className="text-white" />}
                </div>
                <div className="flex-1">
                  <p className={cn("text-sm font-bold", t.done ? "text-slate-400 line-through" : "text-slate-700")}>{t.task}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">{t.due === 'Done' ? 'Completed' : `Due ${t.due}`}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
