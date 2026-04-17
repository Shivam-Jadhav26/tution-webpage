import { motion } from 'motion/react';
import { BookOpen, Plus, Search, MoreVertical, Edit2, Trash2, Layers, Tag, Bookmark } from 'lucide-react';
import { courses } from '../../data/mockData';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { cn } from '../../utils/cn';

export const AdminCourses = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 italic">Course Catalog Management</h1>
          <p className="text-slate-500 font-medium italic">Define curriculum, set pricing, and manage subject modules.</p>
        </div>
        <Button className="gap-2 font-black italic rounded-xl h-12 px-6">
          <Plus size={18} /> Add New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Active Courses', value: courses.length, icon: Bookmark, color: 'text-primary' },
           { label: 'Total Subjects', value: '18', icon: Tag, color: 'text-indigo-600' },
           { label: 'Classes Covered', value: '5', icon: Layers, color: 'text-emerald-600' },
           { label: 'Video Resources', value: '240+', icon: BookOpen, color: 'text-amber-600' },
         ].map((stat, i) => (
           <Card key={i} className="flex items-center gap-4 border-none shadow-sm shadow-slate-200/50">
              <div className={cn("p-3 rounded-xl bg-slate-50", stat.color)}>
                 <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1 italic">{stat.label}</p>
                <p className="text-xl font-black text-slate-900 leading-none">{stat.value}</p>
              </div>
           </Card>
         ))}
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search courses..." 
            className="w-full bg-white border border-slate-200 pl-12 pr-4 py-3.5 rounded-2xl text-sm font-bold italic focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {courses.map((course) => (
          <motion.div
            key={course.id}
            whileHover={{ scale: 1.01 }}
            className="group bg-white rounded-3xl border border-slate-100 p-4 flex flex-col md:flex-row gap-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all"
          >
            <div className="md:w-48 h-48 rounded-2xl overflow-hidden shrink-0 relative">
               <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={course.title} />
               <div className="absolute top-3 left-3">
                  <Badge variant="primary" className="shadow-lg shadow-black/20">{course.class} CLASS</Badge>
               </div>
            </div>

            <div className="flex-1 flex flex-col pt-2">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-xl font-black text-slate-900 italic leading-tight group-hover:text-primary transition-colors">{course.title}</h3>
                 <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                    <MoreVertical size={20} />
                 </button>
              </div>
              <p className="text-sm font-medium text-slate-500 italic mb-4 line-clamp-2">"{course.description}"</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                 {course.subjects.map(sub => (
                   <span key={sub} className="text-[10px] font-bold italic text-slate-400 uppercase tracking-widest border border-slate-100 px-2 py-1 rounded-lg">
                      {sub}
                   </span>
                 ))}
              </div>

              <div className="mt-auto flex items-center justify-between gap-4">
                 <div className="flex -space-x-2">
                    {[
                      { name: 'Dr. Vivek' },
                      { name: 'Ms. Sonia' },
                      { name: 'Mr. Verma' }
                    ].map((instructor, i) => (
                      <img 
                        key={i} 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${instructor.name}`} 
                        className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 shadow-sm" 
                        alt={instructor.name}
                      />
                    ))}
                    <div className="w-7 h-7 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[8px] font-black italic text-slate-500">+3</div>
                 </div>
                 
                 <div className="flex gap-2">
                   <Button variant="outline" className="h-9 w-9 p-0 rounded-xl text-slate-400 hover:text-primary hover:border-primary/20">
                      <Edit2 size={16} />
                   </Button>
                   <Button variant="outline" className="h-9 w-9 p-0 rounded-xl text-slate-400 hover:text-red-500 hover:border-red-500/20">
                      <Trash2 size={16} />
                   </Button>
                   <Button variant="secondary" className="h-9 text-[10px] font-black italic uppercase tracking-widest px-6 rounded-xl">Batch Assign</Button>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
