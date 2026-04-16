import { useState } from 'react';
import { 
  Search, Filter, Plus, MoreHorizontal, 
  Trash2, Edit, Eye, Download, Users,
  CheckCircle, XCircle, Clock
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';
import { cn } from '../../utils/cn';

const mockStudentsList = [
  { id: '1', name: 'Rahul Sharma', email: 'rahul@student.com', class: '10th', batch: 'Morning Elite', status: 'active', bg: 'bg-emerald-500' },
  { id: '2', name: 'Sneha Gupta', email: 'sneha@example.com', class: '9th', batch: 'Evening', status: 'active', bg: 'bg-blue-500' },
  { id: '3', name: 'Aryan Singh', email: 'aryan@abc.com', class: '10th', batch: 'Weekend', status: 'inactive', bg: 'bg-red-500' },
  { id: '4', name: 'Pooja V.', email: 'pooja@students.com', class: '8th', batch: 'Evening', status: 'active', bg: 'bg-amber-500' },
  { id: '5', name: 'Vikram K.', email: 'vikram@example.com', class: '10th', batch: 'Morning Elite', status: 'pending', bg: 'bg-indigo-500' },
];

export const AdminStudents = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 italic">Student Directory</h1>
          <p className="text-slate-500 font-medium italic">Manage and track student profiles, academic status, and enrollment.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2 font-bold border-slate-200">
            <Download size={18} /> Export List
          </Button>
          <Button className="gap-2 font-bold">
            <Plus size={18} /> Enroll New Student
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'Active Students', val: '284', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Invitations', val: '12', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Inactive/Withdrawn', val: '20', icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <Card key={i} className="p-4 md:p-4">
            <div className="flex items-center gap-4">
              <div className={cn("p-2 rounded-xl", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-xl font-black text-slate-900">{stat.val}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters and Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-1.5 w-full md:w-80 focus-within:border-primary transition-all">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID or email..." 
              className="bg-transparent border-none outline-none text-sm ml-2 w-full font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl italic hover:bg-white">
              <Filter size={14} className="mr-2" /> Class: All
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl italic hover:bg-white">
              <Filter size={14} className="mr-2" /> Batch: All
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl italic hover:bg-white">
              Sort: Recent
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest italic">Student Profile</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest italic">Class/Grade</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest italic">Batch</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest italic">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest italic">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockStudentsList.map((std) => (
                <tr key={std.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm", std.bg)}>
                        {std.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{std.name}</p>
                        <p className="text-xs text-slate-500 font-medium italic">{std.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-600 bg-white">Class {std.class}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-700 italic">{std.batch}</td>
                  <td className="px-6 py-4">
                    <Badge 
                      variant={std.status === 'active' ? 'success' : std.status === 'pending' ? 'warning' : 'error'}
                      className="text-[10px] uppercase italic"
                    >
                      {std.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white hover:text-primary"><Eye size={16} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white hover:text-emerald-600"><Edit size={16} /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white hover:text-red-600"><Trash2 size={16} /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
          <p className="text-xs font-bold text-slate-500 italic uppercase">Showing 5 out of 284 students</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-lg h-8 px-4 font-bold disabled:opacity-30" disabled>Previous</Button>
            <Button variant="outline" size="sm" className="rounded-lg h-8 px-4 font-bold">Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
