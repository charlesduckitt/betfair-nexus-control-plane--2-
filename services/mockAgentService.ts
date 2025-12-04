import { AgentMetric, AgentRole, AgentStatus, LogEntry, ThroughputData } from '../types';

// Initial State
export const INITIAL_AGENTS: AgentMetric[] = [
  {
    id: 'orch-001',
    role: AgentRole.ORCHESTRATOR,
    status: AgentStatus.RUNNING,
    lastActivity: new Date(),
    processedCount: 15420,
    errorCount: 0,
    lagSeconds: 0,
    cpuUsage: 12
  },
  {
    id: 'ingest-001',
    role: AgentRole.INGESTION,
    status: AgentStatus.RUNNING,
    lastActivity: new Date(),
    processedCount: 4502,
    errorCount: 2,
    lagSeconds: 0.5,
    cpuUsage: 45
  },
  {
    id: 'trans-001',
    role: AgentRole.TRANSFORMATION,
    status: AgentStatus.RUNNING,
    lastActivity: new Date(),
    processedCount: 4100,
    errorCount: 0,
    lagSeconds: 1.2,
    cpuUsage: 88
  },
  {
    id: 'persist-001',
    role: AgentRole.PERSISTENCE,
    status: AgentStatus.WAITING,
    lastActivity: new Date(),
    processedCount: 4050,
    errorCount: 0,
    lagSeconds: 2.5,
    cpuUsage: 5
  }
];

export const generateMockLog = (): LogEntry => {
  const agents = Object.values(AgentRole);
  const levels = ['INFO', 'INFO', 'INFO', 'SUCCESS', 'WARN'];
  const agent = agents[Math.floor(Math.random() * agents.length)];
  const level = levels[Math.floor(Math.random() * levels.length)] as LogEntry['level'];
  
  let message = '';
  switch(agent) {
    case AgentRole.INGESTION:
      message = `Downloaded market bundle ${Math.floor(Math.random() * 100000)}.json`;
      break;
    case AgentRole.TRANSFORMATION:
      message = `Calculated delta_p for race ${Math.floor(Math.random() * 999999)} (In-Play anchor T=0)`;
      break;
    case AgentRole.PERSISTENCE:
      message = `Streamed batch to BigQuery: ${Math.floor(Math.random() * 50)} rows`;
      break;
    case AgentRole.ORCHESTRATOR:
      message = `Queue depth check: Normal. Workers active: ${Math.floor(Math.random() * 10) + 1}`;
      break;
  }

  if (level === 'WARN') message = `High latency detected in Cloudflare KV read`;
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
    agent,
    level,
    message
  };
};

export const generateThroughputData = (points: number = 20): ThroughputData[] => {
  const data: ThroughputData[] = [];
  const now = new Date();
  for (let i = points; i >= 0; i--) {
    const t = new Date(now.getTime() - i * 1000 * 60); // Past minutes
    data.push({
      time: t.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
      ingested: Math.floor(Math.random() * 500) + 200,
      transformed: Math.floor(Math.random() * 450) + 200,
      persisted: Math.floor(Math.random() * 400) + 200,
    });
  }
  return data;
};