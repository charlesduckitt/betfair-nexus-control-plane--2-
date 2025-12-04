import React, { useState, useEffect } from 'react';
import { AgentCard } from '../components/AgentCard';
import { ProgressDisplay } from '../components/ProgressDisplay';
import { TerminalLog } from '../components/TerminalLog';
import { ThroughputChart } from '../components/ThroughputChart';
import { AgentMetric, LogEntry, ThroughputData, AgentStatus } from '../types';
import { INITIAL_AGENTS, generateMockLog, generateThroughputData } from '../services/mockAgentService';
import { Play, Square, Pause, RotateCw } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [agents, setAgents] = useState<AgentMetric[]>(INITIAL_AGENTS);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [throughput, setThroughput] = useState<ThroughputData[]>(generateThroughputData());
  const [isRunning, setIsRunning] = useState(true);

  // Simulate WebSocket Updates
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // 1. Update Metrics
      setAgents(prev => prev.map(a => ({
        ...a,
        processedCount: a.status === AgentStatus.RUNNING ? a.processedCount + Math.floor(Math.random() * 10) : a.processedCount,
        lastActivity: new Date(),
        cpuUsage: a.status === AgentStatus.RUNNING ? Math.min(99, Math.floor(Math.random() * 30) + 40) : 5,
        lagSeconds: Math.max(0.1, a.lagSeconds + (Math.random() * 0.2 - 0.1))
      })));

      // 2. Add Logs randomly
      if (Math.random() > 0.4) {
        setLogs(prev => [...prev.slice(-49), generateMockLog()]);
      }

      // 3. Update Chart
      if (Math.random() > 0.8) {
          setThroughput(prev => {
              const now = new Date();
              const newPoint = {
                  time: now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
                  ingested: Math.floor(Math.random() * 200) + 300,
                  transformed: Math.floor(Math.random() * 200) + 300,
                  persisted: Math.floor(Math.random() * 200) + 300
              };
              return [...prev.slice(1), newPoint];
          });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div>
          <h2 className="text-lg font-semibold text-white">Pipeline Controls</h2>
          <p className="text-sm text-slate-400">Manage global scraper state and workers</p>
        </div>
        <div className="flex gap-3">
            <button 
                onClick={() => setIsRunning(true)}
                disabled={isRunning}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${isRunning ? 'bg-slate-800 text-slate-500' : 'bg-neon-green/10 text-neon-green border border-neon-green/20 hover:bg-neon-green/20'}`}
            >
                <Play className="h-4 w-4" /> Start
            </button>
            <button 
                onClick={() => setIsRunning(false)}
                disabled={!isRunning}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${!isRunning ? 'bg-slate-800 text-slate-500' : 'bg-neon-amber/10 text-neon-amber border border-neon-amber/20 hover:bg-neon-amber/20'}`}
            >
                <Pause className="h-4 w-4" /> Pause
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all">
                <RotateCw className="h-4 w-4" /> Restart Workers
            </button>
        </div>
      </div>

      <ProgressDisplay />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map(agent => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
            <ThroughputChart data={throughput} />
        </div>
        <div className="xl:col-span-1">
            <TerminalLog logs={logs} />
        </div>
      </div>
    </div>
  );
};