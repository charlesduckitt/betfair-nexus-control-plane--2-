import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ThroughputData } from '../types';

interface ThroughputChartProps {
  data: ThroughputData[];
}

export const ThroughputChart: React.FC<ThroughputChartProps> = ({ data }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 h-96 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-200">System Throughput</h3>
        <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-neon-blue" /> Ingestion
            </div>
            <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-neon-cyan" /> Transform
            </div>
            <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" /> BigQuery
            </div>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIngest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorTrans" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPersist" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }} 
                itemStyle={{ fontSize: '12px' }}
            />
            <Area type="monotone" dataKey="ingested" stroke="#3b82f6" fillOpacity={1} fill="url(#colorIngest)" strokeWidth={2} />
            <Area type="monotone" dataKey="transformed" stroke="#06b6d4" fillOpacity={1} fill="url(#colorTrans)" strokeWidth={2} />
            <Area type="monotone" dataKey="persisted" stroke="#10b981" fillOpacity={1} fill="url(#colorPersist)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};