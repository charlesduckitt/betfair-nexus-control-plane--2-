import React from 'react';
import { BookOpen, Code, Terminal, AlertCircle } from 'lucide-react';

export const Documentation: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="border-b border-slate-800 pb-8 mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Operator Manual</h1>
        <p className="text-lg text-slate-400">
          Technical reference for the Betfair Historical Data Multi-Agent Scraper.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Table of Contents */}
        <aside className="lg:col-span-1 space-y-1">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contents</h4>
          {['System Overview', 'Agent Roles', 'Data Dictionary', 'Troubleshooting', 'BigQuery Schema'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="block px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              {item}
            </a>
          ))}
        </aside>

        {/* Content */}
        <div className="lg:col-span-3 space-y-12">
          
          <section id="system-overview" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-neon-blue" /> System Overview
            </h2>
            <div className="prose prose-invert max-w-none text-slate-400">
              <p>
                The <strong>Betfair Nexus</strong> is a distributed, serverless architecture running on Cloudflare Workers AI. 
                It is designed to ingest 15 years of Betfair Exchange data, transforming raw JSON streams into analytic-ready 
                Parquet structures in Google BigQuery.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 mt-4">
                <code className="text-xs font-mono text-neon-cyan">
                  Orchestrator -> Ingestion (R2) -> Transformation (Workers) -> Persistence (BigQuery)
                </code>
              </div>
            </div>
          </section>

          <section id="agent-roles" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="h-5 w-5 text-neon-purple" /> Agent Roles
            </h2>
            <div className="grid gap-4">
              {[
                { title: 'Orchestration Agent', desc: 'Manages global state, retries, and queue distribution.' },
                { title: 'Ingestion Agent', desc: 'Fetches raw .bz2 files from Betfair Historical Data API.' },
                { title: 'Transformation Agent', desc: 'Calculates delta_p, implied prob, and aligns to off-time (T=0).' },
                { title: 'Persistence Agent', desc: 'Batches transformed rows and streams to BigQuery via Storage Write API.' }
              ].map(agent => (
                <div key={agent.title} className="p-4 bg-slate-900 border border-slate-800 rounded-lg">
                  <h3 className="font-semibold text-white mb-1">{agent.title}</h3>
                  <p className="text-sm text-slate-400">{agent.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="bigquery-schema" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Code className="h-5 w-5 text-emerald-500" /> BigQuery Schema
            </h2>
            <p className="text-sm text-slate-400">Target table: <code className="text-emerald-400">betfair_analytics.race_metrics</code></p>
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 overflow-x-auto">
              <pre className="text-xs font-mono text-slate-300">
{`CREATE TABLE \`race_metrics\`
(
  market_id STRING NOT NULL,
  selection_id INT64 NOT NULL,
  event_date DATE NOT NULL,
  
  -- Features
  price_off FLOAT64,      -- Price at T=0
  price_1m FLOAT64,       -- Price at T-1m
  price_5m FLOAT64,       -- Price at T-5m
  imp_prob_off FLOAT64,   -- Implied Probability at T=0
  
  -- Labels
  win BOOL,               -- Did this selection win?
  bsp FLOAT64             -- Betfair Starting Price
)
PARTITION BY event_date
CLUSTER BY market_id;`}
              </pre>
            </div>
          </section>

          <section id="troubleshooting" className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-neon-red" /> Troubleshooting
            </h2>
            <div className="bg-neon-red/5 border border-neon-red/10 p-4 rounded-lg">
              <h4 className="text-neon-red font-semibold mb-2">Agent Failure: Rate Limits</h4>
              <p className="text-sm text-slate-400">
                If the Ingestion Agent reports HTTP 429, the Orchestrator will automatically back off for 
                15 minutes. No manual intervention is required unless the error persists for > 2 hours.
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};