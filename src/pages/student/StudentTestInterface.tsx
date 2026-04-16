import { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, Clock, 
  HelpCircle, AlertCircle, CheckCircle2,
  Flag, Save
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';

import { cn } from '../../utils/cn';

export const StudentTestInterface = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock Questions
  const questions = [
    { id: 1, text: "What is the value of x in the equation 2x + 5 = 15?", options: ["5", "10", "15", "20"] },
    { id: 2, text: "Which of the following is a prime number?", options: ["4", "9", "13", "15"] },
    { id: 3, text: "Calculate the area of a circle with radius 7 (Use π = 22/7)", options: ["154", "44", "49", "121"] },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (index: number) => {
    setAnswers({ ...answers, [currentQuestion]: index });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => navigate('/student/results'), 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-500">
        <div className="bg-emerald-100 p-6 rounded-full text-emerald-600 mb-6 border-4 border-emerald-50">
          <CheckCircle2 size={64} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-2">Test Submitted Successfully!</h1>
        <p className="text-slate-500 font-medium italic mb-8">Your answers have been recorded. Redirecting to your results portal...</p>
        <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 2 }}
            className="h-full bg-primary"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      {/* Header Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-4 z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => navigate('/student/tests')}>
            <ChevronLeft size={24} />
          </Button>
          <div>
            <h2 className="text-lg font-black text-slate-900 italic">Algebra Monthly Assessment</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px] uppercase">Mathematics</Badge>
              <span className="text-xs text-slate-400 font-bold">• Class 10th Elite</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-xl text-red-600 border border-red-100 shadow-sm italic">
            <Clock size={20} className="animate-pulse" />
            <span className="text-lg font-black">{formatTime(timeLeft)}</span>
          </div>
          <Button className="font-bold gap-2 px-8 rounded-full shadow-lg shadow-primary/20" onClick={handleSubmit}>
            Submit Test <Save size={18} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
        {/* Question Palette (Left on desktop) */}
        <div className="lg:col-span-1 space-y-6 lg:order-last">
          <Card title="Question Palette" description="Navigation and Status">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentQuestion(i)}
                  className={cn(
                    "h-10 w-full rounded-lg font-black text-sm transition-all border-2",
                    currentQuestion === i 
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105" 
                      : answers[i] !== undefined
                      ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                      : "bg-slate-50 text-slate-400 border-slate-100 hover:border-slate-300"
                  )}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2 italic">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Answered</span>
              </div>
              <div className="flex items-center gap-2 italic">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Not Visited</span>
              </div>
            </div>
          </Card>

          <Card title="Auto-Save Warning" className="bg-amber-50 border-amber-100">
            <div className="flex gap-3">
              <AlertCircle size={20} className="text-amber-600 shrink-0" />
              <p className="text-xs text-amber-900 font-medium italic leading-relaxed">
                Do not refresh the page. Your progress is saved locally every 30 seconds.
              </p>
            </div>
          </Card>
        </div>

        {/* Question Area */}
        <div className="lg:col-span-3 space-y-8">
          <Card className="min-h-[400px] flex flex-col justify-between overflow-visible relative">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-slate-900 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl italic rotate-2">
              Question {currentQuestion + 1} / {questions.length}
            </div>
            
            <div className="space-y-12 py-6">
              <div className="flex items-start gap-4">
                <HelpCircle size={24} className="text-primary mt-1 shrink-0" />
                <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight italic">
                  {questions[currentQuestion].text}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    className={cn(
                      "flex items-center p-5 rounded-[1.5rem] border-2 transition-all text-left relative overflow-hidden group/opt",
                      answers[currentQuestion] === i
                        ? "bg-primary/5 border-primary shadow-sm"
                        : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    )}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center font-black text-sm mr-4 shrink-0 transition-colors",
                      answers[currentQuestion] === i
                        ? "bg-primary text-white"
                        : "bg-slate-100 text-slate-500 group-hover/opt:bg-slate-200"
                    )}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className={cn(
                      "text-sm font-bold",
                      answers[currentQuestion] === i ? "text-primary" : "text-slate-700"
                    )}>
                      {opt}
                    </span>
                    {answers[currentQuestion] === i && (
                      <div className="absolute right-4 text-primary">
                        <CheckCircle2 size={18} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-10 border-t border-slate-100 mt-10">
              <Button 
                variant="outline" 
                className="rounded-full gap-2 font-bold px-6 border-slate-200"
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft size={18} /> Previous
              </Button>
              <div className="flex items-center gap-3">
                <Button variant="ghost" className="gap-2 font-bold text-slate-400 hover:text-amber-600">
                  <Flag size={18} /> Mark for Review
                </Button>
                <Button 
                  className="rounded-full gap-2 font-bold px-8 shadow-lg shadow-primary/20"
                  onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentQuestion === questions.length - 1}
                >
                  Next Question <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </Card>

          {/* AI Helper Snippet */}
          <div className="p-6 bg-slate-900 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden border border-white/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="space-y-1 relative z-10">
              <h4 className="text-lg font-black italic flex items-center gap-2">
                Need a hint? <Badge className="bg-white/10 text-white border-white/20 uppercase tracking-tighter text-[9px]">-1 Mark for hint</Badge>
              </h4>
              <p className="text-xs text-white/60 font-medium">Use AI Assistant for a small conceptual clue without showing answer.</p>
            </div>
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white hover:text-slate-900 rounded-full font-black italic relative z-10">
              Reveal Al Hint
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
