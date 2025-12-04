import React from 'react';
import { AgentMetric, AgentStatus, AgentRole } from '../types';
import { Activity, Server, Database, Layers, Clock, AlertCircle, CheckCircle } from 'lucide-react';

interface AgentCardProps {
  agent: AgentMetric;
}

const statusColors = {
  [AgentStatus.RUNNING]: 'text-neon-green bg-neon-green/10 border-neon-green/20',
  [AgentStatus.IDLE]: 'text-slate-400 bg-slate-800 border-slate-700',
  [AgentStatus.PAUSED]: 'text-neon-amber bg-neon-amber/10 border-neon-amber/20',
  [AgentStatus.ERROR]: 'text-neon-red bg-neon-red/10 border-neon-red/20',
  [AgentStatus.WAITING]: 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20',
};

const RoleIcon = ({ role }: { role: AgentRole }) => {
  switch (role) {
    case AgentRole.ORCHESTRATOR: return <Activity className="h-5 w-5 text-neon-purple" />;
    case AgentRole.INGESTION: return <Server className="h-5 w-5 text-neon-blue" />;
    case AgentRole.TRANSFORMATION: return <Layers className="h-5 w-5 text-neon-cyan" />;
    case AgentRole.PERSISTENCE: return <Database className="h-5 w-5 text-emerald-500" />;
    default: return <Activity className="h-5 w-5" />;
  }
};

export const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-700 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 group-hover:bg-slate-750">
            <RoleIcon role={agent.role} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 text-sm">{agent.role}</h3>
            <div className="text-xs text-slate-500 font-mono">{agent.id}</div>
          </div>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${statusColors[agent.status]}`}>
          {agent.status.replace('_', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Processed
          </div>
          <div className="text-lg font-mono font-medium text-slate-200">
            {new Intl.NumberFormat('en-US').format(agent.processedCount)}
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="h-3 w-3" /> Latency
          </div>
          <div className={`text-lg font-mono font-medium ${agent.lagSeconds > 2 ? 'text-neon-amber' : 'text-slate-200'}`}>
            {agent.lagSeconds.toFixed(2)}s
          </div>
        </div>
      </div>
      
      {/* Mini CPU/Load Bar */}
      <div className="mt-4 space-y-1">
        <div className="flex justify-between text-[10px] text-slate-500">
           <span>Load (Workers AI)</span>
           <span>{agent.cpuUsage}%</span>
        </div>
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-500"
            style={{ width: `${agent.cpuUsage}%` }}
          />
        </div>
      </div>
    </div>
  );
};