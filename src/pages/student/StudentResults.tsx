import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { 
  TrendingUp, Award, Target, AlertCircle, 
  ChevronRight, BrainCircuit, History
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { results } from '../../data/mockData';
import { cn } from '../../utils/cn';

const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

const PerformanceTrend = [
  { test: 'Unit 1', score: 85 },
  { test: 'Unit 2', score: 78 },
  { test: 'Unit 3', score: 92 },
  { test: 'Mid Term', score: 88 },
  { test: 'Unit 4', score: 95 },
];

const SubjectAnalysis = [
  { subject: 'Math', correct: 24, wrong: 6, unattempted: 0 },
  { subject: 'Science', correct: 18, wrong: 4, unattempted: 3 },
  { subject: 'English', correct: 28, wrong: 2, unattempted: 0 },
];

export const StudentResults = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 italic">Academic Performance</h1>
          <p className="text-slate-500 font-medium italic">Detailed analysis of your test scores and learning growth.</p>
        </div>
        <Button className="gap-2 font-bold rounded-xl italic">
          <History size={18} /> Full History
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Test Result */}
        <Card className="lg:col-span-1" title="Latest Performance" description="Result for Periodic Table Mastery">
          <div className="flex flex-col items-center text-center py-4">
            <div className="relative w-40 h-40 flex items-center justify-center mb-6">
              <svg className="w-full h-full rotate-[-90deg]">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                <circle 
                  cx="80" 
                  cy="80" 
                  r="70" 
                  stroke="currentColor" 
                  strokeWidth="12" 
                  fill="transparent" 
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * 88) / 100}
                  strokeLinecap="round"
                  className="text-primary"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center rotate-[0deg]">
                <span className="text-4xl font-black text-slate-900">88%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 w-full">
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Marks</p>
                <p className="text-xl font-black text-slate-900">22/25</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Rank</p>
                <p className="text-xl font-black text-primary">#04/85</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-y-3 pt-6 border-t border-slate-100">
            <div className="flex justify-between items-center text-sm italic">
              <span className="text-slate-500 font-medium">Accuracy</span>
              <span className="text-slate-900 font-black">92%</span>
            </div>
            <div className="flex justify-between items-center text-sm italic">
              <span className="text-slate-500 font-medium">Time Taken</span>
              <span className="text-slate-900 font-black">18 mins</span>
            </div>
          </div>
        </Card>

        {/* Growth Chart */}
        <Card className="lg:col-span-2" title="Performance Trend" description="Score consistency over recent assessments">
          <div className="h-[350px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PerformanceTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="test" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#0d9488" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#0d9488', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject-wise breakdown */}
        <Card title="Subject Analysis" description="Accuracy distribution across subjects">
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SubjectAnalysis}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="correct" name="Correct" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="wrong" name="Wrong" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Insight Card */}
        <Card className="bg-primary/5 border-primary/10 relative overflow-hidden" title="Learning Insight">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BrainCircuit size={120} />
          </div>
          <div className="space-y-4 pt-4 relative z-10">
            <p className="text-sm font-medium text-slate-800 italic leading-relaxed">
              "You are performing exceptionaly well in Math tests. However, we noticed a minor decline in Science scores specifically in Organic Chemistry modules."
            </p>
            <div className="flex gap-2">
              <Badge variant="success">MATH EXPERT</Badge>
              <Badge variant="warning">SCIENCE FOCUS NEEDED</Badge>
            </div>
            <p className="text-xs text-slate-500 font-medium italic pt-2">Recommendation: Review 'Chemical Bonding' notes from last week's session.</p>
            <Button variant="outline" className="w-full font-black italic rounded-xl h-12 border-primary/20 text-primary">Generate Targeted Drill</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
