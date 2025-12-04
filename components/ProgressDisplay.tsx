import React from 'react';
import { Calendar, Database } from 'lucide-react';

export const ProgressDisplay: React.FC = () => {
  // Hardcoded target values for demo
  const totalYears = 15;
  const processedPercentage = 42.5; 
  const currentProcessingDate = "2018-04-12";
  const sevenDayTargetProgress = 85; // 85% of the 7-day goal

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main 15-Year Progress */}
      <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Database className="h-32 w-32" />
        </div>
        
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Total Archive Progress (15 Years)</h3>
        
        <div className="flex items-end gap-2 mb-2">
           <span className="text-4xl font-bold text-white">{processedPercentage}%</span>
           <span className="text-sm text-slate-500 mb-1">completed</span>
        </div>

        <div className="relative h-4 w-full bg-slate-800 rounded-full overflow-hidden mb-4">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan animate-pulse"
            style={{ width: `${processedPercentage}%` }}
          />
          {/* Markers for years */}
          {[...Array(15)].map((_, i) => (
             <div key={i} className="absolute top-0 h-full w-px bg-slate-950/50" style={{ left: `${(i/15)*100}%` }} />
          ))}
        </div>

        <div className="flex justify-between text-xs text-slate-500 font-mono">
           <span>Start: 2010</span>
           <span className="text-neon-cyan">Processing: {currentProcessingDate}</span>
           <span>Target: 2025</span>
        </div>
      </div>

      {/* 7-Day Window Target */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
         <div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Current Sprint Target</h3>
            <p className="text-xs text-slate-500">Processing 7-day window for UK/IE WIN markets.</p>
         </div>
         
         <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-white">{sevenDayTargetProgress}%</span>
                <Calendar className="h-5 w-5 text-neon-green" />
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-neon-green transition-all duration-500" 
                    style={{ width: `${sevenDayTargetProgress}%` }} 
                />
            </div>
            <div className="mt-2 text-right">
                <span className="text-[10px] text-neon-green bg-neon-green/10 px-2 py-0.5 rounded border border-neon-green/20">On Track</span>
            </div>
         </div>
      </div>
    </div>
  );
};