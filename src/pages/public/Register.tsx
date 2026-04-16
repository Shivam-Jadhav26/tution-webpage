import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, Mail, Lock, Phone, GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

export const Register = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => setStep(step + 1);
  const handleRegister = () => {
    // Simulate register
    navigate('/login');
  };

  return (
    <div className="min-h-screen py-32 px-6 lg:px-12 bg-slate-50 flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-200">
        <div 
          className="h-full bg-primary transition-all duration-500" 
          style={{ width: `${(step / 2) * 100}%` }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="bg-primary p-2 rounded-lg">
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">EduFlow</span>
          </Link>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Create Student Account</h1>
          <p className="text-slate-500 font-medium">Step {step} of 2: {step === 1 ? 'Personal Information' : 'Academic Details'}</p>
        </div>

        <div className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
          {step === 1 ? (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Doe" />
              </div>
              <Input label="Email Address" placeholder="john@example.com" type="email" />
              <Input label="Phone Number" placeholder="+91 XXXXX XXXXX" type="tel" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Password" type="password" placeholder="••••••••" />
                <Input label="Confirm Password" type="password" placeholder="••••••••" />
              </div>
              <Button size="lg" className="w-full h-14 rounded-2xl font-bold gap-2" onClick={handleNext}>
                Continue to Academic Details <ArrowRight size={20} />
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 italic">Select Current Grade</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {[6, 7, 8, 9, 10].map((grade) => (
                    <button 
                      key={grade}
                      className="h-12 border-2 border-slate-100 rounded-xl font-bold text-slate-600 hover:border-primary hover:text-primary transition-all active:scale-95"
                    >
                      Class {grade}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 italic">Preferred Batch</label>
                <select className="flex h-12 w-full rounded-xl border-2 border-slate-100 bg-white px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary">
                  <option>Select Batch</option>
                  <option>Morning Elite (7:00 AM - 9:00 AM)</option>
                  <option>Evening Starters (4:00 PM - 6:00 PM)</option>
                  <option>Weekend Intensive</option>
                </select>
              </div>

              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <div className="flex gap-3">
                  <CheckCircle2 className="text-primary shrink-0" size={20} />
                  <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                    By registering, you agree to our terms of service concerning regular attendance and institute discipline protocols.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="h-14 rounded-2xl flex-1 font-bold" onClick={() => setStep(1)}>Go Back</Button>
                <Button size="lg" className="h-14 rounded-2xl flex-[2] font-bold" onClick={handleRegister}>Complete Registration</Button>
              </div>
            </motion.div>
          )}
        </div>

        <p className="text-center mt-8 text-sm text-slate-600 font-medium italic">
          Already enrolled? <Link to="/login" className="text-primary font-bold hover:underline">Sign in to your dashboard</Link>
        </p>
      </motion.div>
    </div>
  );
};
