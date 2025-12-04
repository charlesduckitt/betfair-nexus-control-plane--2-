export enum AgentStatus {
  IDLE = 'IDLE',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  ERROR = 'ERROR',
  WAITING = 'WAITING_QUEUE'
}

export enum AgentRole {
  ORCHESTRATOR = 'Orchestration Agent',
  INGESTION = 'Ingestion Agent',
  TRANSFORMATION = 'Transformation Agent',
  PERSISTENCE = 'Persistence Agent'
}

export interface AgentMetric {
  id: string;
  role: AgentRole;
  status: AgentStatus;
  lastActivity: Date;
  processedCount: number; // e.g., files or races
  errorCount: number;
  lagSeconds: number; // Time between scrape and persistence
  cpuUsage: number; // Mock metric for Cloudflare Worker load
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  agent: AgentRole;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS';
  message: string;
}

export interface ThroughputData {
  time: string;
  ingested: number;
  transformed: number;
  persisted: number;
}

export interface SystemConfig {
  betfairUser: string;
  betfairKey: string;
  bigQueryProject: string;
  bigQueryDataset: string;
  workerConcurrency: number;
}