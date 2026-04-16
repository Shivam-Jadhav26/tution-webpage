import { 
  Users, Layers, ClipboardList, CreditCard, 
  MessageSquare, TrendingUp, UserPlus, FilePlus, 
  Send, AlertCircle, Calendar, ArrowUpRight,
  TrendingDown, MoreVertical
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line,
  PieChart, Pie, Cell
} from 'recharts';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { cn } from '../../utils/cn';

const enrollmentData = [
  { name: 'Mon', count: 4 },
  { name: 'Tue', count: 7 },
  { name: 'Wed', count: 5 },
  { name: 'Thu', count: 12 },
  { name: 'Fri', count: 8 },
  { name: 'Sat', count: 15 },
  { name: 'Sun', count: 3 },
];

const feeCollections = [
  { month: 'Jan', amount: 450000 },
  { month: 'Feb', amount: 520000 },
  { month: 'Mar', amount: 480000 },
  { month: 'Apr', amount: 610000 },
];

const classDistribution = [
  { name: 'Class 10', value: 85 },
  { name: 'Class 9', value: 72 },
  { name: 'Class 8', value: 64 },
  { name: 'Class 7', value: 50 },
  { name: 'Class 6', value: 45 },
];

const COLORS = ['#0d9488', '#0891b2', '#2563eb', '#4f46e5', '#7c3aed'];

export const AdminDashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 italic">Institute Analytics</h1>
          <p className="text-slate-500 font-medium">Monitoring growth, engagement, and operational efficiency.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 font-bold border-slate-200">
            <Calendar size={18} /> Schedule
          </Button>
          <Button className="gap-2 font-bold shadow-lg shadow-primary/20">
            <UserPlus size={18} /> Add Student
          </Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', val: '316', change: '+12%', up: true, icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Total Batches', val: '14', change: 'Stable', up: true, icon: Layers, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Fees', val: '₹1.2L', change: '+5%', up: false, icon: CreditCard, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Today Attendance', val: '94%', change: '+2%', up: true, icon: ClipboardList, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((kpi, i) => (
          <Card key={i} className="p-0">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("p-2.5 rounded-xl", kpi.bg, kpi.color)}>
                  <kpi.icon size={24} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold",
                  kpi.up ? "text-emerald-600" : "text-red-600"
                )}>
                  {kpi.up ? <ArrowUpRight size={14} /> : <TrendingDown size={14} />}
                  {kpi.change}
                </div>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter mb-1">{kpi.label}</p>
              <h3 className="text-3xl font-black text-slate-900">{kpi.val}</h3>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enrollments Chart */}
        <Card className="lg:col-span-2" title="New Enrollments" description="Daily student registrations for the current week">
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} 
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="count" fill="#0d9488" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Distribution Pie */}
        <Card title="Class Distribution" description="Students count by grade">
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={classDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {classDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-900">316</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">Total</span>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {classDistribution.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="text-slate-900">{item.value} stds</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Doubts (Pending Verification) */}
        <Card className="lg:col-span-1" title="Unresolved Doubts" description="Latest student queries awaiting reply">
          <div className="space-y-4">
            {[
              { student: 'Amit R.', subject: 'Physics', query: 'Newton\'s Third Law doubt...', time: '10m ago' },
              { student: 'Neha S.', subject: 'Math', query: 'Complex integration help...', time: '1h ago' },
              { student: 'Aryan P.', subject: 'English', query: 'Shakespeare\'s Sonnets...', time: '4h ago' },
            ].map((doubt, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-primary/20 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-slate-900 italic">{doubt.student}</h4>
                  <span className="text-[10px] font-medium text-slate-400">{doubt.time}</span>
                </div>
                <p className="text-xs text-slate-600 italic mb-3 line-clamp-1">"{doubt.query}"</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-[9px] uppercase">{doubt.subject}</Badge>
                  <Button variant="ghost" size="sm" className="h-6 text-[10px] font-bold text-primary px-0">Reply Now</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Revenue/Collection Chart */}
        <Card className="lg:col-span-2" title="Fee Collections" description="Monthly revenue tracking">
          <div className="h-[300px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={feeCollections}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quick Actions Panel */}
      <Card title="Quick Actions" description="Fast-track daily operational tasks">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="flex flex-col h-auto py-6 gap-3 rounded-2xl border-dashed border-2 hover:border-primary hover:bg-primary/5 group">
            <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:scale-110 transition-transform"><FilePlus size={24} /></div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-900 italic">Create Test</p>
              <p className="text-[10px] text-slate-500 font-medium">MCQ/Subjective</p>
            </div>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto py-6 gap-3 rounded-2xl border-dashed border-2 hover:border-blue-600 hover:bg-blue-50 group">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600 group-hover:scale-110 transition-transform"><Send size={24} /></div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-900 italic">Send Alerts</p>
              <p className="text-[10px] text-slate-500 font-medium">SMS/WhatsApp</p>
            </div>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto py-6 gap-3 rounded-2xl border-dashed border-2 hover:border-amber-600 hover:bg-amber-50 group">
            <div className="bg-amber-100 p-3 rounded-full text-amber-600 group-hover:scale-110 transition-transform"><AlertCircle size={24} /></div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-900 italic">Mark Attendance</p>
              <p className="text-[10px] text-slate-500 font-medium">All Batches</p>
            </div>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto py-6 gap-3 rounded-2xl border-dashed border-2 hover:border-indigo-600 hover:bg-indigo-50 group">
            <div className="bg-indigo-100 p-3 rounded-full text-indigo-600 group-hover:scale-110 transition-transform"><Layers size={24} /></div>
            <div className="text-center">
              <p className="text-sm font-bold text-slate-900 italic">Batch Report</p>
              <p className="text-[10px] text-slate-500 font-medium">Performance Insights</p>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};
